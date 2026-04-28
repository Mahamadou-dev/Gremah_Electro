import { Routes, Route, Navigate, useParams, Outlet } from 'react-router-dom';
import Home from '../pages/Home';
import Shop from '../pages/Shop';
import ProductDetail from '../pages/ProductDetail';
import Cart from '../pages/Cart';
import Contact from '../pages/Contact';
import About from '../pages/About';
import Blogs from '../pages/Blogs';
import BlogDetail from '../pages/BlogDetail';
import NotFound from '../pages/NotFound';
import { allProducts } from '../data/products/products';
import { blogs } from '../data/blogs/blogs';
import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import SignUp from '../pages/SignUp';
import TermsOfService from '../pages/TermsOfService';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import { useAdminAuth } from '../context/AdminAuthContext';
import AdminLogin from '../pages/AdminLogin';
import AdminLayout from '../pages/admin/AdminLayout';
import StatsOverview from '../pages/admin/StatsOverview';
import ProductsManager from '../pages/admin/ProductsManager';
import BlogsManager from '../pages/admin/BlogsManager';

// Wrapper pour ProductDetail (version corrigée)
const ProductDetailWrapper = () => {
  const { slug } = useParams();
  const productExists = allProducts.some(p => p.slug === slug);
  
  if (!slug || !productExists) {
    return <Navigate to="/not-found" replace />;
  }
  
  return <ProductDetail />;
};

// Wrapper pour BlogDetail (version corrigée)
const BlogDetailWrapper = () => {
  const { slug } = useParams();
  const blogExists = blogs.some(b => b.slug === slug);
  
  if (!slug || !blogExists) {
    return <Navigate to="/not-found" replace />;
  }
  
  return <BlogDetail />;
};

// Protection route admin
const AdminRoute = () => {
  const { isAdmin, isLoading } = useAdminAuth();
  if (isLoading) return null;
  if (!isAdmin) return <Navigate to="/admin/login" replace />;
  return <Outlet />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/boutique" element={<Shop />} />
      <Route path="/produit/:slug" element={<ProductDetailWrapper />} />
      <Route path="/panier" element={<Cart />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/a-propos" element={<About />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/blogs/:slug" element={<BlogDetailWrapper />} />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/not-found" replace />} />
      <Route path="/se-connecter" element={<Login />} />
      <Route path="/mot-de-passe-oublie" element={<ForgotPassword />} />
      <Route path="/creer-un-compte" element={<SignUp />} />
      <Route path="/conditions" element={<TermsOfService />} />
      <Route path="/politique-confidentialite" element={<PrivacyPolicy />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<StatsOverview />} />
          <Route path="produits" element={<ProductsManager />} />
          <Route path="blogs" element={<BlogsManager />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;