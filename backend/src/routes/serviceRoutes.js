const express = require('express');
const router = express.Router();
const c = require('../controllers/serviceController');
const auth = require('../middleware/authMiddleware');

router.get('/', c.getAllServices);
router.post('/', auth, c.createService);
router.put('/:id', auth, c.updateService);
router.delete('/:id', auth, c.deleteService);

module.exports = router;
