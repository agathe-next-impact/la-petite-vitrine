import React, { useState } from 'react';
import { CheckIcon } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Pack } from '../../types/ecommerce';
import { PACKS } from '../../data/ecommerce-data';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface PackSelectorProps {
  selectedPack?: Pack;
  onSelectPack: (pack: Pack) => void;
  className?: string;
  showPackDetails?: boolean;
}

export const PackSelector: React.FC<PackSelectorProps> = ({
  selectedPack,
  onSelectPack,
  className,
  showPackDetails = true
}) => {
  const [openPackId, setOpenPackId] = useState<string | null>(null);

  return (
    <div className={cn("space-y-6", className)}>
      <Card className="bg-white/90 backdrop-blur-sm overflow-hidden">
        <CardHeader className="md:p-8 p-0">
        <h2 className="md:text-3xl text-2xl font-bold text-blue-gray900 md:mb-4 font-heading-2 text-center">
          Choisissez votre site web
        </h2>
        <p className="md:block hidden text-blue-gray600 text-lg font-body-l text-center">
          Selectionnez le type de site qui correspond a vos besoins
        </p>
        </CardHeader>

        <CardContent className="p-0">
      <div className="grid grid-cols-1 md:grid-cols-2 pt-8 gap-8 px-6 pb-6">
        {PACKS.map((pack) => {
          const isSelected = selectedPack?.id === pack.id;
          const isOpen = openPackId === pack.id;
          return (
            <Card
              key={pack.id}
              className={cn(
                "relative cursor-pointer transition-all duration-300 overflow-hidden border border-1 border-amber-100 rounded-2xl",
                isSelected
                  ? "ring-1 ring-amber-400 bg-amber-50 border-amber-400"
                  : "hover:shadow-lg hover:scale-105 border-amber-200 bg-white"
              )}
              onClick={() => onSelectPack(pack)}
            >
              {isSelected && (
                <div className="absolute top-4 right-4 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center z-10">
                  <CheckIcon className="w-4 h-4 text-white" />
                </div>
              )}
              <CardHeader className="text-center pb-4">
                <h3 className="text-xl font-bold text-blue-gray900 mb-2">
                  {pack.title}
                </h3>
                <div className="text-2xl font-bold text-amber-900 mb-2">
                  {pack.price}€
                </div>
                <p className="text-blue-gray600 text-sm font-body-m">
                  Livraison en {pack.deliveryTime}
                </p>
              </CardHeader>
              {showPackDetails && (
                <div className="flex justify-center pb-2">
                      <button
                        type="button"
                        className={cn(
                          "flex items-center gap-1 text-amber-700 text-sm font-medium transition-colors",
                          isOpen ? "font-bold text-amber-900" : ""
                        )}
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenPackId(isOpen ? null : pack.id);
                        }}
                        aria-expanded={isOpen}
                        aria-controls={`pack-content-${pack.id}`}
                      >
                        <span>
                          {isOpen ? "Masquer les details" : "Voir les details"}
                        </span>
                        <motion.span
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="inline-block"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </motion.span>
                      </button>
                    </div>
              )}
                  <AnimatePresence initial={false}>
                    {isOpen && showPackDetails && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden px-6 pb-4"
                      >
                        <p className="text-blue-gray700 mb-4 text-sm font-body-m">
                          {pack.description}
                        </p>
                        <div className="space-y-2">
                          {pack.features.map((feature, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <CheckIcon className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-blue-gray700 font-body-m">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
            </Card>
          );
        })}
      </div>
        </CardContent>
      </Card>
    </div>
  );
};
