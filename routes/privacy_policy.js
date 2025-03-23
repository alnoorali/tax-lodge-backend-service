const express = require('express');
const router = express.Router();
const privacyPolicyController = require('../controllers/privacyPolicyController');

router.get('/getPrivacyPolicy', privacyPolicyController.getPrivacyPolicy); 
router.post('/update', privacyPolicyController.updatePrivacyPolicy);

module.exports = router;