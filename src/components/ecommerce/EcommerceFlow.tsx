import React, { useState, useEffect } from 'react';
import { useEcommerce } from '../../hooks/useEcommerce';
import { PackSelector } from './PackSelector';
import { StepForm } from './StepForm';
import { OrderSummary } from './OrderSummary';
import { Button } from '../ui/button';
import { ArrowLeftIcon, HomeIcon } from 'lucide-react';
import { PACKS } from '../../data/ecommerce-data';
import { useNavigate } from 'react-router-dom';

type FlowStep = 'pack-selection' | 'form';

interface EcommerceFlowProps {
  initialFlow?: FlowStep;
  preSelectedPackId?: string;
}

export const EcommerceFlow: React.FC<EcommerceFlowProps> = ({ 
  initialFlow = 'pack-selection',
  preSelectedPackId,
}) => {
  const [currentFlow, setCurrentFlow] = useState<FlowStep>(initialFlow);
  const navigate = useNavigate();

  const {
    stepFormData,
    selectPack,
    updateFormData,
    goToStep,
    nextStep,
    prevStep,
    calculateTotal,
    isFormValid,
    isLastStep,
    isFirstStep,
  } = useEcommerce();

  // Pré-sélection du pack si spécifié
  useEffect(() => {
    if (preSelectedPackId && !stepFormData.selectedPack) {
      const pack = PACKS.find(p => p.id === preSelectedPackId);
      if (pack) {
        selectPack(pack);
      }
    }
  }, [preSelectedPackId, stepFormData.selectedPack, selectPack]);

  // Finaliser la commande
  const [sending, setSending] = useState(false);
  const [emailResult, setEmailResult] = useState<string | null>(null);

  const handleCompleteOrder = async () => {
    setSending(true);
    setEmailResult(null);
    try {
      const pack = stepFormData.selectedPack;
      const formData = stepFormData.formData;
      if (pack && formData.email) {
        const res = await fetch('/api/send-order-recap', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            selectedPack: pack.id,
          }),
        });
        if (!res.ok) throw new Error('Erreur lors de l\'envoi');
        navigate('/success');
      } else {
        setEmailResult('Erreur : données de commande incomplètes.');
      }
    } catch (error) {
      setEmailResult('Erreur lors de la création de la commande');
      console.log('[EcommerceFlow] Erreur lors de la commande :', error);
    } finally {
      setSending(false);
    }
  };

  const handlePackSelected = () => {
    setCurrentFlow('form');
  };

  const handleFormCompleted = async () => {
    await handleCompleteOrder();
  };

  const goBack = () => {
    switch (currentFlow) {
      case 'form':
        setCurrentFlow('pack-selection');
        break;
      default:
        break;
    }
  };

  // UI/UX identique, seules les étapes supprimées
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-blue-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* En-tête */}
        <div className="flex justify-center items-center mb-8 bg-amber-900 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-amber-200/50">
          <div className="flex flex-col items-center space-4 gap-6">
            <div className='flex justify-start gap-2'>
              {/* Bouton retour à l'accueil */}
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
                Nous validons votre commande sous 48h, vous recevrez un email de confirmation avec les détails.
              </p>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contenu principal */}
          <div className="lg:col-span-2">
            {currentFlow === 'pack-selection' && (
              <PackSelector
                selectedPack={stepFormData.selectedPack}
                onSelectPack={(pack) => {
                  selectPack(pack);
                  handlePackSelected();
                }}
              />
            )}

            {currentFlow === 'form' && (
              <StepForm
                steps={stepFormData.steps}
                currentStep={stepFormData.currentStep}
                formData={stepFormData.formData}
                onUpdateFormData={updateFormData}
                onNextStep={handleFormCompleted}
                onPrevStep={prevStep}
                onGoToStep={goToStep}
                isLastStep={true}
                isFirstStep={isFirstStep}
                className="bg-white/90 backdrop-blur-sm border-amber-200/50 shadow-lg rounded-2xl"
              />
            )}
            {emailResult && <div className="text-red-600 mt-2">{emailResult}</div>}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <OrderSummary
                selectedPack={stepFormData.selectedPack}
                formData={stepFormData.formData}
                totalPrice={calculateTotal()}
                className="bg-white/90 backdrop-blur-sm border-amber-200/50 shadow-lg rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};