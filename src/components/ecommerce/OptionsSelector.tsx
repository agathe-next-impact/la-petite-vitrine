import React from 'react';
import { CheckIcon, PlusIcon } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Option } from '../../types/ecommerce';
import { OPTIONS } from '../../data/ecommerce-data';
import { cn } from '../../lib/utils';

interface OptionsSelectorProps {
  selectedOptions: Option[];
  onToggleOption: (option: Option) => void;
  className?: string;
}

export const OptionsSelector: React.FC<OptionsSelectorProps> = ({
  selectedOptions,
  onToggleOption,
  className
}) => {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-blue-gray900 mb-4">
          Options supplementaires
        </h2>
        <p className="text-blue-gray600">
          Ajoutez des services complementaires a votre commande (optionnel)
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {OPTIONS.map((option) => {
          const isSelected = selectedOptions.some(o => o.id === option.id);
          return (
            <Card
              key={option.id}
              className={cn(
                "relative cursor-pointer transition-all duration-300 border border-1 rounded-2xl",
                isSelected
                  ? "ring-1 ring-amber-400 bg-amber-50 border-amber-400"
                  : "hover:shadow-lg hover:scale-[1.02] border-amber-200 bg-white"
              )}
              onClick={() => onToggleOption(option)}
            >
              <div className="absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center z-10 border-2 transition-colors duration-200"
                style={{
                  backgroundColor: isSelected ? '#f59e0b' : 'transparent',
                  borderColor: isSelected ? '#f59e0b' : '#d1d5db'
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
                  {option.title}
                </h3>
                <div className="text-xl font-bold text-amber-900">
                  {option.price}€
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-blue-gray600 text-sm font-body-m">
                  {option.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
