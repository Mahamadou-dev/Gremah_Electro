import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaTh, FaList, FaTimes, FaCheck, FaCalendar, FaUser, FaTag } from 'react-icons/fa';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getBlogs, addBlog, updateBlog, deleteBlog } from '../../services/blogService';

const slugify = (str) =>
  str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image'],
    ['clean'],
  ],
};

const emptyForm = {
  title: '', slug: '', date: new Date().toISOString().split('T')[0], category: '', author: '', content: '', tags: '', featured: false, isNew: false
};

const BlogsManager = () => {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const refresh = useCallback(() => setBlogs(getBlogs()), []);

  useEffect(() => { refresh(); }, [refresh]);

  const openAdd = () => {
    setEditingBlog(null);
    setForm(emptyForm);
    setIsModalOpen(true);
  };

  const openEdit = (blog) => {
    setEditingBlog(blog);
    setForm({
      title: blog.title || '',
      slug: blog.slug || '',
      date: blog.date || '',
      category: blog.category || '',
      author: blog.author || '',
      content: blog.content || '',
      tags: (blog.tags || []).join(', '),
      featured: blog.featured || false,
      isNew: blog.isNew || false,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    deleteBlog(id);
    setDeleteConfirm(null);
    refresh();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      slug: form.slug || slugify(form.title),
      tags: form.tags.split(',').map(s => s.trim()).filter(Boolean),
      images: ['/fallback-blog-image.jpg'],
    };
    if (editingBlog) {
      updateBlog(editingBlog.id, payload);
    } else {
      addBlog(payload);
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

  const filtered = blogs.filter(b =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    (b.category || '').toLowerCase().includes(search.toLowerCase())
  );

  const stripHtml = (html) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{filtered.length} article(s) trouvé(s)</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:flex-none">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un article..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full sm:w-64 pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all text-sm"
            />
          </div>
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
            <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white dark:bg-gray-700 shadow-sm text-primary' : 'text-gray-500'}`}><FaTh /></button>
            <button onClick={() => setViewMode('table')} className={`p-2 rounded-lg transition-colors ${viewMode === 'table' ? 'bg-white dark:bg-gray-700 shadow-sm text-primary' : 'text-gray-500'}`}><FaList /></button>
          </div>
          <button onClick={openAdd} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors shadow-sm hover:shadow-lg hover:shadow-primary/20 font-medium text-sm">
            <FaPlus /> Ajouter
          </button>
        </div>
      </div>

      {/* Grid view */}
      {viewMode === 'grid' && (
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <AnimatePresence>
            {filtered.map((b, i) => (
              <motion.div
                key={b.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ y: -4 }}
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-shadow overflow-hidden"
              >
                {/* Image placeholder */}
                <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-purple-500/20 to-blue-500/20">
                  {b.images?.[0] && b.images[0] !== '/fallback-blog-image.jpg' ? (
                    <img src={b.images[0]} alt={b.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <FaTag className="text-4xl text-purple-300/50" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {b.featured && <span className="bg-yellow-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">À LA UNE</span>}
                    {b.isNew && <span className="bg-primary text-white text-[10px] font-bold px-2.5 py-1 rounded-full">NOUVEAU</span>}
                  </div>
                  {/* Hover actions */}
                  <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEdit(b)} className="p-2.5 bg-white/90 backdrop-blur rounded-xl text-blue-600 hover:bg-blue-50 shadow-lg"><FaEdit /></button>
                    <button onClick={() => setDeleteConfirm(b.id)} className="p-2.5 bg-white/90 backdrop-blur rounded-xl text-red-500 hover:bg-red-50 shadow-lg"><FaTrash /></button>
                  </div>
                </div>
                {/* Info */}
                <div className="p-4">
                  <span className="text-[11px] font-medium text-purple-600 bg-purple-500/10 px-2 py-0.5 rounded-full">{b.category || 'Général'}</span>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mt-2 line-clamp-2">{b.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">{stripHtml(b.content).slice(0, 100)}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><FaCalendar /> {b.date}</span>
                    <span className="flex items-center gap-1"><FaUser /> {b.author}</span>
                  </div>
                  {/* Tags */}
                  {b.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {b.tags.slice(0, 3).map((tag, ti) => (
                        <span key={ti} className="text-[10px] bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded-full">#{tag}</span>
                      ))}
                      {b.tags.length > 3 && <span className="text-[10px] text-gray-400">+{b.tags.length - 3}</span>}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {filtered.length === 0 && (
            <div className="col-span-full py-16 text-center text-gray-400">
              <FaTag className="text-4xl mx-auto mb-3 opacity-50" />
              <p>Aucun article trouvé</p>
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
                  <th className="px-5 py-4 font-semibold text-gray-600 dark:text-gray-300">Article</th>
                  <th className="px-5 py-4 font-semibold text-gray-600 dark:text-gray-300">Catégorie</th>
                  <th className="px-5 py-4 font-semibold text-gray-600 dark:text-gray-300">Date</th>
                  <th className="px-5 py-4 font-semibold text-gray-600 dark:text-gray-300">Auteur</th>
                  <th className="px-5 py-4 font-semibold text-gray-600 dark:text-gray-300 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {filtered.map(b => (
                  <tr key={b.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                    <td className="px-5 py-4">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{b.title}</p>
                        <div className="flex gap-1 mt-0.5">
                          {b.featured && <span className="text-[9px] bg-yellow-500/10 text-yellow-600 px-1.5 py-0.5 rounded-full font-bold">À LA UNE</span>}
                          {b.isNew && <span className="text-[9px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-bold">NEW</span>}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4"><span className="text-xs bg-purple-500/10 text-purple-600 px-2 py-1 rounded-full">{b.category || 'Général'}</span></td>
                    <td className="px-5 py-4 text-gray-500 dark:text-gray-400">{b.date}</td>
                    <td className="px-5 py-4 text-gray-500 dark:text-gray-400">{b.author}</td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => openEdit(b)} className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"><FaEdit /></button>
                        <button onClick={() => setDeleteConfirm(b.id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"><FaTrash /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={5} className="px-5 py-12 text-center text-gray-400">Aucun article trouvé</td></tr>
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
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Cet article sera définitivement supprimé.</p>
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
                  {editingBlog ? "Modifier l'article" : 'Nouvel article'}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-colors"><FaTimes className="text-gray-500" /></button>
              </div>

              <form onSubmit={handleSubmit} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left column */}
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Titre de l'article *</label>
                      <input
                        value={form.title}
                        onChange={e => updateForm('title', e.target.value)}
                        placeholder="Ex: Les meilleurs smartphones de 2026"
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
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Catégorie</label>
                        <input
                          value={form.category}
                          onChange={e => setForm({ ...form, category: e.target.value })}
                          placeholder="Ex: Actualités"
                          className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/30 transition-all text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Date</label>
                        <input
                          type="date"
                          value={form.date}
                          onChange={e => setForm({ ...form, date: e.target.value })}
                          className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/30 transition-all text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Auteur</label>
                      <input
                        value={form.author}
                        onChange={e => setForm({ ...form, author: e.target.value })}
                        placeholder="Ex: Équipe Gremah"
                        className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/30 transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Tags (séparés par virgule)</label>
                      <input
                        value={form.tags}
                        onChange={e => setForm({ ...form, tags: e.target.value })}
                        placeholder="smartphone, technologie, 2026"
                        className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/30 transition-all text-sm"
                      />
                      {/* Tag chips preview */}
                      {form.tags && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {form.tags.split(',').map((tag, i) => tag.trim() && (
                            <span key={i} className="text-[11px] bg-purple-500/10 text-purple-600 px-2.5 py-1 rounded-full">#{tag.trim()}</span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-6">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${form.featured ? 'bg-yellow-500 border-yellow-500' : 'border-gray-300 dark:border-gray-600'}`}>
                          {form.featured && <FaCheck className="text-white text-[10px]" />}
                        </div>
                        <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} className="hidden" />
                        <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-yellow-500 transition-colors">À la une</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${form.isNew ? 'bg-primary border-primary' : 'border-gray-300 dark:border-gray-600'}`}>
                          {form.isNew && <FaCheck className="text-white text-[10px]" />}
                        </div>
                        <input type="checkbox" checked={form.isNew} onChange={e => setForm({ ...form, isNew: e.target.checked })} className="hidden" />
                        <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors">Nouveau</span>
                      </label>
                    </div>
                  </div>

                  {/* Right column - Rich text editor */}
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Contenu de l'article</label>
                      <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-600">
                        <ReactQuill
                          theme="snow"
                          value={form.content}
                          onChange={val => setForm({ ...form, content: val })}
                          modules={quillModules}
                          placeholder="Rédigez votre article ici..."
                          style={{ height: '320px' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <div className="flex justify-end gap-3 pt-6 mt-6 border-t dark:border-gray-700">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors font-medium text-sm">
                    Annuler
                  </button>
                  <button type="submit" className="px-6 py-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors shadow-sm hover:shadow-lg hover:shadow-primary/20 font-medium text-sm flex items-center gap-2">
                    <FaCheck /> {editingBlog ? "Enregistrer l'article" : "Publier l'article"}
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

export default BlogsManager;
