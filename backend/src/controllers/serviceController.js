const Service = require('../models/Service');

exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json({ success: true, data: services });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.createService = async (req, res) => {
  try {
    const { name, description, icon, price, category, popular } = req.body;
    if (!name || !price) {
      return res.status(400).json({ success: false, message: 'Name and price required.' });
    }
    
    const newService = await Service.create({
      name, description: description || '', icon: icon || 'default', 
      price, category: category || 'general', popular: !!popular
    });
    
    res.status(201).json({ success: true, data: newService });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found.' });
    }
    
    res.json({ success: true, data: service });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    await Service.findByIdAndDelete(id);
    res.json({ success: true, message: 'Service deleted.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
