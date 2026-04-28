import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChartBar, FaBox, FaNewspaper, FaSignOutAlt, FaBars, FaTimes, FaHome, FaUserShield } from 'react-icons/fa';
import logo from '../../assets/about/GremahElectro.png';

const navItems = [
  { to: '/admin', icon: <FaChartBar />, label: 'Tableau de bord', end: true },
  { to: '/admin/produits', icon: <FaBox />, label: 'Produits', end: false },
  { to: '/admin/blogs', icon: <FaNewspaper />, label: 'Blogs', end: false },
];

const Sidebar = ({ isOpen, onClose, onLogout }) => (
  <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-72 bg-gradient-to-b from-gray-900 to-gray-800 shadow-2xl flex-shrink-0 transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
    {/* Logo */}
    <div className="p-6 border-b border-white/10">
      <Link to="/" className="flex items-center gap-3 group">
        <div className="w-10 h-10 bg-white/10 rounded-xl p-1.5 group-hover:bg-primary/20 transition-colors">
          <img src={logo} alt="Gremah" className="w-full h-full object-contain" />
        </div>
        <div>
          <span className="text-lg font-bold text-white block leading-tight">Gremah</span>
          <span className="text-xs text-white/40">Administration</span>
        </div>
      </Link>
    </div>

    {/* Navigation */}
    <nav className="p-4 space-y-1.5">
      {navItems.map((item, i) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          onClick={onClose}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
              isActive
                ? 'bg-primary text-white shadow-lg shadow-primary/25'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <span className={`text-lg ${isActive ? 'text-white' : 'group-hover:text-primary transition-colors'}`}>
                {item.icon}
              </span>
              <span className="font-medium">{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute left-0 w-1 h-8 bg-white rounded-r-full"
                />
              )}
            </>
          )}
        </NavLink>
      ))}

      <div className="pt-4 mt-4 border-t border-white/10">
        <NavLink
          to="/"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200"
        >
          <FaHome className="text-lg" />
          <span className="font-medium">Retour au site</span>
        </NavLink>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200 text-left"
        >
          <FaSignOutAlt className="text-lg" />
          <span className="font-medium">Déconnexion</span>
        </button>
      </div>
    </nav>
  </aside>
);

const AdminLayout = () => {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const pageTitle = navItems.find(n => {
    if (n.end) return location.pathname === n.to;
    return location.pathname.startsWith(n.to);
  })?.label || 'Administration';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex">
      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          />
        )}
      </AnimatePresence>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onLogout={handleLogout} />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top header */}
        <header className="sticky top-0 z-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between px-4 lg:px-8 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <FaBars className="text-xl text-gray-600 dark:text-gray-300" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">{pageTitle}</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                  /admin{location.pathname === '/admin' ? '' : location.pathname.replace('/admin', '')}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full">
                <FaUserShield className="text-primary text-sm" />
                <span className="text-sm font-medium text-primary">Admin</span>
              </div>
              <button
                onClick={handleLogout}
                className="lg:hidden p-2 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                title="Déconnexion"
              >
                <FaSignOutAlt />
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
