import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Button from '../Shared/Button'; // Ensure this path is correct
import { Link } from 'react-router-dom'; // Assuming you use React Router for navigation

// Import specific product data and their images
import { laptops } from '../../data/products/laptops';
import { smartphones } from '../../data/products/smartphones';
import { casquesEcouteurs } from '../../data/products/casques_ecouteurs';
import { hautParleurs } from '../../data/products/haut_parleurs';
// --- Hero Slide Component ---
import { useNavigate } from 'react-router-dom';


// Fallback image for broken links (ensure this path exists and is a good placeholder)
const FALLBACK_IMAGE = '/fallback-product-image.jpg'; // Make sure you have a generic fallback image at this path

// --- Slider configuration ---
const sliderSettings = {
  dots: true, // Show dots for navigation
  infinite: true,
  speed: 800,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000, // Slightly faster autoplay for a dynamic feel
  arrows: false, // Keep arrows off for a cleaner look, dots are sufficient
  cssEase: 'ease-in-out',
  pauseOnHover: true, // Pause on hover for user interaction
  pauseOnFocus: true,
  adaptiveHeight: true,
};

// --- Curated Hero Slides Data ---
// We'll pick one product from each relevant category for variety and impact
const heroSlidesData = [
  {
    id: 'asus-proart-p16-h7606', // Laptop
    img: laptops[0]?.images[0] || FALLBACK_IMAGE,
    subtitle: 'Performance et Création',
    title1: 'ASUS ProArt P16',
    title2: 'RTX 5070',
    description: 'Conçu pour les professionnels, ce PC portable combine puissance de calcul AI et graphismes RTX 5070 pour des projets sans limites.',
    price: laptops[0]?.price,
    slug: laptops[0]?.slug || '#',
    bgClass: 'bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-gray-800 dark:to-gray-900', // Light blue/indigo gradient
    textDark: true, // For light backgrounds, text should be dark
  },
  {
    id: 'samsung-galaxy-s24-ultra', // Smartphone
    img: smartphones[1]?.images[2] || FALLBACK_IMAGE,
    subtitle: 'L\'Innovation à Portée de Main',
    title1: 'Samsung Galaxy S24',
    title2: 'Ultra',
    description: 'Découvrez la photographie mobile réinventée avec le Galaxy S24 Ultra, intégrant une IA avancée pour des clichés époustouflants.',
    price: smartphones[1]?.price,
    slug: smartphones[1]?.slug || '#',
    bgClass: 'bg-gradient-to-r from-green-50 to-teal-100 dark:from-gray-900 dark:to-gray-800', // Light green/teal gradient
    textDark: true,
  },
  {
    id: 'razer-kraken-v4', // Headset
    img: casquesEcouteurs[1]?.images[0] || FALLBACK_IMAGE,
    subtitle: 'Immersion Sonore Totale',
    title1: 'Razer Kraken V4',
    title2: 'Sans Fil',
    description: 'Le casque gaming ultime pour une expérience audio THX Spatial immersive et un confort exceptionnel lors de vos sessions de jeu prolongées.',
    price: casquesEcouteurs[1]?.price,
    slug: casquesEcouteurs[1]?.slug || '#',
    bgClass: 'bg-gradient-to-r from-purple-50 to-pink-100 dark:from-gray-800 dark:to-gray-900', // Light purple/pink gradient
    textDark: true,
  },
  {
    id: 'jbl-boombox-3', // Speaker
    img: hautParleurs[1]?.images[5] || FALLBACK_IMAGE,
    subtitle: 'La Fête Partout, Tout le Temps',
    title1: 'JBL Boombox 3',
    title2: 'Son Massif',
    description: 'Profitez de basses profondes et d\'un son JBL Original Pro puissant pendant 24h, avec un design robuste et étanche.',
    price: hautParleurs[1]?.price,
    slug: hautParleurs[1]?.slug || '#',
    bgClass: 'bg-gradient-to-r from-orange-50 to-yellow-100 dark:from-gray-900 dark:to-gray-800', // Light orange/yellow gradient
    textDark: true,
  },
];



