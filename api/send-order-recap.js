const nodemailer = require('nodemailer');
const cors = require('cors');

// Configuration CORS
const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? [
        'https://lapetitevitrine.com', 
        'https://www.lapetitevitrine.com',
        'http://lapetitevitrine.com',
        'http://www.lapetitevitrine.com'
      ]
    : ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Helper pour CORS
function runCors(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

const corsMiddleware = cors(corsOptions);

// Configuration du mailer
let mailer;
const requiredEnvVars = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('❌ Variables d\'environnement manquantes:', missingEnvVars);
} else {
  try {
    mailer = nodemailer.createTransporter({
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
    console.log('✅ Mailer configuré avec succès');
  } catch (error) {
    console.error('❌ Erreur configuration mailer:', error);
  }
}

module.exports = async function handler(req, res) {
  // Appliquer CORS
  await runCors(req, res, corsMiddleware);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  console.log('📨 Réception récapitulatif commande:', { 
    to: req.body.to,
    subject: req.body.subject,
    htmlLength: req.body.htmlContent?.length || 0
  });
  
  const { to, subject, htmlContent } = req.body;

  if (!to || !subject || !htmlContent) {
    console.log('❌ Champs manquants pour récapitulatif:', { to, subject, htmlContent: htmlContent ? 'présent' : 'manquant' });
    return res.status(400).json({ message: 'Champs manquants (to, subject, htmlContent requis)' });
  }

  if (!mailer || missingEnvVars.length > 0) {
    console.log('❌ Mailer non configuré - Variables manquantes:', missingEnvVars);
    return res.status(500).json({ 
      message: 'Mailer non configuré', 
      missingVars: missingEnvVars 
    });
  }

  try {
    console.log('📤 Envoi email récapitulatif vers:', to);
    
    // Validation basique de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
      console.log('❌ Format email invalide:', to);
      return res.status(400).json({ message: 'Format email invalide' });
    }
    
    const result = await mailer.sendMail({
      from: `"La Petite Vitrine" <${process.env.SMTP_FROM}>`,
      to: to,
      subject: subject,
      html: htmlContent,
    });

    console.log('✅ Email récapitulatif envoyé avec succès vers', to, '- ID:', result.messageId);
    console.log('📋 Informations de livraison:', {
      accepted: result.accepted,
      rejected: result.rejected,
      pending: result.pending,
      response: result.response
    });
    
    res.json({ 
      message: 'Email envoyé avec succès', 
      messageId: result.messageId,
      recipient: to,
      deliveryInfo: {
        accepted: result.accepted,
        rejected: result.rejected
      }
    });

  } catch (error) {
    console.error('❌ Erreur envoi email récapitulatif:', error);
    res.status(500).json({ 
      message: 'Erreur lors de l\'envoi de l\'email', 
      error: error.message 
    });
  }
};