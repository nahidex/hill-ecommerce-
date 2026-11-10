import { ProductItem, CategoryInfo, SellerProfile } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_hill_harvest_1794320369649.jpg';
export const PINEAPPLE_IMAGE = '/src/assets/images/product_hill_pineapple_1794320370891.jpg';
export const SPICES_IMAGE = '/src/assets/images/product_hill_spices_1794320372342.jpg';
export const HANDLOOM_IMAGE = '/src/assets/images/product_hill_handloom_1794320372286.jpg';
export const MANGO_IMAGE = '/src/assets/images/hill_mango_harvest_1794322424980.jpg';

export const SELLER_PROFILES: Record<string, SellerProfile> = {
  'seller-01': {
    id: 'seller-01',
    name: 'মং শৈ প্রু মারমা',
    businessName: 'রুমা হিলস এগ্রো কো-অপারেটিভ',
    district: 'রাঙামাটি',
    upazila: 'কাপ্তাই',
    sellerType: 'উৎপাদক',
    verified: true,
    rating: 4.9,
    totalReviews: 128,
    listedProductsCount: 14,
    completedTransactions: 340,
    avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80',
    bio: 'রাঙামাটি ও কাপ্তাই লেক বেসিনের উঁচু পাহাড়ে শতভাগ কেমিক্যালমুক্ত মিষ্টি আনারস ও কলা চাষ করি। সরাসরি ট্রাকে ঢাকা ও চট্টগ্রামের পাইকারি বাজারে সরবরাহের নির্ভরযোগ্য সহযোগী।',
    joinedDate: 'মার্চ ২০২৬',
    phone: '০১৮১৮-৪৫৬৭৮৯',
    email: 'mong.fruits@hillecommerce.gov.bd'
  },
  'seller-02': {
    id: 'seller-02',
    name: 'উ থোয়াই মারমা',
    businessName: 'থানচি জৈব মসলা উৎপাদক দল',
    district: 'বান্দরবান',
    upazila: 'থানচি',
    sellerType: 'সমবায় সমিতি',
    verified: true,
    rating: 4.95,
    totalReviews: 165,
    listedProductsCount: 8,
    completedTransactions: 420,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    bio: 'বান্দরবানের পাহাড়ি মাটি ও জুম পদ্ধতিতে উৎপাদিত তীব্র ঝাঁজ ও উচ্চ কারকিউমিন সমৃদ্ধ হলুদ ও আদা প্রক্রিয়াজাত ও পাইকারি বিপণন করি।',
    joinedDate: 'জানুয়ারি ২০২৬',
    phone: '০১৮১৯-১১২২৩৩',
    email: 'thanchi.spices@hillecommerce.gov.bd'
  },
  'seller-03': {
    id: 'seller-03',
    name: 'কামাল আহমেদ চৌধুরী',
    businessName: 'চেঙ্গী ভ্যালি এগ্রো সাপ্লাইয়ার্স',
    district: 'খাগড়াছড়ি',
    upazila: 'মহালছড়ি',
    sellerType: 'সরবরাহকারী',
    verified: true,
    rating: 4.88,
    totalReviews: 92,
    listedProductsCount: 22,
    completedTransactions: 510,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    bio: 'খাগড়াছড়ির ২৫০+ ক্ষুদ্র চাষীদের কাছ থেকে বাছাইকৃত আদা, বাঁশ-বেতের হস্তশিল্প ও শাকসবজি সংগ্রহ করে নিজস্ব প্যাকেজিং সেন্টারের মাধ্যমে বড় করপোরেট পাইকারদের কাছে সরবরাহ করি।',
    joinedDate: 'ফেব্রুয়ারি ২০২৬',
    phone: '০১৭১১-৮৭৬৫৪৩',
    email: 'kamal.chengi@hillecommerce.gov.bd'
  },
  'seller-04': {
    id: 'seller-04',
    name: 'চিনু মারমা ও কারুশিল্পী দল',
    businessName: 'মারমা ক্রাফট অ্যান্ড হ্যান্ডলুম হাব',
    district: 'বান্দরবান',
    upazila: 'রোয়াংছড়ি',
    sellerType: 'ব্যবসায়ী',
    verified: true,
    rating: 5.0,
    totalReviews: 142,
    listedProductsCount: 18,
    completedTransactions: 280,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    bio: 'কোমর তাঁতে বোনা পাহাড়ি পিনন-হাদি, নকশী শাল ও প্রাকৃতিক বাঁশ-বেতের হস্তশিল্প প্রস্তুত ও দেশব্যাপী পাইকারি সরবরাহকারী প্রতিষ্ঠান।',
    joinedDate: 'এপ্রিল ২০২৬',
    phone: '০১৮২৫-৯৯৮৮৭৭',
    email: 'chinu.crafts@hillecommerce.gov.bd'
  }
};

