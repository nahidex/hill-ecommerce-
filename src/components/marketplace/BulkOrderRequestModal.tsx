import React, { useState } from 'react';
import { X, Send, CheckCircle2, ShieldCheck, MapPin, Calendar, DollarSign, AlertCircle } from 'lucide-react';
import { ProductItem, UserSession, BulkOrderRequest } from '../../types';

interface BulkOrderRequestModalProps {
  product: ProductItem | null;
  isOpen: boolean;
  onClose: () => void;
  buyer: UserSession;
  onSubmitRequest: (req: BulkOrderRequest) => void;
}

export const BulkOrderRequestModal: React.FC<BulkOrderRequestModalProps> = ({
  product,
  isOpen,
  onClose,
  buyer,
  onSubmitRequest
}) => {
  if (!isOpen || !product) return null;

  const [quantity, setQuantity] = useState<number>(product.minOrderQuantity || 500);
  const [proposedPrice, setProposedPrice] = useState<number>(product.pricePerUnit);
  const [deliveryLocation, setDeliveryLocation] = useState(buyer.address || 'তেজগাঁও সেন্ট্রাল ওয়্যারহাউজ, ঢাকা');
  const [deliveryDate, setDeliveryDate] = useState('২০ নভেম্বর ২০২৬');
  const [additionalInstructions, setAdditionalInstructions] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const estimatedTotal = (quantity || 0) * (proposedPrice || 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quantity < product.minOrderQuantity) {
      setError(`ন্যূনতম অর্ডার পরিমাণ ${product.minOrderQuantity} ${product.unit} হতে হবে`);
      return;
    }

    const req: BulkOrderRequest = {
      id: `req-${Date.now()}`,
      requestId: `BOR-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      productId: product.id,
      productName: product.name,
      productImage: product.image,
      sellerName: product.producerName,
      buyerName: buyer.name,
      buyerPhone: buyer.mobile,
      quantity,
      unit: product.unit,
      proposedPrice,
      totalEstimatedPrice: estimatedTotal,
      deliveryLocation,
      deliveryDate,
      additionalInstructions,
      status: 'submitted',
      createdAt: 'এইমাত্র'
    };

    onSubmitRequest(req);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-stone-200 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50">
          <div>
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
              B2B বাল্ক ক্রয় ফরম
            </span>
            <h3 className="text-base font-bold text-stone-900 mt-0.5">
              পাইকারি ক্রয় অনুরোধ দাখিল করুন
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-emerald-700" />
            </div>
            <h4 className="text-lg font-bold text-stone-900">ক্রয় অনুরোধ সফলভাবে পাঠানো হয়েছে!</h4>
            <p className="text-xs text-stone-600 max-w-md mx-auto">
              উৎপাদক <strong>{product.producerName}</strong>-এর ড্যাশবোর্ডে আপনার অফারটি পৌঁছেছে। বিক্রেতা গ্রহণ করলে সরাসরি এসক্রো ইনভয়েস জেনারেট হবে।
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            {error && (
              <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}

            {/* Product & Seller Snapshot */}
            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <img src={product.image} alt="" className="w-10 h-10 rounded-lg object-cover border border-stone-200" />
                <div>
                  <div className="font-bold text-stone-900 line-clamp-1">{product.name}</div>
                  <div className="text-stone-500 text-[11px]">বিক্রেতা: {product.producerName} ({product.district})</div>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-[10px] text-stone-400 block">তালিকাভুক্ত দর:</span>
                <span className="font-bold text-emerald-900">৳{product.pricePerUnit}/{product.unit}</span>
              </div>
            </div>

            {/* Quantity and Proposed Price Inputs */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  ক্রয়ের পরিমাণ ({product.unit}) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  min={product.minOrderQuantity}
                  max={product.availableQuantity}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full text-xs sm:text-sm px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700 tabular-nums font-bold"
                />
                <span className="text-[10px] text-stone-400">ন্যূনতম: {product.minOrderQuantity} {product.unit}</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  প্রস্তাবিত একক দর (৳) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  min={1}
                  value={proposedPrice}
                  onChange={(e) => setProposedPrice(Number(e.target.value))}
                  className="w-full text-xs sm:text-sm px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700 tabular-nums font-bold text-emerald-950"
                />
                <span className="text-[10px] text-stone-400">দর কষাকষির জন্য প্রস্তাব</span>
              </div>
            </div>

            {/* Estimated Total Calculation (§6) */}
            <div className="p-3.5 rounded-xl bg-emerald-950 text-white space-y-1">
              <div className="flex items-center justify-between text-xs text-emerald-300">
                <span>পণ্যের পরিমাণ: {quantity.toLocaleString()} {product.unit}</span>
                <span>প্রতি এককের প্রস্তাবিত মূল্য: ৳{proposedPrice}</span>
              </div>
              <div className="flex items-baseline justify-between pt-1 border-t border-emerald-900">
                <span className="text-xs text-stone-200">মোট সম্ভাব্য অর্ডার মূল্য:</span>
                <span className="text-xl font-bold text-amber-400 tabular-nums">
                  ৳{estimatedTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Delivery Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  পছন্দের ডেলিভারি স্থান <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={deliveryLocation}
                    onChange={(e) => setDeliveryLocation(e.target.value)}
                    placeholder="আড়ত, ওয়্যারহাউজ বা জেলা/থানা"
                    className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  প্রত্যাশিত ডেলিভারি তারিখ <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    placeholder="যেমন: ২০ নভেম্বর ২০২৬"
                    className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                অতিরিক্ত নির্দেশনা ও প্যাকেজিং স্পেক্স (ঐচ্ছিক)
              </label>
              <textarea
                rows={2}
                value={additionalInstructions}
                onChange={(e) => setAdditionalInstructions(e.target.value)}
                placeholder="প্যাকিংয়ের মাপ, গ্রেডিং বা নির্দিষ্ট গাড়ি ছাড়ার সময়..."
                className="w-full text-xs p-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700"
              />
            </div>

            {/* Escrow Guarantee note */}
            <div className="flex items-center gap-2 text-[11px] text-stone-500">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>অনুরোধ জমা হওয়ার পর অর্থ নিরাপদ এসক্রো সুরক্ষা সাপেক্ষে পরিশোধ করা হবে।</span>
            </div>

            {/* Submit */}
            <div className="pt-2 border-t border-stone-200 flex justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-stone-600 rounded-lg hover:bg-stone-100"
              >
                বাতিল
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-amber-300" />
                <span>ক্রয় অনুরোধ জমা দিন</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
