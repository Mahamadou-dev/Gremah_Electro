import React from 'react';
import { useNavigate } from 'react-router-dom';
import Heading from '../Shared/Heading';
import Button from '../Shared/Button';

// Images
import Img1 from '../../assets/blogs/blog-1.jpg';
import Img2 from '../../assets/blogs/blog-2.jpg';
import Img3 from '../../assets/blogs/blog-3.jpg';

const BlogData = [
  {
    title: "🕒 Comment choisir la meilleure montre connectée",
    subtitle: "Découvrez les critères essentiels pour sélectionner la montre connectée qui vous convient le mieux.",
    date: "Publié le 15 août 2025",
    image: Img1,
    readTime: "5 min de lecture"
  },
  {
    title: "🎧 Les avantages des écouteurs sans fil",
    subtitle: "Explorez les bénéfices des écouteurs sans fil pour une expérience audio sans contraintes.",
    date: "Publié le 20 août 2025",
    image: Img2,
    readTime: "4 min de lecture"
  },
  {
    title: "🔋 Comment entretenir vos appareils électroniques",
    subtitle: "Des conseils pratiques pour prolonger la durée de vie de vos appareils électroniques.",
    date: "Publié le 30 août 2025",
    image: Img3,
    readTime: "7 min de lecture"
  },
];

const Blogs = () => {
  const navigate = useNavigate();

  return (
    <section className='bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-16 md:py-20'>
      <div className='mx-auto px-4 max-w-7xl'>
        {/* Titre principal */}
        <div data-aos="fade-up" data-aos-duration="600">
          <Heading 
            title="📰 Récentes nouvelles" 
            subtitle="Explorez nos derniers articles de blog" 
            center 
          />
        </div>

        {/* Grille des articles */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12'>
          {BlogData.map((article, index) => (
            <div
              key={article.title}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              data-aos-duration="800"
              className='group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg dark:shadow-gray-900/30 hover:shadow-xl transition-all duration-500 hover:-translate-y-2'
            >
              {/* Image avec effet de superposition */}
              <div className='relative overflow-hidden h-60'>
                <img
                  src={article.image}
                  alt={article.title}
                  className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
                <span className='absolute top-4 right-4 bg-primary text-white text-xs px-3 py-1 rounded-full'>
                  {article.readTime}
                </span>
              </div>

              {/* Contenu */}
              <div className='p-6 space-y-3'>
                <p className='text-sm text-gray-500 dark:text-gray-400 font-medium'>{article.date}</p>
                <h3 className='font-bold text-xl text-gray-800 dark:text-white line-clamp-2'>{article.title}</h3>
                <p className='text-gray-600 dark:text-gray-300 line-clamp-2'>{article.subtitle}</p>
                <button 
                  className='text-primary dark:text-primary-light font-medium flex items-center mt-4 hover:underline'
                  onClick={() => navigate('/blogs')}
                >
                  Lire l'article
                  <svg className='w-4 h-4 ml-2' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bouton pour voir tous les blogs */}
        <div className='flex justify-center mt-16' data-aos="fade-up" data-aos-delay="300">
          <Button
            text="Voir tous les articles"
            bgColor="primary"
            textColor="white"
            onClick={() => navigate('/blogs')}
            className="px-8 py-3 rounded-full hover:shadow-lg transition-all"
          />
        </div>
      </div>
    </section>
  );
};

export default Blogs;