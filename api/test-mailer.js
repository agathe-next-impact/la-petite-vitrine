const nodemailer = require('nodemailer');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  const envVars = {
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS ? 'CONFIGURÉ' : 'MANQUANT',
    SMTP_FROM: process.env.SMTP_FROM,
    NODE_ENV: process.env.NODE_ENV
  };

  console.log('🔍 Variables d\'environnement:', envVars);

  try {
    // Test de création du transporter
    const mailer = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Test de vérification de la connexion
    const verified = await mailer.verify();
    
    return res.status(200).json({
      status: 'SUCCESS',
      message: 'Mailer testé avec succès',
      envVars,
      connectionVerified: verified,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Erreur test mailer:', error);
    return res.status(500).json({
      status: 'ERROR',
      message: 'Erreur lors du test du mailer',
      error: error.message,
      envVars,
      timestamp: new Date().toISOString()
    });
  }
};