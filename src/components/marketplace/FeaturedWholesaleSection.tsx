import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Tag, TrendingDown } from 'lucide-react';
import { ProductItem } from '../../types';

interface FeaturedWholesaleSectionProps {
  products: ProductItem[];
  onSelectProduct: (product: ProductItem) => void;
  onRequestQuote: (product: ProductItem) => void;
}

export const FeaturedWholesaleSection: React.FC<FeaturedWholesaleSectionProps> = ({
  products,
  onSelectProduct,
  onRequestQuote
}) => {
  // Take top 3 high volume or special offer products
  const featured = products.slice(0, 3);

  return (
    <section className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-stone-900 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-emerald-900">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-400 text-stone-950 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>সীমিত সময়ের স্পেশাল লট</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              বিশেষ পাইকারি অফার (Featured Wholesale Deals)
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 mt-1">
              বড় ভলিউমে সরাসরি কৃষক সমবায় থেকে ছাড়কৃত মূল্যে তাজা ফলমূল ও মসলার চালান
            </p>
          </div>
        </div>

        {/* 3 Featured Deal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featured.map((p) => (
            <div
              key={p.id}
              className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 p-4 flex flex-col justify-between hover:bg-white/15 transition-all group"
            >
              <div>
                <div className="aspect-[16/10] rounded-xl overflow-hidden mb-3 relative">
                  <img
                    src={p.image}
                    alt={p.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2 left-2 bg-amber-400 text-stone-950 text-[10px] font-bold px-2 py-0.5 rounded">
                    বিশেষ বাল্ক দর
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="text-[11px] text-amber-300 font-semibold">{p.category} · {p.district}</div>
                  <h3
                    onClick={() => onSelectProduct(p)}
                    className="font-bold text-base text-white line-clamp-1 cursor-pointer hover:text-amber-300 transition-colors"
                  >
                    {p.name}
                  </h3>
                  <div className="text-xs text-stone-300">
                    উপলব্ধ: <strong>{p.availableQuantity.toLocaleString()} {p.unit}</strong> (MOQ: {p.minOrderQuantity} {p.unit})
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-3 border-t border-white/10 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] text-stone-400 block">পাইকারি দর</span>
                  <span className="text-lg font-bold text-amber-400 tabular-nums">৳{p.pricePerUnit}</span>
                  <span className="text-xs text-stone-300 ml-1">/ {p.unit}</span>
                </div>

                <button
                  onClick={() => onRequestQuote(p)}
                  className="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-stone-950 rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-sm"
                >
                  অর্ডার রিকোয়েস্ট
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
