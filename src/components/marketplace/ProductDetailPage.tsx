import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  ShieldCheck, 
  Send, 
  MessageSquare, 
  Truck, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Star, 
  Scale, 
  Package, 
  Building2, 
  DollarSign, 
  AlertCircle,
  Layers,
  ChevronRight,
  Share2
} from 'lucide-react';
import { ProductItem, SellerProfile } from '../../types';
import { SELLER_PROFILES } from '../../data/products';

interface ProductDetailPageProps {
  product: ProductItem;
  onBack: () => void;
  onRequestBulkOrder: (product: ProductItem) => void;
  onOpenNegotiation: (product: ProductItem) => void;
  onContactSeller: (product: ProductItem) => void;
  onOpenSellerProfile: (sellerId: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onBack,
  onRequestBulkOrder,
  onOpenNegotiation,
  onContactSeller,
  onOpenSellerProfile
}) => {
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [orderQuantity, setOrderQuantity] = useState(product.minOrderQuantity);

  const seller = product.sellerId ? SELLER_PROFILES[product.sellerId] : null;

  // Calculate tier price
  const calculateTierPrice = (qty: number) => {
    if (!product.bulkPricingTiers || product.bulkPricingTiers.length === 0) {
      return product.pricePerUnit;
    }
    for (let tier of product.bulkPricingTiers) {
      if (typeof tier.maxQty === 'number') {
        if (qty >= tier.minQty && qty <= tier.maxQty) {
          return typeof tier.price === 'number' ? tier.price : product.pricePerUnit;
        }
      } else if (qty >= tier.minQty) {
        return typeof tier.price === 'number' ? tier.price : product.pricePerUnit;
      }
    }
    return product.pricePerUnit;
  };

  const currentCalculatedUnitRate = calculateTierPrice(orderQuantity);
  const totalEstimatedCost = orderQuantity * currentCalculatedUnitRate;

  const gallery = product.galleryImages || [product.image];

  return (
    <div className="bg-stone-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8 animate-in fade-in">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between text-xs text-stone-600 pb-2 border-b border-stone-200">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 font-bold text-emerald-900 hover:text-emerald-700 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>পাইকারি বাজারে ফিরে যান</span>
          </button>

          <div className="hidden sm:flex items-center gap-1.5 text-stone-500">
            <span>পাইকারি বাজার</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>{product.category}</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-semibold text-stone-800 truncate max-w-xs">{product.name}</span>
          </div>
        </div>

        {/* Main Product Hero Grid (Image Gallery Left + Purchasing & Specs Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Image Gallery (Col 5) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Main Featured Image */}
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shadow-md relative">
              <img
                src={selectedImage}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />

              <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                {product.badge && (
                  <span className="bg-emerald-950/85 text-amber-300 text-xs font-bold px-3 py-1 rounded backdrop-blur-xs">
                    {product.badge}
                  </span>
                )}
                {product.isPerishable ? (
                  <span className="bg-amber-600 text-white text-xs font-semibold px-2.5 py-0.5 rounded">
                    পচনশীল কৃষিপণ্য
                  </span>
                ) : (
                  <span className="bg-stone-800 text-stone-100 text-xs font-semibold px-2.5 py-0.5 rounded">
                    অপচনশীল শুকনো পণ্য
                  </span>
                )}
              </div>

              <div className="absolute bottom-3 right-3 bg-white/95 text-stone-900 text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-700" />
                <span>{product.origin}</span>
              </div>
            </div>

            {/* Thumbnail Selectors */}
            {gallery.length > 1 && (
              <div className="flex items-center gap-2.5">
                {gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      selectedImage === img ? 'border-emerald-800 ring-2 ring-emerald-600/20' : 'border-stone-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Seller Snapshot Card */}
            {seller && (
              <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={seller.avatar}
                      alt={seller.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-xl object-cover border border-stone-200"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-bold text-stone-900">{seller.name}</h4>
                        {seller.verified && (
                          <span title="যাচাইকৃত বিক্রেতা" className="inline-flex items-center">
                            <ShieldCheck className="w-4 h-4 text-emerald-700" />
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-emerald-800 font-semibold">{seller.businessName}</div>
                      <div className="text-[11px] text-stone-500">{seller.upazila}, {seller.district}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenSellerProfile(seller.id)}
                    className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-semibold cursor-pointer"
                  >
                    প্রোফাইল দেখুন
                  </button>
                </div>

                <div className="pt-2 border-t border-stone-100 grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-1.5 bg-stone-50 rounded-lg">
                    <span className="text-[10px] text-stone-500 block">রেটিং</span>
                    <span className="font-bold text-amber-800">★ {seller.rating}</span>
                  </div>
                  <div className="p-1.5 bg-stone-50 rounded-lg">
                    <span className="text-[10px] text-stone-500 block">তালিকাভুক্ত পণ্য</span>
                    <span className="font-bold text-stone-900">{seller.listedProductsCount}টি</span>
                  </div>
                  <div className="p-1.5 bg-stone-50 rounded-lg">
                    <span className="text-[10px] text-stone-500 block">সফল লেনদেন</span>
                    <span className="font-bold text-emerald-800">{seller.completedTransactions}+</span>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Pricing, Tiers, Actions & Specs (Col 7) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Header info */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
              
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
                  <span>{product.category}</span>
                  <span>·</span>
                  <span className="text-stone-500">{product.qualityGrade}</span>
                  <span>·</span>
                  <span className="text-amber-800">★ {product.rating} ({product.totalReviews} রিভিউ)</span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 leading-snug">
                  {product.name}
                </h1>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pt-1">
                  {product.description}
                </p>
              </div>

              {/* Bulk Pricing Tiers Table (§9) */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
                    <DollarSign className="w-4 h-4 text-emerald-700" />
                    <span>পরিমাণভিত্তিক পাইকারি মূল্যতালিকা (Bulk Pricing Tiers)</span>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-800 bg-white px-2 py-0.5 rounded border border-stone-200">
                    বেশি কিনলে সাশ্রয়ী
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-stone-200 bg-stone-100/70 text-stone-600 font-bold">
                        <th className="py-2 px-3">ক্রয়ের পরিমাণ ({product.unit})</th>
                        <th className="py-2 px-3 text-right">প্রতি এককের মূল্য</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200/60">
                      {product.bulkPricingTiers?.map((tier, idx) => (
                        <tr key={idx} className="hover:bg-white">
                          <td className="py-2 px-3 font-medium text-stone-800 tabular-nums">
                            {tier.minQty.toLocaleString()} – {typeof tier.maxQty === 'number' ? `${tier.maxQty.toLocaleString()} ${product.unit}` : tier.maxQty}
                          </td>
                          <td className="py-2 px-3 text-right font-bold text-emerald-900 tabular-nums">
                            {typeof tier.price === 'number' ? `৳${tier.price} / ${product.unit}` : tier.price}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Order Simulator Box */}
              <div className="p-4 rounded-xl bg-emerald-950 text-white space-y-3">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-emerald-300">প্রস্তাবিত পাইকারি ক্রয়ের পরিমাণ:</span>
                    <div className="flex items-center gap-2 mt-1">
                      <input
                        type="number"
                        min={product.minOrderQuantity}
                        max={product.availableQuantity}
                        value={orderQuantity}
                        onChange={(e) => setOrderQuantity(Number(e.target.value))}
                        className="w-32 bg-emerald-900 border border-emerald-700 text-white px-3 py-1.5 rounded-lg text-sm font-bold tabular-nums focus:outline-none focus:ring-1 focus:ring-amber-400"
                      />
                      <span className="text-xs text-emerald-200 font-semibold">{product.unit}</span>
                      <span className="text-[10px] text-stone-300">(MOQ: {product.minOrderQuantity} {product.unit})</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-emerald-300 block">মোট সম্ভাব্য মূল্য:</span>
                    <span className="text-2xl font-bold text-amber-400 tabular-nums">
                      ৳{totalEstimatedCost.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-stone-300 block">
                      (দর: ৳{currentCalculatedUnitRate}/{product.unit})
                    </span>
                  </div>
                </div>

                {/* Main Action Buttons */}
                <div className="pt-2 border-t border-emerald-900 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    onClick={() => onRequestBulkOrder(product)}
                    className="py-2.5 px-4 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>ক্রয় অনুরোধ পাঠান</span>
                  </button>

                  <button
                    onClick={() => onOpenNegotiation(product)}
                    className="py-2.5 px-4 bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-emerald-700"
                  >
                    <Scale className="w-3.5 h-3.5 text-amber-300" />
                    <span>মূল্য আলোচনা করুন</span>
                  </button>

                  <button
                    onClick={() => onContactSeller(product)}
                    className="py-2.5 px-4 bg-white/15 hover:bg-white/25 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-300" />
                    <span>সরাসরি চ্যাট</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Perishable vs Non-Perishable Specifications (§10) */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-stone-900">
                {product.isPerishable ? 'তাজা ও পচনশীল পণ্যের বিশেষ শর্তাবলি' : 'অপচনশীল ও দীর্ঘমেয়াদি পণ্যের বিবরণ'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                
                {product.isPerishable ? (
                  <>
                    <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1">
                      <span className="font-bold text-amber-950 block">সংগ্রহ ও সতেজতা:</span>
                      <p className="text-stone-700">{product.harvestDate} · বাগান থেকে সরাসরি বাছাইকৃত</p>
                    </div>

                    <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1">
                      <span className="font-bold text-amber-950 block">সম্ভাব্য মেয়াদ ও সংরক্ষণ:</span>
                      <p className="text-stone-700">{product.specifications.shelfLife} · {product.specifications.storageRequirement}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1">
                      <span className="font-bold text-amber-950 block">দ্রুত সরবরাহের ব্যবস্থা:</span>
                      <p className="text-stone-700">{product.specifications.deliveryTime} · ভেন্টিলেটেড কুশনযুক্ত পরিবহন</p>
                    </div>

                    <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1">
                      <span className="font-bold text-amber-950 block">পরিবহনের শর্ত:</span>
                      <p className="text-stone-700">বৃষ্টি ও রোদ থেকে সুরক্ষিত কাভার্ড ভ্যান বা শীতলীকৃত পরিবহন প্রয়োজন</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                      <span className="font-bold text-stone-900 block">মজুত ও প্যাকিং:</span>
                      <p className="text-stone-700">{product.specifications.packaging}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                      <span className="font-bold text-stone-900 block">সংরক্ষণ মেয়াদ:</span>
                      <p className="text-stone-700">{product.specifications.shelfLife} · কোনো রাসায়নিক প্রিজারভেটিভ ছাড়া</p>
                    </div>

                    <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                      <span className="font-bold text-stone-900 block">ওয়্যারহাউজ রিকোয়ারমেন্ট:</span>
                      <p className="text-stone-700">{product.specifications.storageRequirement || 'শুষ্ক ও স্বাভাবিক বায়ু চলাচলযুক্ত স্থান'}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                      <span className="font-bold text-stone-900 block">গুণগত বিশুদ্ধতা:</span>
                      <p className="text-stone-700">{product.specifications.purityGrade}</p>
                    </div>
                  </>
                )}

              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
