import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiClock, FiCalendar, FiTag } from 'react-icons/fi';
import Button from '../components/Shared/Button';

// Données simulées des articles de blog
const blogPosts = {
  1: {
    id: 1,
    title: "🕒 Guide ultime pour choisir sa montre connectée en 2025",
    author: "Marc Techno",
    date: "15 août 2025",
    readTime: "8 min",
    category: "Technologie",
    image: "/assets/blogs/smartwatch.jpg",
    content: `
      <h2 class="text-2xl font-bold mb-4">Introduction</h2>
      <p class="mb-4">Le marché des montres connectées a explosé ces dernières années avec des fonctionnalités toujours plus innovantes. Ce guide complet vous aidera à faire le bon choix.</p>
      
      <h2 class="text-2xl font-bold mb-4 mt-8">1. Définir ses besoins</h2>
      <p class="mb-4">Avant de choisir, identifiez votre usage principal :</p>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Suivi d'activité et santé</li>
        <li>Notifications et productivité</li>
        <li>Style et personnalisation</li>
        <li>Autonomie prolongée</li>
      </ul>
      
      <h2 class="text-2xl font-bold mb-4 mt-8">2. Comparatif des écosystèmes</h2>
      <p class="mb-4">Chaque marque propose son propre environnement :</p>
      <table class="min-w-full mb-4">
        <thead class="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th class="px-4 py-2 text-left">Marque</th>
            <th class="px-4 py-2 text-left">Compatibilité</th>
            <th class="px-4 py-2 text-left">Points forts</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <td class="px-4 py-2">Apple Watch</td>
            <td class="px-4 py-2">iOS uniquement</td>
            <td class="px-4 py-2">Intégration parfaite, ECG</td>
          </tr>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <td class="px-4 py-2">Wear OS</td>
            <td class="px-4 py-2">Android/iOS</td>
            <td class="px-4 py-2">Google Assistant, polyvalence</td>
          </tr>
          <tr>
            <td class="px-4 py-2">Garmin</td>
            <td class="px-4 py-2">Tous smartphones</td>
            <td class="px-4 py-2">Autonomie, sports extrêmes</td>
          </tr>
        </tbody>
      </table>
      
      <h2 class="text-2xl font-bold mb-4 mt-8">3. Budget et valeur</h2>
      <p class="mb-4">Les prix varient de 100€ à plus de 1000€. Voici notre analyse qualité/prix :</p>
      <div class="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-4">
        <p class="font-semibold">💡 Conseil d'expert : Pour la plupart des utilisateurs, une montre entre 200€ et 400€ offre le meilleur rapport fonctionnalités/prix.</p>
      </div>
      
      <h2 class="text-2xl font-bold mb-4 mt-8">Notre sélection 2025</h2>
      <ol class="list-decimal pl-6 mb-4 space-y-4">
        <li><strong>Apple Watch Series 9</strong> - Le meilleur pour les iPhone</li>
        <li><strong>Samsung Galaxy Watch 6 Pro</strong> - Meilleure alternative Android</li>
        <li><strong>Garmin Venu 3</strong> - Pour les sportifs</li>
        <li><strong>Amazfit GTR 4</strong> - Meilleur rapport qualité-prix</li>
      </ol>
      
      <h2 class="text-2xl font-bold mb-4 mt-8">Conclusion</h2>
      <p class="mb-4">Le choix dépend avant tout de votre smartphone et de vos priorités. Testez en magasin pour le confort et consultez nos tests complets pour chaque modèle.</p>
    `,
    relatedPosts: [
      {
        id: 4,
        title: "📱 Comparatif : Meilleurs smartphones 2025",
        image: "/assets/blogs/smartphones.jpg",
        date: "10 septembre 2025"
      },
      {
        id: 6,
        title: "💻 Comment prolonger la batterie de son laptop",
        image: "/assets/blogs/laptop.jpg",
        date: "25 septembre 2025"
      }
    ]
  },
  2: {
    id: 2,
    title: "🎧 Test complet : Sony WH-1000XM6 vs Bose QC45",
    author: "Sarah Audio",
    date: "22 août 2025",
    readTime: "12 min",
    category: "Audio",
    image: "/assets/blogs/headphones.jpg",
    content: `
      <h2 class="text-2xl font-bold mb-4">Introduction</h2>
      <p class="mb-4">Nous avons testé pendant 3 semaines les deux références du marché des casques antibruit. Voici notre verdict détaillé.</p>
      ...
    `,
    relatedPosts: [
      {
        id: 3,
        title: "🔊 Les innovations audio à suivre en 2025",
        image: "/assets/blogs/audio-tech.jpg",
        date: "30 août 2025"
      }
    ]
  },
  // ... autres articles
};

