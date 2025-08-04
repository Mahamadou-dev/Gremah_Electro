// src/data/products/electro/casquesEcouteurs.js

// You can remove PRODUCTS_BASE_PATH if its only purpose was for the glob import.
// If it's used elsewhere for dynamically constructing image paths AFTER import, keep it.
// For the glob import itself, the path MUST be a static string.
// const PRODUCTS_BASE_PATH = '/src/assets/products/electro/';


const importCasquesImages = (fileName) => {
  // CORRECTED: The ENTIRE glob pattern is now a plain, static string literal.
  // We've replaced `${PRODUCTS_BASE_PATH}CASQUES_ECOUTEURS/` with the full hardcoded path.
  const modules = import.meta.glob('/src/assets/products/electro/CASQUES_ECOUTEURS/*.{jpg,jpeg,png,webp}', { eager: true });

  // For accessing the 'modules' object, you still need the full static path as the key.
  // This part can still use a template literal because it's evaluated at runtime, not build time by Vite's glob.
  return modules[`/src/assets/products/electro/CASQUES_ECOUTEURS/${fileName}`]?.default
    || '/fallback-product-image.jpg';
};

export const casquesEcouteurs = [
  // Razer Kraken V4 Noir (3 variantes)
  {
    id: 'razer-kraken-v4', // Changed to match your single slug if variants are handled internally
    slug: 'casque-gaming-sans-fil-razer-kraken-v4-noir',
    title: 'Casque Gaming Sans Fil Razer Kraken V4 Noir',
    variants: ['Vue 1', 'Vue 2', 'Vue 3'], // Variants are still useful for display
    price: 8990,
    originalPrice: 9990,
    category: 'casques_ecouteurs',
    rating: 4.7,
    images: [
      importCasquesImages('casque-gaming-sans-fil-razer-kraken-v4-noir (1).jpg'),
      importCasquesImages('casque-gaming-sans-fil-razer-kraken-v4-noir (2).jpg'),
      importCasquesImages('casque-gaming-sans-fil-razer-kraken-v4-noir (3).jpg')
    ],
    description: 'Casque gaming haut de gamme avec son THX Spatial Audio pour une immersion totale. Microphone rétractable avec réduction de bruit.',
    features: [
      'Technologie sans fil 2.4GHz (latence ultra-faible)',
      'Autonomie 20 heures',
      'Coussinets en mousse à mémoire de forme',
      'Compatibilité multi-plateforme (PC, PS5, Xbox, Switch)'
    ],
    specifications: {
      poids: '320g',
      connectivite: 'USB-C / Bluetooth 5.2',
      frequence: '20Hz-20kHz',
      microphone: 'Oui (détachable)'
    },
    colors: ['Noir'],
    stock: 15,
    isNew: true,
    isBestSeller: true
  },

  // MSI Immerse GH50 (3 variantes)
  {
    id: 'msi-immerse-gh50',
    slug: 'micro-casque-gaming-sans-fil-msi-immerse-gh50-noir',
    title: 'Micro Casque Gaming MSI Immerse GH50 Noir',
    variants: ['Vue 1', 'Vue 2', 'Vue 3'],
    price: 7590,
    originalPrice: 8490,
    category: 'casques_ecouteurs',
    rating: 4.5,
    images: [
      importCasquesImages('micro-casque-gaming-sans-fil-msi-immerse-gh50-noir.jpg'),
      importCasquesImages('micro-casque-gaming-sans-fil-msi-immerse-gh50-noir (1).jpg'),
      importCasquesImages('micro-casque-gaming-sans-fil-msi-immerse-gh50-noir (2).jpg'),
      importCasquesImages('micro-casque-gaming-sans-fil-msi-immerse-gh50-noir (3).jpg')
    ],
    description: 'Casque gaming avec audio 7.1 virtuel et design pliable. Idéal pour les joueurs nomades.',
    features: [
      'Audio surround 7.1 virtuel',
      'Microphone détachable avec réduction de bruit',
      'Design pliable compact',
      'Autonomie 15 heures'
    ],
    specifications: {
      poids: '350g',
      connectivite: 'USB / 3.5mm',
      frequence: '20Hz-20kHz',
      microphone: 'Oui (détachable)'
    },
    colors: ['Noir', 'Bleu'],
    stock: 8,
    isNew: false,
    isBestSeller: true
  },

  // Plantronics EncorePro HW720 (4 variantes)
  {
    id: 'plantronics-encorepro-hw720',
    slug: 'casque-micro-plantronics-encorepro-hw720',
    title: 'Casque Micro Plantronics EncorePro HW720',
    variants: ['Vue 1', 'Vue 2', 'Vue 3', 'Vue 4'],
    price: 6590,
    originalPrice: 7290,
    category: 'casques_ecouteurs',
    rating: 4.3,
    images: [
      importCasquesImages('casque-micro-plantronics-encorepro-hw720 (1).jpg'),
      importCasquesImages('casque-micro-plantronics-encorepro-hw720 (2).jpg'),
      importCasquesImages('casque-micro-plantronics-encorepro-hw720 (3).jpg'),
      importCasquesImages('casque-micro-plantronics-encorepro-hw720 (4).jpg')
    ],
    description: 'Casque professionnel avec réduction de bruit active pour des appels téléphoniques cristallins.',
    features: [
      'Réduction de bruit active (ANC)',
      'Microphone à suppression de bruit',
      'Confort pour port prolongé',
      'Compatibilité PC/Mac/Smartphone'
    ],
    specifications: {
      poids: '180g',
      connectivite: 'Bluetooth 5.0 / USB',
      frequence: '100Hz-7kHz',
      microphone: 'Oui (boom)'
    },
    colors: ['Noir'],
    stock: 12,
    isNew: false,
    isBestSeller: false
  },

  // Corsair HS80 RGB (4 variantes)
  {
    id: 'corsair-hs80',
    slug: 'casque-sans-fil-corsair-hs80-rgb-arceau-jouer-noir',
    title: 'Casque Corsair HS80 RGB Arceau Jouer Noir',
    variants: ['Vue 1', 'Vue 2', 'Vue 3', 'Vue 4'],
    price: 9490,
    originalPrice: 10990,
    category: 'casques_ecouteurs',
    rating: 4.8,
    images: [
      importCasquesImages('casque-sans-fil-corsair-hs80-rgb-arceau-jouer-noir (1).jpg'),
      importCasquesImages('casque-sans-fil-corsair-hs80-rgb-arceau-jouer-noir (2).jpg'),
      importCasquesImages('casque-sans-fil-corsair-hs80-rgb-arceau-jouer-noir (3).jpg'),
      importCasquesImages('casque-sans-fil-corsair-hs80-rgb-arceau-jouer-noir (4).jpg')
    ],
    description: 'Casque gaming premium avec audio haute-fidélité et rétroéclairage RGB personnalisable.',
    features: [
      'Son haute-fidélité 24bit/96kHz',
      'Rétroéclairage RGB personnalisable',
      'Microphone broadcast détachable',
      'Autonomie 20 heures'
    ],
    specifications: {
      poids: '370g',
      connectivite: 'USB 2.4GHz / Bluetooth',
      frequence: '20Hz-40kHz',
      microphone: 'Oui (détachable)'
    },
    colors: ['Noir'],
    stock: 5,
    isNew: true,
    isBestSeller: true
  },

  // Écouteurs Ultrapods Z3
  {
    id: 'ultrapods-z3-blanc',
    slug: 'ecouteurs-bluetooth-ultrapods-z3-blanc',
    title: 'Écouteurs Bluetooth Ultrapods Z3 Blanc',
    price: 3990,
    originalPrice: 4990,
    category: 'casques_ecouteurs',
    rating: 4.2,
    images: [
      importCasquesImages('ecouteurs-bluetooth-ultrapods-z3-blanc.jpg')
    ],
    description: 'Écouteurs true wireless avec son stéréo HD et boîtier de charge compact.',
    features: [
      'Son stéréo HD avec basses profondes',
      'Commandes tactiles intuitives',
      'Autonomie 5h (20h avec boîtier)',
      'Protection IPX5 contre les éclaboussures'
    ],
    specifications: {
      poids: '45g (paire)',
      connectivite: 'Bluetooth 5.0',
      frequence: '20Hz-20kHz',
      microphone: 'Intégré'
    },
    colors: ['Blanc', 'Noir', 'Rose'],
    stock: 20,
    isNew: false,
    isBestSeller: true
  },

  // Xiaomi Mi In-Ear Basic
  {
    id: 'xiaomi-mi-in-ear-basic',
    slug: 'ecouteurs-intra-auriculaires-xiaomi-mi-in-ear-basic-blanc',
    title: 'Écouteurs Intra-Auriculaires Xiaomi Mi In-Ear Basic Blanc',
    price: 1490,
    originalPrice: 1990,
    category: 'casques_ecouteurs',
    rating: 4.0,
    images: [
      importCasquesImages('ecouteurs-intra-auriculaires-xiaomi-mi-in-ear-basic-blanc.jpg')
    ],
    description: 'Écouteurs filaires avec son équilibré et design ergonomique pour un excellent rapport qualité-prix.',
    features: [
      'Driver dynamique 10mm',
      'Câble anti-nœuds renforcé',
      'Compatibilité universelle',
      'Design léger et confortable'
    ],
    specifications: {
      poids: '15g',
      connectivite: 'Jack 3.5mm',
      frequence: '20Hz-20kHz',
      microphone: 'Intégré'
    },
    colors: ['Blanc'],
    stock: 30,
    isNew: false,
    isBestSeller: false
  }
];