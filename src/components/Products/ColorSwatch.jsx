// src/components/Shared/ColorSwatch.jsx (Recommended path)

import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi'; // For the selected checkmark

const ColorSwatch = ({ color, isSelected, onSelect }) => {
  // Function to determine text and border colors based on the color prop.
  // You might want to expand this with a more comprehensive color mapping
  // for non-standard color names (e.g., "Space Gray" -> "#8D8D8D").
  const getColorClasses = (colorName) => {
    switch (colorName.toLowerCase()) {
      case 'noir':
        return 'bg-gray-900 text-white border-gray-900';
      case 'blanc':
        return 'bg-white text-gray-800 border-gray-300 dark:border-gray-600';
      case 'bleu':
        return 'bg-blue-600 text-white border-blue-600';
      case 'rouge':
        return 'bg-red-600 text-white border-red-600';
      case 'vert':
        return 'bg-green-600 text-white border-green-600';
      case 'gris':
        return 'bg-gray-500 text-white border-gray-500';
      case 'argent':
        return 'bg-gray-300 text-gray-800 border-gray-300';
      case 'or':
        return 'bg-yellow-500 text-gray-900 border-yellow-500';
      case 'rose':
        return 'bg-pink-400 text-white border-pink-400';
      case 'violet':
        return 'bg-purple-600 text-white border-purple-600';
      default:
        // Fallback for custom names or if you prefer button styling
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white border-gray-300 dark:border-gray-600';
    }
  };

  const colorClasses = getColorClasses(color);

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.05, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
      whileTap={{ scale: 0.95 }}
      onClick={onSelect}
      className={`
        relative px-5 py-2.5 rounded-full border-2 transition-all duration-200 text-sm font-medium
        ${colorClasses}
        ${isSelected
          ? 'ring-4 ring-primary ring-opacity-50 border-primary shadow-lg scale-[1.03]' // Highlight for selected
          : 'hover:border-primary-light hover:bg-gray-50 dark:hover:bg-gray-700'
        }
        flex items-center justify-center transform active:scale-98
      `}
      aria-pressed={isSelected}
      aria-label={`Sélectionner la couleur ${color}`}
    >
      {/* Visual swatch indicator (if it's a standard color name) */}
      {['noir', 'blanc', 'bleu', 'rouge', 'vert', 'gris', 'argent', 'or', 'rose', 'violet'].includes(color.toLowerCase()) && (
        <span
          className={`w-4 h-4 rounded-full mr-2`}
          style={{ backgroundColor: getColorClasses(color).split(' ')[0].replace('bg-', '') }} // Extract color code
        ></span>
      )}
      <span>{color}</span>
      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute -top-2 -right-2 bg-primary-dark text-white rounded-full p-1 shadow-md"
          >
            <FiCheck size={14} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

ColorSwatch.propTypes = {
  color: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default ColorSwatch;