const Enquiry = require('../models/Enquiry');

exports.getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json({ success: true, data: enquiries });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.createEnquiry = async (req, res) => {
  try {
    const { name, phone, email, address, serviceType, description } = req.body;
    if (!name || !phone || !serviceType) {
      return res.status(400).json({ success: false, message: 'Name, phone and service type are required.' });
    }
    
    const newEnquiry = await Enquiry.create({
      name, phone, email: email || '', address: address || '',
      serviceType, description: description || '',
      status: 'Pending'
    });
    
    res.status(201).json({ success: true, data: newEnquiry, message: 'Enquiry submitted successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.updateEnquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const enquiry = await Enquiry.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    
    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found.' });
    }
    
    res.json({ success: true, data: enquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.deleteEnquiry = async (req, res) => {
  try {
    const { id } = req.params;
    await Enquiry.findByIdAndDelete(id);
    res.json({ success: true, message: 'Enquiry deleted.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
