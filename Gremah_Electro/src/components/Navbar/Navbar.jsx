import React, { useState, useEffect, useCallback, useRef } from 'react';
import { IoMdSearch, IoMdClose } from "react-icons/io";
import { FaCaretDown, FaCartShopping, FaUser } from "react-icons/fa6";
import { HiMenuAlt3 } from "react-icons/hi";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DarkMode from './DarkMode';
import { useCart } from '../../hooks/useCart';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/about/GremahElectro.png'; // Assuming logo is in the public folder

const MenuLinks = [
  { id: 1, name: 'Accueil', to: '/' },
  { id: 2, name: 'Boutique', to: '/boutique' },
  { id: 3, name: 'À propos', to: '/a-propos' },
  { id: 4, name: 'Contact', to: '/contact' },
  { id: 5, name: 'Blogues', to: '/blogs' },
];

const DropDownLinks = [
  { id: 1, name: 'Produits Tendance', to: '/boutique?filter=trending' },
  { id: 2, name: 'Nouveautés', to: '/boutique?filter=new' },
  { id: 3, name: 'Promotions', to: '/boutique?filter=sale' },
  { id: 4, name: 'Meilleures Ventes', to: '/boutique?filter=best' }
];

const Navbar = () => {
  const { cartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const menuRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const toggleSearch = () => setIsSearchExpanded(prev => !prev);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/boutique?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsSearchExpanded(false);
      setIsMenuOpen(false);
    }
  };

  const handleEscape = useCallback((e) => {
    if (e.key === 'Escape') {
      setIsMenuOpen(false);
      setIsSearchExpanded(false);
    }
  }, []);

  // Fermer le menu quand on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target) && isSearchExpanded) {
        setIsSearchExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSearchExpanded]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    if (isMenuOpen || isSearchExpanded) {
      window.addEventListener('keydown', handleEscape);
    } else {
      window.removeEventListener('keydown', handleEscape);
    }
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen, isSearchExpanded, handleEscape]);

  return (
    <motion.header 
      className={clsx(
        "fixed w-full top-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md z-50 transition-all duration-300 border-b",
        isScrolled ? "border-gray-200 dark:border-gray-700 shadow-sm" : "border-transparent"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: 'spring' }}
    >
      <div className="py-3 px-4 md:px-6 flex justify-between items-center container mx-auto">
        {/* Logo et bouton menu mobile */}
        <div className="flex items-center gap-4">
          <motion.button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Menu"
            aria-expanded={isMenuOpen}
          >
            <HiMenuAlt3 className="text-2xl text-gray-800 dark:text-white" />
          </motion.button>

          <Link
            to="/"
            className="text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-red-600 bg-clip-text text-transparent hover:tracking-wider transition-all"
          >
            <motion.span 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img src={logo} alt="Gremah Electro" className='h-16 w-30 lg:block hidden' />
            </motion.span>
          </Link>
        </div>

        {/* Navigation principale */}
        <nav className="hidden lg:flex gap-8 items-center">
          {MenuLinks.map(link => (
            <Link
              key={link.id}
              to={link.to}
              className={clsx(
                "relative group text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-medium transition-all",
                location.pathname === link.to && "text-primary dark:text-primary"
              )}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-1 py-2"
              >
                {link.name}
                <span className={clsx(
                  "absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-primary transition-all duration-300 block",
                  location.pathname === link.to && "w-full"
                )}></span>
              </motion.div>
            </Link>
          ))}

          {/* Dropdown */}
          <motion.div 
            className="relative group cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center gap-1 font-semibold text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
              Liens rapides <FaCaretDown className="transition-transform group-hover:rotate-180 duration-300" />
            </div>
            <motion.div 
              className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-2 z-40 hidden group-hover:block border border-gray-100 dark:border-gray-700"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {DropDownLinks.map(link => (
                <Link
                  key={link.id}
                  to={link.to}
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition hover:translate-x-1"
                >
                  {link.name}
                </Link>
              ))}
            </motion.div>
          </motion.div>
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Search - Version desktop */}
          <motion.div 
            className="relative hidden sm:flex items-center"
            ref={searchRef}
          >
            {isSearchExpanded ? (
              <motion.form
                onSubmit={handleSearchSubmit}
                initial={{ width: 0 }}
                animate={{ width: '200px' }}
                exit={{ width: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-100 dark:bg-gray-800 border-none rounded-full pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  autoFocus
                />
                <button 
                  type="submit" 
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-600 dark:text-gray-400 hover:text-primary transition"
                  aria-label="Rechercher"
                >
                  <IoMdSearch className="text-xl" />
                </button>
              </motion.form>
            ) : (
              <motion.button
                onClick={toggleSearch}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                aria-label="Rechercher"
              >
                <IoMdSearch className="text-xl text-gray-700 dark:text-white" />
              </motion.button>
            )}
          </motion.div>

          {/* User */}
          <Link 
            to="/connexion" 
            className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaUser className="text-xl text-gray-700 dark:text-white" />
            </motion.div>
          </Link>

          {/* Cart */}
          <Link 
            to="/panier" 
            className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaCartShopping className="text-xl text-gray-700 dark:text-white" />
              {cartCount > 0 && (
                <motion.span 
                  className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center font-bold"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500 }}
                >
                  {cartCount}
                </motion.span>
              )}
            </motion.div>
          </Link>

          {/* Dark mode toggle */}
          <DarkMode />

          {/* Search - Version mobile (icône seulement) */}
          <motion.button
            onClick={toggleSearch}
            className="sm:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Rechercher"
          >
            <IoMdSearch className="text-xl text-gray-700 dark:text-white" />
          </motion.button>
        </div>
      </div>

      {/* --- Mobile Menu --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Overlay avec flou */}
            <motion.div 
              className="fixed inset-0 z-40 bg-black/30 dark:bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={toggleMenu}
            />
            
            {/* Contenu du menu */}
            <motion.div 
              ref={menuRef}
              className="fixed inset-y-0 left-0 z-50 w-4/5 max-w-xs h-lvh rounded-lg border-primary bg-white  dark:bg-gray-900 shadow-2xl flex flex-col"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="flex justify-between items-center p-6 rounded-full   dark:border-gray-700">
                <Link
                  to="/"
                  className="text-xl font-extrabold bg-gradient-to-r from-primary to-red-600 bg-clip-text text-transparent"
                  onClick={toggleMenu}
                >
                  Gremah Electro
                </Link>
                <motion.button 
                  onClick={toggleMenu} 
                  className="p-2 text-gray-800 dark:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Fermer le menu"
                >
                  <IoMdClose className="text-2xl" />
                </motion.button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <ul className="space-y-4">
                  {MenuLinks.map(link => (
                    <motion.li 
                      key={link.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 * link.id }}
                    >
                      <Link
                        to={link.to}
                        onClick={toggleMenu}
                        className={clsx(
                          "block py-3 px-2 text-gray-800 dark:text-white font-medium hover:text-primary dark:hover:text-primary transition rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800",
                          location.pathname === link.to && "text-primary dark:text-primary bg-gray-100 dark:bg-gray-800"
                        )}
                      >
                        {link.name}
                      </Link>
                    </motion.li>
                  ))}

                  <motion.li 
                    className="pt-4"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="text-gray-800 dark:text-white font-semibold py-2 px-2">
                      Liens rapides
                    </div>
                    <ul className="ml-2 mt-2 space-y-2">
                      {DropDownLinks.map(link => (
                        <motion.li 
                          key={link.id}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.1 * link.id + 0.5 }}
                        >
                          <Link
                            to={link.to}
                            onClick={toggleMenu}
                            className="block py-2 px-4 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 hover:translate-x-1"
                          >
                            {link.name}
                          </Link>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.li>
                </ul>

                {/* Bouton de connexion mobile */}
                <motion.div
                  className="mt-8"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <Link
                    to="/connexion"
                    onClick={toggleMenu}
                    className="flex items-center gap-3 py-3 px-4 text-gray-800 dark:text-white font-medium hover:text-primary dark:hover:text-primary transition rounded-lg bg-gray-100 dark:bg-gray-800"
                  >
                    <FaUser className="text-lg" />
                    <span>Connexion</span>
                  </Link>
                </motion.div>
              </div>

              {/* Search field mobile */}
              <motion.div 
                className="p-6 border-t border-gray-200 dark:border-gray-700"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <form onSubmit={handleSearchSubmit} className="relative">
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-gray-100 dark:bg-gray-800 border-none text-base rounded-full pl-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <button 
                    type="submit"
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-600 dark:text-gray-400 hover:text-primary transition"
                    aria-label="Rechercher"
                  >
                    <IoMdSearch className="text-xl" />
                  </button>
                </form>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- Mobile Search Overlay --- */}
      <AnimatePresence>
        {isSearchExpanded && (
          <>
            <motion.div 
              className="fixed inset-0 z-40 bg-black/30 dark:bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={toggleSearch}
            />
            
            <motion.div
              className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 shadow-md p-4"
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              exit={{ y: -100 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <button
                  type="button"
                  onClick={toggleSearch}
                  className="p-2 text-gray-700 dark:text-white mr-2"
                  aria-label="Fermer la recherche"
                >
                  <IoMdClose className="text-xl" />
                </button>
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-gray-100 dark:bg-gray-800 border-none text-base rounded-full pl-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  autoFocus
                />
                <button 
                  type="submit"
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-600 dark:text-gray-400 hover:text-primary transition"
                  aria-label="Rechercher"
                >
                  <IoMdSearch className="text-xl" />
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;