const BlogDetail = () => {
  const { id } = useParams();
  const post = blogPosts[id];

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Article non trouvé</h2>
        <Link to="/blogs">
          <Button text="Retour aux articles" bgColor="primary" textColor="white" />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      {/* Header avec bouton retour */}
      <div className="container mx-auto px-4 py-8">
        <Link 
          to="/blogs" 
          className="inline-flex items-center text-primary dark:text-primary-light hover:underline"
        >
          <FiArrowLeft className="mr-2" />
          Retour aux articles
        </Link>
      </div>

      {/* Article principal */}
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Métadonnées */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-300 mb-6">
          <span className="flex items-center">
            <FiCalendar className="mr-1" /> {post.date}
          </span>
          <span className="flex items-center">
            <FiClock className="mr-1" /> {post.readTime} de lecture
          </span>
          <span className="flex items-center">
            <FiTag className="mr-1" /> {post.category}
          </span>
        </div>

        {/* Titre */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
          {post.title}
        </h1>

        {/* Auteur */}
        <div className="flex items-center mb-8">
          <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 mr-3"></div>
          <div>
            <p className="font-medium text-gray-900 dark:text-white">{post.author}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Expert en {post.category.toLowerCase()}</p>
          </div>
        </div>

        {/* Image principale */}
        <div className="rounded-xl overflow-hidden mb-8 shadow-lg">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Contenu */}
        <div 
          className="prose dark:prose-invert max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></div>

        {/* Partage */}
        <div className="border-t border-b border-gray-200 dark:border-gray-700 py-6 my-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Partager cet article</h3>
          <div className="flex space-x-4">
            <button className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
              <span className="sr-only">Facebook</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </button>
            <button className="w-10 h-10 rounded-full bg-blue-400 text-white flex items-center justify-center">
              <span className="sr-only">Twitter</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </button>
            <button className="w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center">
              <span className="sr-only">LinkedIn</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Auteur (détaillé) */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md mb-12">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-20 h-20 rounded-full bg-gray-300 dark:bg-gray-600 mb-4 md:mb-0 md:mr-6"></div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{post.author}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {post.category === "Technologie" 
                  ? "Journaliste tech depuis 8 ans, spécialisé dans les wearables et l'écosystème mobile."
                  : post.category === "Audio" 
                  ? "Ingénieur du son de formation, je teste et analyse les produits audio depuis 2015."
                  : "Rédacteur expert en nouvelles technologies et gadgets électroniques."}
              </p>
              <div className="flex space-x-3">
                <Link to={`/blogs?author=${post.author.replace(/\s+/g, '-').toLowerCase()}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                  Voir tous les articles
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Articles similaires */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Vous pourriez aussi aimer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {post.relatedPosts.map((related) => (
              <Link 
                key={related.id} 
                to={`/blog/${related.id}`}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
              >
                <img 
                  src={related.image} 
                  alt={related.title} 
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">{related.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{related.date}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Commentaires */}
        <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Commentaires ({post.id === 1 ? '5' : '3'})</h2>
          
          <div className="space-y-6">
            {/* Commentaire 1 */}
            <div className="flex">
              <div className="flex-shrink-0 mr-4">
                <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600"></div>
              </div>
              <div>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Thomas Legrand</h4>
                    <span className="text-xs text-gray-500 dark:text-gray-400">1 jour</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    {post.id === 1 
                      ? "Excellent article ! J'hésitais justement entre la Galaxy Watch et l'Apple Watch. Vos comparaisons m'ont beaucoup aidé."
                      : "Très bon comparatif, j'attends avec impatience le test des nouvelles AirPods !"}
                  </p>
                </div>
                <div className="mt-2 flex space-x-4 text-sm">
                  <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">Répondre</button>
                  <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">Aimer (12)</button>
                </div>
              </div>
            </div>

            {/* Commentaire 2 */}
            <div className="flex">
              <div className="flex-shrink-0 mr-4">
                <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600"></div>
              </div>
              <div>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Emma Tech</h4>
                    <span className="text-xs text-gray-500 dark:text-gray-400">3 jours</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    {post.id === 1
                      ? "Petite correction : la nouvelle Galaxy Watch 6 est maintenant compatible avec iPhone, même si certaines fonctionnalités sont limitées."
                      : "Vous pourriez ajouter une section sur la qualité des micros pour les appels, c'est souvent négligé mais très important !"}
                  </p>
                </div>
                <div className="mt-2 flex space-x-4 text-sm">
                  <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">Répondre</button>
                  <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">Aimer (8)</button>
                </div>

                {/* Réponse */}
                <div className="flex mt-4 ml-4 pl-4 border-l-2 border-gray-200 dark:border-gray-600">
                  <div className="flex-shrink-0 mr-3">
                    <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                  </div>
                  <div>
                    <div className="bg-gray-50 dark:bg-gray-600/50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{post.author}</h4>
                        <span className="text-xs text-gray-500 dark:text-gray-400">2 jours</span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {post.id === 1
                          ? "Bonne remarque Emma ! Nous mettrons à jour l'article avec cette information."
                          : "Excellente suggestion, nous l'ajouterons dans une future mise à jour."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulaire de commentaire */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Ajouter un commentaire</h3>
              <form>
                <textarea 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light"
                  rows="4"
                  placeholder="Partagez votre avis ou posez une question..."
                ></textarea>
                <div className="mt-4">
                  <Button 
                    text="Publier le commentaire"
                    bgColor="primary"
                    textColor="white"
                    className="px-6 py-2"
                  />
                </div>
              </form>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
};

export default BlogDetail;