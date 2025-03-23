const express = require('express');
const router = express.Router();
const termsConditionsController = require('../controllers/termsConditionsController');

router.get('/getTermsConditions', termsConditionsController.getTermsConditions); 
router.post('/update', termsConditionsController.updateTermsConditions);

module.exports = router;