import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici vous ajouterez la logique d'envoi d'email
    console.log('Email envoyé à :', email);
    setIsSubmitted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4"
    >
      <div className="w-full max-w-md">
        <Link 
          to="/se-connecter" 
          className="flex items-center text-primary hover:text-primary-dark mb-6"
        >
          <IoArrowBack className="mr-2" />
          Retour à la connexion
        </Link>

        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
          {!isSubmitted ? (
            <>
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Réinitialiser le mot de passe
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Entrez votre email pour recevoir un lien de réinitialisation
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Adresse email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
                    placeholder="votre@email.com"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-dark text-white py-3 px-4 rounded-lg font-medium transition duration-200"
                >
                  Envoyer le lien
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 mb-4">
                <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Email envoyé !
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Consultez votre boîte mail pour le lien de réinitialisation.
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-4">
                Si vous ne recevez rien, vérifiez vos spams ou{' '}
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="text-primary hover:text-primary-dark font-medium"
                >
                  réessayez
                </button>.
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ForgotPassword;