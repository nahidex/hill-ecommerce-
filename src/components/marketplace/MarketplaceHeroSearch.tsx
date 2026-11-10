import React from 'react';
import { Search, MapPin, Layers, Scale, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { MARKETPLACE_CATEGORIES } from '../../data/products';

interface MarketplaceHeroSearchProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  selectedDistrict: string;
  onDistrictChange: (dist: string) => void;
  selectedQuantityMin: number;
  onQuantityMinChange: (qty: number) => void;
  onPerformSearch: () => void;
  onQuickSearchClick: (keyword: string) => void;
}

export const MarketplaceHeroSearch: React.FC<MarketplaceHeroSearchProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedDistrict,
  onDistrictChange,
  selectedQuantityMin,
  onQuantityMinChange,
  onPerformSearch,
  onQuickSearchClick
}) => {
  const quickSearchKeywords = ['আম', 'আম্রপালি আম', 'আনারস', 'হলুদ', 'আদা', 'কলা', 'বাঁশ ও বেতের পণ্য'];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onPerformSearch();
    }
  };

  return (
    <div className="relative bg-gradient-to-b from-emerald-950 via-emerald-900 to-stone-900 text-white pt-10 pb-14 px-4 sm:px-6 lg:px-8 border-b border-emerald-900 overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 right-10 w-96 h-96 bg-amber-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-emerald-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-5xl mx-auto text-center space-y-6">
        
        {/* Kicker badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-800/80 border border-emerald-700/80 text-xs font-semibold text-amber-300 backdrop-blur-xs">
          <ShieldCheck className="w-4 h-4" />
          <span>পার্বত্য চট্টগ্রাম বিষয়ক মন্ত্রণালয় সমন্বিত B2B সাপ্লাই চেইন</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold text-white leading-tight tracking-tight">
          পাইকারি পণ্য খুঁজুন, <br className="hidden sm:inline" />
          <span className="text-amber-400">সরাসরি উৎপাদক ও সরবরাহকারীর কাছ থেকে</span>
        </h1>

        <p className="text-xs sm:text-sm text-stone-300 max-w-2xl mx-auto leading-relaxed">
          রাঙামাটি, বান্দরবান ও খাগড়াছড়ির কৃষক সমবায় থেকে সরাসরি বাল্ক লটে কৃষিপণ্য ও পাহাড়ি হস্তশিল্প সংগ্রহ করুন। কোনো মধ্যস্বত্বভোগী নেই, শতভাগ ডিজিটাল এসক্রো নিশ্চয়তা।
        </p>

        {/* Big Search & Filter Bar */}
        <div className="mt-8 bg-white p-2.5 sm:p-3 rounded-2xl shadow-2xl border border-stone-200 text-stone-900 max-w-4xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2 sm:gap-2.5 items-center">
            
            {/* Search Input (Col 5) */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="পণ্যের নাম, ক্যাটাগরি অথবা উৎপাদন এলাকা লিখুন"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full text-xs sm:text-sm pl-10 pr-3 py-2.5 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-1 focus:ring-emerald-700 focus:bg-white text-stone-800"
              />
            </div>

            {/* Category Filter (Col 3) */}
            <div className="md:col-span-3">
              <select
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="w-full text-xs py-2.5 px-3 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-1 focus:ring-emerald-700 text-stone-700 font-medium"
              >
                <option value="all">সব পণ্য ক্যাটাগরি</option>
                {MARKETPLACE_CATEGORIES.map(c => (
                  <option key={c.id} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* District Filter (Col 2) */}
            <div className="md:col-span-2">
              <select
                value={selectedDistrict}
                onChange={(e) => onDistrictChange(e.target.value)}
                className="w-full text-xs py-2.5 px-2.5 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-1 focus:ring-emerald-700 text-stone-700 font-medium"
              >
                <option value="all">সব পার্বত্য জেলা</option>
                <option value="রাঙামাটি">রাঙামাটি</option>
                <option value="বান্দরবান">বান্দরবান</option>
                <option value="খাগড়াছড়ি">খাগড়াছড়ি</option>
              </select>
            </div>

            {/* Search Action Button (Col 2) */}
            <div className="md:col-span-2">
              <button
                onClick={onPerformSearch}
                className="w-full py-2.5 px-4 bg-emerald-800 hover:bg-emerald-900 active:scale-98 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Search className="w-4 h-4 text-amber-300" />
                <span>পণ্য খুঁজুন</span>
              </button>
            </div>

          </div>

          {/* Sub-bar: Quantity Filter & Quick Example Searches */}
          <div className="mt-2.5 pt-2.5 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
            
            {/* Quick Keyword Pills */}
            <div className="flex items-center gap-1.5 flex-wrap justify-center sm:justify-start">
              <span className="text-[11px] font-semibold text-stone-600">জনপ্রিয় সার্চ:</span>
              {quickSearchKeywords.map((kw, i) => (
                <button
                  key={i}
                  onClick={() => onQuickSearchClick(kw)}
                  className="px-2 py-0.5 rounded-md bg-stone-100 hover:bg-emerald-50 hover:text-emerald-900 text-stone-700 text-[11px] font-medium transition-colors cursor-pointer"
                >
                  {kw}
                </button>
              ))}
            </div>

            {/* Bulk Quantity Bracket Quick Selector */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[11px] font-semibold text-stone-600">বাল্ক পরিমাণ:</span>
              <select
                value={selectedQuantityMin}
                onChange={(e) => onQuantityMinChange(Number(e.target.value))}
                className="text-[11px] font-medium bg-stone-50 border border-stone-200 rounded px-2 py-1 text-stone-700 focus:outline-none"
              >
                <option value={0}>যেকোনো পরিমাণ</option>
                <option value={100}>১০০+ ইউনিট</option>
                <option value={500}>৫০০+ ইউনিট (মাঝারি বাল্ক)</option>
                <option value={1000}>১,০০০+ ইউনিট (বড় লট)</option>
                <option value={5000}>৫,০০০+ ইউনিট (হোলসেল ট্রাকলোড)</option>
              </select>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
