import React from 'react';
import { IoMdSearch } from "react-icons/io";

const MenuLinks = [
  { 
    id: 1,
    name: 'Accueil', 
    href: '#' 
  },
  { 
    id: 2,
    name: 'Boutique',
    href: '#'
  },
  { 
    id: 3,
    name: 'A propos de nous',
    href: '#' 
  },
  { 
    id: 4,
    name: 'Contact Us',
    href: '#' 
  },
]
const Navbar = () => {
  return (
    <div className='bg-white dark:bg-gray-900 dark:text-white shadow-md'>
        <div className='py-4'>
            <div className='container'>
                {/* Logo and Links section */ }
                <div className='flex items-center gap-4'>
                    <a href="#" className='text-primary font-semibold tracking-widest text-2xl uppercase sm:text-3xl'>
                        Gremah Electro
                    </a>
                    { /* Menu Items */ }
                    <div className='hidden lg:block'>
                        <ul  className='flex items-center gap-4'> 
                            {
                            MenuLinks.map((data, index) => (
                                <li key={index}> 
                                    <a href={data.link} 
                                    className='inline-block px-4 font-semibold
                                                text-gray-500 hover:text-black
                                                dark:hover:text-white duration-200'> 
                                        {" "}{data.name}
                                    </a>
                                </li>
                                ))
                            }
                        </ul>

                    </div>

                    {/* Navbar right section */ }
                    <div className='flex justify-between items-center gap-4'>
                        {/*search bar section*/}
                        <div className='relative group hidden sm:block'>
                            <input type="text" name="" id="" placeholder='Rechercher' 
                            className='
                            search-bar'/>
                            <IoMdSearch className='
                                                   text-xl text-gray-600
                                                 dark:text-gray-400' />
                        </div>
                        {/* Dark mode section */ }
                    </div>
                </div>

            </div>
        </div>
        
    </div>
  )
}

export default Navbar;