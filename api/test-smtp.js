import { createRequire } from 'module';
const require = createRequire(import.meta.url);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'GET only' });
  }

  const results = { steps: [], env: {} };
  const requiredVars = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'SMTP_FROM'];

  for (const v of requiredVars) {
    results.env[v] = process.env[v] ? `${process.env[v].substring(0, 4)}...` : 'MISSING';
  }

  try {
    const nodemailer = require('nodemailer');
    results.steps.push('nodemailer loaded');

    // Test 1: AUTH LOGIN
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: true,
        authMethod: 'LOGIN',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        tls: { rejectUnauthorized: false },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 10000,
      });

      await transporter.verify();
      results.steps.push('AUTH LOGIN: OK');
    } catch (e) {
      results.steps.push(`AUTH LOGIN failed: ${e.message} (code: ${e.code}, response: ${e.response})`);
    }

    // Test 2: AUTH PLAIN (default)
    try {
      const transporter2 = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        tls: { rejectUnauthorized: false },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 10000,
      });

      await transporter2.verify();
      results.steps.push('AUTH PLAIN: OK');
    } catch (e) {
      results.steps.push(`AUTH PLAIN failed: ${e.message} (code: ${e.code}, response: ${e.response})`);
    }

    // Test 3: Port 587 STARTTLS
    try {
      const transporter3 = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: 587,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        tls: { rejectUnauthorized: false },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 10000,
      });

      await transporter3.verify();
      results.steps.push('Port 587 STARTTLS: OK');
    } catch (e) {
      results.steps.push(`Port 587 STARTTLS failed: ${e.message} (code: ${e.code}, response: ${e.response})`);
    }

  } catch (e) {
    results.steps.push(`Fatal: ${e.message}`);
  }

  res.json(results);
}
