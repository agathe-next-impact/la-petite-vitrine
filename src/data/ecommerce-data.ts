import { Pack, Option, Subscription, FormStep } from '../types/ecommerce';

export const PACKS: Pack[] = [
  {
    id: "site-one-page",
    title: "Site One-Page",
    price: 490,
    description: "Un site web professionnel responsive en une seule page",
    features: [
      "Site web One Page professionnel responsive",
      "Design sur-mesure adapte a votre activite",
      "5 Sections : Presentation, Services, Informations pratiques, Map, Contact",
      "Nom de domaine + hebergement 1 an inclus",
      "Livraison en 5 jours",
      "Sans engagement",
      "Satisfait ou rembourse sous 48h"
    ],
    deliveryTime: "5 jours"
  },
  {
    id: "site-5-pages",
    title: "Site 5 Pages",
    price: 990,
    description: "Un site multi-pages complet avec formulaire de contact et carte Google",
    features: [
      "Site web 5 pages professionnel responsive",
      "Formulaire de contact integre",
      "Carte Google Maps integree",
      "Pages : Accueil, Services, Realisations, A propos, Contact",
      "Nom de domaine + hebergement 1 an inclus",
      "Livraison en 7 jours",
      "Sans engagement",
      "Satisfait ou rembourse sous 48h"
    ],
    deliveryTime: "7 jours"
  }
];

export const OPTIONS: Option[] = [
  {
    id: "fonctionnalite-supplementaire",
    title: "Fonctionnalite supplementaire",
    price: 350,
    description: "Reservation en ligne, devis personnalise, ou autre module metier",
    billingCycle: 'one-time'
  },
  {
    id: "fiche-google",
    title: "Fiche Google My Business",
    price: 80,
    description: "Creation et optimisation de votre fiche Google My Business",
    billingCycle: 'one-time'
  },
  {
    id: "page-facebook",
    title: "Page Facebook",
    price: 120,
    description: "Creation de votre page Facebook professionnelle",
    billingCycle: 'one-time'
  },
  {
    id: "page-instagram",
    title: "Page Instagram",
    price: 120,
    description: "Creation de votre page Instagram professionnelle",
    billingCycle: 'one-time'
  }
];

export const SUBSCRIPTIONS: Subscription[] = [
  {
    id: "maintenance-technique",
    title: "Maintenance technique",
    price: 39,
    description: "Hebergement, nom de domaine et maintenance technique du site web",
    billingCycle: 'monthly'
  },
  {
    id: "contenu-seo",
    title: "1 Contenu site web (Article SEO)",
    price: 120,
    description: "Redaction et publication d'un article SEO par mois sur votre site",
    billingCycle: 'monthly'
  },
  {
    id: "animation-facebook",
    title: "Animation Facebook (3 posts/sem.)",
    price: 350,
    description: "Animation de votre page Facebook avec 3 publications par semaine",
    billingCycle: 'monthly'
  },
  {
    id: "animation-instagram",
    title: "Animation Instagram (3 posts/sem.)",
    price: 350,
    description: "Animation de votre page Instagram avec 3 publications par semaine",
    billingCycle: 'monthly'
  }
];

// Legacy exports for backward compatibility
export const MAINTENANCE_OPTIONS = SUBSCRIPTIONS.map(s => ({
  ...s,
  features: [s.description],
}));

export const SOCIAL_OPTIONS = OPTIONS.filter(o =>
  ['page-facebook', 'page-instagram', 'fiche-google'].includes(o.id)
).map(o => ({
  ...o,
  features: [o.description],
}));

export const DEFAULT_FORM_STEPS: FormStep[] = [
  {
    id: "step-1",
    title: "Informations de contact",
    description: "Vos coordonnees personnelles et professionnelles",
    isCompleted: false,
    fields: [
      {
        id: "email",
        type: "email",
        label: "Email",
        placeholder: "votre@email.com",
        required: true
      },
      {
        id: "password",
        type: "text",
        label: "Mot de passe",
        placeholder: "Choisissez un mot de passe securise",
        required: true,
        validation: { minLength: 6 }
      },
      {
        id: "confirmPassword",
        type: "text",
        label: "Confirmer le mot de passe",
        placeholder: "Confirmez votre mot de passe",
        required: true,
        validation: { minLength: 6 }
      },
      {
        id: "lastName",
        type: "text",
        label: "Nom",
        placeholder: "Votre nom",
        required: true,
        validation: { minLength: 2 }
      },
      {
        id: "firstName",
        type: "text",
        label: "Prenom",
        placeholder: "Votre prenom",
        required: true,
        validation: { minLength: 2 }
      },
      {
        id: "phone",
        type: "tel",
        label: "Telephone",
        placeholder: "06 12 34 56 78",
        required: true
      },
      {
        id: "company",
        type: "text",
        label: "Entreprise",
        placeholder: "Nom de votre entreprise",
        required: true
      }
    ]
  }
];
