import React from 'react';
import Heading from '../Shared/Heading';

// Images
import Img1 from '../../assets/blogs/blog-1.jpg';
import Img2 from '../../assets/blogs/blog-2.jpg';
import Img3 from '../../assets/blogs/blog-3.jpg';
import Img4 from '../../assets/blogs/blog-3.jpg';

// Données des blogs
const BlogData = [
  {
    title: "🕒 Comment choisir la meilleure montre connectée",
    subtitle: "Découvrez les critères essentiels pour sélectionner la montre connectée qui vous convient le mieux.",
    date: "Publié le 15 août 2025",
    image: Img1
  },
  {
    title: "🎧 Les avantages des écouteurs sans fil",
    subtitle: "Explorez les bénéfices des écouteurs sans fil pour une expérience audio sans contraintes.",
    date: "Publié le 20 août 2025",
    image: Img2
  },
  {
    title: "🔋 Comment entretenir vos appareils électroniques",
    subtitle: "Des conseils pratiques pour prolonger la durée de vie de vos appareils électroniques.",
    date: "Publié le 30 août 2025",
    image: Img4
  },
];

const Blogs = () => {
  return (
    <section className='bg-gray-50 dark:bg-gray-900 py-12'>
      <div className='mx-auto px-4 max-w-7xl'>

        {/* Titre principal avec AOS */}
        <div
          data-aos="fade-right"
          data-aos-duration="800"
        >
          <Heading title="📰 Récentes nouvelles" subtitle="Explorez nos derniers articles de blog" />
        </div>

        {/* Grille des articles avec effet cascade */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10'>
          {BlogData.map((article, index) => (
            <div
              key={article.title}
              data-aos="fade-up"
              data-aos-delay={index * 150}
              data-aos-duration="900"
              className='bg-white dark:bg-gray-800 shadow-md dark:shadow-black/30 rounded-xl overflow-hidden hover:shadow-lg transition duration-300'
            >
              {/* Image */}
              <div className='overflow-hidden'>
                <img
                  src={article.image}
                  alt={article.title}
                  className='w-full h-48 object-cover transition-transform duration-500 hover:scale-105'
                />
              </div>

              {/* Contenu */}
              <div className='p-4 space-y-2'>
                <p className='text-sm text-gray-500 dark:text-gray-400'>{article.date}</p>
                <h3 className='font-semibold text-gray-800 dark:text-white text-lg line-clamp-2'>{article.title}</h3>
                <p className='text-gray-600 dark:text-gray-300 text-sm line-clamp-2'>{article.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Blogs;
