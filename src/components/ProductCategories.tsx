import React from 'react';
import { Sprout, Apple, Flame, Boxes, Palette, Shirt, PackageCheck, Leaf, ArrowRight } from 'lucide-react';
import { CATEGORIES_DATA } from '../data/products';

interface ProductCategoriesProps {
  onSelectCategory: (slug: string) => void;
}

export const ProductCategories: React.FC<ProductCategoriesProps> = ({ onSelectCategory }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sprout':
        return Sprout;
      case 'Apple':
        return Apple;
      case 'Flame':
        return Flame;
      case 'Boxes':
        return Boxes;
      case 'Palette':
        return Palette;
      case 'Shirt':
        return Shirt;
      case 'PackageCheck':
        return PackageCheck;
      default:
        return Leaf;
    }
  };

  return (
    <section id="categories-section" className="py-16 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="text-xs font-semibold text-emerald-800 tracking-wider">
            পণ্য সম্ভার
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 mt-1">
            পার্বত্য চট্টগ্রামের প্রধান পণ্য ক্যাটাগরি
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-2">
            প্রকৃতি ও ঐতিহ্যের সেরা উপাদানে সমৃদ্ধ আটটি প্রধান শিল্প ও কৃষি খাত
          </p>
        </div>

        {/* 8 Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {CATEGORIES_DATA.map((cat) => {
            const Icon = getIcon(cat.iconName);
            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.slug)}
                className="group p-5 rounded-2xl bg-white border border-stone-200 hover:border-emerald-400 hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-stone-50 group-hover:bg-emerald-900 text-emerald-800 group-hover:text-amber-300 border border-stone-200 group-hover:border-emerald-800 flex items-center justify-center transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold text-stone-500 tabular-nums">
                      {cat.itemCount}+ পণ্য
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-stone-900 group-hover:text-emerald-950 transition-colors">
                    {cat.name}
                  </h3>

                  <p className="text-xs text-stone-600 mt-1.5 leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-3 mt-4 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                  <span className="truncate">{cat.districts.join(' · ')}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-800 transform group-hover:translate-x-1 transition-transform shrink-0" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
