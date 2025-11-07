// Test nodemailer avec import dynamique
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  try {
    // Import dynamique de nodemailer
    const nodemailer = await import('nodemailer');
    console.log('Nodemailer import dynamique:', typeof nodemailer, typeof nodemailer.default);
    
    // Utiliser .default pour les modules CommonJS importés en ES6
    const mailerModule = nodemailer.default || nodemailer;
    
    const transporter = mailerModule.createTransporter({
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
      message: 'Mailer testé avec import dynamique',
      connectionVerified: verified,
      importType: typeof nodemailer,
      defaultType: typeof nodemailer.default,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Erreur test mailer:', error);
    res.setHeader('Content-Type', 'application/json');
    return res.status(500).json({
      status: 'ERROR',
      message: 'Erreur lors du test du mailer',
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
  }
}