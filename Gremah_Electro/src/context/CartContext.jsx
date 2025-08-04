import React, { createContext, useState, useContext, useMemo, useCallback } from 'react';

// Crée le contexte en dehors du composant
const CartContext = createContext();

/**
 * Fournit l'état du panier et les actions à ses enfants.
 * @param {object} props - Propriétés du composant.
 * @param {React.ReactNode} props.children - Composants enfants à rendre dans le fournisseur.
 */
export const CartProvider = ({ children }) => {
  // État pour contenir les articles dans le panier
  const [cartItems, setCartItems] = useState([]);

  /**
   * Ajoute un produit au panier ou met à jour sa quantité s'il existe déjà.
   * @param {object} product - L'objet produit à ajouter (doit avoir un 'id' et 'price').
   * @param {number} [quantity=1] - La quantité à ajouter. Par défaut : 1.
   */
  const addToCart = useCallback((product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);

      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { ...product, quantity }];
    });
  }, []);
  

  /**
   * Supprime un produit du panier.
   * @param {string | number} productId - L'ID du produit à supprimer.
   */
  const removeFromCart = useCallback((productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  }, []);

  /**
   * Met à jour la quantité d'un produit spécifique dans le panier.
   * Assure que la quantité ne descend pas en dessous de 1. Si la quantité est 0, l'article est supprimé.
   * @param {string | number} productId - L'ID du produit à mettre à jour.
   * @param {number} newQuantity - La nouvelle quantité pour le produit.
   */
  const updateQuantity = useCallback((productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  }, [removeFromCart]);

  /**
   * Vide tous les articles du panier.
   */
  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // --- Valeurs dérivées (Mémoïsées pour la performance) ---

  /**
   * Calcule le prix total de tous les articles dans le panier.
   * Mémoïsé pour éviter les recalculs inutiles à chaque rendu si cartItems n'a pas changé.
   * @returns {number} Le prix total.
   */
  const cartTotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + (item.price * item.quantity),
      0
    );
  }, [cartItems]);

  /**
   * Calcule le nombre total d'articles (somme des quantités) dans le panier.
   * Mémoïsé pour éviter les recalculs inutiles à chaque rendu si cartItems n'a pas changé.
   * @returns {number} Le nombre total d'articles.
   */
  const cartCount = useMemo(() => {
    return cartItems.reduce(
      (count, item) => count + item.quantity,
      0
    );
  }, [cartItems]);

  // La valeur fournie aux consommateurs du CartContext
  // Mémoïse l'objet 'value' lui-même pour éviter les re-rendus inutiles des consommateurs
  const contextValue = useMemo(() => ({
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
  }), [cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};



// Exporte le contexte lui-même pour qu'il puisse être importé par useCart
export { CartContext };