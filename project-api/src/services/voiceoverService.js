const gTTS = require('gtts');
const fs = require('fs');
const path = require('path');

// Generate voiceover using Google TTS and return base64 string
function generateVoiceover(text, lang = 'en') {
  return new Promise((resolve, reject) => {
    const gtts = new gTTS(text, lang);
    const filename = path.join(__dirname, `voice_${Date.now()}.mp3`);
    gtts.save(filename, err => {
      if (err) return reject(err);
      fs.readFile(filename, (readErr, data) => {
        fs.unlink(filename, () => {});
        if (readErr) return reject(readErr);
        resolve(data.toString('base64'));
      });
    });
  });
}

module.exports = { generateVoiceover };
