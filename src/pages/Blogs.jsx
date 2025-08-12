import React from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiClock, FiTag } from 'react-icons/fi';
import Heading from '../components/Shared/Heading';
import { blogs } from '../data/blogs/blogs';

const Blogs = () => {
  // État pour le filtre actif
  const [activeFilter, setActiveFilter] = React.useState('Tous');
  
  // Filtrer les articles selon la catégorie sélectionnée
  const filteredPosts = activeFilter === 'Tous' 
    ? blogs 
    : blogs.filter(post => post.category === activeFilter);

  // Extraire les catégories uniques pour les filtres
  const categories = ['Tous', ...new Set(blogs.map(post => post.category))];

  // Pagination
  const [currentPage, setCurrentPage] = React.useState(1);
  const postsPerPage = 6;
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  
  // Calcul des articles à afficher pour la page courante
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Formater la date en français
  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* En-tête */}
        <div className="text-center mb-16">
          <Heading 
            title="📰 Blog Technologique" 
            subtitle="Découvrez nos analyses et conseils high-tech" 
            center
          />
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-4">
            Actualités, tests produits et guides d'achat par nos experts
          </p>
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => {
                setActiveFilter(category);
                setCurrentPage(1); // Reset à la première page quand on change de filtre
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                activeFilter === category
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grille des articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentPosts.map((post) => (
            <article 
              key={post.id}
              className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg dark:shadow-gray-900/30 h-full flex flex-col hover:shadow-xl transition-all duration-300"
            >
              <Link to={`/blogs/${post.slug}`} className="flex flex-col h-full">
                {/* Image */}
                <div className="relative overflow-hidden h-48">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <span className="absolute top-3 right-3 bg-primary text-white text-xs px-2 py-1 rounded">
                    {post.category}
                  </span>
                </div>

                {/* Contenu */}
                <div className="p-6 flex-grow">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3">
                    <span className="flex items-center">
                      <FiCalendar className="mr-1" /> {formatDate(post.date)}
                    </span>
                    <span className="flex items-center">
                      <FiClock className="mr-1" /> {post.readTime} min
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-primary dark:group-hover:text-primary-light transition">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{post.subtitle}</p>
                  
                  <div className="flex items-center mt-auto pt-3 border-t border-gray-100 dark:border-gray-700">
                    <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 mr-3 flex items-center justify-center text-xs font-bold text-white">
                      {post.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{post.author}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-16">
            <nav className="flex items-center space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 flex items-center justify-center rounded-full transition ${
                    currentPage === page
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {page}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blogs;