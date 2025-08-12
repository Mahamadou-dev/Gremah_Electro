// src/data/blogs/blogs.js
// src/data/blogs/blogs.js

const importBlogPostsImages = (fileName) => {
  const modules = import.meta.glob('/src/assets/blogs/*.{jpg,jpeg,png,webp}', { eager: true });
  
  return modules[`/src/assets/blogs/${fileName}`]?.default
    || '/fallback-blog-image.jpg';
};

export const blogs = [
  {
    id: 'guide-montre-connectee-2025',
    slug: 'guide-ultime-pour-choisir-sa-montre-connectee-en-2025',
    title: 'Guide ultime pour choisir sa montre connectée en 2025',
    subtitle: 'Comparatif des meilleurs modèles et conseils d\'achat pour trouver la montre intelligente parfaite',
    date: '2025-08-15',
    readTime: 8,
    category: 'Technologie',
    author: 'Gremah Mahamadou',
    image: importBlogPostsImages('smartwatch.jpeg'),
    images: [
      importBlogPostsImages('smartwatch.jpeg'),
      importBlogPostsImages('smartwatch-detail.jpeg'),
      importBlogPostsImages('smartwatch-comparison.jpeg')
    ],
    content: `
      <h2>Introduction</h2>
      <p>Le marché des montres connectées a explosé ces dernières années avec des fonctionnalités toujours plus innovantes...</p>
      
      <h2>1. Définir ses besoins</h2>
      <p>Avant de choisir, identifiez votre usage principal :</p>
      <ul>
        <li>Suivi d'activité et santé</li>
        <li>Notifications et productivité</li>
        <li>Style et personnalisation</li>
      </ul>
    `,
    featured: true,
    isNew: true,
    tags: ['montre connectée', 'wearable', 'technologie'],
    relatedPosts: ['test-sony-bose-2025', 'comparatif-smartphones-2025']
  },
  {
    id: 'test-sony-bose-2025',
    slug: 'test-complet-sony-wh-1000xm6-vs-bose-qc45',
    title: 'Test complet : Sony WH-1000XM6 vs Bose QC45',
    subtitle: 'Battle des références du marché des casques audio sans fil avec réduction de bruit active',
    date: '2025-08-22',
    readTime: 12,
    category: 'Audio',
    author: 'Gremah Tech',
    image: importBlogPostsImages('headphones.jpeg'),
    images: [
      importBlogPostsImages('headphones.jpeg'),
      importBlogPostsImages('headphones-detail.jpeg'),
      importBlogPostsImages('headphones-comparison.jpeg')
    ],
    content: `
      <h2>Introduction</h2>
      <p>Nous avons testé pendant 3 semaines les deux références du marché des casques antibruit...</p>
    `,
    featured: true,
    isNew: false,
    tags: ['casque audio', 'réduction de bruit', 'comparatif'],
    relatedPosts: ['innovations-audio-2025', 'astuces-batterie']
  },
  {
    id: 'astuces-batterie',
    slug: '10-astuces-pour-prolonger-la-duree-de-vie-de-vos-batteries',
    title: '10 astuces pour prolonger la durée de vie de vos batteries',
    subtitle: 'Les meilleures pratiques pour optimiser l\'autonomie de vos appareils électroniques',
    date: '2025-08-30',
    readTime: 6,
    category: 'Conseils',
    author: 'Ali Tech',
    image: importBlogPostsImages('battery.jpeg'),
    images: [
      importBlogPostsImages('battery.jpeg'),
      importBlogPostsImages('battery-tips.jpeg')
    ],
    content: `
      <h2>Introduction</h2>
      <p>La durée de vie des batteries est un enjeu crucial pour nos appareils électroniques...</p>
    `,
    featured: false,
    isNew: true,
    tags: ['batterie', 'entretien', 'conseils'],
    relatedPosts: ['guide-montre-connectee-2025', 'pc-vs-mac-2025']
  },
  {
    id: 'comparatif-smartphones-2025',
    slug: 'comparatif-meilleurs-smartphones-2025',
    title: 'Comparatif : Meilleurs smartphones 2025',
    subtitle: 'Notre sélection des modèles les plus innovants cette année avec leurs forces et faiblesses',
    date: '2025-09-10',
    readTime: 10,
    category: 'Technologie',
    author: 'Idi Techno',
    image: importBlogPostsImages('smartphones.jpeg'),
    images: [
      importBlogPostsImages('smartphones.jpeg'),
      importBlogPostsImages('smartphones-comparison.jpeg')
    ],
    content: `
      <h2>Introduction</h2>
      <p>Le marché des smartphones continue d'évoluer rapidement en 2025...</p>
    `,
    featured: true,
    isNew: false,
    tags: ['smartphone', 'comparatif', 'technologie'],
    relatedPosts: ['guide-montre-connectee-2025', 'espace-travail-ideal']
  },
  {
    id: 'espace-travail-ideal',
    slug: 'configurer-son-espace-de-travail-ideal',
    title: 'Configurer son espace de travail idéal',
    subtitle: 'Ergonomie, câble management et équipements pour un setup productif',
    date: '2025-09-18',
    readTime: 7,
    category: 'Lifestyle',
    author: 'Moussa Pro',
    image: importBlogPostsImages('workspace.jpeg'),
    images: [
      importBlogPostsImages('workspace.jpeg'),
      importBlogPostsImages('workspace-detail.jpeg')
    ],
    content: `
      <h2>Introduction</h2>
      <p>Un espace de travail bien organisé peut booster votre productivité...</p>
    `,
    featured: false,
    isNew: false,
    tags: ['bureau', 'ergonomie', 'productivité'],
    relatedPosts: ['accessoires-teletravail', 'pc-vs-mac-2025']
  },
  {
    id: 'pc-vs-mac-2025',
    slug: 'pc-vs-mac-lequel-choisir-en-2025',
    title: 'PC vs Mac : lequel choisir en 2025 ?',
    subtitle: 'Analyse approfondie des deux écosystèmes pour vous aider à décider',
    date: '2025-09-25',
    readTime: 9,
    category: 'Technologie',
    author: 'Mahamadou Tech',
    image: importBlogPostsImages('pc-vs-mac.jpeg'),
    images: [
      importBlogPostsImages('pc-vs-mac.jpeg'),
      importBlogPostsImages('pc-vs-mac-comparison.jpeg')
    ],
    content: `
      <h2>Introduction</h2>
      <p>Le débat entre PC et Mac continue en 2025 avec des arguments solides des deux côtés...</p>
    `,
    featured: true,
    isNew: true,
    tags: ['ordinateur', 'comparatif', 'technologie'],
    relatedPosts: ['comparatif-smartphones-2025', 'astuces-batterie']
  }
];

// Note : J'ai gardé seulement 6 articles pour rester concis
// mais la structure est complète avec tous les champs nécessaires
// pour un blog moderne (images multiples, tags, posts relatifs, etc.)