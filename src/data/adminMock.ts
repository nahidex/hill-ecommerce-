import { 
  AdminUserItem, 
  MinistryOfficer, 
  MinistryRBACPermission, 
  MinistryAdminSummary,
  ProductApprovalStatus
} from '../types';

export const MINISTRY_PERMISSIONS_LIST: MinistryRBACPermission[] = [
  {
    key: 'user_verify_approve',
    name: 'ব্যবহারকারী যাচাই ও অনুমোদন',
    description: 'নতুন নিবন্ধিত কৃষিজীবী, সরবরাহকারী ও পাইকারদের NID ও ট্রেড লাইসেন্স যাচাই এবং অনুমোদন প্রদান।',
    category: 'users'
  },
  {
    key: 'user_suspend_reactivate',
    name: 'ব্যবহারকারী স্থগিত ও পুনঃসক্রিয়করণ',
    description: 'নীতিমালা লঙ্ঘনে অ্যাকাউন্ট সাময়িক স্থগিত এবং নিষ্পত্তি সাপেক্ষে পুনঃসক্রিয়করণ।',
    category: 'users'
  },
  {
    key: 'product_catalog_approval',
    name: 'পণ্য অনুমোদন ও মান নিয়ন্ত্রণ',
    description: 'নতুন পাইকারি লট ও পণ্য ক্যাটালগ যাচাই, গ্রেডিং পরীক্ষা এবং বাজারে লাইভ অনুমোদন।',
    category: 'products'
  },
  {
    key: 'product_suspend',
    name: 'পণ্য স্থগিত ও সংশোধন নির্দেশ',
    description: 'মানহীন বা ভুল তথ্যযুক্ত পণ্য বাজার থেকে সরিয়ে ফেলা এবং সংশোধন অনুরোধ।',
    category: 'products'
  },
  {
    key: 'escrow_trust_audit',
    name: 'এসক্রো ট্রাস্ট ও সেটেলমেন্ট অডিট',
    description: 'সোনালী ব্যাংক ট্রাস্ট হিসাব, ক্রেতার জমা এবং বিক্রেতার অনুকূলে অর্থ ছাড়ের অডিট পরিচালনা।',
    category: 'finance'
  },
  {
    key: 'refund_dispute_settle',
    name: 'রিফান্ড ও আর্থিক বিরোধ নিষ্পত্তি',
    description: 'লেনদেনসংক্রান্ত অভিযোগ তদন্ত, রিফান্ড অনুমোদন এবং মধ্যস্থতার সিদ্ধান্ত কার্যকর করা।',
    category: 'finance'
  },
  {
    key: 'logistics_hub_inspect',
    name: 'লজিস্টিকস ও পরিবহন তদারকি',
    description: 'পাহাড়ি চালানের চেকপয়েন্ট পর্যবেক্ষণ, বিলম্বিত ডেলিভারি মনিটরিং এবং যানবাহন ট্র্যাকিং।',
    category: 'logistics'
  },
  {
    key: 'system_rbac_config',
    name: 'অ্যাডমিন রোল ও অনুমতি নিয়ন্ত্রণ',
    description: 'মন্ত্রণালয়ের কর্মকর্তাদের প্রশাসনিক দায়িত্ব বণ্টন ও নিরাপত্তা অডিট লগ পর্যবেক্ষণ।',
    category: 'system'
  }
];

