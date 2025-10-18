import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  const { firstName, lastName, email, phone, selectedPack } = req.body ?? {};

  if (!firstName || !lastName || !email || !phone || !selectedPack) {
    return res.status(400).json({ message: 'Champs manquants' });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'no-reply@lapetitevitrine.com',
      to: process.env.ADMIN_EMAIL || 'contact@lapetitevitrine.com',
      subject: `Nouvelle commande - ${firstName} ${lastName}`,
      html: `
        <h2>Nouvelle commande reçue</h2>
        <ul>
          <li><strong>Prénom :</strong> ${firstName}</li>
          <li><strong>Nom :</strong> ${lastName}</li>
          <li><strong>Email :</strong> ${email}</li>
          <li><strong>Téléphone :</strong> ${phone}</li>
          <li><strong>Pack sélectionné :</strong> ${selectedPack}</li>
        </ul>
      `,
      replyTo: email,
    });

    if (error) {
      throw new Error(error.message);
    }

    return res.status(200).json({ success: true, id: data.id });
  } catch (err: any) {
    return res.status(500).json({ message: 'Erreur lors de l\'envoi', detail: err?.message });
  }
}