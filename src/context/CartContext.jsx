// Gremah_Electro/src/context/CartContext.jsx
import React, { createContext, useState, useContext, useMemo, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * Contexte du panier d'achat
 * @type {React.Context}
 */
const CartContext = createContext();

/**
 * Fournisseur de contexte du panier
 * @param {object} props - Les propriétés du composant
 * @param {React.ReactNode} props.children - Les composants enfants
 * @returns {JSX.Element} Le fournisseur de contexte
 */
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Chargement initial depuis localStorage
  useEffect(() => {
    const loadCart = () => {
      try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          if (Array.isArray(parsedCart)) {
            setCartItems(parsedCart);
          }
        }
      } catch (error) {
        console.error('Erreur lors du chargement du panier:', error);
        localStorage.removeItem('cart');
      }
    };

    loadCart();
  }, []);

  // Sauvegarde dans localStorage
  useEffect(() => {
    const saveCart = () => {
      try {
        localStorage.setItem('cart', JSON.stringify(cartItems));
      } catch (error) {
        console.error('Erreur lors de la sauvegarde du panier:', error);
      }
    };

    saveCart();
  }, [cartItems]);

  /**
   * Ajoute un produit au panier ou met à jour sa quantité s'il existe déjà
   * @param {object} product - Le produit à ajouter
   * @param {number} [quantity=1] - La quantité à ajouter
   */
  const addToCart = useCallback((product, quantity = 1) => {
    if (!product?.id || typeof product?.price !== 'number') {
      console.error('Produit invalide pour le panier', product);
      return false;
    }

    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => 
        item.id === product.id && 
        item.selectedColor === product.selectedColor
      );

      if (existingItemIndex >= 0) {
        const newItems = [...prevItems];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + quantity
        };
        return newItems;
      }
      return [...prevItems, { 
        ...product, 
        quantity,
        addedAt: new Date().toISOString() 
      }];
    });
    return true;
  }, []);

  /**
   * Supprime un produit du panier
   * @param {string|number} productId - L'ID du produit à supprimer
   */
  const removeFromCart = useCallback((productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  }, []);

  /**
   * Met à jour la quantité d'un produit dans le panier
   * @param {string|number} productId - L'ID du produit
   * @param {number} newQuantity - La nouvelle quantité
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

  /** Vide complètement le panier */
  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // Calcul du total du panier
  const cartTotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + (item.price * item.quantity),
      0
    );
  }, [cartItems]);

  // Calcul du nombre total d'articles
  const cartCount = useMemo(() => {
    return cartItems.reduce(
      (count, item) => count + item.quantity,
      0
    );
  }, [cartItems]);

  // Vérifie si un produit est dans le panier
  const isInCart = useCallback((productId) => {
    return cartItems.some(item => item.id === productId);
  }, [cartItems]);

  // Récupère un produit du panier par son ID
  const getCartItem = useCallback((productId) => {
    return cartItems.find(item => item.id === productId);
  }, [cartItems]);

  // Valeur du contexte
  const contextValue = useMemo(() => ({
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
    isInCart,
    getCartItem
  }), [
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
    isInCart,
    getCartItem
  ]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

// PropTypes pour la validation
CartProvider.propTypes = {
  children: PropTypes.node.isRequired
};



export default CartContext;