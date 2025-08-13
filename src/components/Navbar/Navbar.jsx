import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { IoMdSearch, IoMdClose } from "react-icons/io";
import { FaCaretDown, FaCartShopping, FaUser } from "react-icons/fa6";
import { HiMenuAlt3 } from "react-icons/hi";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DarkMode from './DarkMode';
import { useCart } from '../../hooks/useCart';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/about/GremahElectro.png';
import { allProducts } from '../../data/products/products';
import { blogs } from '../../data/blogs/blogs';

const MENU_LINKS = [
  { id: 1, name: 'Accueil', to: '/' },
  { id: 2, name: 'Boutique', to: '/boutique' },
  { id: 3, name: 'À propos', to: '/a-propos' },
  { id: 4, name: 'Contact', to: '/contact' },
  { id: 5, name: 'Blogues', to: '/blogs' },
];

const DROPDOWN_LINKS = [
  { id: 1, name: 'Produits Tendance', to: '/boutique?filter=trending' },
  { id: 2, name: 'Nouveautés', to: '/boutique?filter=new' },
  { id: 3, name: 'Promotions', to: '/boutique?filter=sale' },
  { id: 4, name: 'Meilleures Ventes', to: '/boutique?filter=best' }
];

const MAX_SEARCH_RESULTS = 5;

