import React, { useState } from 'react';
import { useEcommerce } from '../../hooks/useEcommerce';
import { PackSelector } from './PackSelector';
import { OptionsSelector } from './OptionsSelector';
import { SubscriptionSelector } from './SubscriptionSelector';
import { StepForm } from './StepForm';
import { OrderSummary } from './OrderSummary';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';
import { ArrowLeftIcon, HomeIcon } from 'lucide-react';
import { PACKS } from '../../data/ecommerce-data';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { API_CONFIG } from '../../lib/api-config';

type FlowStep = 'pack-selection' | 'options-selection' | 'subscriptions-selection' | 'form' | 'summary';

const scrollToTop = () => {
  const scrollToTopImmediate = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  scrollToTopImmediate();
  setTimeout(scrollToTopImmediate, 100);
  setTimeout(scrollToTopImmediate, 300);
};

interface EcommerceFlowProps {
  initialFlow?: FlowStep;
  preSelectedPackId?: string;
}

export const EcommerceFlow: React.FC<EcommerceFlowProps> = ({
  initialFlow = 'pack-selection',
  preSelectedPackId
}) => {
  const [currentFlow, setCurrentFlow] = useState<FlowStep>(initialFlow);
  const navigate = useNavigate();

  const {
    stepFormData,
    selectPack,
    toggleOption,
    toggleSubscription,
    updateFormData,
    goToStep,
    nextStep,
    prevStep,
    calculateTotal,
    calculateMonthlyTotal,
    createOrder,
    isFormValid,
    isLastStep,
    isFirstStep
  } = useEcommerce();

  // Pre-selection du pack si specifie
  useEffect(() => {
    if (preSelectedPackId && !stepFormData.selectedPack) {
      const pack = PACKS.find(p => p.id === preSelectedPackId);
      if (pack) {
        selectPack(pack);
      }
    }
  }, [preSelectedPackId, stepFormData.selectedPack, selectPack]);

  // Auto-select default pack if arriving at options without a pack
  useEffect(() => {
    if (currentFlow === 'options-selection' && !stepFormData.selectedPack && !preSelectedPackId) {
      const defaultPack = PACKS[0];
      if (defaultPack) selectPack(defaultPack);
    }
  }, [currentFlow, stepFormData.selectedPack, selectPack, preSelectedPackId]);

  useEffect(() => {
    if (currentFlow === 'options-selection' || currentFlow === 'subscriptions-selection') {
      setTimeout(() => scrollToTop(), 100);
    }
  }, [currentFlow]);

  const [emailSent, setEmailSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [emailResult, setEmailResult] = useState<string | null>(null);

  const changeFlowWithScroll = (newFlow: FlowStep) => {
    setCurrentFlow(newFlow);
    setTimeout(() => scrollToTop(), 200);
  };

  const FORM_FIELD_LABELS: Record<string, string> = {
    firstName: "Prenom",
    lastName: "Nom",
    email: "Email",
    phone: "Telephone",
    company: "Entreprise",
  };

  const handleCompleteOrder = async () => {
    setSending(true);
    setEmailResult(null);
    try {
      await createOrder();
      const pack = stepFormData.selectedPack;
      const options = stepFormData.selectedOptions;
      const subscriptions = stepFormData.selectedSubscriptions;
      const formData = stepFormData.formData;
      const total = calculateTotal();
      const monthlyTotal = calculateMonthlyTotal();
      const adminEmail = "contact@lapetitevitrine.com";

      if (pack && formData.email) {
        const optionsHtml = options.length > 0
          ? `<h3>Options supplementaires</h3>
             <ul>${options.map(o => `<li style="color:#222;font-weight:600;">${o.title} - ${o.price}€</li>`).join('')}</ul>`
          : '';

        const subscriptionsHtml = subscriptions.length > 0
          ? `<h3>Abonnements mensuels</h3>
             <ul>${subscriptions.map(s => `<li style="color:#222;font-weight:600;">${s.title} - ${s.price}€/mois</li>`).join('')}</ul>`
          : '';

        const totalHtml = `
          <h3>Montant total</h3>
          <p style="font-size:1.1rem;color:#2E66C1;font-weight:700;margin:0 0 8px 0;">
            ${total}€
            ${monthlyTotal > 0 ? `<span style="color:#222;font-weight:400;font-size:0.95rem;">(+${monthlyTotal}€/mois)</span>` : ''}
          </p>`;

        const recapContent = `
          <h2>Recapitulatif de commande</h2>
          <h3>Site web selectionne</h3>
          <ul>
            <li style="color:#222;font-weight:600;">${pack.title} - ${pack.price}€</li>
            ${pack.features.map(f => `<li style="color:#2E66C1;">${f}</li>`).join('')}
          </ul>
          ${optionsHtml}
          ${subscriptionsHtml}
          <h3>Informations client</h3>
          <ul>
            ${Object.entries(formData)
              .map(([k, v]) => `<li><strong style="color:#2E66C1;">${FORM_FIELD_LABELS[k] ?? k}:</strong> <span style="color:#222;">${v}</span></li>`)
              .join('')}
          </ul>
          ${totalHtml}`;

        const htmlClient = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <title>Confirmation de commande - La Petite Vitrine</title>
            <style>
              body { font-family: 'Inter', Arial, sans-serif; background: #F9FAFB; color: #222; }
              .container { max-width: 600px; margin: 0 auto; padding: 32px 0 24px 0; background: #F9FAFB; border-radius: 18px; border: 1px solid #E0E7EF; box-shadow: 0 4px 24px 0 rgba(46,102,193,0.07); }
              .header { text-align: center; margin-bottom: 32px; }
              .header img { height: 60px; margin-bottom: 12px; }
              .header h1 { font-size: 2rem; color: #2E66C1; margin: 0; font-weight: 700; letter-spacing: -1px; }
              .section { background: #FFF8E1; border-radius: 12px; padding: 20px 24px; margin: 0 24px 24px 24px; border: 1px solid #FCD34D; }
              .recap { background: #fff; border-radius: 12px; padding: 24px 24px 16px 24px; margin: 0 24px 24px 24px; border: 1px solid #E0E7EF; }
              .recap h2 { color: #2E66C1; font-size: 1.2rem; margin-bottom: 12px; font-weight: 700; }
              .recap h3 { color: #F59E42; font-size: 1rem; margin-bottom: 6px; font-weight: 600; }
              ul { margin: 0 0 12px 0; padding-left: 18px; }
              li { color: #2E66C1; }
              .footer { text-align: center; color: #B0B7C3; font-size: 0.9rem; margin-top: 16px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <img src="https://lapetitevitrine.com/logo-pv.png" alt="La Petite Vitrine" />
                <h1>Confirmation de commande</h1>
              </div>
              <div class="section">
                <p style="font-size:1.05rem;color:#2E66C1;margin:0 0 8px 0;font-weight:600;">
                  Merci pour votre confiance !
                </p>
                <p style="font-size:1rem;color:#222;margin:0;">
                  Prenez des a present contact avec notre equipe pour nous faire part de vos attentes precises. </br>
                  C'est a l'issue de cet echange que nous vous enverrons un message de confirmation de commande avec un lien pour proceder au paiement en ligne.
                  Nous commencerons alors la creation de votre site internet.
                </p>
                <div style="background:#F0F9FF;border-radius:12px;padding:24px;margin:24px 0;border:1px solid #0EA5E9;">
                  <h3 style="color:#2E66C1;font-size:1.2rem;margin:0 0 16px 0;font-weight:600;text-align:center;">
                    Contactez-nous directement
                  </h3>
                  <div style="text-align:center;">
                    <div style="margin-bottom:12px;">
                      <strong style="color:#2E66C1;">Email :</strong>
                      <a href="mailto:contact@lapetitevitrine.com" style="color:#D97706;text-decoration:none;margin-left:8px;">
                        contact@lapetitevitrine.com
                      </a>
                    </div>
                    <div>
                      <strong style="color:#2E66C1;">Telephone :</strong>
                      <a href="tel:0673981638" style="color:#D97706;text-decoration:none;margin-left:8px;">
                        06 73 98 16 38
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="recap">
                ${recapContent}
              </div>
              <div class="footer">
                La Petite Vitrine &mdash; contact@lapetitevitrine.com
              </div>
            </div>
          </body>
          </html>`;

        const htmlAdmin = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <title>Nouvelle commande recue - La Petite Vitrine</title>
            <style>
              body { font-family: 'Inter', Arial, sans-serif; background: #F9FAFB; color: #222; }
              .container { max-width: 600px; margin: 0 auto; padding: 32px 0 24px 0; background: #F9FAFB; border-radius: 18px; border: 1px solid #E0E7EF; box-shadow: 0 4px 24px 0 rgba(46,102,193,0.07); }
              .header { text-align: center; margin-bottom: 32px; }
              .header img { height: 60px; margin-bottom: 12px; }
              .header h1 { font-size: 2rem; color: #2E66C1; margin: 0; font-weight: 700; letter-spacing: -1px; }
              .section { background: #FFF8E1; border-radius: 12px; padding: 20px 24px; margin: 0 24px 24px 24px; border: 1px solid #FCD34D; }
              .recap { background: #fff; border-radius: 12px; padding: 24px 24px 16px 24px; margin: 0 24px 24px 24px; border: 1px solid #E0E7EF; }
              .recap h2 { color: #2E66C1; font-size: 1.2rem; margin-bottom: 12px; font-weight: 700; }
              .recap h3 { color: #F59E42; font-size: 1rem; margin-bottom: 6px; font-weight: 600; }
              ul { margin: 0 0 12px 0; padding-left: 18px; }
              li { color: #2E66C1; }
              .footer { text-align: center; color: #B0B7C3; font-size: 0.9rem; margin-top: 16px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <img src="https://lapetitevitrine.com/logo-pv.png" alt="La Petite Vitrine" />
                <h1>Nouvelle commande recue</h1>
              </div>
              <div class="section">
                <p style="font-size:1.05rem;color:#2E66C1;margin:0 0 8px 0;font-weight:600;">
                  Nouvelle commande a traiter.
                </p>
                <p style="font-size:1rem;color:#222;margin:0;">
                  Un client vient de passer commande. Retrouvez le recapitulatif ci-dessous.
                </p>
              </div>
              <div class="recap">
                ${recapContent}
              </div>
              <div class="footer">
                La Petite Vitrine &mdash; contact@lapetitevitrine.com
              </div>
            </div>
          </body>
          </html>`;

        const API_BASE_URL = API_CONFIG.BASE_URL;

        // Verification email suspect
        const emailDomain = formData.email.split('@')[1]?.toLowerCase();
        const suspiciousDomains = ['10minutemail', 'guerrillamail', 'mailinator', 'tempmail'];
        const isEmailSafe = emailDomain && !suspiciousDomains.some(domain => emailDomain.includes(domain));

        if (!isEmailSafe) {
          console.warn('Email client non envoye - domaine suspect:', emailDomain);
        } else {
          const clientResponse = await fetch(`${API_BASE_URL}/api/send-order-recap`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              to: formData.email,
              subject: 'Votre recapitulatif de commande - La Petite Vitrine',
              htmlContent: htmlClient,
            }),
          });

          if (!clientResponse.ok) {
            const errorText = await clientResponse.text();
            console.error('Erreur envoi email client:', errorText);
            throw new Error(`Erreur envoi email client: ${clientResponse.status}`);
          }
        }

        // Envoi email admin
        const adminResponse = await fetch(`${API_BASE_URL}/api/send-order-recap`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: adminEmail,
            subject: 'Nouvelle commande recue - La Petite Vitrine',
            htmlContent: htmlAdmin,
          }),
        });

        if (!adminResponse.ok) {
          const errorText = await adminResponse.text();
          console.error('Erreur envoi email admin:', errorText);
          throw new Error(`Erreur envoi email admin: ${adminResponse.status}`);
        }

        setEmailSent(true);
        setEmailResult('Emails envoyes avec succes !');
      } else {
        setEmailResult('Erreur : donnees de commande incompletes.');
      }
      navigate('/success');
    } catch (error) {
      setEmailResult('Erreur lors de la creation de la commande');
      console.log('[EcommerceFlow] Erreur:', error);
    } finally {
      setSending(false);
    }
  };

  const handleFormCompleted = async () => {
    await handleCompleteOrder();
  };

  const goBack = () => {
    switch (currentFlow) {
      case 'options-selection':
        changeFlowWithScroll('pack-selection');
        break;
      case 'subscriptions-selection':
        changeFlowWithScroll('options-selection');
        break;
      case 'form':
        changeFlowWithScroll('subscriptions-selection');
        break;
      case 'summary':
        changeFlowWithScroll('form');
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-blue-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* En-tete */}
        <div className="flex justify-center items-center mb-8 bg-amber-900 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-amber-200/50">
          <div className="flex flex-col items-center space-4 gap-6">
            <div className='flex justify-start gap-2'>
            <Button
              variant="default"
              onClick={() => window.location.href = '/'}
              className="flex items-center gap-2 border-blue-gray-300 text-blue-gray-100 hover:bg-blue-gray-50"
            >
              <HomeIcon className="w-4 h-4" />
              Accueil
            </Button>

            {currentFlow !== 'pack-selection' && (
              <Button
                variant="outline"
                onClick={goBack}
                className="flex items-center gap-2 border-amber-300 text-amber-900 hover:bg-amber-50"
              >
                <ArrowLeftIcon className="w-4 h-4" />
                Retour
              </Button>
            )}
            </div>
            <div className="flex flex-col items-center gap-4">
            <h1 className="md:text-3xl text-2xl font-bold text-blue-gray100 font-heading-2 text-center">
              Commande en ligne
            </h1>
            <p className="text-blue-gray200 text-center font-body-l">
              Nous validons votre commande sous 48h, vous recevrez un email de confirmation avec les details.
            </p>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {currentFlow === 'pack-selection' && (
              <PackSelector
                selectedPack={stepFormData.selectedPack}
                showPackDetails={true}
                onSelectPack={(pack) => {
                  selectPack(pack);
                  changeFlowWithScroll('options-selection');
                }}
              />
            )}

            {currentFlow === 'options-selection' && (
              <>
                {stepFormData.selectedPack && (
                  <Card className="mb-8 bg-amber-50 border-amber-200">
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-blue-gray900">Site selectionne</h3>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => changeFlowWithScroll('pack-selection')}
                          className="text-amber-700 border-amber-300 hover:bg-amber-100"
                        >
                          Changer
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-blue-gray900">{stepFormData.selectedPack.title}</h4>
                          <p className="text-sm text-blue-gray600 mt-1">{stepFormData.selectedPack.description}</p>
                        </div>
                        <span className="font-bold text-amber-900 text-lg">{stepFormData.selectedPack.price}€</span>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <OptionsSelector
                  selectedOptions={stepFormData.selectedOptions}
                  onToggleOption={toggleOption}
                  className="mb-8"
                />
                <div className="flex justify-end">
                  <Button
                    onClick={() => changeFlowWithScroll('subscriptions-selection')}
                    className="bg-amber-600 hover:bg-amber-700 text-white font-medium px-8 py-3 rounded-xl shadow-md"
                  >
                    Continuer
                  </Button>
                </div>
              </>
            )}

            {currentFlow === 'subscriptions-selection' && (
              <>
                <SubscriptionSelector
                  selectedSubscriptions={stepFormData.selectedSubscriptions}
                  onToggleSubscription={toggleSubscription}
                  className="mb-8"
                />
                <div className="flex justify-end">
                  <Button
                    onClick={() => changeFlowWithScroll('form')}
                    className="bg-amber-600 hover:bg-amber-700 text-white font-medium px-8 py-3 rounded-xl shadow-md"
                  >
                    Continuer
                  </Button>
                </div>
              </>
            )}

            {currentFlow === 'form' && (
              <StepForm
                steps={stepFormData.steps}
                currentStep={stepFormData.currentStep}
                formData={stepFormData.formData}
                onUpdateFormData={updateFormData}
                onNextStep={isLastStep ? handleFormCompleted : nextStep}
                onPrevStep={prevStep}
                onGoToStep={goToStep}
                isLastStep={isLastStep}
                isFirstStep={isFirstStep}
                className="bg-white/90 backdrop-blur-sm border-amber-200/50 shadow-lg rounded-2xl"
              />
            )}

            {currentFlow === 'summary' && (
              <div className="space-y-6">
                <Card className="bg-white/90 backdrop-blur-sm border-amber-200/50 shadow-lg rounded-2xl overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-amber-100 to-blue-gray-100 p-8">
                    <h2 className="text-3xl font-bold text-blue-gray900 mb-2 font-heading-2 text-center">
                      Finaliser votre commande
                    </h2>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="space-y-4 mb-6">
                      <div className="bg-green-50 border border-green-200 rounded-xl p-6 shadow-sm">
                        <h3 className="font-semibold text-green-800 mb-2">
                          Votre commande est prete !
                        </h3>
                        <p className="text-green-700 text-sm">
                          Verifiez les details ci-contre et cliquez sur "Confirmer la commande"
                          pour finaliser votre achat.
                        </p>
                      </div>
                    </div>

                    <Button
                      onClick={handleCompleteOrder}
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white text-lg py-4 rounded-xl shadow-lg font-medium mt-4 flex items-center justify-center gap-2"
                      disabled={sending}
                    >
                      {sending ? (
                        <>
                          <Loader2 className="animate-spin w-5 h-5 mr-2" />
                          Traitement...
                        </>
                      ) : (
                        'Confirmer la commande'
                      )}
                    </Button>
                    {emailResult && <div className="text-red-600 mt-2">{emailResult}</div>}

                    <div className="text-center mt-4">
                      <Button
                        variant="outline"
                        onClick={() => window.location.href = '/'}
                        className="text-blue-gray-600 hover:text-blue-gray-800 border-blue-gray-300 hover:bg-blue-gray-50"
                      >
                        Retourner a l'accueil
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <OrderSummary
                selectedPack={stepFormData.selectedPack}
                selectedOptions={stepFormData.selectedOptions}
                selectedSubscriptions={stepFormData.selectedSubscriptions}
                formData={stepFormData.formData}
                totalPrice={calculateTotal()}
                monthlyTotal={calculateMonthlyTotal()}
                className="bg-white/90 backdrop-blur-sm border-amber-200/50 shadow-lg rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
