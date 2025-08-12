// src/utils/FixImagePath.js
const FALLBACK_IMAGE = '/fallback-product-image.jpg';

export function getProductImage(product) {
  if (!product) return FALLBACK_IMAGE;

  // Essayez d'abord product.img, puis product.images[0]
  const rawImage = product.img || (product.images && product.images[0]);

  if (!rawImage) {
    console.warn(`No image found for product: ${product.title || product.id}`);
    return FALLBACK_IMAGE;
  }

  // Si l'image est déjà une URL complète ou un chemin correct, la retourner telle quelle
  if (rawImage.startsWith('http') || rawImage.startsWith('/')) {
    return rawImage;
  }

  // Pour les images importées dynamiquement qui sont des objets module
  if (typeof rawImage === 'object' && rawImage.default) {
    return rawImage.default;
  }

  return rawImage;
}