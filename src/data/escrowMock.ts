import { 
  FinancialServiceProvider, 
  EscrowRecord, 
  BuyerPaymentTransaction, 
  SellerSettlementItem, 
  RefundRecord, 
  FinancialDisputeRecord 
} from '../types';

export const SAMPLE_PAYMENT_PROVIDERS: FinancialServiceProvider[] = [
  {
    id: 'prov-sonali',
    name: 'সোনালী ব্যাংক পিএলসি',
    shortName: 'Sonali Bank',
    type: 'commercial_bank',
    typeLabel: 'রাষ্ট্রায়ত্ত বাণিজ্যিক ব্যাংক',
    licenseNumber: 'BB-LIC-COMM-001',
    approvalStatus: 'approved',
    contactPhone: '১৬৬৩৯',
    contactEmail: 'escrow.support@sonalibank.com.bd',
    apiStatus: 'connected',
    serviceEffectiveness: 'মন্ত্রণালয় এসক্রো ট্রাস্ট অ্যাকাউন্ট ও ট্রেজারি সেটেলমেন্ট পার্টনার',
    escrowTrustAccount: 'সোনালী ব্যাংক, কাস্টমস হাউস শাখা, চলতি হিসাব নং: ০১২০-৪৪০০৯২১',
    feeStructure: '০.৫% ট্রাস্ট ফি (সর্বোচ্চ ৫০০ ৳)',
    isActive: true
  },
  {
    id: 'prov-brac',
    name: 'ব্র্যাক ব্যাংক পিএলসি',
    shortName: 'BRAC Bank',
    type: 'commercial_bank',
    typeLabel: 'বেসরকারি বাণিজ্যিক ব্যাংক',
    licenseNumber: 'BB-LIC-COMM-028',
    approvalStatus: 'approved',
    contactPhone: '১৬২২১',
    contactEmail: 'agro.escrow@bracbank.com',
    apiStatus: 'connected',
    serviceEffectiveness: 'স্মার্ট বিটুবি ক্লিয়ারিং, কর্পোরেট কার্ড ও এসক্রো সার্ভিস',
    escrowTrustAccount: 'ব্র্যাক ব্যাংক, আগ্রাবাদ কর্পোরেট শাখা, হিসাব নং: ১৫০২-৮৯০১-০০১',
    feeStructure: '০.৭৫% ট্রাস্ট চার্জ',
    isActive: true
  },
  {
    id: 'prov-bkash',
    name: 'বিকাশ লিমিটেড (এগ্রো এসক্রো গেটওয়ে)',
    shortName: 'bKash Merchant',
    type: 'mfs',
    typeLabel: 'মোবাইল ফিন্যান্সিয়াল সার্ভিস (MFS)',
    licenseNumber: 'BB-MFS-001',
    approvalStatus: 'approved',
    contactPhone: '১৬২৪৭',
    contactEmail: 'merchant.care@bkash.com',
    apiStatus: 'connected',
    serviceEffectiveness: 'তাৎক্ষণিক পাইকারি পেমেন্ট, কিউআর কোড ও মার্চেন্ট হোল্ড',
    escrowTrustAccount: 'বিকাশ ট্রাস্ট কাম সেটেলমেন্ট পুল (সোনালী ব্যাংক এস্ক্রো পুল)',
    feeStructure: '১.২% মার্চেন্ট চার্জ',
    isActive: true
  },
  {
    id: 'prov-nagad',
    name: 'নগদ ডিজিটাল ফিন্যান্সিয়াল সার্ভিস',
    shortName: 'Nagad',
    type: 'mfs',
    typeLabel: 'ডিজিটাল ডাক সেবা MFS',
    licenseNumber: 'BB-MFS-004',
    approvalStatus: 'approved',
    contactPhone: '১৬১৬৭',
    contactEmail: 'support@nagad.com.bd',
    apiStatus: 'connected',
    serviceEffectiveness: 'পাহাড়ি ডাকঘর সংলগ্ন পয়েন্ট ও ক্যাশ-ইন ইন্টিগ্রেশন',
    escrowTrustAccount: 'নগদ ট্রাস্ট কালেকশন অ্যাকাউন্ট নং: ৯৯৮৮-১১০২-৩৩',
    feeStructure: '০.৯৯% ট্রানজেকশন চার্জ',
    isActive: true
  },
  {
    id: 'prov-ebl',
    name: 'ইস্টার্ন ব্যাংক লিমিটেড (EBL AgroPay)',
    shortName: 'EBL Pay',
    type: 'licensed_gateway',
    typeLabel: 'অনুমোদিত পেমেন্ট গেটওয়ে',
    licenseNumber: 'BB-PSO-007',
    approvalStatus: 'approved',
    contactPhone: '১৬২৩০',
    contactEmail: 'pgw@ebl-bd.com',
    apiStatus: 'testing',
    serviceEffectiveness: 'ভিসা ও মাস্টারকার্ড ডেবিট/ক্রেডিট কর্পোরেট পেমেন্ট গেটওয়ে',
    escrowTrustAccount: 'ইবিএল প্রিন্সিপাল শাখা, এসক্রো অ্যাকাউন্ট: ১০১-১২৩-৪৫৬৭৮৯',
    feeStructure: '১.৫% কার্ড প্রসেসিং ফি',
    isActive: true
  }
];

