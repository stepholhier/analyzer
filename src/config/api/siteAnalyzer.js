import express from 'express';
import axios from 'axios';

const router = express.Router();

router.post('/analyze-site', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const response = await axios.post('https://api.openai.com/v1/completions', {
      prompt: `Analyze the site at ${url}.`,
      model: 'text-davinci-003',
      max_tokens: 1000
    }, {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      }
    });

    res.status(200).json({ analysis: response.data.choices[0].text });
  } catch (error) {
    console.error("Ocorreu um erro:", error);
    res.status(500).json({ error: 'Failed to analyze the site' });
  }
});

export default router;
