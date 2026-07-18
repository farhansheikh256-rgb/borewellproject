const { GoogleGenerativeAI } = require('@google/generative-ai');
const ChatLead = require('../models/ChatLead');

// Initialize Gemini (only if API key is present)
const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;

// System prompt for the chatbot
const SYSTEM_INSTRUCTION = `
You are a helpful, professional, and friendly virtual assistant for "DoctorWater", a trusted borewell services company in South India. 
Your goal is to answer customer questions about borewell drilling, pump installation, motor repair, borewell maintenance, water tank cleaning, and casing installation. 
Keep your answers very short (1-3 sentences) and conversational.
Do not make up prices if you don't know them; say you can provide a custom quote.

IMPORTANT: You are the first part of a lead capture flow. After answering their question, ALWAYS end your message by politely asking them to provide their WhatsApp phone number so a human expert can reach out to them with more details or a quote.
Example: "I can help with that! A new borewell typically takes 2 days depending on the soil. Could you please share your WhatsApp phone number so our expert can call you with a detailed quote?"
`;

const handleChatMessage = async (req, res) => {
  try {
    const { message, history } = req.body; 

    if (!message) {
      return res.status(400).json({ success: false, message: 'Message is required' });
    }

    if (!genAI) {
      // Fallback if no API key is provided
      return res.status(200).json({
        success: true,
        reply: "Thanks for reaching out to DoctorWater! I'm currently in basic mode. Could you please provide your WhatsApp phone number so our experts can contact you directly?"
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: SYSTEM_INSTRUCTION
    });

    const chatSession = model.startChat({
      history: history || []
    });

    const result = await chatSession.sendMessage(message);
    const reply = result.response.text();

    res.status(200).json({ success: true, reply });
  } catch (error) {
    console.error('Error handling chat message:', error);
    res.status(500).json({ success: false, message: 'Server error handling chat' });
  }
};

const saveChatLead = async (req, res) => {
  try {
    const { phoneNumber, chatHistory } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({ success: false, message: 'Phone number is required' });
    }

    const newLead = await ChatLead.create({
      phoneNumber,
      chatHistory: chatHistory || []
    });

    res.status(201).json({ success: true, data: newLead });
  } catch (error) {
    console.error('Error saving chat lead:', error);
    res.status(500).json({ success: false, message: 'Server error saving lead' });
  }
};

const getChatLeads = async (req, res) => {
  try {
    const leads = await ChatLead.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: leads });
  } catch (error) {
    console.error('Error fetching chat leads:', error);
    res.status(500).json({ success: false, message: 'Server error fetching leads' });
  }
};

const updateChatLeadStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const lead = await ChatLead.findByIdAndUpdate(id, { status }, { new: true });
    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }

    res.status(200).json({ success: true, data: lead });
  } catch (error) {
    console.error('Error updating chat lead:', error);
    res.status(500).json({ success: false, message: 'Server error updating lead' });
  }
};

module.exports = {
  handleChatMessage,
  saveChatLead,
  getChatLeads,
  updateChatLeadStatus
};
