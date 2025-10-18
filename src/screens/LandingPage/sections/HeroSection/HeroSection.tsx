import { CheckIcon } from "lucide-react";
import { Card } from "../../../../components/ui/card";
import { AnimatedSection } from "../../../../components/ui/animated-section";
import StyledWrapper from "../../../../components/ui/button-ui";
import { QuickContactForm } from "../../../../components/forms";

export const HeroSection = (): JSX.Element => {
  return (
    <section className="max-w-[1400px] mx-auto flex flex-wrap flex-col lg:flex-row items-center p-4 md:p-8 lg:p-20 relative self-stretch w-full">
      <AnimatedSection
        animation="slideRight"
        className="md:basis-1/2 flex flex-col items-start gap-8 lg:gap-12 relative flex-1 w-full lg:w-auto"
      >
        <div className="flex flex-col items-start gap-6 lg:gap-8 relative self-stretch w-full md:py-4 py-8">
          <div className="flex flex-col items-start gap-2 relative self-stretch w-full">
            <h1 className="relative self-stretch mt-[-1.00px] font-heading-1-m md:font-[500] font-[600] text-blue-gray900 text-4xl md:text-6xl lg:text-6xl md:leading-[var(--heading-1-m-line-height)] [font-style:var(--heading-1-m-font-style)]">
              Sites internet
              <br />
              <div className="pt-2 font-serif italic text-amber-900">
                pour artisans
              </div>
            </h1>
          </div>

          <p className="relative self-stretch font-body-l font-[number:var(--body-l-font-weight)] text-blue-gray900 text-base md:text-lg lg:text-[length:var(--body-l-font-size)] tracking-[var(--body-l-letter-spacing)] leading-[var(--body-l-line-height)] [font-style:var(--body-l-font-style)]">
            Votre présence digitale complète, clé en main en 5 jours
            <br /> et résiliable à tout moment
            <br />
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 relative w-full sm:w-auto">
            <a href="#products">
              <StyledWrapper>Créer mon site</StyledWrapper>
            </a>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection
        animation="slideLeft"
        delay={200}
        className="md:basis-1/2 relative w-full max-w-[486px] h-[300px] md:h-[350px] lg:h-[423px] mt-20 md:mt-8 lg:mt-0"
      >
        {/* Badge Satisfait ou remboursé en haut à gauche */}
        <div className="absolute md:top-[50%] top-[100%] md:-right-[15%] -right-[0] z-50 bg-green-600 text-white px-3 py-1 rounded-full text-xl font-bold shadow-lg hover:scale-110 transition-transform duration-300 flex items-center gap-2">
          <CheckIcon className="w-4 h-4" />
          Sans engagement
        </div>

        {/* Badge Livré en 5 jours en haut à droite */}
        <div className="absolute top-[5%] -right-[0%] z-10 bg-black text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg hover:scale-110 transition-transform duration-300">
          
        </div>

        {/* Badge Résiliable en bas à droite */}
        <div className="w-max absolute md:bottom-[0%] -bottom-[40%] md:-left-[5%] -right-[5%] z-10 bg-amber-900 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg hover:scale-110 transition-transform duration-300">
          Livré en 5 jours
        </div>

        <Card className="relative w-full h-full border-none bg-transparent">
          <div className="relative h-full">
            <div className="absolute right-[0%] md:-top-[14%] -top-[20%] w-max md:p-8 p-4 rounded-[30px] bg-amber-600 text-center font-body-l font-[number:var(--body-l-font-weight)] text-white text-3xl md:text-4xl lg:text-5xl tracking-[var(--body-l-letter-spacing)] [font-style:var(--body-l-font-style)] z-40">
              <p>490€</p>
              <p className="mt-2 md:text-3xl text-2xl italic">
                + 19 ou 29€/mois
              </p>
            </div>
            <div className="absolute w-[75%] h-[85%] top-[12%] left-[12%] bg-amber-400 rounded-[30px] md:rounded-[40px] lg:rounded-[50px] transition-transform duration-700 hover:scale-105" />
            <img
              className="absolute w-[70%] h-[130%] top-[0%] -left-[0%] object-cover object-left-top transition-transform duration-700 hover:scale-105"
              alt="Collectible sneakers"
              src="/woman-mobile.png"
            />
          </div>
        </Card>
      </AnimatedSection>
      <div className="md:basis-1/2 md:mt-8 md:pt-8 pt-48 w-full mx-auto">
        <QuickContactForm
          title="Vous voulez être contacté(e) ? Laissez vos infos ici 👇"
          buttonText="Être rappelé(e)"
        />
      </div>
    </section>
  );
};
