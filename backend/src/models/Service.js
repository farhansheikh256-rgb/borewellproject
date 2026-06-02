const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: 'default',
  },
  price: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    default: 'general',
  },
  popular: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Service', serviceSchema);
