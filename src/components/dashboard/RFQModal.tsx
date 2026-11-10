import React, { useState } from 'react';
import { X, Send, AlertCircle, Building2, Calendar } from 'lucide-react';
import { RFQItem, UserSession } from '../../types';

interface RFQModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitRFQ: (newRFQ: RFQItem) => void;
  buyer: UserSession;
}

export const RFQModal: React.FC<RFQModalProps> = ({ isOpen, onClose, onSubmitRFQ, buyer }) => {
  const [productRequirement, setProductRequirement] = useState('');
  const [category, setCategory] = useState('ফলমূল');
  const [requiredQuantity, setRequiredQuantity] = useState<number>(1000);
  const [unit, setUnit] = useState('পিস');
  const [targetPrice, setTargetPrice] = useState<number>(35);
  const [requiredDeliveryDate, setRequiredDeliveryDate] = useState('২৫ নভেম্বর ২০২৬');
  const [district, setDistrict] = useState('বান্দরবান');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productRequirement.trim()) {
      setError('পণ্য বা ক্রয়ের বিস্তারিত চাহিদা লিখুন');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const newRFQ: RFQItem = {
        id: `rfq-${Date.now()}`,
        rfqNumber: `RFQ-CHT-2026-${Math.floor(100 + Math.random() * 900)}`,
        buyerName: buyer.name,
        companyName: buyer.businessName || 'পাইকারি করপোরেট প্রতিষ্ঠান',
        productRequirement,
        category,
        requiredQuantity: Number(requiredQuantity),
        unit,
        targetPricePerUnit: Number(targetPrice),
        requiredDeliveryDate,
        district,
        status: 'open',
        quotationCount: 0,
        date: 'আজ'
      };

      onSubmitRFQ(newRFQ);
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in">
        
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50">
          <div>
            <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
              Request for Quotation (RFQ)
            </div>
            <h3 className="text-base font-bold text-stone-900 mt-0.5">
              নতুন পাইকারি ক্রয় অনুরোধ আহ্বান করুন
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              প্রয়োজনীয় পণ্য ও জাত <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="যেমন: ৩,০০০ কেজি কাঁচা পাহাড়ি হলুদ / ২,০০০ পিস আনারস"
              value={productRequirement}
              onChange={(e) => setProductRequirement(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                পণ্যের ক্যাটাগরি
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700"
              >
                <option value="ফলমূল">ফলমূল</option>
                <option value="মসলা ও খাদ্যপণ্য">মসলা ও খাদ্যপণ্য</option>
                <option value="কৃষিপণ্য">কৃষিপণ্য</option>
                <option value="ঐতিহ্যবাহী পোশাক">ঐতিহ্যবাহী পোশাক</option>
                <option value="বাঁশ ও বেতের পণ্য">বাঁশ ও বেতের পণ্য</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                পছন্দসই পার্বত্য জেলা
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700"
              >
                <option value="বান্দরবান">বান্দরবান</option>
                <option value="রাঙামাটি">রাঙামাটি</option>
                <option value="খাগড়াছড়ি">খাগড়াছড়ি</option>
                <option value="যেকোনো পার্বত্য জেলা">যেকোনো পার্বত্য জেলা</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                প্রয়োজনীয় পরিমাণ
              </label>
              <input
                type="number"
                required
                min={1}
                value={requiredQuantity}
                onChange={(e) => setRequiredQuantity(Number(e.target.value))}
                className="w-full text-xs px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700 tabular-nums"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                পরিমাপের একক
              </label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700"
              >
                <option value="পিস">পিস</option>
                <option value="কেজি">কেজি</option>
                <option value="মণ">মণ</option>
                <option value="টন">টন</option>
                <option value="হালি">হালি</option>
                <option value="সেট">সেট</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                টার্গেট মূল্য (৳)
              </label>
              <input
                type="number"
                min={1}
                value={targetPrice}
                onChange={(e) => setTargetPrice(Number(e.target.value))}
                className="w-full text-xs px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700 tabular-nums"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              প্রত্যাশিত সরবরাহের তারিখ
            </label>
            <input
              type="text"
              value={requiredDeliveryDate}
              onChange={(e) => setRequiredDeliveryDate(e.target.value)}
              placeholder="যেমন: ২৫ নভেম্বর ২০২৬"
              className="w-full text-xs px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700"
            />
          </div>

          <div className="pt-3 border-t border-stone-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-stone-600 hover:bg-stone-100"
            >
              বাতিল
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 rounded-lg text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 shadow-sm transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-70"
            >
              <Send className="w-3.5 h-3.5 text-amber-300" />
              <span>{isSubmitting ? 'পোস্ট হচ্ছে...' : 'RFQ আহ্বান করুন'}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
