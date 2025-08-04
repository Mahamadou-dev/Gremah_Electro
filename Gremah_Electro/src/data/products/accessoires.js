// src/data/products/electro/accessoires.js

// You can remove PRODUCTS_BASE_PATH if its only purpose was for the glob import.
// If it's used elsewhere for dynamically constructing image paths AFTER import, keep it.
// For the glob import itself, the path MUST be a static string.
// const PRODUCTS_BASE_PATH = '/src/assets/products/electro/';


const importAccessoiresImages = (fileName) => {
  // CORRECTED: The ENTIRE glob pattern is now a plain, static string literal.
  // We've replaced `${PRODUCTS_BASE_PATH}ACCESSOIRES/` with the full hardcoded path.
  const modules = import.meta.glob('/src/assets/products/electro/ACCESSOIRES/*.{jpg,jpeg,png,webp}', { eager: true });

  // For accessing the 'modules' object, you still need the full static path as the key.
  // This part can still use a template literal because it's evaluated at runtime, not build time by Vite's glob.
  return modules[`/src/assets/products/electro/ACCESSOIRES/${fileName}`]?.default
    || '/fallback-product-image.jpg';
};

export const accessoires = [
  // Clavier Gaming Mécanique Corsair K65 RGB Mini 60%
  {
    id: 'corsair-k65-rgb-mini',
    slug: 'clavier-gaming-mecanique-corsair-k65-rgb-mini-60-cherry-mx-red-noir',
    title: 'Clavier Gaming Mécanique Corsair K65 RGB Mini 60% Cherry MX Red Noir',
    variants: ['Vue 1', 'Vue 2', 'Vue 3', 'Vue 4', 'Standard'],
    price: 12990,
    originalPrice: 14990,
    category: 'Accessoire',
    rating: 4.8,
    images: [
      importAccessoiresImages('clavier-gaming-mecanique-corsair-k65-rgb-mini-60-cherry-mx-red-noir (1).jpg'),
      importAccessoiresImages('clavier-gaming-mecanique-corsair-k65-rgb-mini-60-cherry-mx-red-noir (2).jpg'),
      importAccessoiresImages('clavier-gaming-mecanique-corsair-k65-rgb-mini-60-cherry-mx-red-noir (3).jpg'),
      importAccessoiresImages('clavier-gaming-mecanique-corsair-k65-rgb-mini-60-cherry-mx-red-noir (4).jpg'),
      importAccessoiresImages('clavier-gaming-mecanique-corsair-k65-rgb-mini-60-cherry-mx-red-noir.jpg')
    ],
    description: 'Clavier gaming compact 60% avec switches Cherry MX Red, idéal pour les setups minimalistes et le jeu rapide.',
    features: [
      'Switches mécaniques Cherry MX Red',
      'Format 60% ultra-compact',
      'Rétroéclairage RGB personnalisable',
      'Câble USB-C détachable'
    ],
    specifications: {
      connectivite: 'USB-C filaire',
      layout: 'AZERTY (français)', // Ou QWERTY selon votre marché
      materiaux: 'Aluminium brossé',
      antiGhosting: 'Full N-Key Rollover'
    },
    colors: ['Noir'],
    stock: 25,
    isNew: true,
    isBestSeller: true
  },

  // Souris Sans Fil Razer Naga V2 Hyperspeed
  {
    id: 'razer-naga-v2-hyperspeed',
    slug: 'souris-sans-fil-razer-naga-v2-hyperspeed-noir',
    title: 'Souris Sans Fil Razer Naga V2 Hyperspeed Noir',
    variants: ['Vue 1', 'Vue 2', 'Vue 3', 'Vue 4', 'Standard'],
    price: 9990,
    originalPrice: 10990,
    category: 'Accessoire',
    rating: 4.6,
    images: [
      importAccessoiresImages('souris-sans-fil-razer-naga-v2-hyperspeed-noir (1).jpg'),
      importAccessoiresImages('souris-sans-fil-razer-naga-v2-hyperspeed-noir (2).jpg'),
      importAccessoiresImages('souris-sans-fil-razer-naga-v2-hyperspeed-noir (3).jpg'),
      importAccessoiresImages('souris-sans-fil-razer-naga-v2-hyperspeed-noir (4).jpg'),
      importAccessoiresImages('souris-sans-fil-razer-naga-v2-hyperspeed-noir.jpg')
    ],
    description: 'Souris gaming sans fil avec 20 boutons programmables, idéale pour les MMO et jeux complexes.',
    features: [
      'Technologie sans fil Razer HyperSpeed',
      'Capteur optique Razer Focus Pro 30K DPI',
      '20 boutons programmables',
      'Autonomie jusqu\'à 250h'
    ],
    specifications: {
      connectivite: 'Sans fil 2.4GHz / Bluetooth',
      dpiMax: '30000',
      boutons: '20'
    },
    colors: ['Noir'],
    stock: 18,
    isNew: true,
    isBestSeller: true
  },

  // Clavier Gaming Turtle Beach Titan
  {
    id: 'turtle-beach-titan',
    slug: 'clavier-gaming-turtle-beach-titan',
    title: 'Clavier Gaming Turtle Beach Titan',
    variants: ['Vue 1', 'Vue 2', 'Vue 3', 'Vue 4', 'Standard'],
    price: 8590,
    originalPrice: 9590,
    category: 'Accessoire',
    rating: 4.4,
    images: [
      importAccessoiresImages('clavier-gaming-turtle-beach-titan (1).jpg'),
      importAccessoiresImages('clavier-gaming-turtle-beach-titan (2).jpg'),
      importAccessoiresImages('clavier-gaming-turtle-beach-titan (3).jpg'),
      importAccessoiresImages('clavier-gaming-turtle-beach-titan (4).jpg'),
      importAccessoiresImages('clavier-gaming-turtle-beach-titan.jpg')
    ],
    description: 'Clavier gaming robuste avec switches mécaniques, conçu pour la durabilité et la performance en jeu.',
    features: [
      'Switches mécaniques durables',
      'Rétroéclairage RGB personnalisable par touche',
      'Repose-poignets magnétique',
      'Touches macro dédiées'
    ],
    specifications: {
      connectivite: 'USB filaire',
      layout: 'AZERTY (français)',
      materiaux: 'Plastique renforcé'
    },
    colors: ['Noir'],
    stock: 12,
    isNew: false,
    isBestSeller: false
  },

  // Souris Verticale Sans Fil Havit MS550GT
  {
    id: 'havit-ms550gt',
    slug: 'souris-verticale-sans-fil-havit-ms550gt',
    title: 'Souris Verticale Sans Fil Havit MS550GT',
    variants: ['Vue 1', 'Vue 2', 'Vue 3', 'Vue 4', 'Vue 5', 'Standard'],
    price: 2590,
    originalPrice: 2990,
    category: 'Accessoire',
    rating: 4.3,
    images: [
      importAccessoiresImages('souris-verticale-sans-fil-havit-ms550gt (1).jpg'),
      importAccessoiresImages('souris-verticale-sans-fil-havit-ms550gt (2).jpg'),
      importAccessoiresImages('souris-verticale-sans-fil-havit-ms550gt (3).jpg'),
      importAccessoiresImages('souris-verticale-sans-fil-havit-ms550gt (4).jpg'),
      importAccessoiresImages('souris-verticale-sans-fil-havit-ms550gt (5).jpg'),
      importAccessoiresImages('souris-verticale-sans-fil-havit-ms550gt.jpg')
    ],
    description: 'Souris ergonomique verticale pour réduire la tension du poignet, idéale pour le travail prolongé.',
    features: [
      'Design ergonomique vertical',
      'Connexion sans fil 2.4GHz',
      'DPI réglable (800/1200/1600)',
      'Compatible Windows/Mac'
    ],
    specifications: {
      connectivite: 'Sans fil 2.4GHz (récepteur USB)',
      dpiMax: '1600',
      boutons: '6'
    },
    colors: ['Noir'],
    stock: 30,
    isNew: false,
    isBestSeller: true
  },

  // Coque de Protection Belkin MagSafe pour iPhone 14 Pro
  {
    id: 'belkin-magsafe-iphone-14-pro',
    slug: 'coque-de-protection-belkin-magsafe-pour-iphone-14-pro',
    title: 'Coque de Protection Belkin MagSafe pour iPhone 14 Pro',
    variants: ['Vue 1', 'Vue 2', 'Vue 3', 'Standard'],
    price: 3990,
    originalPrice: 4490,
    category: 'Accessoire',
    rating: 4.7,
    images: [
      importAccessoiresImages('coque-de-protection-belkin-magsafe-pour-iphone-14-pro (1).jpg'),
      importAccessoiresImages('coque-de-protection-belkin-magsafe-pour-iphone-14-pro (2).jpg'),
      importAccessoiresImages('coque-de-protection-belkin-magsafe-pour-iphone-14-pro (3).jpg'),
      importAccessoiresImages('coque-de-protection-belkin-magsafe-pour-iphone-14-pro.jpg')
    ],
    description: 'Coque transparente fine compatible MagSafe, offrant une protection optimale et un accès facile aux boutons.',
    features: [
      'Compatible MagSafe',
      'Matériau anti-jaunissement',
      'Protection contre les chutes',
      'Design fin et léger'
    ],
    specifications: {
      compatibilite: 'iPhone 14 Pro',
      materiaux: 'Polycarbonate / TPU',
      fonctionnalites: 'Aimants MagSafe intégrés'
    },
    colors: ['Transparent'],
    stock: 40,
    isNew: true,
    isBestSeller: false
  },

  // Tapis de Souris ASUS NC05 TUF Gaming P3
  {
    id: 'asus-nc05-tuf-gaming-p3',
    slug: 'tapis-de-souris-asus-nc05-tuf-gaming-p3',
    title: 'Tapis de Souris ASUS NC05 TUF Gaming P3',
    variants: ['Vue 1', 'Vue 2', 'Vue 3', 'Vue 4', 'Standard'],
    price: 1990,
    originalPrice: 2490,
    category: 'Accessoire',
    rating: 4.5,
    images: [
      importAccessoiresImages('tapis-de-souris-asus-nc05-tuf-gaming-p3 (1).jpg'),
      importAccessoiresImages('tapis-de-souris-asus-nc05-tuf-gaming-p3 (2).jpg'),
      importAccessoiresImages('tapis-de-souris-asus-nc05-tuf-gaming-p3 (3).jpg'),
      importAccessoiresImages('tapis-de-souris-asus-nc05-tuf-gaming-p3 (4).jpg'),
      importAccessoiresImages('tapis-de-souris-asus-nc05-tuf-gaming-p3.jpg')
    ],
    description: 'Tapis de souris gaming durable avec surface optimisée pour la précision et base antidérapante.',
    features: [
      'Surface en tissu durable',
      'Base en caoutchouc antidérapante',
      'Bords cousus pour une longue durée de vie',
      'Compatible tous types de capteurs'
    ],
    specifications: {
      dimensions: '350 x 280 x 3 mm',
      materiaux: 'Caoutchouc / Tissu',
      design: 'TUF Gaming'
    },
    colors: ['Noir'],
    stock: 60,
    isNew: false,
    isBestSeller: true
  },

  // Souris Sans Fil Logitech Lift Ergonomique Verticale Graphite
  {
    id: 'logitech-lift-ergonomique',
    slug: 'souris-sans-fil-logitech-lift-ergonomique-verticale-graphite',
    title: 'Souris Sans Fil Logitech Lift Ergonomique Verticale Graphite',
    variants: ['Vue 1', 'Vue 2', 'Vue 3', 'Vue 4', 'Standard'],
    price: 6990,
    originalPrice: 7990,
    category: 'Accessoire',
    rating: 4.9,
    images: [
      importAccessoiresImages('souris-sans-fil-logitech-lift-ergonomique-verticale-graphite (1).jpg'),
      importAccessoiresImages('souris-sans-fil-logitech-lift-ergonomique-verticale-graphite (2).jpg'),
      importAccessoiresImages('souris-sans-fil-logitech-lift-ergonomique-verticale-graphite (3).jpg'),
      importAccessoiresImages('souris-sans-fil-logitech-lift-ergonomique-verticale-graphite (4).jpg'),
      importAccessoiresImages('souris-sans-fil-logitech-lift-ergonomique-verticale-graphite.jpg')
    ],
    description: 'Souris verticale avancée conçue pour le confort et la productivité, avec connexion multi-dispositifs.',
    features: [
      'Design ergonomique vertical 57°',
      'Boutons personnalisables',
      'Connexion Easy-Switch (jusqu\'à 3 appareils)',
      'Autonomie longue durée (pile AA incluse)'
    ],
    specifications: {
      connectivite: 'Bluetooth Low Energy / Récepteur USB Logi Bolt',
      dpiMax: '4000',
      boutons: '6'
    },
    colors: ['Graphite', 'Rose', 'Blanc Cassé'],
    stock: 22,
    isNew: true,
    isBestSeller: true
  }
];