const voiceoverService = require('../services/voiceoverService');

async function generateVoiceover(req, res) {
  const { text, lang } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'text is required' });
  }
  try {
    const audio = await voiceoverService.generateVoiceover(text, lang);
    res.json({ audio });
  } catch (err) {
    console.error('voiceover generation failed', err);
    res.status(500).json({ error: 'failed to generate voiceover' });
  }
}

module.exports = { generateVoiceover };
