import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import multer from 'multer';

dotenv.config();

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Ajout pour les données de formulaire

// Configuration multer pour les uploads de fichiers
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB max par fichier
  }
});

// Configuration du mailer avec gestion d'erreur
let mailer;
try {
  mailer = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_PORT === '465', // SSL pour port 465, sinon STARTTLS
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  console.log('✅ Mailer configuré avec succès');
} catch (error) {
  console.error('❌ Erreur configuration mailer:', error);
}

// Route pour les contacts
app.post('/api/add-contact', async (req, res) => {
  console.log('📨 Réception demande contact:', req.body);
  
  const { firstName, contact, email } = req.body;

  if (!firstName || !contact || !email) {
    console.log('❌ Champs manquants:', { firstName, contact, email });
    return res.status(400).json({ message: 'Champs manquants' });
  }

  if (!mailer) {
    console.log('❌ Mailer non configuré');
    return res.status(500).json({ message: 'Mailer non configuré' });
  }

  try {
    console.log('📤 Envoi emails...');
    
    // Email pour l'admin (existant)
    await mailer.sendMail({
      from: `"La Petite Vitrine" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: `Nouvelle demande de contact - ${firstName}`,
      html: `
        <h2>Nouvelle demande de contact</h2>
        <ul>
          <li><strong>Prénom :</strong> ${firstName}</li>
          <li><strong>Email :</strong> ${email}</li>
          <li><strong>Téléphone :</strong> ${contact}</li>
        </ul>
      `,
      replyTo: email,
    });

    // Email de confirmation pour le client
    const confirmationHtml = `
      <!DOCTYPE html>
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
          .header img { 
            height: 60px; 
            margin-bottom: 12px; 
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
          .highlight { 
            background: #FFF8E1; 
            border-radius: 12px; 
            padding: 20px 24px; 
            margin: 24px 0; 
            border: 1px solid #FCD34D; 
          }
          .contact-info { 
            background: #F0F9FF; 
            border-radius: 12px; 
            padding: 20px 24px; 
            margin: 24px 0; 
            border: 1px solid #0EA5E9; 
          }
          .contact-info h3 { 
            color: #2E66C1; 
            font-size: 1.2rem; 
            margin-bottom: 16px; 
            font-weight: 600; 
          }
          .contact-item { 
            display: flex; 
            align-items: center; 
            margin-bottom: 12px; 
            color: #2E66C1; 
          }
          .contact-item:last-child { 
            margin-bottom: 0; 
          }
          .contact-item strong { 
            font-weight: 600; 
            margin-right: 8px; 
          }
          .footer { 
            text-align: center; 
            color: #B0B7C3; 
            font-size: 0.9rem; 
            margin-top: 24px; 
          }
          .btn { 
            display: inline-block; 
            background: #D97706; 
            color: #fff; 
            font-weight: 600; 
            font-size: 1.1rem; 
            padding: 14px 36px; 
            border-radius: 32px; 
            text-decoration: none; 
            box-shadow: 0 2px 8px 0 rgba(46,102,193,0.08); 
            transition: background 0.2s; 
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="https://lapetitevitrine.com/logo-pv.png" alt="La Petite Vitrine" />
            <h1>Merci pour votre demande !</h1>
          </div>
          
          <div class="content">
            <p style="font-size:1.1rem;color:#2E66C1;margin:0 0 16px 0;font-weight:600;">
              Bonjour ${firstName},
            </p>
            <p style="font-size:1rem;color:#222;margin:0 0 16px 0;">
              Nous avons bien reçu votre demande de contact. Notre équipe vous contactera dans les plus brefs délais pour échanger sur vos besoins en création de site web.
            </p>
            
            <div class="highlight">
              <p style="font-size:1rem;color:#2E66C1;margin:0 0 8px 0;font-weight:600;">
                📋 Récapitulatif de votre demande
              </p>
              <p style="margin:0;color:#222;">
                <strong>Prénom :</strong> ${firstName}<br>
                <strong>Email :</strong> ${email}<br>
                <strong>Téléphone :</strong> ${contact}
              </p>
            </div>

            <div class="contact-info">
              <h3>💬 Nos coordonnées</h3>
              <div class="contact-item">
                <strong>📧 Email :</strong> contact@lapetitevitrine.com
              </div>
              <div class="contact-item">
                <strong>📞 Téléphone :</strong> 06 73 98 16 38
              </div>
            </div>

            <p style="font-size:1rem;color:#222;margin:16px 0 0 0;">
              En attendant, n'hésitez pas à nous contacter directement si vous avez des questions urgentes.
            </p>
            
            <div style="text-align:center;margin:32px 0;">
              <a href="mailto:contact@lapetitevitrine.com" class="btn">
                ✉️ Nous écrire
              </a>
            </div>
          </div>

          <div class="footer">
            <p>La Petite Vitrine - Création de sites web pour artisans</p>
            <p>📧 contact@lapetitevitrine.com | 📞 06 73 98 16 38</p>
          </div>
        </div>
      </body>
      </html>
    `;

    await mailer.sendMail({
      from: `"La Petite Vitrine" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Merci pour votre demande de contact - La Petite Vitrine`,
      html: confirmationHtml,
    });

    console.log('✅ Emails envoyés avec succès (admin + confirmation client)');
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Erreur envoi email:', err);
    return res.status(500).json({ 
      message: 'Erreur lors de l\'envoi', 
      detail: err?.message 
    });
  }
});

// Route pour les commandes (emails de récapitulatif)
app.post('/api/send-order-recap', async (req, res) => {
  console.log('📨 Réception récapitulatif commande:', { body: req.body });
  
  const { to, subject, htmlContent } = req.body;

  if (!to || !subject || !htmlContent) {
    console.log('❌ Champs manquants pour récapitulatif:', { to, subject, htmlContent: htmlContent ? 'présent' : 'manquant' });
    return res.status(400).json({ message: 'Champs manquants (to, subject, htmlContent requis)' });
  }

  if (!mailer) {
    console.log('❌ Mailer non configuré');
    return res.status(500).json({ message: 'Mailer non configuré' });
  }

  try {
    console.log('📤 Envoi email récapitulatif...');
    
    const result = await mailer.sendMail({
      from: process.env.SMTP_FROM,
      to: to,
      subject: subject,
      html: htmlContent,
    });

    console.log('✅ Email récapitulatif envoyé avec succès!', result.messageId);
    res.json({ 
      message: 'Email envoyé avec succès', 
      messageId: result.messageId 
    });

  } catch (error) {
    console.error('❌ Erreur envoi email récapitulatif:', error);
    res.status(500).json({ 
      message: 'Erreur lors de l\'envoi de l\'email', 
      error: error.message 
    });
  }
});

// Route de test
app.post('/api/test-email', async (req, res) => {
  const { email, subject, message } = req.body;

  if (!email || !subject || !message) {
    return res.status(400).json({ error: 'Champs manquants' });
  }

  try {
    await mailer.sendMail({
      from: `"La Petite Vitrine Test" <${process.env.SMTP_USER}>`,
      to: email,
      subject: subject,
      html: `<p>${message}</p>`,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Erreur envoi email test:', err);
    return res.status(500).json({ 
      error: 'Erreur lors de l\'envoi', 
      detail: err?.message 
    });
  }
});

const server = app.listen(port, () => {
  console.log(`🚀 Serveur API démarré sur http://localhost:${port}`);
  console.log(`📧 Mailer configuré avec: ${process.env.SMTP_HOST || 'non configuré'}`);
  console.log('💡 Serveur en attente de requêtes...');
});

// Maintenir le serveur ouvert
server.keepAliveTimeout = 120000;
server.timeout = 120000;

// Empêcher la fermeture automatique du processus
process.stdin.resume();

// Gestion des erreurs non capturées
process.on('uncaughtException', (error) => {
  console.error('❌ Erreur non capturée:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Promesse rejetée:', reason);
});