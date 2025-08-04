import React from 'react';
import { FaUsers, FaShieldAlt, FaRocket, FaMapMarkerAlt } from 'react-icons/fa';
import teamImg from '../assets/about/Me.png'; // Créez ce dossier et ajoutez une image
import founderImg from '../assets/about/logo.png'; // Ajoutez cette image

const About = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12 mt-10">
      <div className="container mx-auto px-4">
        {/* Section Hero */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            À propos de <span className="text-primary">Gremah Electro</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Votre destination premium pour les dernières innovations technologiques et appareils électroniques de qualité.
          </p>
        </section>

        {/* Section Notre Histoire */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Notre Histoire
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Fondée en 2020, Gremah Electro est née de la passion pour la technologie et l'innovation. 
                Ce qui a commencé comme un petit magasin local est rapidement devenu une référence 
                dans la vente de produits électroniques au Niger.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Aujourd'hui, nous sommes fiers de servir des milliers de clients satisfaits à travers le pays, 
                avec un engagement inébranlable envers la qualité et le service client.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-xl">
              <img 
                src={teamImg} 
                alt="Équipe Gremah Electro" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </section>

        {/* Section Notre Mission */}
        <section className="mb-16 bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Notre Mission
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-gray-50 dark:bg-gray-700">
              <div className="flex justify-center text-primary text-4xl mb-4">
                <FaUsers />
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Satisfaction Client</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Fournir une expérience d'achat exceptionnelle avec un service personnalisé.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-gray-50 dark:bg-gray-700">
              <div className="flex justify-center text-primary text-4xl mb-4">
                <FaShieldAlt />
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Qualité Garantie</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Des produits rigoureusement sélectionnés pour leur durabilité et performance.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-gray-50 dark:bg-gray-700">
              <div className="flex justify-center text-primary text-4xl mb-4">
                <FaRocket />
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Innovation</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Toujours à la pointe des dernières technologies pour nos clients.
              </p>
            </div>
          </div>
        </section>

        {/* Section Fondateur */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Notre Fondateur
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Mahamadou Amadou Habou Gremah, passionné de technologie depuis son plus jeune âge, 
                a créé Gremah Electro avec la vision d'apporter les meilleurs produits électroniques 
                au marché nigérien à des prix accessibles.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Son engagement envers l'excellence et l'innovation continue de guider notre entreprise 
                vers de nouveaux sommets.
              </p>
            </div>
            <div className="order-2 lg:order-1 rounded-xl overflow-hidden shadow-xl">
              <img 
                src={founderImg} 
                alt="Fondateur de Gremah Electro" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </section>

        {/* Section Localisation */}
        <section className="bg-primary/10 dark:bg-gray-800 rounded-xl p-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="text-primary text-5xl">
              <FaMapMarkerAlt />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Retrouvez-nous
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Charée Zamna, Zinder, Niger
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Ouvert du Lundi au Samedi, 8h - 18h
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;