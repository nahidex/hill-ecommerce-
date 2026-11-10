import React from 'react';
import { MapPin, ArrowRight, Layers, Sparkles } from 'lucide-react';
import { DISTRICT_MARKETPLACE_DATA } from '../../data/products';

interface DistrictMarketplaceSectionProps {
  onSelectDistrict: (districtName: string) => void;
}

export const DistrictMarketplaceSection: React.FC<DistrictMarketplaceSectionProps> = ({
  onSelectDistrict
}) => {
  return (
    <section className="py-12 bg-stone-100/60 border-t border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-1.5">
          <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
            জেলা ভিত্তিক মার্কেটপ্লেস ব্রাউজিং
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900">
            তিন পার্বত্য জেলার পণ্য হাব
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            প্রতিটি জেলার ভৌগোলিক স্বাতন্ত্র্য ও বিখ্যাত পণ্যের বিশেষ পাইকারি সংগ্রহশালা
          </p>
        </div>

        {/* 3 District Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DISTRICT_MARKETPLACE_DATA.map((dist, idx) => (
            <div
              key={idx}
              className="group rounded-2xl bg-white border border-stone-200 hover:border-emerald-300 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Image Banner */}
                <div className="relative h-44 bg-stone-900 overflow-hidden">
                  <img
                    src={dist.image}
                    alt={dist.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent"></div>

                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{dist.name} জেলা</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mt-0.5">{dist.name} পাইকারি হাব</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3.5">
                  <p className="text-xs text-stone-600 leading-relaxed min-h-[36px]">
                    {dist.tagline}
                  </p>

                  <div className="pt-2 border-t border-stone-100 space-y-2">
                    <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
                      বিখ্যাত পণ্যসমূহ:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {dist.popularProducts.map((p, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-800 text-xs font-medium"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs text-stone-500">
                    <span>তালিকাভুক্ত পণ্য: <strong className="text-stone-900">{dist.totalListedItems}+</strong></span>
                    <span>সক্রিয় সমবায়: <strong className="text-emerald-800">{dist.activeSellers}টি</strong></span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => onSelectDistrict(dist.name)}
                  className="w-full py-2.5 px-4 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>{dist.name}-এর পণ্য এক্সপ্লোর করুন</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
