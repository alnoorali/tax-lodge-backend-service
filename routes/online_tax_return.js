const express = require('express');
const router = express.Router();
const onlineTaxReturnController = require('../controllers/onlineTaxReturnController');

router.get('/getOnlineTaxReturn', onlineTaxReturnController.getOnlineTaxReturn); 
router.post('/update', onlineTaxReturnController.updateOnlineTaxReturn);

module.exports = router;