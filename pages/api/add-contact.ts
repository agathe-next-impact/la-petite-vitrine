import type { NextApiRequest, NextApiResponse } from 'next';
import Resend from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { firstName, contact, email } = req.body ?? {};
  if (!firstName || !contact || !email) return res.status(400).json({ message: 'Missing fields' });

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM || 'no-reply@lapetitevitrine.com',
      to: 'contact@lapetitevitrine.com',
      subject: `Nouvelle demande de contact — ${firstName}`,
      html: `
        <h2>Nouvelle demande de contact</h2>
        <p><strong>Prénom :</strong> ${firstName}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Téléphone :</strong> ${contact}</p>
      `,
    });

    return res.status(200).json({ message: 'Email envoyé' });
  } catch (error) {
    console.error('Resend error:', error);
    return res.status(500).json({ message: 'Erreur lors de l\'envoi' });
  }
}