import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import Home from '../pages/Home';
import Shop from '../pages/Shop';
import ProductDetail from '../pages/ProductDetail';
import Cart from '../pages/Cart';
import Contact from '../pages/Contact';
import About from '../pages/About';
import Blogs from '../pages/Blogs';
import BlogDetail from '../pages/BlogDetail';
import NotFound from '../pages/NotFound';

// Wrapper pour ProductDetail
const ProductDetailWrapper = () => {
  const { slug } = useParams();
  
  if (!slug || slug === 'undefined') {
    return <Navigate to="/not-found" replace />;
  }
  
  return <ProductDetail />;
};

// Wrapper pour BlogDetail - MODIFIÉ pour utiliser slug au lieu de id
const BlogDetailWrapper = () => {
  const { slug } = useParams();
  
  if (!slug || slug === 'undefined') {
    return <Navigate to="/not-found" replace />;
  }
  
  return <BlogDetail />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Routes principales */}
      <Route path="/" element={<Home />} />
      <Route path="/boutique" element={<Shop />} />
      <Route path="/produit/:slug" element={<ProductDetailWrapper />} />
      <Route path="/panier" element={<Cart />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/a-propos" element={<About />} />
      
      {/* Routes des blogs - MODIFIÉ pour utiliser /blogs/:slug */}
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/blogs/:slug" element={<BlogDetailWrapper />} />
      
      {/* Gestion des erreurs */}
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/not-found" replace />} />
    </Routes>
  );
};

export default AppRoutes;