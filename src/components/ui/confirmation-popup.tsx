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
    <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md mx-2 sm:mx-4 max-h-[95vh] overflow-hidden transform transition-all duration-300 ease-out flex flex-col">
        {/* Header avec couleurs La Petite Vitrine */}
        <div className="bg-amber-900 p-4 sm:p-6 text-center relative flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <div className="flex justify-center mb-3 sm:mb-4">
            <div className="bg-white/20 rounded-full p-2 sm:p-3">
              <CheckCircleIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">
            Merci {firstName} !
          </h2>
          <p className="text-amber-100 text-base sm:text-lg">
            Votre demande a été envoyée
          </p>
        </div>

        {/* Contenu scrollable */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          <div className="text-center mb-4 sm:mb-6">
            <p className="text-blue-gray-700 text-base sm:text-lg leading-relaxed mb-3 sm:mb-4">
              Nous avons bien reçu votre demande de contact.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-3 sm:mb-4">
              <p className="text-blue-800 font-semibold mb-1 sm:mb-2 text-sm sm:text-base">
                📧 Email de confirmation envoyé
              </p>
              <p className="text-blue-700 text-xs sm:text-sm">
                Vérifiez votre boîte mail, vous devriez recevoir un email de confirmation sous peu.
              </p>
            </div>
            <p className="text-blue-gray-600 text-sm sm:text-base">
              <strong className="text-amber-600">L'équipe de La Petite Vitrine</strong> vous contactera rapidement pour échanger sur votre projet de site web.
            </p>
          </div>

          {/* Informations de contact */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
            <h3 className="font-semibold text-amber-800 mb-2 sm:mb-3 flex items-center text-sm sm:text-base">
              <span className="mr-2">💬</span>
              Besoin de nous joindre rapidement ?
            </h3>
            <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
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
            className="w-full bg-amber-600 text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl hover:bg-amber-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base"
          >
            Parfait, merci !
          </button>
        </div>
      </div>
    </div>
  );
};