import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({
  text,
  // Valeurs par défaut pour les couleurs, adaptées à un style commun
  bgColor = 'bg-primary',      // Couleur de fond par défaut (à définir dans ton Tailwind config si 'primary' n'existe pas)
  textColor = 'text-white',    // Couleur du texte par défaut
  icon = null,                 // Pas d'icône par défaut
  className = '',              // Classes additionnelles vides par défaut
  href = null,                 // Pas de lien par défaut (ce sera un bouton simple)
  onClick = () => {},          // Fonction vide par défaut pour onClick
  type = 'button'              // Type 'button' par défaut pour l'élément <button>
}) => {
  // Classes de base pour le style commun à tous les boutons
  const baseClasses = `
    rounded-full
    font-medium
    transition-all
    duration-300
    hover:shadow-lg
    bg-${bgColor}
    text-${textColor}
    ${className}
  `;

  // Rendu conditionnel : si un 'href' est fourni, c'est un <Link>
  if (href) {
    return (
      <Link
        to={href}
        className={`inline-flex items-center justify-center px-6 py-2 ${baseClasses}`}
      >
        {icon && <span className="mr-2">{icon}</span>}
        {text}
      </Link>
    );
  }

  // Sinon, c'est un <button> standard
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center justify-center px-6 py-2 ${baseClasses}`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {text}
    </button>
  );
};

export default Button;