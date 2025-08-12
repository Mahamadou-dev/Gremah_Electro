/*// src/hooks/useWishlist.js

import { useState, useEffect, useCallback } from 'react';

const WISHLIST_STORAGE_KEY = 'userWishlist';

/**
 * Custom hook for managing a user's wishlist.
 * Stores wishlist items in localStorage for persistence.
 */*
 /*
export const useWishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  // Load wishlist from localStorage on initial mount
  useEffect(() => {
    try {
      const storedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (storedWishlist) {
        setWishlistItems(JSON.parse(storedWishlist));
      }
    } catch (error) {
      console.error("Failed to load wishlist from localStorage:", error);
      // Fallback to empty array if localStorage is inaccessible or corrupted
      setWishlistItems([]);
    }
  }, []);

  // Save wishlist to localStorage whenever wishlistItems changes
  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistItems));
    } catch (error) {
      console.error("Failed to save wishlist to localStorage:", error);
    }
  }, [wishlistItems]);

  /**
   * Adds a product to the wishlist.
   * @param {object} product - The product object to add. Must have a 'slug' or 'id'.
   *//*
  const addToWishlist = useCallback((product) => {
    if (!product || (!product.slug && !product.id)) {
      console.error("Attempted to add invalid product to wishlist:", product);
      return;
    }
    setWishlistItems(prevItems => {
      const identifier = product.slug || product.id;
      // Check if item already exists to prevent duplicates
      if (!prevItems.some(item => (item.slug || item.id) === identifier)) {
        // Add only necessary product info to avoid large storage
        const newItem = {
          slug: product.slug,
          id: product.id,
          title: product.title,
          img: product.img,
          price: product.price,
          category: product.category,
          rating: product.rating,
          // Add other minimal properties you need to display in a wishlist preview
        };
        console.log(`Added ${product.title} to wishlist.`);
        return [...prevItems, newItem];
      }
      return prevItems; // Item already in wishlist
    });
  }, []);

  /**
   * Removes a product from the wishlist.
   * @param {string | number} productIdentifier - The slug or id of the product to remove.
   *//*
  const removeFromWishlist = useCallback((productIdentifier) => {
    setWishlistItems(prevItems => {
      const newItems = prevItems.filter(item => (item.slug || item.id) !== productIdentifier);
      if (newItems.length < prevItems.length) {
        console.log(`Removed product with identifier ${productIdentifier} from wishlist.`);
      }
      return newItems;
    });
  }, []);

  /**
   * Checks if a product is currently in the wishlist.
   * @param {string | number} productIdentifier - The slug or id of the product to check.
   * @returns {boolean} True if the product is in the wishlist, false otherwise.
   *//*
  const isInWishlist = useCallback((productIdentifier) => {
    return wishlistItems.some(item => (item.slug || item.id) === productIdentifier);
  }, [wishlistItems]); // Depend on wishlistItems to re-evaluate when it changes

  return {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  };
};*/