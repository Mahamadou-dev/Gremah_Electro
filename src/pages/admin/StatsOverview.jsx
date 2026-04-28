import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaBox, FaNewspaper, FaTags, FaShoppingCart, FaArrowUp, FaArrowDown, FaChartLine, FaChartPie, FaChartBar, FaDollarSign, FaStar } from 'react-icons/fa';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area, LineChart, Line, Legend
} from 'recharts';
import { getProducts } from '../../services/productService';
import { getBlogs } from '../../services/blogService';

// Palette de couleurs premium harmonisée
const CHART_COLORS = {
  primary: '#f42c37',
  secondary: '#6366f1',
  accent1: '#10b981',
  accent2: '#f59e0b',
  accent3: '#8b5cf6',
  accent4: '#06b6d4',
  accent5: '#ec4899',
  gray: '#9ca3af',
  grid: '#f3f4f6',
};

const COLOR_ARRAY = [CHART_COLORS.primary, CHART_COLORS.secondary, CHART_COLORS.accent1, CHART_COLORS.accent2, CHART_COLORS.accent3, CHART_COLORS.accent4, CHART_COLORS.accent5];

// Composant compteur animé
const AnimatedCounter = ({ value, duration = 1500, prefix = '', suffix = '' }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = typeof value === 'number' ? value : parseInt(value, 10) || 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [value, duration]);
  return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
};

