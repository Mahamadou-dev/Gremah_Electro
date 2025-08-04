import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Shop from '../pages/Shop';
import ProductDetail from '../pages/ProductDetail';
import Cart from '../pages/Cart';
import Contact from '../pages/Contact';
import About from '../pages/About';

import { useParams, Navigate } from 'react-router-dom';

const ProductDetailWrapper = () => {
  const { slug } = useParams();
  
  if (!slug || slug === 'undefined') {
    return <Navigate to="/produit-introuvable" replace />;
  }
  
  return <ProductDetail />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/boutique" element={<Shop />} />
      <Route path="/produit/:slug" element={<ProductDetailWrapper />} /> {/* Changé de :id à :slug */}
      <Route path="/panier" element={<Cart />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/a-propos" element={<About />} />
    </Routes>
  );
};

export default AppRoutes;