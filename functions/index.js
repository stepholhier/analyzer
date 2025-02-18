import functions from "firebase-functions";
import express from "express";
import cors from "cors";
import axios from "axios";
import "dotenv/config"; // Importa as variáveis de ambiente

const app = express();
app.use(cors());
app.use(express.json());

app.post("/analyze-site", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const response = await axios.post("https://api.openai.com/v1/completions", {
      prompt: `Analyze the site at ${url}.`,
      model: "text-davinci-003",
      max_tokens: 1000
    }, {
      headers: {
        Authorization: `Bearer ${functions.config().openai.key}`
      }
    });

    res.status(200).json({ analysis: response.data.choices[0].text });
  } catch (error) {
    console.error("Error analyzing site:", error);
    res.status(500).json({ error: "Failed to analyze the site" });
  }
});

export const api = functions.https.onRequest(app);
