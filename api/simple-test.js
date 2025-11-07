// Test simple pour vérifier le format des fonctions Vercel
export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({
    message: 'Test simple réussi',
    method: req.method,
    timestamp: new Date().toISOString()
  });
}