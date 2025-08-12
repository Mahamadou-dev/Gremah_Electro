import React, { useState, useEffect, useRef } from 'react';
import {
  FiFilter,
  FiX,
  FiChevronDown,
  FiChevronUp,
  FiSearch,
  FiStar,
  FiSliders
} from 'react-icons/fi';
import ProductCard from '../components/Products/ProductCard';
import Heading from '../components/Shared/Heading';
import Button from '../components/Shared/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

// Import ALL your structured product data
import { accessoires } from '../data/products/accessoires';
import { casquesEcouteurs } from '../data/products/casques_ecouteurs';
import { hautParleurs } from '../data/products/haut_parleurs';
import { laptops } from '../data/products/laptops';
import { smartphones } from '../data/products/smartphones';
import { smartwatchs } from '../data/products/smartwatches';

// Consolidate all products into a single array
const allProducts = [
  ...casquesEcouteurs,
  ...accessoires,
  ...laptops,
  ...smartphones,
  ...hautParleurs,
  ...smartwatchs
];

// --- Filter & Sort Data Definitions ---
const getUniqueCategories = (products) => {
  const categories = new Set();
  products.forEach(p => categories.add(p.category));
  return [{ name: "Toutes", value: "all" }, ...Array.from(categories).map(cat => ({ name: cat, value: cat }))];
};

const getUniqueBrands = (products) => {
  const brands = new Set();
  products.forEach(p => {
    if (p.brand) {
      brands.add(p.brand);
    } else {
      const firstWord = p.title.split(' ')[0];
      if (firstWord.length > 2 && firstWord.toLowerCase() !== 'clavier' && firstWord.toLowerCase() !== 'souris') {
        brands.add(firstWord);
      }
    }
  });
  return [{ name: "Toutes", value: "all" }, ...Array.from(brands).map(brand => ({ name: brand, value: brand.toLowerCase() }))];
};

const priceRanges = [
  { id: 1, name: "Tous les prix", value: "all" },
  { id: 2, name: "Moins de 500 €", value: "0-50000" },
  { id: 3, name: "500 € - 1000 €", value: "50000-100000" },
  { id: 4, name: "1000 € - 2000 €", value: "100000-200000" },
  { id: 5, name: "Plus de 2000 €", value: "200000-9999999" },
];

const ratings = [
  { id: 1, name: "4 étoiles & plus", value: 4 },
  { id: 2, name: "3 étoiles & plus", value: 3 },
  { id: 3, name: "2 étoiles & plus", value: 2 },
  { id: 4, name: "1 étoile & plus", value: 1 },
];

const sortOptions = [
  { value: "default", label: "Trier par défaut" },
  { value: "price-asc", label: "Prix : Croissant" },
  { value: "price-desc", label: "Prix : Décroissant" },
  { value: "rating-desc", label: "Meilleures notes" },
  { value: "name-asc", label: "Nom : A-Z" },
  { value: "name-desc", label: "Nom : Z-A" },
];

