import { 
  DeliveryItem, 
  GoodsReceivedNote, 
  DeliveryIssueItem 
} from '../types';
import { PINEAPPLE_IMAGE, SPICES_IMAGE, HANDLOOM_IMAGE, MANGO_IMAGE } from './products';

export const INITIAL_DELIVERIES: DeliveryItem[] = [
  // Delivery 1: In Transit (পথে রয়েছে)
  {
    id: 'del-101',
    deliveryNumber: 'DEL-2026-0481',
    orderId: 'ord-106',
    orderNumber: 'ORD-2026-0850',
    challanNumber: 'CHN-2026-884',
    challanDate: '০৯ নভেম্বর ২০২৬',
    buyerId: 'user-buyer-satata',
    buyerName: 'মেসার্স সততা মসলা মিলস',
    buyerCompany: 'মেসার্স সততা মসলা মিলস লিমিটেড',
    buyerPhone: '০১৮১৬-৫৪৩২১০',
    sellerId: 'user-supplier-01',
    sellerName: 'কামাল আহমেদ চৌধুরী',
    sellerCompany: 'চেঙ্গী ভ্যালি এগ্রো সাপ্লাইয়ার্স',
    sellerPhone: '০১৭১১-৮৭৬৫৪৩',
    productId: 'prod-02',
    productName: 'খাগড়াছড়ির পাহাড়ি খাঁটি হলুদ (দীঘিনালা)',
    productImage: SPICES_IMAGE,
    quantity: 400,
    unit: 'কেজি',
    packaging: {
      packagingType: 'বস্তা',
      packageCount: 8,
      weightPerPackage: 50,
      totalWeight: 400,
      packagingDate: '০৮ নভেম্বর ২০২৬',
      status: 'completed',
      packagingInstructions: '৫০ কেজি ডাবল লেয়ার ফুড গ্রেড চটের বস্তা, আর্দ্রতারোধী সিলিং সম্পন্ন।',
      isPerishable: false,
      fastTransitRequired: false,
      storageTemperature: 'স্বাভাবিক শুষ্ক তাপমাত্রা'
    },
    transport: {
      mode: 'third_party',
      providerName: 'পাহাড়িকা এক্সপ্রেস লজিস্টিকস',
      driverName: 'রফিক উল্লাহ মিয়া',
      driverPhone: '০১৮১২-৯৮৭৬৫৪',
      vehicleType: '৩ টন কাভার্ড ট্রাক',
      vehicleNumber: 'চট্ট মেট্রো-ট-১১-৪৫০৯',
      pickupLocation: 'চেঙ্গী ডিপো, দীঘিনালা রোড, খাগড়াছড়ি',
      destination: 'খাতুনগঞ্জ পাইকারি আড়ত, কোতোয়ালী, চট্টগ্রাম',
      pickupDateTime: '০৯ নভেম্বর ২০২৬, সকাল ০৯:৩০',
      expectedArrivalDateTime: '১০ নভেম্বর ২০২৬, বিকাল ০৪:০০',
      transportCost: 3500,
      notes: 'পাহাড়ে আঁকাবাঁকা ও বৃষ্টির কারণে সাবধানে মাঝারি গতিতে চলমান।',
      trackingCheckpoints: [
        {
          id: 'cp-1',
          location: 'দীঘিনালা এগ্রো হাব, খাগড়াছড়ি',
          timestamp: '০৯ নভেম্বর ২০২৬, সকাল ১০:০০',
          statusText: 'পণ্য লোডিং সম্পন্ন ও চালান গ্রহণ',
          note: '৮টি বস্তা ওজন করে সিলগালা করা হয়েছে।'
        },
        {
          id: 'cp-2',
          location: 'মানিকছড়ি চেকপোস্ট, খাগড়াছড়ি',
          timestamp: '০৯ নভেম্বর ২০২৬, দুপুর ০২:১৫',
          statusText: 'পাহাড়ি চেকপোস্ট অতিক্রম',
          note: 'চালানপত্র যাচাই সম্পন্ন।'
        },
        {
          id: 'cp-3',
          location: 'মিরসরাই হাইওয়ে, চট্টগ্রাম',
          timestamp: '১০ নভেম্বর ২০২৬, সকাল ১১:৩০',
          statusText: 'চট্টগ্রাম প্রবেশমুখে ট্রানজিটে রয়েছে',
          note: 'বিকেলে খাতুনগঞ্জ ওয়্যারহাউজে আনলোড হবে।'
        }
      ]
    },
    costs: {
      transportCost: 3500,
      packagingCost: 800,
      loadingUnloadingCost: 500,
      otherCost: 200,
      totalDeliveryCost: 5000,
      costBearer: 'buyer',
      agreedWithParties: true
    },
    pickupAddress: 'চেঙ্গী ডিপো, দীঘিনালা রোড, খাগড়াছড়ি',
    deliveryAddress: 'দোকান নং ৮৪, খাতুনগঞ্জ পাইকারি বাজার, চট্টগ্রাম',
    expectedDeliveryDate: '১০ নভেম্বর ২০২৬',
    stage: 'in_transit',
    stageNumber: 6,
    currentLocation: 'মিরসরাই হাইওয়ে, চট্টগ্রাম',
    lastUpdatedTime: '১০ নভেম্বর ২০২৬, সকাল ১১:৩০',
    isDelayed: false,
    history: [
      {
        id: 'h-1',
        stage: 'order_confirmed',
        stageNumber: 1,
        title: 'অর্ডার নিশ্চিত ও ডেলিভারি রেকর্ড সৃষ্টি',
        location: 'খাগড়াছড়ি',
        timestamp: '০৬ নভেম্বর ২০২৬',
        actor: 'সিস্টেম',
        note: 'অর্ডার নং ORD-2026-0850 হতে ডেলিভারি রেকর্ড প্রস্তুত।'
      },
      {
        id: 'h-2',
        stage: 'packaging_completed',
        stageNumber: 3,
        title: 'প্যাকেজিং সম্পন্ন',
        location: 'দীঘিনালা ওয়্যারহাউজ',
        timestamp: '০৮ নভেম্বর ২০২৬',
        actor: 'কামাল আহমেদ চৌধুরী (বিক্রেতা)',
        note: '৮টি ৫০ কেজির চটের বস্তায় সিলিং ও ওজন সম্পন্ন।'
      },
      {
        id: 'h-3',
        stage: 'picked_up',
        stageNumber: 5,
        title: 'পণ্য ট্রাকে লোড ও সংগ্রহ',
        location: 'দীঘিনালা এগ্রো হাব',
        timestamp: '০৯ নভেম্বর ২০২৬, সকাল ০৯:৩০',
        actor: 'রফিক উল্লাহ (চালক)',
        note: 'চালানপত্র CHN-2026-884 গ্রহণ।'
      },
      {
        id: 'h-4',
        stage: 'in_transit',
        stageNumber: 6,
        title: 'চট্টগ্রামের উদ্দেশ্যে ট্রানজিটে চলমান',
        location: 'মিরসরাই',
        timestamp: '১০ নভেম্বর ২০২৬, সকাল ১১:৩০',
        actor: 'পাহাড়িকা এক্সপ্রেস',
        note: 'যানবাহন সঠিক সময়ে অগ্রসর হচ্ছে।'
      }
    ]
  },

  // Delivery 2: Delivered with GRN (ডেলিভারি সম্পন্ন)
  {
    id: 'del-102',
    deliveryNumber: 'DEL-2026-0475',
    orderId: 'ord-107',
    orderNumber: 'ORD-2026-0845',
    challanNumber: 'CHN-2026-872',
    challanDate: '০৬ নভেম্বর ২০২৬',
    buyerId: 'user-buyer-01',
    buyerName: 'তানভীর রহমান',
    buyerCompany: 'বেঙ্গল ফ্রেশ অর্গানিক চেইন ও সুপারশপ',
    buyerPhone: '০১৯১১-২২৩৩৪৪',
    sellerId: 'user-farmer-01',
    sellerName: 'মং শৈ প্রু মারমা',
    sellerCompany: 'রুমা হিলস এগ্রো কো-অপারেটিভ',
    sellerPhone: '০১৮১৮-৪৫৬৭৮৯',
    productId: 'prod-04',
    productName: 'রাঙামাটির পাহাড়ি সাগর কলা (অর্গানিক)',
    productImage: PINEAPPLE_IMAGE,
    quantity: 350,
    unit: 'ডজন',
    packaging: {
      packagingType: 'প্লাস্টিক ক্রেট',
      packageCount: 35,
      weightPerPackage: 15,
      totalWeight: 525,
      packagingDate: '০৫ নভেম্বর ২০২৬',
      status: 'completed',
      packagingInstructions: 'প্রতিটি ক্রেটে ফোম কুশন ও পেপার পেকিং রয়েছে।',
      isPerishable: true,
      storageTemperature: '১৫-১৮ ডিগ্রি সেলসিয়াস',
      fastTransitRequired: true,
      freshnessInstructions: 'সরাসরি রোদ থেকে দূরে ভেন্টিলেটেড কক্ষে রাখতে হবে।'
    },
    transport: {
      mode: 'third_party',
      providerName: 'হিল ট্র্যাক্টস গ্রিন ফ্রেইট',
      driverName: 'মোতালেব হোসেন',
      driverPhone: '০১৭৩৩-৪৫৬৭৮৯',
      vehicleType: 'পিকআপ কাভার্ড ভ্যান',
      vehicleNumber: 'ঢাকা মেট্রো-ন-১৯-৮২০৩',
      pickupLocation: 'বাঘাইছড়ি বোট ঘাট, রাঙামাটি',
      destination: 'তেজগাঁও সেন্ট্রাল ওয়্যারহাউজ, ঢাকা',
      pickupDateTime: '০৬ নভেম্বর ২০২৬, বিকাল ০৪:০০',
      expectedArrivalDateTime: '০৭ নভেম্বর ২০২৬, সকাল ১০:০০',
      actualArrivalDateTime: '০৭ নভেম্বর ২০২৬, সকাল ০৯:৪৫',
      transportCost: 4000,
      notes: 'সময়মতো এবং অক্ষত অবস্থায় ঢাকা পৌঁছানো হয়েছে।'
    },
    costs: {
      transportCost: 4000,
      packagingCost: 1200,
      loadingUnloadingCost: 600,
      otherCost: 0,
      totalDeliveryCost: 5800,
      costBearer: 'buyer',
      agreedWithParties: true
    },
    pickupAddress: 'বাঘাইছড়ি বোট ঘাট, রাঙামাটি',
    deliveryAddress: 'প্লট ৪২, তেজগাঁও শিল্প এলাকা, ঢাকা-১২০৮',
    expectedDeliveryDate: '০৭ নভেম্বর ২০২৬',
    actualDeliveryDate: '০৭ নভেম্বর ২০২৬',
    stage: 'delivered',
    stageNumber: 9,
    currentLocation: 'তেজগাঁও ওয়্যারহাউজ, ঢাকা (খালাস সম্পন্ন)',
    lastUpdatedTime: '০৭ নভেম্বর ২০২৬, সকাল ১১:০০',
    isDelayed: false,
    grn: {
      id: 'grn-501',
      grnNumber: 'GRN-2026-081',
      deliveryId: 'del-102',
      orderNumber: 'ORD-2026-0845',
      receiptType: 'full',
      receivedQuantity: 350,
      shortageQuantity: 0,
      damagedQuantity: 0,
      unit: 'ডজন',
      receiptDateTime: '০৭ নভেম্বর ২০২৬, সকাল ১০:৩০',
      buyerComments: 'কলার মান চমৎকার, কোনো প্রকার দাগ বা ক্ষয়ক্ষতি ছাড়া সম্পূর্ণ লট অক্ষত অবস্থায় পাওয়া গেছে।',
      receivedBy: 'মোঃ ইমরান হোসেন (ওয়্যারহাউজ ম্যানেজার)',
      status: 'verified'
    },
    history: [
      {
        id: 'h-21',
        stage: 'order_confirmed',
        stageNumber: 1,
        title: 'অর্ডার নিশ্চিতকরণ',
        location: 'রাঙামাটি',
        timestamp: '০৩ নভেম্বর ২০২৬',
        actor: 'সিস্টেম',
        note: 'ORD-2026-0845 নিশ্চিত হয়েছে।'
      },
      {
        id: 'h-22',
        stage: 'packaging_completed',
        stageNumber: 3,
        title: 'প্যাকেজিং সম্পন্ন',
        location: 'বাঘাইছড়ি',
        timestamp: '০৫ নভেম্বর ২০২৬',
        actor: 'মং শৈ প্রু মারমা',
        note: '৩৫টি প্লাস্টিক ক্রেটে সতেজ কলা প্যাকিং।'
      },
      {
        id: 'h-23',
        stage: 'in_transit',
        stageNumber: 6,
        title: 'ঢাকা অভিমুখে রওনা',
        location: 'রাঙামাটি সদর',
        timestamp: '০৬ নভেম্বর ২০২৬',
        actor: 'মোতালেব হোসেন (চালক)',
        note: 'কাভার্ড ভ্যান ট্রানজিটে প্রবেশ করেছে।'
      },
      {
        id: 'h-24',
        stage: 'delivered',
        stageNumber: 9,
        title: 'পণ্য খালাস ও রসিদ GRN-2026-081 সম্পন্ন',
        location: 'তেজগাঁও, ঢাকা',
        timestamp: '০৭ নভেম্বর ২০২৬, সকাল ১০:৩০',
        actor: 'তানভীর রহমান (ক্রেতা)',
        note: 'সম্পূর্ণ ৩৫০ ডজন সুস্থ অবস্থায় গৃহীত।'
      }
    ]
  },

  // Delivery 3: Ready for Transport (পরিবহনের জন্য প্রস্তুত)
  {
    id: 'del-103',
    deliveryNumber: 'DEL-2026-0488',
    orderId: 'ord-104',
    orderNumber: 'ORD-2026-0872',
    challanNumber: 'CHN-2026-890',
    challanDate: '০৯ নভেম্বর ২০২৬',
    buyerId: 'user-buyer-mega',
    buyerName: 'মেগা ফুড প্রসেসিং লিমিটেড',
    buyerCompany: 'মেগা এগ্রো ফুডস লিমিটেড',
    buyerPhone: '০১৭২২-৯৮৭৬৫৪',
    sellerId: 'user-farmer-01',
    sellerName: 'উ থোয়াই মারমা',
    sellerCompany: 'থানচি মসলা সমবায়',
    sellerPhone: '০১৮১৮-৪৫৬৭৮৯',
    productId: 'prod-02',
    productName: 'হলুদ (বান্দরবানের খাঁটি পাহাড়ি কাঁচা ও শুকনো হলুদ)',
    productImage: SPICES_IMAGE,
    quantity: 500,
    unit: 'কেজি',
    packaging: {
      packagingType: 'বস্তা',
      packageCount: 10,
      weightPerPackage: 50,
      totalWeight: 500,
      packagingDate: '০৯ নভেম্বর ২০২৬',
      status: 'completed',
      packagingInstructions: '৫০ কেজির ১০টি ফুড গ্রেড আর্দ্রতারোধী বস্তা প্রস্তুত।',
      isPerishable: false,
      fastTransitRequired: false,
      storageTemperature: 'শুষ্ক সাধারণ কক্ষ'
    },
    transport: {
      mode: 'third_party',
      providerName: 'বান্দরবান হিল কার্গো সার্ভিস',
      driverName: 'সাইফুল ইসলাম',
      driverPhone: '০১৮১৫-৩৩৪৪৫৫',
      vehicleType: 'মিনি কাভার্ড ট্রাক',
      vehicleNumber: 'চট্ট মেট্রো-ড-১২-১১০২',
      pickupLocation: 'থানচি বাজার এগ্রো সেন্টার, বান্দরবান',
      destination: 'কোনাবাড়ী ইন্ডাস্ট্রিয়াল এলাকা, গাজীপুর',
      pickupDateTime: '১১ নভেম্বর ২০২৬, সকাল ০৮:০০',
      expectedArrivalDateTime: '১২ নভেম্বর ২০২৬, দুপুর ১২:০০',
      transportCost: 4500,
      notes: 'আগামীকাল ভোরে বান্দরবান থেকে লোডিং হবে।'
    },
    costs: {
      transportCost: 4500,
      packagingCost: 1000,
      loadingUnloadingCost: 500,
      otherCost: 0,
      totalDeliveryCost: 6000,
      costBearer: 'buyer',
      agreedWithParties: true
    },
    pickupAddress: 'থানচি বাজার এগ্রো সেন্টার, বান্দরবান',
    deliveryAddress: 'কারখানা নং ৩, কোনাবাড়ী বিসিক এলাকা, গাজীপুর',
    expectedDeliveryDate: '১২ নভেম্বর ২০২৬',
    stage: 'ready_for_transport',
    stageNumber: 4,
    currentLocation: 'থানচি এগ্রো সেন্টার ডিপো, বান্দরবান',
    lastUpdatedTime: '১০ নভেম্বর ২০২৬, সকাল ০৯:০০',
    isDelayed: false,
    history: [
      {
        id: 'h-31',
        stage: 'order_confirmed',
        stageNumber: 1,
        title: 'অর্ডার নিশ্চিতকরণ',
        location: 'বান্দরবান',
        timestamp: '০৭ নভেম্বর ২০২৬',
        actor: 'সিস্টেম',
        note: 'ORD-2026-0872 প্রসেসিং শুরু।'
      },
      {
        id: 'h-32',
        stage: 'packaging_completed',
        stageNumber: 3,
        title: 'প্যাকেজিং সম্পন্ন',
        location: 'থানচি',
        timestamp: '০৯ নভেম্বর ২০২৬',
        actor: 'উ থোয়াই মারমা',
        note: '১০টি ৫০ কেজি বস্তা তৈরি ও লেবেলিং সম্পন্ন।'
      },
      {
        id: 'h-33',
        stage: 'ready_for_transport',
        stageNumber: 4,
        title: 'পরিবহনের জন্য প্রস্তুত',
        location: 'থানচি ডিপো',
        timestamp: '১০ নভেম্বর ২০২৬, সকাল ০৯:০০',
        actor: 'উ থোয়াই মারমা',
        note: 'গাড়ির লোডিং পয়েন্টে চালানের অপেক্ষায়।'
      }
    ]
  },

  // Delivery 4: Packaging Completed (প্যাকেজিং সম্পন্ন)
  {
    id: 'del-104',
    deliveryNumber: 'DEL-2026-0492',
    orderId: 'ord-103',
    orderNumber: 'ORD-2026-0880',
    challanNumber: 'CHN-2026-895',
    challanDate: '১০ নভেম্বর ২০২৬',
    buyerId: 'user-buyer-01',
    buyerName: 'তানভীর রহমান',
    buyerCompany: 'বেঙ্গল ফ্রেশ অর্গানিক চেইন ও সুপারশপ',
    buyerPhone: '০১৯১১-২২৩৩৪৪',
    sellerId: 'user-farmer-01',
    sellerName: 'মং শৈ প্রু মারমা',
    sellerCompany: 'রুমা হিলস এগ্রো কো-অপারেটিভ',
    sellerPhone: '০১৮১৮-৪৫৬৭৮৯',
    productId: 'prod-01',
    productName: 'বান্দরবানের পাহাড়ি মিষ্টি আনারস (জায়ান্ট কিউ)',
    productImage: PINEAPPLE_IMAGE,
    quantity: 1200,
    unit: 'পিস',
    packaging: {
      packagingType: 'ঝুড়ি',
      packageCount: 60,
      weightPerPackage: 28,
      totalWeight: 1680,
      packagingDate: '১০ নভেম্বর ২০২৬',
      status: 'completed',
      packagingInstructions: 'প্রাকৃতিক বাঁশের ঝুড়ি ও কুশনযুক্ত কাঠের ক্রেট, ২০ পিস প্রতি ঝুড়ি।',
      isPerishable: true,
      storageTemperature: '১০-১৫ ডিগ্রি সেলসিয়াস',
      fastTransitRequired: true,
      freshnessInstructions: 'গাছপাকা সতেজ আনারস, দ্রুত ভেন্টিলেটেড ট্রাকে প্রেরণ জরুরি।'
    },
    transport: {
      mode: 'third_party',
      providerName: 'হিল ট্র্যাক্টস গ্রিন ফ্রেইট',
      driverName: 'আব্দুল করিম',
      driverPhone: '০১৮১৬-৭৭৮৮৯৯',
      vehicleType: '৫ টন ভেন্টিলেটেড খোলা ট্রাক',
      vehicleNumber: 'চট্ট মেট্রো-ট-১৪-৭৮১২',
      pickupLocation: 'রুমা বাজার নদী ঘাট, বান্দরবান',
      destination: 'ঢাকা সেন্ট্রাল ওয়্যারহাউজ, তেজগাঁও',
      pickupDateTime: '১১ নভেম্বর ২০২৬, দুপুর ০১:০০',
      expectedArrivalDateTime: '১২ নভেম্বর ২০২৬, সকাল ০৮:০০',
      transportCost: 5500,
      notes: 'নদী পথে ট্রলারে রুমা থেকে বান্দরবান সদরে এনে ট্রাকে তোলা হবে।'
    },
    costs: {
      transportCost: 5500,
      packagingCost: 1500,
      loadingUnloadingCost: 800,
      otherCost: 0,
      totalDeliveryCost: 7800,
      costBearer: 'buyer',
      agreedWithParties: true
    },
    pickupAddress: 'রুমা বাজার নদী ঘাট, বান্দরবান',
    deliveryAddress: 'ঢাকা সেন্ট্রাল ওয়্যারহাউজ, তেজগাঁও শিল্প এলাকা, ঢাকা',
    expectedDeliveryDate: '১২ নভেম্বর ২০২৬',
    stage: 'packaging_completed',
    stageNumber: 3,
    currentLocation: 'রুমা এগ্রো কালেকশন পয়েন্ট, বান্দরবান',
    lastUpdatedTime: '১০ নভেম্বর ২০২৬, সকাল ১১:০০',
    isDelayed: false,
    history: [
      {
        id: 'h-41',
        stage: 'order_confirmed',
        stageNumber: 1,
        title: 'অর্ডার নিশ্চিতকরণ সম্পন্ন',
        location: 'বান্দরবান',
        timestamp: '০৮ নভেম্বর ২০২৬',
        actor: 'সিস্টেম',
        note: '১,২০০ পিস আনারসের অর্ডার নিশ্চিত।'
      },
      {
        id: 'h-42',
        stage: 'preparing',
        stageNumber: 2,
        title: 'বাগান থেকে তোলা ও গ্রেডিং',
        location: 'রুমা পাহাড়ি বাগান',
        timestamp: '০৯ নভেম্বর ২০২৬',
        actor: 'মং শৈ প্রু মারমা',
        note: '১.২ কেজির উপরের সাইজ বাছাই করা হয়েছে।'
      },
      {
        id: 'h-43',
        stage: 'packaging_completed',
        stageNumber: 3,
        title: '৬০টি বাঁশের ঝুড়িতে প্যাকিং সম্পন্ন',
        location: 'রুমা ঘাট',
        timestamp: '১০ নভেম্বর ২০২৬, সকাল ১১:০০',
        actor: 'মং শৈ প্রু মারমা',
        note: 'কুশনযুক্ত বাঁশের ঝুড়িতে প্যাকিং শেষ।'
      }
    ]
  },

  // Delivery 5: Delayed Due to Weather/Landslide (বিলম্বিত চালান)
  {
    id: 'del-105',
    deliveryNumber: 'DEL-2026-0460',
    orderId: 'ord-105',
    orderNumber: 'ORD-2026-0865',
    challanNumber: 'CHN-2026-855',
    challanDate: '০৬ নভেম্বর ২০২৬',
    buyerId: 'user-buyer-aarong',
    buyerName: 'আড়ং কারুশিল্প সংগ্রহ',
    buyerCompany: 'আড়ং ফ্যাশন ও হস্তশিল্প লিমিটেড',
    buyerPhone: '০১৭১৩-৭৭৮৮৯৯',
    sellerId: 'user-supplier-01',
    sellerName: 'কামাল আহমেদ চৌধুরী',
    sellerCompany: 'চেঙ্গী ভ্যালি এগ্রো',
    sellerPhone: '০১৭১১-৮৭৬৫৪৩',
    productId: 'prod-05',
    productName: 'বাঁশের তৈরি হস্তশিল্প (সৌখিন ঝুড়ি, ট্রে ও আসবাব)',
    productImage: HANDLOOM_IMAGE,
    quantity: 200,
    unit: 'পিস',
    packaging: {
      packagingType: 'কার্টন',
      packageCount: 20,
      weightPerPackage: 12,
      totalWeight: 240,
      packagingDate: '০৫ নভেম্বর ২০২৬',
      status: 'completed',
      packagingInstructions: 'বাবল র‍্যাপ ও ৫-প্লাই এক্সপোর্ট কার্টন প্যাকিং।',
      isPerishable: false,
      fastTransitRequired: false
    },
    transport: {
      mode: 'third_party',
      providerName: 'হিল ট্র্যাক্টস গ্রিন ফ্রেইট',
      driverName: 'জাহাঙ্গীর আলম',
      driverPhone: '০১৯১১-৮৮৭৭৬৬',
      vehicleType: 'পিকআপ ট্রাক',
      vehicleNumber: 'ঢাকা মেট্রো-ন-১৫-৪৩২১',
      pickupLocation: 'মহালছড়ি বাজার, খাগড়াছড়ি',
      destination: 'ধানমন্ডি সেন্ট্রাল হাব, ঢাকা',
      pickupDateTime: '০৬ নভেম্বর ২০২৬, দুপুর ০১:০০',
      expectedArrivalDateTime: '০৭ নভেম্বর ২০২৬, রাত ০৯:০০',
      transportCost: 3500,
      notes: 'পাহাড়ে আকস্মিক ধস ও রাস্তা সংস্কারের কারণে গাড়ি রামগড় এলাকায় আটকা পড়ে বিলম্বিত।'
    },
    costs: {
      transportCost: 3500,
      packagingCost: 1200,
      loadingUnloadingCost: 400,
      otherCost: 0,
      totalDeliveryCost: 5100,
      costBearer: 'seller',
      agreedWithParties: true
    },
    pickupAddress: 'মহালছড়ি বাজার, খাগড়াছড়ি',
    deliveryAddress: 'বাড়ি নং ১২, রোড ৫, ধানমন্ডি, ঢাকা',
    expectedDeliveryDate: '০৭ নভেম্বর ২০২৬',
    stage: 'delayed',
    stageNumber: 6,
    currentLocation: 'রামগড় বাইপাস রোড, খাগড়াছড়ি (রাস্তা সাময়িক অবরুদ্ধ)',
    lastUpdatedTime: '০৮ নভেম্বর ২০২৬, সকাল ১০:০০',
    isDelayed: true,
    delayReason: 'পাহাড়ে ভারী বৃষ্টির ফলে মাটি ধস নেমে রামগড় সড়ক সাময়িক অবরুদ্ধ রয়েছে। সড়ক বিভাগ ক্লিয়ার করছে, ২৪ ঘণ্টার মধ্যে পুনরায় যাত্রা শুরু হবে।',
    history: [
      {
        id: 'h-51',
        stage: 'picked_up',
        stageNumber: 5,
        title: 'পণ্য ট্রাকে লোডিং',
        location: 'মহালছড়ি',
        timestamp: '০৬ নভেম্বর ২০২৬',
        actor: 'জাহাঙ্গীর আলম (চালক)',
        note: '২০টি কার্টন লোড সম্পন্ন।'
      },
      {
        id: 'h-52',
        stage: 'delayed',
        stageNumber: 6,
        title: 'প্রাকৃতিক কারণে সড়ক অবরুদ্ধ ও চালান বিলম্বিত',
        location: 'রামগড়',
        timestamp: '০৭ নভেম্বর ২০২৬',
        actor: 'লজিস্টিক সমন্বয়ক',
        note: 'ক্রেতা ও বিক্রেতাকে বিলম্ব সংক্রান্ত বার্তা প্রেরণ করা হয়েছে।'
      }
    ]
  },

  // Delivery 6: Disputed with Damaged Goods Issue (অভিযোগাধীন চালান)
  {
    id: 'del-106',
    deliveryNumber: 'DEL-2026-0455',
    orderId: 'ord-102',
    orderNumber: 'ORD-2026-0895',
    challanNumber: 'CHN-2026-848',
    challanDate: '০৪ নভেম্বর ২০২৬',
    buyerId: 'user-buyer-satata',
    buyerName: 'মেসার্স সততা মসলা মিলস',
    buyerCompany: 'মেসার্স সততা মসলা মিলস',
    buyerPhone: '০১৮১৬-৫৪৩২১০',
    sellerId: 'user-supplier-01',
    sellerName: 'কামাল আহমেদ চৌধুরী',
    sellerCompany: 'চেঙ্গী ভ্যালি এগ্রো',
    sellerPhone: '০১৭১১-৮৭৬৫৪৩',
    productId: 'prod-03',
    productName: 'আদা (খাগড়াছড়ির পাহাড়ি দেশি ঝাঁঝালো জুম আদা)',
    productImage: SPICES_IMAGE,
    quantity: 1000,
    unit: 'কেজি',
    packaging: {
      packagingType: 'বস্তা',
      packageCount: 20,
      weightPerPackage: 50,
      totalWeight: 1000,
      packagingDate: '০৪ নভেম্বর ২০২৬',
      status: 'completed',
      packagingInstructions: '৫০ কেজি পাটের বস্তা',
      isPerishable: true,
      fastTransitRequired: true
    },
    transport: {
      mode: 'third_party',
      providerName: 'পাহাড়িকা এক্সপ্রেস',
      driverName: 'নাজমুল হাসান',
      driverPhone: '০১৮৯৯-১১২২৩৩',
      vehicleType: '৫ টন ট্রাক',
      vehicleNumber: 'চট্ট মেট্রো-ট-২২-৬৭৮৯',
      pickupLocation: 'মহালছড়ি, খাগড়াছড়ি',
      destination: 'খাতুনগঞ্জ, চট্টগ্রাম',
      pickupDateTime: '০৪ নভেম্বর ২০২৬, বিকাল ০৫:০০',
      expectedArrivalDateTime: '০৫ নভেম্বর ২০২৬, দুপুর ০১:০০',
      transportCost: 4500,
      notes: 'বৃষ্টির সময় ট্রিপালে সামান্য পানি ঢুকে কিছু বস্তা ভিজেছিল।'
    },
    costs: {
      transportCost: 4500,
      packagingCost: 1000,
      loadingUnloadingCost: 600,
      otherCost: 0,
      totalDeliveryCost: 6100,
      costBearer: 'buyer',
      agreedWithParties: true
    },
    pickupAddress: 'মহালছড়ি, খাগড়াছড়ি',
    deliveryAddress: 'খাতুনগঞ্জ পাইকারি বাজার, চট্টগ্রাম',
    expectedDeliveryDate: '০৫ নভেম্বর ২০২৬',
    stage: 'disputed',
    stageNumber: 8,
    currentLocation: 'খাতুনগঞ্জ গুদাম, চট্টগ্রাম (তদন্তাধীন)',
    lastUpdatedTime: '০৬ নভেম্বর ২০২৬, বিকাল ০৩:০০',
    isDelayed: false,
    grn: {
      id: 'grn-503',
      grnNumber: 'GRN-2026-083',
      deliveryId: 'del-106',
      orderNumber: 'ORD-2026-0895',
      receiptType: 'damaged',
      receivedQuantity: 880,
      shortageQuantity: 0,
      damagedQuantity: 120,
      unit: 'কেজি',
      problemDescription: '২০টি বস্তার মধ্যে ৩টি বস্তা (আনুমানিক ১২০ কেজি) বৃষ্টিতে ভিজে পচে গেছে। বাকি ৮৮০ কেজি ভালো আছে।',
      attachedPhotos: [SPICES_IMAGE],
      receiptDateTime: '০৫ নভেম্বর ২০২৬, বিকাল ০২:০০',
      buyerComments: 'ক্ষতিগ্রস্ত ১২০ কেজি আদার জন্য সমপরিমাণ মূল্য সমন্বয় অথবা পুনর্সরবরাহ চাই।',
      receivedBy: 'আবুল কাসেম (পরিচালক)',
      status: 'disputed'
    },
    issue: {
      id: 'iss-901',
      issueNumber: 'ISS-2026-042',
      orderNumber: 'ORD-2026-0895',
      deliveryId: 'del-106',
      complainantName: 'মেসার্স সততা মসলা মিলস',
      complainantRole: 'buyer',
      issueCategory: 'damaged',
      categoryLabel: 'পণ্য ক্ষতিগ্রস্ত হওয়া',
      description: 'ট্রাকে ত্রিপল সঠিকভাবে না বাঁধায় বৃষ্টিতে ১২০ কেজি কাঁচা আদা ভিজে নষ্ট হয়েছে।',
      attachedPhotos: [SPICES_IMAGE],
      issueDate: '০৫ নভেম্বর ২০২৬',
      status: 'under_review',
      statusLabel: 'পর্যালোচনাধীন',
      resolutionNotes: 'বিক্রেতা পরিবহন ইন্স্যুরেন্স কোম্পানির সাথে কথা বলে ১২০ কেজির ক্ষতিপূরণ বা ফ্রেশ চালান দিতে রাজি হয়েছেন।',
      history: [
        {
          timestamp: '০৫ নভেম্বর ২০২৬, বিকাল ০৩:০০',
          actor: 'মেসার্স সততা মসলা মিলস (ক্রেতা)',
          note: 'ক্ষতিগ্রস্ত পণ্যের ছবি ও বিবরণসহ অভিযোগ দায়ের।',
          status: 'new'
        },
        {
          timestamp: '০৬ নভেম্বর ২০২৬, সকাল ১১:০০',
          actor: 'কামাল আহমেদ চৌধুরী (বিক্রেতা)',
          note: 'পরিবহন চালকের অবহেলার বিষয়টি স্বীকার করে ৫০% ছাড় বা নতুন চালান দেওয়ার প্রস্তাব।',
          status: 'under_review'
        }
      ]
    },
    history: [
      {
        id: 'h-61',
        stage: 'disputed',
        stageNumber: 8,
        title: 'পণ্য আংশিক ক্ষতিগ্রস্ত প্রাপ্তি ও অভিযোগ নথিভুক্ত',
        location: 'খাতুনগঞ্জ, চট্টগ্রাম',
        timestamp: '০৫ নভেম্বর ২০২৬',
        actor: 'ক্রেতা প্রতিনিধি',
        note: '১২০ কেজি আদা ক্ষতিগ্রস্ত অবস্থায় পাওয়া গেছে।'
      }
    ]
  }
];

