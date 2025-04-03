const express = require('express');
const router = express.Router();
const contactFormController = require('../controllers/contactFormController');

router.get('/getContactList', contactFormController.getContactList); 
router.post('/submit', contactFormController.submitContactForm);

module.exports = router;