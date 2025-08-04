import React, { useState, useEffect, useRef } from 'react';
import {
  FiFilter,
  FiX,
  FiChevronDown,
  FiChevronUp,
  FiSearch,
  FiStar
} from 'react-icons/fi';
import ProductCard from '../components/Products/ProductCard'; // Ensure this path is correct
import Heading from '../components/Shared/Heading';
import Button from '../components/Shared/Button'; // Ensure this path is correct
          {/* Product List Grid */}
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

// ... (le reste de votre code, y compris l'importation de ProductCard et la fonction clearFilters)
// Import ALL your structured product data
import { accessoires } from '../data/products/accessoires';
import { casquesEcouteurs } from '../data/products/casques_ecouteurs';
import { hautParleurs } from '../data/products/haut_parleurs';
import { laptops } from '../data/products/laptops';
import { smartphones } from '../data/products/smartphones';
import { smartwatchs } from '../data/products/smartwatchs';
// ... import other categories as needed

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

// Dynamically extract unique categories and brands from allProducts
const getUniqueCategories = (products) => {
  const categories = new Set();
  products.forEach(p => categories.add(p.category));
  return [{ name: "Toutes", value: "all" }, ...Array.from(categories).map(cat => ({ name: cat, value: cat }))];
};

const getUniqueBrands = (products) => {
  const brands = new Set();
  products.forEach(p => {
    // Assuming 'brand' is a property on your product objects, adjust if needed
    if (p.brand) {
      brands.add(p.brand);
    } else {
      // Fallback: Try to infer brand from title if 'brand' property doesn't exist
      const firstWord = p.title.split(' ')[0];
      // Basic check to avoid common words as brands
      if (firstWord.length > 2 && firstWord.toLowerCase() !== 'clavier' && firstWord.toLowerCase() !== 'souris') {
        brands.add(firstWord);
      }
    }
  });
  return [{ name: "Toutes", value: "all" }, ...Array.from(brands).map(brand => ({ name: brand, value: brand.toLowerCase() }))];
};


const priceRanges = [
  { id: 1, name: "Tous les prix", value: "all" },
  { id: 2, name: "Moins de 500 €", value: "0-50000" }, // Prices are in cents
  { id: 3, name: "500 € - 1000 €", value: "50000-100000" },
  { id: 4, name: "1000 € - 2000 €", value: "100000-200000" },
  { id: 5, name: "Plus de 2000 €", value: "200000-9999999" }, // Using a large max for "plus de"
];

const ratings = [
  { id: 1, name: "4 étoiles & plus", value: 4 },
  { id: 2, name: "3 étoiles & plus", value: 3 },
  { id: 3, name: "2 étoiles & plus", value: 2 },
  { id: 4, name: "1 étoile & plus", value: 1 },
];


