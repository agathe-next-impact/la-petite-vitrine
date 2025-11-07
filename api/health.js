export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    emailConfigured: !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS),
    variables: {
      SMTP_HOST: process.env.SMTP_HOST ? '✅ Configuré' : '❌ Manquant',
      SMTP_USER: process.env.SMTP_USER ? '✅ Configuré' : '❌ Manquant',
      SMTP_PASS: process.env.SMTP_PASS ? '✅ Configuré' : '❌ Manquant',
      SMTP_FROM: process.env.SMTP_FROM ? '✅ Configuré' : '❌ Manquant'
    }
  });
}