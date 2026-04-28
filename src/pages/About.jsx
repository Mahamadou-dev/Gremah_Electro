import React from 'react';
import { FaUsers, FaRocket, FaMapMarkerAlt, FaStore, FaAward, FaHandshake } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

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
    { icon: <FaHandshake className="text-3xl" />, title: "Intégrité", desc: "Transparence et éthique dans toutes nos transactions commerciales." },
    { icon: <FaRocket className="text-3xl" />, title: "Innovation", desc: "Sélection rigoureuse des technologies les plus avancées du marché." },
    { icon: <FaAward className="text-3xl" />, title: "Excellence", desc: "Qualité premium certifiée pour chaque produit en catalogue." },
    { icon: <FaUsers className="text-3xl" />, title: "Engagement", desc: "Accompagnement personnalisé avant, pendant et après l'achat." }
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
            Distributeur agréé de produits électroniques au Niger depuis 2020.
          </motion.p>
          <motion.div variants={fadeInUp} className="flex justify-center gap-4">
            <Link
              to="/boutique"
              className="px-8 py-3 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold rounded-full transition-all transform hover:scale-105"
            >
              Découvrir nos produits
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-primary font-bold rounded-full transition-all transform hover:scale-105"
            >
              Contactez-nous
            </Link>
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

      {/* Notre Entreprise */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Notre <span className="text-primary">Entreprise</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Gremah Electro est un distributeur spécialisé dans l'électronique de consommation au Niger.
                Depuis notre création, nous avons pour mission de rendre la technologie accessible aux
                professionnels et aux particuliers avec des produits fiables, garantis et accompagnés d'un
                service après-vente structuré.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Notre catalogue couvre les smartphones, ordinateurs, accessoires audio, montres connectées
                et équipements électroniques des plus grandes marques internationales. Nous travaillons
                exclusivement avec des fournisseurs agréés pour garantir l'authenticité et la traçabilité
                de chaque produit.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Nos Valeurs */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
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
            <Link
              to="/boutique"
              className="inline-block px-10 py-4 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold rounded-full text-lg transition-all transform hover:scale-105 shadow-lg"
            >
              Visiter la boutique
            </Link>
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