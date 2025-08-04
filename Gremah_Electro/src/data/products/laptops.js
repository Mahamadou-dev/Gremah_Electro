// src/data/products/electro/laptops.js

// You can remove PRODUCTS_BASE_PATH if its only purpose was for the glob import.
// If it's used elsewhere for dynamically constructing image paths AFTER import, keep it.
// For the glob import itself, the path MUST be a static string.
// const PRODUCTS_BASE_PATH = '/src/assets/products/electro/';


const importLaptopsImages = (fileName) => {
  // CORRECTED: The ENTIRE glob pattern is now a plain, static string literal.
  // We've replaced `${PRODUCTS_BASE_PATH}LAPTOPS/` with the full hardcoded path.
  const modules = import.meta.glob('/src/assets/products/electro/LAPTOPS/*.{jpg,jpeg,png,webp}', { eager: true });

  // For accessing the 'modules' object, you still need the full static path as the key.
  return modules[`/src/assets/products/electro/LAPTOPS/${fileName}`]?.default
    || '/fallback-product-image.jpg';
};

// --- Laptops Product Data ---
export const laptops = [
  // PC Portable ASUS ProArt P16 H7606 Ryzen AI 9 HX 370 RTX 5070
  {
    id: 'asus-proart-p16-h7606',
    slug: 'pc-portable-asus-proart-p16-h7606-ryzen-ai-9-hx-370-rtx-5070-8g-32-go-1-to-ssd-windows-11-noir',
    title: 'PC Portable ASUS ProArt P16 H7606 Ryzen AI 9 HX 370 RTX 5070 8G 32 Go 1 To SSD Windows 11 Noir',
    variants: ['Vue 1', 'Vue 2', 'Vue 3', 'Standard'],
    price: 449990,
    originalPrice: 489990,
    category: 'Laptops',
    rating: 4.9,
    images: [
      importLaptopsImages('pc-portable-asus-proart-p16-h7606-ryzen-ai-9-hx-370-rtx-5070-8g-32-go-1-to-ssd-windows-11-noir (1).jpg'),
      importLaptopsImages('pc-portable-asus-proart-p16-h7606-ryzen-ai-9-hx-370-rtx-5070-8g-32-go-1-to-ssd-windows-11-noir (2).jpg'),
      importLaptopsImages('pc-portable-asus-proart-p16-h7606-ryzen-ai-9-hx-370-rtx-5070-8g-32-go-1-to-ssd-windows-11-noir (3).jpg'),
      importLaptopsImages('pc-portable-asus-proart-p16-h7606-ryzen-ai-9-hx-370-rtx-5070-8g-32-go-1-to-ssd-windows-11-noir.jpg')
    ],
    description: 'Ordinateur portable de création premium avec processeur AI et carte graphique RTX série 50 pour des performances inégalées en design et rendu.',
    features: [
      'Écran OLED 16" 4K HDR',
      'Processeur AMD Ryzen AI 9 HX 370',
      'NVIDIA GeForce RTX 5070 8Go GDDR6',
      '32 Go RAM DDR5, 1 To SSD NVMe PCIe 4.0',
      'Windows 11 Professionnel'
    ],
    specifications: {
      processeur: 'AMD Ryzen AI 9 HX 370',
      carteGraphique: 'NVIDIA RTX 5070 8G',
      ram: '32 Go DDR5',
      stockage: '1 To SSD',
      ecran: '16" OLED 4K',
      os: 'Windows 11 Pro'
    },
    colors: ['Noir'],
    stock: 7,
    isNew: true,
    isBestSeller: true
  },

  // PC Portable ASUS Vivobook S 14 Flip TP3402VA i9-13900H
  {
    id: 'asus-vivobook-s14-flip-tp3402va',
    slug: 'pc-portable-asus-vivobook-s-14-flip-tp3402va-i9-13900h-24-go-windows-11-silver',
    title: 'PC Portable ASUS Vivobook S 14 Flip TP3402VA i9-13900H 24 Go Windows 11 Silver',
    variants: ['Vue 1', 'Vue 2', 'Vue 3', 'Standard'],
    price: 619990,
    originalPrice: 654990,
    category: 'Laptops',
    rating: 4.5,
    images: [
      importLaptopsImages('pc-portable-asus-vivobook-s-14-flip-tp3402va-i9-13900h-24-go-windows-11-silver (1).jpg'),
      importLaptopsImages('pc-portable-asus-vivobook-s-14-flip-tp3402va-i9-13900h-24-go-windows-11-silver (2).jpg'),
      importLaptopsImages('pc-portable-asus-vivobook-s-14-flip-tp3402va-i9-13900h-24-go-windows-11-silver (3).jpg'),
      importLaptopsImages('pc-portable-asus-vivobook-s-14-flip-tp3402va-i9-13900h-24-go-windows-11-silver.jpg')
    ],
    description: 'Un ultraportable polyvalent 2-en-1 avec écran tactile et charnière à 360°, parfait pour la productivité et le divertissement.',
    features: [
      'Écran tactile 14" Full HD, Charnière 360°',
      'Processeur Intel Core i9-13900H',
      '24 Go RAM LPDDR5, 512 Go SSD NVMe',
      'Windows 11 Famille',
      'Design fin et léger'
    ],
    specifications: {
      processeur: 'Intel Core i9-13900H',
      ram: '24 Go DDR5',
      stockage: '512 Go SSD',
      ecran: '14" Full HD Tactile',
      os: 'Windows 11 Home',
      poids: '1.5 kg'
    },
    colors: ['Argent'],
    stock: 12,
    isNew: false,
    isBestSeller: true
  },

  // PC Portable Gamer ASUS ROG Zephyrus G16 2024 GU605MV
  {
    id: 'asus-rog-zephyrus-g16-2024-gu605mv',
    slug: 'pc-portable-gamer-asus-rog-zephyrus-g16-2024-gu605mv-ultra-9-185h-rtx-4060-8g-32-go-ddr5-1-to-ssd-windows-11-blanc',
    title: 'PC Portable Gamer ASUS ROG Zephyrus G16 2024 GU605MV Ultra 9 185H RTX 4060 8G 32 Go DDR5 1 To SSD Windows 11 Blanc',
    variants: ['Vue 1', 'Vue 2', 'Vue 3', 'Standard'],
    price: 769990,
    originalPrice: 799990,
    category: 'Laptops',
    rating: 4.7,
    images: [
      importLaptopsImages('pc-portable-gamer-asus-rog-zephyrus-g16-2024-gu605mv-ultra-9-185h-rtx-4060-8g-32-go-ddr5-1-to-ssd-windows-11-blanc (1).jpg'),
      importLaptopsImages('pc-portable-gamer-asus-rog-zephyrus-g16-2024-gu605mv-ultra-9-185h-rtx-4060-8g-32-go-ddr5-1-to-ssd-windows-11-blanc (2).jpg'),
      importLaptopsImages('pc-portable-gamer-asus-rog-zephyrus-g16-2024-gu605mv-ultra-9-185h-rtx-4060-8g-32-go-1-to-ssd-windows-11-blanc (3).jpg'),
      importLaptopsImages('pc-portable-gamer-asus-rog-zephyrus-g16-2024-gu605mv-ultra-9-185h-rtx-4060-8g-32-go-1-to-ssd-windows-11-blanc.jpg')
    ],
    description: 'Un PC portable gamer fin et puissant avec un design élégant, offrant des performances de pointe pour les jeux et la création de contenu.',
    features: [
      'Écran ROG Nebula OLED 16" QHD+ 240Hz',
      'Processeur Intel Core Ultra 9 185H',
      'NVIDIA GeForce RTX 4060 8Go GDDR6',
      '32 Go RAM DDR5, 1 To SSD NVMe PCIe 4.0',
      'Système de refroidissement intelligent ROG Intelligent Cooling'
    ],
    specifications: {
      processeur: 'Intel Core Ultra 9 185H',
      carteGraphique: 'NVIDIA RTX 4060 8G',
      ram: '32 Go DDR5',
      stockage: '1 To SSD',
      ecran: '16" QHD+ OLED 240Hz',
      os: 'Windows 11 Home'
    },
    colors: ['Blanc'],
    stock: 9,
    isNew: true,
    isBestSeller: true
  },

  // PC Portable Gamer Lenovo Legion Pro 7 16IRX9H i9-14900HX RTX 4090
  {
    id: 'lenovo-legion-pro-7-16irx9h',
    slug: 'pc-portable-gamer-lenovo-legion-pro-7-16irx9h-i9-14900hx-rtx-4090-16g-64-go-ddr5-1-to-ssd-windows-11-noir',
    title: 'PC Portable Gamer Lenovo Legion Pro 7 16IRX9H i9-14900HX RTX 4090 16G 64 Go DDR5 1 To SSD Windows 11 Noir',
    variants: ['Vue 1', 'Vue 2', 'Vue 3', 'Standard'],
    price: 489990,
    originalPrice: 539990,
    category: 'Laptops',
    rating: 4.9,
    images: [
      importLaptopsImages('pc-portable-gamer-lenovo-legion-pro-7-16irx9h-i9-14900hx-rtx-4090-16g-64-go-ddr5-1-to-ssd-windows-11-noir (1).jpg'),
      importLaptopsImages('pc-portable-gamer-lenovo-legion-pro-7-16irx9h-i9-14900hx-rtx-4090-16g-64-go-ddr5-1-to-ssd-windows-11-noir (2).jpg'),
      importLaptopsImages('pc-portable-gamer-lenovo-legion-pro-7-16irx9h-i9-14900hx-rtx-4090-16g-64-go-ddr5-1-to-ssd-windows-11-noir (3).jpg'),
      importLaptopsImages('pc-portable-gamer-lenovo-legion-pro-7-16irx9h-i9-14900hx-rtx-4090-16g-64-go-ddr5-1-to-ssd-windows-11-noir.jpg')
    ],
    description: 'Le summum de la puissance gaming portable avec un processeur Intel Core i9 et une carte graphique RTX 4090 pour des performances extrêmes.',
    features: [
      'Écran 16" QHD+ IPS 240Hz G-Sync',
      'Processeur Intel Core i9-14900HX',
      'NVIDIA GeForce RTX 4090 16Go GDDR6',
      '64 Go RAM DDR5, 1 To SSD NVMe PCIe 4.0',
      'Système de refroidissement Legion ColdFront 5.0'
    ],
    specifications: {
      processeur: 'Intel Core i9-14900HX',
      carteGraphique: 'NVIDIA RTX 4090 16G',
      ram: '64 Go DDR5',
      stockage: '1 To SSD',
      ecran: '16" QHD+ IPS 240Hz',
      os: 'Windows 11 Home'
    },
    colors: ['Noir'],
    stock: 4,
    isNew: true,
    isBestSeller: true
  }
];