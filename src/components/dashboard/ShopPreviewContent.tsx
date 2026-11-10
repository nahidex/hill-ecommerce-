import React, { useState } from 'react';
import { CheckCircle, MapPin, Star, ShoppingBag, Share2, ShieldCheck } from 'lucide-react';
import { UserSession } from '../../types';
import { HANDLOOM_IMAGE, SPICES_IMAGE } from '../../data/products';

interface ShopPreviewContentProps {
  user: UserSession;
}

export const ShopPreviewContent: React.FC<ShopPreviewContentProps> = ({ user }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const shopProducts = [
    {
      id: 'sp-1',
      title: 'ঐতিহ্যবাহী বেইন কোমর তাঁতের শাল',
      category: 'ঐতিহ্যবাহী পোশাক',
      price: 1850,
      minOrder: '১ পিস (খুচরা) / ১০ পিস (পাইকারি)',
      rating: 5.0,
      image: HANDLOOM_IMAGE,
      badge: 'বেস্টসেলার'
    },
    {
      id: 'sp-2',
      title: 'চাকমা ও মারমা নকশী পিনন-হাদি সেট',
      category: 'ঐতিহ্যবাহী পোশাক',
      price: 2400,
      minOrder: '১ সেট',
      rating: 4.9,
      image: HANDLOOM_IMAGE,
      badge: 'আসল তাঁত'
    },
    {
      id: 'sp-3',
      title: 'প্রাকৃতিক পাহাড়ি পাকা বেতের ট্রাভেল বাস্কেট',
      category: 'বাঁশ ও বেতের পণ্য',
      price: 750,
      minOrder: '৫ পিস',
      rating: 4.8,
      image: HANDLOOM_IMAGE,
      badge: 'ইকো-ফ্রেন্ডলি'
    },
    {
      id: 'sp-4',
      title: 'খাগড়াছড়ি অর্গানিক হলুদ গুঁড়া (কাঁচের জার)',
      category: 'মসলা ও খাদ্যপণ্য',
      price: 260,
      minOrder: '২ জার',
      rating: 4.95,
      image: SPICES_IMAGE,
      badge: '১০০% খাঁটি'
    }
  ];

  return (
    <div className="overflow-y-auto flex-1 bg-stone-50">

      {/* Shop Banner */}
      <div className="relative h-44 sm:h-60 bg-gradient-to-r from-emerald-950 via-emerald-900 to-stone-900 overflow-hidden">
        <img
          src={HANDLOOM_IMAGE}
          alt="Shop Banner"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-35 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/30 to-transparent"></div>

        <div className="absolute top-4 right-4 flex items-center gap-2">
          <button className="p-2 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs flex items-center gap-1.5 transition-colors">
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">দোকানের লিংক শেয়ার</span>
          </button>
        </div>
      </div>

      {/* Shop Header Identity */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 pb-6">
        <div className="relative pt-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-stone-200">

          <div className="flex items-start gap-4">
            <div className="w-24 h-24 sm:w-28 sm:h-28 -mt-6 sm:-mt-8 rounded-2xl bg-white p-1.5 shadow-xl border border-stone-200 shrink-0">
              <div className="w-full h-full rounded-xl bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center text-white font-bold text-3xl font-brand shadow-inner">
                {user.name.slice(0, 2)}
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
                  {user.shopName || user.businessName || `${user.name}-এর অনলাইন শপ`}
                </h2>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  <CheckCircle className="w-3 h-3 text-emerald-700" />
                  মন্ত্রণালয় ভেরিফাইড
                </span>
              </div>

              <p className="text-xs text-stone-600 max-w-xl">
                {user.bio || 'পার্বত্য অঞ্চলের খাঁটি কৃষিপণ্য ও লোকশিল্প সরাসরি উৎপাদক থেকে সংগ্রহ করুন।'}
              </p>

              <div className="flex items-center gap-3 text-xs text-stone-500 pt-1">
                <span className="flex items-center gap-1 text-stone-600">
                  <MapPin className="w-3.5 h-3.5 text-amber-700" />
                  {user.upazila}, {user.district}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1 text-amber-800 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  ৪.৯ (১৪২ রিভিউ)
                </span>
                <span>·</span>
                <span>মেম্বার আইডি: {user.memberId}</span>
              </div>
            </div>
          </div>

          {/* Shop Trust badge & inquiry */}
          <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-bold text-emerald-900">শতভাগ নিজস্ব কারিগর দ্বারা প্রস্তুত</div>
              <div className="text-[11px] text-stone-500">নিরাপদ এসক্রো ডেলিভারি সুবিধা</div>
            </div>
            <button className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer">
              <ShoppingBag className="w-3.5 h-3.5 text-amber-300" />
              <span>সরাসরি মেসেজ দিন</span>
            </button>
          </div>

        </div>

        {/* Filter Pills */}
        <div className="py-4 flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              selectedFilter === 'all'
                ? 'bg-emerald-900 text-white'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            সব পণ্য ({shopProducts.length})
          </button>
          <button
            onClick={() => setSelectedFilter('apparel')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              selectedFilter === 'apparel'
                ? 'bg-emerald-900 text-white'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            ঐতিহ্যবাহী পোশাক
          </button>
          <button
            onClick={() => setSelectedFilter('crafts')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              selectedFilter === 'crafts'
                ? 'bg-emerald-900 text-white'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            বাঁশ ও বেতের পণ্য
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-2">
          {shopProducts.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-xl border border-stone-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between overflow-hidden"
            >
              <div>
                <div className="aspect-[4/3] bg-stone-100 relative overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 bg-emerald-950/80 text-white text-[10px] font-semibold px-2 py-0.5 rounded backdrop-blur-xs">
                    {p.badge}
                  </span>
                </div>

                <div className="p-4 space-y-1.5">
                  <span className="text-[10px] text-emerald-800 font-medium">
                    {p.category}
                  </span>
                  <h4 className="text-sm font-bold text-stone-900 line-clamp-2">
                    {p.title}
                  </h4>
                  <p className="text-[11px] text-stone-500">
                    ন্যূনতম অর্ডার: {p.minOrder}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0">
                <div className="flex items-baseline justify-between mb-3">
                  <div>
                    <span className="text-xs text-stone-500">মূল্য:</span>
                    <span className="text-base font-bold text-emerald-900 ml-1 tabular-nums">
                      ৳{p.price.toLocaleString()}
                    </span>
                  </div>
                  <span className="text-[11px] text-amber-700 font-semibold">
                    ★ {p.rating}
                  </span>
                </div>

                <button className="w-full py-2 bg-stone-100 hover:bg-emerald-800 hover:text-white text-stone-800 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer">
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>অর্ডার করুন (এসক্রো)</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Escrow assurance in shop */}
        <div className="mt-8 p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-3 text-xs text-emerald-950">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
            <span>
              এই অনলাইন শপের প্রতিটি লেনদেন পার্বত্য চট্টগ্রাম বিষয়ক মন্ত্রণালয়ের এসক্রো মডেল দ্বারা শতভাগ সংরক্ষিত।
            </span>
          </div>
          <span className="font-bold text-stone-700 shrink-0">নিরাপদ সরকারি প্ল্যাটফর্ম</span>
        </div>

      </div>

    </div>
  );
};
