import Hero from '../components/Hero/Hero';
import Category from '../components/Category/Category';
import Services from '../components/Services/Services';
import Banner from '../components/Banner/Banner';
import Products from '../components/Products/Products';
import Blogs from '../components/Blogs/Blogs';
import Partners from '../components/Partners/Partners';
import ErrorBoundary from '../components/Shared/ErrorBoundary';
// Importation des images pour les bannières (si utilisées directement dans App.jsx)
import headphone from '../assets/hero/headphone.png';
import smartwatch2 from '../assets/category/smartwatch2-removebg-preview.png';

// Données pour la première bannière
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

// Données pour la deuxième bannière
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

const Home = () => {
  return (
    <div className='mt-10' >
      <ErrorBoundary>
        <Hero />
      </ErrorBoundary>
      <Category />
      <Services />
      <Banner BannerData={bannerData} />
      <ErrorBoundary>
        <Products />
      </ErrorBoundary>
      <Banner BannerData={bannerData2} />
      <Blogs />
      <Partners />
    </div>
  );
};

export default Home;