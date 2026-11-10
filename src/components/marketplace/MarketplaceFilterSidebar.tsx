import React from 'react';
import { Filter, RotateCcw, ShieldCheck, Check, MapPin, Tag, Layers, Truck } from 'lucide-react';

interface MarketplaceFilterSidebarProps {
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  selectedDistrict: string;
  onDistrictChange: (dist: string) => void;
  minPrice: number;
  maxPrice: number;
  onPriceChange: (min: number, max: number) => void;
  minQuantity: number;
  onQuantityChange: (qty: number) => void;
  sellerType: string;
  onSellerTypeChange: (type: string) => void;
  productType: 'all' | 'perishable' | 'non-perishable';
  onProductTypeChange: (type: 'all' | 'perishable' | 'non-perishable') => void;
  verifiedOnly: boolean;
  onVerifiedOnlyChange: (val: boolean) => void;
  onResetFilters: () => void;
}

export const MarketplaceFilterSidebar: React.FC<MarketplaceFilterSidebarProps> = ({
  selectedCategory,
  onCategoryChange,
  selectedDistrict,
  onDistrictChange,
  minPrice,
  maxPrice,
  onPriceChange,
  minQuantity,
  onQuantityChange,
  sellerType,
  onSellerTypeChange,
  productType,
  onProductTypeChange,
  verifiedOnly,
  onVerifiedOnlyChange,
  onResetFilters
}) => {
  const categoriesList = [
    { id: 'all', name: 'সব ক্যাটাগরি' },
    { id: 'fruits', name: 'তাজা ফলমূল' },
    { id: 'agriculture', name: 'কৃষিপণ্য' },
    { id: 'spices', name: 'মসলা ও খাদ্যপণ্য' },
    { id: 'bamboo', name: 'বাঁশ ও বেতের পণ্য' },
    { id: 'apparel', name: 'ঐতিহ্যবাহী পোশাক' },
    { id: 'processed', name: 'প্রক্রিয়াজাত কৃষিপণ্য' }
  ];

  const districtsList = [
    { id: 'all', name: 'সব জেলা' },
    { id: 'রাঙামাটি', name: 'রাঙামাটি' },
    { id: 'বান্দরবান', name: 'বান্দরবান' },
    { id: 'খাগড়াছড়ি', name: 'খাগড়াছড়ি' }
  ];

  const sellerTypesList = [
    { id: 'all', name: 'সকল বিক্রেতা' },
    { id: 'উৎপাদক', name: 'উৎপাদক' },
    { id: 'কৃষক', name: 'কৃষক' },
    { id: 'সরবরাহকারী', name: 'সরবরাহকারী' },
    { id: 'সমবায় সমিতি', name: 'সমবায় সমিতি' },
    { id: 'ব্যবসায়ী', name: 'ব্যবসায়ী' }
  ];

  return (
    <aside className="w-full lg:w-68 bg-white rounded-2xl border border-stone-200 shadow-xs p-5 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-stone-200">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-emerald-800" />
          <h3 className="text-sm font-bold text-stone-900">অ্যাডভান্সড ফিল্টার</h3>
        </div>

        <button
          onClick={onResetFilters}
          className="text-[11px] font-semibold text-rose-700 hover:text-rose-900 flex items-center gap-1 cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          <span>রিসেট</span>
        </button>
      </div>

      {/* 1. Verified Seller Toggle */}
      <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80">
        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={verifiedOnly}
            onChange={(e) => onVerifiedOnlyChange(e.target.checked)}
            className="mt-0.5 rounded text-emerald-800 focus:ring-emerald-700"
          />
          <div>
            <span className="text-xs font-bold text-emerald-950 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              যাচাইকৃত বিক্রেতা
            </span>
            <span className="text-[10px] text-stone-600 block mt-0.5">
              মন্ত্রণালয় অনুমোদিত উৎপাদক ও সমবায়
            </span>
          </div>
        </label>
      </div>

      {/* 2. Product Type: Perishable vs Non-Perishable */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider">
          পণ্যের ধরন (Product Type)
        </label>
        <div className="grid grid-cols-3 gap-1 p-1 bg-stone-100 rounded-lg text-[11px]">
          <button
            onClick={() => onProductTypeChange('all')}
            className={`py-1 rounded font-semibold transition-colors cursor-pointer ${
              productType === 'all' ? 'bg-white text-stone-900 shadow-2xs font-bold' : 'text-stone-600'
            }`}
          >
            সব
          </button>
          <button
            onClick={() => onProductTypeChange('perishable')}
            className={`py-1 rounded font-semibold transition-colors cursor-pointer ${
              productType === 'perishable' ? 'bg-white text-emerald-900 shadow-2xs font-bold' : 'text-stone-600'
            }`}
          >
            পচনশীল
          </button>
          <button
            onClick={() => onProductTypeChange('non-perishable')}
            className={`py-1 rounded font-semibold transition-colors cursor-pointer ${
              productType === 'non-perishable' ? 'bg-white text-stone-900 shadow-2xs font-bold' : 'text-stone-600'
            }`}
          >
            অপচনশীল
          </button>
        </div>
      </div>

      {/* 3. Product Category */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider">
          ক্যাটাগরি
        </label>
        <div className="space-y-1 max-h-44 overflow-y-auto pr-1">
          {categoriesList.map(c => (
            <label
              key={c.id}
              className={`flex items-center justify-between py-1.5 px-2 rounded-lg text-xs cursor-pointer transition-colors ${
                selectedCategory === c.id ? 'bg-emerald-50 text-emerald-900 font-bold' : 'hover:bg-stone-50 text-stone-700'
              }`}
            >
              <span>{c.name}</span>
              <input
                type="radio"
                name="category_filter"
                checked={selectedCategory === c.id}
                onChange={() => onCategoryChange(c.id)}
                className="text-emerald-800 focus:ring-emerald-700"
              />
            </label>
          ))}
        </div>
      </div>

      {/* 4. Production District */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider">
          উৎপাদন এলাকা (জেলা)
        </label>
        <div className="space-y-1">
          {districtsList.map(d => (
            <label
              key={d.id}
              className={`flex items-center justify-between py-1.5 px-2 rounded-lg text-xs cursor-pointer transition-colors ${
                selectedDistrict === d.id ? 'bg-emerald-50 text-emerald-900 font-bold' : 'hover:bg-stone-50 text-stone-700'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-amber-700" />
                <span>{d.name}</span>
              </div>
              <input
                type="radio"
                name="district_filter"
                checked={selectedDistrict === d.id}
                onChange={() => onDistrictChange(d.id)}
                className="text-emerald-800 focus:ring-emerald-700"
              />
            </label>
          ))}
        </div>
      </div>

      {/* 5. Seller Type */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider">
          বিক্রেতার ধরন (Seller Type)
        </label>
        <select
          value={sellerType}
          onChange={(e) => onSellerTypeChange(e.target.value)}
          className="w-full text-xs p-2 rounded-lg border border-stone-300 bg-stone-50 focus:outline-none focus:ring-1 focus:ring-emerald-700 font-medium"
        >
          {sellerTypesList.map(st => (
            <option key={st.id} value={st.id}>{st.name}</option>
          ))}
        </select>
      </div>

      {/* 6. Price Range Filter */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider">
          একক পাইকারি দর (৳)
        </label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="text-[10px] text-stone-500 block">সর্বনিম্ন (৳)</span>
            <input
              type="number"
              min={0}
              max={maxPrice}
              value={minPrice}
              onChange={(e) => onPriceChange(Number(e.target.value), maxPrice)}
              className="w-full text-xs p-2 rounded-lg border border-stone-300 bg-stone-50 tabular-nums"
            />
          </div>
          <div>
            <span className="text-[10px] text-stone-500 block">সর্বোচ্চ (৳)</span>
            <input
              type="number"
              min={minPrice}
              max={5000}
              value={maxPrice}
              onChange={(e) => onPriceChange(minPrice, Number(e.target.value))}
              className="w-full text-xs p-2 rounded-lg border border-stone-300 bg-stone-50 tabular-nums"
            />
          </div>
        </div>
      </div>

      {/* 7. Available Quantity Filter */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider">
          ন্যূনতম মজুত পরিমাণ
        </label>
        <select
          value={minQuantity}
          onChange={(e) => onQuantityChange(Number(e.target.value))}
          className="w-full text-xs p-2 rounded-lg border border-stone-300 bg-stone-50 focus:outline-none focus:ring-1 focus:ring-emerald-700 font-medium"
        >
          <option value={0}>যেকোনো পরিমাণ</option>
          <option value={100}>১০০+ একক</option>
          <option value={500}>৫০০+ একক</option>
          <option value={1000}>১,০০০+ একক</option>
          <option value={5000}>৫,০০০+ একক</option>
        </select>
      </div>

    </aside>
  );
};
