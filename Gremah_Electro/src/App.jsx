import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Category from './components/Category/Category';
import Services from './components/Services/Services';
import Banner from './components/Banner/Banner';
import Products from './components/Products/Products';
import Blogs from './components/Blogs/Blogs';
import Partners from './components/Partners/Partners';
import Footer from './components/Footer/Footer';

import headphone from './assets/hero/headphone.png';
import smartwatch2 from './assets/category/smartwatch2-removebg-preview.png';
import ScrollToTopButton from './components/Shared/ScrollToTopButton';

const bannerData = {
  discount: "30% DE RÉDUCTION",
  mainTitle: "Écouteurs Premium",
  description: "Profitez de notre offre spéciale limitée dans le temps",
  validity: "Valable jusqu'au 31 décembre 2025",
  image: headphone,
  ctaText: "Achetez maintenant",
  bgColor: "#f42c37",
  features: [
    "Qualité sonore exceptionnelle",
    "Confort optimal",
    "Batterie longue durée"
  ]
};

const bannerData2 = {
  discount: "20% DE RÉDUCTION",
  mainTitle: "Montres connectées Premium",
  description: "Profitez de notre offre spéciale limitée dans le temps",
  validity: "Valable jusqu'au 15 septembre 2025",
  image: smartwatch2,
  ctaText: "Achetez maintenant",
  bgColor: "#2dcc6f",
  features: [
    "Connexion bluetooth/wifi exceptionnelle",
    "Confort optimal",
    "Batterie longue durée"
  ]
};

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
    <div className='bg-white dark:bg-gray-900 dark:text-white duration-900 overflow-hidden'>
      <Navbar />
      <Hero />
      <Category />
      <Services />
      <Banner BannerData={bannerData} />
      <Products />
      <Banner BannerData={bannerData2} />
      <Blogs />
      <Partners />
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default App;