export const SAMPLE_MINISTRY_OFFICERS: MinistryOfficer[] = [
  {
    id: 'off-01',
    name: 'মো. শাহজাহান কবির',
    designation: 'যুগ্মসচিব (উন্নয়ন ও প্রশাসন)',
    ministryRole: 'super_admin',
    ministryRoleLabel: 'সুপার অ্যাডমিন (Super Admin)',
    email: 'shahjahan.kabir@mochta.gov.bd',
    mobile: '০১৭১৩-০০৪৪৫৫',
    assignedDistrict: 'বাংলাদেশ সচিবালয় (জাতীয় সমন্বয়)',
    status: 'active',
    lastActive: 'এইমাত্র সক্রিয়',
    permissions: [
      'user_verify_approve',
      'user_suspend_reactivate',
      'product_catalog_approval',
      'product_suspend',
      'escrow_trust_audit',
      'refund_dispute_settle',
      'logistics_hub_inspect',
      'system_rbac_config'
    ]
  },
  {
    id: 'off-02',
    name: 'অরুণ কান্তি চাকমা',
    designation: 'সহকারী পরিচালক (ডিজিটাল রূপান্তর সেল)',
    ministryRole: 'verification_officer',
    ministryRoleLabel: 'যাচাইকরণ কর্মকর্তা (Verification Officer)',
    email: 'arun.chakma@mochta.gov.bd',
    mobile: '০১৮১৫-৭৭৮৮৯৯',
    assignedDistrict: 'রাঙামাটি পার্বত্য জেলা',
    status: 'active',
    lastActive: '১০ মিনিট আগে',
    permissions: [
      'user_verify_approve',
      'user_suspend_reactivate'
    ]
  },
  {
    id: 'off-03',
    name: 'সাদিয়া আফরিন মিলি',
    designation: 'কৃষি বিপণন ও কোয়ালিটি স্পেশালিস্ট',
    ministryRole: 'product_inspector',
    ministryRoleLabel: 'পণ্য ও বাজার তদারক কর্মকর্তা (Market & Product Inspector)',
    email: 'sadia.mili@mochta.gov.bd',
    mobile: '০১৭২২-৩৩৪৪৫৫',
    assignedDistrict: 'খাগড়াছড়ি পার্বত্য জেলা',
    status: 'active',
    lastActive: '২৫ মিনিট আগে',
    permissions: [
      'product_catalog_approval',
      'product_suspend'
    ]
  },
  {
    id: 'off-04',
    name: 'এম. রফিকুল ইসলাম',
    designation: 'উপ-পরিচালক (অর্থ ও এসক্রো নিরীক্ষা)',
    ministryRole: 'financial_auditor',
    ministryRoleLabel: 'আর্থিক নিরীক্ষক (Financial Auditor)',
    email: 'rafiqul.audit@mochta.gov.bd',
    mobile: '০১৯১১-৪৪৫৫৬৬',
    assignedDistrict: 'বান্দরবান পার্বত্য জেলা',
    status: 'active',
    lastActive: '১ ঘণ্টা আগে',
    permissions: [
      'escrow_trust_audit',
      'refund_dispute_settle'
    ]
  },
  {
    id: 'off-05',
    name: 'চিংশৈথোয়াই মারমা',
    designation: 'ফিল্ড লজিস্টিকস ও বিরোধ নিষ্পত্তি সমন্বয়ক',
    ministryRole: 'dispute_mediator',
    ministryRoleLabel: 'লজিস্টিকস ও বিরোধ মধ্যস্থতাকারী (Logistics & Dispute Mediator)',
    email: 'chingshai.cht@mochta.gov.bd',
    mobile: '০১৮১৮-১১২২৩৩',
    assignedDistrict: 'বান্দরবান ও চিম্বুক অঞ্চল',
    status: 'on_leave',
    lastActive: 'গতকাল',
    permissions: [
      'logistics_hub_inspect',
      'refund_dispute_settle'
    ]
  }
];

