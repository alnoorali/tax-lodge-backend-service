const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

router.get('/getService', serviceController.getService); 
router.post('/update', serviceController.updateService);

module.exports = router;