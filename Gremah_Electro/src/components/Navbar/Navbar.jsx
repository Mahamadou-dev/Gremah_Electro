import React from 'react';
import { IoMdSearch } from "react-icons/io";
import { FaCaretDown, FaCartShopping } from "react-icons/fa6";
import DarkMode from './DarkMode';

const MenuLinks = [
  { id: 1, name: 'Accueil', href: '#' },
  { id: 2, name: 'Boutique', href: '#' },
  { id: 3, name: 'À propos', href: '#' },
  { id: 4, name: 'Contact', href: '#' },
];
const DropDownLinks = [
    { id: 1, name: 'produits tendance', href: '#' },
    { id: 2, name: 'nouveautés', href: '#' },
    { id: 3, name: 'promotions', href: '#' },
    { id: 4, name: 'meilleures ventes', href: '#' }
];


const Navbar = () => {
  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white shadow-sm">
      <div className="py-4">
        <div className="container mx-auto flex justify-between items-center px-4">

          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="#"
              className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-primary to-red-900 bg-clip-text text-transparent tracking-tight hover:tracking-wider transition-all duration-300"
            >
              Gremah Electro
            </a>
          </div>

          {/* Menu Links */}
          <nav className="hidden lg:flex gap-8">
            <ul className="flex items-center gap-6">
              {MenuLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className="text-gray-600 dark:text-gray-300 font-medium relative group transition"
                  >
                    {link.name}
                    <span className="block h-0.5 max-w-0 bg-current transition-all duration-300 group-hover:max-w-full"></span>
                  </a>
                </li>
              ))}
              {/* Dropdown */}
              <li className='relative cursor-pointer group'>
                <a href="#" className=' flex items-center gap-[2px] font-semibold text-gray-500 dark:hover:text-white hover:text-gray-800 transition py-2'>
                    Liens rapides
                     <span> 
                        <FaCaretDown className=' group-hover:rotate-180 duration-300'/>
                     </span>
                </a>
              {/*   Dropdown Links */}
                <div className='absolute z-[9999] hidden group-hover:block w-[200px] rounded-md bg-white shadow-md dark:bg-gray-900 p-2  dark:text-white  '>
                    <ul className='space-y-2'>
                       {
                        DropDownLinks.map((link) => (
                            <li key={link.id} className='
                                                     bg-gray-100 dark:bg-gray-800 rounded-md 
                                                       p-2 mb-2 hover:bg-gray-200
                                                     dark:hover:bg-gray-700 transition'>
                            <a href="{link.href}" className='text-gray-500
                            hover:text-black dark:hover:text-white duration-300
                            inline-block w-full  p-2 hover:bg-primary/20 rounded-md
                            font-semibold '>
                                {link.name}
                            </a>
                            </li>

                        ))

                       }
                    </ul>
                </div>
               
              </li>
            </ul>
          </nav>

          {/* Right Buttons */}
          <div className="flex items-center gap-4">

            {/* Search Bar */}
            <div className="relative group hidden sm:block">
              <input
                type="text"
                placeholder="Rechercher"
                className="search-bar bg-gray-100 dark:bg-gray-800 border border-transparent dark:border-gray-700 text-sm rounded-full px-4 py-1 w-0 group-hover:w-56 transition-all duration-300 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400"
              />
              <IoMdSearch
                className="text-xl text-gray-600 dark:text-gray-400 absolute top-1/2 -translate-y-1/2 right-3 pointer-events-none"
              />
            </div>

            {/* Panier */}
            <button className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition">
              <FaCartShopping className="text-xl text-gray-600 dark:text-gray-400" />
              <span className="absolute -top-1 -right-1 text-[10px] bg-red-500 text-white w-4 h-4 rounded-full flex items-center justify-center">
                4
              </span>
            </button>

            {/* Dark Mode Toggle */}
            <DarkMode />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
