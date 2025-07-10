import React from 'react';
import Heading from '../Shared/Heading';
import ProductCard from './ProductCard';

// images import
import Img1 from '../../assets/product/p-1.jpg';
import Img2 from '../../assets/product/p-2.jpg';
import Img3 from '../../assets/product/p-3.jpg';
import Img4 from '../../assets/product/p-4.jpg';
import Img5 from '../../assets/product/p-5.jpg';
import Img6 from '../../assets/product/p-6.jpg';
import Img7 from '../../assets/product/p-7.jpg';

const productData = [
  { id: 1, img: Img1, title: "Casque Bluetooth", price: 4200 },
  { id: 2, img: Img2, title: "Montagne Rocheuse", price: 8000 },
  { id: 3, img: Img3, title: "Lunettes de Protection", price: 3200 },
  { id: 4, img: Img4, title: "T-shirt Imprimé", price: 4000 },
  { id: 5, img: Img5, title: "Écouteurs Sans Fil", price: 500 },
  { id: 6, img: Img6, title: "Montagnes", price: 600 },
  { id: 7, img: Img7, title: "Lunettes Soleil", price: 700 },
  { id: 8, img: Img7, title: "Lunettes Soleil", price: 700 },
];

const Products = () => {
  return (
    <section className='bg-gray-50 dark:bg-gray-900 py-12'>
      <div className="container mx-auto px-4">
        <div
          data-aos="fade-right"
          data-aos-duration="800"
        >
          <Heading title="Nos Produits" subtitle="Découvrez notre sélection exclusive" />
        </div>
        <ProductCard productsData={productData} />
      </div>
    </section>
  );
};

export default Products;