export const SAMPLE_PRODUCTS: ProductItem[] = [
  // Product 0: Flagship Hill Mango (আম্রপালি)
  {
    id: 'prod-mango-01',
    name: 'আম (বান্দরবানের পাহাড়ি আম্রপালি ও রূপালী আম)',
    category: 'তাজা ফলমূল',
    categorySlug: 'fruits',
    origin: 'রুমা ও থানচি, বান্দরবান',
    district: 'বান্দরবান',
    upazila: 'রুমা',
    producerName: 'উ থোয়াই মারমা (বান্দরবান হিল ম্যাঙ্গো সমবায়)',
    producerType: 'উৎপাদক সমবায়',
    sellerId: 'seller-02',
    sellerType: 'সমবায় সমিতি',
    isVerifiedSeller: true,
    isPerishable: true,
    qualityGrade: '১ম গ্রেড প্রিমিয়াম (২৫০–৩৫০ গ্রাম প্রতি পিস)',
    pricePerUnit: 110,
    unit: 'কেজি',
    minOrderQuantity: 300,
    availableQuantity: 15000,
    rating: 4.98,
    totalReviews: 184,
    harvestDate: 'মৌসুম ২০২৬ (গাছপাকা সতেজ হার্ভেস্ট)',
    description: 'বান্দরবানের উঁচু পাহাড়ি খাঁড়া ঢালে পাথুরে মাটির খনিজ সমৃদ্ধ সেরা জাতের আম্রপালি আম। সমতলের চেয়ে দ্বিগুণ সুমিষ্ট, গাঢ় সোনালী শাঁস এবং সম্পূর্ণ আঁশমুক্ত। কোনো কৃত্রিম কার্বাইড বা কেমিক্যাল ছাড়া স্বাভাবিক তাপমাত্রায় পাকা। বড় ফলের আড়ত, চেইন সুপারশপ ও জুস প্রস্তুতকারকদের জন্য প্রিমিয়াম বাছাইকৃত লট।',
    image: MANGO_IMAGE,
    galleryImages: [MANGO_IMAGE, HERO_IMAGE],
    badge: 'সেরা পাহাড়ি আম',
    status: 'active',
    bulkPricingTiers: [
      { minQty: 300, maxQty: 999, price: 110 },
      { minQty: 1000, maxQty: 4999, price: 98 },
      { minQty: 5000, maxQty: 15000, price: 88 },
      { minQty: 15000, maxQty: 'সর্বোচ্চ লট', price: 'আলোচনা সাপেক্ষে' }
    ],
    specifications: {
      organic: true,
      packaging: '২০ কেজি ধারণক্ষমতাসম্পন্ন কুশনযুক্ত প্লাস্টিক ক্রেট',
      deliveryTime: '২৪ ঘণ্টার মধ্যে কোল্ড চেইন / ভেন্টিলেটেড ট্রাকে প্রেরণে প্রস্তুত',
      shelfLife: '৭-১০ দিন',
      purityGrade: 'শতভাগ গাছপাকা ও কার্বাইডমুক্ত',
      storageRequirement: '১২-১৫ ডিগ্রি সেলসিয়াস বা বায়ু চলাচলযোগ্য ঠান্ডা স্থান'
    }
  },

  // Product 00: Exotic Hill Mango (রাংগু ও ব্যানানা ম্যাঙ্গো)
  {
    id: 'prod-mango-02',
    name: 'আম (খাগড়াছড়ির রসালো রাংগু ও ব্যানানা ম্যাঙ্গো)',
    category: 'তাজা ফলমূল',
    categorySlug: 'fruits',
    origin: 'দীঘিনালা ও মহালছড়ি, খাগড়াছড়ি',
    district: 'খাগড়াছড়ি',
    upazila: 'দীঘিনালা',
    producerName: 'কামাল আহমেদ চৌধুরী (চেঙ্গী ভ্যালি এগ্রো)',
    producerType: 'সরবরাহকারী',
    sellerId: 'seller-03',
    sellerType: 'সরবরাহকারী',
    isVerifiedSeller: true,
    isPerishable: true,
    qualityGrade: 'এক্সপোর্ট কোয়ালিটি ব্যানানা ও রাংগু আম',
    pricePerUnit: 140,
    unit: 'কেজি',
    minOrderQuantity: 200,
    availableQuantity: 8000,
    rating: 4.93,
    totalReviews: 112,
    harvestDate: 'মৌসুম ২০২৬ (বাছাইকৃত লট)',
    description: 'খাগড়াছড়ির পাহাড়ি বাগান থেকে সংগৃহীত বিশেষ রাংগু ও আকর্ষণীয় লম্বাটে ব্যানানা ম্যাঙ্গো। অপূর্ব সুবাস ও তুলনাহীন স্বাদের জন্য প্রিমিয়াম বাজারে ব্যাপক চাহিদা। ফ্রুট ব্যাগিং পদ্ধতিতে কীটনাশকমুক্ত উপায়ে চাষকৃত।',
    image: MANGO_IMAGE,
    galleryImages: [MANGO_IMAGE, HERO_IMAGE],
    badge: 'এক্সপোর্ট ভ্যারাইটি',
    status: 'active',
    bulkPricingTiers: [
      { minQty: 200, maxQty: 499, price: 140 },
      { minQty: 500, maxQty: 1999, price: 128 },
      { minQty: 2000, maxQty: 8000, price: 115 }
    ],
    specifications: {
      organic: true,
      packaging: 'ফ্রুট ব্যাগড ও পেপার কুশনিংযুক্ত ১০/২০ কেজি মাস্টার কার্টন',
      deliveryTime: '২৪-৪৮ ঘণ্টার মধ্যে ঢাকা ও চট্টগ্রামে সরবরাহ',
      shelfLife: '৮-১২ দিন',
      purityGrade: 'শতভাগ রাসায়নিকমুক্ত পাহাড়ি ফল',
      storageRequirement: 'শুষ্ক ও স্বাভাবিক বায়ু চলাচলযুক্ত স্থান'
    }
  },

  // Product 1 from prompt
  {
    id: 'prod-01',
    name: 'আনারস (জায়ান্ট কিউ মিষ্টি পাহাড়ি আনারস)',
    category: 'তাজা ফলমূল',
    categorySlug: 'fruits',
    origin: 'কাপ্তাই ও নানিয়ারচর, রাঙামাটি',
    district: 'রাঙামাটি',
    upazila: 'কাপ্তাই',
    producerName: 'মং শৈ প্রু মারমা (রুমা হিলস এগ্রো)',
    producerType: 'উৎপাদক',
    sellerId: 'seller-01',
    sellerType: 'উৎপাদক',
    isVerifiedSeller: true,
    isPerishable: true,
    qualityGrade: 'গ্রেড-এ (ওজন ১.২–১.৬ কেজি প্রতি পিস)',
    pricePerUnit: 25,
    unit: 'পিস',
    minOrderQuantity: 500,
    availableQuantity: 10000,
    rating: 4.9,
    totalReviews: 128,
    harvestDate: 'নভেম্বর ২০২৬ (তাজা গাছপাকা)',
    description: 'রাঙামাটির পাহাড়ি ঢালে সম্পূর্ণ জৈব পদ্ধতিতে উৎপাদিত জায়ান্ট কিউ জাতের মিষ্টি রসালো আনারস। কোনো ধরনের কৃত্রিম পাকন হরমোন বা কীটনাশক ছাড়া প্রাকৃতিক মাটিতে উৎপাদিত। পাইকারি আড়তদার ও সুপারশপের জন্য সরাসরি ফার্ম থেকে বাছাইকৃত প্যাকিং।',
    image: PINEAPPLE_IMAGE,
    galleryImages: [PINEAPPLE_IMAGE, HERO_IMAGE],
    badge: 'সেরা পাইকারি অফার',
    status: 'active',
    bulkPricingTiers: [
      { minQty: 500, maxQty: 1999, price: 25 },
      { minQty: 2000, maxQty: 4999, price: 23 },
      { minQty: 5000, maxQty: 9999, price: 21 },
      { minQty: 10000, maxQty: 'সর্বোচ্চ লট', price: 'আলোচনা সাপেক্ষে' }
    ],
    specifications: {
      organic: true,
      packaging: 'বায়ু চলাচলযোগ্য বাঁশের খাঁচা ও কুশনযুক্ত কাঠের ক্রেট',
      deliveryTime: '২৪-৪৮ ঘণ্টার মধ্যে চালান প্রস্তুত',
      shelfLife: '৮-১০ দিন',
      purityGrade: 'শতভাগ মিষ্টি ও রাসায়নিকমুক্ত',
      storageRequirement: '১০-১৫ ডিগ্রি সেলসিয়াস বায়ু চলাচলযুক্ত স্থান'
    }
  },

  // Product 2 from prompt
  {
    id: 'prod-02',
    name: 'হলুদ (বান্দরবানের খাঁটি পাহাড়ি কাঁচা ও শুকনো হলুদ)',
    category: 'মসলা ও খাদ্যপণ্য',
    categorySlug: 'spices',
    origin: 'থানচি ও রুমা, বান্দরবান',
    district: 'বান্দরবান',
    upazila: 'থানচি',
    producerName: 'উ থোয়াই মারমা (থানচি মসলা সমবায়)',
    producerType: 'সমবায় সমিতি',
    sellerId: 'seller-02',
    sellerType: 'সমবায় সমিতি',
    isVerifiedSeller: true,
    isPerishable: false,
    qualityGrade: 'উচ্চ কারকিউমিন (৬.২%) ১ম গ্রেড',
    pricePerUnit: 180,
    unit: 'কেজি',
    minOrderQuantity: 100,
    availableQuantity: 2000,
    rating: 4.95,
    totalReviews: 165,
    harvestDate: 'বর্তমান মৌসুম ২০২৬',
    description: 'বান্দরবানের উঁচু পাহাড়ে খাঁটি জুম চাষে উৎপাদিত তীব্র সুবাস ও গাঢ় হলুদ রঙের খাঁটি পাহাড়ি হলুদ। কারকিউমিনের মাত্রা সমতলের হলুদের চেয়ে প্রায় দ্বিগুণ। মসলা মিল ও বৃহৎ খাদ্য প্রক্রিয়াজাতকারী প্রতিষ্ঠানের জন্য আদর্শ।',
    image: SPICES_IMAGE,
    galleryImages: [SPICES_IMAGE, HERO_IMAGE],
    badge: 'উচ্চ কারকিউমিন',
    status: 'active',
    bulkPricingTiers: [
      { minQty: 100, maxQty: 499, price: 180 },
      { minQty: 500, maxQty: 999, price: 170 },
      { minQty: 1000, maxQty: 1999, price: 160 },
      { minQty: 2000, maxQty: 'বাল্ক লট', price: 'আলোচনা সাপেক্ষে' }
    ],
    specifications: {
      organic: true,
      packaging: '৫০ কেজি ফুড গ্রেড ডাবল লেয়ার পাটের বস্তা',
      deliveryTime: '২৪ ঘণ্টার মধ্যে প্রেরণে প্রস্তুত',
      shelfLife: '১৮ মাস (শুকনো অবস্থায়)',
      purityGrade: 'শতভাগ প্রাকৃতিক অর্গানিক',
      storageRequirement: 'শুষ্ক ও আর্দ্রতামুক্ত ওয়্যারহাউজ'
    }
  },

  // Product 3 from prompt
  {
    id: 'prod-03',
    name: 'আদা (খাগড়াছড়ির পাহাড়ি দেশি ঝাঁঝালো জুম আদা)',
    category: 'মসলা ও খাদ্যপণ্য',
    categorySlug: 'spices',
    origin: 'মহালছড়ি ও দীঘিনালা, খাগড়াছড়ি',
    district: 'খাগড়াছড়ি',
    upazila: 'মহালছড়ি',
    producerName: 'কামাল আহমেদ চৌধুরী (চেঙ্গী ভ্যালি এগ্রো)',
    producerType: 'সরবরাহকারী',
    sellerId: 'seller-03',
    sellerType: 'সরবরাহকারী',
    isVerifiedSeller: true,
    isPerishable: true,
    qualityGrade: '১ম গ্রেড তাজা পরিপক্ব মূল',
    pricePerUnit: 150,
    unit: 'কেজি',
    minOrderQuantity: 100,
    availableQuantity: 1500,
    rating: 4.88,
    totalReviews: 92,
    harvestDate: 'নভেম্বর ২০২৬ (সতেজ উত্তোলন)',
    description: 'খাগড়াছড়ির উর্বর লাল পাহাড়ি মাটিতে ফলিত পাতলা খোসাবিশিষ্ট তীব্র ঝাঁঝালো পাহাড়ি আদা। ওষধি গুণাগুণে ভরপুর ও দীর্ঘস্থায়ী। পাইকারি কাঁচাবাজার ও খাদ্য প্রস্তুতকারকদের প্রথম পছন্দ।',
    image: SPICES_IMAGE,
    galleryImages: [SPICES_IMAGE, PINEAPPLE_IMAGE],
    badge: 'তাজা হার্ভেস্ট',
    status: 'active',
    bulkPricingTiers: [
      { minQty: 100, maxQty: 399, price: 150 },
      { minQty: 400, maxQty: 999, price: 140 },
      { minQty: 1000, maxQty: 1500, price: 130 }
    ],
    specifications: {
      organic: true,
      packaging: '৫০ কেজি ভেন্টিলেটেড মেশ ব্যাগ',
      deliveryTime: '২৪-৪৮ ঘণ্টা',
      shelfLife: '২৫-৩০ দিন',
      purityGrade: 'কেমিক্যাল ও ধূলিমুক্ত বাছাইকৃত',
      storageRequirement: 'ঠান্ডা ও ছায়াযুক্ত আর্দ্রতাহীন স্থান'
    }
  },

  // Product 4 from prompt
  {
    id: 'prod-04',
    name: 'কলা (রাঙামাটির পাহাড়ি সাগর ও চম্পা কলা)',
    category: 'তাজা ফলমূল',
    categorySlug: 'fruits',
    origin: 'বাঘাইছড়ি ও কাপ্তাই, রাঙামাটি',
    district: 'রাঙামাটি',
    upazila: 'বাঘাইছড়ি',
    producerName: 'মং শৈ প্রু মারমা (রুমা হিলস এগ্রো)',
    producerType: 'উৎপাদক',
    sellerId: 'seller-01',
    sellerType: 'উৎপাদক',
    isVerifiedSeller: true,
    isPerishable: true,
    qualityGrade: 'গ্রেড-এ সুপুষ্ট প্রাকৃতিক ছড়া',
    pricePerUnit: 220,
    unit: 'ডজন',
    minOrderQuantity: 200,
    availableQuantity: 5000,
    rating: 4.85,
    totalReviews: 78,
    harvestDate: 'প্রতিদিন সকালে তাজা ছাঁটাই',
    description: 'রাঙামাটির পাহাড়ি খাড়াই বাগানে ফলানো সুমিষ্ট পুষ্টিকর পাহাড়ি কলা। ঘন শাঁস ও প্রাকৃতিক সুঘ্রাণযুক্ত। কোনো কার্বাইড ছাড়াই প্রাকৃতিক উপায়ে পরিবহন উপযোগী।',
    image: PINEAPPLE_IMAGE,
    galleryImages: [PINEAPPLE_IMAGE, HERO_IMAGE],
    badge: 'কেমিক্যালমুক্ত',
    status: 'active',
    bulkPricingTiers: [
      { minQty: 200, maxQty: 999, price: 220 },
      { minQty: 1000, maxQty: 2999, price: 205 },
      { minQty: 3000, maxQty: 5000, price: 190 }
    ],
    specifications: {
      organic: true,
      packaging: 'ফোম কুশনিংযুক্ত সুরক্ষিত প্লাস্টিক ক্রেট',
      deliveryTime: '২৪ ঘণ্টা',
      shelfLife: '৬-৮ দিন',
      purityGrade: '১০০% কার্বাইডমুক্ত',
      storageRequirement: 'স্বাভাবিক তাপমাত্রায় ঝুলিয়ে রাখা'
    }
  },

  // Product 5 from prompt
  {
    id: 'prod-05',
    name: 'বাঁশের তৈরি হস্তশিল্প (সৌখিন ঝুড়ি, ট্রে ও আসবাব সামগ্রী)',
    category: 'বাঁশ ও বেতের পণ্য',
    categorySlug: 'bamboo',
    origin: 'পানছড়ি ও মহালছড়ি, খাগড়াছড়ি',
    district: 'খাগড়াছড়ি',
    upazila: 'পানছড়ি',
    producerName: 'কামাল আহমেদ চৌধুরী (চেঙ্গী ভ্যালি এগ্রো)',
    producerType: 'সরবরাহকারী',
    sellerId: 'seller-03',
    sellerType: 'সরবরাহকারী',
    isVerifiedSeller: true,
    isPerishable: false,
    qualityGrade: 'হাতে বোনা পাকা বেত ও মুলী বাঁশ',
    pricePerUnit: 350,
    unit: 'পিস',
    minOrderQuantity: 50,
    availableQuantity: 1000,
    rating: 4.92,
    totalReviews: 64,
    description: 'খাগড়াছড়ির দক্ষ ক্ষুদ্র নৃগোষ্ঠী কারিগরদের নিপুণ হাতে বোনা পরিবেশবান্ধব নকশী বাঁশের গৃহস্থালি ও অফিস ডেকোর সামগ্রী। আন্তর্জাতিক রপ্তানি মানের সূক্ষ্ম ফিনিশিং ও পলিশ।',
    image: HANDLOOM_IMAGE,
    galleryImages: [HANDLOOM_IMAGE, HERO_IMAGE],
    badge: 'হস্তশিল্প মাস্টারপিস',
    status: 'active',
    bulkPricingTiers: [
      { minQty: 50, maxQty: 199, price: 350 },
      { minQty: 200, maxQty: 499, price: 320 },
      { minQty: 500, maxQty: 1000, price: 295 }
    ],
    specifications: {
      organic: true,
      packaging: 'ইন্ডিভিজুয়াল বাবল র‍্যাপ ও ৫-প্লাই এক্সপোর্ট কার্টন',
      deliveryTime: '৩-৫ দিন',
      shelfLife: 'বহুবর্ষজীবী টেকসই পণ্য',
      purityGrade: 'শতভাগ প্রাকৃতিক পাকা মুলী বাঁশ',
      storageRequirement: 'শুকনো পরিষ্কার কক্ষ'
    }
  },

  // Product 6: Traditional Handloom Apparel
  {
    id: 'prod-06',
    name: 'ঐতিহ্যবাহী কোমর তাঁত বস্ত্র ও বেইন শাল (পিনন ও হাদি)',
    category: 'ঐতিহ্যবাহী পোশাক',
    categorySlug: 'apparel',
    origin: 'রোয়াংছড়ি, বান্দরবান',
    district: 'বান্দরবান',
    upazila: 'রোয়াংছড়ি',
    producerName: 'চিনু মারমা (মারমা ক্রাফট হাব)',
    producerType: 'ব্যবসায়ী',
    sellerId: 'seller-04',
    sellerType: 'ব্যবসায়ী',
    isVerifiedSeller: true,
    isPerishable: false,
    qualityGrade: 'খাঁটি হস্তবুনন সুতি জ্যামিতিক নকশা',
    pricePerUnit: 1750,
    unit: 'সেট',
    minOrderQuantity: 10,
    availableQuantity: 350,
    rating: 5.0,
    totalReviews: 142,
    description: 'শতবর্ষের পাহাড়ি সাংস্কৃতিক মোটিফে বোনা খাঁটি সুতি কোমর তাঁত (বেইনের) পোশাক, চাদর ও শাল। প্রতিটি সুতায় প্রাকৃতিক রঙের ছোঁয়া। দেশের শীর্ষস্থানীয় ফ্যাশন হাউস ও বুটিকের জন্য বাল্ক সাপ্লাই।',
    image: HANDLOOM_IMAGE,
    galleryImages: [HANDLOOM_IMAGE, HERO_IMAGE],
    badge: 'প্রিমিয়াম তাঁতশিল্প',
    status: 'active',
    bulkPricingTiers: [
      { minQty: 10, maxQty: 49, price: 1750 },
      { minQty: 50, maxQty: 99, price: 1650 },
      { minQty: 100, maxQty: 350, price: 1550 }
    ],
    specifications: {
      organic: false,
      packaging: 'ইকো-ফ্রেন্ডলি সুতি কভার ও শক্ত গিফট বক্স',
      deliveryTime: '৩-৫ কার্যদিবস',
      shelfLife: 'স্থায়ী টেকসই পোশাক',
      purityGrade: '১০০% হস্তবুনন সুতি',
      storageRequirement: 'সাধারণ আলমারি বা হ্যাঙ্গার র্যাক'
    }
  },

  // Product 7: Hill Cashew & Arabica Coffee
  {
    id: 'prod-07',
    name: 'রোস্টেড পাহাড়ি কাজুবাদাম ও অ্যারাবিকা কফি বিন',
    category: 'প্রক্রিয়াজাত কৃষিপণ্য',
    categorySlug: 'processed',
    origin: 'থানচি ও রুমা, বান্দরবান',
    district: 'বান্দরবান',
    upazila: 'থানচি',
    producerName: 'উ থোয়াই মারমা (থানচি মসলা সমবায়)',
    producerType: 'সমবায় সমিতি',
    sellerId: 'seller-02',
    sellerType: 'সমবায় সমিতি',
    isVerifiedSeller: true,
    isPerishable: false,
    qualityGrade: 'রপ্তানি গ্রেড-১ ডব্লিউ-২৪০ কাজু',
    pricePerUnit: 1050,
    unit: 'কেজি',
    minOrderQuantity: 25,
    availableQuantity: 1200,
    rating: 4.96,
    totalReviews: 110,
    description: 'বান্দরবানের উচ্চ পাহাড়ি ঢালে ফলানো প্রিমিয়াম কোয়ালিটি কাজুবাদাম ও অ্যারাবিকা কফি। স্বয়ংক্রিয় মেশিনে রোস্টিং ও ভ্যাকুয়াম প্যাকিং করা। আন্তর্জাতিক মান নিশ্চিতকৃত।',
    image: SPICES_IMAGE,
    galleryImages: [SPICES_IMAGE, PINEAPPLE_IMAGE],
    badge: 'রপ্তানি মান',
    status: 'active',
    bulkPricingTiers: [
      { minQty: 25, maxQty: 99, price: 1050 },
      { minQty: 100, maxQty: 499, price: 980 },
      { minQty: 500, maxQty: 1200, price: 920 }
    ],
    specifications: {
      organic: true,
      packaging: 'নাইট্রোজেন সিল ভ্যাকুয়াম ফুড পাউচ',
      deliveryTime: '২ কার্যদিবস',
      shelfLife: '১২ মাস',
      purityGrade: '১ম গ্রেড প্রিমিয়াম বাছাইকৃত',
      storageRequirement: 'শুকনো ঠান্ডা জায়গায় বায়ুরোধী অবস্থায়'
    }
  },

  // Product 8: Wild Forest Honey
  {
    id: 'prod-08',
    name: 'সাজেক ভ্যালির প্রাকৃতিক পাহাড়ি বনমধু',
    category: 'কৃষিপণ্য',
    categorySlug: 'agriculture',
    origin: 'বাঘাইছড়ি ও সাজেক, রাঙামাটি',
    district: 'রাঙামাটি',
    upazila: 'বাঘাইছড়ি',
    producerName: 'মং শৈ প্রু মারমা (রুমা হিলস এগ্রো)',
    producerType: 'উৎপাদক',
    sellerId: 'seller-01',
    sellerType: 'উৎপাদক',
    isVerifiedSeller: true,
    isPerishable: false,
    qualityGrade: 'শতভাগ অপরিশোধিত র ফরেস্ট হানি',
    pricePerUnit: 820,
    unit: 'কেজি',
    minOrderQuantity: 20,
    availableQuantity: 800,
    rating: 4.98,
    totalReviews: 89,
    description: 'গভীর পাহাড়ি বন ও বুনো ফুলের নির্যাস থেকে সংগ্রহকৃত প্রাকৃতিক অপরিশোধিত খাঁটি মধু। কোনো প্রকার কৃত্রিম চিনি বা রাসায়নিক ছাড়া ফিল্টার করা।',
    image: PINEAPPLE_IMAGE,
    galleryImages: [PINEAPPLE_IMAGE, SPICES_IMAGE],
    badge: '১০০% খাঁটি মধু',
    status: 'active',
    bulkPricingTiers: [
      { minQty: 20, maxQty: 99, price: 820 },
      { minQty: 100, maxQty: 299, price: 770 },
      { minQty: 300, maxQty: 800, price: 720 }
    ],
    specifications: {
      organic: true,
      packaging: 'ফুড-গ্রেড সিলগালা জার ও ব্যারেল',
      deliveryTime: '২৪-৪৮ ঘণ্টা',
      shelfLife: '২৪ মাস',
      purityGrade: 'ল্যাব পরীক্ষিত শতভাগ খাঁটি',
      storageRequirement: 'স্বাভাবিক তাপমাত্রায় ছায়ায় সংরক্ষণীয়'
    }
  }
];

