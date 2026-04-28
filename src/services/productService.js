// ============================================================
// Product Service - Simulation backend-ready
// ============================================================
// Schema produit attendu par le frontend :
// {
//   id: string,
//   slug: string,
//   title: string,
//   price: number,
//   originalPrice?: number,
//   category: string,
//   rating: number,
//   images: string[],
//   description: string,
//   features: string[],
//   specifications: object,
//   colors?: string[],
//   stock: number,
//   isNew: boolean,
//   isBestSeller: boolean
// }
// ============================================================

import { allProducts } from '../data/products/products';

const STORAGE_KEY = 'gremah_admin_products';

const loadFromStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch (e) {
    console.error('Erreur chargement produits:', e);
  }
  return null;
};

const saveToStorage = (products) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch (e) {
    console.error('Erreur sauvegarde produits:', e);
  }
};

// Seed initial depuis les fichiers de données
const getProducts = () => {
  const stored = loadFromStorage();
  if (stored && stored.length > 0) return stored;
  // Ensure all products have valid image arrays
  const seeded = allProducts.map(p => ({
    ...p,
    images: p.images || ['/fallback-product-image.jpg'],
    stock: typeof p.stock === 'number' ? p.stock : 10,
    price: typeof p.price === 'number' ? p.price : 0,
  }));
  saveToStorage(seeded);
  return [...seeded];
};

const getProductById = (id) => {
  const products = getProducts();
  return products.find(p => p.id === id) || null;
};

const addProduct = (product) => {
  const products = getProducts();
  const newProduct = {
    ...product,
    id: product.id || `prod-${Date.now()}`,
    slug: product.slug || product.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  };
  const updated = [...products, newProduct];
  saveToStorage(updated);
  return newProduct;
};

const updateProduct = (id, updates) => {
  const products = getProducts();
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return null;
  const updated = [...products];
  updated[index] = { ...updated[index], ...updates };
  saveToStorage(updated);
  return updated[index];
};

const deleteProduct = (id) => {
  const products = getProducts();
  const updated = products.filter(p => p.id !== id);
  saveToStorage(updated);
  return updated.length < products.length;
};

const resetProducts = () => {
  saveToStorage(allProducts);
  return [...allProducts];
};

export {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  resetProducts
};
