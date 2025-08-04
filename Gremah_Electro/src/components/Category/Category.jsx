import React from 'react'
import { motion } from 'framer-motion'
import Button from '../Shared/Button'
import { useNavigate } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'

// Import images
import HeadphonesImg from '../../assets/products/electro/CASQUES_ECOUTEURS/micro-casque-gaming-sans-fil-msi-immerse-gh50-noir.jpg'
import SmartwatchImg from '../../assets/products/electro/SMARTWATCHS/smart-watch-huawei-watch-gt4-phoinix-b19m-titanium-avec-band-8-freebuds-se-gratuits__2_-removebg-preview.png'
import LaptopImg from '../../assets/products/electro/LAPTOPS/pc-portable-gamer-asus-rog-zephyrus-g16-2024-gu605mv-ultra-9-185h-rtx-4060-8g-32-go-ddr5-1-to-ssd-windows-11-blanc.jpg'
import SmartphoneImg from '../../assets/products/electro/SMARTPHONES/smartphone-samsung-galaxy-s25-plus-5g-12-go-256-go-bleu-gold-vip-card-offert__1_-removebg-preview.png'
import SpeakerImg from '../../assets/products/electro/HAUT_PARLEURS/enceinte-de-soiree-portable-bluetooth-jbl-partybox-710-800w-removebg-preview.png'
import AccessoriesImg from '../../assets/products/electro/ACCESSOIRES/souris-sans-fil-logitech-lift-ergonomique-verticale-graphite (2).jpg'

// Animation variants
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
}

const cardVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  },
  hover: {
    y: -15,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
}

const imageVariants = {
  hover: {
    scale: 1.08,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  }
}

const textVariants = {
  hover: {
    x: 5,
    transition: {
      duration: 0.3
    }
  }
}

