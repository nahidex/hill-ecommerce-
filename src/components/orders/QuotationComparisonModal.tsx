import React from 'react';
import { X, CheckCircle, MessageSquare, Star, ShieldCheck, MapPin, ArrowRight, Truck, DollarSign } from 'lucide-react';
import { RFQItem, QuotationItem } from '../../types';

interface QuotationComparisonModalProps {
  rfq: RFQItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAcceptQuotation: (rfqId: string, quote: QuotationItem) => void;
  onOpenNegotiation: (quote: QuotationItem) => void;
  onOpenChat: (quote: QuotationItem) => void;
}

export const QuotationComparisonModal: React.FC<QuotationComparisonModalProps> = ({
  rfq,
  isOpen,
  onClose,
  onAcceptQuotation,
  onOpenNegotiation,
  onOpenChat
}) => {
  if (!isOpen || !rfq) return null;

  const quotations = rfq.quotations || [];

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto font-bengali">
      <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-4 bg-emerald-950 text-white flex items-center justify-between border-b border-emerald-900">
          <div>
            <div className="text-[10px] text-amber-300 font-bold uppercase tracking-wider">
              RFQ কোটেশন তুলনা ম্যাট্রিক্স
            </div>
            <h3 className="text-base font-bold text-white mt-0.5">
              প্রাপ্ত মূল্য প্রস্তাবসমূহ: {rfq.rfqNumber}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-emerald-200 hover:text-white rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* RFQ Meta Strip */}
        <div className="p-4 bg-stone-50 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div>
            <div className="font-bold text-stone-900 text-sm">{rfq.productRequirement}</div>
            <div className="text-stone-500">
              চাহিদা: {rfq.requiredQuantity.toLocaleString()} {rfq.unit} · টার্গেট দর: ৳{rfq.targetPricePerUnit}/{rfq.unit} · গন্তব্য: {rfq.deliveryLocation || rfq.district}
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold text-xs">
            মোট {quotations.length}টি দরপ্রস্তাব জমা হয়েছে
          </span>
        </div>

        {/* Comparison Table / Cards */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {quotations.length === 0 ? (
            <div className="text-center py-12 text-stone-400 text-xs">
              এখনো কোনো উৎপাদক বা সরবরাহকারী কোটেশন জমা দেননি।
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {quotations.map((quote, idx) => {
                const isAccepted = quote.status === 'accepted';
                const isBestPrice = quote.proposedUnitPrice <= Math.min(...quotations.map(q => q.proposedUnitPrice));

                return (
                  <div 
                    key={quote.id || idx}
                    className={`rounded-2xl border p-4.5 flex flex-col justify-between transition-all ${
                      isAccepted
                        ? 'border-emerald-600 bg-emerald-50/50 shadow-md ring-2 ring-emerald-500/30'
                        : isBestPrice
                          ? 'border-amber-400 bg-amber-50/30 shadow-xs'
                          : 'border-stone-200 bg-white hover:border-stone-300'
                    }`}
                  >
                    <div className="space-y-3">
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2">
                        {isBestPrice ? (
                          <span className="px-2 py-0.5 rounded-md bg-amber-400 text-stone-950 text-[10px] font-bold">
                            সর্বনিম্ন দর প্রস্তাব
                          </span>
                        ) : (
                          <span className="text-[10px] text-stone-400 font-medium">প্রস্তাব #{idx + 1}</span>
                        )}

                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          isAccepted ? 'bg-emerald-800 text-white' : 'bg-stone-100 text-stone-700'
                        }`}>
                          {isAccepted ? 'গৃহীত হয়েছে' : 'বিচারাধীন'}
                        </span>
                      </div>

                      {/* Seller Profile Summary */}
                      <div>
                        <div className="font-bold text-stone-900 text-sm flex items-center gap-1">
                          <span>{quote.sellerName}</span>
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                        </div>
                        <div className="text-xs text-emerald-800 font-semibold">{quote.sellerBusiness}</div>
                        <div className="flex items-center gap-2 text-[11px] text-stone-500 mt-1">
                          <span className="flex items-center gap-0.5 text-amber-600 font-bold">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            <span>{quote.sellerRating}</span>
                          </span>
                          <span>·</span>
                          <span>{quote.sellerDistrict}</span>
                        </div>
                      </div>

                      {/* Price Breakdown */}
                      <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1 text-xs">
                        <div className="flex justify-between items-baseline">
                          <span className="text-stone-500">প্রস্তাবিত একক দর:</span>
                          <span className="text-base font-extrabold text-stone-900 tabular-nums">
                            ৳{quote.proposedUnitPrice}
                            <span className="text-xs font-normal text-stone-500"> / {quote.unit}</span>
                          </span>
                        </div>

                        <div className="flex justify-between text-[11px] text-stone-600">
                          <span>পরিমাণ:</span>
                          <span className="font-semibold tabular-nums">{quote.offeredQuantity} {quote.unit}</span>
                        </div>

                        <div className="flex justify-between text-[11px] text-stone-600">
                          <span>পরিবহন ও প্যাকিং:</span>
                          <span className="font-semibold tabular-nums">৳{(quote.shippingCost + quote.packagingCost).toLocaleString()}</span>
                        </div>

                        <div className="pt-1.5 mt-1 border-t border-stone-200 flex justify-between font-bold text-emerald-950">
                          <span>সর্বমোট প্রস্তাব:</span>
                          <span className="text-sm tabular-nums">৳{quote.totalAmount.toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Timeline & Notes */}
                      <div className="space-y-1 text-[11px] text-stone-600">
                        <div><strong>সম্ভাব্য ডেলিভারি:</strong> {quote.expectedDeliveryDate}</div>
                        <div><strong>মেয়াদ:</strong> {quote.validUntil}</div>
                        {quote.notes && (
                          <p className="text-stone-500 italic line-clamp-2">"{quote.notes}"</p>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-3 mt-3 border-t border-stone-100 space-y-2">
                      {!isAccepted && (
                        <button
                          onClick={() => {
                            onAcceptQuotation(rfq.id, quote);
                            onClose();
                          }}
                          className="w-full py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <CheckCircle className="w-3.5 h-3.5 text-amber-300" />
                          <span>এই প্রস্তাব গ্রহণ করুন</span>
                        </button>
                      )}

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => {
                            onOpenNegotiation(quote);
                          }}
                          className="py-1.5 px-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-[11px] font-bold text-center cursor-pointer"
                        >
                          দর আলোচনা
                        </button>

                        <button
                          onClick={() => onOpenChat(quote)}
                          className="py-1.5 px-2 border border-stone-300 hover:bg-stone-50 text-stone-700 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <MessageSquare className="w-3 h-3 text-stone-500" />
                          <span>যোগাযোগ</span>
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