const Shop = () => {
  const location = useLocation();
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedRating, setSelectedRating] = useState(0);
  const [sortOption, setSortOption] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFilter, setExpandedFilter] = useState(null);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  const categories = getUniqueCategories(allProducts);
  const brands = getUniqueBrands(allProducts);
  const filterDrawerRef = useRef(null);

  // Calculate active filters count
  useEffect(() => {
    let count = 0;
    if (selectedCategory !== "all") count++;
    if (selectedBrand !== "all") count++;
    if (selectedPriceRange !== "all") count++;
    if (minPrice !== '' || maxPrice !== '') count++;
    if (selectedRating !== 0) count++;
    setActiveFiltersCount(count);
  }, [selectedCategory, selectedBrand, selectedPriceRange, minPrice, maxPrice, selectedRating]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryParam = searchParams.get('category');
    
    if (categoryParam) {
      setSelectedCategory(categoryParam);
      window.scrollTo(0, 0);
    }
  }, [location.search]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterDrawerRef.current && !filterDrawerRef.current.contains(event.target)) {
        const isFilterButton = event.target.closest('[data-filter-button]');
        if (!isFilterButton) {
          setShowMobileFilters(false);
        }
      }
    };

    if (showMobileFilters) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMobileFilters]);

  const toggleFilterSection = (filterName) => {
    setExpandedFilter(expandedFilter === filterName ? null : filterName);
  };

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedBrand("all");
    setSelectedPriceRange("all");
    setMinPrice('');
    setMaxPrice('');
    setSelectedRating(0);
    setSearchQuery("");
    setSortOption("default");
    setExpandedFilter(null);
  };

  const filteredProducts = allProducts.filter(product => {
    const lowerCaseSearchQuery = searchQuery.toLowerCase();
    const titleMatch = product.title.toLowerCase().includes(lowerCaseSearchQuery);
    const descriptionMatch = product.description.toLowerCase().includes(lowerCaseSearchQuery);
    const categoryMatch = selectedCategory === "all" || product.category.toLowerCase() === selectedCategory.toLowerCase();
    const brandMatch = selectedBrand === "all" || (product.brand && product.brand.toLowerCase() === selectedBrand.toLowerCase()) || product.title.split(' ')[0].toLowerCase() === selectedBrand.toLowerCase();

    let priceRangeMatch = true;
    if (selectedPriceRange !== "all") {
      const [min, max] = selectedPriceRange.split('-').map(Number);
      if (max) {
        priceRangeMatch = product.price >= min && product.price <= max;
      } else {
        priceRangeMatch = product.price >= min;
      }
    }

    let customPriceMatch = true;
    if (minPrice !== '' || maxPrice !== '') {
      const productPriceInEuros = product.price / 100;
      if (minPrice !== '' && productPriceInEuros < parseFloat(minPrice)) {
        customPriceMatch = false;
      }
      if (maxPrice !== '' && productPriceInEuros > parseFloat(maxPrice)) {
        customPriceMatch = false;
      }
    }

    const ratingMatch = selectedRating === 0 || product.rating >= selectedRating;

    return (titleMatch || descriptionMatch) && categoryMatch && brandMatch && priceRangeMatch && customPriceMatch && ratingMatch;
  });

  const sortedAndFilteredProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "price-asc") return a.price - b.price;
    if (sortOption === "price-desc") return b.price - a.price;
    if (sortOption === "rating-desc") return b.rating - a.rating;
    if (sortOption === "name-asc") return a.title.localeCompare(b.title);
    if (sortOption === "name-desc") return b.title.localeCompare(a.title);
    return 0;
  });

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-10 pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <Heading
            title="Notre Boutique"
            subtitle="Découvrez notre sélection exclusive d'appareils électroniques"
          />

          <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3 w-full md:w-auto">
            {/* Search Bar */}
            <div className="relative w-full sm:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-dark focus:border-transparent shadow-sm transition"
              />
            </div>

            {/* Mobile Filter Toggle */}
            <button
              data-filter-button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-md hover:shadow-lg transition text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700"
              aria-label="Toggle filters"
            >
              <FiSliders className="h-5 w-5" />
              <span>Filtres</span>
              {activeFiltersCount > 0 && (
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary text-white text-xs font-medium">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* Sort Dropdown */}
            <div className="relative w-full sm:w-48">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-dark focus:border-transparent rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm cursor-pointer appearance-none"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <FiChevronDown className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar (Desktop) - Nouvelle disposition */}
          <div className="hidden lg:block lg:w-64 xl:w-72 flex-shrink-0">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md sticky top-24 h-[calc(100vh-100px)] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Filtres</h3>
                {activeFiltersCount > 0 && (
                  <button 
                    onClick={clearFilters}
                    className="text-xs text-primary hover:text-primary-dark font-medium px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  >
                    Effacer tout
                  </button>
                )}
              </div>

              {/* Filtres sous forme de cartes */}
              <div className="space-y-4">
                {/* Carte Catégories */}
                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg shadow-sm">
                  <button
                    onClick={() => toggleFilterSection('category')}
                    className="flex justify-between items-center w-full text-gray-800 dark:text-white"
                  >
                    <span className="font-medium">Catégories</span>
                    {expandedFilter === 'category' ? <FiChevronUp /> : <FiChevronDown />}
                  </button>
                  <AnimatePresence>
                    {expandedFilter === 'category' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-2 space-y-1 text-gray-700 dark:text-gray-300 overflow-hidden"
                      >
                        {categories.map(category => (
                          <label key={category.value} className="flex items-center cursor-pointer hover:text-primary-dark transition px-1 py-1 rounded">
                            <input
                              type="radio"
                              name="category"
                              value={category.value}
                              checked={selectedCategory === category.value}
                              onChange={() => setSelectedCategory(category.value)}
                              className="mr-2 h-4 w-4 text-primary-dark focus:ring-primary-dark border-gray-300 dark:border-gray-600 dark:bg-gray-600"
                            />
                            <span className="text-sm">{category.name}</span>
                          </label>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Carte Marques */}
                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg shadow-sm">
                  <button
                    onClick={() => toggleFilterSection('brand')}
                    className="flex justify-between items-center w-full text-gray-800 dark:text-white"
                  >
                    <span className="font-medium">Marques</span>
                    {expandedFilter === 'brand' ? <FiChevronUp /> : <FiChevronDown />}
                  </button>
                  <AnimatePresence>
                    {expandedFilter === 'brand' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-2 space-y-1 text-gray-700 dark:text-gray-300 overflow-hidden"
                      >
                        {brands.map(brand => (
                          <label key={brand.value} className="flex items-center cursor-pointer hover:text-primary-dark transition px-1 py-1 rounded">
                            <input
                              type="radio"
                              name="brand"
                              value={brand.value}
                              checked={selectedBrand === brand.value}
                              onChange={() => setSelectedBrand(brand.value)}
                              className="mr-2 h-4 w-4 text-primary-dark focus:ring-primary-dark border-gray-300 dark:border-gray-600 dark:bg-gray-600"
                            />
                            <span className="text-sm">{brand.name}</span>
                          </label>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Carte Prix */}
                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg shadow-sm">
                  <button
                    onClick={() => toggleFilterSection('priceRange')}
                    className="flex justify-between items-center w-full text-gray-800 dark:text-white"
                  >
                    <span className="font-medium">Fourchette de Prix</span>
                    {expandedFilter === 'priceRange' ? <FiChevronUp /> : <FiChevronDown />}
                  </button>
                  <AnimatePresence>
                    {expandedFilter === 'priceRange' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-2 space-y-1 text-gray-700 dark:text-gray-300 overflow-hidden"
                      >
                        {priceRanges.map(range => (
                          <label key={range.id} className="flex items-center cursor-pointer hover:text-primary-dark transition px-1 py-1 rounded">
                            <input
                              type="radio"
                              name="priceRange"
                              value={range.value}
                              checked={selectedPriceRange === range.value}
                              onChange={() => { setSelectedPriceRange(range.value); setMinPrice(''); setMaxPrice(''); }}
                              className="mr-2 h-4 w-4 text-primary-dark focus:ring-primary-dark border-gray-300 dark:border-gray-600 dark:bg-gray-600"
                            />
                            <span className="text-sm">{range.name}</span>
                          </label>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Carte Prix Personnalisé */}
                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg shadow-sm">
                  <button
                    onClick={() => toggleFilterSection('customPrice')}
                    className="flex justify-between items-center w-full text-gray-800 dark:text-white"
                  >
                    <span className="font-medium">Prix Personnalisé</span>
                    {expandedFilter === 'customPrice' ? <FiChevronUp /> : <FiChevronDown />}
                  </button>
                  <AnimatePresence>
                    {expandedFilter === 'customPrice' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-2 text-gray-700 dark:text-gray-300 overflow-hidden"
                      >
                        <div className="flex space-x-2">
                          <div className="w-1/2">
                            <label htmlFor="minPrice" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Min (€)</label>
                            <input
                              type="number"
                              id="minPrice"
                              placeholder="0"
                              value={minPrice}
                              onChange={(e) => { setMinPrice(e.target.value); setSelectedPriceRange('all'); }}
                              className="block w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-primary-dark"
                            />
                          </div>
                          <div className="w-1/2">
                            <label htmlFor="maxPrice" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Max (€)</label>
                            <input
                              type="number"
                              id="maxPrice"
                              placeholder="5000"
                              value={maxPrice}
                              onChange={(e) => { setMaxPrice(e.target.value); setSelectedPriceRange('all'); }}
                              className="block w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-primary-dark"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Carte Notes */}
                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg shadow-sm">
                  <button
                    onClick={() => toggleFilterSection('rating')}
                    className="flex justify-between items-center w-full text-gray-800 dark:text-white"
                  >
                    <span className="font-medium">Notes Clients</span>
                    {expandedFilter === 'rating' ? <FiChevronUp /> : <FiChevronDown />}
                  </button>
                  <AnimatePresence>
                    {expandedFilter === 'rating' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-2 space-y-1 text-gray-700 dark:text-gray-300 overflow-hidden"
                      >
                        {ratings.map(rating => (
                          <label key={rating.id} className="flex items-center cursor-pointer hover:text-primary-dark transition px-1 py-1 rounded">
                            <input
                              type="radio"
                              name="rating"
                              value={rating.value}
                              checked={selectedRating === rating.value}
                              onChange={() => setSelectedRating(rating.value)}
                              className="mr-2 h-4 w-4 text-primary-dark focus:ring-primary-dark border-gray-300 dark:border-gray-600 dark:bg-gray-600"
                            />
                            <div className="flex items-center">
                              {Array(rating.value).fill(0).map((_, i) => (
                                <FiStar key={i} className="text-yellow-400 w-3 h-3" />
                              ))}
                              <span className="ml-1 text-sm">& plus</span>
                            </div>
                          </label>
                        ))}
                        <label className="flex items-center cursor-pointer hover:text-primary-dark transition px-1 py-1 rounded">
                          <input
                            type="radio"
                            name="rating"
                            value={0}
                            checked={selectedRating === 0}
                            onChange={() => setSelectedRating(0)}
                            className="mr-2 h-4 w-4 text-primary-dark focus:ring-primary-dark border-gray-300 dark:border-gray-600 dark:bg-gray-600"
                          />
                          <span className="text-sm">Toutes les notes</span>
                        </label>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Filters Drawer - Version améliorée */}
          <AnimatePresence>
            {showMobileFilters && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                  onClick={() => setShowMobileFilters(false)}
                ></motion.div>
                <motion.div
                  ref={filterDrawerRef}
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
                  className="fixed top-0 left-0 h-full w-4/5 max-w-sm bg-white dark:bg-gray-800 shadow-xl z-50 overflow-y-auto lg:hidden"
                >
                  <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Filtres</h3>
                    <button 
                      onClick={() => setShowMobileFilters(false)}
                      className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <FiX className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                    </button>
                  </div>
                  <div className="p-4 space-y-4">
                    {/* Filtres mobiles sous forme de cartes */}
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      <button
                        onClick={() => toggleFilterSection('mobileCategory')}
                        className="flex justify-between items-center w-full text-gray-800 dark:text-white"
                      >
                        <span className="font-medium">Catégories</span>
                        {expandedFilter === 'mobileCategory' ? <FiChevronUp /> : <FiChevronDown />}
                      </button>
                      {expandedFilter === 'mobileCategory' && (
                        <div className="mt-2 space-y-2">
                          {categories.map(category => (
                            <label key={category.value} className="flex items-center cursor-pointer hover:text-primary-dark transition px-1 py-1 rounded">
                              <input
                                type="radio"
                                name="mobileCategory"
                                value={category.value}
                                checked={selectedCategory === category.value}
                                onChange={() => setSelectedCategory(category.value)}
                                className="mr-2 h-4 w-4 text-primary-dark focus:ring-primary-dark border-gray-300 dark:border-gray-600 dark:bg-gray-600"
                              />
                              <span className="text-sm">{category.name}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      <button
                        onClick={() => toggleFilterSection('mobileBrand')}
                        className="flex justify-between items-center w-full text-gray-800 dark:text-white"
                      >
                        <span className="font-medium">Marques</span>
                        {expandedFilter === 'mobileBrand' ? <FiChevronUp /> : <FiChevronDown />}
                      </button>
                      {expandedFilter === 'mobileBrand' && (
                        <div className="mt-2 space-y-2">
                          {brands.map(brand => (
                            <label key={brand.value} className="flex items-center cursor-pointer hover:text-primary-dark transition px-1 py-1 rounded">
                              <input
                                type="radio"
                                name="mobileBrand"
                                value={brand.value}
                                checked={selectedBrand === brand.value}
                                onChange={() => setSelectedBrand(brand.value)}
                                className="mr-2 h-4 w-4 text-primary-dark focus:ring-primary-dark border-gray-300 dark:border-gray-600 dark:bg-gray-600"
                              />
                              <span className="text-sm">{brand.name}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      <button
                        onClick={() => toggleFilterSection('mobilePriceRange')}
                        className="flex justify-between items-center w-full text-gray-800 dark:text-white"
                      >
                        <span className="font-medium">Fourchette de Prix</span>
                        {expandedFilter === 'mobilePriceRange' ? <FiChevronUp /> : <FiChevronDown />}
                      </button>
                      {expandedFilter === 'mobilePriceRange' && (
                        <div className="mt-2 space-y-2">
                          {priceRanges.map(range => (
                            <label key={range.id} className="flex items-center cursor-pointer hover:text-primary-dark transition px-1 py-1 rounded">
                              <input
                                type="radio"
                                name="mobilePriceRange"
                                value={range.value}
                                checked={selectedPriceRange === range.value}
                                onChange={() => { setSelectedPriceRange(range.value); setMinPrice(''); setMaxPrice(''); }}
                                className="mr-2 h-4 w-4 text-primary-dark focus:ring-primary-dark border-gray-300 dark:border-gray-600 dark:bg-gray-600"
                              />
                              <span className="text-sm">{range.name}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      <button
                        onClick={() => toggleFilterSection('mobileCustomPrice')}
                        className="flex justify-between items-center w-full text-gray-800 dark:text-white"
                      >
                        <span className="font-medium">Prix Personnalisé</span>
                        {expandedFilter === 'mobileCustomPrice' ? <FiChevronUp /> : <FiChevronDown />}
                      </button>
                      {expandedFilter === 'mobileCustomPrice' && (
                        <div className="mt-2">
                          <div className="flex space-x-2">
                            <div className="w-1/2">
                              <label htmlFor="mobileMinPrice" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Min (€)</label>
                              <input
                                type="number"
                                id="mobileMinPrice"
                                placeholder="0"
                                value={minPrice}
                                onChange={(e) => { setMinPrice(e.target.value); setSelectedPriceRange('all'); }}
                                className="block w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-primary-dark"
                              />
                            </div>
                            <div className="w-1/2">
                              <label htmlFor="mobileMaxPrice" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Max (€)</label>
                              <input
                                type="number"
                                id="mobileMaxPrice"
                                placeholder="5000"
                                value={maxPrice}
                                onChange={(e) => { setMaxPrice(e.target.value); setSelectedPriceRange('all'); }}
                                className="block w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-primary-dark"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      <button
                        onClick={() => toggleFilterSection('mobileRating')}
                        className="flex justify-between items-center w-full text-gray-800 dark:text-white"
                      >
                        <span className="font-medium">Notes Clients</span>
                        {expandedFilter === 'mobileRating' ? <FiChevronUp /> : <FiChevronDown />}
                      </button>
                      {expandedFilter === 'mobileRating' && (
                        <div className="mt-2 space-y-2">
                          {ratings.map(rating => (
                            <label key={rating.id} className="flex items-center cursor-pointer hover:text-primary-dark transition px-1 py-1 rounded">
                              <input
                                type="radio"
                                name="mobileRating"
                                value={rating.value}
                                checked={selectedRating === rating.value}
                                onChange={() => setSelectedRating(rating.value)}
                                className="mr-2 h-4 w-4 text-primary-dark focus:ring-primary-dark border-gray-300 dark:border-gray-600 dark:bg-gray-600"
                              />
                              <div className="flex items-center">
                                {Array(rating.value).fill(0).map((_, i) => (
                                  <FiStar key={i} className="text-yellow-400 w-3 h-3" />
                                ))}
                                <span className="ml-1 text-sm">& plus</span>
                              </div>
                            </label>
                          ))}
                          <label className="flex items-center cursor-pointer hover:text-primary-dark transition px-1 py-1 rounded">
                            <input
                              type="radio"
                              name="mobileRating"
                              value={0}
                              checked={selectedRating === 0}
                              onChange={() => setSelectedRating(0)}
                              className="mr-2 h-4 w-4 text-primary-dark focus:ring-primary-dark border-gray-300 dark:border-gray-600 dark:bg-gray-600"
                            />
                            <span className="text-sm">Toutes les notes</span>
                          </label>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex space-x-3">
                      <button
                        onClick={clearFilters}
                        className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                      >
                        Effacer
                      </button>
                      <button
                        onClick={() => setShowMobileFilters(false)}
                        className="flex-1 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition"
                      >
                        Appliquer
                      </button>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Product List Grid - Version améliorée */}
          <div className="w-full lg:w-[calc(100%-16rem)] xl:w-[calc(100%-18rem)]">
            {/* Active Filters Bar - Version améliorée */}
            {(selectedCategory !== "all" || selectedBrand !== "all" || selectedPriceRange !== "all" || minPrice !== '' || maxPrice !== '' || selectedRating !== 0) && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="mb-6 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm flex flex-wrap items-center gap-2"
              >
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filtres actifs :</span>
                
                {selectedCategory !== "all" && (
                  <motion.span 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                  >
                    {categories.find(c => c.value === selectedCategory)?.name}
                    <button 
                      onClick={() => setSelectedCategory("all")}
                      className="ml-1 inline-flex items-center justify-center w-3.5 h-3.5 rounded-full text-blue-600 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 transition"
                    >
                      <FiX className="w-2.5 h-2.5" />
                    </button>
                  </motion.span>
                )}
                
                {selectedBrand !== "all" && (
                  <motion.span 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                  >
                    {brands.find(b => b.value === selectedBrand)?.name}
                    <button 
                      onClick={() => setSelectedBrand("all")}
                      className="ml-1 inline-flex items-center justify-center w-3.5 h-3.5 rounded-full text-green-600 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800 transition"
                    >
                      <FiX className="w-2.5 h-2.5" />
                    </button>
                  </motion.span>
                )}
                
                {selectedPriceRange !== "all" && (
                  <motion.span 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200"
                  >
                    {priceRanges.find(p => p.value === selectedPriceRange)?.name}
                    <button 
                      onClick={() => setSelectedPriceRange("all")}
                      className="ml-1 inline-flex items-center justify-center w-3.5 h-3.5 rounded-full text-purple-600 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800 transition"
                    >
                      <FiX className="w-2.5 h-2.5" />
                    </button>
                  </motion.span>
                )}
                
                {(minPrice !== '' || maxPrice !== '') && (
                  <motion.span 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
                  >
                    {minPrice !== '' ? `${minPrice}€` : '0€'} - {maxPrice !== '' ? `${maxPrice}€` : '∞'}
                    <button 
                      onClick={() => { setMinPrice(''); setMaxPrice(''); }}
                      className="ml-1 inline-flex items-center justify-center w-3.5 h-3.5 rounded-full text-yellow-600 dark:text-yellow-300 hover:bg-yellow-200 dark:hover:bg-yellow-800 transition"
                    >
                      <FiX className="w-2.5 h-2.5" />
                    </button>
                  </motion.span>
                )}
                
                {selectedRating !== 0 && (
                  <motion.span 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                  >
                    {selectedRating}+ étoiles
                    <button 
                      onClick={() => setSelectedRating(0)}
                      className="ml-1 inline-flex items-center justify-center w-3.5 h-3.5 rounded-full text-red-600 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800 transition"
                    >
                      <FiX className="w-2.5 h-2.5" />
                    </button>
                  </motion.span>
                )}
                
                <motion.button 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  onClick={clearFilters}
                  className="ml-auto text-xs font-medium text-primary hover:text-primary-dark px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  Effacer tout
                </motion.button>
              </motion.div>
            )}

            {/* Products Count and View Options */}
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {sortedAndFilteredProducts.length} {sortedAndFilteredProducts.length === 1 ? 'produit trouvé' : 'produits trouvés'}
              </p>
            </div>

            {/* Products Grid - Version améliorée */}
            {sortedAndFilteredProducts.length > 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              >
                <AnimatePresence>
                  {sortedAndFilteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 20, opacity: 0 }}
                      transition={{ 
                        delay: index * 0.03,
                        duration: 0.3,
                        type: "spring",
                        stiffness: 120
                      }}
                      layout
                      className="hover:transform hover:-translate-y-1 transition-transform duration-200"
                    >
                      <ProductCard 
                        product={{
                          id: product.id,
                          slug: product.slug,
                          img: product.images && product.images.length > 0 ? product.images[0] : 'placeholder_image_url',
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
                        className="h-full"
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg flex flex-col items-center justify-center"
              >
                <p className="text-5xl text-gray-300 dark:text-gray-700 mb-3 animate-pulse">¯\_(ツ)_/¯</p>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">Aucun produit trouvé</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-5 text-sm">Essayez de modifier vos critères de recherche ou de filtrage.</p>
                <button 
                  onClick={clearFilters}
                  className="px-5 py-2.5 bg-primary text-white rounded-full shadow-md hover:bg-primary-dark transition-colors duration-300 text-sm"
                >
                  Réinitialiser les filtres
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;