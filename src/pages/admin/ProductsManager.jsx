import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaTh, FaList, FaTimes, FaImage, FaStar, FaCheck, FaSyncAlt } from 'react-icons/fa';
import { getProducts, addProduct, updateProduct, deleteProduct, resetProducts } from '../../services/productService';

const slugify = (str) =>
  str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const emptyForm = {
  title: '', slug: '', price: '', originalPrice: '', category: '', stock: '',
  description: '', rating: '4.5', isNew: false, isBestSeller: false,
  images: '', features: '', colors: ''
};

const ProductsManager = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(() => {
    try {
      setLoading(true);
      setError(null);
      const data = getProducts();
      if (!Array.isArray(data)) {
        throw new Error('Données produits invalides');
      }
      setProducts(data);
    } catch (err) {
      setError(err.message);
      console.error('Erreur chargement produits:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const handleReset = () => {
    if (confirm('Réinitialiser tous les produits aux données par défaut ?')) {
      resetProducts();
      refresh();
    }
  };

  const categories = [...new Set(products.map(p => p.category).filter(Boolean))];

  const openAdd = () => {
    setEditingProduct(null);
    setForm(emptyForm);
    setIsModalOpen(true);
  };

  const openEdit = (product) => {
    setEditingProduct(product);
    setForm({
      title: product.title || '',
      slug: product.slug || '',
      price: product.price ?? '',
      originalPrice: product.originalPrice ?? '',
      category: product.category || '',
      stock: product.stock ?? '',
      description: product.description || '',
      rating: String(product.rating || 4.5),
      isNew: product.isNew || false,
      isBestSeller: product.isBestSeller || false,
      images: (product.images || []).join(', '),
      features: (product.features || []).join('\n'),
      colors: (product.colors || []).join(', '),
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    deleteProduct(id);
    setDeleteConfirm(null);
    refresh();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      slug: form.slug || slugify(form.title),
      price: Number(form.price),
      originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
      stock: Number(form.stock),
      rating: Number(form.rating),
      images: form.images ? form.images.split(',').map(s => s.trim()).filter(Boolean) : ['/fallback-product-image.jpg'],
      features: form.features ? form.features.split('\n').map(s => s.trim()).filter(Boolean) : [],
      colors: form.colors ? form.colors.split(',').map(s => s.trim()).filter(Boolean) : [],
    };
    if (editingProduct) {
      updateProduct(editingProduct.id, payload);
    } else {
      addProduct(payload);
    }
    setIsModalOpen(false);
    refresh();
  };

  const updateForm = (key, val) => {
    setForm(prev => {
      const next = { ...prev, [key]: val };
      if (key === 'title' && !prev.slug) {
        next.slug = slugify(val);
      }
      return next;
    });
  };

  const filtered = products.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    (p.category || '').toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4" />
        <p className="text-gray-500">Chargement des produits...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
          <FaTimes className="text-red-500 text-2xl" />
        </div>
        <p className="text-red-500 font-medium mb-2">Erreur de chargement</p>
        <p className="text-gray-400 text-sm mb-4">{error}</p>
        <div className="flex gap-3">
          <button onClick={refresh} className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors">Réessayer</button>
          <button onClick={handleReset} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">Réinitialiser les données</button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{filtered.length} produit(s) trouvé(s) sur {products.length}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:flex-none">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full sm:w-64 pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all text-sm"
            />
          </div>
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
            <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white dark:bg-gray-700 shadow-sm text-primary' : 'text-gray-500'}`}><FaTh /></button>
            <button onClick={() => setViewMode('table')} className={`p-2 rounded-lg transition-colors ${viewMode === 'table' ? 'bg-white dark:bg-gray-700 shadow-sm text-primary' : 'text-gray-500'}`}><FaList /></button>
          </div>
          <button onClick={handleReset} title="Réinitialiser les données" className="p-2.5 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-xl transition-colors">
            <FaSyncAlt />
          </button>
          <button onClick={openAdd} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors shadow-sm hover:shadow-lg hover:shadow-primary/20 font-medium text-sm">
            <FaPlus /> Ajouter
          </button>
        </div>
      </div>

      {/* Grid view */}
      {viewMode === 'grid' && (
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <AnimatePresence>
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ y: -4 }}
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-shadow overflow-hidden"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-700">
                  <img
                    src={p.images?.[0] || '/fallback-product-image.jpg'}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {p.isNew && <span className="bg-primary text-white text-[10px] font-bold px-2.5 py-1 rounded-full">NOUVEAU</span>}
                    {p.isBestSeller && <span className="bg-yellow-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">BEST-SELLER</span>}
                  </div>
                  {/* Hover actions */}
                  <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEdit(p)} className="p-2.5 bg-white/90 backdrop-blur rounded-xl text-blue-600 hover:bg-blue-50 shadow-lg"><FaEdit /></button>
                    <button onClick={() => setDeleteConfirm(p.id)} className="p-2.5 bg-white/90 backdrop-blur rounded-xl text-red-500 hover:bg-red-50 shadow-lg"><FaTrash /></button>
                  </div>
                </div>
                {/* Info */}
                <div className="p-4">
                  <span className="text-[11px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">{p.category}</span>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mt-2 line-clamp-2">{p.title}</h3>
                  <div className="flex items-center justify-between mt-3">
                    <div>
                      <span className="text-lg font-bold text-gray-900 dark:text-white">{p.price?.toLocaleString()}</span>
                      <span className="text-xs text-gray-500 ml-1">CFA</span>
                      {p.originalPrice && (
                        <span className="text-xs text-gray-400 line-through ml-2">{p.originalPrice.toLocaleString()}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-yellow-500 text-xs">
                      <FaStar /> {p.rating || '—'}
                    </div>
                  </div>
                  {/* Stock bar */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                      <span>Stock</span>
                      <span className={p.stock < 5 ? 'text-red-500 font-medium' : ''}>{p.stock}</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${p.stock < 5 ? 'bg-red-500' : p.stock < 15 ? 'bg-yellow-500' : 'bg-green-500'}`}
                        style={{ width: `${Math.min(100, (p.stock / 50) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {filtered.length === 0 && (
            <div className="col-span-full py-16 text-center text-gray-400">
              <FaBox className="text-4xl mx-auto mb-3 opacity-50" />
              <p>Aucun produit trouvé</p>
            </div>
          )}
        </motion.div>
      )}

      {/* Table view */}
      {viewMode === 'table' && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="px-5 py-4 font-semibold text-gray-600 dark:text-gray-300">Produit</th>
                  <th className="px-5 py-4 font-semibold text-gray-600 dark:text-gray-300">Catégorie</th>
                  <th className="px-5 py-4 font-semibold text-gray-600 dark:text-gray-300">Prix</th>
                  <th className="px-5 py-4 font-semibold text-gray-600 dark:text-gray-300">Stock</th>
                  <th className="px-5 py-4 font-semibold text-gray-600 dark:text-gray-300 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {filtered.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img src={p.images?.[0] || '/fallback-product-image.jpg'} alt="" className="w-10 h-10 rounded-lg object-cover" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{p.title}</p>
                          <div className="flex gap-1 mt-0.5">
                            {p.isNew && <span className="text-[9px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-bold">NEW</span>}
                            {p.isBestSeller && <span className="text-[9px] bg-yellow-500/10 text-yellow-600 px-1.5 py-0.5 rounded-full font-bold">TOP</span>}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4"><span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{p.category}</span></td>
                    <td className="px-5 py-4 font-medium text-gray-900 dark:text-white">{p.price?.toLocaleString()} CFA</td>
                    <td className="px-5 py-4"><span className={p.stock < 5 ? 'text-red-500 font-medium' : 'text-gray-600 dark:text-gray-300'}>{p.stock}</span></td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => openEdit(p)} className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"><FaEdit /></button>
                        <button onClick={() => setDeleteConfirm(p.id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"><FaTrash /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={5} className="px-5 py-12 text-center text-gray-400">Aucun produit trouvé</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setDeleteConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 max-w-sm w-full"
            >
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Confirmer la suppression</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Cette action est irréversible. Le produit sera définitivement supprimé.</p>
              <div className="flex gap-3 justify-end">
                <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors">Annuler</button>
                <button onClick={() => handleDelete(deleteConfirm)} className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors">Supprimer</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={e => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl my-8 overflow-hidden"
            >
              {/* Modal header */}
              <div className="flex items-center justify-between px-6 py-5 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {editingProduct ? 'Modifier le produit' : 'Nouveau produit'}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-colors"><FaTimes className="text-gray-500" /></button>
              </div>

              <form onSubmit={handleSubmit} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left column */}
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Titre du produit *</label>
                      <input
                        value={form.title}
                        onChange={e => updateForm('title', e.target.value)}
                        placeholder="Ex: Apple iPhone 16 256 Go"
                        className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Slug (auto-généré)</label>
                      <div className="flex gap-2">
                        <input
                          value={form.slug}
                          onChange={e => setForm({ ...form, slug: e.target.value })}
                          placeholder="auto-généré depuis le titre"
                          className="flex-1 px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 text-sm"
                        />
                        <button type="button" onClick={() => setForm({ ...form, slug: slugify(form.title) })} className="px-3 py-2.5 bg-gray-100 dark:bg-gray-700 rounded-xl text-xs text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">Régénérer</button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Prix (CFA) *</label>
                        <input
                          type="number"
                          value={form.price}
                          onChange={e => setForm({ ...form, price: e.target.value })}
                          placeholder="349990"
                          className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/30 transition-all text-sm"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Prix barré (CFA)</label>
                        <input
                          type="number"
                          value={form.originalPrice}
                          onChange={e => setForm({ ...form, originalPrice: e.target.value })}
                          placeholder="379990"
                          className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/30 transition-all text-sm"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Catégorie *</label>
                        <select
                          value={form.category}
                          onChange={e => setForm({ ...form, category: e.target.value })}
                          className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/30 transition-all text-sm"
                          required
                        >
                          <option value="">Sélectionner...</option>
                          {categories.map(c => <option key={c} value={c}>{c}</option>)}
                          <option value="__new__">+ Nouvelle catégorie</option>
                        </select>
                        {form.category === '__new__' && (
                          <input
                            autoFocus
                            placeholder="Nom de la nouvelle catégorie"
                            onChange={e => setForm({ ...form, category: e.target.value })}
                            className="w-full mt-2 px-4 py-2.5 border border-primary/30 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/30 text-sm"
                          />
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Stock *</label>
                        <input
                          type="number"
                          value={form.stock}
                          onChange={e => setForm({ ...form, stock: e.target.value })}
                          placeholder="20"
                          className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/30 transition-all text-sm"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Description</label>
                      <textarea
                        value={form.description}
                        onChange={e => setForm({ ...form, description: e.target.value })}
                        placeholder="Description du produit en texte simple..."
                        rows={4}
                        className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/30 transition-all text-sm resize-none"
                      />
                    </div>
                  </div>

                  {/* Right column */}
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Images (URLs)</label>
                      <textarea
                        value={form.images}
                        onChange={e => setForm({ ...form, images: e.target.value })}
                        placeholder="Collez les URLs des images, une par ligne ou séparées par des virgules"
                        rows={3}
                        className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/30 transition-all text-sm resize-none font-mono"
                      />
                      {/* Image preview */}
                      {form.images && (
                        <div className="flex gap-2 mt-2 flex-wrap">
                          {form.images.split(',').map((url, i) => url.trim() && (
                            <div key={i} className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
                              <img src={url.trim()} alt="" className="w-full h-full object-cover" onError={e => { e.target.src = '/fallback-product-image.jpg'; }} />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Caractéristiques (une par ligne)</label>
                      <textarea
                        value={form.features}
                        onChange={e => setForm({ ...form, features: e.target.value })}
                        placeholder={"Écran Super Retina XDR\nPuce A18 Bionic\nDouble appareil photo 48MP"}
                        rows={4}
                        className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/30 transition-all text-sm resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Couleurs disponibles (séparées par virgule)</label>
                      <input
                        value={form.colors}
                        onChange={e => setForm({ ...form, colors: e.target.value })}
                        placeholder="Noir, Blanc, Bleu"
                        className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/30 transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Note (1-5)</label>
                      <input
                        type="number"
                        step="0.1"
                        min="1"
                        max="5"
                        value={form.rating}
                        onChange={e => setForm({ ...form, rating: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/30 transition-all text-sm"
                      />
                    </div>
                    <div className="flex gap-6">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${form.isNew ? 'bg-primary border-primary' : 'border-gray-300 dark:border-gray-600'}`}>
                          {form.isNew && <FaCheck className="text-white text-[10px]" />}
                        </div>
                        <input type="checkbox" checked={form.isNew} onChange={e => setForm({ ...form, isNew: e.target.checked })} className="hidden" />
                        <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors">Produit nouveau</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${form.isBestSeller ? 'bg-yellow-500 border-yellow-500' : 'border-gray-300 dark:border-gray-600'}`}>
                          {form.isBestSeller && <FaCheck className="text-white text-[10px]" />}
                        </div>
                        <input type="checkbox" checked={form.isBestSeller} onChange={e => setForm({ ...form, isBestSeller: e.target.checked })} className="hidden" />
                        <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-yellow-500 transition-colors">Best-seller</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <div className="flex justify-end gap-3 pt-6 mt-6 border-t dark:border-gray-700">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors font-medium text-sm">
                    Annuler
                  </button>
                  <button type="submit" className="px-6 py-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors shadow-sm hover:shadow-lg hover:shadow-primary/20 font-medium text-sm flex items-center gap-2">
                    <FaCheck /> {editingProduct ? 'Enregistrer les modifications' : 'Créer le produit'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductsManager;
