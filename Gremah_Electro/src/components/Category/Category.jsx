import React from 'react'
import { motion } from 'framer-motion'
import Button from '../Shared/Button';
// Import images
import Image1 from '../../assets/category/earphone.png';
import Image2 from '../../assets/category/watch.png';
import Image3 from '../../assets/category/macbook.png';
import Image4 from '../../assets/category/vr.png';
import Image5 from '../../assets/category/speaker.png';
import Image6 from '../../assets/category/gaming.png';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
}

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: {
    y: -10,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
}

const imageVariants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
}

const categories = [
  // First row - 3 items
  {
    id: 1,
    title: "écouteurs",
    subtitle: "des",
    description: "profitez",
    image: Image1,
    bgColor: 'bg-gradient-to-br from-black/70 to-gray-900',
    buttonBg: 'bg-primary',
    buttonText: 'text-white',
    // Adjusted width calculations to account for gap (gap-8 = 2rem = 32px)
    width: 'w-full lg:w-[calc(50%-16px)]', // 1/2 width minus half of gap
    imagePosition: 'bottom-0'
  },
  {
    id: 2,
    title: "Montres",
    subtitle: "des",
    description: "profitez",
    image: Image2,
    bgColor: 'bg-gradient-to-br from-brandYellow to-brandYellow/90',
    buttonBg: 'bg-white',
    buttonText: 'text-brandYellow',
    width: 'w-full lg:w-[calc(25%-16px)]', // 1/4 width minus half of gap
    imagePosition: '-right-4 lg:top-[40px]'
  },
  {
    id: 3,
    title: "PC",
    subtitle: "des",
    description: "profitez",
    image: Image3,
    bgColor: 'bg-gradient-to-br from-primary to-primary/90',
    buttonBg: 'bg-white',
    buttonText: 'text-primary',
    width: 'w-full lg:w-[calc(25%-16px)]', // 1/4 width minus half of gap
    imagePosition: 'top-1/2 -translate-y-1/2 -right-0'
  },
  // Second row - 3 items
  {
    id: 4,
    title: "VR",
    subtitle: "des",
    description: "profitez",
    image: Image4,
    bgColor: 'bg-gradient-to-br from-brandBlue to-brandBlue/90',
    buttonBg: 'bg-white',
    buttonText: 'text-brandBlue',
    width: 'w-full lg:w-[calc(25%-16px)]',
    imagePosition: 'bottom-0 right-0'
  },
  {
    id: 5,
    title: "Haut-parleurs",
    subtitle: "des",
    description: "profitez",
    image: Image5,
    bgColor: 'bg-gradient-to-br from-brandGreen to-brandGreen/90',
    buttonBg: 'bg-white',
    buttonText: 'text-brandGreen',
    width: 'w-full lg:w-[calc(25%-16px)]',
    imagePosition: 'bottom-0 right-0'
  },
  {
    id: 6,
    title: "Gaming",
    subtitle: "des",
    description: "profitez",
    image: Image6,
    bgColor: 'bg-gradient-to-br from-brandGray to-White/90',
    buttonBg: 'bg-white',
    buttonText: 'text-brandGray',
    width: 'w-full lg:w-[calc(50%-16px)]',
    imagePosition: 'bottom-0 right-0'
  }
];

const CategoryCard = ({ category }) => {
  return (
    <motion.div
      className={`${category.width} py-10 pl-5 ${category.bgColor} text-white rounded-3xl relative h-[320px] flex items-end overflow-hidden`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <div className="relative z-10">
        <div className='mb-4'>
          <motion.p 
            className='mb-[2px] text-gray-400'
            whileHover={{ x: 5 }}
          >
            {category.description}
          </motion.p>
          <motion.p 
            className='text-2xl font-semibold mb-[2px]'
            whileHover={{ x: 5 }}
          >
            {category.subtitle}
          </motion.p>
          <motion.p 
            className='text-4xl xl:text-5xl font-bold opacity-40 mb-2'
            whileHover={{ x: 5 }}
          >
            {category.title}
          </motion.p>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button 
              text="Parcourir" 
              bgColor={category.buttonBg} 
              textColor={category.buttonText}      
            />
          </motion.div>
        </div>
      </div>
      <motion.img 
        src={category.image} 
        alt={category.title} 
        className={`w-[250px] lg:w-[320px] absolute ${category.imagePosition}`}
        style={{
          maxHeight: '80%',
          objectFit: 'contain'
        }}
        variants={imageVariants}
      />
      {/* Effet de lumière au survol */}
      <motion.div 
        className="absolute inset-0 bg-white/5 opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

const Category = () => {
  return (
    <div className='py-8'>
      <div className='container mx-auto px-4 py-12'>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Première ligne */}
          <motion.div className='flex flex-wrap gap-6 mb-8'>
            {categories.slice(0, 3).map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </motion.div>
          
          {/* Deuxième ligne */}
          <motion.div className='flex flex-wrap gap-6'>
            {categories.slice(3, 6).map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Category;