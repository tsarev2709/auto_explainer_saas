const express = require('express');
const controller = require('../controllers/voiceoverController');

const router = express.Router();

router.post('/generate-voiceover', controller.generateVoiceover);

module.exports = router;
