import React from 'react';
import { motion } from 'framer-motion';
import Heading from '../Shared/Heading';
import ProductCard from './ProductCard';
import { 
  casquesEcouteurs,
  accessoires,
  laptops,
  smartphones,
  hautParleurs,
  smartwatchs
} from '../../data/products/products';
import Button from '../Shared/Button';

const Products = () => {
  // Combiner tous les produits
  const allProducts = [
    casquesEcouteurs[2],
    accessoires[1],
    laptops[3], 
    smartphones[1],
    hautParleurs[0],
    smartwatchs[2],
    laptops[3],
    smartphones[3],
  ];

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='bg-gray-50 dark:bg-gray-900 py-12'
    >
      <div className="container mx-auto px-4">
        {/* Heading section with animation */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <Heading 
            title="Nos Produits Électroniques" 
            subtitle="Découvrez notre sélection high-tech exclusive" 
            center
          />
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explorez notre collection de produits électroniques dernier cri à des prix compétitifs.
          </p>
        </motion.div>
        
        {/* Products grid with staggered animation */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {allProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                delay: index * 0.1,
                duration: 0.5,
                type: "spring",
                stiffness: 100
              }}
            >
              <ProductCard 
                product={{
                  id: product.id,
                  slug: product.slug, // Assurez-vous que slug est disponible
                  img: product.images[0], // Prend la première image
                  title: product.title,
                  price: product.price,
                  originalPrice: product.originalPrice,
                  category: product.category,
                  rating: product.rating,
                  description: product.description,
                  features: product.features,
                  specifications: product.specifications
                }} 
                showAddToCart={true}
              />
            </motion.div>
          ))}
        </motion.div>
                <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <Button
            text="Voir tous les produits"
            bgColor="primary"
            textColor="white"
            ariaLabel="Voir tous les produits"
            onClick={() => window.location.href = '/boutique'}
            className="mt-8 px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300"
          />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Products;