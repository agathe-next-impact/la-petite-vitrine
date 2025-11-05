import React, { useState } from 'react';
import StyledButton from '../components/ui/styled-button';

export const TestEmailPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Test Email');
  const [message, setMessage] = useState('Ceci est un test d’envoi d’email.');
  const [log, setLog] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);

  const handleSend = async () => {
    setLoading(true);
    setLog([`[${new Date().toLocaleTimeString()}] ➡️ Début de l’envoi d’email`]);
    setSuccess(null);
    try {
      setLog(prev => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] 📤 Préparation de la requête API`,
        `Données envoyées: email="${email}", subject="${subject}", message="${message}"`
      ]);
      const response = await fetch('http://localhost:3001/api/test-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, subject, message })
      });
      setLog(prev => [...prev, `[${new Date().toLocaleTimeString()}] ⏳ Attente de la réponse du serveur…`]);
      const result = await response.json();
      setLog(prev => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] 📥 Réponse reçue:`,
        `Status HTTP: ${response.status} ${response.statusText}`,
        `Payload: ${JSON.stringify(result, null, 2)}`
      ]);
      if (result.success) {
        setSuccess(true);
        setLog(prev => [...prev, `[${new Date().toLocaleTimeString()}] ✅ Email envoyé avec succès !`]);
      } else {
        setSuccess(false);
        setLog(prev => [...prev, `[${new Date().toLocaleTimeString()}] ❌ Échec de l’envoi: ${result.error || 'Erreur inconnue'}`]);
      }
    } catch (error: any) {
      setSuccess(false);
      setLog(prev => [...prev, `[${new Date().toLocaleTimeString()}] ⚠️ Exception JS: ${error.message}`]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-xl shadow-lg p-8 space-y-6">
        <h1 className="text-2xl font-bold text-blue-gray900 mb-4">Test d’envoi d’email</h1>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-blue-gray900 mb-1">Email destinataire</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 border-gray-300"
              placeholder="destinataire@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-blue-gray900 mb-1">Sujet</label>
            <input
              type="text"
              value={subject}
              onChange={e => setSubject(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 border-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-blue-gray900 mb-1">Message</label>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 border-gray-300"
            />
          </div>
        </div>
        <StyledButton
          variant="primary"
          onClick={handleSend}
          disabled={loading || !email}
          className="w-full mt-4"
        >
          {loading ? 'Envoi…' : 'Envoyer le test'}
        </StyledButton>
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-blue-gray900 mb-2">Logs détaillés</h2>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-xs text-gray-700 h-40 overflow-auto">
            {log.length === 0 ? <span>Aucun log pour l’instant.</span> : log.map((l, i) => <div key={i}>{l}</div>)}
          </div>
          {success === true && <p className="text-green-600 mt-2">Email envoyé avec succès !</p>}
          {success === false && <p className="text-red-600 mt-2">Échec de l’envoi.</p>}
        </div>
      </div>
    </div>
  );
};

export default TestEmailPage;