const HeroSlide = ({ slide }) => {
  const navigate = useNavigate();

  // Basic validation for slide data
  if (!slide || !slide.img || !slide.subtitle || !slide.title1 || !slide.title2 || !slide.description || slide.price === undefined) {
    console.error('Données de slide invalides ou incomplètes :', slide);
    return null;
  }

  // Helper to format price

  const formatPrice = (price) => {
    if (typeof price !== 'number') {
      return 'N/A';
    }
    return price.toLocaleString('fr-FR', {
      style: 'currency',
      currency: 'XOF'
    });
  };


  const textColorClass = slide.textDark ? 'text-gray-900 dark:text-white' : 'text-white';
  const descColorClass = slide.textDark ? 'text-gray-700 dark:text-gray-300' : 'text-gray-200';
  const primaryTitleColorClass = slide.textDark ? 'text-primary' : 'text-primary-light'; // Use a lighter primary for dark text on light backgrounds

  const handleViewDetails = () => {
    if (!slide?.slug) {
      console.error('Product slug is missing!', slide);
      return;
    }
    navigate(`/produit/${encodeURIComponent(slide.slug)}`);
  };
  return (
    <div className={`relative grid grid-cols-1 sm:grid-cols-2 items-center gap-8 px-6 py-12 sm:px-16 sm:py-20 min-h-[550px] overflow-hidden ${slide.bgClass || 'bg-white dark:bg-gray-900'}`}>
      {/* Background shape (subtle, abstract) */}
      <div className="absolute inset-0 z-0 flex justify-end items-center opacity-10 dark:opacity-5">
        <svg className="w-full h-full sm:w-3/4 sm:h-3/4 text-current" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M47.7,-64C62.7,-52.1,75.4,-36,78.2,-17.7C81,0.6,73.8,20.9,62.8,37.3C51.8,53.8,37.1,66.4,20.8,69.5C4.5,72.6,-13.4,66.2,-28.9,56.1C-44.4,45.9,-57.4,32,-63.9,15.7C-70.5,-0.7,-70.5,-19.4,-61.8,-34.5C-53.1,-49.5,-35.6,-61,-18,-68.5C-0.4,-75.9,17.2,-79.3,31.2,-73.4Z" transform="translate(100 100) scale(1.2)" />
        </svg>
      </div>

      {/* Text Content Section */}
      <div className='text-center sm:text-left space-y-4 relative z-10'>
        <p
          data-aos='fade-down'
          data-aos-duration='800'
          data-aos-delay='100'
          data-aos-once='true'
          className={`text-xl sm:text-2xl ${primaryTitleColorClass} font-semibold uppercase tracking-widest`}
        >
          {slide.subtitle}
        </p>

        <h1
          data-aos='fade-right'
          data-aos-duration='1000'
          data-aos-delay='200'
          data-aos-once='true'
          className={`text-5xl sm:text-7xl font-extrabold ${textColorClass} leading-tight drop-shadow-lg`}
        >
          {slide.title1} <br />
          <span className={primaryTitleColorClass}>{slide.title2}</span>
        </h1>

        <p
          data-aos='fade-up'
          data-aos-duration='900'
          data-aos-delay='300'
          data-aos-once='true'
          className={`text-md sm:text-lg ${descColorClass} leading-relaxed max-w-xl mx-auto sm:mx-0`}
        >
          {slide.description}
        </p>

        <p
          data-aos='fade-up'
          data-aos-duration='900'
          data-aos-delay='400'
          data-aos-once='true'
          className={`text-3xl sm:text-4xl font-bold ${textColorClass} mt-4`}
        >
          {formatPrice(slide.price)}
        </p>

        <div
          data-aos='zoom-in'
          data-aos-duration='600'
          data-aos-delay='500'
          data-aos-once='true'
          className='flex justify-center sm:justify-start mt-6'
        >
          
            <Button
              text='Acheter Maintenant'
              bgColor='bg-primary' // Use primary for the button
              textColor='text-white'
              ariaLabel={`Acheter ${slide.title1} ${slide.title2}`}
              onClick={handleViewDetails}
            />
         
        </div>
      </div>


      {/* Image Section */}
      <div
        data-aos='fade-left'
        data-aos-duration='1200'
        data-aos-delay='300'
        data-aos-once='true'
        className='flex justify-center sm:justify-end relative z-10 p-4' // Added padding here for spacing
      >
        <img
          src={slide.img}
          alt={slide.title2 || 'Produit'}
          className='w-[280px] h-[280px] sm:w-[450px] sm:h-[450px] object-contain drop-shadow-xl transition-transform duration-500 hover:scale-105 ease-out'
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = FALLBACK_IMAGE; // Use the central fallback
            console.error(`Erreur de chargement de l'image pour l'ID ${slide.id}: ${slide.img}`);
          }}
        />
      </div>
    </div>
  );
};

// --- Hero Main Component ---
const Hero = () => {
  if (!heroSlidesData || heroSlidesData.length === 0) {
    return (
      <div className='container mx-auto px-4 py-12'>
        <div className='min-h-[550px] flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-3xl shadow-lg'>
          <p className='text-gray-600 dark:text-gray-300 text-xl font-medium'>Aucun contenu à afficher dans le slider Hero.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-10 sm:py-12'>
      <div className='relative overflow-hidden rounded-3xl min-h-[550px] flex justify-center items-center shadow-xl'> {/* Reduced shadow slightly */}
        <Slider {...sliderSettings} className='w-full h-full'>
          {heroSlidesData.map((slide) => (
            <div key={slide.id}>
              <HeroSlide slide={slide} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Hero;