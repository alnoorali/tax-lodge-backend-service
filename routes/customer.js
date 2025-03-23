const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.get('/:id', customerController.getCustomerById); 
router.post('/update', customerController.updateCustomer);

module.exports = router;