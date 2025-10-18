import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

function isEmail(v?: string) {
  return typeof v === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { firstName, contact, email } = req.body ?? {};

  if (!firstName || !contact || !email) return res.status(400).json({ message: 'Missing fields' });
  if (!isEmail(email)) return res.status(400).json({ message: 'Invalid user email' });

  const FROM = process.env.FROM_EMAIL || 'no-reply@lapetitevitrine.com';
  const ADMIN = process.env.ADMIN_EMAIL || 'contact@lapetitevitrine.com';
  if (!isEmail(FROM) || !isEmail(ADMIN)) {
    console.error('Invalid FROM/ADMIN env', { FROM, ADMIN });
    return res.status(500).json({ message: 'Server misconfiguration' });
  }

  try {
    const sendResult = await resend.emails.send({
      from: FROM,
      to: ADMIN,
      subject: `Nouvelle demande de contact — ${firstName}`,
      html: `
        <h2>Nouvelle demande de contact</h2>
        <p><strong>Prénom :</strong> ${firstName}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Téléphone :</strong> ${contact}</p>
      `,
      reply_to: email,
    });

    console.log('Resend send ok', sendResult);
    return res.status(200).json({ message: 'Email envoyé' });
  } catch (err: any) {
    // Log complet pour diagnostiquer le 422 (inclut body / status si présent)
    console.error('Resend send error:', {
      message: err?.message,
      name: err?.name,
      stack: err?.stack,
      response: err?.response ?? err, // SDK peut exposer response
    });

    // Si la réponse contient details, renvoyer un message générique côté client
    return res.status(500).json({ message: 'Erreur lors de l\'envoi (voir logs serveurs pour détails)' });
  }
}