import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  Package, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  MapPin, 
  Calendar, 
  ArrowUpRight, 
  Eye, 
  FileText, 
  Layers, 
  Activity, 
  Filter,
  Check,
  XCircle,
  HelpCircle,
  AlertCircle
} from 'lucide-react';
import { 
  MinistryAdminSummary, 
  AdminUserItem, 
  ProductItem, 
  OrderItem, 
  EscrowRecord 
} from '../../types';
import { 
  MINISTRY_ADMIN_SUMMARY_DATA, 
  MINISTRY_RECENT_AUDIT_ACTIVITIES 
} from '../../data/adminMock';

interface MinistryAdminDashboardProps {
  users: AdminUserItem[];
  products: ProductItem[];
  orders: OrderItem[];
  escrows: EscrowRecord[];
  onNavigateTab: (tab: 'dashboard' | 'verification' | 'products' | 'users' | 'rbac' | 'finance' | 'logistics') => void;
  onSelectUserForVerification?: (user: AdminUserItem) => void;
  onSelectProductForApproval?: (product: ProductItem) => void;
}

export const MinistryAdminDashboard: React.FC<MinistryAdminDashboardProps> = ({
  users,
  products,
  orders,
  escrows,
  onNavigateTab,
  onSelectUserForVerification,
  onSelectProductForApproval
}) => {
  const [timeframe, setTimeframe] = useState<'daily' | 'monthly' | 'yearly'>('monthly');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');

  // Dynamic calculations based on state or defaults
  const pendingUsers = users.filter(u => u.verificationStatus === 'pending_verification' || u.verificationStatus === 'under_review');
  const pendingProds = products.filter(p => p.approvalStatus === 'pending_approval' || p.status === 'pending_approval');
  
  // Real or simulated summary values
  const stats = MINISTRY_ADMIN_SUMMARY_DATA;

  // District statistics data
  const districtAnalytics = [
    {
      name: 'রাঙামাটি',
      color: 'border-l-emerald-600',
      registeredUsers: 492,
      activeProducers: 280,
      monthlyTradeVolume: '৳১.৮৫ কোটি',
      topCommodity: 'হানি কুইন আনারস ও রাঙামাটি কাজুবাদাম',
      growthRate: '+১৫%'
    },
    {
      name: 'খাগড়াছড়ি',
      color: 'border-l-amber-600',
      registeredUsers: 418,
      activeProducers: 232,
      monthlyTradeVolume: '৳১.৬৫ কোটি',
      topCommodity: 'পাহাড়ি হলুদ, আদা ও আম্রপালি আম',
      growthRate: '+১৮%'
    },
    {
      name: 'বান্দরবান',
      color: 'border-l-teal-600',
      registeredUsers: 338,
      activeProducers: 172,
      monthlyTradeVolume: '৳১.৩৫ কোটি',
      topCommodity: 'অর্গানিক জুম ফলমূল, কফি ও কোমর তাঁতের থামি',
      growthRate: '+১২%'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in">
      
      {/* 1. Header Banner & Government Oversight Notice */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-stone-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg border border-emerald-800/40">
        <div className="relative z-10 max-w-4xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/60 border border-emerald-700/60 text-xs font-semibold text-emerald-200">
            <Building2 className="w-3.5 h-3.5 text-amber-400" />
            <span>পার্বত্য চট্টগ্রাম বিষয়ক মন্ত্রণালয় · কেন্দ্রীয় নিয়ন্ত্রণ সেল</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-brand">
            মন্ত্রণালয় অ্যাডমিন ও সমন্বিত তদারকি হাব
          </h1>

          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-3xl">
            পার্বত্য চট্টগ্রামের তিন জেলায় প্রান্তিক উৎপাদক ও সরবরাহকারীদের বৈধতা যাচাই, পণ্যের মান নিয়ন্ত্রণ, 
            নিরাপদ এসক্রো ট্রাস্ট লেনদেন এবং দেশব্যাপী বাল্ক সাপ্লাই চেইনের কেন্দ্রীয় পর্যবেক্ষণ ব্যবস্থা।
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-emerald-300">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              লাইভ ডাটাবেজ সমন্বয় সক্রিয়
            </span>
            <span>·</span>
            <span>সর্বশেষ ব্যাকআপ: আজ, সকাল ০৭:৩০</span>
            <span>·</span>
            <span className="text-amber-300 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/50">
              পর্যাপ্ত এনক্রিপশন ও সাইবার সিকিউরিটি অডিট কার্যকর
            </span>
          </div>
        </div>

        {/* Decorative Emblem Watermark */}
        <div className="absolute right-6 -bottom-6 opacity-10 pointer-events-none hidden md:block">
          <Building2 className="w-64 h-64 text-white" />
        </div>
      </div>

      {/* 2. Timeframe & Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Calendar className="w-4 h-4 text-emerald-800 shrink-0" />
          <span className="text-xs font-bold text-stone-700">পরিসংখ্যান সময়সীমা:</span>
          <div className="flex items-center bg-stone-100 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setTimeframe('daily')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                timeframe === 'daily' ? 'bg-white text-stone-900 shadow-xs font-bold' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              দৈনিক
            </button>
            <button
              onClick={() => setTimeframe('monthly')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                timeframe === 'monthly' ? 'bg-white text-stone-900 shadow-xs font-bold' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              চলতি মাস
            </button>
            <button
              onClick={() => setTimeframe('yearly')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                timeframe === 'yearly' ? 'bg-white text-stone-900 shadow-xs font-bold' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              বার্ষিক (২০২৬)
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          <button
            onClick={() => onNavigateTab('verification')}
            className="px-3.5 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
          >
            <Users className="w-3.5 h-3.5 text-amber-300" />
            <span>যাচাইকরণ তালিকা ({pendingUsers.length})</span>
          </button>
          <button
            onClick={() => onNavigateTab('products')}
            className="px-3.5 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Package className="w-3.5 h-3.5 text-amber-300" />
            <span>পণ্য অনুমোদন ({pendingProds.length})</span>
          </button>
        </div>
      </div>

      {/* 3. Four Core Administrative Summary Categories (§2) */}

      {/* Category A: User Statistics (ব্যবহারকারী পরিসংখ্যান - ৮টি কার্ড) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-800" />
            <h3 className="text-sm font-bold text-stone-900">ব্যবহারকারী পরিসংখ্যান (User Statistics)</h3>
          </div>
          <button
            onClick={() => onNavigateTab('verification')}
            className="text-xs font-bold text-emerald-800 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>সকল ব্যবহারকারী দেখুন</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 text-xs">
          <div className="p-3.5 bg-white rounded-2xl border border-stone-200 shadow-2xs space-y-1">
            <span className="text-[11px] text-stone-500 block">মোট নিবন্ধিত</span>
            <span className="text-lg font-bold text-stone-900 tabular-nums">১,২৪৮</span>
            <span className="text-[10px] text-emerald-700 block font-semibold">+২৪ চলতি সপ্তাহে</span>
          </div>
          <div className="p-3.5 bg-white rounded-2xl border border-stone-200 shadow-2xs space-y-1">
            <span className="text-[11px] text-stone-500 block">উৎপাদক / কৃষক</span>
            <span className="text-lg font-bold text-emerald-900 tabular-nums">৬৮৪</span>
            <span className="text-[10px] text-stone-400 block">৫৫% পাহাড়ি কৃষক</span>
          </div>
          <div className="p-3.5 bg-white rounded-2xl border border-stone-200 shadow-2xs space-y-1">
            <span className="text-[11px] text-stone-500 block">সরবরাহকারী</span>
            <span className="text-lg font-bold text-stone-900 tabular-nums">১৪২</span>
            <span className="text-[10px] text-stone-400 block">আড়তদার ও সমবায়</span>
          </div>
          <div className="p-3.5 bg-white rounded-2xl border border-stone-200 shadow-2xs space-y-1">
            <span className="text-[11px] text-stone-500 block">পাইকারি ক্রেতা</span>
            <span className="text-lg font-bold text-stone-900 tabular-nums">২৮৬</span>
            <span className="text-[10px] text-stone-400 block">জাতীয় সুপারশপ ও আড়ত</span>
          </div>
          <div className="p-3.5 bg-white rounded-2xl border border-stone-200 shadow-2xs space-y-1">
            <span className="text-[11px] text-stone-500 block">উদ্যোক্তা</span>
            <span className="text-lg font-bold text-stone-900 tabular-nums">১৩৬</span>
            <span className="text-[10px] text-stone-400 block">তাঁত ও হস্তশিল্প</span>
          </div>
          <div className="p-3.5 bg-amber-50/80 rounded-2xl border border-amber-200 shadow-2xs space-y-1">
            <span className="text-[11px] text-amber-900 font-bold block">যাচাইয়ের অপেক্ষায়</span>
            <span className="text-lg font-bold text-amber-950 tabular-nums">৪২</span>
            <span className="text-[10px] text-amber-800 block font-medium">অ্যাকশন প্রয়োজন</span>
          </div>
          <div className="p-3.5 bg-emerald-50/80 rounded-2xl border border-emerald-200 shadow-2xs space-y-1">
            <span className="text-[11px] text-emerald-900 font-bold block">অনুমোদিত</span>
            <span className="text-lg font-bold text-emerald-950 tabular-nums">১,১৮৮</span>
            <span className="text-[10px] text-emerald-800 block font-medium">সক্রিয় সদস্য</span>
          </div>
          <div className="p-3.5 bg-rose-50/80 rounded-2xl border border-rose-200 shadow-2xs space-y-1">
            <span className="text-[11px] text-rose-900 font-bold block">স্থগিত</span>
            <span className="text-lg font-bold text-rose-950 tabular-nums">১৮</span>
            <span className="text-[10px] text-rose-800 block font-medium">বিধি লঙ্ঘন তদন্ত</span>
          </div>
        </div>
      </div>

      {/* Category B: Marketplace Statistics (মার্কেটপ্লেস পরিসংখ্যান - ৭টি কার্ড) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-emerald-800" />
            <h3 className="text-sm font-bold text-stone-900">মার্কেটপ্লেস ও ট্রেড পরিসংখ্যান (Marketplace Statistics)</h3>
          </div>
          <button
            onClick={() => onNavigateTab('products')}
            className="text-xs font-bold text-emerald-800 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>পণ্য অনুমোদন প্যানেল</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-xs">
          <div className="p-3.5 bg-white rounded-2xl border border-stone-200 shadow-2xs space-y-1">
            <span className="text-[11px] text-stone-500 block">মোট তালিকাভুক্ত পণ্য</span>
            <span className="text-lg font-bold text-stone-900 tabular-nums">৩৪৬</span>
            <span className="text-[10px] text-stone-400 block">৭টি ক্যাটাগরি</span>
          </div>
          <div className="p-3.5 bg-white rounded-2xl border border-stone-200 shadow-2xs space-y-1">
            <span className="text-[11px] text-stone-500 block">সক্রিয় লাইভ পণ্য</span>
            <span className="text-lg font-bold text-emerald-800 tabular-nums">৩১২</span>
            <span className="text-[10px] text-stone-400 block">বাজারে ক্রয়ের জন্য উন্মুক্ত</span>
          </div>
          <div className="p-3.5 bg-amber-50/80 rounded-2xl border border-amber-200 shadow-2xs space-y-1">
            <span className="text-[11px] text-amber-900 font-bold block">অনুমোদনের অপেক্ষায়</span>
            <span className="text-lg font-bold text-amber-950 tabular-nums">১৯</span>
            <span className="text-[10px] text-amber-800 block font-medium">মান যাচাই বাকি</span>
          </div>
          <div className="p-3.5 bg-white rounded-2xl border border-stone-200 shadow-2xs space-y-1">
            <span className="text-[11px] text-stone-500 block">মোট পাইকারি অর্ডার</span>
            <span className="text-lg font-bold text-stone-900 tabular-nums">৫৮০</span>
            <span className="text-[10px] text-stone-400 block">বাল্ক চুক্তি</span>
          </div>
          <div className="p-3.5 bg-white rounded-2xl border border-stone-200 shadow-2xs space-y-1">
            <span className="text-[11px] text-stone-500 block">চলমান অর্ডার</span>
            <span className="text-lg font-bold text-blue-800 tabular-nums">৪৭</span>
            <span className="text-[10px] text-stone-400 block">প্যাকিং ও ট্রানজিট</span>
          </div>
          <div className="p-3.5 bg-white rounded-2xl border border-stone-200 shadow-2xs space-y-1">
            <span className="text-[11px] text-stone-500 block">সম্পন্ন অর্ডার</span>
            <span className="text-lg font-bold text-emerald-900 tabular-nums">৫১২</span>
            <span className="text-[10px] text-emerald-700 block font-semibold">৮৮.২% ডেলিভারি রেট</span>
          </div>
          <div className="p-3.5 bg-white rounded-2xl border border-stone-200 shadow-2xs space-y-1">
            <span className="text-[11px] text-stone-500 block">সক্রিয় RFQ আহ্বান</span>
            <span className="text-lg font-bold text-purple-900 tabular-nums">২৮</span>
            <span className="text-[10px] text-stone-400 block">দর প্রস্তাব জমা চলমান</span>
          </div>
        </div>
      </div>

      {/* Category C: Transaction & Escrow Statistics (লেনদেন ও এসক্রো পরিসংখ্যান - ৬টি কার্ড) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-emerald-800" />
            <h3 className="text-sm font-bold text-stone-900">লেনদেন ও এসক্রো ট্রাস্ট পর্যবেক্ষণ (Transaction & Escrow Statistics)</h3>
          </div>
          <button
            onClick={() => onNavigateTab('finance')}
            className="text-xs font-bold text-emerald-800 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>পূর্ণাঙ্গ এসক্রো রেজিস্টার</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          <div className="p-3.5 bg-white rounded-2xl border border-stone-200 shadow-2xs space-y-1">
            <span className="text-[11px] text-stone-500 block">মোট লেনদেনের পরিমাণ</span>
            <span className="text-lg font-bold text-stone-900 tabular-nums">৳৪.৮৬ কোটি</span>
            <span className="text-[10px] text-emerald-700 block font-semibold">সোনালী ব্যাংক ট্রাস্ট</span>
          </div>
          <div className="p-3.5 bg-white rounded-2xl border border-stone-200 shadow-2xs space-y-1">
            <span className="text-[11px] text-stone-500 block">সম্পন্ন লেনদেন (ছাড়কৃত)</span>
            <span className="text-lg font-bold text-emerald-900 tabular-nums">৳৪.২৩ কোটি</span>
            <span className="text-[10px] text-stone-400 block">কৃষক একাউন্টে স্থানান্তরিত</span>
          </div>
          <div className="p-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-200 shadow-2xs space-y-1">
            <span className="text-[11px] text-emerald-900 font-bold block">Escrow-তে সংরক্ষিত অর্থ</span>
            <span className="text-lg font-bold text-emerald-950 tabular-nums">৳৪৮.৫ লাখ</span>
            <span className="text-[10px] text-emerald-800 block font-medium">নিরাপদে লক করা</span>
          </div>
          <div className="p-3.5 bg-white rounded-2xl border border-stone-200 shadow-2xs space-y-1">
            <span className="text-[11px] text-stone-500 block">অর্থ ছাড়ের অপেক্ষায়</span>
            <span className="text-lg font-bold text-amber-900 tabular-nums">৳১৫.০ লাখ</span>
            <span className="text-[10px] text-stone-400 block">GRN যাচাই সাপেক্ষে</span>
          </div>
          <div className="p-3.5 bg-white rounded-2xl border border-stone-200 shadow-2xs space-y-1">
            <span className="text-[11px] text-stone-500 block">ফেরতকৃত অর্থ</span>
            <span className="text-lg font-bold text-stone-900 tabular-nums">৳৬.২০ লাখ</span>
            <span className="text-[10px] text-stone-400 block">১.২% রিফান্ড রেট</span>
          </div>
          <div className="p-3.5 bg-rose-50/80 rounded-2xl border border-rose-200 shadow-2xs space-y-1">
            <span className="text-[11px] text-rose-900 font-bold block">বিরোধপূর্ণ চালান</span>
            <span className="text-lg font-bold text-rose-950 tabular-nums">৩টি</span>
            <span className="text-[10px] text-rose-800 block font-medium">অর্থ ছাড় সাময়িক স্থগিত</span>
          </div>
        </div>
      </div>

      {/* Category D: Logistics Statistics (লজিস্টিকস ও সরবরাহ পরিসংখ্যান - ৫টি কার্ড) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-emerald-800" />
            <h3 className="text-sm font-bold text-stone-900">লজিস্টিকস ও সরবরাহ পরিসংখ্যান (Logistics Statistics)</h3>
          </div>
          <button
            onClick={() => onNavigateTab('logistics')}
            className="text-xs font-bold text-emerald-800 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>লজিস্টিকস তদারকি মডিউল</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
          <div className="p-3.5 bg-white rounded-2xl border border-stone-200 shadow-2xs space-y-1">
            <span className="text-[11px] text-stone-500 block">মোট সরবরাহ (চালান)</span>
            <span className="text-lg font-bold text-stone-900 tabular-nums">৫২০টি</span>
            <span className="text-[10px] text-stone-400 block">পাহাড় থেকে সমতলে পরিবহন</span>
          </div>
          <div className="p-3.5 bg-white rounded-2xl border border-stone-200 shadow-2xs space-y-1">
            <span className="text-[11px] text-stone-500 block">সম্পন্ন ডেলিভারি</span>
            <span className="text-lg font-bold text-emerald-900 tabular-nums">৪৮৮টি</span>
            <span className="text-[10px] text-emerald-700 block font-semibold">৯৩.৮% সময়মতো গ্রহণ</span>
          </div>
          <div className="p-3.5 bg-white rounded-2xl border border-stone-200 shadow-2xs space-y-1">
            <span className="text-[11px] text-stone-500 block">বিলম্বিত ডেলিভারি</span>
            <span className="text-lg font-bold text-amber-900 tabular-nums">৮টি</span>
            <span className="text-[10px] text-stone-400 block">আবহাওয়া ও পাহাড়ি পথ</span>
          </div>
          <div className="p-3.5 bg-white rounded-2xl border border-stone-200 shadow-2xs space-y-1">
            <span className="text-[11px] text-stone-500 block">চলমান সরবরাহ (পথে রয়েছে)</span>
            <span className="text-lg font-bold text-blue-900 tabular-nums">২৪টি</span>
            <span className="text-[10px] text-stone-400 block">ঢাকা-চট্টগ্রাম হাইওয়েতে</span>
          </div>
          <div className="p-3.5 bg-rose-50/80 rounded-2xl border border-rose-200 shadow-2xs space-y-1">
            <span className="text-[11px] text-rose-900 font-bold block">সরবরাহসংক্রান্ত অভিযোগ</span>
            <span className="text-lg font-bold text-rose-950 tabular-nums">২টি</span>
            <span className="text-[10px] text-rose-800 block font-medium">ড্যামেজ দাবি তদন্তাধীন</span>
          </div>
        </div>
      </div>

      {/* 4. District-wise Performance & Analytics (§2) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* District Overview Cards */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-800" />
                <span>জেলা অনুযায়ী ব্যবহারকারী ও ব্যবসায়িক কার্যক্রম</span>
              </h3>
              <p className="text-xs text-stone-500">পার্বত্য ৩ জেলার আঞ্চলিক উৎপাদন কেন্দ্র ও বাণিজ্যিক প্রবাহ</p>
            </div>
            <span className="text-xs text-stone-400 font-medium">হালনাগাদ: ২০২৬</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {districtAnalytics.map((dist, idx) => (
              <div 
                key={idx} 
                className={`bg-white rounded-2xl p-4.5 border border-stone-200 border-l-4 ${dist.color} shadow-xs space-y-3`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-stone-900 text-sm">{dist.name} পার্বত্য জেলা</h4>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    {dist.growthRate} প্রবৃদ্ধি
                  </span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-stone-600">
                    <span>নিবন্ধিত ব্যবহারকারী:</span>
                    <strong className="text-stone-900">{dist.registeredUsers} জন</strong>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>সক্রিয় কৃষক/উৎপাদক:</span>
                    <strong className="text-stone-900">{dist.activeProducers} জন</strong>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>মাসিক বাণিজ্য পরিমাণ:</span>
                    <strong className="text-emerald-950 font-bold">{dist.monthlyTradeVolume}</strong>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-100 text-[11px] text-stone-500">
                  <span className="font-semibold text-stone-700 block">প্রধান পণ্য:</span>
                  <span className="truncate block">{dist.topCommodity}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Commodity Volume Bar Breakdown */}
          <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs space-y-3.5">
            <h4 className="text-xs font-bold text-stone-900 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-emerald-800" />
              <span>পণ্যভিত্তিক ভলিউম ও বাণিজ্য শেয়ার (Commodity Breakdown)</span>
            </h4>

            <div className="space-y-2.5 text-xs">
              <div>
                <div className="flex justify-between text-stone-700 mb-1">
                  <span>পাহাড়ি ফলমূল (আনারস, আম, ড্রাগন, পেঁপে, কলা)</span>
                  <span className="font-bold">৪২% (৳২.০৪ কোটি)</span>
                </div>
                <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-700 rounded-full" style={{ width: '42%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-stone-700 mb-1">
                  <span>মসলা ও অর্থকরী ফসল (হলুদ, আদা, কাজুবাদাম, কফি, বনমধু)</span>
                  <span className="font-bold">৩৩% (৳১.৬০ কোটি)</span>
                </div>
                <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-600 rounded-full" style={{ width: '33%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-stone-700 mb-1">
                  <span>ঐতিহ্যবাহী তাঁত ও থামি পোশাক</span>
                  <span className="font-bold">১৫% (৳৭২.৯ লাখ)</span>
                </div>
                <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-600 rounded-full" style={{ width: '15%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-stone-700 mb-1">
                  <span>বাঁশ-বেত ও হস্তশিল্প পণ্য</span>
                  <span className="font-bold">১০% (৳৪৮.৬ লাখ)</span>
                </div>
                <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                  <div className="h-full bg-stone-600 rounded-full" style={{ width: '10%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Recent Audit Activities & Alerts */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-800" />
              <span>সাম্প্রতিক প্রশাসনিক কার্যক্রম (Audit Log)</span>
            </h3>
            <span className="text-[11px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded">লাইভ</span>
          </div>

          <div className="bg-white rounded-2xl p-4.5 border border-stone-200 shadow-xs space-y-3.5">
            {MINISTRY_RECENT_AUDIT_ACTIVITIES.map((act) => (
              <div key={act.id} className="pb-3 border-b border-stone-100 last:border-b-0 last:pb-0 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-900">{act.action}</span>
                  <span className="text-[10px] text-stone-400">{act.time}</span>
                </div>
                <div className="text-emerald-900 font-medium text-[11px]">
                  {act.subject} · <span className="text-stone-500">{act.district}</span>
                </div>
                <p className="text-stone-500 text-[11px] leading-snug">
                  {act.details}
                </p>
                <div className="text-[10px] text-stone-400 italic">
                  কর্মকর্তা: {act.officer}
                </div>
              </div>
            ))}
          </div>

          {/* Urgent Review Callout Box */}
          <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200/80 text-xs space-y-2.5">
            <div className="flex items-center gap-2 text-amber-950 font-bold">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>জরুরি প্রশাসনিক অগ্রাধিকার</span>
            </div>
            <p className="text-stone-700 text-[11px] leading-relaxed">
              নতুন ৪২টি ব্যবহারকারী আবেদন এবং ১৯টি পাইকারি পণ্য ক্যাটালগ অনুমোদনের অপেক্ষায় রয়েছে। 
              সঠিক সময়ে যাচাই সম্পন্ন করতে অফিসারদের টাস্ক পর্যালোচনা করুন।
            </p>
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => onNavigateTab('verification')}
                className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold text-[11px] cursor-pointer"
              >
                ব্যবহারকারী যাচাই করুন
              </button>
              <button
                onClick={() => onNavigateTab('products')}
                className="px-3 py-1 bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 rounded-lg font-bold text-[11px] cursor-pointer"
              >
                পণ্য অনুমোদন করুন
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
