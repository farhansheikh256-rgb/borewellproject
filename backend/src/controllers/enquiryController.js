const db = require('../models/db');
const { v4: uuidv4 } = require('uuid');

exports.getAllEnquiries = (req, res) => {
  const enquiries = db.getEnquiries();
  res.json({ success: true, data: enquiries });
};

exports.createEnquiry = (req, res) => {
  const { name, phone, email, address, serviceType, description } = req.body;
  if (!name || !phone || !serviceType) {
    return res.status(400).json({ success: false, message: 'Name, phone and service type are required.' });
  }
  const enquiries = db.getEnquiries();
  const newEnquiry = {
    id: uuidv4(),
    name, phone, email: email || '', address: address || '',
    serviceType, description: description || '',
    status: 'Pending',
    createdAt: new Date().toISOString(),
  };
  enquiries.unshift(newEnquiry);
  db.saveEnquiries(enquiries);
  res.status(201).json({ success: true, data: newEnquiry, message: 'Enquiry submitted successfully!' });
};

exports.updateEnquiry = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const enquiries = db.getEnquiries();
  const idx = enquiries.findIndex(e => e.id === id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'Enquiry not found.' });
  enquiries[idx] = { ...enquiries[idx], status, updatedAt: new Date().toISOString() };
  db.saveEnquiries(enquiries);
  res.json({ success: true, data: enquiries[idx] });
};

exports.deleteEnquiry = (req, res) => {
  const { id } = req.params;
  let enquiries = db.getEnquiries();
  enquiries = enquiries.filter(e => e.id !== id);
  db.saveEnquiries(enquiries);
  res.json({ success: true, message: 'Enquiry deleted.' });
};
