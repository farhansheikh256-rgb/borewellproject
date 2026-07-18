const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Unknown (WhatsApp Lead)',
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    default: '',
  },
  address: {
    type: String,
    default: '',
  },
  serviceType: {
    type: String,
    default: 'General Enquiry',
  },
  description: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['Pending', 'Under Review', 'Completed'],
    default: 'Pending',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Enquiry', enquirySchema);
