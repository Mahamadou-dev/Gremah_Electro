// src/components/Products/ProductCard.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '../Shared/Button';
import { FiStar, FiShoppingCart, FiInfo, FiChevronRight } from 'react-icons/fi';
import { useCart } from '../../hooks/useCart';
import { getProductImage } from '../../utils/FixImagePath';


const FALLBACK_IMAGE = '/fallback-product-image.jpg';

const ProductCard = ({ product, showAddToCart = false }) => {
  const { addToCart } = useCart();
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  const formatPrice = (price) => {
    if (typeof price !== 'number') {
      return 'N/A';
    }
    return price.toLocaleString('fr-FR', {
      style: 'currency',
      currency: 'XOF'
    });
  };

  if (!product) {
    console.error('ProductCard: Product data is missing or invalid.', product);
    return null;
  }

  const handleViewDetails = () => {
    if (!product?.slug) {
      console.error('Product slug is missing!', product);
      return;
    }
    navigate(`/produit/${encodeURIComponent(product.slug)}`);
  };

  const renderFeatures = () => {
    if (!product.features || product.features.length === 0) return null;
    return (
      <div className="mb-3">
        <h4 className="font-semibold text-gray-700 dark:text-gray-300 text-sm mb-1">Caractéristiques Clés:</h4>
        <ul className="list-disc list-inside text-xs text-gray-600 dark:text-gray-400 space-y-0.5">
          {product.features.slice(0, 3).map((feature, i) => (
            <li key={i} className="flex items-center">
              <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0"></span>
              <span>{feature}</span>
            </li>
          ))}
          {product.features.length > 3 && (
            <li className="text-gray-500 dark:text-gray-500 italic">...plus</li>
          )}
        </ul>
      </div>
    );
  };

  const renderSpecs = () => {
    if (!product.specifications || Object.keys(product.specifications).length === 0) return null;
    return (
      <div className="mb-3">
        <h4 className="font-semibold text-gray-700 dark:text-gray-300 text-sm mb-1">Spécifications:</h4>
        <div className="text-xs text-gray-600 dark:text-gray-400 grid grid-cols-2 gap-x-2 gap-y-0.5">
          {Object.entries(product.specifications).slice(0, 4).map(([key, value]) => (
            <div key={key} className="flex flex-col">
              <span className="font-medium text-gray-500 dark:text-gray-400 capitalize">{key}:</span>
              <span className="truncate">{value}</span>
            </div>
          ))}
          {Object.keys(product.specifications).length > 4 && (
            <div className="col-span-2 text-gray-500 dark:text-gray-500 italic">...plus</div>
          )}
        </div>
      </div>
    );
  };

  const discountPercentage = product.originalPrice && product.originalPrice > product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const imageSrc = getProductImage(product);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -7, boxShadow: '0 15px 30px rgba(0,0,0,0.1)' }}
      className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-2xl dark:shadow-gray-900/40 rounded-2xl overflow-hidden cursor-pointer relative group h-full flex flex-col transform transition-all duration-300"
      onClick={handleViewDetails}
    >
      {/* Image Section */}
      <div className="relative h-48 w-full overflow-hidden flex-shrink-0">
        <img
             src={imageSrc}
             alt={product.title || 'Product image'}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-115"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = FALLBACK_IMAGE;
            }}
        />

        {discountPercentage > 0 && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md z-10">
            -{discountPercentage}%
          </div>
        )}

        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              setShowDetails(!showDetails);
            }}
            className="bg-white text-primary-dark p-3 rounded-full shadow-lg mx-2 hover:bg-gray-100 transition-colors tooltip"
            data-tooltip-content="Voir Détails Rapides"
            aria-label="Toggle quick details"
          >
            <FiInfo size={20} />
          </motion.button>
          {showAddToCart && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
              className="bg-primary text-white p-3 rounded-full shadow-lg mx-2 hover:bg-primary-dark transition-colors tooltip"
              data-tooltip-content="Ajouter au Panier"
              aria-label="Ajouter au panier"
            >
              <FiShoppingCart size={20} />
            </motion.button>
          )}
        </div>
      </div>

      {/* Product Info Section */}
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <h3
            className="font-bold text-xl text-gray-800 dark:text-white mb-1 leading-tight line-clamp-2"
            title={product.title}
          >
            {product.title}
          </h3>

          {product.category && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 capitalize">{product.category}</p>
          )}

          {product.rating !== undefined && product.rating !== null && (
            <div className="flex items-center mb-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={`text-base ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300 dark:text-gray-600'}`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">({product.rating.toFixed(1)})</span>
            </div>
          )}
        </div>

        <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <div>
            <p className="font-extrabold text-primary text-2xl leading-none">
              {formatPrice(product.price)}
            </p>
            {discountPercentage > 0 && (
              <p className="text-sm text-gray-400 line-through mt-0.5">
                {formatPrice(product.originalPrice)}
              </p>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-0 left-0 w-full bg-white dark:bg-gray-800 p-4 rounded-b-2xl shadow-xl z-20"
          >
            <div className="space-y-3">
              {product.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                  {product.description}
                </p>
              )}

              {renderFeatures()}
              {renderSpecs()}

              <Button
                text="Voir la page du produit"
                bgColor="bg-transparent"
                textColor="text-primary"
                border="border border-primary-dark"
                className="w-full py-2 text-sm hover:bg-primary-dark hover:text-white transition-colors group"
                icon={<FiChevronRight className="ml-1 group-hover:translate-x-1 transition-transform" />}
                onClick={handleViewDetails}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    slug: PropTypes.string,
    img: PropTypes.string,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    originalPrice: PropTypes.number,
    category: PropTypes.string,
    rating: PropTypes.number,
    description: PropTypes.string,
    features: PropTypes.arrayOf(PropTypes.string),
    specifications: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
  showAddToCart: PropTypes.bool,
};

export default ProductCard;