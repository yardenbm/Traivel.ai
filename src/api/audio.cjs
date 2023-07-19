const cors = require('cors');
const AWS = require('aws-sdk');
const express = require('express');
const app = express();
app.use(cors());

AWS.config.update({
  accessKeyId: 'AKIAZIEY5VPF5RR7X56M',
  secretAccessKey: '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',
  region: 'us-east-1',
});

const Polly = new AWS.Polly();

app.use(express.json());

app.post('/api/audio', async (req, res) => {
  const { text, speaker } = req.body;
  const speakerToVoiceId = {
    'Justin': 'Justin',
    'Ivy': 'Ivy',
    'Sabo': 'Matthew',
    'Alexa': 'Kendra'
  };
  const voiceId = speakerToVoiceId[speaker];
  const params = {
    OutputFormat: 'mp3',
    Text: text,
    VoiceId: voiceId,
  };

  try {
    const data = await Polly.synthesizeSpeech(params).promise();

    if (data.AudioStream instanceof Buffer) {
      const audioBuffer = data.AudioStream;
      const audioData = audioBuffer.toString('base64');
      const audioFile = `data:audio/mp3;base64,${audioData}`;

      // Send the audio file and voiceId as a response
      res.send({ audioFile, voiceId });
    } else {
      throw new Error('AudioStream is not an instance of Buffer.');
    }
  } catch (error) {
    console.error('Failed to generate audio:', error);
    res.status(500).send({ error: 'Failed to generate audio' });
  }
});

const port = 8103;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});