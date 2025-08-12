import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { CartProvider } from './context/CartContext';
import { LoadingProvider } from './context/loadingContext';
import { NotificationProvider } from './context/NotificationContext';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ScrollToTopButton from './components/Shared/ScrollToTopButton';

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-sine',
      offset: 100,
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <CartProvider>
      <LoadingProvider>
        <NotificationProvider>
          <div className='bg-white dark:bg-gray-900 dark:text-white duration-900 overflow-hidden'>
            <Navbar />
            <AppRoutes />
            <Footer />
            <ScrollToTopButton />
          </div>
        </NotificationProvider>
      </LoadingProvider>
    </CartProvider>
  );
};

export default App;