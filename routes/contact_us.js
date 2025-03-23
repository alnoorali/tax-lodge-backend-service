const express = require('express');
const router = express.Router();
const contactUsController = require('../controllers/contactUsController');

router.get('/getContactUs', contactUsController.getContactUs); 
router.post('/update', contactUsController.updateContactUs);

module.exports = router;