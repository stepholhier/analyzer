import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import siteAnalyzer from './siteAnalyzer.js';

dotenv.config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API está rodando 🚀');
});

// Rota correta
app.use('/api', siteAnalyzer);

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${port}`);
});
