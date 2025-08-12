// src/data/products/electro/smartwatchs.js

// Remove PRODUCTS_BASE_PATH if it's only used for the glob import,
// or keep it if it's used elsewhere in the file statically.
// For the glob import, the full path needs to be a static string.
// const PRODUCTS_BASE_PATH = '/src/assets/products/electro/'; // <--- Can be removed if not used elsewhere for static paths


const importSmartwatchsImages = (fileName) => {
  // Corrected: The entire glob pattern is now a fully static string literal.
  // The path starts directly from '/src/assets/products/electro/SMARTWATCHS/'
  const modules = import.meta.glob('/src/assets/products/electro/SMARTWATCHS/*.{jpg,jpeg,png,webp}', { eager: true });

  // For constructing the key to access the 'modules' object, you still need the full path
  // so we'll re-add the base path string here directly.
  return modules[`/src/assets/products/electro/SMARTWATCHS/${fileName}`]?.default
    || '/fallback-product-image.jpg';
};

// --- Smartwatches Product Data ---
export const smartwatchs = [
  // Apple Watch Series 10 GPS 46 mm Aluminium Noir avec Bracelet Sport Rose Tendre
  {
    id: 'apple-watch-series-10-46mm',
    slug: 'apple-watch-series-10-gps-46-mm-aluminium-noir-avec-bracelet-sport-rose-tendre-sm',
    title: 'Apple Watch Series 10 GPS 46 mm Aluminium Noir avec Bracelet Sport Rose Tendre',
    variants: ['Vue 1', 'Vue 2', 'Vue 3', 'Standard'],
    price: 139990,
    originalPrice: 149990,
    category: 'Smartwatchs',
    rating: 4.9,
    images: [
      importSmartwatchsImages('apple-watch-series-10-gps-46-mm-aluminium-noir-avec-bracelet-sport-rose-tendre-sm (1).jpg'),
      importSmartwatchsImages('apple-watch-series-10-gps-46-mm-aluminium-noir-avec-bracelet-sport-rose-tendre-sm (2).jpg'),
      importSmartwatchsImages('apple-watch-series-10-gps-46-mm-aluminium-noir-avec-bracelet-sport-rose-tendre-sm (3).jpg'),
      importSmartwatchsImages('apple-watch-series-10-gps-46-mm-aluminium-noir-avec-bracelet-sport-rose-tendre-sm.jpg')
    ],
    description: 'La nouvelle génération d\'Apple Watch avec des fonctionnalités de santé avancées, un écran plus grand et des performances améliorées.',
    features: [
      'Écran Retina toujours activé',
      'Suivi avancé de la santé (ECG, SpO2)',
      'Détection des chutes et des accidents',
      'Puce S10 SiP pour des performances rapides',
      'Résistance à l\'eau jusqu\'à 50m'
    ],
    specifications: {
      tailleBoitier: '46 mm',
      connectivite: 'GPS, Bluetooth 5.3, Wi-Fi',
      materiau: 'Aluminium',
      capteurs: 'Capteur de température, Oxygène sanguin, ECG'
    },
    colors: ['Noir (avec bracelet Rose Tendre)'],
    stock: 15,
    isNew: true,
    isBestSeller: true
  },

  // Montre Connectée Apple Watch Series 8 GPS 45mm Bleu
  {
    id: 'apple-watch-series-8-45mm',
    slug: 'montre-connectee-apple-watch-series-8-gps-45mm-bleu',
    title: 'Montre Connectée Apple Watch Series 8 GPS 45mm Bleu',
    variants: ['Vue 1', 'Vue 2', 'Vue 3', 'Standard'],
    price: 99990,
    originalPrice: 109990,
    category: 'Smartwatchs',
    rating: 4.7,
    images: [
      importSmartwatchsImages('montre-connectee-apple-watch-series-8-gps-45mm-bleu (1).jpg'),
      importSmartwatchsImages('montre-connectee-apple-watch-series-8-gps-45mm-bleu (2).jpg'),
      importSmartwatchsImages('montre-connectee-apple-watch-series-8-gps-45mm-bleu (3).jpg'),
      importSmartwatchsImages('montre-connectee-apple-watch-series-8-gps-45mm-bleu.jpg')
    ],
    description: 'Une montre intelligente robuste avec des fonctionnalités essentielles pour la santé et le fitness, un compagnon fiable au quotidien.',
    features: [
      'Écran Retina bord à bord',
      'Suivi du cycle menstruel, capteur de température',
      'Suivi d\'activité et modes d\'entraînement',
      'Appels d\'urgence internationaux',
      'Résistance aux chocs et à la poussière'
    ],
    specifications: {
      tailleBoitier: '45 mm',
      connectivite: 'GPS, Bluetooth 5.0, Wi-Fi',
      materiau: 'Aluminium',
      autonomie: 'Jusqu\'à 18 heures (36h en mode économie)'
    },
    colors: ['Bleu Minuit', 'Argent', 'Lumière Stellaire'],
    stock: 20,
    isNew: false,
    isBestSeller: true
  },

  // Montre Connectée Huawei Watch GT 5 Pro 46 mm Noir
  {
    id: 'huawei-watch-gt5-pro-46mm',
    slug: 'montre-connectee-huawei-watch-gt-5-pro-46-mm-noir',
    title: 'Montre Connectée Huawei Watch GT 5 Pro 46 mm Noir',
    variants: ['Vue 1', 'Vue 2', 'Vue 3', 'Standard'],
    price: 69990,
    originalPrice: 79990,
    category: 'Smartwatchs',
    rating: 4.6,
    images: [
      importSmartwatchsImages('montre-connectee-huawei-watch-gt-5-pro-46-mm-noir (1).jpg'),
      importSmartwatchsImages('montre-connectee-huawei-watch-gt-5-pro-46-mm-noir (2).jpg'),
      importSmartwatchsImages('montre-connectee-huawei-watch-gt-5-pro-46-mm-noir (3).jpg'),
      importSmartwatchsImages('montre-connectee-huawei-watch-gt-5-pro-46-mm-noir.jpg')
    ],
    description: 'Une montre connectée élégante avec une autonomie record et des fonctionnalités complètes de suivi de la santé et du sport.',
    features: [
      'Autonomie ultra-longue (jusqu\'à 14 jours)',
      'Suivi de la fréquence cardiaque, SpO2, sommeil, stress',
      'Plus de 100 modes d\'entraînement sportifs',
      'GPS haute précision intégré',
      'Appels Bluetooth'
    ],
    specifications: {
      size: '46 mm',
      connectivite: 'Bluetooth 5.2, GPS',
      materiau: 'Boîtier en Titane, écran Saphir',
      autonomie: '14 jours (utilisation typique)',
      resistanceEau: '5 ATM'
    },
    colors: ['Noir'],
    stock: 18,
    isNew: true,
    isBestSeller: false
  },

  // Smart Watch Huawei Watch GT4 Phoinix B19M Titanium avec Band 8 + Freebuds SE Gratuits
  {
    id: 'huawei-watch-gt4-phoinix',
    slug: 'smart-watch-huawei-watch-gt4-phoinix-b19m-titanium-avec-band-8-freebuds-se-gratuits',
    title: 'Smart Watch Huawei Watch GT4 Phoinix B19M Titanium avec Band 8 + Freebuds SE Gratuits',
    variants: ['Vue 1', 'Vue 2', 'Vue 3', 'Standard'],
    price: 84990,
    originalPrice: 99990,
    category: 'Smartwatchs',
    rating: 4.8,
    images: [
      importSmartwatchsImages('smart-watch-huawei-watch-gt4-phoinix-b19m-titanium-avec-band-8-freebuds-se-gratuits (1).jpg'),
      importSmartwatchsImages('smart-watch-huawei-watch-gt4-phoinix-b19m-titanium-avec-band-8-freebuds-se-gratuits (2).jpg'),
      importSmartwatchsImages('smart-watch-huawei-watch-gt4-phoinix-b19m-titanium-avec-band-8-freebuds-se-gratuits (3).jpg'),
      importSmartwatchsImages('smart-watch-huawei-watch-gt4-phoinix-b19m-titanium-avec-band-8-freebuds-se-gratuits.jpg')
    ],
    description: 'Un pack complet pour le sport et le quotidien : la Huawei Watch GT4 en Titane, accompagnée du bracelet intelligent Band 8 et des écouteurs Freebuds SE.',
    features: [
      'Design premium en titane',
      'Suivi de santé précis (TruSeen™ 5.5+)',
      'GPS multi-bandes pour un suivi sportif optimal',
      'Autonomie longue durée',
      'Inclus: Huawei Band 8 et Freebuds SE'
    ],
    specifications: {
      size: '46 mm',
      connectivite: 'Bluetooth 5.2, GNSS (GPS, Beidou, GLONASS, Galileo, QZSS)',
      materiau: 'Titane',
      autonomie: 'Jusqu\'à 14 jours (utilisation typique)',
      resistanceEau: '5 ATM'
    },
    colors: ['Titane (avec bracelet Noir)'],
    stock: 12,
    isNew: true,
    isBestSeller: true
  },
  {
    id: 'smartwatch2',
    slug: 'smartwatch2',
    title: 'Smartwatch 2',
    variants: ['Vue 1', 'Vue 2', 'Vue 3', 'Standard'],
    price: 29990,
    originalPrice: 34990,
    category: 'Smartwatchs',
    rating: 4.1,
    images:[
      importSmartwatchsImages('smartwatch2-removebg-preview.png'),
    ],
    description: 'Smartwatch 2 avec écran AMOLED, suivi de la santé et notifications intelligentes.',
    features: [
      'Écran AMOLED 1.4" HD',
      'Suivi de la fréquence cardiaque et du sommeil',
      'Notifications d\'appels et messages',
      'Résistance à l\'eau IP68',
      'Autonomie de 7 jours'
    ],
    specifications: {
      ecran: '1.4" AMOLED HD',
      connectivite: 'Bluetooth 5.0',
      capteurs: 'Fréquence cardiaque, SpO2, accéléromètre',
      autonomie: '7 jours',
      resistanceEau: 'IP68'
    },
    colors: ['vert'],
    stock: 25,
    isNew: true,
    isBestSeller: false 
    

  }
];