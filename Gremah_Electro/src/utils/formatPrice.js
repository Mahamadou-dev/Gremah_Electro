// src/utils/formatPrice.js
export const formatPrice = (price) => {
  if (typeof price !== 'number') {
    return 'N/A';
  }
  return price.toLocaleString('fr-FR', {
    style: 'currency',
    currency: 'XOF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};