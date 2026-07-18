const mongoose = require('mongoose');

const chatLeadSchema = new mongoose.Schema(
  {
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    chatHistory: {
      type: Array, // Array of { role: 'user' | 'model', text: String }
      required: true,
    },
    status: {
      type: String,
      enum: ['New', 'Contacted'],
      default: 'New',
    },
  },
  {
    timestamps: true,
  }
);

const ChatLead = mongoose.model('ChatLead', chatLeadSchema);
module.exports = ChatLead;