export const MARKETPLACE_CATEGORIES = [
  { id: 'cat-1', name: 'তাজা ফলমূল', slug: 'fruits', itemCount: 285, iconName: 'Apple' },
  { id: 'cat-2', name: 'কৃষিপণ্য', slug: 'agriculture', itemCount: 194, iconName: 'Sprout' },
  { id: 'cat-3', name: 'শাকসবজি', slug: 'vegetables', itemCount: 142, iconName: 'Carrot' },
  { id: 'cat-4', name: 'মসলা ও খাদ্যপণ্য', slug: 'spices', itemCount: 168, iconName: 'Flame' },
  { id: 'cat-5', name: 'প্রক্রিয়াজাত কৃষিপণ্য', slug: 'processed', itemCount: 98, iconName: 'PackageCheck' },
  { id: 'cat-6', name: 'বাঁশ ও বেতের পণ্য', slug: 'bamboo', itemCount: 115, iconName: 'Boxes' },
  { id: 'cat-7', name: 'হস্তশিল্প', slug: 'handicraft', itemCount: 86, iconName: 'Palette' },
  { id: 'cat-8', name: 'ঐতিহ্যবাহী পোশাক', slug: 'apparel', itemCount: 134, iconName: 'Shirt' },
  { id: 'cat-9', name: 'কুটির শিল্প', slug: 'cottage', itemCount: 72, iconName: 'Scissors' },
  { id: 'cat-10', name: 'অন্যান্য পণ্য', slug: 'other', itemCount: 53, iconName: 'Leaf' }
];

