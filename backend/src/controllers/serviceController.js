const db = require('../models/db');
const { v4: uuidv4 } = require('uuid');

exports.getAllServices = (req, res) => {
  const services = db.getServices();
  res.json({ success: true, data: services });
};

exports.createService = (req, res) => {
  const { name, description, icon, price, category, popular } = req.body;
  if (!name || !price) return res.status(400).json({ success: false, message: 'Name and price required.' });
  const services = db.getServices();
  const newService = { id: uuidv4(), name, description: description || '', icon: icon || 'default', price, category: category || 'general', popular: !!popular };
  services.push(newService);
  db.saveServices(services);
  res.status(201).json({ success: true, data: newService });
};

exports.updateService = (req, res) => {
  const { id } = req.params;
  const services = db.getServices();
  const idx = services.findIndex(s => s.id === id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Service not found.' });
  services[idx] = { ...services[idx], ...req.body, id };
  db.saveServices(services);
  res.json({ success: true, data: services[idx] });
};

exports.deleteService = (req, res) => {
  const { id } = req.params;
  let services = db.getServices();
  services = services.filter(s => s.id !== id);
  db.saveServices(services);
  res.json({ success: true, message: 'Service deleted.' });
};