export const INITIAL_ESCROWS: EscrowRecord[] = [
  // 1. In Escrow - Delivery in progress (পণ্য পথে রয়েছে, অর্থ সংরক্ষিত)
  {
    id: 'esc-101',
    escrowNumber: 'ESC-2026-0784',
    orderId: 'ord-106',
    orderNumber: 'ORD-2026-0850',
    challanNumber: 'CHN-2026-884',
    deliveryId: 'del-101',
    buyerId: 'user-buyer-satata',
    buyerName: 'মেসার্স সততা মসলা মিলস',
    buyerCompany: 'মেসার্স সততা মসলা মিলস লিমিটেড',
    sellerId: 'user-supplier-01',
    sellerName: 'কামাল আহমেদ চৌধুরী',
    sellerCompany: 'চেঙ্গী ভ্যালি এগ্রো সাপ্লাইয়ার্স',
    productName: 'খাগড়াছড়ির পাহাড়ি খাঁটি হলুদ (দীঘিনালা)',
    quantity: 400,
    unit: 'কেজি',
    productAmount: 112000,
    deliveryCost: 5000,
    otherCost: 500,
    totalAmount: 117500,
    depositDate: '০৮ নভেম্বর ২০২৬',
    status: 'in_transit',
    statusLabel: 'পণ্য সরবরাহাধীন (অর্থ সুরক্ষিত)',
    releaseConditions: {
      deliveryConfirmed: false,
      grnVerified: false,
      noActiveDispute: true,
      agreedAmountVerified: true
    },
    expectedReleaseDate: '১১ নভেম্বর ২০২৬',
    providerId: 'prov-sonali',
    providerName: 'সোনালী ব্যাংক পিএলসি',
    transactionRef: 'TXN-SBL-2026-90412',
    platformFee: 587,
    bankCharge: 250,
    netSellerPayout: 116663,
    auditTrail: [
      {
        id: 'aud-1',
        timestamp: '০৮ নভেম্বর ২০২৬, দুপুর ০২:৩০',
        actor: 'মেসার্স সততা মসলা মিলস',
        actorRole: 'পাইকারি ক্রেতা',
        action: 'এসক্রো ফান্ড ডিপোজিট',
        details: 'সোনালী ব্যাংক গেটওয়ে দিয়ে মোট ৳১,১৭,৫০০ এসক্রো ট্রাস্ট অ্যাকাউন্টে জমা হয়েছে।',
        transactionRef: 'TXN-SBL-2026-90412'
      },
      {
        id: 'aud-2',
        timestamp: '০৮ নভেম্বর ২০২৬, দুপুর ০২:৩৫',
        actor: 'সোনালী ব্যাংক পিএলসি',
        actorRole: 'অনুমোদিত এসক্রো ব্যাংক',
        action: 'তহবিল লক ও সুরক্ষা অনুমোদন',
        details: 'ফান্ড যাচাই ও ট্রাস্ট এসক্রো অ্যাকাউন্ট লক নিশ্চিতকরণ সম্পন্ন।',
        transactionRef: 'TXN-SBL-2026-90412'
      },
      {
        id: 'aud-3',
        timestamp: '০৯ নভেম্বর ২০২৬, সকাল ১০:০০',
        actor: 'কামাল আহমেদ চৌধুরী',
        actorRole: 'সরবরাহকারী',
        action: 'চালান ও পরিবহন ছাড়পত্র',
        details: 'চালানপত্র CHN-2026-884 ইস্যু ও কাভার্ড ট্রাকে লোড সম্পন্ন।',
        transactionRef: 'TXN-SBL-2026-90412'
      }
    ]
  },

  // 2. Awaiting Release - GRN received, waiting for settlement payout
  {
    id: 'esc-102',
    escrowNumber: 'ESC-2026-0779',
    orderId: 'ord-104',
    orderNumber: 'ORD-2026-0842',
    challanNumber: 'CHN-2026-875',
    deliveryId: 'del-102',
    buyerId: 'user-buyer-rajdhani',
    buyerName: 'রাজধানী ফ্রুটস আড়ত',
    buyerCompany: 'মেসার্স রাজধানী ফ্রুটস আড়ত',
    sellerId: 'user-farmer-01',
    sellerName: 'মং শৈ প্রু মারমা',
    sellerCompany: 'মারমা অর্গানিক ফার্মস',
    productName: 'রাঙামাটি জায়ান্ট কিউ আনারস (গ্রেড-এ)',
    quantity: 1200,
    unit: 'পিস',
    productAmount: 54000,
    deliveryCost: 4200,
    otherCost: 300,
    totalAmount: 58500,
    depositDate: '০৬ নভেম্বর ২০২৬',
    status: 'awaiting_release',
    statusLabel: 'অর্থ ছাড়ের অপেক্ষায় (GRN অনুমোদিত)',
    releaseConditions: {
      deliveryConfirmed: true,
      grnVerified: true,
      noActiveDispute: true,
      agreedAmountVerified: true
    },
    expectedReleaseDate: '১০ নভেম্বর ২০২৬ (আজ)',
    providerId: 'prov-brac',
    providerName: 'ব্র্যাক ব্যাংক পিএলসি',
    transactionRef: 'TXN-BBL-2026-81203',
    platformFee: 292,
    bankCharge: 150,
    netSellerPayout: 58058,
    auditTrail: [
      {
        id: 'aud-4',
        timestamp: '০৬ নভেম্বর ২০২৬, সকাল ১১:১৫',
        actor: 'রাজধানী ফ্রুটস আড়ত',
        actorRole: 'পাইকারি ক্রেতা',
        action: 'ব্র্যাক ব্যাংক এসক্রো ডিপোজিট',
        details: 'মোট ৳৫৮,৫০০ ফান্ড ব্র্যাক ব্যাংক এসক্রো অ্যাকাউন্টে গৃহীত।',
        transactionRef: 'TXN-BBL-2026-81203'
      },
      {
        id: 'aud-5',
        timestamp: '০৯ নভেম্বর ২০২৬, বিকাল ০৪:৩০',
        actor: 'রাজধানী ফ্রুটস আড়ত',
        actorRole: 'পাইকারি ক্রেতা',
        action: 'GRN ছাড়পত্র ও সন্তুষ্টি নিশ্চিতকরণ',
        details: 'GRN-2026-904 গৃহীত। ১২০০ পিস আনারস অক্ষত পাওয়া গেছে।',
        transactionRef: 'TXN-BBL-2026-81203'
      }
    ]
  },

  // 3. Released - Completed settlement
  {
    id: 'esc-103',
    escrowNumber: 'ESC-2026-0760',
    orderId: 'ord-101',
    orderNumber: 'ORD-2026-0820',
    challanNumber: 'CHN-2026-840',
    deliveryId: 'del-105',
    buyerId: 'user-buyer-bengal',
    buyerName: 'বেঙ্গল হ্যান্ডলুম ডিস্ট্রিবিউটর্স',
    buyerCompany: 'বেঙ্গল হ্যান্ডলুম ডিস্ট্রিবিউটর্স লিমিটেড',
    sellerId: 'user-farmer-01',
    sellerName: 'মং শৈ প্রু মারমা',
    sellerCompany: 'মারমা অর্গানিক ফার্মস',
    productName: 'পার্বত্য পাহাড়ি জুমের কাজুবাদাম (কাঁচা বাদাম)',
    quantity: 150,
    unit: 'কেজি',
    productAmount: 135000,
    deliveryCost: 3500,
    otherCost: 0,
    totalAmount: 138500,
    depositDate: '০১ নভেম্বর ২০২৬',
    status: 'released',
    statusLabel: 'অর্থ ছাড় সম্পন্ন (সেটেলমেন্ট গৃহীত)',
    releaseConditions: {
      deliveryConfirmed: true,
      grnVerified: true,
      noActiveDispute: true,
      agreedAmountVerified: true
    },
    expectedReleaseDate: '০৪ নভেম্বর ২০২৬',
    actualReleaseDate: '০৪ নভেম্বর ২০২৬, বিকাল ০৩:০০',
    providerId: 'prov-sonali',
    providerName: 'সোনালী ব্যাংক পিএলসি',
    transactionRef: 'TXN-SBL-2026-70192',
    platformFee: 692,
    bankCharge: 250,
    netSellerPayout: 137558,
    auditTrail: [
      {
        id: 'aud-6',
        timestamp: '০১ নভেম্বর ২০২৬, সকাল ১০:০০',
        actor: 'বেঙ্গল হ্যান্ডলুম ডিস্ট্রিবিউটর্স',
        actorRole: 'পাইকারি ক্রেতা',
        action: 'এসক্রো ডিপোজিট সম্পন্ন',
        details: '৳১,৩৮,৫০০ ডিপোজিট গৃহীত।',
        transactionRef: 'TXN-SBL-2026-70192'
      },
      {
        id: 'aud-7',
        timestamp: '০৪ নভেম্বর ২০২৬, বিকাল ০৩:০০',
        actor: 'সোনালী ব্যাংক পিএলসি',
        actorRole: 'অনুমোদিত এসক্রো ব্যাংক',
        action: 'বিক্রেতার অ্যাকাউন্টে ফান্ড ট্রান্সফার',
        details: 'মং শৈ প্রু মারমার সোনালী ব্যাংক অ্যাকাউন্টে ৳১,৩৭,৫৫৮ সরাসরি ছাড়কৃত।',
        transactionRef: 'TXN-SBL-2026-70192'
      }
    ]
  },

  // 4. Paused due to Dispute (বিরোধের কারণে অর্থ ছাড় স্থগিত)
  {
    id: 'esc-104',
    escrowNumber: 'ESC-2026-0790',
    orderId: 'ord-105',
    orderNumber: 'ORD-2026-0848',
    challanNumber: 'CHN-2026-888',
    deliveryId: 'del-103',
    buyerId: 'user-buyer-dhaka',
    buyerName: 'ঢাকা এগ্রো ফুডস পাইকারি বিপণি',
    buyerCompany: 'ঢাকা এগ্রো ফুডস লিমিটেড',
    sellerId: 'user-supplier-01',
    sellerName: 'কামাল আহমেদ চৌধুরী',
    sellerCompany: 'চেঙ্গী ভ্যালি এগ্রো সাপ্লাইয়ার্স',
    productName: 'বান্দরবানের পাহাড়ি আম্রপালি আম (বাগান ফ্রেশ)',
    quantity: 800,
    unit: 'কেজি',
    productAmount: 96000,
    deliveryCost: 4800,
    otherCost: 400,
    totalAmount: 101200,
    depositDate: '০৭ নভেম্বর ২০২৬',
    status: 'paused_dispute',
    statusLabel: 'বিরোধের কারণে অর্থ ছাড় স্থগিত',
    releaseConditions: {
      deliveryConfirmed: true,
      grnVerified: false,
      noActiveDispute: false,
      agreedAmountVerified: false
    },
    expectedReleaseDate: 'তদন্তাধীন',
    providerId: 'prov-bkash',
    providerName: 'বিকাশ লিমিটেড (এগ্রো এসক্রো গেটওয়ে)',
    transactionRef: 'TXN-BKASH-2026-66109',
    platformFee: 506,
    bankCharge: 200,
    netSellerPayout: 100494,
    auditTrail: [
      {
        id: 'aud-8',
        timestamp: '০৭ নভেম্বর ২০২৬, সকাল ০৯:০০',
        actor: 'ঢাকা এগ্রো ফুডস লিমিটেড',
        actorRole: 'পাইকারি ক্রেতা',
        action: 'বিকাশ গেটওয়ে ডিপোজিট',
        details: '৳১,০১,২০০ বিকাশ এগ্রো এসক্রো ট্রাস্ট পুলে জমা হয়েছে।',
        transactionRef: 'TXN-BKASH-2026-66109'
      },
      {
        id: 'aud-9',
        timestamp: '০৯ নভেম্বর ২০২৬, দুপুর ০১:১৫',
        actor: 'ঢাকা এগ্রো ফুডস লিমিটেড',
        actorRole: 'পাইকারি ক্রেতা',
        action: 'অভিযোগ দাখিল ও বিরোধ সৃষ্টি',
        details: 'আংশিক পচন ও অতিরিক্ত গরমে ক্ষতির অভিযোগ দাখিল। স্বয়ংক্রিয়ভাবে অর্থ ছাড় স্থগিত।',
        transactionRef: 'TXN-BKASH-2026-66109'
      }
    ]
  },

  // 5. Awaiting Payment (অর্ডার নিশ্চিত হয়েছে কিন্তু পেমেন্ট বাকি)
  {
    id: 'esc-105',
    escrowNumber: 'ESC-2026-0795',
    orderId: 'ord-102',
    orderNumber: 'ORD-2026-0835',
    buyerId: 'user-buyer-satata',
    buyerName: 'মেসার্স সততা মসলা মিলস',
    buyerCompany: 'মেসার্স সততা মসলা মিলস লিমিটেড',
    sellerId: 'user-farmer-01',
    sellerName: 'মং শৈ প্রু মারমা',
    sellerCompany: 'মারমা অর্গানিক ফার্মস',
    productName: 'বান্দরবানের প্রাকৃতিক বুনো মধু',
    quantity: 50,
    unit: 'কেজি',
    productAmount: 47500,
    deliveryCost: 1500,
    otherCost: 0,
    totalAmount: 49000,
    depositDate: '১০ নভেম্বর ২০২৬',
    status: 'awaiting_payment',
    statusLabel: 'ক্রেতার পেমেন্টের অপেক্ষায়',
    releaseConditions: {
      deliveryConfirmed: false,
      grnVerified: false,
      noActiveDispute: true,
      agreedAmountVerified: true
    },
    expectedReleaseDate: 'পেমেন্ট সাপেক্ষে',
    providerId: 'prov-sonali',
    providerName: 'সোনালী ব্যাংক পিএলসি',
    transactionRef: 'PENDING-AUTH',
    platformFee: 245,
    bankCharge: 100,
    netSellerPayout: 48655,
    auditTrail: [
      {
        id: 'aud-10',
        timestamp: '১০ নভেম্বর ২০২৬, সকাল ১০:০০',
        actor: 'সিস্টেম',
        actorRole: 'প্ল্যাটফর্ম ইঞ্জিন',
        action: 'এসক্রো চুক্তি প্রস্তুত',
        details: 'অর্ডার ORD-2026-0835 কনফার্মেশনের প্রেক্ষিতে এসক্রো রেকর্ড তৈরি হয়েছে।',
        transactionRef: 'PENDING-AUTH'
      }
    ]
  }
];