const Navbar = () => {
  const { cartCount } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const searchRef = useRef(null);
  const menuRef = useRef(null);
  const inputRef = useRef(null);
  const navbarRef = useRef(null);
  const lastScrollPosition = useRef(0);
  const isMobile = useRef(window.innerWidth < 1024);

  // Gestion du redimensionnement de la fenêtre
  useEffect(() => {
    const handleResize = () => {
      isMobile.current = window.innerWidth < 1024;
      // Fermer le menu si on passe en mode desktop
      if (!isMobile.current && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  // Optimisation des résultats de recherche
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase();
    const normalizedQuery = query.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    const productResults = allProducts
      .filter(product => 
        product.title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(normalizedQuery) || 
        product.category.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(normalizedQuery)
      )
      .map(p => ({ ...p, type: 'product' }));
    
    const blogResults = blogs
      .filter(blog => 
        blog.title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(normalizedQuery) || 
        blog.category.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(normalizedQuery)
      )
      .map(b => ({ ...b, type: 'blog' }));
    
    return [...productResults, ...blogResults].slice(0, MAX_SEARCH_RESULTS);
  }, [searchQuery]);

  // Gestion des événements clavier
  const handleKeyEvents = useCallback((e) => {
    if (e.key === 'Escape') {
      setSearchActive(false);
      setIsMenuOpen(false);
    }
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      setSearchActive(true);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, []);

  // Gestion du scroll améliorée
  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.scrollY;
      setIsScrolled(currentPosition > 10);
      
      // Fermer le menu uniquement si on scroll vers le bas en mode mobile
      if (isMobile.current && currentPosition > lastScrollPosition.current && isMenuOpen) {
        setIsMenuOpen(false);
      }
      
      lastScrollPosition.current = currentPosition;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen]);

  // Gestion des événements globaux
  useEffect(() => {
    document.addEventListener('keydown', handleKeyEvents);
    return () => document.removeEventListener('keydown', handleKeyEvents);
  }, [handleKeyEvents]);

  // Gestion des clics externes améliorée pour mobile
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchActive(false);
      }
      if (menuRef.current && !menuRef.current.contains(e.target) && !e.target.closest('[aria-label="Menu"]')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // Navigation vers un résultat
  const navigateToResult = useCallback((item) => {
    setSearchActive(false);
    setSearchQuery('');
    
    setTimeout(() => {
      const path = item.type === 'product' 
        ? `/produit/${item.slug}` 
        : `/blogs/${item.slug}`;
      navigate(path);
    }, 150);
  }, [navigate]);

  // Soumission de la recherche
  const handleSearchSubmit = useCallback((e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/boutique?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setSearchActive(false);
    }
  }, [searchQuery, navigate]);

  // Composant de résultat optimisé
  const SearchResult = React.memo(({ item }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition"
      onClick={() => navigateToResult(item)}
    >
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-md flex items-center justify-center ${
          item.type === 'product' ? 'bg-blue-50 dark:bg-blue-900/30' : 'bg-purple-50 dark:bg-purple-900/30'
        }`}>
          {item.type === 'product' ? (
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
            {item.title}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
            {item.type === 'product' ? 'Produit' : 'Blog'} • {item.category}
          </p>
        </div>
      </div>
    </motion.div>
  ));

  return (
    <motion.header 
      ref={navbarRef}
      className={clsx(
        "fixed w-full top-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm" : "bg-white dark:bg-gray-900"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo et menu mobile */}
          <div className="flex items-center flex-1">
            <button
              onClick={() => {
                // Scroll vers le haut avant d'ouvrir le menu
                if (isMobile.current && window.scrollY > 0) {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  // Petit délai pour laisser le temps de scroll
                  setTimeout(() => setIsMenuOpen(!isMenuOpen), 300);
                } else {
                  setIsMenuOpen(!isMenuOpen);
                }
              }}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/50"
              aria-label="Menu"
            >
              <HiMenuAlt3 className="text-2xl text-gray-800 dark:text-white" />
            </button>

            <Link to="/" className="flex items-center ml-2 lg:ml-0 flex-shrink-0">
              <img 
                src={logo} 
                alt="Gremah Electro" 
                className="h-14 w-auto lg:block transition-transform hover:scale-105" 
                loading="lazy"
              />
              <span className="sr-only">Gremah Electro</span>
            </Link>
          </div>

          {/* Navigation principale - Desktop */}
          <nav className="hidden lg:flex items-center space-x-8">
            {MENU_LINKS.map(link => (
              <Link
                key={link.id}
                to={link.to}
                className={clsx(
                  "relative py-2 px-1 font-medium transition-colors duration-200",
                  location.pathname === link.to 
                    ? "text-primary dark:text-primary" 
                    : "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                )}
              >
                {link.name}
                {location.pathname === link.to && (
                  <motion.span 
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
                    layoutId="navIndicator"
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  />
                )}
              </Link>
            ))}

            <div className="relative group">
              <button className="flex items-center gap-1 font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors duration-200 focus:outline-none">
                Liens rapides <FaCaretDown className="transition-transform duration-200 group-hover:rotate-180" />
              </button>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-100 dark:border-gray-700 z-50"
              >
                {DROPDOWN_LINKS.map(link => (
                  <Link
                    key={link.id}
                    to={link.to}
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                ))}
              </motion.div>
            </div>
          </nav>

          {/* Actions utilisateur */}
          <div className="flex items-center space-x-4">
            {/* Barre de recherche - Desktop */}
            <div className="relative hidden md:block" ref={searchRef}>
              <motion.div
                animate={{ 
                  width: searchActive ? '280px' : '40px',
                  borderRadius: searchActive ? '12px' : '50%'
                }}
                className="overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-sm"
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {searchActive ? (
                  <form onSubmit={handleSearchSubmit} className="flex items-center">
                    <input
                      ref={inputRef}
                      type="text"
                      placeholder="Rechercher produits, blogs..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-transparent border-none py-2 px-4 focus:outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      autoFocus
                    />
                    <button 
                      type="button"
                      onClick={() => {
                        setSearchQuery('');
                        setSearchActive(false);
                      }}
                      className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                    >
                      <IoMdClose />
                    </button>
                  </form>
                ) : (
                  <button
                    onClick={() => setSearchActive(true)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors rounded-full"
                    aria-label="Rechercher"
                  >
                    <IoMdSearch className="text-xl text-gray-700 dark:text-white" />
                  </button>
                )}
              </motion.div>

              {/* Affichage des résultats */}
              {searchActive && searchQuery && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-full right-0 mt-2 w-full min-w-[300px] bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 z-50"
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  {searchResults.length > 0 ? (
                    <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-96 overflow-y-auto">
                      {searchResults.map((item) => (
                        <SearchResult key={`${item.type}-${item.id}`} item={item} />
                      ))}
                      <div className="p-3 text-center text-sm text-gray-500 dark:text-gray-400">
                        <button 
                          type="button"
                          onClick={handleSearchSubmit}
                          className="text-primary font-medium hover:underline focus:outline-none"
                        >
                          Voir tous les résultats pour "{searchQuery}"
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                      Aucun résultat trouvé
                    </div>
                  )}
                </motion.div>
              )}
            </div>

            {/* Bouton recherche mobile */}
            <button
              onClick={() => setSearchActive(true)}
              className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
              aria-label="Rechercher"
            >
              <IoMdSearch className="text-xl text-gray-700 dark:text-white" />
            </button>

            {/* Compte utilisateur */}
            <Link 
              to="/se-connecter" 
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 relative"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaUser className="text-xl text-gray-700 dark:text-white" />
              </motion.div>
            </Link>

            {/* Panier */}
            <Link
              to="/panier"
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 relative transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <FaCartShopping className="text-xl text-gray-700 dark:text-white" />
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center font-bold"
                >
                  {cartCount}
                </motion.span>
              )}
            </Link>

            {/* Dark mode */}
            <DarkMode />
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setIsMenuOpen(false)}
              transition={{ duration: 0.2 }}
            />
            
            <motion.div
              ref={menuRef}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 w-4/5 max-w-xs bg-white dark:bg-gray-900 z-50 shadow-2xl flex flex-col"
            >
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <div className="flex items-center">
                  <img 
                    src={logo} 
                    alt="Gremah Electro" 
                    className="h-8 w-auto mr-2" 
                  />
                  <span className="text-xl font-bold bg-gradient-to-r from-primary to-red-600 bg-clip-text text-transparent">
                    Menu
                  </span>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none"
                >
                  <IoMdClose className="text-xl" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {MENU_LINKS.map(link => (
                  <Link
                    key={link.id}
                    to={link.to}
                    onClick={() => setIsMenuOpen(false)}
                    className={clsx(
                      "block py-3 px-4 rounded-lg font-medium transition-colors duration-200",
                      location.pathname === link.to
                        ? "bg-primary/10 text-primary"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    )}
                  >
                    {link.name}
                  </Link>
                ))}

                <div className="pt-4">
                  <div className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-300">
                    Liens rapides
                  </div>
                  <div className="space-y-1">
                    {DROPDOWN_LINKS.map(link => (
                      <Link
                        key={link.id}
                        to={link.to}
                        onClick={() => setIsMenuOpen(false)}
                        className="block py-2 px-6 text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800 rounded transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <DarkMode mobile />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Overlay recherche mobile */}
      <AnimatePresence>
        {searchActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white dark:bg-gray-900 z-50 p-4 pt-20"
            transition={{ duration: 0.2 }}
          >
            <div className="container mx-auto max-w-2xl">
              <form onSubmit={handleSearchSubmit} className="relative mb-4">
                <button
                  type="button"
                  onClick={() => setSearchActive(false)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                >
                  <IoMdClose className="text-xl" />
                </button>
                <input
                  type="text"
                  placeholder="Rechercher produits, blogs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-100 dark:bg-gray-800 rounded-full py-3 pl-12 pr-4 border-none focus:ring-2 focus:ring-primary/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  autoFocus
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:text-primary-dark transition-colors"
                >
                  <IoMdSearch className="text-xl" />
                </button>
              </form>

              {searchQuery && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
                >
                  {searchResults.length > 0 ? (
                    <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-[60vh] overflow-y-auto">
                      {searchResults.map((item) => (
                        <SearchResult key={`mobile-${item.type}-${item.id}`} item={item} />
                      ))}
                      <div className="p-3 text-center">
                        <button 
                          type="button"
                          onClick={handleSearchSubmit}
                          className="text-primary font-medium hover:underline focus:outline-none"
                        >
                          Voir tous les résultats
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                      Aucun résultat trouvé
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default React.memo(Navbar);