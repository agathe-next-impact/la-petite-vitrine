// Test pour explorer la structure de nodemailer
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

export default async function handler(req, res) {
  try {
    const nodemailer = require('nodemailer');
    
    // Explorer la structure de l'objet nodemailer
    const structure = {
      type: typeof nodemailer,
      keys: Object.keys(nodemailer),
      hasCreateTransporter: typeof nodemailer.createTransporter,
      hasDefault: typeof nodemailer.default,
      constructor: nodemailer.constructor.name
    };
    
    // Essayer différentes méthodes d'accès
    let transporter = null;
    let method = '';
    
    if (typeof nodemailer.createTransporter === 'function') {
      method = 'direct';
      transporter = 'found via direct access';
    } else if (nodemailer.default && typeof nodemailer.default.createTransporter === 'function') {
      method = 'default';
      transporter = 'found via .default';
    } else if (typeof nodemailer === 'function') {
      method = 'nodemailer as function';
      transporter = 'nodemailer itself might be the constructor';
    }
    
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({
      status: 'SUCCESS',
      message: 'Exploration de nodemailer',
      structure,
      method,
      transporter,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    res.setHeader('Content-Type', 'application/json');
    return res.status(500).json({
      status: 'ERROR',
      message: 'Erreur lors de l\'exploration',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}