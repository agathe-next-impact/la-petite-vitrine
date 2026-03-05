import React from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Pack, Option, Subscription } from '../../types/ecommerce';
import { CheckIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface OrderSummaryProps {
  selectedPack?: Pack;
  selectedOptions?: Option[];
  selectedSubscriptions?: Subscription[];
  selectedMaintenance?: { title: string; price: number; description: string };
  formData: Record<string, any>;
  totalPrice: number;
  monthlyTotal?: number;
  className?: string;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  selectedPack,
  selectedOptions = [],
  selectedSubscriptions = [],
  selectedMaintenance,
  formData,
  totalPrice,
  monthlyTotal = 0,
  className
}) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="bg-amber-100 p-6">
        <h3 className="text-xl font-bold text-blue-gray900 font-heading-6">
          Recapitulatif de votre commande
        </h3>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* Site selectionne */}
        {selectedPack && (
          <div className="border-b py-4">
            <h4 className="font-semibold text-blue-gray900 mb-3 font-body-m">Site web</h4>
            <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
              <div className="flex justify-between items-start mb-2">
                <h5 className="font-medium text-blue-gray900 font-heading-6">{selectedPack.title}</h5>
                <span className="font-bold text-amber-900">{selectedPack.price}€</span>
              </div>
              <p className="text-sm text-blue-gray600 mb-3 font-body-m">{selectedPack.description}</p>
              <div className="space-y-1">
                {selectedPack.features.slice(0, 3).map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckIcon className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-blue-gray700 font-body-m">{feature}</span>
                  </div>
                ))}
                {selectedPack.features.length > 3 && (
                  <p className="text-xs text-blue-gray500 italic">
                    +{selectedPack.features.length - 3} autres fonctionnalites
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Options supplementaires */}
        {selectedOptions.length > 0 && (
          <div className="border-b pb-4">
            <h4 className="font-semibold text-blue-gray900 mb-3 font-body-m">Options</h4>
            <div className="space-y-2">
              {selectedOptions.map((option) => (
                <div key={option.id} className="bg-amber-50 p-3 rounded-xl border border-amber-200">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-blue-gray900 text-sm">{option.title}</span>
                    <span className="font-bold text-amber-900 text-sm">{option.price}€</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Abonnements mensuels */}
        {selectedSubscriptions.length > 0 && (
          <div className="border-b pb-4">
            <h4 className="font-semibold text-blue-gray900 mb-3 font-body-m">Abonnements mensuels</h4>
            <div className="space-y-2">
              {selectedSubscriptions.map((sub) => (
                <div key={sub.id} className="bg-green-50 p-3 rounded-xl border border-green-200">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-blue-gray900 text-sm">{sub.title}</span>
                    <span className="font-bold text-green-700 text-sm">{sub.price}€/mois</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Informations client */}
        {(formData.firstName || Object.keys(formData).length > 0) && (
          <div className="border-b pb-4">
            <h4 className="font-semibold text-blue-gray900 mb-3 font-body-m">Informations client</h4>
            <div className="space-y-2 text-sm bg-blue-gray-50 p-4 rounded-xl">
              {formData.firstName && (
                <p className="font-body-m"><span className="font-medium">Nom :</span> {formData.firstName} {formData.lastName}</p>
              )}
              {formData.email && (
                <p className="font-body-m"><span className="font-medium">Email :</span> {formData.email}</p>
              )}
              {formData.phone && (
                <p className="font-body-m"><span className="font-medium">Telephone :</span> {formData.phone}</p>
              )}
              {formData.company && (
                <p className="font-body-m"><span className="font-medium">Entreprise :</span> {formData.company}</p>
              )}
              {Object.keys(formData).length === 0 && (
                <p className="text-blue-gray500 italic">Informations a remplir dans le formulaire</p>
              )}
            </div>
          </div>
        )}

        {/* Total */}
        <div className="bg-gradient-to-r from-amber-100 to-amber-50 p-6 rounded-xl border border-amber-300 shadow-sm">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-blue-gray900 font-heading-6">Total</span>
            <div className="text-right">
              <div className="text-2xl font-bold text-amber-900">{totalPrice}€</div>
              {monthlyTotal > 0 && (
                <div className="text-sm text-green-700 font-medium">
                  + {monthlyTotal}€/mois
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
