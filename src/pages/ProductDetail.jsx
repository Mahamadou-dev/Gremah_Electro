// src/pages/ProductDetail.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FiShoppingCart,
  FiHeart,
  FiShare2,
  FiStar,
  FiChevronDown,
  FiPlus,
  FiMinus,
  FiXCircle,
  FiCopy
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/Shared/Button';
import { useCart } from '../hooks/useCart';
import ProductCard from '../components/Products/ProductCard';
import { allProductCategories, getProductBySlug } from '../data/products/products';
import confetti from 'canvas-confetti';

const FALLBACK_PRODUCT_IMAGE = '/fallback-product-image.jpg';

const formatPrice = (price) => {
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

const ProductDetail = () => {
  const { addToCart } = useCart();
  const { slug } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [expandedFeature, setExpandedFeature] = useState(null);
  const [expandedSpecification, setExpandedSpecification] = useState(null);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const detailSectionRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    const foundProduct = getProductBySlug(slug);

    if (foundProduct) {
      const productImages = foundProduct.images && foundProduct.images.length > 0
        ? foundProduct.images
        : [foundProduct.img || FALLBACK_PRODUCT_IMAGE];

      setProduct({
        ...foundProduct,
        images: productImages,
      });
      setSelectedImageIndex(0);
      setQuantity(1);
      setSelectedColor(foundProduct.colors && foundProduct.colors.length > 0 ? foundProduct.colors[0] : null);
    } else {
      setProduct(null);
    }
    setLoading(false);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  const handleQuantityChange = (value) => {
    setQuantity(prev => Math.max(1, Math.min(10, prev + value)));
  };

  const handleAddToCart = () => {
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      alert('Veuillez sélectionner une couleur avant d\'ajouter au panier.');
      return;
    }
    addToCart({ ...product, quantity, selectedColor });
    // Confetti effect
    if (typeof window !== 'undefined') {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF']
      });
    }
    
    alert(`${quantity}x ${product.title} (${selectedColor || 'standard'}) ajouté au panier ! 🎉`);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: product.description,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      
      // Animation for copy feedback
      const copyBtn = document.querySelector('.copy-btn');
      if (copyBtn) {
        copyBtn.classList.add('animate-ping');
        setTimeout(() => copyBtn.classList.remove('animate-ping'), 500);
      }
      
      alert('Lien du produit copié dans le presse-papiers ! 🔗');
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    
    // Heart animation
    if (!isFavorite) {
      const heart = document.querySelector('.heart-animation');
      if (heart) {
        heart.classList.add('animate-heartbeat');
        setTimeout(() => heart.classList.remove('animate-heartbeat'), 1000);
      }
    }
  };

  const relatedProducts = product 
    ? Object.values(allProductCategories)
        .flat()
        .filter(p => p.slug !== product.slug && p.category === product.category)
        .sort(() => 0.5 - Math.random())
        .slice(0, 4)
    : [];

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-full w-1/3 mb-6"></div>
          <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-full w-1/2 mb-4"></div>
          <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-full w-1/4"></div>
        </div>
        <p className="mt-12 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary font-bold text-lg animate-pulse">
          Chargement du produit...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-24 text-center flex flex-col items-center justify-center min-h-[70vh]"
      >
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1.1, 1]
          }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <FiXCircle className="mx-auto text-red-500 text-6xl mb-6" />
        </motion.div>
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 mb-4">
          Produit non trouvé
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-lg mx-auto leading-relaxed">
          Oups ! 😔 Le produit que vous recherchez semble s'être égaré.
          Il est possible qu'il ait été retiré ou que l'URL soit incorrecte.
        </p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-10"
        >
          <Button
            text="Retourner à la boutique"
            onClick={() => navigate('/boutique')}
            bgColor="bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark"
            textColor="text-white"
            className="px-10 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          />
        </motion.div>
      </motion.div>
    );
  }
  console.log("Related Products:", relatedProducts);


  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 min-h-screen py-12 lg:py-16 pt-96" // Augmenté pt-24 à pt-32 pour plus d'espace avec la navbar
    >
      <div className="container mx-auto px-4 max-w-7xl pt-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Image Gallery - Futuristic 3D Effect */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
            className="w-full lg:w-1/2 flex flex-col items-center"
          >
            <div className="relative w-full aspect-square max-h-[550px] overflow-hidden rounded-3xl shadow-[0_25px_50px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_25px_50px_-15px_rgba(0,0,0,0.5)] border-4 border-white/30 dark:border-gray-700/50 backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 flex items-center justify-center p-4 backdrop-filter">
              <AnimatePresence mode="wait">
                <motion.img
                  key={product.images[selectedImageIndex] || FALLBACK_PRODUCT_IMAGE}
                  src={product.images[selectedImageIndex] || FALLBACK_PRODUCT_IMAGE}
                  alt={product.title}
                  initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    rotate: 0,
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                  }}
                  exit={{ opacity: 0, scale: 0.9, rotate: 2 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="w-full h-full object-contain cursor-zoom-in transform hover:scale-105 transition-transform duration-300 hover:rotate-1 hover:shadow-2xl"
                  onClick={() => setIsImageZoomed(true)}
                  style={{ willChange: 'transform, opacity' }}
                />
              </AnimatePresence>
              
              {/* Floating badges */}
              {product.originalPrice && product.originalPrice > product.price && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="absolute top-4 left-4 bg-gradient-to-br from-red-500 to-orange-500 text-white font-bold px-4 py-2 rounded-full shadow-lg z-10"
                >
                  -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                </motion.div>
              )}
              
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 }}
                className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full p-2 shadow-lg z-10 cursor-pointer"
                onClick={toggleFavorite}
              >
                <FiHeart 
                  className={`text-2xl ${isFavorite ? 'fill-red-500 text-red-500 heart-animation' : 'text-gray-600 dark:text-gray-400'}`}
                />
              </motion.div>
            </div>

            {/* Image Thumbnails - Hover Effect */}
            <div className="flex gap-4 overflow-x-auto p-3 scrollbar-hide mt-6 w-full justify-center">
              {product.images.map((img, index) => (
                <motion.button
                  key={index}
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 w-28 h-28 rounded-xl overflow-hidden border-3 transition-all duration-300 ease-in-out
                    ${selectedImageIndex === index ? 
                      'border-primary shadow-lg scale-[1.03] ring-2 ring-offset-2 ring-primary/50' : 
                      'border-gray-200/50 dark:border-gray-600/50 hover:border-primary/30'}
                    bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm`}
                >
                  <img
                    src={img}
                    alt={`Vue ${index + 1}`}
                    className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Product Details & Actions - Glass Morphism */}
          <div ref={detailSectionRef} className="w-full lg:w-1/2 relative">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
              className="bg-white/70 dark:bg-gray-800/70 p-6 md:p-8 rounded-3xl shadow-2xl dark:shadow-gray-950/70 border-4 border-white/30 dark:border-gray-700/30 backdrop-blur-sm lg:sticky lg:top-32" // Changé top-28 à top-32 pour plus d'espace
            >
              <div className="flex justify-between items-start mb-4">
                <motion.h1 
                  className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight pr-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {product.title}
                </motion.h1>
                
                {product.originalPrice && product.originalPrice > product.price && (
                  <motion.span 
                    className="text-sm bg-gradient-to-br from-red-500 to-orange-500 text-white font-bold px-3 py-1.5 rounded-full whitespace-nowrap shadow-lg"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </motion.span>
                )}
              </div>

              <motion.div 
                className="flex items-center mb-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    >
                      <FiStar
                        className={`text-xl ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300 dark:text-gray-600'} transition-colors`}
                      />
                    </motion.div>
                  ))}
                </div>
                <span className="text-base text-gray-600 dark:text-gray-400 ml-2 font-medium">({product.rating.toFixed(1)})</span>
                <span className="text-base text-gray-500 dark:text-gray-500 ml-4 border-l border-gray-200/50 dark:border-gray-700/50 pl-4">({Math.floor(Math.random() * 200) + 50} avis)</span>
              </motion.div>

              <motion.div 
                className="mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-xl text-gray-400 line-through mr-3 animate-fade-in">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary animate-scale-in">
                  {formatPrice(product.price)}
                </span>
              </motion.div>

              <motion.p 
                className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed text-base"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                {product.description}
              </motion.p>

              {/* Color Selection - Interactive */}
              {product.colors && product.colors.length > 0 && (
                <motion.div 
                  className="mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Couleurs disponibles :</h3>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map(color => (
                      <motion.button
                        key={color}
                        whileHover={{ 
                          scale: 1.05, 
                          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                          y: -2
                        }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedColor(color)}
                        className={`px-5 py-2.5 rounded-full border-2 transition-all duration-200 text-sm font-medium
                          ${selectedColor === color ? 
                            'border-primary bg-primary/15 text-primary-dark dark:bg-primary/25 dark:text-primary shadow-md ring-2 ring-offset-2 ring-primary/30' : 
                            'border-gray-300/50 dark:border-gray-600/50 hover:border-primary-light hover:bg-gray-50/50 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300'}
                          transform active:scale-98 backdrop-blur-sm`}
                      >
                        {color}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Quantity Selector - 3D Effect */}
              <motion.div 
                className="mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Quantité :</h3>
                <div className="flex items-center w-40 bg-gray-100/50 dark:bg-gray-700/50 rounded-lg overflow-hidden border border-gray-200/50 dark:border-gray-600/50 backdrop-blur-sm">
                  <motion.button
                    whileTap={{ scale: 0.9, rotate: -10 }}
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="w-12 h-12 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-200/50 dark:hover:bg-gray-600/50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-xl"
                  >
                    <FiMinus />
                  </motion.button>
                  <div className="flex-grow h-12 flex items-center justify-center text-xl font-bold text-gray-800 dark:text-white bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                    {quantity}
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.9, rotate: 10 }}
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= 10}
                    className="w-12 h-12 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-200/50 dark:hover:bg-gray-600/50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-xl"
                  >
                    <FiPlus />
                  </motion.button>
                </div>
              </motion.div>

              {/* Action Buttons - Floating Effect */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
              >
                <motion.div
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1"
                >
                  <Button
                    text="Ajouter au panier"
                    bgColor="bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark"
                    textColor="text-white"
                    icon={<FiShoppingCart className="mr-2 text-xl" />}
                    className="w-full py-3.5 rounded-lg text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform"
                    onClick={handleAddToCart}
                    disabled={product.colors && product.colors.length > 0 && !selectedColor}
                  />
                </motion.div>
                
                <motion.div
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1"
                >
                  <Button
                    text={isFavorite ? "Favori" : "Ajouter aux favoris"}
                    bgColor="bg-white/70 hover:bg-white/90 dark:bg-gray-700/70 dark:hover:bg-gray-700/90"
                    textColor="text-gray-800 dark:text-white"
                    icon={<FiHeart className={`mr-2 text-xl ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />}
                    className="w-full py-3.5 rounded-lg text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200/50 dark:border-gray-600/50 backdrop-blur-sm"
                    onClick={toggleFavorite}
                  />
                </motion.div>
              </motion.div>

              {/* Share - Floating Icons */}
              <motion.div 
                className="flex items-center gap-3 text-gray-500 dark:text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
              >
                <span className="font-medium text-lg">Partager ce produit :</span>
                <motion.button
                  whileHover={{ 
                    scale: 1.2, 
                    rotate: [0, 10, -10, 0],
                    y: -5
                  }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleShare}
                  className="p-2 text-2xl text-primary-light dark:text-primary-dark hover:text-primary transition-all duration-200 copy-btn"
                  aria-label="Partager le produit"
                >
                  <FiShare2 />
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Features and Specifications - Now in a horizontal grid layout */}
        {(product.features?.length > 0 || product.specifications) && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12" // Utilisation d'une grille pour l'alignement horizontal
          >
            {/* Features Accordion - Neon Effect */}
            {product.features && product.features.length > 0 && (
              <motion.div
                className="bg-white/70 dark:bg-gray-800/70 p-6 md:p-8 rounded-3xl shadow-2xl dark:shadow-gray-950/60 border-4 border-white/30 dark:border-gray-700/30 backdrop-blur-sm"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-5 border-b pb-3 border-gray-100/50 dark:border-gray-700/50">Caractéristiques Détaillées</h3>
                <ul className="space-y-4">
                  {product.features.map((feature, index) => (
                    <li key={index} className="overflow-hidden border-b border-gray-100/50 dark:border-gray-700/50 pb-4 last:border-0 last:pb-0">
                      <motion.div
                        className="cursor-pointer hover:bg-white/30 dark:hover:bg-gray-700/30 rounded-lg p-3 transition-all duration-300"
                        onClick={() => setExpandedFeature(expandedFeature === index ? null : index)}
                        whileHover={{ 
                          backgroundColor: expandedFeature !== index 
                            ? (window.matchMedia('(prefers-color-scheme: dark)').matches 
                                ? 'rgba(44, 50, 63, 0.3)' 
                                : 'rgba(240, 243, 245, 0.3)'
                              ) 
                            : undefined, // ← important : ajout d'un `: undefined`
                          x: 5
                        }}

                        transition={{ duration: 0.2 }}
                        aria-expanded={expandedFeature === index}
                        aria-controls={`feature-panel-${index}`}
                      >
                        <div className="flex items-center justify-between py-2">
                          <div className="flex items-center">
                            <motion.span 
                              className="text-primary text-2xl leading-none mr-3"
                              animate={{ rotate: expandedFeature === index ? 0 : -45 }}
                              transition={{ duration: 0.3 }}
                            >
                              ✨
                            </motion.span>
                            <span className="font-medium text-lg text-gray-800 dark:text-white">{feature.title}</span>
                          </div>
                          <motion.div
                            animate={{ rotate: expandedFeature === index ? 180 : 0 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                          >
                            <FiChevronDown className="text-gray-400 text-xl" />
                          </motion.div>
                        </div>
                      </motion.div>
                      <AnimatePresence>
                        {expandedFeature === index && (
                          <motion.div
                            id={`feature-panel-${index}`}
                            initial={{ height: 0, opacity: 0, paddingTop: 0, paddingBottom: 0 }}
                            animate={{ height: 'auto', opacity: 1, paddingTop: 12, paddingBottom: 12 }}
                            exit={{ height: 0, opacity: 0, paddingTop: 0, paddingBottom: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="pl-8 text-gray-600 dark:text-gray-400 text-base"
                          >
                            {feature.description}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Specifications Accordion - Holographic Effect */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <motion.div
                className="bg-white/70 dark:bg-gray-800/70 p-6 md:p-8 rounded-3xl shadow-2xl dark:shadow-gray-950/60 border-4 border-white/30 dark:border-gray-700/30 backdrop-blur-sm"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-5 border-b pb-3 border-gray-100/50 dark:border-gray-700/50">Spécifications Techniques</h3>
                <ul className="space-y-4">
                  {Object.entries(product.specifications).map(([key, value], index) => (
                    <li key={key} className="overflow-hidden border-b border-gray-100/50 dark:border-gray-700/50 pb-4 last:border-0 last:pb-0">
                      <motion.div
                        className="cursor-pointer hover:bg-white/30 dark:hover:bg-gray-700/30 rounded-lg p-3 transition-all duration-300"
                        onClick={() => setExpandedSpecification(expandedSpecification === index ? null : index)}
          whileHover={{
  backgroundColor: expandedSpecification !== index ?
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'rgba(44, 50, 63, 0.3)' : 'rgba(240, 243, 245, 0.3)')
    : '', // <-- The missing comma was here, and I added a default value for clarity
  x: 5
}}
                        transition={{ duration: 0.2 }}
                        aria-expanded={expandedSpecification === index}
                        aria-controls={`spec-panel-${index}`}
                      >
                        <div className="flex items-center justify-between py-2">
                          <div className="flex items-center">
                            <motion.span 
                              className="text-primary text-2xl leading-none mr-3"
                              animate={{ rotate: expandedSpecification === index ? 0 : -90 }}
                              transition={{ duration: 0.3 }}
                            >
                              ⚙️
                            </motion.span>
                            <span className="font-medium text-lg text-gray-800 dark:text-white capitalize">{key}:</span>
                            <span className="ml-2 text-gray-600 dark:text-gray-400">{value}</span>
                          </div>
                          <motion.div
                            animate={{ rotate: expandedSpecification === index ? 180 : 0 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                          >
                            <FiChevronDown className="text-gray-400 text-xl" />
                          </motion.div>
                        </div>
                      </motion.div>
                      <AnimatePresence>
                        {expandedSpecification === index && (
                          <motion.div
                            id={`spec-panel-${index}`}
                            initial={{ height: 0, opacity: 0, paddingTop: 0, paddingBottom: 0 }}
                            animate={{ height: 'auto', opacity: 1, paddingTop: 12, paddingBottom: 12 }}
                            exit={{ height: 0, opacity: 0, paddingTop: 0, paddingBottom: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="pl-8 text-gray-600 dark:text-gray-400 text-base"
                          >
                            <p>{value}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Related Products - Floating Cards */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
            className="mt-16 bg-white/70 dark:bg-gray-800/70 p-6 md:p-8 rounded-3xl shadow-2xl dark:shadow-gray-950/60 border-4 border-white/30 dark:border-gray-700/30 backdrop-blur-sm"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-8 text-center">
              Plus de produits comme celui-ci 😍❤
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {relatedProducts.map((p, index) => (
                <motion.div
                  key={p.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <ProductCard 
                    product={p} 
                    showAddToCart={true} 
                    className="hover:shadow-xl transition-all duration-300"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Image Zoom Modal - Floating Glass */}
      <AnimatePresence>
        {isImageZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4 backdrop-blur-lg"
            onClick={() => setIsImageZoomed(false)}
          >
            <motion.img
              src={product.images[selectedImageIndex] || FALLBACK_PRODUCT_IMAGE}
              alt={product.title}
              initial={{ scale: 0.7, rotate: -5 }}
              animate={{ 
                scale: 1, 
                rotate: 0,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
              }}
              exit={{ scale: 0.7, rotate: 5 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="max-w-full max-h-full object-contain cursor-zoom-out rounded-xl bg-white/10 backdrop-blur-sm border border-white/20"
              onClick={(e) => e.stopPropagation()}
            />
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-6 right-6 text-white text-5xl p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 transform"
              onClick={() => setIsImageZoomed(false)}
              aria-label="Fermer le zoom de l'image"
            >
              <FiXCircle />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProductDetail;