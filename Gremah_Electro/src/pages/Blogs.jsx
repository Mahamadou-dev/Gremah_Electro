import React from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiClock, FiTag } from 'react-icons/fi';
import Heading from '../components/Shared/Heading';



const importBlogPostsImages = (fileName) => {
  const modules = import.meta.glob('/src/assets/blogs/*.{jpg,jpeg,png,webp}', { eager: true });
  return modules[`/src/assets/blogs/${fileName}`]?.default
    || '/fallback-product-image.jpg';
};

// Données des articles de blog
const blogPosts = [
  {
    id: 1,
    title: "🕒 Guide ultime pour choisir sa montre connectée en 2025",
    subtitle: "Comparatif des meilleurs modèles et conseils d'achat pour trouver la montre intelligente parfaite",
    date: "15 août 2025",
    readTime: "8 min",
    category: "Technologie",
    image:importBlogPostsImages( "smartwatch.jpeg"),
    author: "Marc Techno"
  },
  {
    id: 2,
    title: "🎧 Test complet : Sony WH-1000XM6 vs Bose QC45",
    subtitle: "Battle des références du marché des casques audio sans fil avec réduction de bruit active",
    date: "22 août 2025",
    readTime: "12 min",
    category: "Audio",
    image:importBlogPostsImages( "headphones.jpeg"),
    author: "Sarah Audio"
  },
  {
    id: 3,
    title: "🔋 10 astuces pour prolonger la durée de vie de vos batteries",
    subtitle: "Les meilleures pratiques pour optimiser l'autonomie de vos appareils électroniques",
    date: "30 août 2025",
    readTime: "6 min",
    category: "Conseils",
    image:importBlogPostsImages( "battery.jpeg" ),
    author: "Julie Tech"
  },
  {
    id: 4,
    title: "📱 Comparatif : Meilleurs smartphones 2025",
    subtitle: "Notre sélection des modèles les plus innovants cette année avec leurs forces et faiblesses",
    date: "10 septembre 2025",
    readTime: "10 min",
    category: "Technologie",
    image:importBlogPostsImages( "smartphones.jpeg"),
    author: "Marc Techno"
  },
  {
    id: 5,
    title: "💻 Configurer son espace de travail idéal",
    subtitle: "Ergonomie, câble management et équipements pour un setup productif",
    date: "18 septembre 2025",
    readTime: "7 min",
    category: "Lifestyle",
    image:importBlogPostsImages( "workspace.jpeg"),
    author: "Alex Pro"
  },
  {
    id: 6,
    title: "🖥️ PC vs Mac : lequel choisir en 2025 ?",
    subtitle: "Analyse approfondie des deux écosystèmes pour vous aider à décider",
    date: "25 septembre 2025",
    readTime: "9 min",
    category: "Technologie",
    image:importBlogPostsImages( "pc-vs-mac.jpeg"),
    author: "Julie Tech"
  },
  {
    id: 7,
    title: "🔊 Les innovations audio à suivre en 2025",
    subtitle: "Découvrez les technologies qui vont révolutionner votre expérience sonore",
    date: "2 octobre 2025",
    readTime: "5 min",
    category: "Audio",
    image:importBlogPostsImages( "audio-tech.jpeg"),
    author: "Sarah Audio"
  },
  {
    id: 8,
    title: "⌨️ Les accessoires indispensables pour télétravail",
    subtitle: "Notre sélection d'équipements pour travailler confortablement de chez soi",
    date: "9 octobre 2025",
    readTime: "6 min",
    category: "Lifestyle",
    image:importBlogPostsImages( "home-office.jpeg"),
    author: "Alex Pro"
  }
];

const Blogs = () => {
  // État pour le filtre actif
  const [activeFilter, setActiveFilter] = React.useState('Tous');
  
  // Filtrer les articles selon la catégorie sélectionnée
  const filteredPosts = activeFilter === 'Tous' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeFilter);

  // Extraire les catégories uniques pour les filtres
  const categories = ['Tous', ...new Set(blogPosts.map(post => post.category))];

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
              onClick={() => setActiveFilter(category)}
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
          {filteredPosts.map((post, index) => (
            <article 
              key={post.id}
              className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg dark:shadow-gray-900/30 h-full flex flex-col hover:shadow-xl transition-all duration-300"
            >
              <Link to={`/blog/${post.id}`} className="flex flex-col h-full">
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
                      <FiCalendar className="mr-1" /> {post.date}
                    </span>
                    <span className="flex items-center">
                      <FiClock className="mr-1" /> {post.readTime}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-primary dark:group-hover:text-primary-light transition">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{post.subtitle}</p>
                  
                  <div className="flex items-center mt-auto pt-3 border-t border-gray-100 dark:border-gray-700">
                    <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 mr-3"></div>
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
        <div className="flex justify-center mt-16">
          <nav className="flex items-center space-x-2">
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white">
              1
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition">
              2
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition">
              3
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default Blogs;