export const SAMPLE_ADMIN_USERS: AdminUserItem[] = [
  {
    id: 'user-farmer-01',
    memberId: 'HC-FARM-2026-104',
    name: 'মং শৈ প্রু মারমা',
    businessName: 'থানচি-রুমা জুম চাষী সমবায় সমিতি',
    role: 'farmer',
    roleLabel: 'উৎপাদক / কৃষক',
    mobile: '০১৮১৮-৪৫৬৭৮৯',
    email: 'mong.farmer@hillecommerce.gov.bd',
    district: 'বান্দরবান',
    upazila: 'রুমা',
    address: 'পাড়া-বগামুখ, ৪নং রুমা সদর ইউনিয়ন, বান্দরবান',
    joinedDate: '০১ মার্চ ২০২৬',
    verificationStatus: 'approved',
    verificationStatusLabel: 'অনুমোদিত',
    avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80',
    farmingAreaAcre: 8.5,
    productionType: 'অর্গানিক আনারস, কাজুবাদাম ও পাহাড়ি হলুদ',
    cropSpecialty: 'জুম চাষকৃত কেমিক্যালমুক্ত ফল ও মসলা',
    documents: [
      {
        id: 'doc-01',
        title: 'জাতীয় পরিচয়পত্র (NID)',
        type: 'nid',
        documentNumberMasked: '১৯৮২-XXXX-XXXX-৮৭৪৫',
        issuedDate: '১২ মে ২০১২',
        fileUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
        verificationStatus: 'verified',
        notes: 'নির্বাচন কমিশন ডাটাবেজে সঠিক তথ্য পাওয়া গেছে।'
      },
      {
        id: 'doc-02',
        title: 'কৃষি জমি ও সমবায় প্রত্যয়নপত্র',
        type: 'land_certificate',
        documentNumberMasked: 'AGRI-RUMA-2025-089',
        issuedDate: '১০ জানুয়ারি ২০২৬',
        fileUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80',
        verificationStatus: 'verified',
        notes: 'উপজেলা কৃষি সম্প্রসারণ কর্মকর্তা কর্তৃক স্বাক্ষরিত।'
      }
    ],
    auditHistory: [
      {
        id: 'aud-01',
        timestamp: '০২ মার্চ ২০২৬, সকাল ১০:১৫',
        officerName: 'অরুণ কান্তি চাকমা',
        officerRole: 'যাচাইকরণ কর্মকর্তা',
        action: 'approved',
        actionLabel: 'অনুমোদন কার্যকর',
        reason: 'NID ও স্থানীয় কৃষি প্রত্যয়নপত্র যথাযথ পাওয়া গেছে।',
        notes: 'রুমা উপজেলা সদরে সরাসরি ফিল্ড ভিজিট যাচাই সম্পন্ন।'
      }
    ],
    listedProductCount: 4,
    ordersCount: 18,
    totalTransactionValue: 485000,
    disputeCount: 0
  },
  {
    id: 'user-supp-02',
    memberId: 'HC-SUPP-2026-309',
    name: 'কামাল আহমেদ চৌধুরী',
    businessName: 'চেঙ্গী ভ্যালি এগ্রো সাপ্লাইয়ার্স',
    role: 'supplier',
    roleLabel: 'বিক্রেতা / সরবরাহকারী',
    mobile: '০১৭১১-৮৭৬৫৪৩',
    email: 'kamal.agro@hillecommerce.gov.bd',
    district: 'খাগড়াছড়ি',
    upazila: 'মহালছড়ি',
    address: 'প্রধান সড়ক, নতুন বাজার, মহালছড়ি, খাগড়াছড়ি',
    joinedDate: '১৫ জানুয়ারি ২০২৬',
    verificationStatus: 'approved',
    verificationStatusLabel: 'অনুমোদিত',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    tradeLicenseNoMasked: 'TRAD-KHA-2024-XXXX-৯২',
    warehouseCapacity: '১২০ মেট্রিক টন (কুলিং ও গ্রেডিং শেড)',
    taxIdentificationNo: 'TIN-XXXX-XXXX-৪৫',
    documents: [
      {
        id: 'doc-03',
        title: 'হালনাগাদ ট্রেড লাইসেন্স',
        type: 'trade_license',
        documentNumberMasked: 'TRAD-KHA-2024-XXXX-৯২',
        issuedDate: '০১ জুলাই ২০২৫',
        expiryDate: '৩০ জুন ২০২৬',
        fileUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80',
        verificationStatus: 'verified',
        notes: 'মহালছড়ি ইউনিয়ন পরিষদ থেকে সংগৃহীত ভেরিফাইড সনদ।'
      },
      {
        id: 'doc-04',
        title: 'জাতীয় পরিচয়পত্র',
        type: 'nid',
        documentNumberMasked: '১৯৭৫-XXXX-XXXX-১২৩০',
        issuedDate: '০৪ আগস্ট ২০১১',
        fileUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
        verificationStatus: 'verified'
      }
    ],
    auditHistory: [
      {
        id: 'aud-02',
        timestamp: '১৮ জানুয়ারি ২০২৬, দুপুর ১২:০০',
        officerName: 'সাদিয়া আফরিন মিলি',
        officerRole: 'সহকারী পরিচালক',
        action: 'approved',
        actionLabel: 'সরবরাহকারী অনুমোদন',
        reason: 'ট্রেড লাইসেন্স ও আড়ত গুদাম পরিদর্শনে সন্তোষজনক।',
        notes: '২৫০ জন কৃষকের তালিকাভুক্তির চুক্তিপত্র সংযুক্ত।'
      }
    ],
    listedProductCount: 6,
    ordersCount: 32,
    totalTransactionValue: 1240000,
    disputeCount: 1
  },
  {
    id: 'user-buyer-01',
    memberId: 'HC-BUYR-2026-892',
    name: 'তানভীর রহমান',
    businessName: 'বেঙ্গল ফ্রেশ অর্গানিক সুপারশপ নেটওয়ার্ক',
    role: 'buyer',
    roleLabel: 'পাইকারি ক্রেতা',
    mobile: '০১৯১১-২২৩৩৪৪',
    email: 'tanveer.procure@bengalagro.com',
    district: 'ঢাকা',
    upazila: 'ঢাকা উত্তর',
    address: 'প্লট ৪২, গুলশান বাণিজ্যিক এলাকা, ঢাকা-১২১২',
    joinedDate: '০৫ ফেব্রুয়ারি ২০২৬',
    verificationStatus: 'approved',
    verificationStatusLabel: 'অনুমোদিত',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    buyerType: 'সুপারশপ চেইন',
    annualTurnoverEstimated: '৳৫০ কোটি+',
    documents: [
      {
        id: 'doc-05',
        title: 'RJSC ইনকর্পোরেশন সার্টিফিকেট ও ট্রেড লাইসেন্স',
        type: 'trade_license',
        documentNumberMasked: 'C-XXXX-XXXX-৮৮',
        issuedDate: '১০ জানুয়ারি ২০২০',
        fileUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80',
        verificationStatus: 'verified'
      }
    ],
    auditHistory: [
      {
        id: 'aud-03',
        timestamp: '০৬ ফেব্রুয়ারি ২০২৬',
        officerName: 'মো. শাহজাহান কবির',
        officerRole: 'যুগ্মসচিব',
        action: 'approved',
        actionLabel: 'কর্পোরেট ক্রেতা অনুমোদন',
        reason: 'সুপারশপ চেইনের করপোরেট নথি যাচাই সম্পন্ন।'
      }
    ],
    listedProductCount: 0,
    ordersCount: 14,
    totalTransactionValue: 1890000,
    disputeCount: 0
  },
  {
    id: 'user-ent-01',
    memberId: 'HC-ENTR-2026-551',
    name: 'চিনু মারমা',
    businessName: 'মারমা ক্রাফটস অ্যান্ড থামি স্টুডিও',
    role: 'entrepreneur',
    roleLabel: 'ব্যক্তিগত উদ্যোক্তা',
    mobile: '০১৮২৫-৯৯৮৮৭৭',
    email: 'chinu.crafts@hillecommerce.gov.bd',
    district: 'বান্দরবান',
    upazila: 'রোয়াংছড়ি',
    address: 'তারাছা ইউনিয়ন, রোয়াংছড়ি রোড, বান্দরবান',
    joinedDate: '১০ ফেব্রুয়ারি ২০২৬',
    verificationStatus: 'approved',
    verificationStatusLabel: 'অনুমোদিত',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    productSpecialty: 'কোমর তাঁতের থামি, বম শাল ও পাহাড়ি হস্তশিল্প',
    craftTradition: 'মারমা উপজাতির ঐতিহ্যবাহী বয়ন ও প্রাকৃতিক রং',
    documents: [
      {
        id: 'doc-06',
        title: 'জাতীয় পরিচয়পত্র',
        type: 'nid',
        documentNumberMasked: '১৯৯৪-XXXX-XXXX-৫৫০১',
        issuedDate: '১৪ জুন ২০১৫',
        fileUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
        verificationStatus: 'verified'
      },
      {
        id: 'doc-07',
        title: 'হস্তশিল্প পণ্যের নমুনা ও কারুশিল্প ছবি',
        type: 'sample_photo',
        documentNumberMasked: 'CRAFT-SAMPLE-01',
        issuedDate: '০৮ ফেব্রুয়ারি ২০২৬',
        fileUrl: 'https://images.unsplash.com/photo-1606744824163-985d376605aa?w=600&auto=format&fit=crop&q=80',
        verificationStatus: 'verified'
      }
    ],
    auditHistory: [
      {
        id: 'aud-04',
        timestamp: '১২ ফেব্রুয়ারি ২০২৬',
        officerName: 'অরুণ কান্তি চাকমা',
        officerRole: 'যাচাইকরণ কর্মকর্তা',
        action: 'approved',
        actionLabel: 'উদ্যোক্তা যাচাই সম্পন্ন',
        reason: 'ঐতিহ্যবাহী তাঁত শিল্প ও নমুনা যাচাই সম্পন্ন।'
      }
    ],
    listedProductCount: 5,
    ordersCount: 9,
    totalTransactionValue: 142000,
    disputeCount: 0
  },
  {
    id: 'user-farm-03',
    memberId: 'HC-FARM-2026-419',
    name: 'বিপ্লব চাকমা',
    businessName: 'নানিয়ারচর ফ্রুটস এগ্রো',
    role: 'farmer',
    roleLabel: 'উৎপাদক / কৃষক',
    mobile: '০১৮২৯-১১২২৩৩',
    email: 'biplob.naniarchar@gmail.com',
    district: 'রাঙামাটি',
    upazila: 'নানিয়ারচর',
    address: 'বুড়িঘাট ইউনিয়ন, নানিয়ারচর, রাঙামাটি',
    joinedDate: '০৪ মার্চ ২০২৬',
    verificationStatus: 'pending_verification',
    verificationStatusLabel: 'যাচাইয়ের অপেক্ষায়',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    farmingAreaAcre: 5.0,
    productionType: 'হানি কুইন আনারস ও রাঙামাটি কাজুবাদাম',
    cropSpecialty: 'পাহাড়ের ঢালে বাগান চাষ',
    documents: [
      {
        id: 'doc-08',
        title: 'জাতীয় পরিচয়পত্র স্ক্যান',
        type: 'nid',
        documentNumberMasked: '১৯৮৮-XXXX-XXXX-৮৮৯১',
        issuedDate: '২০ জুলাই ২০১৪',
        fileUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
        verificationStatus: 'pending',
        notes: 'পরিদর্শন ও NID তথ্য মেলানো বাকি।'
      }
    ],
    auditHistory: [
      {
        id: 'aud-05',
        timestamp: '০৪ মার্চ ২০২৬, বিকাল ৩:৩০',
        officerName: 'সিস্টেম স্বয়ংক্রিয়',
        officerRole: 'রেজিস্ট্রেশন পোর্টাল',
        action: 'under_review',
        actionLabel: 'আবেদন দাখিল',
        reason: 'নতুন আবেদনকারী কাগজপত্র জমা দিয়েছেন।'
      }
    ],
    listedProductCount: 2,
    ordersCount: 0,
    totalTransactionValue: 0,
    disputeCount: 0
  },
  {
    id: 'user-supp-04',
    memberId: 'HC-SUPP-2026-722',
    name: 'মো. রফিকুল ইসলাম চৌধুরী',
    businessName: 'পাহাড়ি স্পাইস হাব লিমিটেড',
    role: 'supplier',
    roleLabel: 'বিক্রেতা / সরবরাহকারী',
    mobile: '০১৭৩১-৬৬৫৫৪৪',
    email: 'rafiq.spices@gmail.com',
    district: 'খাগড়াছড়ি',
    upazila: 'দীঘিনালা',
    address: 'বোয়ালখালী বাজার, দীঘিনালা, খাগড়াছড়ি',
    joinedDate: '০২ মার্চ ২০২৬',
    verificationStatus: 'under_review',
    verificationStatusLabel: 'যাচাই চলছে',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    tradeLicenseNoMasked: 'TRAD-DIGHI-2024-XXXX',
    warehouseCapacity: '৫০ মেট্রিক টন ড্রাই স্টোরেজ',
    documents: [
      {
        id: 'doc-09',
        title: 'ট্রেড লাইসেন্স কপি',
        type: 'trade_license',
        documentNumberMasked: 'TRAD-DIGHI-2024-XXXX',
        issuedDate: '১৫ আগস্ট ২০২৫',
        fileUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80',
        verificationStatus: 'pending'
      }
    ],
    auditHistory: [
      {
        id: 'aud-06',
        timestamp: '০৩ মার্চ ২০২৬',
        officerName: 'সাদিয়া আফরিন মিলি',
        officerRole: 'পণ্য ও বাজার তদারক কর্মকর্তা',
        action: 'under_review',
        actionLabel: 'তদন্ত চলমান',
        reason: 'ট্রেড লাইসেন্সের মেয়াদ ও দোকানের শারীরিক অস্তিত্ব যাচাই চলছে।'
      }
    ],
    listedProductCount: 3,
    ordersCount: 1,
    totalTransactionValue: 85000,
    disputeCount: 0
  },
  {
    id: 'user-farm-05',
    memberId: 'HC-FARM-2026-805',
    name: 'সুনীতি ত্রিপুরা',
    businessName: 'রুমা হিলস অর্গানিক জিনজার ফার্ম',
    role: 'farmer',
    roleLabel: 'উৎপাদক / কৃষক',
    mobile: '০১৮১৬-৭৭৮৮০১',
    email: 'suniti.tripura@yahoo.com',
    district: 'বান্দরবান',
    upazila: 'রুমা',
    address: 'গালেঙ্গ্যা ইউনিয়ন, রুমা, বান্দরবান',
    joinedDate: '২৭ ফেব্রুয়ারি ২০২৬',
    verificationStatus: 'correction_requested',
    verificationStatusLabel: 'সংশোধনের জন্য ফেরত',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    farmingAreaAcre: 3.5,
    productionType: 'পাহাড়ি পাহাড়ি হলুদ ও কড়া সুবাসযুক্ত আদা',
    documents: [
      {
        id: 'doc-10',
        title: 'জাতীয় পরিচয়পত্র অস্পষ্ট কপি',
        type: 'nid',
        documentNumberMasked: '১৯৯১-XXXX-XXXX-XXXX',
        issuedDate: '০১ জানুয়ারি ২০১০',
        fileUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80',
        verificationStatus: 'rejected',
        notes: 'স্ক্যান কপি অস্পষ্ট থাকায় নাম ও নম্বর পড়া যাচ্ছে না।'
      }
    ],
    auditHistory: [
      {
        id: 'aud-07',
        timestamp: '০১ মার্চ ২০২৬',
        officerName: 'অরুণ কান্তি চাকমা',
        officerRole: 'যাচাইকরণ কর্মকর্তা',
        action: 'correction_requested',
        actionLabel: 'সংশোধন অনুরোধ প্রেরিত',
        reason: 'NID কার্ডের উভয় পিঠের স্পষ্ট ও রঙিন ছবি পুনরায় আপলোড করতে বলা হয়েছে।'
      }
    ],
    listedProductCount: 1,
    ordersCount: 0,
    totalTransactionValue: 0,
    disputeCount: 0
  },
  {
    id: 'user-buyer-06',
    memberId: 'HC-BUYR-2026-913',
    name: 'ফখরুল আলম ভূঁইয়া',
    businessName: 'ভূঁইয়া ট্রেডিং করপোরেশন (কারওয়ান বাজার)',
    role: 'buyer',
    roleLabel: 'পাইকারি ক্রেতা',
    mobile: '০১৯১২-৯৮৭৬৫৪',
    email: 'fakhrul.bhuiyan@gmail.com',
    district: 'ঢাকা',
    upazila: 'তেজগাঁও',
    address: 'আড়ত নং ১২, পাইকারি ভবন, কারওয়ান বাজার, ঢাকা',
    joinedDate: '২০ ফেব্রুয়ারি ২০২৬',
    verificationStatus: 'suspended',
    verificationStatusLabel: 'সাময়িক স্থগিত',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    buyerType: 'পাইকারি আড়তদার',
    annualTurnoverEstimated: '৳১০ কোটি',
    documents: [
      {
        id: 'doc-11',
        title: 'ট্রেড লাইসেন্স',
        type: 'trade_license',
        documentNumberMasked: 'TRAD-DNCC-2023-XXXX',
        issuedDate: '০১ জুলাই ২০২৩',
        expiryDate: '৩০ জুন ২০২৪',
        fileUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80',
        verificationStatus: 'rejected',
        notes: 'ট্রেড লাইসেন্সের মেয়াদোত্তীর্ণ।'
      }
    ],
    auditHistory: [
      {
        id: 'aud-08',
        timestamp: '২৫ ফেব্রুয়ারি ২০২৬',
        officerName: 'মো. শাহজাহান কবির',
        officerRole: 'যুগ্মসচিব',
        action: 'suspended',
        actionLabel: 'অ্যাকাউন্ট স্থগিতকরণ',
        reason: 'বারবার তাগিদ সত্ত্বেও মেয়াদোত্তীর্ণ ট্রেড লাইসেন্স হালনাগাদ না করায় সাময়িক স্থগিত রাখা হয়েছে।'
      }
    ],
    listedProductCount: 0,
    ordersCount: 3,
    totalTransactionValue: 340000,
    disputeCount: 1
  },
  {
    id: 'user-farm-07',
    memberId: 'HC-FARM-2026-990',
    name: 'ক্যামং মারমা',
    businessName: 'রোয়াংছড়ি ড্রাগন ফ্রুট বাগান',
    role: 'farmer',
    roleLabel: 'উৎপাদক / কৃষক',
    mobile: '০১৮২৭-৩৪১২০০',
    email: 'kya.dragon@gmail.com',
    district: 'বান্দরবান',
    upazila: 'রোয়াংছড়ি',
    address: 'আলেক্ষ্যং ইউনিয়ন, রোয়াংছড়ি, বান্দরবান',
    joinedDate: 'আজ, ০৮:১৫',
    verificationStatus: 'new_registration',
    verificationStatusLabel: 'নতুন নিবন্ধন',
    avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80',
    farmingAreaAcre: 4.2,
    productionType: 'লাল ড্রাগন ফল ও কাজুবাদাম',
    documents: [],
    auditHistory: [
      {
        id: 'aud-09',
        timestamp: 'আজ, সকাল ০৮:১৫',
        officerName: 'সিস্টেম স্বয়ংক্রিয়',
        officerRole: 'রেজিস্ট্রেশন পোর্টাল',
        action: 'new_registration' as any,
        actionLabel: 'নতুন রেজিস্ট্রেশন সম্পন্ন',
        reason: 'কৃষক প্রোফাইল তৈরি হয়েছে, প্রয়োজনীয় কাগজপত্র আপলোডের অপেক্ষায়।'
      }
    ],
    listedProductCount: 0,
    ordersCount: 0,
    totalTransactionValue: 0,
    disputeCount: 0
  }
];

