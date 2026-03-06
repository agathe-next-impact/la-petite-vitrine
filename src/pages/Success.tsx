import { useEffect, useState } from 'react';
import { CheckIcon, ArrowLeftIcon } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import StyledButton from '../components/ui/styled-button';

export const Success: React.FC = () => {
  const [type, setType] = useState<'devis' | 'commande'>('devis');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const t = urlParams.get('type');
    if (t === 'commande') setType('commande');
  }, []);

  const isDevis = type === 'devis';

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full bg-white shadow-shadow-dark-XL">
        <CardHeader className="text-center pb-6">
          <div className={`w-20 h-20 ${isDevis ? 'bg-blue-100' : 'bg-green-100'} rounded-full flex items-center justify-center mx-auto mb-4`}>
            <CheckIcon className={`w-10 h-10 ${isDevis ? 'text-blue-600' : 'text-green-600'}`} />
          </div>
          <h1 className="text-3xl font-heading-2 text-blue-gray900 mb-2">
            {isDevis ? 'Demande de devis envoyee !' : 'Commande envoyee !'}
          </h1>
          <p className="text-blue-gray600 font-body-l">
            {isDevis
              ? 'Merci pour votre demande. Vous recevrez votre devis par email.'
              : 'Merci pour votre commande. Nous l\'avons bien recue.'}
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-heading-6 text-blue-gray900 mb-3">
              Prochaines etapes
            </h3>
            <ul className="space-y-2 text-sm text-blue-gray700">
              <li className="flex items-start gap-2">
                <CheckIcon className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Vous recevrez un email recapitulatif dans les prochaines minutes</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>
                  {isDevis
                    ? 'Notre equipe vous recontactera sous 48h pour echanger sur votre projet et finaliser votre devis'
                    : 'Notre equipe vous contactera sous 48h pour demarrer votre projet'}
                </span>
              </li>
              {!isDevis && (
                <li className="flex items-start gap-2">
                  <CheckIcon className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Votre site sera livre selon les delais annonces des validation de votre commande.</span>
                </li>
              )}
            </ul>
          </div>

          <div className="text-center space-y-4">
            <p className="text-blue-gray600 font-body-m">
              Une question ? Contactez-nous a{' '}
              <a href="mailto:contact@lapetitevitrine.com" className="text-amber-900 hover:underline">
                contact@lapetitevitrine.com
              </a>
            </p>

            <StyledButton
              variant="primary"
              onClick={() => window.location.href = '/'}
              className="inline-flex items-center gap-2"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Retour a l'accueil
            </StyledButton>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};