const categories = [
  {
    id: 1,
    title: "Casques & Écouteurs",
    subtitle: "Immersion sonore",
    description: "Qualité studio",
    image: HeadphonesImg,
    bgColor: 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900',
    overlay: 'bg-gradient-to-r from-black/50 to-transparent',
    buttonBg: 'bg-primary',
    buttonText: 'text-white',
    width: 'w-full lg:w-[calc(50%-16px)]',
    imagePosition: 'bottom-0 right-0',
    categorySlug: 'casques_ecouteurs'
  },
  {
    id: 2,
    title: "Smartwatches",
    subtitle: "Élégance connectée",
    description: "Votre santé au poignet",
    image: SmartwatchImg,
    bgColor: 'bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300',
    overlay: 'bg-gradient-to-r from-gray-900/30 to-transparent',
    buttonBg: 'bg-gray-900',
    buttonText: 'text-white',
    width: 'w-full lg:w-[calc(25%-16px)]',
    imagePosition: 'bottom-0 right-0',
    categorySlug: 'smartwatchs'
  },
  {
    id: 3,
    title: "PC Portables",
    subtitle: "Performance extrême",
    description: "Puissance créative",
    image: LaptopImg,
    bgColor: 'bg-gradient-to-br from-purple-900/80 via-purple-700/50 to-indigo-900/80',
    overlay: 'bg-gradient-to-r from-purple-900/40 to-transparent',
    buttonBg: 'bg-white',
    buttonText: 'text-purple-900',
    width: 'w-full lg:w-[calc(25%-16px)]',
    imagePosition: 'bottom-0 right-0',
    categorySlug: 'laptops'
  },
  {
    id: 4,
    title: "Smartphones",
    subtitle: "Innovation mobile",
    description: "Connectivité ultime",
    image: SmartphoneImg,
    bgColor: 'bg-gradient-to-br from-blue-900 via-blue-600 to-sky-500',
    overlay: 'bg-gradient-to-r from-blue-900/40 to-transparent',
    buttonBg: 'bg-white',
    buttonText: 'text-blue-600',
    width: 'w-full lg:w-[calc(25%-16px)]',
    imagePosition: 'bottom-0 right-0',
    categorySlug: 'smartphones'
  },
  {
    id: 5,
    title: "Haut-parleurs",
    subtitle: "Expérience immersive",
    description: "Son enveloppant",
    image: SpeakerImg,
    bgColor: 'bg-gradient-to-br from-pink-600 via-purple-500 to-blue-500',
    overlay: 'bg-gradient-to-r from-purple-900/40 to-transparent',
    buttonBg: 'bg-white',
    buttonText: 'text-pink-600',
    width: 'w-full lg:w-[calc(25%-16px)]',
    imagePosition: 'bottom-0 right-0',
    categorySlug: 'haut_parleurs'
  },
  {
    id: 6,
    title: "Accessoires",
    subtitle: "Complétez votre setup",
    description: "Essentiels high-tech",
    image: AccessoriesImg,
    bgColor: 'bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800',
    overlay: 'bg-gradient-to-r from-black/50 to-transparent',
    buttonBg: 'bg-primary',
    buttonText: 'text-white',
    width: 'w-full lg:w-[calc(50%-16px)]',
    imagePosition: 'bottom-0 right-0',
    categorySlug: 'accessoires'
  }
]

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();

  const handleBrowseClick = (e) => {
    e.preventDefault();
    navigate(`/boutique?category=${category.categorySlug}`, { 
      state: { fromCategory: true } 
    });
  };
  

  return (
    <motion.div
      data-aos="fade-up"
      data-aos-delay={category.id * 100}
      data-aos-duration="800"
      className={`${category.width} p-8 ${category.bgColor} text-white rounded-3xl relative h-[340px] flex items-end overflow-hidden group isolate`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      {/* Background shine effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full lg:w-1/2">
        <div className='mb-6'>
          <motion.p 
            className='mb-2 text-sm font-medium text-white/80 group-hover:text-white transition-colors'
            variants={textVariants}
          >
            {category.description}
          </motion.p>
          <motion.h3 
            className='text-2xl font-bold mb-2 text-white'
            variants={textVariants}
          >
            {category.subtitle}
          </motion.h3>
          <motion.h2 
            className='text-4xl xl:text-5xl font-extrabold mb-6 text-white/90 group-hover:text-white transition-colors'
            variants={textVariants}
          >
            {category.title}
          </motion.h2>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
         <Button
            text="Explorer"
            bgColor={category.buttonBg}
            textColor={category.buttonText}
            onClick={handleBrowseClick}  // ✅ Changé de 'handler' à 'onClick'
            className="shadow-lg group-hover:shadow-xl transition-shadow"
          />
          </motion.div>
        </div>
      </div>

      {/* Image */}
      <motion.div 
        className={`absolute ${category.imagePosition} w-full lg:w-1/2 h-full flex items-end justify-center`}
        variants={imageVariants}
      >
        <img
          src={category.image}
          alt={category.title}
          className="h-[75%] object-contain transition-all duration-500 group-hover:scale-105"
          style={{
            filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.3))'
          }}
        />
      </motion.div>

      {/* Overlay */}
      <div className={`absolute inset-0 ${category.overlay} z-0`} />

      {/* Hover effect */}
      <motion.div
        className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />
    </motion.div>
  )
}

const Category = () => {
    React.useEffect(() => {
    AOS.init({
      duration: 800,
      once: true
    });
  }, []);
  return (
    <section className='py-16 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950'>
      <div className='container mx-auto px-4'>
        <motion.div 
          className='text-center mb-16'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className='text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4'>
            Explorez nos univers
          </h2>
          <p className='text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto'>
            Découvrez des produits exceptionnels dans chaque catégorie
          </p>
        </motion.div>
        
        <motion.div 
          className='flex flex-wrap gap-6 mb-6'
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {categories.slice(0, 3).map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </motion.div>
        <motion.div 
          className='flex flex-wrap gap-6'
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {categories.slice(3, 6).map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Category