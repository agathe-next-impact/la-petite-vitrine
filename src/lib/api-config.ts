// Configuration API selon l'environnement
const getApiBaseUrl = () => {
  if (!import.meta.env.PROD) {
    return 'http://localhost:3001';
  }
  
  // En production, utiliser le même domaine que celui utilisé par l'utilisateur
  if (typeof window !== 'undefined') {
    const currentHost = window.location.hostname;
    if (currentHost === 'www.lapetitevitrine.com') {
      return 'https://www.lapetitevitrine.com';
    }
  }
  
  // Fallback sur le domaine principal
  return 'https://lapetitevitrine.com';
};

export const API_CONFIG = {
  BASE_URL: getApiBaseUrl(),
  
  ENDPOINTS: {
    SEND_ORDER_RECAP: '/api/send-order-recap',
    ADD_CONTACT: '/api/add-contact',
    TEST_EMAIL: '/api/test-email'
  }
};

// Helper pour construire les URLs complètes
export const getApiUrl = (endpoint: string) => `${API_CONFIG.BASE_URL}${endpoint}`;