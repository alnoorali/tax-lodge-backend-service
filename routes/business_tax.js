const express = require('express');
const router = express.Router();
const businessTaxController = require('../controllers/businessTaxController');

router.get('/getBusinessTax', businessTaxController.getBusinessTax); 
router.post('/update', businessTaxController.updateBusinessTax);

module.exports = router;