const express = require('express');
const router = express.Router();
const aboutUsController = require('../controllers/aboutUsController');

router.get('/getAboutUs', aboutUsController.getAboutUs); 
router.post('/update', aboutUsController.updateAboutUs);

module.exports = router;