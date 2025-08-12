// src/data/products/electro/haut_parleurs.js

// You can remove PRODUCTS_BASE_PATH if its only purpose was for the glob import.
// If it's used elsewhere for dynamically constructing image paths AFTER import, keep it.
// For the glob import itself, the path MUST be a static string.
// const PRODUCTS_BASE_PATH = '/src/assets/products/electro/';


const importHautParleursImages = (fileName) => {
  // CORRECTED: The ENTIRE glob pattern is now a plain, static string literal.
  // We've replaced `${PRODUCTS_BASE_PATH}HAUT_PARLEURS/` with the full hardcoded path.
  const modules = import.meta.glob('/src/assets/products/electro/HAUT_PARLEURS/*.{jpg,jpeg,png,webp}', { eager: true });

  // For accessing the 'modules' object, you still need the full static path as the key.
  return modules[`/src/assets/products/electro/HAUT_PARLEURS/${fileName}`]?.default
    || '/fallback-product-image.jpg';
};

export const hautParleurs = [
  // Enceinte Bluetooth Portable Harman Kardon Onyx Studio 7 Bleu
  {
    id: 'harman-kardon-onyx-studio-7',
    slug: 'enceinte-bluetooth-portable-harman-kardon-onyx-studio-7-bleu',
    title: 'Enceinte Bluetooth Portable Harman Kardon Onyx Studio 7 Bleu',
    variants: ['Vue 1', 'Vue 2', 'Vue 3', 'Standard'],
    price: 19990,
    originalPrice: 22990,
    category: 'Haut_parleurs',
    rating: 4.7,
    images: [
      importHautParleursImages('enceinte-bluetooth-portable-harman-kardon-onyx-studio-7-bleu (1).jpg'),
      importHautParleursImages('enceinte-bluetooth-portable-harman-kardon-onyx-studio-7-bleu (2).jpg'),
      importHautParleursImages('enceinte-bluetooth-portable-harman-kardon-onyx-studio-7-bleu (3).jpg'),
      importHautParleursImages('enceinte-bluetooth-portable-harman-kardon-onyx-studio-7-bleu.jpg')
    ],
    description: 'Design emblématique et son stéréo riche. Profitez d\'un son exceptionnel partout où vous allez.',
    features: [
      'Design élégant et poignée en aluminium anodisé',
      'Son stéréo puissant',
      'Jusqu\'à 8 heures d\'autonomie',
      'Bluetooth 4.2'
    ],
    specifications: {
      puissance: '50W RMS',
      reponseFrequence: '50Hz - 20kHz',
      connectivite: 'Bluetooth 4.2',
      autonomie: '8 heures'
    },
    colors: ['Bleu', 'Noir', 'Gris'],
    stock: 15,
    isNew: true,
    isBestSeller: true
  },

  // Enceinte Bluetooth Portable JBL Boombox 3
  {
    id: 'jbl-boombox-3',
    slug: 'enceinte-bluetooth-portable-jbl-boombox-3',
    title: 'Enceinte Bluetooth Portable JBL Boombox 3',
    variants: ['Vue 1', 'Vue 2', 'Vue 3', 'Vue 4', 'Standard'],
    price: 54990,
    originalPrice: 59990,
    category: 'Haut_parleurs',
    rating: 4.9,
    images: [
      importHautParleursImages('enceinte-bluetooth-portable-jbl-boombox-3 (1).jpg'),
      importHautParleursImages('enceinte-bluetooth-portable-jbl-boombox-3 (2).jpg'),
      importHautParleursImages('enceinte-bluetooth-portable-jbl-boombox-3 (3).jpg'),
      importHautParleursImages('enceinte-bluetooth-portable-jbl-boombox-3 (4).jpg'),
      importHautParleursImages('enceinte-bluetooth-portable-jbl-boombox-3.jpg'),
       importHautParleursImages('enceinte-bluetooth-portable-jbl-boombox-3-bg.png')
    ],
    description: 'La JBL Boombox 3 offre un son JBL Original Pro massif avec des basses puissantes et profondes. Une batterie longue durée et une conception étanche.',
    features: [
      'Son JBL Original Pro massif',
      'Basses profondes améliorées',
      'Autonomie de 24 heures',
      'Résistance à l\'eau et à la poussière IP67'
    ],
    specifications: {
      puissance: '180W RMS (secteur)',
      reponseFrequence: '40Hz - 20kHz',
      connectivite: 'Bluetooth 5.3',
      autonomie: '24 heures',
      dimensions: '48.2 x 25.7 x 20.0 cm'
    },
    colors: ['Noir'],
    stock: 8,
    isNew: true,
    isBestSeller: true
  },

  // Enceinte de Soirée Portable Bluetooth JBL PartyBox 710 800W
  {
    id: 'jbl-partybox-710',
    slug: 'enceinte-de-soiree-portable-bluetooth-jbl-partybox-710-800w',
    title: 'Enceinte de Soirée Portable Bluetooth JBL PartyBox 710 800W',
    variants: ['Vue 1', 'Vue 2', 'Vue 3', 'Standard'],
    price: 109990,
    originalPrice: 119990,
    category: 'Haut_parleurs',
    rating: 4.8,
    images: [
      importHautParleursImages('enceinte-de-soiree-portable-bluetooth-jbl-partybox-710-800w (1).jpg'),
      importHautParleursImages('enceinte-de-soiree-portable-bluetooth-jbl-partybox-710-800w (2).jpg'),
      importHautParleursImages('enceinte-de-soiree-portable-bluetooth-jbl-partybox-710-800w (3).jpg'),
      importHautParleursImages('enceinte-de-soiree-portable-bluetooth-jbl-partybox-710-800w.jpg')
    ],
    description: 'Transformez n\'importe quel espace en fête avec des jeux de lumière éblouissants et un son puissant de 800W.',
    features: [
      'Puissance de 800W RMS',
      'Spectacle lumineux dynamique et personnalisable',
      'Résistante aux éclaboussures IPX4',
      'Entrées micro et guitare'
    ],
    specifications: {
      puissance: '800W RMS',
      reponseFrequence: '35Hz - 20kHz',
      connectivite: 'Bluetooth / USB / Aux',
      alimentation: 'Secteur',
      roues: 'Oui'
    },
    colors: ['Noir'],
    stock: 5,
    isNew: true,
    isBestSeller: true
  },

  // Enceinte Hi-Fi Connectée SOUNDFORM ELITE avec Chargeur à Induction Intégré Noir
  {
    id: 'soundform-elite',
    slug: 'enceinte-hi-fi-connectee-soundform-elite-avec-chargeur-a-induction-integre-noir',
    title: 'Enceinte Hi-Fi Connectée SOUNDFORM ELITE avec Chargeur à Induction Intégré Noir',
    variants: ['Vue 1', 'Vue 2', 'Standard'],
    price: 24990,
    originalPrice: 27990,
    category: 'Haut_parleurs',
    rating: 4.6,
    images: [
      importHautParleursImages('enceinte-hi-fi-connectee-soundform-elite-avec-chargeur-a-induction-integre-noir (1).jpg'),
      importHautParleursImages('enceinte-hi-fi-connectee-soundform-elite-avec-chargeur-a-induction-integre-noir (2).jpg'),
      importHautParleursImages('enceinte-hi-fi-connectee-soundform-elite-avec-chargeur-a-induction-integre-noir.jpg'),
      importHautParleursImages('enceinte-hi-fi-connectee-soundform-elite-avec-chargeur-a-induction-integre-noir-bg.jpg')
    ],
    description: 'Une enceinte intelligente haute-fidélité qui intègre un chargeur sans fil pour smartphone, parfaite pour la maison connectée.',
    features: [
      'Son Hi-Fi de haute qualité',
      'Chargeur sans fil Qi 10W intégré',
      'Assistant Google intégré',
      'Compatible Apple AirPlay 2'
    ],
    specifications: {
      puissance: '60W',
      reponseFrequence: '40Hz - 20kHz',
      connectivite: 'Wi-Fi / Bluetooth',
      chargeSansFil: '10W Qi'
    },
    colors: ['Noir', 'Blanc'],
    stock: 10,
    isNew: false,
    isBestSeller: true
  }
];