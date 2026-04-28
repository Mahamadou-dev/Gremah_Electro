import { blogs } from '../data/blogs/blogs';

const STORAGE_KEY = 'gremah_admin_blogs';

const loadFromStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch (e) { console.error('Erreur chargement blogs:', e); }
  return null;
};

const saveToStorage = (items) => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); }
  catch (e) { console.error('Erreur sauvegarde blogs:', e); }
};

const getBlogs = () => {
  const stored = loadFromStorage();
  if (stored) return stored;
  saveToStorage(blogs);
  return [...blogs];
};

const getBlogById = (id) => {
  const items = getBlogs();
  return items.find(b => b.id === id) || null;
};

const addBlog = (blog) => {
  const items = getBlogs();
  const newBlog = {
    ...blog,
    id: blog.id || `blog-${Date.now()}`,
    slug: blog.slug || blog.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  };
  const updated = [...items, newBlog];
  saveToStorage(updated);
  return newBlog;
};

const updateBlog = (id, updates) => {
  const items = getBlogs();
  const index = items.findIndex(b => b.id === id);
  if (index === -1) return null;
  const updated = [...items];
  updated[index] = { ...updated[index], ...updates };
  saveToStorage(updated);
  return updated[index];
};

const deleteBlog = (id) => {
  const items = getBlogs();
  const updated = items.filter(b => b.id !== id);
  saveToStorage(updated);
  return updated.length < items.length;
};

const resetBlogs = () => {
  saveToStorage(blogs);
  return [...blogs];
};

export { getBlogs, getBlogById, addBlog, updateBlog, deleteBlog, resetBlogs };
