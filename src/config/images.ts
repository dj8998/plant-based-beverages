export const images = {
  // Company/Logo Images
  logo: '/images/logo.png',
  favicon: '/images/favicon.ico',
  
  // Hero Section
  hero: {
    main: '/images/hero/main.jpg',
    background: '/images/hero/background.jpg',
  },
  
  // Category Icons
  categoryIcons: {
    'home-living': '/images/category-icons/furniture.jpg',
    'decor-handicrafts': '/images/category-icons/decor.jpg',
    'tableware-kitchen': '/images/category-icons/icon.jpg',
    'fashion-accessories': '/images/category-icons/handicrafts.jpg',
    'festive-gifting': '/images/category-icons/Group-1.png',
    'specialty-collectibles': '/images/category-icons/Vector.png',
  },
  
  // Product Images
  products: {
    furniture: {
      chairs: '/images/products/furniture/chairs.jpg',
      tables: '/images/products/furniture/tables.jpg',
      sofas: '/images/products/furniture/sofas.jpg',
    },
    decor: {
      paintings: '/images/products/decor/paintings.jpg',
      sculptures: '/images/products/decor/sculptures.jpg',
    },
  },
  
  // Manufacturer Images
  manufacturers: {
    placeholder: '/images/manufacturers/placeholder.jpg',
  },
  
  // UI Elements
  ui: {
    placeholder: '/images/ui/placeholder.jpg',
    loading: '/images/ui/loading.gif',
    error: '/images/ui/error.png',
    noResults: '/images/ui/no-results.png',
  },
  
  // Testimonials
  testimonials: {
    user1: '/images/testimonials/user1.jpg',
    user2: '/images/testimonials/user2.jpg',
    user3: '/images/testimonials/user3.jpg',
  },
  
  // About Us
  about: {
    team: '/images/about/team.jpg',
    office: '/images/about/office.jpg',
    mission: '/images/about/mission.jpg',
  },
  
  // Blog
  blog: {
    placeholder: '/images/blog/placeholder.jpg',
  },
  
  // Social Media
  social: {
    facebook: '/images/social/facebook.png',
    twitter: '/images/social/twitter.png',
    linkedin: '/images/social/linkedin.png',
    instagram: '/images/social/instagram.png',
  },
  
  // Icons
  icons: {
    search: '/images/icons/search.svg',
    menu: '/images/icons/menu.svg',
    close: '/images/icons/close.svg',
    arrow: '/images/icons/arrow.svg',
    star: '/images/icons/star.svg',
    location: '/images/icons/location.svg',
    phone: '/images/icons/phone.svg',
    email: '/images/icons/email.svg',
  },
} as const;

// Type for the images object
export type ImageConfig = typeof images;

// Helper function to get image URL with fallback
export const getImageUrl = (path: string, fallback: string = images.ui.placeholder): string => {
  return path || fallback;
}; 