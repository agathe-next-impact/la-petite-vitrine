import express from 'express';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.post('/api/add-contact', (req, res) => {
  console.log('📨 Requête reçue:', req.body);
  res.json({ success: true, message: 'Contact reçu' });
});

const server = app.listen(port, () => {
  console.log(`🚀 Serveur simple démarré sur http://localhost:${port}`);
});

// Empêcher la fermeture automatique
process.stdin.resume();