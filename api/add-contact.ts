import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('[add-contact] Début traitement requête');
  
  if (req.method !== 'POST') {
    console.log('[add-contact] Méthode non autorisée:', req.method);
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { firstName, contact, email } = req.body ?? {};
  console.log('[add-contact] Données reçues:', { firstName, contact, email });

  if (!firstName || !contact || !email) {
    console.log('[add-contact] Champs manquants');
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    console.log('[add-contact] Tentative d\'envoi email avec Resend');
    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'no-reply@lapetitevitrine.com',
      to: process.env.ADMIN_EMAIL || 'contact@lapetitevitrine.com',
      subject: `Nouvelle demande de contact - ${firstName}`,
      html: `
        <h2>Nouvelle demande de contact</h2>
        <p><strong>Prénom :</strong> ${firstName}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Téléphone :</strong> ${contact}</p>
      `,
      replyTo: email, // Correction : reply_to -> replyTo
    });

    if (error) {
      throw new Error(error.message);
    }

    console.log('[add-contact] Email envoyé avec succès:', data);
    return res.status(200).json({ message: 'Email envoyé', id: data.id });
  } catch (error: any) {
    console.error('[add-contact] Erreur Resend:', {
      message: error?.message,
      name: error?.name,
      response: error?.response,
      stack: error?.stack,
    });
    return res.status(500).json({ 
      message: 'Erreur lors de l\'envoi',
      detail: error?.message 
    });
  }
}
