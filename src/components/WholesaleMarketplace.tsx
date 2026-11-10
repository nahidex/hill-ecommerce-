import React, { useState, useMemo } from 'react';
import { Search, MapPin, Package, ArrowRight, Filter, Eye, Layers } from 'lucide-react';
import { ProductItem } from '../types';
import { SAMPLE_PRODUCTS } from '../data/products';

interface WholesaleMarketplaceProps {
  onSelectProduct: (product: ProductItem) => void;
  onGoToSignUp: () => void;
  onExploreMarketplace?: () => void;
}

export const WholesaleMarketplace: React.FC<WholesaleMarketplaceProps> = ({
  onSelectProduct,
  onGoToSignUp,
  onExploreMarketplace,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');

  const filterTabs = [
    { id: 'all', label: 'সব পণ্য' },
    { id: 'fruits', label: 'ফলমূল' },
    { id: 'spices', label: 'মসলা ও কৃষি' },
    { id: 'bamboo', label: 'বাঁশ ও বেত' },
    { id: 'apparel', label: 'হস্তশিল্প ও পোশাক' },
  ];

  const filteredProducts = useMemo(() => {
    return SAMPLE_PRODUCTS.filter((item) => {
      // Search filter
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.producerName.toLowerCase().includes(searchQuery.toLowerCase());

      // Category filter
      let matchesCat = true;
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'spices') {
          matchesCat = item.categorySlug === 'spices' || item.categorySlug === 'agriculture';
        } else if (selectedCategory === 'apparel') {
          matchesCat = item.categorySlug === 'apparel' || item.categorySlug === 'handicraft';
        } else {
          matchesCat = item.categorySlug === selectedCategory;
        }
      }

      // District filter
      const matchesDistrict =
        selectedDistrict === 'all' || item.district === selectedDistrict;

      return matchesSearch && matchesCat && matchesDistrict;
    });
  }, [searchQuery, selectedCategory, selectedDistrict]);

  return (
    <section id="wholesale-market" className="py-16 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-semibold text-emerald-800 tracking-wider">
              B2B পাইকারি মার্কেটপ্লেস
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 leading-tight">
              এক প্ল্যাটফর্মে পাইকারি পণ্য ক্রয়-বিক্রয়
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              উৎপাদক ও সরবরাহকারীরা তাদের উৎপাদিত পণ্য বৃহৎ পরিমাণে বিক্রির জন্য তালিকাভুক্ত করতে পারবেন। অন্যদিকে পাইকারি ক্রেতারা পণ্য অনুসন্ধান, মূল্য যাচাই এবং বাল্ক অর্ডার করতে পারবেন।
            </p>
          </div>

          {/* Quick Stats or CTA */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {onExploreMarketplace && (
              <button
                onClick={onExploreMarketplace}
                className="px-4 py-2 text-xs sm:text-sm font-semibold text-emerald-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer font-bold"
              >
                <span>সম্পূর্ণ পাইকারি মার্কেটপ্লেস খুলুন</span>
                <ArrowRight className="w-4 h-4 text-emerald-950" />
              </button>
            )}
            <button
              onClick={onGoToSignUp}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>পণ্য বিক্রি করতে চান? যোগ দিন</span>
              <ArrowRight className="w-4 h-4 text-amber-300" />
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === tab.id
                    ? 'bg-emerald-900 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* District selector and search input */}
          <div className="flex items-center gap-2.5">
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="text-xs font-medium text-stone-700 bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-2 focus:outline-none focus:ring-1 focus:ring-emerald-700"
            >
              <option value="all">সব পার্বত্য জেলা</option>
              <option value="বান্দরবান">বান্দরবান</option>
              <option value="রাঙামাটি">রাঙামাটি</option>
              <option value="খাগড়াছড়ি">খাগড়াছড়ি</option>
            </select>

            <div className="relative min-w-[200px] sm:min-w-[240px]">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="পণ্য বা এলাকা খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs bg-stone-50 border border-stone-200 rounded-lg pl-8 pr-3 py-2 text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-emerald-700"
              />
            </div>
          </div>

        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-2xl border border-stone-200 p-8">
            <p className="text-base text-stone-600">কোনো পণ্য খুঁজে পাওয়া যায়নি।</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedDistrict('all');
              }}
              className="mt-3 text-xs font-semibold text-emerald-800 hover:underline"
            >
              সব ফিল্টার রিসেট করুন
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group rounded-2xl bg-white border border-stone-200 hover:border-emerald-300 transition-all duration-300 hover:shadow-lg flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Image container */}
                  <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                    />
                    
                    {/* Badge */}
                    {product.badge && (
                      <span className="absolute top-3 left-3 bg-emerald-950/80 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-md backdrop-blur-xs">
                        {product.badge}
                      </span>
                    )}

                    {/* District unboxed chip */}
                    <div className="absolute bottom-2 right-2 bg-white/90 text-stone-800 text-[10px] font-semibold px-2 py-0.5 rounded backdrop-blur-xs flex items-center gap-1 shadow-2xs">
                      <MapPin className="w-3 h-3 text-amber-700" />
                      <span>{product.district}</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 space-y-3">
                    
                    {/* Category kicker */}
                    <div className="text-[11px] font-medium text-emerald-800">
                      {product.category} · {product.upazila}
                    </div>

                    {/* Product Name */}
                    <h3 className="text-base font-bold text-stone-900 group-hover:text-emerald-950 line-clamp-2 min-h-[44px] leading-snug">
                      {product.name}
                    </h3>

                    {/* Origin & Producer */}
                    <div className="text-xs text-stone-500 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span className="truncate">{product.origin}</span>
                    </div>

                    {/* Available & Min Order stats */}
                    <div className="pt-2 border-t border-stone-100 grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-stone-400 block text-[11px]">উপলব্ধ পরিমাণ</span>
                        <span className="font-semibold text-stone-800 tabular-nums">
                          {product.availableQuantity.toLocaleString()} {product.unit}
                        </span>
                      </div>
                      <div>
                        <span className="text-stone-400 block text-[11px]">ন্যূনতম অর্ডার</span>
                        <span className="font-semibold text-stone-800 tabular-nums">
                          {product.minOrderQuantity.toLocaleString()} {product.unit}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer price & action button */}
                <div className="p-5 pt-0">
                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80 flex items-center justify-between mb-3">
                    <div>
                      <span className="text-[11px] text-stone-500 block">প্রতি এককের মূল্য</span>
                      <span className="text-lg font-bold text-emerald-900 tabular-nums">
                        ৳{product.pricePerUnit}
                      </span>
                      <span className="text-xs text-stone-500 ml-1">/ {product.unit}</span>
                    </div>
                    <span className="text-[11px] font-semibold text-amber-800">
                      পাইকারি দর
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectProduct(product)}
                    className="w-full py-2.5 px-3 text-xs font-semibold text-emerald-950 bg-stone-100 hover:bg-emerald-800 hover:text-white rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>বিস্তারিত দেখুন</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
