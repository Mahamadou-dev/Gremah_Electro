import React from 'react';
import { FaUsers, FaShieldAlt, FaRocket, FaMapMarkerAlt, FaStore, FaAward, FaHandshake } from 'react-icons/fa';
import { motion } from 'framer-motion';
import founderImg from '../assets/about/MaPhoto.jpg';
import teamImg from '../assets/about/logo.png';

// Animations
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const About = () => {
  const stats = [
    { value: "1000+", label: "Clients satisfaits" },
    { value: "50+", label: "Marques partenaires" },
    { value: "24/7", label: "Support client" },
    { value: "100%", label: "Garantie qualité" }
  ];

  const values = [
    { icon: <FaHandshake className="text-3xl" />, title: "Intégrité", desc: "Transparence dans toutes nos transactions" },
    { icon: <FaRocket className="text-3xl" />, title: "Innovation", desc: "Toujours à la pointe de la technologie" },
    { icon: <FaAward className="text-3xl" />, title: "Excellence", desc: "Qualité premium dans chaque produit" },
    { icon: <FaUsers className="text-3xl" />, title: "Communauté", desc: "Au service de notre clientèle" }
  ];

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-900 to-primary overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('https://gremah.com/pattern.svg')] bg-[length:100px_100px]"></div>
        </div>
        
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="container mx-auto px-6 text-center relative z-10"
        >
          <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl font-bold text-white mb-6">
            L'<span className="text-yellow-300">Excellence</span> Technologique
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-xl text-blue-100 max-w-3xl mx-auto mb-10">
            Gremah Electro - Votre passerelle vers l'innovation et la qualité depuis 2020
          </motion.p>
          <motion.div variants={fadeInUp} className="flex justify-center gap-4">
            <button 
              onClick={() => window.location.href = '/boutique'}
              className="px-8 py-3 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold rounded-full transition-all transform hover:scale-105">
              Découvrir nos produits
            </button>
            <button 
              onClick={() => window.location.href = '/contact'}
              className="px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-primary font-bold rounded-full transition-all transform hover:scale-105">
              Contactez-nous
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className="text-center p-6 bg-white dark:bg-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Notre Histoire */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row items-center gap-12"
          >
            <motion.div variants={fadeInUp} className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Notre <span className="text-primary">Histoire</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Fondée en 2020 à Zinder, Gremah Electro est rapidement devenue une référence dans le domaine 
                de l'électronique au Niger. Ce qui a commencé comme une petite boutique locale est aujourd'hui 
                une entreprise florissante avec une clientèle fidèle à travers le pays.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Notre succès repose sur un engagement inébranlable envers la qualité, l'innovation et 
                la satisfaction client, des valeurs qui continuent de guider notre croissance.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp} className="lg:w-1/2 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={teamImg} 
                  alt="Équipe Gremah Electro" 
                  className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                  <h3 className="text-2xl font-bold text-white">L'équipe Gremah Electro - 2023</h3>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Nos Valeurs */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Nos <span className="text-primary">Valeurs</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Les principes fondamentaux qui guident chaque aspect de notre entreprise
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map((value, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all"
              >
                <div className="text-primary mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{value.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Notre Fondateur */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row items-center gap-12"
          >
            <motion.div variants={fadeInUp} className="lg:w-1/2 order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Notre <span className="text-primary">Visionnaire</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Mahamadou Amadou Habou Gremah, fondateur et PDG de Gremah Electro, est un passionné 
                de technologie dont la vision a transformé le paysage électronique au Niger.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Avec une formation en ingénierie et un sens aigu des affaires, il a su combiner 
                expertise technique et sens commercial pour bâtir une entreprise qui redéfinit 
                les standards du secteur.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-1 bg-primary"></div>
                <span className="font-medium text-gray-700 dark:text-gray-300">Mahamadou Amadou Habou Gremah</span>
              </div>
            </motion.div>
            <motion.div variants={fadeInUp} className="lg:w-1/2 order-1 lg:order-2">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary to-blue-600 rounded-2xl opacity-75 group-hover:opacity-100 blur-md transition duration-500"></div>
                <img 
                  src={founderImg} 
                  alt="Fondateur de Gremah Electro" 
                  className="relative rounded-2xl w-full h-auto object-cover z-10 transform group-hover:-rotate-1 transition duration-300"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-primary">
        <div className="container mx-auto px-6 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-6"
          >
            Prêt à vivre l'expérience Gremah Electro ?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-blue-100 max-w-3xl mx-auto mb-10"
          >
            Découvrez notre sélection exclusive de produits high-tech et bénéficiez d'un service client d'exception.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <button 
              onClick={() => window.location.href = '/boutique'}
              className="px-10 py-4 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold rounded-full text-lg transition-all transform hover:scale-105 shadow-lg">
              Visiter la boutique
            </button>
          </motion.div>
        </div>
      </section>

      {/* Localisation */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            viewport={{ once: true }}
            className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 md:p-12 shadow-lg"
          >
            <motion.div variants={fadeInUp} className="flex flex-col md:flex-row items-center gap-8">
              <div className="text-primary text-6xl">
                <FaMapMarkerAlt />
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Notre <span className="text-primary">Boutique</span> Phare
                </h2>
                <div className="space-y-2">
                  <p className="text-lg text-gray-600 dark:text-gray-300 flex items-center justify-center md:justify-start gap-2">
                    <FaStore /> Charée Zamna, Zinder, Niger
                  </p>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    Lundi - Samedi: 8h - 18h
                  </p>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    Dimanche: 10h - 14h
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;