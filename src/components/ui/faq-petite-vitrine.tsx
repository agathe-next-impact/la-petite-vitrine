import { FAQ } from './faq';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

// FAQ spécifique pour "La Petite Vitrine" avec l'offre à 390€
export function FAQPetiteVitrine() {
  const petiteVitrineFAQItems: FAQItem[] = [
    {
      id: 1,
      question: "Qu'est-ce qui est compris dans les 490€ ?",
      answer: "Le tarif comprend tout ce qu'il faut pour être visible, professionnel et crédible : la création d'un site vitrine 1 page responsive (adapté mobile), le design personnalisé, le formulaire de contact, l'hébergement et le nom de domaine pour 1 an, l'optimisation pour Google (SEO local, balises, vitesse), la page Google My Business et la mise en ligne en 5 jours ouvrés. Aucun coût caché, aucun abonnement obligatoire."
    },
    {
      id: 2,
      question: "Quel est la durée d'engagement minimum ?",
      answer: "Vous pouvez interrompre à tout moment votre abonnement mensuel. Nous ne demandons pas d'engagement à long terme. Vous payez uniquement pour les services que vous utilisez, sans frais cachés ni surprises."
    },
    {
      id: 3,
      question: "L'hébergement et le nom de domaine sont-ils compris ?",
      answer: "Oui, tout est inclus pendant 1 an : le nom de domaine personnalisé (en .fr, .com, etc.) et l'hébergement sécurisé et optimisé. Aucune démarche technique à faire. Ensuite, vous pouvez renouveler l'hébergement chez nous ou transférer votre site si vous le souhaitez."
    },
    {
      id: 4,
      question: "Qui s'occupe de la maintenance du site ?",
      answer: "C'est nous. Pour 29€/mois, nous assurons : les mises à jour techniques, les sauvegardes régulières, les modifications simples (textes, images…), et le support par e-mail sous 48h. Rien à gérer, votre site reste toujours à jour."
    },
    {
      id: 5,
      question: "Qui crée les textes et le design du site ?",
      answer: "Vous pouvez nous fournir votre texte et vos images, mais si vous préférez, nous réalisons le contenu à partir de quelques infos simples (votre métier, vos services, votre zone géographique). Notre objectif : un site clair, pro, et bien référencé, même si vous ne voulez pas rédiger vous-même."
    },
  ];

  return (
    <FAQ 
      title="Foire aux Questions"
      subtitle="Trouvez rapidement les réponses à vos questions les plus fréquentes"
      items={petiteVitrineFAQItems}
      className="bg-gradient-to-br from-amber-50/50 via-white to-blue-gray50/30"
      maxWidth="6xl"
    />
  );
}


// Export par défaut pour la page principale
export function FAQPersonnalisee() {
  return (
    <div className="space-y-20 bg-gradient-to-br from-amber-50/30 via-white to-blue-gray50/20">
      <FAQPetiteVitrine />
    </div>
  );
}
