const { exec } = require('child_process');

/**
 * Mixes a voiceover audio track with a video file using ffmpeg.
 * @param {string} videoPath - Path to the input video file.
 * @param {string} audioPath - Path to the input voiceover audio file.
 * @param {string} outputPath - Path where the output video should be written.
 * @returns {Promise<void>}
 */
function mixVoiceover(videoPath, audioPath, outputPath) {
  return new Promise((resolve, reject) => {
    const cmd = `ffmpeg -y -i "${videoPath}" -i "${audioPath}" -c:v copy -c:a aac -shortest "${outputPath}"`;
    exec(cmd, err => {
      if (err) return reject(err);
      resolve();
    });
  });
}

module.exports = { mixVoiceover };
