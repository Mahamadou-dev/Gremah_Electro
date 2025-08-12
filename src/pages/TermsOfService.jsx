import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { IoArrowBack, IoDocumentText } from 'react-icons/io5';

const sections = [
  {
    title: "1. Acceptation des conditions",
    content: "En utilisant Gremah Electro, vous acceptez sans réserve les présentes conditions générales d'utilisation conformes à la loi nigérienne n°2017-27 sur les transactions électroniques."
  },
  {
    title: "2. Description du service",
    content: "Plateforme e-commerce spécialisée dans la vente de produits électroniques et accessoires technologiques au Niger, avec livraison dans toutes les régions."
  },
  {
    title: "3. Compte utilisateur",
    content: "Les utilisateurs doivent fournir des informations exactes conformément à l'obligation d'identification de la BCEAO. Tout compte inactif pendant 18 mois sera désactivé."
  },
  {
    title: "4. Commandes et paiements",
    content: "Paiement en XOF (Franc CFA) via : Mobile Money (Moov, Airtel), cartes bancaires (UBA, Ecobank) et paiement à la livraison (uniquement à Zinder). TVA non applicable au Niger."
  },
  {
    title: "5. Livraisons",
    content: "Délais moyens : 2-3 jours (Zinder), 5-7 jours (autres régions). Frais de port variables selon la distance : 1 500 XOF (Zinder), 3 000-5 000 XOF (autres villes)."
  },
  {
    title: "6. Retours et garanties",
    content: "Droit de rétractation de 7 jours ouvrables. Produits défectueux couverts par la garantie constructeur (6 mois minimum). Retours gratuits pour les défauts de fabrication."
  },
  {
    title: "7. Litiges",
    content: "Tout litige relève des tribunaux compétents de Zinder. Médiation préalable obligatoire auprès de la Chambre de Commerce de Zinder."
  }
];



const TermsOfUse = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen mt-10 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link 
            to="/" 
            className="flex items-center text-primary hover:text-primary-dark transition-colors"
          >
            <IoArrowBack className="mr-2" />
            Retour à l'accueil
          </Link>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Version du {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-xl overflow-hidden">
          <div className="bg-green-600 dark:bg-green-800 p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
              <IoDocumentText className="text-3xl text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">Conditions Générales d'Utilisation</h1>
            <p className="mt-2 text-white/90">Valables au Niger - Réf. CGU-NE-2023</p>
          </div>

          <div className="p-6 md:p-8 space-y-8">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 mb-8">
                <strong>Gremah Electro SARL</strong>, société immatriculée au RCCM de Zinder sous le numéro NE/ZINDER/2020/B/123, 
                dont le siège social est situé à Charée Zamna, Zinder, Niger.
              </p>

              {sections.map((section, index) => (
                <section key={index} className="mb-8 last:mb-0">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3 flex items-start">
                    <span className="inline-block w-8 h-8 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      {index + 1}
                    </span>
                    {section.title}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 pl-11">
                    {section.content}
                  </p>
                </section>
              ))}

              <div className="mt-12 p-6 bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-200 dark:border-green-800">
                <h3 className="font-bold text-lg text-green-800 dark:text-green-200 mb-3">Coordonnées légales</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li><strong>RCCM :</strong> NE/ZINDER/2020/B/123</li>
                  <li><strong>Siège social :</strong> Charée Zamna, Zinder</li>
                  <li><strong>Tél :</strong> +227 88 77 80 95</li>
                  <li><strong>Email :</strong> legal@gremahelectro.ne</li>
                  <li><strong>Gérant :</strong> Mahamadou Amadou Habou Gremah</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-gray-600 dark:text-gray-400">
                © {new Date().getFullYear()} Gremah Electro SARL - Tous droits réservés
              </p>
              <Link 
                to="/politique-confidentialite" 
                className="text-sm bg-primary hover:bg-gray-200 dark:hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors mt-4 sm:mt-0"
              >
                Politique de confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TermsOfUse;