export const INITIAL_BUYER_PAYMENTS: BuyerPaymentTransaction[] = [
  {
    id: 'bpt-1',
    transactionNumber: 'TXN-SBL-2026-90412',
    orderNumber: 'ORD-2026-0850',
    escrowNumber: 'ESC-2026-0784',
    sellerName: 'কামাল আহমেদ চৌধুরী (চেঙ্গী ভ্যালি এগ্রো)',
    productName: 'খাগড়াছড়ির পাহাড়ি খাঁটি হলুদ (দীঘিনালা)',
    quantity: 400,
    unit: 'কেজি',
    amount: 117500,
    paymentMethod: 'bank_transfer',
    paymentMethodLabel: 'সোনালী ব্যাংক পিএলসি (RTGS / অনলাইন)',
    providerName: 'সোনালী ব্যাংক পিএলসি',
    transactionDate: '০৮ নভেম্বর ২০২৬, দুপুর ০২:৩০',
    transactionRef: 'SBL-RTGS-8840192',
    receiptNumber: 'RCPT-2026-4401',
    status: 'in_escrow',
    statusLabel: 'এসক্রোতে সংরক্ষিত',
    isSimulated: true
  },
  {
    id: 'bpt-2',
    transactionNumber: 'TXN-BBL-2026-81203',
    orderNumber: 'ORD-2026-0842',
    escrowNumber: 'ESC-2026-0779',
    sellerName: 'মং শৈ প্রু মারমা (মারমা অর্গানিক ফার্মস)',
    productName: 'রাঙামাটি জায়ান্ট কিউ আনারস (গ্রেড-এ)',
    quantity: 1200,
    unit: 'পিস',
    amount: 58500,
    paymentMethod: 'card_gateway',
    paymentMethodLabel: 'ব্র্যাক ব্যাংক ভিসা / মাস্টারকার্ড গেটওয়ে',
    providerName: 'ব্র্যাক ব্যাংক পিএলসি',
    transactionDate: '০৬ নভেম্বর ২০২৬, সকাল ১১:১৫',
    transactionRef: 'BBL-PGW-4410928',
    receiptNumber: 'RCPT-2026-4389',
    status: 'in_escrow',
    statusLabel: 'অর্থ ছাড়ের অপেক্ষায়',
    isSimulated: true
  },
  {
    id: 'bpt-3',
    transactionNumber: 'TXN-SBL-2026-70192',
    orderNumber: 'ORD-2026-0820',
    escrowNumber: 'ESC-2026-0760',
    sellerName: 'মং শৈ প্রু মারমা (মারমা অর্গানিক ফার্মস)',
    productName: 'পার্বত্য পাহাড়ি জুমের কাজুবাদাম (কাঁচা বাদাম)',
    quantity: 150,
    unit: 'কেজি',
    amount: 138500,
    paymentMethod: 'bank_transfer',
    paymentMethodLabel: 'সোনালী ব্যাংক ট্রাস্ট ট্রান্সফার',
    providerName: 'সোনালী ব্যাংক পিএলসি',
    transactionDate: '০১ নভেম্বর ২০২৬, সকাল ১০:০০',
    transactionRef: 'SBL-EFT-9041284',
    receiptNumber: 'RCPT-2026-4210',
    status: 'completed',
    statusLabel: 'অর্থ ছাড় সম্পন্ন',
    isSimulated: true
  },
  {
    id: 'bpt-4',
    transactionNumber: 'TXN-BKASH-2026-66109',
    orderNumber: 'ORD-2026-0848',
    escrowNumber: 'ESC-2026-0790',
    sellerName: 'কামাল আহমেদ চৌধুরী (চেঙ্গী ভ্যালি এগ্রো)',
    productName: 'বান্দরবানের পাহাড়ি আম্রপালি আম (বাগান ফ্রেশ)',
    quantity: 800,
    unit: 'কেজি',
    amount: 101200,
    paymentMethod: 'mfs_bkash',
    paymentMethodLabel: 'বিকাশ এগ্রো পেমেন্ট মার্চেন্ট গেটওয়ে',
    providerName: 'বিকাশ লিমিটেড',
    transactionDate: '০৭ নভেম্বর ২০২৬, সকাল ০৯:০০',
    transactionRef: 'BKASH-9K2M401L',
    receiptNumber: 'RCPT-2026-4395',
    status: 'in_escrow',
    statusLabel: 'বিরোধের কারণে স্থগিত',
    isSimulated: true
  }
];

