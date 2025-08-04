import { useContext } from 'react';
import { CartContext } from '../context/CartContext'; // Importe le contexte depuis son nouveau fichier

/**
 * Hook personnalisé pour consommer le CartContext.
 * @returns {object} L'état du panier et les actions.
 * @throws {Error} Si utilisé en dehors d'un CartProvider.
 */
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};