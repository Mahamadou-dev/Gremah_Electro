import { useParams, Navigate } from 'react-router-dom';

const ProductDetailWrapper = () => {
  const { slug } = useParams();
  
  if (!slug || slug === 'undefined') {
    return <Navigate to="/produit-introuvable" replace />;
  }
  
  return <ProductDetail />;
};