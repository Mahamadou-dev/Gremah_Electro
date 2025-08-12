import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Shared/Button';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4 text-center">
      <h1 className="text-6xl font-bold text-gray-800 dark:text-white mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
        Oups! Page non trouvée
      </h2>
      <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8">
        La page que vous recherchez n'existe pas ou a été déplacée.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link to="/">
          <Button 
            text="Retour à l'accueil"
            bgColor="primary"
            textColor="white"
            className="px-6 py-3"
          />
        </Link>
        <Link to="/blogs">
          <Button 
            text="Voir nos articles"
            bgColor="gray"
            textColor="gray-800"
            className="px-6 py-3"
          />
        </Link>
      </div>
    </div>
  );
};

export default NotFound;