export const INITIAL_SELLER_SETTLEMENTS: SellerSettlementItem[] = [
  {
    id: 'set-1',
    settlementNumber: 'STL-2026-0310',
    transactionNumber: 'TXN-SBL-2026-70192',
    orderNumber: 'ORD-2026-0820',
    escrowNumber: 'ESC-2026-0760',
    buyerName: 'বেঙ্গল হ্যান্ডলুম ডিস্ট্রিবিউটর্স',
    buyerCompany: 'বেঙ্গল হ্যান্ডলুম ডিস্ট্রিবিউটর্স লিমিটেড',
    productName: 'পার্বত্য পাহাড়ি জুমের কাজুবাদাম',
    orderValue: 138500,
    platformFeeAmount: 692,
    bankCharge: 250,
    netPayout: 137558,
    status: 'released',
    statusLabel: 'ব্যাংকে ছাড় সম্পন্ন',
    releaseDate: '০৪ নভেম্বর ২০২৬',
    bankAccountMasked: 'সোনালী ব্যাংক · হিসাব নং: ০১২০-****-৮৯০',
    statementDownloadRef: 'STMT-STL-2026-0310.pdf'
  },
  {
    id: 'set-2',
    settlementNumber: 'STL-2026-0318',
    transactionNumber: 'TXN-BBL-2026-81203',
    orderNumber: 'ORD-2026-0842',
    escrowNumber: 'ESC-2026-0779',
    buyerName: 'রাজধানী ফ্রুটস আড়ত',
    buyerCompany: 'মেসার্স রাজধানী ফ্রুটস আড়ত',
    productName: 'রাঙামাটি জায়ান্ট কিউ আনারস',
    orderValue: 58500,
    platformFeeAmount: 292,
    bankCharge: 150,
    netPayout: 58058,
    status: 'ready_for_release',
    statusLabel: 'অর্থ ছাড়ের জন্য প্রস্তুত',
    releaseDate: '১০ নভেম্বর ২০২৬ (প্রক্রিয়াধীন)',
    bankAccountMasked: 'সোনালী ব্যাংক · হিসাব নং: ০১২০-****-৮৯০',
    statementDownloadRef: 'STMT-STL-2026-0318.pdf'
  },
  {
    id: 'set-3',
    settlementNumber: 'STL-2026-0322',
    transactionNumber: 'TXN-SBL-2026-90412',
    orderNumber: 'ORD-2026-0850',
    escrowNumber: 'ESC-2026-0784',
    buyerName: 'মেসার্স সততা মসলা মিলস',
    buyerCompany: 'মেসার্স সততা মসলা মিলস লিমিটেড',
    productName: 'খাগড়াছড়ির পাহাড়ি খাঁটি হলুদ (দীঘিনালা)',
    orderValue: 117500,
    platformFeeAmount: 587,
    bankCharge: 250,
    netPayout: 116663,
    status: 'pending',
    statusLabel: 'এসক্রো হোল্ডে সংরক্ষিত',
    releaseDate: 'ডেলিভারি সাপেক্ষে',
    bankAccountMasked: 'ইসলামী ব্যাংক · হিসাব নং: ২০৫০-****-৪৪১',
    statementDownloadRef: 'STMT-STL-2026-0322.pdf'
  },
  {
    id: 'set-4',
    settlementNumber: 'STL-2026-0325',
    transactionNumber: 'TXN-BKASH-2026-66109',
    orderNumber: 'ORD-2026-0848',
    escrowNumber: 'ESC-2026-0790',
    buyerName: 'ঢাকা এগ্রো ফুডস লিমিটেড',
    buyerCompany: 'ঢাকা এগ্রো ফুডস লিমিটেড',
    productName: 'বান্দরবানের পাহাড়ি আম্রপালি আম',
    orderValue: 101200,
    platformFeeAmount: 506,
    bankCharge: 200,
    netPayout: 100494,
    status: 'on_hold_dispute',
    statusLabel: 'বিরোধের কারণে স্থগিত',
    releaseDate: 'নিষ্পত্তি সাপেক্ষে',
    bankAccountMasked: 'ইসলামী ব্যাংক · হিসাব নং: ২০৫০-****-৪৪১',
    statementDownloadRef: 'STMT-STL-2026-0325.pdf'
  }
];

