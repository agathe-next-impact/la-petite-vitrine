import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PackSelector } from './PackSelector';
import { Button } from '../ui/button';

type FlowStep = 'pack-selection' | 'form';

export const EcommerceFlow: React.FC = () => {
  const [currentFlow, setCurrentFlow] = useState<FlowStep>('pack-selection');
  const [selectedPack, setSelectedPack] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Étape 1 : Choix du pack
  const handlePackSelected = (pack: any) => {
    setSelectedPack(pack);
    setCurrentFlow('form');
  };

  // Étape 2 : Formulaire de contact
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    try {
      const res = await fetch('/api/send-order-recap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          selectedPack: selectedPack?.id,
        }),
      });
      if (!res.ok) throw new Error('Erreur lors de l\'envoi');
      navigate('/success'); // correspond à la route définie dans App.tsx
    } catch (err) {
      setError('Erreur lors de l\'envoi du formulaire');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-blue-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="md:text-3xl text-2xl font-bold text-blue-gray100 font-heading-2 text-center mb-8">
          Commande en ligne
        </h1>
        {currentFlow === 'pack-selection' && (
          <PackSelector
            selectedPack={selectedPack}
            onSelectPack={handlePackSelected}
          />
        )}
        {currentFlow === 'form' && (
          <form onSubmit={handleFormSubmit} className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-md space-y-4">
            <h2 className="text-xl font-semibold mb-4">Vos informations de contact</h2>
            <input
              name="firstName"
              placeholder="Prénom"
              required
              value={formData.firstName || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-amber-300/40 rounded-xl"
            />
            <input
              name="lastName"
              placeholder="Nom"
              required
              value={formData.lastName || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-amber-300/40 rounded-xl"
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              value={formData.email || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-amber-300/40 rounded-xl"
            />
            <input
              name="phone"
              placeholder="Téléphone"
              required
              value={formData.phone || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-amber-300/40 rounded-xl"
            />
            <Button type="submit" disabled={sending} className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium px-8 py-3 rounded-xl shadow-md">
              {sending ? 'Envoi...' : 'Envoyer'}
            </Button>
            {error && <div className="text-red-600 mt-2">{error}</div>}
          </form>
        )}
      </div>
    </div>
  );
};