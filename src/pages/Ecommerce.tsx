import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { EcommerceFlow } from '../components/ecommerce/EcommerceFlow';

export const EcommercePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  
  // Récupérer les paramètres d'URL
  const packId = searchParams.get('packId') || searchParams.get('pack') || null;
  const maintenanceId = searchParams.get('maintenance') || null;
  const step = searchParams.get('step') || null;
  
  // Déterminer l'étape initiale
  let initialFlow: 'pack-selection' | 'maintenance-selection' | 'form' | 'summary' = 'pack-selection';
  
  if (step === 'maintenance') {
    initialFlow = 'maintenance-selection';
  } else if (packId) {
    initialFlow = 'maintenance-selection';
  }
  
  return (
    <EcommerceFlow 
      initialFlow={initialFlow}
      preSelectedPackId={packId || undefined}
      preSelectedMaintenanceId={maintenanceId || undefined}
    />
  );
};

export default EcommercePage;