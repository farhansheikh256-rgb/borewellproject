const Enquiry = require('../models/Enquiry');
const { MessagingResponse } = require('twilio').twiml;

/**
 * Handles incoming webhooks from Twilio for WhatsApp messages
 */
const handleIncomingMessage = async (req, res) => {
  try {
    // Twilio sends data as urlencoded form data
    const { From, Body, ProfileName } = req.body;
    
    // Twilio's From format for WhatsApp is "whatsapp:+1234567890"
    const phoneNumber = From ? From.replace('whatsapp:', '') : 'Unknown';
    const messageText = Body ? Body.trim() : '';

    console.log(`Received WhatsApp message from ${phoneNumber}: ${messageText}`);

    // Create a TwiML response
    const twiml = new MessagingResponse();

    // Check if there is an existing pending/under review enquiry for this phone number
    const existingEnquiry = await Enquiry.findOne({ 
      phone: phoneNumber,
      status: { $in: ['Pending', 'Under Review'] }
    });

    if (existingEnquiry) {
      // Append the new message to the existing enquiry description
      existingEnquiry.description += `\n[Follow up]: ${messageText}`;
      await existingEnquiry.save();

      twiml.message('Thanks for the follow-up! We have updated your existing enquiry and our team will get back to you shortly.');
    } else {
      // Create a new lead (Enquiry)
      const newEnquiry = new Enquiry({
        phone: phoneNumber,
        name: ProfileName || 'Unknown (WhatsApp Lead)',
        description: `Initial WhatsApp Message: ${messageText}`,
        serviceType: 'General Enquiry' // Default, as configured in the model
      });

      await newEnquiry.save();

      twiml.message('Welcome to Borewell Services! We have received your request. One of our representatives will contact you shortly on this number to assist you further.');
    }

    // Send the TwiML response back to Twilio
    res.type('text/xml').send(twiml.toString());
    
  } catch (error) {
    console.error('Error handling WhatsApp webhook:', error);
    // Send a fallback message if something fails
    const twiml = new MessagingResponse();
    twiml.message('Sorry, we are experiencing technical difficulties. Please try again later.');
    res.type('text/xml').send(twiml.toString());
  }
};

module.exports = {
  handleIncomingMessage
};
