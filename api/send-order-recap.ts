import type { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm, File as FormidableFile } from 'formidable';
import fs from 'fs';
import { Resend } from 'resend';

export const config = {
  api: { bodyParser: false },
};

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('[API] Reçu une requête:', req.method, req.body);
  if (req.method !== 'POST') {
    console.log('[API] Mauvaise méthode:', req.method);
    return res.status(405).end();
  }

  const form = new IncomingForm({ multiples: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors du parsing du formulaire' });
    }

    const to = Array.isArray(fields.to) ? fields.to[0] : fields.to;
    const subject = Array.isArray(fields.subject) ? fields.subject[0] : fields.subject;
    const html = Array.isArray(fields.html) ? fields.html[0] : fields.html;

    // Récupération des fichiers (supporte visualFiles[], textFiles[], otherFiles[] ou files[])
    let attachments: any[] = [];
    const allFiles: FormidableFile[] = [];
    let cids: string[] = [];
    if (fields.cids) {
      try {
        const cidData = Array.isArray(fields.cids) ? fields.cids[0] : fields.cids;
        cids = JSON.parse(cidData as string);
      } catch {
        cids = [];
      }
    }

    // Ajoute tous les fichiers des différents champs attendus
    ['visualFiles', 'textFiles', 'otherFiles', 'files'].forEach((key) => {
      const fileField = files[key];
      if (fileField) {
        if (Array.isArray(fileField)) {
          allFiles.push(...fileField);
        } else {
          allFiles.push(fileField);
        }
      }
    });

    // Prépare les pièces jointes pour Resend
    attachments = await Promise.all(
      allFiles.map(async (file, idx) => ({
        filename: file.originalFilename || file.newFilename,
        content: await fs.promises.readFile(file.filepath),
        cid: cids[idx],
      }))
    );

    try {
      await resend.emails.send({
        from: process.env.FROM_EMAIL || 'contact@lapetitevitrine.com',
        to,
        subject,
        html,
        attachments,
        replyTo: 'contact@lapetitevitrine.com' // Permet la réponse à la bonne adresse
      });
      res.status(200).json({ success: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });
}