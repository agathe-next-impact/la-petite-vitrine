import { CheckIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader } from "../../../../components/ui/card";
import { AnimatedSection } from "../../../../components/ui/animated-section";
import { StaggeredContainer } from "../../../../components/ui/staggered-container";
import { cn } from "../../../../lib/utils";
import StyledWrapper from "../../../../components/ui/button-ui";

export const ProductsSection = (): JSX.Element => {
  const navigate = useNavigate();

  const mainPacks = [
    {
      id: "site-one-page",
      icon: "💡",
      title: "Site One-Page",
      price: "490€",
      subtitle: "Site web professionnel responsive",
      features: [
        "Site web One Page professionnel responsive",
        "Design sur-mesure adapte a votre activite",
        "5 Sections : Presentation, Services, Infos pratiques, Map, Contact",
        "Nom de domaine + hebergement 1 an inclus",
        "Livraison en 5 jours",
        "Sans engagement",
        "Satisfait ou rembourse sous 48h",
      ],
      buttonText: "Choisir ce site",
      isRecommended: false,
      bgColor: "bg-amber-50",
      textColor: "text-blue-gray900",
      priceColor: "text-blue-gray900",
    },
    {
      id: "site-5-pages",
      icon: "⭐",
      title: "Site 5 Pages",
      price: "990€",
      subtitle: "Site multi-pages avec formulaire et carte Google",
      features: [
        "Site web 5 pages professionnel responsive",
        "Formulaire de contact integre",
        "Carte Google Maps integree",
        "Pages : Accueil, Services, Realisations, A propos, Contact",
        "Nom de domaine + hebergement 1 an inclus",
        "Livraison en 7 jours",
        "Sans engagement",
        "Satisfait ou rembourse sous 48h",
      ],
      buttonText: "Site recommande",
      isRecommended: true,
      bgColor: "bg-amber-50",
      textColor: "text-blue-gray900",
      priceColor: "text-blue-gray900",
    },
  ];

  const handlePackSelect = (packId: string) => {
    navigate(`/commande?step=options&packId=${packId}`);
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
                Nos Services
                <br />
                <span className="md:mt-0 mt-4 md:text-5xl text-4xl font-serif italic text-blue-gray100">
                  Site web et Reseaux sociaux
                </span>
              </h2>
              <p
                id="products"
                className="mt-4 md:w-4/6 w-full text-blue-gray200 font-body-l text-sm md:text-base lg:text-[length:var(--body-l-font-size)] leading-[var(--body-l-line-height)]"
              >
                Des solutions completes de presence numerique pensees pour les
                artisans, pour vous developper en ligne tout en restant
                concentre sur votre metier.
              </p>
            </div>
          </AnimatedSection>
          <StaggeredContainer>
            <div className="flex md:flex-row flex-col gap-6 w-full justify-center">
            {mainPacks.map((pack, index) => (
              <Card
                key={pack.id}
                className={cn(
                  "basis-1/2 max-w-[500px] h-max flex flex-col bg-orange-50 overflow-hidden rounded-[20px] transition-all duration-500 group relative cursor-pointer",
                  pack.bgColor,
                  "border border-solid border-white hover:scale-105"
                )}
                onClick={() => handlePackSelect(pack.id)}
              >
                <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg z-20 flex items-center gap-1">
                  <CheckIcon className="w-3 h-3" />
                  Satisfait ou rembourse
                </div>
                <div
                  className="absolute w-full h-[170px] md:h-[180px] top-0 left-0 bg-cover bg-center opacity-15"
                  style={{
                    backgroundImage: `url(../pack-${index + 1}.jpg)`,
                  }}
                />
                <CardHeader className="text-center pt-12 md:pt-8 relative z-10">
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
                    {pack.subtitle}
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
                    <a href={`/commande?step=options&packId=${pack.id}`} className="w-full">
                      <StyledWrapper>
                        Commander
                      </StyledWrapper>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
            </div>
          </StaggeredContainer>
        </div>
      </div>
    </section>
  );
};