export const SAMPLE_TRANSPORT_PROVIDERS = [
  {
    id: 'tp-1',
    name: 'পাহাড়িকা এক্সপ্রেস লজিস্টিকস',
    phone: '০১৮১২-৯৮৭৬৫৪',
    fleetTypes: ['পিকআপ কাভার্ড ভ্যান', '৩ টন মিনি ট্রাক', '৫ টন ট্রাক'],
    coverage: 'খাগড়াছড়ি, রাঙামাটি, চট্টগ্রাম, ঢাকা',
    rating: 4.85,
    coldStorageAvailable: true
  },
  {
    id: 'tp-2',
    name: 'হিল ট্র্যাক্টস গ্রিন ফ্রেইট',
    phone: '০১৭৩৩-৪৫৬৭৮৯',
    fleetTypes: ['চাঁদের গাড়ি / জিপ', 'কাভার্ড পিকআপ', 'ভেন্টিলেটেড ফ্রুট ট্রাক'],
    coverage: 'বান্দরবান, থানচি, রুমা, চট্টগ্রাম, ঢাকা',
    rating: 4.92,
    coldStorageAvailable: true
  },
  {
    id: 'tp-3',
    name: 'বিআরটিসি হিল কার্গো সার্ভিস',
    phone: '০২-৯৫৫৫৫৫৫',
    fleetTypes: ['১০ চাকার বড় ট্রাক', '৭ টন হেভি ট্রাক'],
    coverage: 'সমগ্র পার্বত্য অঞ্চল ও জাতীয় মহাসড়ক',
    rating: 4.75,
    coldStorageAvailable: false
  },
  {
    id: 'tp-4',
    name: 'সুন্দরবন কুরিয়ার এগ্রো এক্সপ্রেস',
    phone: '০৯৬১২-০০০০০০',
    fleetTypes: ['ডোর-টু-ডোর ডেলিভারি ভ্যান', 'মিনি কার্গো'],
    coverage: 'দেশব্যাপী ৬৪ জেলা',
    rating: 4.7,
    coldStorageAvailable: false
  }
];

export const MINISTRY_DISTRICT_STATS = [
  {
    district: 'রাঙামাটি',
    totalDeliveries: 340,
    onTimeRate: 94.2,
    delayedCount: 14,
    damagedCount: 3,
    topProducts: ['আনারস', 'সাগর কলা', 'বুনো মধু', 'আদা'],
    activeCarriers: 12
  },
  {
    district: 'বান্দরবান',
    totalDeliveries: 310,
    onTimeRate: 92.8,
    delayedCount: 18,
    damagedCount: 4,
    topProducts: ['আম্রপালি আম', 'জুম হলুদ', 'কাজুবাদাম', 'কফি'],
    activeCarriers: 15
  },
  {
    district: 'খাগড়াছড়ি',
    totalDeliveries: 285,
    onTimeRate: 95.1,
    delayedCount: 11,
    damagedCount: 2,
    topProducts: ['রাংগু আম', 'দেশি আদা', 'মুলী বাঁশের কারুশিল্প'],
    activeCarriers: 14
  }
];
