import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Card, CardContent } from '../components/ui/card';

export const CGVPage = (): JSX.Element => {

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Header */}
      <header className="bg-blue-gray900 text-white py-6 px-4 md:px-8 lg:px-20">
        <div className="max-w-[1600px] mx-auto">
          <a
            href="/"
            className="flex items-center gap-2 text-blue-gray200 hover:text-white transition-colors mb-4"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Retour
          </a>
          <h1 className="text-2xl md:text-3xl font-heading-2 text-white">
            Conditions Générales de Vente
          </h1>
          <p className="text-blue-gray200 font-body-m mt-2">
            Dernière mise à jour : 8 janvier 2025
          </p>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="py-12 px-4 md:px-8 lg:px-20">
        <div className="max-w-[1000px] mx-auto">
          <Card className="bg-white border-amber-200/50 shadow-lg">
            <CardContent className="p-8 md:p-12 space-y-8">
              
              {/* Article 1 */}
              <section className='md:p-0 py-4'>
                <h2 className="text-xl font-heading-4 text-blue-gray900 mb-4">
                  Article 1 - Objet et champ d'application
                </h2>
                <div className="space-y-4 text-blue-gray700 font-body-m">
                  <p>
                    Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre Next Impact, entreprise individuelle euros, immatriculée au RCS d'Aurillac sous le numéro 532 675 386 00066, dont le siège social est situé 4 rue du Centre, 15400 Trizac, exploitant le service "La Petite Vitrine", ci-après dénommée "Next Impact" ou "le Prestataire", et toute personne physique ou morale souhaitant procéder à l'achat de services proposés par La Petite Vitrine, ci-après dénommée "le Client".
                  </p>
                  <p>
                    Ces CGV s'appliquent à tous les services de création de sites web, maintenance, gestion de réseaux sociaux et prestations connexes proposés par La Petite Vitrine, projet développé par Next Impact.
                  </p>
                </div>
              </section>

              {/* Article 2 */}
              <section>
                <h2 className="text-xl font-heading-4 text-blue-gray900 mb-4">
                  Article 2 - Services proposés
                </h2>
                <div className="space-y-4 text-blue-gray700 font-body-m">
                  <p>La Petite Vitrine propose les services suivants :</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Pack Essentiel (290€)</strong> : Site web One Page professionnel responsive, Google Business, 5 sections, mise à jour des contenus, nom de domaine + hébergement 1 an, livraison en 5 jours</li>
                    <li><strong>Pack Pro (490€)</strong> : Tout le pack de base + Facebook + Instagram Business + 3 pages additionnelles, livraison en 7 jours</li>
                    <li><strong>Pack Pro Plus (690€)</strong> : Tout le pack pro + 2 modules spécialisés, réseaux sociaux professionnels, livraison en 9 jours</li>
                    <li><strong>Services de maintenance</strong> : Option Visibilité (29€/mois) ou Maintenance Pro Plus (29€/mois)</li>
                  </ul>
                </div>
              </section>

              {/* Article 3 */}
              <section>
                <h2 className="text-xl font-heading-4 text-blue-gray900 mb-4">
                  Article 3 - Commandes
                </h2>
                <div className="space-y-4 text-blue-gray700 font-body-m">
                  <p>
                    Les commandes sont passées exclusivement via le site internet de La Petite Vitrine. Le Client sélectionne les services souhaités et procède au paiement en ligne via la plateforme sécurisée Stripe.
                  </p>
                  <p>
                    La validation de la commande par le Client vaut acceptation des présentes CGV. Un email de confirmation sera envoyé au Client dans les 24 heures suivant la commande.
                  </p>
                </div>
              </section>

              {/* Article 4 */}
              <section>
                <h2 className="text-xl font-heading-4 text-blue-gray900 mb-4">
                  Article 4 - Tarifs et modalités de paiement
                </h2>
                <div className="space-y-4 text-blue-gray700 font-body-m">
                  <p>
                    <strong>4.1 Tarifs :</strong> Les tarifs sont indiqués en euros TTC et sont valables à la date de la commande. Next Impact se réserve le droit de modifier ses tarifs à tout moment, sans préavis.
                  </p>
                  <p>
                    <strong>4.2 Modalités de paiement :</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Paiement unique pour les packs (création du site web)</li>
                    <li>Paiement mensuel par prélèvement automatique pour les services de maintenance</li>
                    <li>Paiement sécurisé via Stripe (CB, PayPal, virements)</li>
                    <li>Aucun frais de dossier ou frais cachés</li>
                  </ul>
                  <p>
                    <strong>4.3 Défaut de paiement :</strong> En cas de défaut de paiement, Next Impact se réserve le droit de suspendre ou résilier les services après mise en demeure restée sans effet pendant 8 jours.
                  </p>
                </div>
              </section>

              {/* Article 5 */}
              <section>
                <h2 className="text-xl font-heading-4 text-blue-gray900 mb-4">
                  Article 5 - Délais de livraison
                </h2>
                <div className="space-y-4 text-blue-gray700 font-body-m">
                  <p>
                    Les délais de livraison sont indicatifs et courent à compter de la réception du paiement et de tous les éléments nécessaires à la réalisation du projet (textes, images, informations légales, etc.).
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Pack Essentiel : 5 jours ouvrés</li>
                    <li>Pack Pro : 7 jours ouvrés</li>
                    <li>Pack Pro Plus : 9 jours ouvrés</li>
                  </ul>
                  <p>
                    Un retard dans la fourniture des éléments par le Client entraîne automatiquement un report des délais de livraison.
                  </p>
                </div>
              </section>

              {/* Article 6 */}
              <section>
                <h2 className="text-xl font-heading-4 text-blue-gray900 mb-4">
                  Article 6 - Obligations du Client
                </h2>
                <div className="space-y-4 text-blue-gray700 font-body-m">
                  <p>Le Client s'engage à :</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Fournir tous les éléments nécessaires à la réalisation du projet dans les délais convenus</li>
                    <li>S'assurer de la véracité et de la légalité des informations transmises</li>
                    <li>Respecter les droits de propriété intellectuelle des tiers</li>
                    <li>Effectuer les paiements aux échéances prévues</li>
                    <li>Valider les étapes de développement dans les 48 heures</li>
                  </ul>
                </div>
              </section>

              {/* Article 7 */}
              <section>
                <h2 className="text-xl font-heading-4 text-blue-gray900 mb-4">
                  Article 7 - Propriété intellectuelle
                </h2>
                <div className="space-y-4 text-blue-gray700 font-body-m">
                  <p>
                    <strong>7.1 Droits du Client :</strong> Le Client devient propriétaire du site web livré et des contenus qu'il a fournis. Il peut librement utiliser, modifier ou transférer son site web.
                  </p>
                  <p>
                    <strong>7.2 Droits de Next Impact :</strong> Next Impact conserve les droits sur ses méthodes, outils de développement et savoir-faire technique utilisés dans le cadre du projet La Petite Vitrine.
                  </p>
                  <p>
                    <strong>7.3 Contenus tiers :</strong> Le Client garantit détenir tous les droits sur les contenus fournis (textes, images, logos, etc.) et dégage Next Impact de toute responsabilité en cas de contrefaçon.
                  </p>
                </div>
              </section>

              {/* Article 8 */}
              <section>
                <h2 className="text-xl font-heading-4 text-blue-gray900 mb-4">
                  Article 8 - Droit de rétractation
                </h2>
                <div className="space-y-4 text-blue-gray700 font-body-m">
                  <p>
                    Conformément à l'article L221-28 du Code de la consommation, le droit de rétractation ne peut être exercé pour les services personnalisés ou les contenus numériques fournis de manière dématérialisée.
                  </p>
                  <p>
                    Toutefois, Next Impact offre une garantie satisfaction via La Petite Vitrine : si le Client n'est pas satisfait du livrable final, des modifications seront apportées gratuitement dans un délai de 7 jours après livraison.
                  </p>
                </div>
              </section>

              {/* Article 9 */}
              <section>
                <h2 className="text-xl font-heading-4 text-blue-gray900 mb-4">
                  Article 9 - Maintenance et support
                </h2>
                <div className="space-y-4 text-blue-gray700 font-body-m">
                  <p>
                    <strong>9.1 Maintenance incluse :</strong> La maintenance technique de base (sécurité, mises à jour) est incluse dans tous les packs pendant 1 an.
                  </p>
                  <p>
                    <strong>9.2 Services de maintenance optionnels :</strong> Les services de maintenance additionnels (réseaux sociaux, contenus) sont facturés mensuellement et résiliables sans préavis.
                  </p>
                  <p>
                    <strong>9.3 Support :</strong> Un support technique est disponible du lundi au vendredi de 9h à 18h par email ou téléphone via les équipes de Next Impact.
                  </p>
                </div>
              </section>

              {/* Article 10 */}
              <section>
                <h2 className="text-xl font-heading-4 text-blue-gray900 mb-4">
                  Article 10 - Résiliation
                </h2>
                <div className="space-y-4 text-blue-gray700 font-body-m">
                  <p>
                    <strong>10.1 Résiliation par le Client :</strong> Les services de maintenance peuvent être résiliés à tout moment sans préavis ni frais.
                  </p>
                  <p>
                    <strong>10.2 Résiliation par Next Impact :</strong> En cas de manquement grave du Client à ses obligations, Next Impact peut résilier le contrat après mise en demeure restée sans effet pendant 8 jours.
                  </p>
                </div>
              </section>

              {/* Article 11 */}
              <section>
                <h2 className="text-xl font-heading-4 text-blue-gray900 mb-4">
                  Article 11 - Responsabilité et garanties
                </h2>
                <div className="space-y-4 text-blue-gray700 font-body-m">
                  <p>
                    <strong>11.1 Garanties :</strong> Next Impact garantit la conformité des services fournis aux spécifications convenues et s'engage à corriger gratuitement tout défaut dans un délai de 30 jours.
                  </p>
                  <p>
                    <strong>11.2 Limitation de responsabilité :</strong> La responsabilité de Next Impact est limitée au montant des sommes versées par le Client. Next Impact ne saurait être tenue responsable des dommages indirects.
                  </p>
                  <p>
                    <strong>11.3 Force majeure :</strong> Next Impact ne saurait être tenue responsable en cas de force majeure ou d'événements indépendants de sa volonté.
                  </p>
                </div>
              </section>

              {/* Article 12 */}
              <section>
                <h2 className="text-xl font-heading-4 text-blue-gray900 mb-4">
                  Article 12 - Protection des données personnelles
                </h2>
                <div className="space-y-4 text-blue-gray700 font-body-m">
                  <p>
                    Next Impact s'engage à respecter la réglementation en vigueur applicable à la protection des données personnelles, notamment le RGPD.
                  </p>
                  <p>
                    Les données collectées sont nécessaires à l'exécution du contrat et ne sont pas transmises à des tiers sans consentement. Le Client dispose d'un droit d'accès, de rectification et de suppression de ses données.
                  </p>
                  <p>
                    Pour plus d'informations, consulter notre Politique de Confidentialité.
                  </p>
                </div>
              </section>

              {/* Article 13 */}
              <section>
                <h2 className="text-xl font-heading-4 text-blue-gray900 mb-4">
                  Article 13 - Règlement des litiges
                </h2>
                <div className="space-y-4 text-blue-gray700 font-body-m">
                  <p>
                    <strong>13.1 Médiation :</strong> En cas de litige, les parties s'engagent à rechercher une solution amiable avant toute action judiciaire.
                  </p>
                  <p>
                    <strong>13.2 Médiation de la consommation :</strong> Conformément à l'article L611-1 du Code de la consommation, le Client peut recourir gratuitement au service de médiation CNPM - MÉDIATION DE LA CONSOMMATION en cas de litige non résolu.
                  </p>
                  <p>
                    <strong>13.3 Juridiction compétente :</strong> À défaut de résolution amiable, les tribunaux de Trizac sont seuls compétents.
                  </p>
                </div>
              </section>

              {/* Article 14 */}
              <section>
                <h2 className="text-xl font-heading-4 text-blue-gray900 mb-4">
                  Article 14 - Dispositions générales
                </h2>
                <div className="space-y-4 text-blue-gray700 font-body-m">
                  <p>
                    <strong>14.1 Modification des CGV :</strong> Next Impact se réserve le droit de modifier les présentes CGV à tout moment. Les nouvelles conditions s'appliquent aux commandes passées après leur publication.
                  </p>
                  <p>
                    <strong>14.2 Nullité partielle :</strong> Si une clause des présentes CGV était déclarée nulle, les autres clauses resteraient applicables.
                  </p>
                  <p>
                    <strong>14.3 Loi applicable :</strong> Les présentes CGV sont régies par le droit français.
                  </p>
                </div>
              </section>

              {/* Informations légales */}
              <section className="bg-amber-50 p-6 rounded-lg">
                <h2 className="text-xl font-heading-4 text-blue-gray900 mb-4">
                  Informations légales
                </h2>
                <div className="space-y-2 text-blue-gray700 font-body-m">
                  <p><strong>Raison sociale :</strong> Next Impact</p>
                  <p><strong>Projet :</strong> La Petite Vitrine</p>
                  <p><strong>Forme juridique :</strong> Entreprise individuelle</p>
                  <p><strong>Siège social :</strong> 4 rue du Centre, 15400 Trizac</p>
                  <p><strong>SIRET :</strong> 532 675 386 00066</p>
                  <p><strong>Email :</strong> contact@lapetitevitrine.com</p>
                  <p><strong>Téléphone :</strong> 06 73 98 16 38</p>
                  <p><strong>Directeur de publication :</strong> Agathe Martin</p>
                  <p><strong>Hébergeur :</strong>Vercel Inc, 650 California St, San Francisco, CA 94108, US</p>
                </div>
              </section>

              {/* Footer */}
              <div className="text-center pt-8 border-t border-amber-200">
                <p className="text-blue-gray600 font-body-m">
                  Pour toute question concernant ces CGV, contactez-nous à : 
                  <a href="mailto:contact@lapetitevitrine.com" className="text-amber-700 hover:text-amber-900 ml-1">
                    contact@lapetitevitrine.com
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CGVPage;