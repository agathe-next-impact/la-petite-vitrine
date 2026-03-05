import React from 'react';
import { CheckIcon, PlusIcon } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Subscription } from '../../types/ecommerce';
import { SUBSCRIPTIONS } from '../../data/ecommerce-data';
import { cn } from '../../lib/utils';

interface SubscriptionSelectorProps {
  selectedSubscriptions: Subscription[];
  onToggleSubscription: (subscription: Subscription) => void;
  className?: string;
}

export const SubscriptionSelector: React.FC<SubscriptionSelectorProps> = ({
  selectedSubscriptions,
  onToggleSubscription,
  className
}) => {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-blue-gray900 mb-4">
          Abonnements mensuels
        </h2>
        <p className="text-blue-gray600">
          Selectionnez les services mensuels qui vous interessent (optionnel)
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SUBSCRIPTIONS.map((subscription) => {
          const isSelected = selectedSubscriptions.some(s => s.id === subscription.id);
          return (
            <Card
              key={subscription.id}
              className={cn(
                "relative cursor-pointer transition-all duration-300 border border-1 rounded-2xl",
                isSelected
                  ? "ring-1 ring-green-400 bg-green-50 border-green-400"
                  : "hover:shadow-lg hover:scale-[1.02] border-amber-200 bg-white"
              )}
              onClick={() => onToggleSubscription(subscription)}
            >
              <div className="absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center z-10 border-2 transition-colors duration-200"
                style={{
                  backgroundColor: isSelected ? '#22c55e' : 'transparent',
                  borderColor: isSelected ? '#22c55e' : '#d1d5db'
                }}
              >
                {isSelected ? (
                  <CheckIcon className="w-4 h-4 text-white" />
                ) : (
                  <PlusIcon className="w-4 h-4 text-gray-400" />
                )}
              </div>
              <CardHeader className="pb-2 pr-12">
                <h3 className="text-lg font-bold text-blue-gray900">
                  {subscription.title}
                </h3>
                <div className="text-xl font-bold text-green-700">
                  {subscription.price}€<span className="text-sm font-normal text-blue-gray600">/mois</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-blue-gray600 text-sm font-body-m">
                  {subscription.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
