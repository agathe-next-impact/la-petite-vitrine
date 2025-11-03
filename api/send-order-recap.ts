import type { NextApiRequest, NextApiResponse } from 'next';
import { mailer } from '../lib/mailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  const { firstName, lastName, email, phone, selectedPack } = req.body ?? {};

  if (!firstName || !lastName || !email || !phone || !selectedPack) {
    return res.status(400).json({ message: 'Champs manquants' });
  }

  try {
    await mailer.sendMail({
      from: `"La Petite Vitrine" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER, // ou ADMIN_EMAIL si tu veux
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

    return res.status(200).json({ success: true });
  } catch (err: any) {
    return res.status(500).json({ message: 'Erreur lors de l\'envoi', detail: err?.message });
  }
}