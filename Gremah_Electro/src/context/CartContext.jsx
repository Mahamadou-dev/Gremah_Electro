// src/context/CartContext.js
import { createContext, useContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Synchronisation avec le mode sombre
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('gremah_cart')) || [];
    setCart(savedCart);
  }, []);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      const newCart = existingItem
        ? prevCart.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prevCart, { ...product, quantity: 1 }];
      
      localStorage.setItem('gremah_cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}