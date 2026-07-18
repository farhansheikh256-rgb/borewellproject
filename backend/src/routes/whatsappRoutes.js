const express = require('express');
const router = express.Router();
const whatsappController = require('../controllers/whatsappController');

// Twilio webhook endpoint
router.post('/webhook', whatsappController.handleIncomingMessage);

module.exports = router;
