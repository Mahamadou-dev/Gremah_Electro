import React from 'react'
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaMobileAlt,
} from 'react-icons/fa'

const FooterLinks = [
  { id: 1, name: 'Accueil', href: '#' },
  { id: 2, name: 'Boutique', href: '#' },
  { id: 3, name: 'À propos', href: '#' },
  { id: 4, name: 'Contact', href: '#' },
]

const FooterLinks2 = [
  { id: 1, name: 'Produits tendance', href: '#' },
  { id: 2, name: 'Nouveautés', href: '#' },
  { id: 3, name: 'Promotions', href: '#' },
  { id: 4, name: 'Meilleures ventes', href: '#' },
]

const Footer = () => {
  return (
    <footer className='bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-300'>
      <div className='container mx-auto px-6 py-12'>
        <div className='grid md:grid-cols-3 gap-10'>

          {/* Infos entreprise */}
          <div>
            <a
              href="#"
              className='text-primary font-semibold tracking-widest text-2xl uppercase sm:text-3xl'
            >
               Gremah Electro
            </a>
            <p className='mt-4 text-sm'>
              Gremah Electro, branche de GremahTech, est spécialisée dans la vente de produits électroniques de haute qualité.
            </p>
            <p className='text-xs mt-4'>Développé avec ❤️ par GremahTech</p>

            <a
              href="https://www.youtube.com/@amadouhabougremahmahamadou805"
              target='_blank'
              rel="noreferrer"
              className='inline-block mt-4 bg-primary/90 text-white py-2 px-4 text-sm rounded-full hover:bg-primary transition'
            >
              Visiter notre chaîne YouTube
            </a>
          </div>

          {/* Liens importants */}
          <div className='grid grid-cols-2 gap-6'>
            <div>
              <h2 className='text-lg font-bold mb-4'>Liens importants</h2>
              <ul className='space-y-3'>
                {FooterLinks.map(link => (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      className='hover:text-primary transition-colors duration-300'
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className='text-lg font-bold mb-4'>Liens rapides</h2>
              <ul className='space-y-3'>
                {FooterLinks2.map(link => (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      className='hover:text-primary transition-colors duration-300'
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Coordonnées & Réseaux sociaux */}
          <div>
            <h2 className='text-lg font-bold mb-4'>Adresse</h2>
            <div className='space-y-3 text-sm'>
              <div className='flex items-center gap-2'>
                <FaMapMarkerAlt className='text-primary' />
                <span>Zinder, Niger – Charée Zamna</span>
              </div>
              <div className='flex items-center gap-2'>
                <FaMobileAlt className='text-primary' />
                <span>+227 88 77 80 95</span>
              </div>
            </div>

            <div className='flex items-center gap-4 mt-6'>
              <a href="https://www.instagram.com" target='_blank' rel="noreferrer">
                <FaInstagram className='text-2xl hover:text-primary transition duration-300' />
              </a>
              <a href="https://www.linkedin.com/in/mahamadou-amadou-habou-gremah-54766632b" target='_blank' rel="noreferrer">
                <FaLinkedin className='text-2xl hover:text-primary transition duration-300' />
              </a>
              <a href="https://github.com/Mahamadou-dev" target='_blank' rel="noreferrer">
                <FaGithub className='text-2xl hover:text-primary transition duration-300' />
              </a>
              <a href="https://www.facebook.com/mahamadou.amadouhabougremah.1" target='_blank' rel="noreferrer">
                <FaFacebook className='text-2xl hover:text-primary transition duration-300' />
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer
//
// This code defines a Footer component for a React application, which includes company information, important links    