// Tooltip personnalisé premium
const CustomTooltip = ({ active, payload, label, valuePrefix = '', valueSuffix = '', color }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700">
        <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color || color }} />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {entry.name}: <span className="font-bold text-gray-900 dark:text-white">{valuePrefix}{entry.value?.toLocaleString?.() || entry.value}{valueSuffix}</span>
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const StatsOverview = () => {
  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Chargement asynchrone pour permettre l'animation
    setTimeout(() => {
      setProducts(getProducts());
      setBlogs(getBlogs());
      setLoading(false);
    }, 300);
  }, []);

  const stats = useMemo(() => {
    const categories = [...new Set(products.map(p => p.category))];
    const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);
    const avgRating = products.length > 0
      ? (products.reduce((sum, p) => sum + (p.rating || 0), 0) / products.length).toFixed(1)
      : '0';
    const newProducts = products.filter(p => p.isNew).length;
    const bestSellers = products.filter(p => p.isBestSeller).length;

    return {
      categories,
      totalStock,
      avgRating,
      newProducts,
      bestSellers,
    };
  }, [products]);

  // Données pour les graphiques
  const categoryData = useMemo(() => {
    return stats.categories.map((cat, i) => ({
      name: cat,
      count: products.filter(p => p.category === cat).length,
      stock: products.filter(p => p.category === cat).reduce((s, p) => s + (p.stock || 0), 0),
      color: COLOR_ARRAY[i % COLOR_ARRAY.length],
    }));
  }, [stats.categories, products]);

  const stockData = useMemo(() => {
    return stats.categories.map((cat, i) => ({
      name: cat,
      value: products.filter(p => p.category === cat).reduce((s, p) => s + (p.stock || 0), 0),
      color: COLOR_ARRAY[i % COLOR_ARRAY.length],
    }));
  }, [stats.categories, products]);

  const revenueData = [
    { month: 'Jan', revenue: 1200000, target: 1000000, orders: 45 },
    { month: 'Fév', revenue: 1800000, target: 1500000, orders: 62 },
    { month: 'Mar', revenue: 1500000, target: 1600000, orders: 58 },
    { month: 'Avr', revenue: 2200000, target: 1800000, orders: 85 },
    { month: 'Mai', revenue: 1900000, target: 2000000, orders: 72 },
    { month: 'Juin', revenue: 2800000, target: 2200000, orders: 98 },
  ];

  const trendData = [
    { day: 'Lun', visits: 1200, sales: 45 },
    { day: 'Mar', visits: 1500, sales: 62 },
    { day: 'Mer', visits: 1100, sales: 38 },
    { day: 'Jeu', visits: 1800, sales: 85 },
    { day: 'Ven', visits: 2200, sales: 98 },
    { day: 'Sam', visits: 2800, sales: 120 },
    { day: 'Dim', visits: 2400, sales: 105 },
  ];

  const cards = [
    {
      label: 'Produits',
      value: products.length,
      icon: <FaBox className="text-xl" />,
      change: '+12%',
      trend: 'up',
      color: CHART_COLORS.primary,
      bgGradient: 'from-rose-500/10 to-orange-500/10',
      detail: `${stats.newProducts} nouveaux`,
    },
    {
      label: 'Articles blog',
      value: blogs.length,
      icon: <FaNewspaper className="text-xl" />,
      change: '+5%',
      trend: 'up',
      color: CHART_COLORS.secondary,
      bgGradient: 'from-indigo-500/10 to-purple-500/10',
      detail: '3 publiés ce mois',
    },
    {
      label: 'Catégories',
      value: stats.categories.length,
      icon: <FaTags className="text-xl" />,
      change: '+2',
      trend: 'up',
      color: CHART_COLORS.accent2,
      bgGradient: 'from-amber-500/10 to-yellow-500/10',
      detail: `${stats.bestSellers} best-sellers`,
    },
    {
      label: 'Stock total',
      value: stats.totalStock,
      icon: <FaShoppingCart className="text-xl" />,
      change: '-3%',
      trend: 'down',
      color: CHART_COLORS.accent1,
      bgGradient: 'from-emerald-500/10 to-teal-500/10',
      detail: `${stats.avgRating}★ moyenne`,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 100, damping: 12 },
    },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6">
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Tableau de bord</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Vue d'ensemble de votre activité</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
          <FaChartLine className="text-green-500" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">+24% vs mois dernier</span>
        </div>
      </motion.div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            whileHover={{ y: -6, scale: 1.02 }}
            className={`relative overflow-hidden bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-5 bg-gradient-to-br ${card.bgGradient}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{card.label}</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                  <AnimatedCounter value={card.value} />
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
                    card.trend === 'up' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {card.trend === 'up' ? <FaArrowUp className="text-[10px]" /> : <FaArrowDown className="text-[10px]" />}
                    {card.change}
                  </span>
                  <span className="text-xs text-gray-400">{card.detail}</span>
                </div>
              </div>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg"
                style={{ backgroundColor: card.color }}
              >
                {card.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Revenue Chart - takes 2 columns */}
        <motion.div variants={itemVariants} className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center text-white">
                <FaDollarSign />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Chiffre d'affaires</h3>
                <p className="text-xs text-gray-500">Évolution mensuelle</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#f42c37]" />
                <span className="text-gray-600 dark:text-gray-400">Revenus</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-300" />
                <span className="text-gray-600 dark:text-gray-400">Objectifs</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={revenueData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f42c37" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f42c37" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} dy={10} />
              <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
              <Tooltip content={<CustomTooltip valueSuffix=' CFA' color={CHART_COLORS.primary} />} />
              <Area type="monotone" dataKey="revenue" stroke="#f42c37" strokeWidth={3} fill="url(#revenueGradient)" />
              <Line type="monotone" dataKey="target" stroke="#d1d5db" strokeWidth={2} strokeDasharray="5 5" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie Chart - Stock Distribution */}
        <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white">
              <FaChartPie />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Répartition du stock</h3>
              <p className="text-xs text-gray-500">Par catégorie</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={stockData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
                animationBegin={100}
                animationDuration={800}
              >
                {stockData.map((entry, i) => (
                  <Cell key={`cell-${i}`} fill={entry.color} strokeWidth={0} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip valueSuffix=' unités' />} />
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                formatter={(value) => <span className="text-xs text-gray-600 dark:text-gray-400">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Secondary Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart - Products by Category */}
        <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white">
              <FaChartBar />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Produits par catégorie</h3>
              <p className="text-xs text-gray-500">Distribution actuelle</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={categoryData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} dy={10} />
              <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip valueSuffix=' produits' />} cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
              <Bar dataKey="count" radius={[8, 8, 0, 0]} animationDuration={1000}>
                {categoryData.map((entry, i) => (
                  <Cell key={`bar-${i}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Line Chart - Weekly Activity */}
        <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white">
                <FaChartLine />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Activité hebdomadaire</h3>
                <p className="text-xs text-gray-500">Visites et ventes</p>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={trendData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} dy={10} />
              <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="visits" stroke={CHART_COLORS.secondary} strokeWidth={3} dot={{ fill: CHART_COLORS.secondary, strokeWidth: 0, r: 4 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="sales" stroke={CHART_COLORS.primary} strokeWidth={3} dot={{ fill: CHART_COLORS.primary, strokeWidth: 0, r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Recent Products */}
      <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white">
              <FaBox />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Produits récents</h3>
              <p className="text-xs text-gray-500">Derniers ajouts au catalogue</p>
            </div>
          </div>
          <button className="text-sm text-primary hover:text-primary/80 font-medium transition-colors">
            Voir tout →
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {products.slice(0, 5).map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group relative bg-gray-50 dark:bg-gray-700/50 rounded-xl overflow-hidden cursor-pointer"
            >
              <div className="aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600">
                <img
                  src={p.images?.[0] || '/fallback-product-image.jpg'}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => { e.target.src = '/fallback-product-image.jpg'; }}
                />
              </div>
              <div className="p-3">
                <p className="text-xs text-primary font-semibold uppercase tracking-wider">{p.category}</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white truncate mt-0.5">{p.title}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-bold text-gray-900 dark:text-white">{p.price?.toLocaleString()} <span className="text-xs font-normal text-gray-500">CFA</span></span>
                  <div className="flex items-center gap-1 text-yellow-500 text-xs">
                    <FaStar className="text-[10px]" />
                    {p.rating || '4.5'}
                  </div>
                </div>
              </div>
              {p.isNew && (
                <span className="absolute top-2 left-2 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg">
                  NOUVEAU
                </span>
              )}
              {p.isBestSeller && (
                <span className="absolute top-2 right-2 bg-yellow-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg">
                  TOP
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default StatsOverview;
