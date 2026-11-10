import React from 'react';
import { 
  Apple, 
  Sprout, 
  Carrot, 
  Flame, 
  PackageCheck, 
  Boxes, 
  Palette, 
  Shirt, 
  Scissors, 
  Leaf 
} from 'lucide-react';
import { MARKETPLACE_CATEGORIES } from '../../data/products';

interface CategoryBarProps {
  selectedCategory: string;
  onSelectCategory: (slug: string) => void;
}

export const CategoryBar: React.FC<CategoryBarProps> = ({
  selectedCategory,
  onSelectCategory
}) => {
  const getIcon = (slug: string) => {
    switch (slug) {
      case 'fruits': return Apple;
      case 'agriculture': return Sprout;
      case 'vegetables': return Carrot;
      case 'spices': return Flame;
      case 'processed': return PackageCheck;
      case 'bamboo': return Boxes;
      case 'handicraft': return Palette;
      case 'apparel': return Shirt;
      case 'cottage': return Scissors;
      default: return Leaf;
    }
  };

  return (
    <div id="marketplace-categories" className="bg-white border-b border-stone-200 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              পাইকারি পণ্য ক্যাটাগরি
            </span>
            <span className="text-stone-300">·</span>
            <span className="text-xs text-stone-500">১০টি প্রধান পাহাড়ি শিল্প ও উৎপাদন খাত</span>
          </div>
          
          {selectedCategory !== 'all' && (
            <button
              onClick={() => onSelectCategory('all')}
              className="text-xs text-emerald-800 font-bold hover:underline cursor-pointer"
            >
              সব ক্যাটাগরি রিসেট করুন
            </button>
          )}
        </div>

        {/* 10 Category Chips / Cards Slider */}
        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2 sm:gap-2.5">
          {MARKETPLACE_CATEGORIES.map((cat) => {
            const Icon = getIcon(cat.slug);
            const isSelected = selectedCategory === cat.slug;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(isSelected ? 'all' : cat.slug)}
                className={`p-3 rounded-xl border text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-between gap-2 group ${
                  isSelected
                    ? 'bg-emerald-900 border-emerald-900 text-white shadow-md ring-2 ring-emerald-700/20'
                    : 'bg-stone-50/70 border-stone-200 hover:border-emerald-300 hover:bg-white text-stone-700'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                    isSelected
                      ? 'bg-emerald-800 text-amber-300'
                      : 'bg-white text-emerald-800 border border-stone-200 group-hover:bg-emerald-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <div className="space-y-0.5">
                  <div className={`text-xs font-bold leading-tight ${isSelected ? 'text-white' : 'text-stone-900'}`}>
                    {cat.name}
                  </div>
                  <div className={`text-[10px] tabular-nums ${isSelected ? 'text-emerald-200' : 'text-stone-400'}`}>
                    {cat.itemCount}+ পণ্য
                  </div>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};
