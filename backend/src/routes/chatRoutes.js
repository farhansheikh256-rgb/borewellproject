const express = require('express');
const { handleChatMessage, saveChatLead, getChatLeads, updateChatLeadStatus } = require('../controllers/chatController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes for the website chat widget
router.post('/message', handleChatMessage);
router.post('/lead', saveChatLead);

// Protected routes for the Admin Panel
router.get('/leads', auth, getChatLeads);
router.patch('/leads/:id/status', auth, updateChatLeadStatus);

module.exports = router;
