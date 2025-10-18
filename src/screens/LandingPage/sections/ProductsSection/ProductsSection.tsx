import { CheckIcon } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "../../../../components/ui/card";
import { AnimatedSection } from "../../../../components/ui/animated-section";
import { StaggeredContainer } from "../../../../components/ui/staggered-container";
import { cn } from "../../../../lib/utils";
import StyledWrapper from "../../../../components/ui/button-ui";

export const ProductsSection = (): JSX.Element => {
  const [selectedPack, setSelectedPack] = useState<any>(null);
  const [selectedSocialOptions, setSelectedSocialOptions] = useState<any[]>([]);
  const [showMaintenanceSelector, setShowMaintenanceSelector] = useState(false);

  // La logique de maintenanceId est supprimée, on utilise selectedSocialOptions pour la sélection.

  // Packs principaux
  const mainPacks = [
    {
      id: "pack-base",
      icon: "💡",
      title: "Pack Essentiel",
      price: "490€",
      maintenance: "Maintenance à choisir",
      features: [
        "Site web One Page professionnel responsive",
        "Google Business",
        "5 Sections : Présentation, Services, Informations pratiques, Map, Contact",
        "Mise à jour des contenus",
        "Nom de domaine + hébergement 1 an",
        "Livraison en 5 jours",
        "Sans engagement",
      ],
      buttonText: "Choisir ce pack",
      isRecommended: false,
      bgColor: "bg-amber-50",
      textColor: "text-blue-gray900",
      priceColor: "text-blue-gray900",
      buttonVariant: "secondary",
    },
    {
      id: "pack-presence",
      icon: "⭐",
      title: "Pack Pro",
      price: "990€",
      maintenance: "Maintenance à choisir",
      features: [
        "Tout le pack de base",
        "Facebook + Instagram Business",
        "3 pages additionnelles : Services, Réalisations, A propos, Infos pratiques",
        "Livraison en 7 jours",
        "Sans engagement",
      ],
      buttonText: "Pack recommandé",
      isRecommended: true,
      bgColor: "bg-amber-50",
      textColor: "text-blue-gray900",
      priceColor: "text-blue-gray900",
      buttonVariant: "primary",
    },
    {
      id: "pack-metier",
      icon: "🎨",
      title: "Pack Pro Plus",
      price: "1490€",
      maintenance: "Maintenance à choisir",
      features: [
        "Tout le pack pro",
        "2 modules métier additionnels : Réservation en ligne, Devis/Simulation en ligne, Messagerie Whatsapp, Avis clients",
        "Réseaux sociaux professionnels",
        "Livraison en 9 jours",
        "Sans engagement",
      ],
      buttonText: "Solution complète",
      isRecommended: false,
      bgColor: "bg-amber-50",
      textColor: "text-blue-gray900",
      priceColor: "text-blue-gray900",
      buttonVariant: "secondary",
    },
  ];



  // La logique de maintenanceId et de maintenance par défaut est supprimée.

  const handlePackSelect = (pack: typeof mainPacks[number]) => {
    setSelectedPack(pack);
    setShowMaintenanceSelector(false); // Reset l'affichage
    setSelectedSocialOptions([]); // Reset des options
  };

  const handleCheckout = async () => {
    if (!selectedPack) return;

    // Construire l'URL avec les sélections
    const params = new URLSearchParams({
      direct: 'form',
      pack: selectedPack.id
    });
    
    if (selectedSocialOptions.length > 0) {
      // Pour l'instant, on ne passe que la première option pour compatibilité
      params.append('maintenance', selectedSocialOptions[0].id);
    }
    
    // Rediriger vers le formulaire avec les sélections
    window.location.href = `/commande?${params.toString()}`;
  };

  const decorativeShapes = [
    {
      className: "w-[120px] h-[120px] top-10 left-10 bg-amber-700 absolute rounded-[50px] opacity-75",
    },
    {
      className: "w-[80px] h-[80px] top-40 left-80 bg-blue-700 absolute rounded-[30px] opacity-75",
    },
    {
      className: "w-[100px] h-[100px] top-60 left-1/2 bg-green-700 absolute rounded-[30px] opacity-75",
    },
  ];

  return (
    <section className="flex flex-col items-start justify-center gap-12 md:gap-16 lg:gap-20 px-4 py-16 md:px-8 md:py-24 lg:py-16 lg:px-20 3xl:px-24 3xl:py-40 4xl:px-32 4xl:py-48 relative w-full bg-amber-900 border-t [border-top-style:solid] border-b [border-bottom-style:solid] border-slate-200">
      <div className="w-full max-w-[1400px] mx-auto">
        <img
          className="hidden lg:block absolute w-full h-[300px] top-[436px] left-0 opacity-20"
          alt="Vector"
          src="/vector-13.svg"
        />
        <div className="hidden lg:block absolute w-full h-full top-0 left-0 overflow-hidden">
          {decorativeShapes.map((shape, index) => (
            <div key={`shape-${index}`} className={shape.className} />
          ))}
        </div>
        <div className="pb-16 flex flex-col items-center gap-6 w-full relative z-10">
          <AnimatedSection
            animation="slideRight"
            className="flex-1 flex flex-col items-start gap-6 mb-8"
          >
            <div className="flex flex-col items-start gap-4 w-full">
              <h2 className="text-blue-gray200 font-heading-2 md:font-medium font-bold text-4xl md:text-4xl lg:text-6xl tracking-[var(--heading-2-letter-spacing)] leading-[var(--heading-2-line-height)] [font-style:var(--heading-2-font-style)]">
                Nos Packs
                <br />
                <span className="md:mt-0 mt-4 md:text-5xl text-4xl font-serif italic text-blue-gray100">
                  Site web et Réseaux sociaux
                </span>
              </h2>
              <p
                id="products"
                className="mt-4 md:w-4/6 w-full text-blue-gray200 font-body-l text-sm md:text-base lg:text-[length:var(--body-l-font-size)] leading-[var(--body-l-line-height)]"
              >
                Des solutions complètes de présence numérique pensées pour les
                artisans, pour vous développer en ligne tout en restant
                concentré sur votre métier.
              </p>
            </div>
          </AnimatedSection>
          <StaggeredContainer>
            <div className="flex md:flex-row flex-col gap-6 w-full">
            {mainPacks.map((pack, index) => (
              <Card
                key={pack.id}
                className={cn(
                  "basis-1/3 h-max flex flex-col bg-orange-50 overflow-hidden rounded-[20px] transition-all duration-500 group relative cursor-pointer",
                  pack.bgColor,
                  "border border-solid",
                  selectedPack?.id === pack.id
                    ? "border-amber-400 scale-105 shadow-shadow-dark-XL"
                    : "border-white hover:scale-105"
                )}
                onClick={() => handlePackSelect(pack)}
              >
                <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg z-20 flex items-center gap-1">
                  <CheckIcon className="w-3 h-3" />
                  Satisfait ou remboursé
                </div>
                {selectedPack?.id === pack.id && (
                  <div className="absolute top-3 right-3 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center">
                    <CheckIcon className="w-4 h-4 text-blue-gray900" />
                  </div>
                )}
                <div
                  className="absolute w-full h-[170px] md:h-[180px] top-0 left-0 bg-cover bg-center opacity-15"
                  style={{
                    backgroundImage: `url(../pack-${index + 1}.jpg)`,
                  }}
                />
                <CardHeader className="text-center pt-12 md:pt-8 relative z-10">
                  <div className="hidden text-3xl md:text-4xl mb-3 md:mb-4 transition-transform duration-300 group-hover:scale-110">
                    {pack.icon}
                  </div>
                  <h3
                    className={`font-heading-6 font-[number:var(--heading-6-font-weight)] ${pack.textColor} text-3xl md:text-4xl lg:text-[length:var(--heading-6-font-size)] tracking-[var(--heading-6-letter-spacing)] leading-[var(--heading-6-line-height)] [font-style:var(--heading-6-font-style)] mb-2`}
                  >
                    {pack.title}
                  </h3>
                  <div
                    className={`text-4xl md:text-4xl font-bold ${pack.priceColor} mb-1`}
                  >
                    {pack.price}
                  </div>
                  <p className="text-xs md:text-sm text-blue-gray800">
                    {pack.maintenance}
                  </p>
                </CardHeader>
                <CardContent className="flex-1 mt-4 px-4 md:px-6 py-4 md:py-6 relative z-10">
                  <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                    {pack.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-start gap-3 group"
                      >
                        <CheckIcon className="w-4 h-4 md:w-5 md:h-5 text-green-400 mt-0.5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                        <span
                          className={`${pack.textColor} font-body-m text-sm md:text-base lg:text-[length:var(--body-m-font-size)] leading-[var(--body-m-line-height)]`}
                        >
                          {(() => {
                            const shouldBeBold =
                              featureIndex === 0 ||
                              featureIndex === 1 ||
                              featureIndex === pack.features.length - 1;
                            if (shouldBeBold && feature.includes(":")) {
                              const [beforeColon, afterColon] = feature.split(
                                ":",
                                2
                              );
                              return (
                                <>
                                  <span className="font-semibold">
                                    {beforeColon}:
                                  </span>
                                  <span>{afterColon}</span>
                                </>
                              );
                            } else if (shouldBeBold) {
                              return (
                                <span className="font-semibold">
                                  {feature}
                                </span>
                              );
                            } else {
                              return feature;
                            }
                          })()}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="h-16 flex-1 flex items-center justify-center">
                    <a href={`/commande?pack=${pack.id}`} className="w-full">
                      <StyledWrapper>
                        Commander ce pack
                      </StyledWrapper>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
            </div>
          </StaggeredContainer>
          {showMaintenanceSelector && selectedPack && (
            <div id="social-options-section" className="scroll-mt-8">
              <AnimatedSection animation="slideUp" delay={300}>
                <div>
                  <div className="flex flex-col lg:flex-row gap-8">
                    <div className="basis-0 lg:basis-1/2 flex items-center justify-center">
                      <button
                        onClick={handleCheckout}
                        disabled={!selectedPack}
                        className="px-6 py-3 bg-amber-400 text-blue-gray900 rounded-lg font-bold shadow hover:bg-amber-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Commencer maintenant
                      </button>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
