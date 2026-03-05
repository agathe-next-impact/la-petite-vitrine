import { createRequire } from 'module';
import cors from 'cors';

const require = createRequire(import.meta.url);

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

// Cache simple pour éviter les doublons (en mémoire)
const recentSubmissions = new Map();
const DUPLICATE_WINDOW = 30000; // 30 secondes

if (missingEnvVars.length > 0) {
  console.error('❌ Variables d\'environnement manquantes:', missingEnvVars);
} else {
  try {
    const nodemailer = require('nodemailer');
    mailer = nodemailer.createTransport({
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
    mailer = null;
  }
}

export default async function handler(req, res) {
  // Appliquer CORS
  await runCors(req, res, corsMiddleware);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  console.log('📨 Réception demande de contact:', req.body);
  
  const { firstName, contact, email } = req.body;

  if (!firstName || !contact || !email) {
    console.log('❌ Champs manquants:', { firstName, contact, email });
    return res.status(400).json({ message: 'Tous les champs sont requis' });
  }

  // Vérification des doublons
  const submissionKey = `${email}-${firstName}-${contact}`;
  const now = Date.now();
  
  if (recentSubmissions.has(submissionKey)) {
    const lastSubmission = recentSubmissions.get(submissionKey);
    if (now - lastSubmission < DUPLICATE_WINDOW) {
      console.log('⚠️ Soumission dupliquée détectée, ignorée:', submissionKey);
      return res.json({ 
        message: 'Email déjà envoyé récemment',
        status: 'success' 
      });
    }
  }
  
  // Enregistrer cette soumission
  recentSubmissions.set(submissionKey, now);
  
  // Nettoyer les anciennes entrées
  for (const [key, timestamp] of recentSubmissions.entries()) {
    if (now - timestamp > DUPLICATE_WINDOW) {
      recentSubmissions.delete(key);
    }
  }

  if (!mailer || missingEnvVars.length > 0) {
    console.log('❌ Mailer non configuré - Variables manquantes:', missingEnvVars);
    return res.status(500).json({ 
      message: 'Mailer non configuré', 
      missingVars: missingEnvVars 
    });
  }

  try {
    // Email vers l'admin
    const adminEmail = 'agathe@next-impact.digital';
    console.log('📤 Envoi email admin...', adminEmail);
    
    const adminHtml = `
      <html>
      <head>
        <meta charset="utf-8">
        <title>Nouvelle demande de contact - La Petite Vitrine</title>
        <style>
          body { 
            font-family: 'Inter', Arial, sans-serif; 
            background: #F9FAFB; 
            color: #222; 
            margin: 0; 
            padding: 0; 
          }
          .container { 
            max-width: 600px; 
            margin: 0 auto; 
            padding: 32px 20px; 
            background: #F9FAFB; 
          }
          .header { 
            text-align: center; 
            margin-bottom: 32px; 
          }
          .header h1 { 
            font-size: 2rem; 
            color: #2E66C1; 
            margin: 0; 
            font-weight: 700; 
            letter-spacing: -1px; 
          }
          .content { 
            background: #fff; 
            border-radius: 16px; 
            padding: 32px; 
            margin-bottom: 24px; 
            border: 1px solid #E0E7EF; 
            box-shadow: 0 4px 24px 0 rgba(46,102,193,0.07); 
          }
          .field { 
            margin-bottom: 16px; 
          }
          .label { 
            font-weight: 600; 
            color: #2E66C1; 
            margin-bottom: 4px; 
          }
          .value { 
            color: #222; 
            font-size: 1.1rem; 
          }
          .footer { 
            text-align: center; 
            color: #B0B7C3; 
            font-size: 0.9rem; 
            margin-top: 16px; 
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Nouvelle demande de contact</h1>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Prénom :</div>
              <div class="value">${firstName}</div>
            </div>
            <div class="field">
              <div class="label">Contact :</div>
              <div class="value">${contact}</div>
            </div>
            <div class="field">
              <div class="label">Email :</div>
              <div class="value">${email}</div>
            </div>
          </div>
          <div class="footer">
            La Petite Vitrine &mdash; contact@lapetitevitrine.com
          </div>
        </div>
      </body>
      </html>
    `;

    await mailer.sendMail({
      from: `"La Petite Vitrine" <${process.env.SMTP_FROM}>`,
      to: adminEmail,
      subject: 'Nouvelle demande de contact - La Petite Vitrine',
      html: adminHtml,
    });

    console.log('✅ Email admin envoyé avec succès');

    // Email de confirmation au client
    console.log('📤 Envoi email confirmation client...', email);
    
    const clientHtml = `
      <html>
      <head>
        <meta charset="utf-8">
        <title>Merci pour votre demande de contact - La Petite Vitrine</title>
        <style>
          body { 
            font-family: 'Inter', Arial, sans-serif; 
            background: #F9FAFB; 
            color: #222; 
            margin: 0; 
            padding: 0; 
          }
          .container { 
            max-width: 600px; 
            margin: 0 auto; 
            padding: 32px 20px; 
            background: #F9FAFB; 
          }
          .header { 
            text-align: center; 
            margin-bottom: 32px; 
          }
          .header h1 { 
            font-size: 2rem; 
            color: #2E66C1; 
            margin: 0; 
            font-weight: 700; 
            letter-spacing: -1px; 
          }
          .content { 
            background: #fff; 
            border-radius: 16px; 
            padding: 32px; 
            margin-bottom: 24px; 
            border: 1px solid #E0E7EF; 
            box-shadow: 0 4px 24px 0 rgba(46,102,193,0.07); 
          }
          .contact-info { 
            background: #F0F9FF; 
            border-radius: 12px; 
            padding: 24px; 
            margin-top: 24px; 
            border: 1px solid #0EA5E9; 
          }
          .footer { 
            text-align: center; 
            color: #B0B7C3; 
            font-size: 0.9rem; 
            margin-top: 16px; 
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Merci ${firstName} !</h1>
          </div>
          <div class="content">
            <p style="font-size:1.1rem;color:#2E66C1;margin:0 0 16px 0;font-weight:600;">
              Votre demande de contact a bien été reçue.
            </p>
            <p style="margin:0 0 16px 0;">
              Nous vous recontacterons dans les plus brefs délais pour discuter de votre projet.
            </p>
            <div class="contact-info">
              <h3 style="color:#2E66C1;margin:0 0 16px 0;">Nos coordonnées</h3>
              <p style="margin:0 0 8px 0;">
                <strong>📧 Email :</strong> 
                <a href="mailto:contact@lapetitevitrine.com" style="color:#D97706;">contact@lapetitevitrine.com</a>
              </p>
              <p style="margin:0;">
                <strong>📞 Téléphone :</strong> 
                <a href="tel:0673981638" style="color:#D97706;">06 73 98 16 38</a>
              </p>
            </div>
          </div>
          <div class="footer">
            La Petite Vitrine &mdash; contact@lapetitevitrine.com
          </div>
        </div>
      </body>
      </html>
    `;

    await mailer.sendMail({
      from: `"La Petite Vitrine" <${process.env.SMTP_FROM}>`,
      to: email,
      subject: 'Merci pour votre demande de contact - La Petite Vitrine',
      html: clientHtml,
    });

    console.log('✅ Email client envoyé avec succès');

    res.json({ 
      message: 'Emails envoyés avec succès',
      status: 'success'
    });

  } catch (error) {
    console.error('❌ Erreur envoi emails:', error);
    res.status(500).json({ 
      message: 'Erreur lors de l\'envoi des emails', 
      error: error.message 
    });
  }
};