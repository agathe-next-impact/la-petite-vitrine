// API de diagnostic pour vérifier la configuration
export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  const requiredEnvVars = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'SMTP_FROM'];
  const envStatus = {};
  
  requiredEnvVars.forEach(envVar => {
    envStatus[envVar] = {
      defined: !!process.env[envVar],
      value: process.env[envVar] ? `${process.env[envVar].substring(0, 3)}***` : 'undefined'
    };
  });

  const missingVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
  
  res.setHeader('Content-Type', 'application/json');
  return res.status(200).json({
    status: missingVars.length === 0 ? 'OK' : 'ERROR',
    message: missingVars.length === 0 
      ? 'Toutes les variables d\'environnement sont configurées' 
      : `Variables manquantes: ${missingVars.join(', ')}`,
    envStatus,
    missingVars,
    timestamp: new Date().toISOString()
  });
}