const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

router.get('/getHome', homeController.getHome); 
router.post('/update', homeController.updateHome);

module.exports = router;