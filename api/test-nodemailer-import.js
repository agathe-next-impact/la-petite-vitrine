// Test nodemailer avec import ES6 correct
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  try {
    console.log('Test nodemailer object:', typeof nodemailer, Object.keys(nodemailer));
    
    // Test de création du transporter avec import correct
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
    
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({
      status: 'SUCCESS',
      message: 'Mailer testé avec import ES6',
      connectionVerified: verified,
      nodemailerType: typeof nodemailer,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Erreur test mailer:', error);
    res.setHeader('Content-Type', 'application/json');
    return res.status(500).json({
      status: 'ERROR',
      message: 'Erreur lors du test du mailer',
      error: error.message,
      nodemailerType: typeof nodemailer,
      timestamp: new Date().toISOString()
    });
  }
}