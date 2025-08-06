# voice-mixer

Utility service that uses `ffmpeg` to combine a voiceover audio track with a
given video file. The mixed video retains the original video track and replaces
or adds the provided audio.

```js
const { mixVoiceover } = require('./index')

mixVoiceover('input.mp4', 'voice.mp3', 'output.mp4')
  .then(() => console.log('mix complete'))
  .catch(err => console.error(err))
```
