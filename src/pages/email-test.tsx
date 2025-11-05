import React, { useState } from "react";

export default function EmailTestPage() {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("Test Email");
  const [message, setMessage] = useState("Ceci est un test d'envoi d'email via Resend.");
  const [logs, setLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setLogs([]);
    setResult(null);
    setLogs((prev) => [...prev, "⏳ Démarrage de l'envoi..."]);
    try {
      setLogs((prev) => [...prev, "📡 Requête POST vers http://localhost:3001/api/send-order-recap"]);
      const res = await fetch("http://localhost:3001/api/send-order-recap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: [to],
          subject,
          html: `<p>${message}</p>`
        }),
      });
      setLogs((prev) => [...prev, `🔄 Statut HTTP: ${res.status}`]);
      let data;
      try {
        data = await res.json();
        setLogs((prev) => [...prev, `📬 Réponse: ${JSON.stringify(data)}`]);
        setResult(data);
        if (data.success) {
          setLogs((prev) => [...prev, "✅ Email envoyé avec succès !"]);
        } else {
          setLogs((prev) => [...prev, "❌ Échec de l'envoi."]);
        }
      } catch (jsonErr) {
        const rawText = await res.text();
        setLogs((prev) => [...prev, `❗ Erreur JSON: ${jsonErr instanceof Error ? jsonErr.message : "Erreur inconnue"}`]);
        setLogs((prev) => [...prev, `📄 Contenu brut de la réponse: ${rawText}`]);
        setResult({ error: "Erreur JSON", raw: rawText });
      }
    } catch (err) {
      let errorMsg = "Erreur inconnue";
      if (err instanceof Error) {
        errorMsg = err.message;
      }
      setLogs((prev) => [...prev, `❗ Erreur: ${errorMsg}`]);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-bold mb-4">Test d'envoi d'email (Resend)</h1>
      <form className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md mb-6" onSubmit={handleSend}>
        <label className="block mb-2 font-semibold">Destinataire</label>
        <input type="email" value={to} onChange={e => setTo(e.target.value)} required className="w-full border rounded px-3 py-2 mb-4" placeholder="email@exemple.com" />
        <label className="block mb-2 font-semibold">Sujet</label>
        <input type="text" value={subject} onChange={e => setSubject(e.target.value)} required className="w-full border rounded px-3 py-2 mb-4" />
        <label className="block mb-2 font-semibold">Message</label>
        <textarea value={message} onChange={e => setMessage(e.target.value)} required className="w-full border rounded px-3 py-2 mb-4" rows={4} />
        <button type="submit" disabled={loading} className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 transition">
          {loading ? "Envoi en cours..." : "Envoyer"}
        </button>
      </form>
      <div className="bg-white shadow rounded-lg p-4 w-full max-w-md">
        <h2 className="font-bold mb-2">Logs détaillés</h2>
        <div className="text-xs font-mono whitespace-pre-wrap">
          {logs.map((log, i) => <div key={i}>{log}</div>)}
        </div>
        {result && (
          <div className="mt-4">
            <h3 className="font-semibold">Résultat</h3>
            <pre className="bg-gray-100 p-2 rounded text-xs">{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