export const INITIAL_REFUNDS: RefundRecord[] = [
  {
    id: 'ref-1',
    refundNumber: 'RFD-2026-0042',
    orderNumber: 'ORD-2026-0810',
    originalTransactionRef: 'TXN-SBL-2026-55410',
    buyerName: 'মেসার্স সততা মসলা মিলস',
    sellerName: 'কামাল আহমেদ চৌধুরী',
    originalAmount: 45000,
    requestedAmount: 45000,
    refundReason: 'পাহাড়ি বৃষ্টিপাতে যোগাযোগ বিচ্ছিন্ন হওয়ায় উভয় পক্ষের সম্মতিতে অর্ডার বাতিল',
    evidenceNote: 'পারস্পরিক সম্মতিপত্র ও বাতিল অর্ডার রিকুয়েস্ট সংযুক্ত।',
    status: 'completed',
    statusLabel: 'অর্থ ফেরত সম্পন্ন',
    requestDate: '২৮ অক্টোবর ২০২৬',
    completionDate: '৩০ অক্টোবর ২০২৬',
    approvedBy: 'সোনালী ব্যাংক ট্রেজারি ডেস্ক'
  },
  {
    id: 'ref-2',
    refundNumber: 'RFD-2026-0048',
    orderNumber: 'ORD-2026-0848',
    originalTransactionRef: 'TXN-BKASH-2026-66109',
    buyerName: 'ঢাকা এগ্রো ফুডস লিমিটেড',
    sellerName: 'কামাল আহমেদ চৌধুরী',
    originalAmount: 101200,
    requestedAmount: 14400,
    refundReason: 'পরিবহনে ১২০ কেজি আম ক্ষতিগ্রস্ত হওয়ায় আংশিক ক্ষতিপূরণ রিফান্ড দাবি',
    evidenceNote: 'GRN ড্যামেজ রিপোর্ট ও ছবি সংযুক্ত রয়েছে।',
    status: 'under_review',
    statusLabel: 'পর্যালোচনাধীন (মধ্যস্থতা চলছে)',
    requestDate: '০৯ নভেম্বর ২০২৬',
    completionDate: 'অপেক্ষমাণ',
    approvedBy: 'সালিশি কমিটি'
  }
];

