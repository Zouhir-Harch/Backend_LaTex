const express = require('express');
const router = express.Router();
const { generatePage, parsePrompt } = require('../controllers/promptController');

// Route pour analyser un prompt
router.post('/parse-prompt', parsePrompt);

// Route pour générer une page de garde
router.post('/generate', generatePage);

module.exports = router;
