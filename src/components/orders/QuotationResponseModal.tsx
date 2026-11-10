import React, { useState } from 'react';
import { X, Send, Save, AlertCircle, FileText, CheckCircle2, DollarSign, Calendar, Truck, Package } from 'lucide-react';
import { RFQItem, QuotationItem, UserSession, ProductItem } from '../../types';

interface QuotationResponseModalProps {
  rfq: RFQItem | null;
  isOpen: boolean;
  onClose: () => void;
  seller: UserSession;
  products?: ProductItem[];
  onSubmitQuotation: (rfqId: string, quote: QuotationItem) => void;
}

export const QuotationResponseModal: React.FC<QuotationResponseModalProps> = ({
  rfq,
  isOpen,
  onClose,
  seller,
  products = [],
  onSubmitQuotation
}) => {
  const [unitPrice, setUnitPrice] = useState<number>(rfq ? rfq.targetPricePerUnit : 0);
  const [offeredQuantity, setOfferedQuantity] = useState<number>(rfq ? rfq.requiredQuantity : 0);
  const [deliveryDate, setDeliveryDate] = useState<string>(rfq ? rfq.requiredDeliveryDate : '');
  const [shippingCost, setShippingCost] = useState<number>(2500);
  const [packagingCost, setPackagingCost] = useState<number>(800);
  const [paymentTerms, setPaymentTerms] = useState<string>('সরকারি ডিজিটাল এসক্রো ১০০% (সরবরাহ সাপেক্ষে)');
  const [validUntil, setValidUntil] = useState<string>('৭ দিন পর্যন্ত কার্যকর');
  const [additionalTerms, setAdditionalTerms] = useState<string>('ফুড গ্রেড ডাবল লেয়ার পাটের বস্তা ও কুশন প্যাকিং অন্তর্ভুক্ত।');
  const [notes, setNotes] = useState<string>('');
  const [error, setError] = useState<string>('');

  if (!isOpen || !rfq) return null;

  const totalProductPrice = Number(unitPrice) * Number(offeredQuantity);
  const grandTotal = totalProductPrice + Number(shippingCost) + Number(packagingCost);

  // Business rule (§12): stock check simulation if matching product found
  const matchingProduct = products.find(p => p.name.includes(rfq.productRequirement) || rfq.productRequirement.includes(p.name));
  const availableStock = matchingProduct ? matchingProduct.availableQuantity : 10000;

  const handleSubmit = (status: 'submitted' | 'draft') => {
    if (!unitPrice || unitPrice <= 0) {
      setError('সঠিক একক মূল্য প্রদান করুন।');
      return;
    }
    if (!offeredQuantity || offeredQuantity <= 0) {
      setError('সরবরাহযোগ্য পরিমাণ উল্লেখ করুন।');
      return;
    }
    if (matchingProduct && offeredQuantity > availableStock) {
      setError(`আপনার বর্তমান স্টকে মাত্র ${availableStock.toLocaleString()} ${rfq.unit} পণ্য রয়েছে। এর চেয়ে বেশি অফার করা সম্ভব নয়।`);
      return;
    }

    const quotation: QuotationItem = {
      id: `quote-${Date.now()}`,
      rfqId: rfq.id,
      rfqNumber: rfq.rfqNumber,
      sellerId: seller.id,
      sellerName: seller.name,
      sellerBusiness: seller.businessName || seller.name,
      sellerPhone: seller.mobile,
      sellerRating: 4.95,
      sellerDistrict: seller.district,
      proposedUnitPrice: Number(unitPrice),
      offeredQuantity: Number(offeredQuantity),
      unit: rfq.unit,
      totalProductPrice,
      shippingCost: Number(shippingCost),
      packagingCost: Number(packagingCost),
      totalAmount: grandTotal,
      expectedDeliveryDate: deliveryDate || 'নির্ধারিত সময়ে',
      paymentTerms,
      validUntil,
      additionalTerms,
      notes,
      status,
      submittedDate: '১০ নভেম্বর ২০২৬'
    };

    onSubmitQuotation(rfq.id, quotation);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto font-bengali">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-4 bg-emerald-950 text-white flex items-center justify-between border-b border-emerald-900">
          <div>
            <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider">
              RFQ রেসপন্স ও কোটেশন ফর্ম
            </span>
            <h3 className="text-base font-bold text-white mt-0.5">
              কোটেশন প্রস্তাব: {rfq.rfqNumber}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-emerald-200 hover:text-white rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* RFQ Summary Strip */}
        <div className="p-4 bg-emerald-50/60 border-b border-emerald-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <span className="font-bold text-stone-900 text-sm">{rfq.productRequirement}</span>
            <div className="text-stone-600 mt-0.5">
              ক্রেতা: {rfq.buyerName} ({rfq.companyName}) · চাহিদা: {rfq.requiredQuantity.toLocaleString()} {rfq.unit}
            </div>
          </div>
          <div className="sm:text-right">
            <span className="text-stone-500 text-[11px] block">ক্রেতার টার্গেট দর:</span>
            <span className="font-bold text-emerald-900 text-sm tabular-nums">৳{rfq.targetPricePerUnit}</span>
            <span className="text-stone-500 text-[11px]"> / {rfq.unit}</span>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="m-4 mb-0 p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form Body */}
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit('submitted');
          }}
          className="p-6 overflow-y-auto flex-1 space-y-4 text-xs"
        >
          {/* Row 1: Price & Quantity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                প্রস্তাবিত একক মূল্য (টাকা / {rfq.unit}) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 font-bold">৳</span>
                <input
                  type="number"
                  required
                  min={1}
                  value={unitPrice}
                  onChange={(e) => {
                    setError('');
                    setUnitPrice(Number(e.target.value));
                  }}
                  className="w-full pl-8 pr-3 py-2 rounded-xl border border-stone-300 font-bold text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-700 tabular-nums"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                সরবরাহযোগ্য পরিমাণ ({rfq.unit}) *
              </label>
              <input
                type="number"
                required
                min={1}
                value={offeredQuantity}
                onChange={(e) => {
                  setError('');
                  setOfferedQuantity(Number(e.target.value));
                }}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 font-bold text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-700 tabular-nums"
              />
              {matchingProduct && (
                <span className="text-[10px] text-stone-500 mt-1 block">
                  আপনার বর্তমান স্টক: {availableStock.toLocaleString()} {rfq.unit}
                </span>
              )}
            </div>
          </div>

          {/* Row 2: Delivery & Shipping */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                সরবরাহের সম্ভাব্য তারিখ
              </label>
              <input
                type="text"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                placeholder="যেমন: ১৫ নভেম্বর ২০২৬"
                className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                পরিবহন খরচ (টাকা)
              </label>
              <input
                type="number"
                min={0}
                value={shippingCost}
                onChange={(e) => setShippingCost(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700 tabular-nums"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                প্যাকেজিং খরচ (টাকা)
              </label>
              <input
                type="number"
                min={0}
                value={packagingCost}
                onChange={(e) => setPackagingCost(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700 tabular-nums"
              />
            </div>
          </div>

          {/* Row 3: Terms & Validity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                পেমেন্টের শর্ত
              </label>
              <input
                type="text"
                value={paymentTerms}
                onChange={(e) => setPaymentTerms(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                মূল্য প্রস্তাবের মেয়াদ
              </label>
              <input
                type="text"
                value={validUntil}
                onChange={(e) => setValidUntil(e.target.value)}
                placeholder="যেমন: ৭ দিন / ১২ নভেম্বর ২০২৬"
                className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700"
              />
            </div>
          </div>

          {/* Row 4: Additional Terms & Comments */}
          <div>
            <label className="block text-xs font-bold text-stone-800 mb-1">
              অতিরিক্ত শর্তাবলি ও প্যাকিং বিবরণ
            </label>
            <input
              type="text"
              value={additionalTerms}
              onChange={(e) => setAdditionalTerms(e.target.value)}
              placeholder="প্যাকিংয়ের ধরন, ল্যাব টেস্ট ইত্যাদি..."
              className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-800 mb-1">
              মন্তব্য বা বিশেষ সুবিধা
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="পণ্য সম্পর্কে ক্রেতার অবগতির জন্য কোনো বিশেষ বার্তা..."
              className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700"
            />
          </div>

          {/* Live Calculated Cost Summary */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between text-xs">
            <div>
              <div className="text-stone-500">পণ্য উপমোট: ৳{totalProductPrice.toLocaleString()}</div>
              <div className="text-stone-500">পরিবহন ও প্যাকিং: ৳{(Number(shippingCost) + Number(packagingCost)).toLocaleString()}</div>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-stone-400 block font-bold uppercase">মোট কোটেশন মূল্য</span>
              <span className="text-lg font-bold text-emerald-950 tabular-nums">৳{grandTotal.toLocaleString()}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold"
            >
              বাতিল করুন
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleSubmit('draft')}
                className="px-4 py-2 rounded-xl border border-stone-300 text-stone-700 font-bold hover:bg-stone-50 flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>খসড়া হিসেবে সংরক্ষণ</span>
              </button>

              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-amber-300" />
                <span>মূল্য প্রস্তাব জমা দিন</span>
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