export const INITIAL_FINANCIAL_DISPUTES: FinancialDisputeRecord[] = [
  {
    id: 'fdisp-1',
    disputeNumber: 'DSP-2026-0018',
    orderNumber: 'ORD-2026-0848',
    transactionRef: 'TXN-BKASH-2026-66109',
    escrowNumber: 'ESC-2026-0790',
    buyerName: 'ঢাকা এগ্রো ফুডস লিমিটেড',
    sellerName: 'কামাল আহমেদ চৌধুরী (চেঙ্গী ভ্যালি এগ্রো)',
    category: 'পণ্য ক্ষতিগ্রস্ত ও গুণগত মানে অমিল',
    description: '৮০০ কেজি আম্রপালি আমের চালানের মধ্যে ১২০ কেজি ফল গরমে নরম ও নষ্ট পাওয়া গেছে। ক্রেতা ৳১৪,৪০০ আংশিক রিফান্ড বা আগামী চালানে সমন্বয়ের আবেদন করেছেন।',
    evidencePhotos: [
      'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=80'
    ],
    filingDate: '০৯ নভেম্বর ২০২৬',
    status: 'mediation',
    statusLabel: 'মধ্যস্থতা ও সমঝোতা আলোচনাধীন',
    buyerStatement: 'আমরা নষ্ট ১২০ কেজি আমের সমপরিমাণ টাকা এসক্রো থেকে রিফান্ড চাই এবং বাকি ৮৬,৮০০ টাকা বিক্রেতাকে ছাড় দেওয়া হোক।',
    sellerStatement: 'পরিবহনে কাভার্ড ট্রাকে ভেন্টিলেশন ঘাটতি ছিল। আমরা ৳১০,০০০ ছাড় দিতে সম্মত অথবা আগামী চালানে ১০০ কেজি আম ফ্রী সরবরাহ করব।',
    mediatorRecommendation: 'পার্বত্য চট্টগ্রাম মন্ত্রণালয়ের পক্ষ থেকে ৳১২,০০০ রিফান্ড ও বাকি টাকা বিক্রেতার অনুকূলে ছাড়ের সুপারিশ করা হয়েছে।',
    history: [
      {
        date: '০৯ নভেম্বর ২০২৬, দুপুর ০১:১৫',
        actor: 'ঢাকা এগ্রো ফুডস',
        action: 'বিরোধ দায়ের',
        note: 'ডেলিভারি গ্রহণের সময় ড্যামেজ দাবি করে বিরোধ দায়ের।'
      },
      {
        date: '০৯ নভেম্বর ২০২৬, দুপুর ০১:২০',
        actor: 'সিস্টেম',
        action: 'এসক্রো স্থগিত',
        note: 'বিকাশ ট্রাস্ট এসক্রো অ্যাকাউন্টে ৳১,০১,২০০ পেমেন্ট হোল্ড করা হয়েছে।'
      },
      {
        date: '১০ নভেম্বর ২০২৬, সকাল ১০:৩০',
        actor: 'কামাল আহমেদ চৌধুরী',
        action: 'বিক্রেতার জবাব',
        note: 'সমঝোতায় অংশগ্রহণের আগ্রহ প্রকাশ ও বিকল্প অফার উপস্থাপন।'
      }
    ]
  }
];

