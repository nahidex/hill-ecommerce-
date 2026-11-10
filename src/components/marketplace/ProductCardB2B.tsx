import React from 'react';
import { 
  MapPin, 
  ShieldCheck, 
  Eye, 
  Send, 
  Truck, 
  Award, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  ShoppingBag
} from 'lucide-react';
import { ProductItem } from '../../types';

interface ProductCardB2BProps {
  product: ProductItem;
  onViewDetails: (product: ProductItem) => void;
  onRequestQuote: (product: ProductItem) => void;
  onOpenSellerProfile?: (sellerId: string) => void;
}

export const ProductCardB2B: React.FC<ProductCardB2BProps> = ({
  product,
  onViewDetails,
  onRequestQuote,
  onOpenSellerProfile
}) => {
  return (
    <div className="group rounded-2xl bg-white border border-stone-200 hover:border-emerald-400 transition-all duration-300 hover:shadow-lg flex flex-col justify-between overflow-hidden">
      
      <div>
        {/* Top Image Frame */}
        <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden cursor-pointer" onClick={() => onViewDetails(product)}>
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
          />

          {/* Badges on Top */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
            {product.badge && (
              <span className="bg-emerald-950/85 text-amber-300 text-[10px] font-bold px-2.5 py-0.5 rounded backdrop-blur-xs shadow-xs">
                {product.badge}
              </span>
            )}
            {product.isPerishable ? (
              <span className="bg-amber-600/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded backdrop-blur-xs">
                তাজা পচনশীল
              </span>
            ) : (
              <span className="bg-stone-800/80 text-stone-100 text-[10px] font-semibold px-2 py-0.5 rounded backdrop-blur-xs">
                অপচনশীল / ড্রাই
              </span>
            )}
          </div>

          {/* District Tag */}
          <div className="absolute bottom-2.5 right-2.5 bg-white/95 text-stone-900 text-[11px] font-bold px-2.5 py-0.5 rounded-md shadow-xs backdrop-blur-xs flex items-center gap-1">
            <MapPin className="w-3 h-3 text-amber-700" />
            <span>{product.district}</span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-5 space-y-3">
          
          {/* Category & Quality kicker */}
          <div className="flex items-center justify-between text-[11px] text-emerald-800 font-semibold">
            <span>{product.category}</span>
            <span className="text-stone-500 font-normal">
              {product.qualityGrade}
            </span>
          </div>

          {/* Product Name */}
          <h3
            onClick={() => onViewDetails(product)}
            className="text-base font-bold text-stone-900 group-hover:text-emerald-950 transition-colors line-clamp-2 leading-snug cursor-pointer min-h-[44px]"
          >
            {product.name}
          </h3>

          {/* Producer / Supplier Info */}
          <div className="pt-1 flex items-center justify-between text-xs">
            <button
              onClick={() => product.sellerId && onOpenSellerProfile && onOpenSellerProfile(product.sellerId)}
              className="font-semibold text-stone-700 hover:text-emerald-800 transition-colors flex items-center gap-1 truncate text-left cursor-pointer"
            >
              <span className="truncate">{product.producerName}</span>
              {product.isVerifiedSeller && (
                <span title="যাচাইকৃত বিক্রেতা" className="inline-flex items-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                </span>
              )}
            </button>
            <span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded shrink-0">
              {product.producerType}
            </span>
          </div>

          {/* B2B Quantity & MOQ Metrics */}
          <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-[10px] text-stone-400 block font-medium">উপলব্ধ পরিমাণ</span>
              <span className="font-bold text-stone-900 tabular-nums">
                {product.availableQuantity.toLocaleString()} {product.unit}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-stone-400 block font-medium">ন্যূনতম অর্ডার (MOQ)</span>
              <span className="font-bold text-stone-900 tabular-nums">
                {product.minOrderQuantity.toLocaleString()} {product.unit}
              </span>
            </div>
          </div>

          {/* Delivery & Readiness Indicator */}
          <div className="flex items-center gap-1.5 text-[11px] text-stone-500">
            <Truck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
            <span className="truncate">{product.specifications.deliveryTime}</span>
          </div>

        </div>
      </div>

      {/* Card Footer: Pricing & Action Buttons */}
      <div className="p-4 sm:p-5 pt-0 space-y-3">
        
        {/* Price Strip */}
        <div className="p-3 rounded-xl bg-emerald-950 text-white flex items-baseline justify-between">
          <div>
            <span className="text-[10px] text-emerald-300 block">একক পাইকারি দর</span>
            <div className="flex items-baseline">
              <span className="text-xl font-bold text-amber-400 tabular-nums">
                ৳{product.pricePerUnit}
              </span>
              <span className="text-xs text-stone-300 ml-1">/ {product.unit}</span>
            </div>
          </div>
          <span className="text-[10px] font-semibold text-emerald-300 bg-emerald-900 px-2 py-0.5 rounded border border-emerald-700">
            বাল্ক ছাড় প্রযোজ্য
          </span>
        </div>

        {/* Action Buttons: বিস্তারিত দেখুন & ক্রয় অনুরোধ পাঠান */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onViewDetails(product)}
            className="py-2.5 px-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-stone-600" />
            <span>বিস্তারিত</span>
          </button>

          <button
            onClick={() => onRequestQuote(product)}
            className="py-2.5 px-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1 cursor-pointer active:scale-98"
          >
            <Send className="w-3.5 h-3.5 text-amber-300" />
            <span>ক্রয় অনুরোধ</span>
          </button>
        </div>

      </div>

    </div>
  );
};
