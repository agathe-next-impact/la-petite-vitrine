import React from 'react';
import { CheckCircleIcon, X } from 'lucide-react';

interface ConfirmationPopupProps {
  isVisible: boolean;
  onClose: () => void;
  firstName: string;
}

export const ConfirmationPopup: React.FC<ConfirmationPopupProps> = ({
  isVisible,
  onClose,
  firstName,
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden transform transition-all duration-300 ease-out">
        {/* Header avec couleurs La Petite Vitrine */}
        <div className="bg-amber-900 p-6 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="flex justify-center mb-4">
            <div className="bg-white/20 rounded-full p-3">
              <CheckCircleIcon className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Merci {firstName} !
          </h2>
          <p className="text-amber-100 text-lg">
            Votre demande a été envoyée
          </p>
        </div>

        {/* Contenu */}
        <div className="p-6">
          <div className="text-center mb-6">
            <p className="text-blue-gray-700 text-lg leading-relaxed mb-4">
              Nous avons bien reçu votre demande de contact.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
              <p className="text-blue-800 font-semibold mb-2">
                📧 Email de confirmation envoyé
              </p>
              <p className="text-blue-700 text-sm">
                Vérifiez votre boîte mail, vous devriez recevoir un email de confirmation sous peu.
              </p>
            </div>
            <p className="text-blue-gray-600">
              <strong className="text-amber-600">L'équipe de La Petite Vitrine</strong> vous contactera rapidement pour échanger sur votre projet de site web.
            </p>
          </div>

          {/* Informations de contact */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-amber-800 mb-3 flex items-center">
              <span className="mr-2">💬</span>
              Besoin de nous joindre rapidement ?
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center text-amber-700">
                <span className="mr-2">📧</span>
                <span className="font-medium">contact@lapetitevitrine.com</span>
              </div>
              <div className="flex items-center text-amber-700">
                <span className="mr-2">📞</span>
                <span className="font-medium">06 73 98 16 38</span>
              </div>
            </div>
          </div>

          {/* Bouton de fermeture */}
          <button
            onClick={onClose}
            className="w-full bg-amber-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-amber-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Parfait, merci !
          </button>
        </div>
      </div>
    </div>
  );
};