export const CATEGORIES_DATA: CategoryInfo[] = MARKETPLACE_CATEGORIES.map(c => ({
  id: c.id,
  name: c.name,
  slug: c.slug,
  description: 'পার্বত্য অঞ্চলের খাঁটি ও ঐতিহ্যবাহী পণ্যসম্ভার',
  itemCount: c.itemCount,
  districts: ['রাঙামাটি', 'বান্দরবান', 'খাগড়াছড়ি'],
  iconName: c.iconName
}));

export const DISTRICT_MARKETPLACE_DATA = [
  {
    name: 'রাঙামাটি',
    tagline: 'হ্রদ ও পাহাড়ের ফলমূল ও বনজ প্রাচুর্য',
    popularProducts: ['আনারস', 'সাগর কলা', 'বুনো মধু', 'কাপ্তাই মাছ'],
    totalListedItems: 420,
    activeSellers: 85,
    image: PINEAPPLE_IMAGE,
    themeColor: 'from-emerald-900 to-emerald-950'
  },
  {
    name: 'বান্দরবান',
    tagline: 'মিষ্টি আম্রপালি আম, তীব্র হলুদ, কফি ও তাঁতশিল্প',
    popularProducts: ['আম্রপালি আম', 'জুম হলুদ', 'কাজুবাদাম', 'অ্যারাবিকা কফি'],
    totalListedItems: 410,
    activeSellers: 98,
    image: MANGO_IMAGE,
    themeColor: 'from-amber-900 to-stone-950'
  },
  {
    name: 'খাগড়াছড়ি',
    tagline: 'রসালো রাংগু আম, ঝাঁঝালো আদা, বাঁশ ও বেতের কারুশিল্প',
    popularProducts: ['রাংগু ও ব্যানানা আম', 'দেশি আদা', 'মুলী বাঁশ', 'সৌখিন ঝুড়ি'],
    totalListedItems: 365,
    activeSellers: 82,
    image: HANDLOOM_IMAGE,
    themeColor: 'from-stone-900 to-emerald-950'
  }
];

