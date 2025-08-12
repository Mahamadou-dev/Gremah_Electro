import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { IoArrowBack, IoShieldCheckmark } from 'react-icons/io5';

const privacySections = [
  {
    title: "1. Collecte des données",
    content: "Nous recueillons : nom complet, pièce d'identité (pour les livraisons), numéro de téléphone, adresse email et historique d'achats, conformément à la loi nigérienne sur la protection des données."
  },
  {
    title: "2. Finalités du traitement",
    content: "Vos données servent à : authentification obligatoire (loi BCEAO), traitement des commandes, prévention de la fraude, et envoi d'informations promotionnelles (avec consentement explicite)."
  },
  {
    title: "3. Protection des données",
    content: "Chiffrement SSL, stockage sécurisé chez notre hébergeur nigérien (Cristol Telecom), et accès restreint. Audit semestriel par l'Agence Nationale de Sécurité des Systèmes d'Information (ANSSI-Niger)."
  },
  {
    title: "4. Partage des données",
    content: "Avec nos partenaires locaux : sociétés de livraison (DHL Niger, Niger Express), banques (BIA-Niger, Bank Of Africa) et autorités judiciaires sur réquisition légale."
  },
  {
    title: "5. Vos droits",
    content: (
      <>
        Conformément à la loi nigérienne :
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Droit d'accès via votre espace client</li>
          <li>Rectification auprès de notre DPO</li>
          <li>Portabilité des données (format CSV)</li>
          <li>Opposition au marketing (SMS STOP au 4343)</li>
        </ul>
      </>
    )
  },
  {
    title: "6. Conservation",
    content: "Données clients : 3 ans après dernière activité. Données de paiement : 10 ans (obligation comptable). Données anonymisées pour statistiques : 5 ans maximum."
  }
];

const PrivacyPolicy = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8"
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
            Dernière mise à jour : 15/10/2023
          </span>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-xl overflow-hidden">
          <div className="bg-blue-600 dark:bg-blue-800 p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
              <IoShieldCheckmark className="text-3xl text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">Politique de Confidentialité</h1>
            <p className="mt-2 text-white/90">Conforme à la législation nigérienne</p>
          </div>

          <div className="p-6 md:p-8 space-y-8">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 mb-8">
                <strong>Gremah Electro SARL</strong> s'engage à protéger vos données personnelles selon 
                la loi nigérienne n°2019-33 relative à la protection des données à caractère personnel.
              </p>

              {privacySections.map((section, index) => (
                <section key={index} className="mb-8 last:mb-0">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3 flex items-start">
                    <span className="inline-block w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      {index + 1}
                    </span>
                    {section.title}
                  </h2>
                  <div className="text-gray-700 dark:text-gray-300 pl-11">
                    {section.content}
                  </div>
                </section>
              ))}

              <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <h3 className="font-bold text-lg text-blue-800 dark:text-blue-200 mb-3">Délégué à la Protection des Données</h3>
                <p className="text-blue-700 dark:text-blue-300">
                  <strong>M. Abdoulaye Moussa</strong><br />
                  Email : <a href="mailto:dpo@gremahelectro.ne" className="hover:underline">dpo@gremahelectro.ne</a><br />
                  Tél : +227 90 12 34 56<br />
                  Disponible du lundi au vendredi, 9h-17h
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-gray-600 dark:text-gray-400">
                Référence : POL-DATA-NE-2023
              </p>
              <Link 
                to="/conditions-utilisation" 
                className="text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors mt-4 sm:mt-0"
              >
                Voir les CGU
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PrivacyPolicy;