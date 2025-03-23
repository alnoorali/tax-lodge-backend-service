const express = require('express');
const router = express.Router();
const refundPolicyController = require('../controllers/refundPolicyController');

router.get('/getRefundPolicy', refundPolicyController.getRefundPolicy); 
router.post('/update', refundPolicyController.updateRefundPolicy);

module.exports = router;