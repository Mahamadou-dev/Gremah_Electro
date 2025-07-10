import React from 'react';
import Button from '../Shared/Button';

const ProductCard = ({ productsData }) => {
  return (
    <div className='mb-10'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 py-10'>
        {productsData.map((produit, index) => (
          <div
            data-aos="fade-up"
            data-aos-delay={index * 100}
            data-aos-duration="800"
            key={produit.id}
            className='group bg-white dark:bg-gray-800 shadow-md dark:shadow-black/30 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 w-full max-w-xs'
          >
            <div className='relative'>
              <img
                src={produit.img}
                alt={produit.title}
                className='h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105'
              />
              <div className='absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300'>
                <Button text="Ajouter au panier" bgColor="bg-primary" textColor="text-white" />
              </div>
            </div>
            <div className='p-4 text-center'>
              <h3 className='font-semibold text-lg text-gray-800 dark:text-white'>{produit.title}</h3>
              <p className='font-bold text-primary mt-2'>{produit.price.toLocaleString()} FCFA</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