export const CHT_DISTRICTS_DATA = [
  {
    district: 'বান্দরবান',
    upazilas: ['বান্দরবান সদর', 'রুমা', 'থানচি', 'রোয়াংছড়ি', 'লামা', 'আলীকদম', 'নাইক্ষ্যংছড়ি']
  },
  {
    district: 'রাঙামাটি',
    upazilas: ['রাঙামাটি সদর', 'বাঘাইছড়ি', 'কাপ্তাই', 'বরকল', 'লংগদু', 'জুরাইছড়ি', 'নানিয়ারচর', 'বিলাইছড়ি', 'কাউখালী', 'রাজস্থলী']
  },
  {
    district: 'খাগড়াছড়ি',
    upazilas: ['খাগড়াছড়ি সদর', 'দীঘিনালা', 'পানছড়ি', 'মহালছড়ি', 'মাটিরাঙ্গা', 'রামগড়', 'মানিকছড়ি', 'লক্ষ্মীছড়ি', 'গুইমারা']
  },
  {
    district: 'ঢাকা',
    upazilas: ['ঢাকা উত্তর', 'ঢাকা দক্ষিণ', 'সাভার', 'ধামরাই', 'কেরানীগঞ্জ']
  },
  {
    district: 'চট্টগ্রাম',
    upazilas: ['চট্টগ্রাম সদর', 'সীতাকুণ্ড', 'মীরসরাই', 'পটিয়া', 'হাটহাজারী']
  }
];
