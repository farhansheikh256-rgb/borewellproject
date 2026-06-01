const express = require('express');
const router = express.Router();
const c = require('../controllers/enquiryController');
const auth = require('../middleware/authMiddleware');

router.post('/', c.createEnquiry);
router.get('/', auth, c.getAllEnquiries);
router.patch('/:id', auth, c.updateEnquiry);
router.delete('/:id', auth, c.deleteEnquiry);

module.exports = router;