export const MINISTRY_FINANCIAL_DISTRICT_STATS = [
  {
    district: 'রাঙামাটি',
    totalVolume: 4850000,
    totalTransactions: 142,
    escrowHeld: 840000,
    releasedFunds: 3820000,
    disputedVolume: 120000,
    topProducts: ['আনারস', 'কাজুবাদাম', 'বুনো মধু', 'কলা'],
    primaryBank: 'সোনালী ব্যাংক পিএলসি'
  },
  {
    district: 'খাগড়াছড়ি',
    totalVolume: 4210000,
    totalTransactions: 128,
    escrowHeld: 620000,
    releasedFunds: 3450000,
    disputedVolume: 80000,
    topProducts: ['জুমের খাঁটি হলুদ', 'দেশি আদা', 'বাঁশ কারুশিল্প'],
    primaryBank: 'ব্র্যাক ব্যাংক ও সোনালী ব্যাংক'
  },
  {
    district: 'বান্দরবান',
    totalVolume: 5120000,
    totalTransactions: 156,
    escrowHeld: 980000,
    releasedFunds: 3950000,
    disputedVolume: 101200,
    topProducts: ['আম্রপালি আম', 'জুম হলুদ', 'কাজুবাদাম', 'কফি'],
    primaryBank: 'সোনালী ব্যাংক ও বিকাশ এগ্রো'
  }
];