const Shop = () => {
  const location = useLocation();
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [minPrice, setMinPrice] = useState(''); // For custom price range input
  const [maxPrice, setMaxPrice] = useState(''); // For custom price range input
  const [selectedRating, setSelectedRating] = useState(0); // 0 means no rating filter
  const [sortOption, setSortOption] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFilter, setExpandedFilter] = useState(null); // Manages accordion-like filter sections

  const categories = getUniqueCategories(allProducts);
  const brands = getUniqueBrands(allProducts);

  // Ref for the mobile filter drawer to handle clicks outside
  const filterDrawerRef = useRef(null);

    useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryParam = searchParams.get('category');
    
    if (categoryParam) {
      setSelectedCategory(categoryParam);
      // Optionnel : faire défiler vers le haut
      window.scrollTo(0, 0);
    }
  }, [location.search]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterDrawerRef.current && !filterDrawerRef.current.contains(event.target) && showMobileFilters) {
        setShowMobileFilters(false);
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
      } else { // Handles "more than" case if only a min is provided like "10000-"
        priceRangeMatch = product.price >= min;
      }
    }

    // Custom price range filter
    let customPriceMatch = true;
    if (minPrice !== '' || maxPrice !== '') {
      const productPriceInEuros = product.price / 100; // Convert product price from cents to euros
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
    useEffect(() => {
    // Lorsque l'URL change, vérifiez s'il y a un paramètre de catégorie
    const queryParams = new URLSearchParams(location.search);
    const categoryParam = queryParams.get('category');
    
    if (categoryParam) {
      setSelectedCategory(categoryParam);
      // Vous pouvez aussi fermer les filtres mobiles s'ils sont ouverts
      setShowMobileFilters(false);
    }
  }, [location.search]);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-10 pt-20"> {/* Adjusted padding-top */}
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <Heading
            title="Notre Boutique"
            subtitle="Découvrez notre sélection exclusive d'appareils électroniques"
          />

          <div className="flex items-center space-x-3 w-full md:w-auto justify-end">
            {/* Search Bar */}
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-dark shadow-sm transition"
              />
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-md hover:shadow-lg transition text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700"
              aria-label="Toggle filters"
            >
              {showMobileFilters ? <FiX /> : <FiFilter />}
              <span className="hidden sm:inline">Filtres</span>
            </button>

            {/* Sort Dropdown */}
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="w-auto bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm hover:shadow-md transition text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-dark cursor-pointer"
            >
              <option value="default">Trier par défaut</option>
              <option value="price-asc">Prix : Du moins cher</option>
              <option value="price-desc">Prix : Du plus cher</option>
              <option value="rating-desc">Meilleures notes</option>
              <option value="name-asc">Nom : A-Z</option>
              <option value="name-desc">Nom : Z-A</option>
            </select>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar (Desktop) / Drawer (Mobile) */}
          <div
            ref={filterDrawerRef}
            className={`
              fixed top-0 left-0 h-full w-3/4 sm:w-2/3 md:w-1/2 lg:relative lg:w-1/4
              bg-white dark:bg-gray-800 p-6 rounded-xl lg:shadow-md shadow-2xl z-50
              transform transition-transform duration-300 ease-in-out
              ${showMobileFilters ? 'translate-x-0' : '-translate-x-full'}
              lg:translate-x-0 lg:flex-shrink-0 lg:sticky lg:top-24 lg:self-start lg:h-auto lg:max-h-[calc(100vh-100px)] lg:overflow-y-auto
              border-r border-gray-100 dark:border-gray-700 lg:border-none
            `}
          >
            <div className="flex justify-between items-center mb-6 lg:hidden">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Filtres</h3>
              <button onClick={() => setShowMobileFilters(false)} className="text-gray-600 dark:text-gray-300 hover:text-primary-dark text-2xl" aria-label="Close filters">
                <FiX />
              </button>
            </div>

            <div className="space-y-6">
              {/* Filter: Categories */}
              <div className="border-b border-gray-100 dark:border-gray-700 pb-4">
                <button
                  onClick={() => toggleFilterSection('category')}
                  className="flex justify-between items-center w-full py-2 text-lg font-semibold text-gray-800 dark:text-white hover:text-primary-dark transition"
                >
                  <span>Catégories</span>
                  {expandedFilter === 'category' ? <FiChevronUp /> : <FiChevronDown />}
                </button>
                {expandedFilter === 'category' && (
                  <div className="mt-3 space-y-2 text-gray-700 dark:text-gray-300">
                    {categories.map(category => (
                      <label key={category.value} className="flex items-center cursor-pointer hover:text-primary-dark transition">
                        <input
                          type="radio"
                          name="category"
                          value={category.value}
                          checked={selectedCategory === category.value}
                          onChange={() => setSelectedCategory(category.value)}
                          className="mr-2 h-4 w-4 text-primary-dark focus:ring-primary-dark border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                        />
                        {category.name}
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Filter: Brands */}
              <div className="border-b border-gray-100 dark:border-gray-700 pb-4">
                <button
                  onClick={() => toggleFilterSection('brand')}
                  className="flex justify-between items-center w-full py-2 text-lg font-semibold text-gray-800 dark:text-white hover:text-primary-dark transition"
                >
                  <span>Marques</span>
                  {expandedFilter === 'brand' ? <FiChevronUp /> : <FiChevronDown />}
                </button>
                {expandedFilter === 'brand' && (
                  <div className="mt-3 space-y-2 text-gray-700 dark:text-gray-300">
                    {brands.map(brand => (
                      <label key={brand.value} className="flex items-center cursor-pointer hover:text-primary-dark transition">
                        <input
                          type="radio"
                          name="brand"
                          value={brand.value}
                          checked={selectedBrand === brand.value}
                          onChange={() => setSelectedBrand(brand.value)}
                          className="mr-2 h-4 w-4 text-primary-dark focus:ring-primary-dark border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                        />
                        {brand.name}
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Filter: Price Range (Predefined) */}
              <div className="border-b border-gray-100 dark:border-gray-700 pb-4">
                <button
                  onClick={() => toggleFilterSection('priceRange')}
                  className="flex justify-between items-center w-full py-2 text-lg font-semibold text-gray-800 dark:text-white hover:text-primary-dark transition"
                >
                  <span>Fourchette de Prix</span>
                  {expandedFilter === 'priceRange' ? <FiChevronUp /> : <FiChevronDown />}
                </button>
                {expandedFilter === 'priceRange' && (
                  <div className="mt-3 space-y-2 text-gray-700 dark:text-gray-300">
                    {priceRanges.map(range => (
                      <label key={range.id} className="flex items-center cursor-pointer hover:text-primary-dark transition">
                        <input
                          type="radio"
                          name="priceRange"
                          value={range.value}
                          checked={selectedPriceRange === range.value}
                          onChange={() => { setSelectedPriceRange(range.value); setMinPrice(''); setMaxPrice(''); }}
                          className="mr-2 h-4 w-4 text-primary-dark focus:ring-primary-dark border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                        />
                        {range.name}
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Filter: Custom Price Range Input */}
              <div className="border-b border-gray-100 dark:border-gray-700 pb-4">
                <button
                  onClick={() => toggleFilterSection('customPrice')}
                  className="flex justify-between items-center w-full py-2 text-lg font-semibold text-gray-800 dark:text-white hover:text-primary-dark transition"
                >
                  <span>Prix Personnalisé (€)</span>
                  {expandedFilter === 'customPrice' ? <FiChevronUp /> : <FiChevronDown />}
                </button>
                {expandedFilter === 'customPrice' && (
                  <div className="mt-3 flex space-x-2 text-gray-700 dark:text-gray-300">
                    <input
                      type="number"
                      placeholder="Min"
                      value={minPrice}
                      onChange={(e) => { setMinPrice(e.target.value); setSelectedPriceRange('all'); }}
                      className="w-1/2 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-primary-dark"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={maxPrice}
                      onChange={(e) => { setMaxPrice(e.target.value); setSelectedPriceRange('all'); }}
                      className="w-1/2 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-primary-dark"
                    />
                  </div>
                )}
              </div>

              {/* Filter: Rating */}
              <div className="pb-4">
                <button
                  onClick={() => toggleFilterSection('rating')}
                  className="flex justify-between items-center w-full py-2 text-lg font-semibold text-gray-800 dark:text-white hover:text-primary-dark transition"
                >
                  <span>Notes Clients</span>
                  {expandedFilter === 'rating' ? <FiChevronUp /> : <FiChevronDown />}
                </button>
                {expandedFilter === 'rating' && (
                  <div className="mt-3 space-y-2 text-gray-700 dark:text-gray-300">
                    {ratings.map(rating => (
                      <label key={rating.id} className="flex items-center cursor-pointer hover:text-primary-dark transition">
                        <input
                          type="radio"
                          name="rating"
                          value={rating.value}
                          checked={selectedRating === rating.value}
                          onChange={() => setSelectedRating(rating.value)}
                          className="mr-2 h-4 w-4 text-primary-dark focus:ring-primary-dark border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                        />
                        <div className="flex items-center">
                          {Array(rating.value).fill(0).map((_, i) => (
                            <FiStar key={i} className="text-yellow-400" />
                          ))}
                          <span className="ml-1">& plus</span>
                        </div>
                      </label>
                    ))}
                    <label className="flex items-center cursor-pointer hover:text-primary-dark transition">
                      <input
                        type="radio"
                        name="rating"
                        value={0}
                        checked={selectedRating === 0}
                        onChange={() => setSelectedRating(0)}
                        className="mr-2 h-4 w-4 text-primary-dark focus:ring-primary-dark border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                      />
                      Toutes les notes
                    </label>
                  </div>
                )}
              </div>

              {/* Clear Filters Button */}
              <div className="pt-4">
                <Button
                  text="Effacer tous les filtres"
                  bgColor="bg-red-500"
                  textColor="text-white"
                  handler={clearFilters}
                  fullWidth={true}
                  className="w-full"
                />
              </div>
            </div>
          </div>



{/* Product List Grid */}
<div className="w-full lg:w-3/4">
  {sortedAndFilteredProducts.length > 0 ? (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" // Ajustez le gap si nécessaire
    >
      {sortedAndFilteredProducts.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            delay: index * 0.1,
            duration: 0.5,
            type: "spring",
            stiffness: 100
          }}
        >
          <ProductCard 
            product={{
              id: product.id,
              slug: product.slug, // Assurez-vous que slug est disponible
              // Assurez-vous que product.images[0] est disponible ou adaptez
              img: product.images && product.images.length > 0 ? product.images[0] : 'placeholder_image_url', 
              title: product.title,
              price: product.price,
              originalPrice: product.originalPrice, // Assurez-vous que cette propriété existe
              category: product.category,
              rating: product.rating,
              description: product.description,
              features: product.features,
              specifications: product.specifications
            }} 
            showAddToCart={true}
            // Considérez de passer un gestionnaire pour AddToCart si ProductCard en a besoin
          />
        </motion.div>
      ))}
    </motion.div>
  ) : (
    <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl shadow-lg flex flex-col items-center justify-center">
      <p className="text-6xl text-gray-300 dark:text-gray-700 mb-4 animate-pulse">¯\_(ツ)_/¯</p>
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Aucun produit trouvé</h3>
      <p className="text-gray-600 dark:text-gray-400">Essayez de modifier vos critères de recherche ou de filtrage.</p>
      <button onClick={clearFilters} className="mt-6 px-6 py-3 bg-primary text-white rounded-full shadow-md hover:bg-primary-dark transition-colors duration-300">
        Réinitialiser les filtres
      </button>
    </div>
  )}
</div>
        </div>
      </div>
    </div>
  );
};

export default Shop;