import React, { useState } from 'react';
import { X, MapPin, CheckCircle2, ShieldCheck, Scale, Truck, Calendar, Store, ArrowRight, MessageCircle } from 'lucide-react';
import { ProductItem } from '../types';

interface ProductDetailModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onRequestQuote: (product: ProductItem) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onRequestQuote,
}) => {
  const [orderQuantity, setOrderQuantity] = useState<number>(product?.minOrderQuantity || 100);
  const [quoteSuccess, setQuoteSuccess] = useState(false);

  if (!product) return null;

  const calculatedTotal = (orderQuantity || 0) * product.pricePerUnit;

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteSuccess(true);
    setTimeout(() => {
      setQuoteSuccess(false);
      onRequestQuote(product);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Strip */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            <span>পাইকারি লট বিবরণ (Wholesale Batch Details)</span>
            <span aria-hidden="true">·</span>
            <span className="text-stone-500">{product.district}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Image & Producer Card */}
            <div className="space-y-4">
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-stone-100 border border-stone-200 relative">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-emerald-900/90 text-white text-xs px-2.5 py-1 rounded-md font-semibold backdrop-blur-xs">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Producer Info */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                <div className="text-xs text-stone-500 uppercase tracking-wider font-semibold">
                  উৎপাদক ও সরবরাহকারী তথ্য
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-bold text-stone-900">{product.producerName}</div>
                    <div className="text-xs text-emerald-800 font-medium">{product.producerType}</div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center text-xs font-semibold text-emerald-800">
                      ★ {product.rating} ({product.totalReviews} রিভিউ)
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-stone-600 pt-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  <span>{product.origin}</span>
                </div>
              </div>
            </div>

            {/* Product Specifications & Pricing */}
            <div className="space-y-4 flex flex-col justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-stone-900 leading-snug">
                  {product.name}
                </h3>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  {product.description}
                </p>

                {/* Key Spec Grid */}
                <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200">
                    <span className="text-stone-500 block">উপলব্ধ পরিমাণ</span>
                    <span className="font-bold text-stone-900 tabular-nums text-sm">
                      {product.availableQuantity.toLocaleString()} {product.unit}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200">
                    <span className="text-stone-500 block">ন্যূনতম অর্ডার</span>
                    <span className="font-bold text-stone-900 tabular-nums text-sm">
                      {product.minOrderQuantity.toLocaleString()} {product.unit}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200">
                    <span className="text-stone-500 block">প্যাকিং ধরন</span>
                    <span className="font-semibold text-stone-800 text-xs">
                      {product.specifications.packaging}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200">
                    <span className="text-stone-500 block">সংরক্ষণ মেয়াদ</span>
                    <span className="font-semibold text-stone-800 text-xs">
                      {product.specifications.shelfLife}
                    </span>
                  </div>
                </div>

                {/* Purity & Govt Standards */}
                <div className="mt-3 flex items-center gap-2 text-xs text-emerald-800 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>মান যাচাই: {product.specifications.purityGrade}</span>
                </div>
              </div>

              {/* Price Calculation Box */}
              <div className="p-4 rounded-xl bg-emerald-950 text-white space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-emerald-200">প্রতি এককের পাইকারি মূল্য</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-amber-400 tabular-nums">
                      ৳{product.pricePerUnit}
                    </span>
                    <span className="text-xs text-stone-300 ml-1">/ {product.unit}</span>
                  </div>
                </div>

                {/* Simulated Order Calculator */}
                <div className="pt-2 border-t border-emerald-900 space-y-2">
                  <label className="block text-xs text-emerald-200">
                    প্রস্তাবিত ক্রয়ের পরিমাণ নির্ধারণ করুন ({product.unit}):
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={product.minOrderQuantity}
                      max={product.availableQuantity}
                      value={orderQuantity}
                      onChange={(e) => setOrderQuantity(Number(e.target.value))}
                      className="w-full bg-emerald-900/60 border border-emerald-700 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-400 tabular-nums"
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1 text-emerald-200">
                    <span>আনুমানিক বাল্ক মূল্য:</span>
                    <span className="font-bold text-base text-white tabular-nums">
                      ৳{calculatedTotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                {quoteSuccess ? (
                  <div className="py-2 px-3 rounded-lg bg-emerald-800 text-center text-xs font-semibold text-emerald-100 flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" />
                    <span>কোটেশন অনুরোধ পাঠানো হয়েছে! নিবন্ধন সম্পন্ন করুন।</span>
                  </div>
                ) : (
                  <button
                    onClick={handleSubmitInquiry}
                    className="w-full py-2.5 px-4 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <span>বাল্ক কোটেশন ও অর্ডারের অনুরোধ করুন</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>

            </div>

          </div>

          {/* Escrow assurance footer notice inside modal */}
          <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 flex items-center gap-3 text-xs text-stone-600">
            <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
            <span>
              <strong>নিরাপদ এসক্রো সুরক্ষা:</strong> আপনার অর্ডার নিশ্চিতকরণের পর অর্থ সংরক্ষিত থাকবে এবং পণ্য গুণগত মান অনুযায়ী প্রাপ্তি সাপেক্ষে উৎপাদকের কাছে হস্তান্তর করা হবে।
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};
