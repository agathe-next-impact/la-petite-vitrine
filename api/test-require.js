// Test nodemailer avec createRequire
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  try {
    // Utiliser require dans ES6
    const nodemailer = require('nodemailer');
    console.log('Nodemailer avec require:', typeof nodemailer);
    
    const transporter = nodemailer.createTransporter({
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
    const verified = await transporter.verify();
    
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({
      status: 'SUCCESS',
      message: 'Mailer testé avec createRequire',
      connectionVerified: verified,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Erreur test mailer:', error);
    res.setHeader('Content-Type', 'application/json');
    return res.status(500).json({
      status: 'ERROR',
      message: 'Erreur lors du test du mailer',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}