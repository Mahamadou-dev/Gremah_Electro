// src/hooks/useCart.jsx
import { useContext } from 'react';
import  CartContext  from '../context/CartContext';

/**
 * Hook personnalisé pour accéder au contexte du panier
 * @returns {{
 *   cartItems: Array,
 *   addToCart: Function,
 *   removeFromCart: Function,
 *   updateQuantity: Function,
 *   clearCart: Function,
 *   cartTotal: number,
 *   cartCount: number,
 *   isInCart: Function,
 *   getCartItem: Function
 * }} Les valeurs du contexte du panier
 * @throws {Error} Si utilisé en dehors d'un CartProvider
 * 
 * @example
 * const {
 *   cartItems,
 *   addToCart,
 *   removeFromCart,
 *   cartTotal,
 *   cartCount
 * } = useCart();
 * 
 * @example
 * // Ajouter un produit au panier
 * addToCart(product, 2);
 * 
 * @example
 * // Vérifier si un produit est dans le panier
 * const isProductInCart = isInCart(productId);
 */
export const useCart = () => {
  const context = useContext(CartContext);
  
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};