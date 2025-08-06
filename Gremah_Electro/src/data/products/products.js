// src/data/products/electro/electroProducts.js

import { casquesEcouteurs } from './casques_ecouteurs';
import { accessoires } from './accessoires';
import { laptops } from './laptops';
import { smartphones } from './smartphones';
import { hautParleurs } from './haut_parleurs';
import { smartwatchs } from './smartwatches';

// Combiner tous les produits
const allProducts = [
  ...casquesEcouteurs,
  ...accessoires,
  ...laptops,
  ...smartphones,
  ...hautParleurs,
  ...smartwatchs
];

// Fonctions utilitaires
export const getProductBySlug = (slug) => {
  return allProducts.find(product => product.slug === slug);
};

export const getProductsByCategory = (category) => {
  const categoryMap = {
    casques_ecouteurs: casquesEcouteurs,
    accessoires: accessoires,
    laptops: laptops,
    smartphones: smartphones,
    haut_parleurs: hautParleurs,
    smartwatchs: smartwatchs
  };
  
  return categoryMap[category] || [];
};

export const getFeaturedProducts = () => {
  return {
    newArrivals: allProducts.filter(p => p.isNew),
    bestSellers: allProducts.filter(p => p.isBestSeller)
  };
};

// Export groupé
export const allProductCategories = {
 casquesEcouteurs,
  accessoires,
  laptops,
  smartphones,
  hautParleurs,
  smartwatchs
};

// Export individuel pour permettre l'import sélectif
export { 
  casquesEcouteurs, 
  accessoires, 
  laptops, 
  smartphones, 
  hautParleurs, 
  smartwatchs 
};