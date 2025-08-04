// src/data/products/electro/smartphones.js
// (Assuming you've renamed the file from casquesEcouteurs.js to smartphones.js)

// You can remove PRODUCTS_BASE_PATH if its only purpose was for the glob import.
// If it's used elsewhere for dynamically constructing image paths AFTER import, keep it.
// For the glob import itself, the path MUST be a static string.
// const PRODUCTS_BASE_PATH = '/src/assets/products/electro/';


const importSmartphonesImages = (fileName) => {
  // CORRECTED: The ENTIRE glob pattern is now a plain, static string literal.
  // We've replaced `${PRODUCTS_BASE_PATH}SMARTPHONES/` with the full hardcoded path.
  const modules = import.meta.glob('/src/assets/products/electro/SMARTPHONES/*.{jpg,jpeg,png,webp}', { eager: true });

  // For accessing the 'modules' object, you still need the full static path as the key.
  return modules[`/src/assets/products/electro/SMARTPHONES/${fileName}`]?.default
    || '/fallback-product-image.jpg';
};

// --- Smartphones Product Data ---
export const smartphones = [
  // Apple iPhone 16 256 Go 5G Noir
  {
    id: 'apple-iphone-16-256gb',
    slug: 'apple-iphone-16-256-go-5g-noir',
    title: 'Apple iPhone 16 256 Go 5G Noir',
    variants: ['Vue 1', 'Vue 2', 'Vue 3', 'Standard'],
    price: 349990,
    originalPrice: 379990,
    category: 'Smartphones',
    rating: 4.8,
    images: [
      importSmartphonesImages('apple-iphone-16-256-go-5g-noir (1).jpg'),
      importSmartphonesImages('apple-iphone-16-256-go-5g-noir (2).jpg'),
      importSmartphonesImages('apple-iphone-16-256-go-5g-noir (3).jpg'),
      importSmartphonesImages('apple-iphone-16-256-go-5g-noir.jpg')
    ],
    description: 'Le tout nouvel iPhone 16, offrant des performances inégalées, un système de caméra avancé et une connectivité 5G ultra-rapide.',
    features: [
      'Écran Super Retina XDR ProMotion',
      'Puce A18 Bionic ultra-rapide',
      'Double appareil photo 48MP avec Photonic Engine',
      'Connectivité 5G ultra-rapide',
      'Face ID, Résistance à l\'eau et à la poussière IP68'
    ],
    specifications: {
      stockage: '256 Go',
      connectivite: '5G, Wi-Fi 7, Bluetooth 5.4',
      ecran: '6.1" Super Retina XDR',
      appareilPhoto: 'Double 48MP',
      processeur: 'A18 Bionic',
      os: 'iOS 18'
    },
    colors: ['Noir', 'Blanc Étoilé', 'Bleu Pacifique', 'Minuit'],
    stock: 20,
    isNew: true,
    isBestSeller: true
  },

  // Smartphone Samsung Galaxy S24 Ultra 5G 12 Go 256 Go Violet
  {
    id: 'samsung-galaxy-s24-ultra',
    slug: 'smartphone-samsung-galaxy-s24-ultra-5g-12-go-256-go-violet',
    title: 'Smartphone Samsung Galaxy S24 Ultra 5G 12 Go 256 Go Violet',
    variants: ['Vue 1', 'Vue 2', 'Vue 3', 'Standard'],
    price: 289990,
    originalPrice: 319990,
    category: 'Smartphones',
    rating: 4.9,
    images: [
      importSmartphonesImages('smartphone-samsung-galaxy-s24-ultra-5g-12-go-256-go-violet (1).jpg'),
      importSmartphonesImages('smartphone-samsung-galaxy-s24-ultra-5g-12-go-256-go-violet (2).jpg'),
      importSmartphonesImages('smartphone-samsung-galaxy-s24-ultra-5g-12-go-256-go-violet (3).jpg'),
      importSmartphonesImages('smartphone-samsung-galaxy-s24-ultra-5g-12-go-256-go-violet.jpg')
    ],
    description: 'Le Samsung Galaxy S24 Ultra repousse les limites de la photographie mobile avec son capteur 200MP et intègre la puissance de l\'IA.',
    features: [
      'Écran Dynamic AMOLED 2X immersif',
      'S Pen intégré pour une productivité accrue',
      'Quadruple appareil photo 200MP avec Zoom Spatial 100x',
      'Galaxy AI intégré pour des fonctionnalités intelligentes',
      'Batterie longue durée et charge ultra-rapide'
    ],
    specifications: {
      ram: '12 Go',
      stockage: '256 Go',
      connectivite: '5G, Wi-Fi 6E, Bluetooth 5.3',
      ecran: '6.8" Dynamic AMOLED 2X',
      appareilPhoto: 'Quadruple (200MP principal)',
      processeur: 'Snapdragon 8 Gen 3 for Galaxy',
      os: 'Android 14'
    },
    colors: ['Violet Titane', 'Noir Titane', 'Gris Titane', 'Jaune Titane'],
    stock: 15,
    isNew: false,
    isBestSeller: true
  },

  // Smartphone Samsung Galaxy S25 Plus 5G 12 Go 256 Go Bleu + Gold VIP Card Offert
  {
    id: 'samsung-galaxy-s25-plus',
    slug: 'smartphone-samsung-galaxy-s25-plus-5g-12-go-256-go-bleu-gold-vip-card-offert',
    title: 'Smartphone Samsung Galaxy S25 Plus 5G 12 Go 256 Go Bleu + Gold VIP Card Offert',
    variants: ['Vue 1', 'Vue 2', 'Vue 3', 'Vue 4', 'Standard'],
    price: 249990,
    originalPrice: 269990,
    category: 'Smartphones',
    rating: 4.7,
    images: [
      importSmartphonesImages('smartphone-samsung-galaxy-s25-plus-5g-12-go-256-go-bleu-gold-vip-card-offert (1).jpg'),
      importSmartphonesImages('smartphone-samsung-galaxy-s25-plus-5g-12-go-256-go-bleu-gold-vip-card-offert (2).jpg'),
      importSmartphonesImages('smartphone-samsung-galaxy-s25-plus-5g-12-go-256-go-bleu-gold-vip-card-offert (3).jpg'),
      importSmartphonesImages('smartphone-samsung-galaxy-s25-plus-5g-12-go-256-go-bleu-gold-vip-card-offert (4).jpg'),
      importSmartphonesImages('smartphone-samsung-galaxy-s25-plus-5g-12-go-256-go-bleu-gold-vip-card-offert.jpg')
    ],
    description: 'Le Galaxy S25 Plus, plus puissant et plus intelligent, avec un design affiné et des capacités photo/vidéo améliorées. Une offre exclusive avec la Gold VIP Card.',
    features: [
      'Écran Dynamic AMOLED 2X avec taux de rafraîchissement adaptatif',
      'Processeur Exynos 2500 de nouvelle génération',
      'Triple appareil photo avec zoom optique amélioré',
      'Fonctionnalités Galaxy AI avancées',
      'Charge ultra-rapide et sans fil inversée'
    ],
    specifications: {
      ram: '12 Go',
      stockage: '256 Go',
      connectivite: '5G, Wi-Fi 7, Bluetooth 5.4',
      ecran: '6.7" Dynamic AMOLED 2X',
      appareilPhoto: 'Triple (50MP principal)',
      processeur: 'Exynos 2500',
      os: 'Android 15'
    },
    colors: ['Bleu', 'Noir', 'Rose', 'Vert'],
    stock: 10,
    isNew: true,
    isBestSeller: true
  },

  // Smartphone Xiaomi Redmi 14T Pro 12/512 Gris
  {
    id: 'xiaomi-redmi-14t-pro',
    slug: 'smartphone-xiaomi-redmi-14t-pro-12512-gris',
    title: 'Smartphone Xiaomi Redmi 14T Pro 12/512 Gris',
    variants: ['Vue 1', 'Vue 2', 'Vue 3', 'Vue 4', 'Vue 5', 'Standard'],
    price: 99990,
    originalPrice: 109990,
    category: 'Smartphones',
    rating: 4.5,
    images: [
      importSmartphonesImages('smartphone-xiaomi-redmi-14t-pro-12512-gris (1).jpg'),
      importSmartphonesImages('smartphone-xiaomi-redmi-14t-pro-12512-gris (2).jpg'),
      importSmartphonesImages('smartphone-xiaomi-redmi-14t-pro-12512-gris (3).jpg'),
      importSmartphonesImages('smartphone-xiaomi-redmi-14t-pro-12512-gris (4).jpg'),
      importSmartphonesImages('smartphone-xiaomi-redmi-14t-pro-12512-gris (5).jpg'),
      importSmartphonesImages('smartphone-xiaomi-redmi-14t-pro-12512-gris.jpg')
    ],
    description: 'Le Redmi 14T Pro offre un excellent rapport qualité-prix avec un grand écran, une batterie solide et des performances fiables pour le quotidien.',
    features: [
      'Écran AMOLED Full HD+ avec taux de rafraîchissement élevé',
      'Processeur MediaTek Dimensity performant',
      'Grande capacité de stockage (512 Go)',
      'Triple appareil photo avec capteur principal haute résolution',
      'Batterie massive avec charge rapide'
    ],
    specifications: {
      ram: '12 Go',
      stockage: '512 Go',
      connectivite: '5G, Wi-Fi 6, Bluetooth 5.2',
      ecran: '6.7" AMOLED',
      appareilPhoto: 'Triple (64MP principal)',
      processeur: 'MediaTek Dimensity 9300',
      os: 'Android 14 (MIUI)'
    },
    colors: ['Gris', 'Bleu', 'Vert'],
    stock: 30,
    isNew: true,
    isBestSeller: false
  }
];