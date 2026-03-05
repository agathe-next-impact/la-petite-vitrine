import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { EcommerceFlow } from '../components/ecommerce/EcommerceFlow';

export const EcommercePage: React.FC = () => {
  const [searchParams] = useSearchParams();

  const packId = searchParams.get('packId') || searchParams.get('pack') || null;
  const step = searchParams.get('step') || null;

  let initialFlow: 'pack-selection' | 'options-selection' | 'subscriptions-selection' | 'form' | 'summary' = 'pack-selection';

  if (step === 'options' || step === 'maintenance') {
    initialFlow = 'options-selection';
  } else if (step === 'subscriptions') {
    initialFlow = 'subscriptions-selection';
  } else if (packId) {
    initialFlow = 'options-selection';
  }

  return (
    <EcommerceFlow
      initialFlow={initialFlow}
      preSelectedPackId={packId || undefined}
    />
  );
};

export default EcommercePage;