export const MINISTRY_ADMIN_SUMMARY_DATA: MinistryAdminSummary = {
  userStats: {
    totalRegistered: 1248,
    producers: 684,
    suppliers: 142,
    wholesaleBuyers: 286,
    entrepreneurs: 136,
    pendingVerification: 42,
    approved: 1188,
    suspended: 18
  },
  marketplaceStats: {
    totalListedProducts: 346,
    activeProducts: 312,
    pendingApprovalProducts: 19,
    totalWholesaleOrders: 580,
    ongoingOrders: 47,
    completedOrders: 512,
    activeRFQs: 28
  },
  transactionStats: {
    totalVolumeAmount: 48650000,
    completedVolumeAmount: 42300000,
    escrowSecuredAmount: 4850000,
    pendingReleaseAmount: 1500000,
    refundedAmount: 620000,
    disputedTransactionsCount: 3
  },
  logisticsStats: {
    totalShipments: 520,
    deliveredShipments: 488,
    delayedShipments: 8,
    inTransitShipments: 24,
    logisticsComplaints: 2
  }
};

export const MINISTRY_RECENT_AUDIT_ACTIVITIES = [
  {
    id: 'act-01',
    time: '১০ মিনিট আগে',
    officer: 'অরুণ কান্তি চাকমা (সহকারী পরিচালক)',
    action: 'কৃষক অনুমোদন',
    subject: 'মং শৈ প্রু মারমা (HC-FARM-2026-104)',
    district: 'বান্দরবান',
    details: 'NID ও স্থানীয় সমবায় প্রত্যয়নপত্র যাচাই শেষে স্থায়ী অনুমোদন প্রদান।'
  },
  {
    id: 'act-02',
    time: '৩৫ মিনিট আগে',
    officer: 'সাদিয়া আফরিন মিলি (বাজার তদারক কর্মকর্তা)',
    action: 'পণ্য অনুমোদন',
    subject: 'পাহাড়ি অর্গানিক হলুদ গুঁড়া (লট #৮৯)',
    district: 'খাগড়াছড়ি',
    details: 'ল্যাব পিউরিটি টেস্ট সনদ ও গ্রেডিং সন্তোষজনক হওয়ায় বাজারে লাইভ।'
  },
  {
    id: 'act-03',
    time: '১ ঘণ্টা আগে',
    officer: 'এম. রফিকুল ইসলাম (উপ-পরিচালক, অর্থ)',
    action: 'এসক্রো অর্থ ছাড় অনুমোদন',
    subject: 'সোনালী ব্যাংক ট্রাস্ট ট্রান্সফার (TXN-7782)',
    district: 'জাতীয় এসক্রো সেল',
    details: 'GRN ও ডেলিভারি রিপোর্ট পূর্ণ হওয়ায় বিক্রেতার অনুকূলে ৳১,৯৪,৮০০ ছাড়।'
  },
  {
    id: 'act-04',
    time: '৩ ঘণ্টা আগে',
    officer: 'মো. শাহজাহান কবির (যুগ্মসচিব)',
    action: 'নীতিমালা লঙ্ঘন নোটিশ',
    subject: 'ভূঁইয়া ট্রেডিং করপোরেশন (HC-BUYR-2026-913)',
    district: 'ঢাকা',
    details: 'মেয়াদোত্তীর্ণ ট্রেড লাইসেন্স হালনাগাদ না করায় সাময়িক স্থগিতাদেশ জারি।'
  }
];
