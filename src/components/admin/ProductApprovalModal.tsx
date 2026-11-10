import React, { useState } from 'react';
import { 
  X, 
  Package, 
  CheckCircle2, 
  RotateCcw, 
  AlertTriangle, 
  XCircle, 
  Check, 
  MapPin, 
  User, 
  DollarSign, 
  ShieldCheck, 
  Calendar, 
  Clock, 
  FileText,
  Building2,
  Layers
} from 'lucide-react';
import { ProductItem, ProductApprovalStatus } from '../../types';

interface ProductApprovalModalProps {
  product: ProductItem | null;
  isOpen: boolean;
  onClose: () => void;
  currentOfficerName?: string;
  currentOfficerRole?: string;
  onExecuteProductAction: (
    productId: string,
    action: 'approved' | 'needs_correction' | 'rejected' | 'suspended',
    reason: string,
    notes?: string
  ) => void;
}

export const ProductApprovalModal: React.FC<ProductApprovalModalProps> = ({
  product,
  isOpen,
  onClose,
  currentOfficerName = 'সাদিয়া আফরিন মিলি (কোয়ালিটি স্পেশালিস্ট)',
  currentOfficerRole = 'পণ্য ও বাজার তদারক কর্মকর্তা',
  onExecuteProductAction
}) => {
  const [selectedAction, setSelectedAction] = useState<'approved' | 'needs_correction' | 'rejected' | 'suspended' | null>(null);
  const [decisionReason, setDecisionReason] = useState('');
  const [decisionNotes, setDecisionNotes] = useState('');

  if (!isOpen || !product) return null;

  const currentStatus = product.approvalStatus || (product.status === 'pending_approval' ? 'pending_approval' : 'approved');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAction || !decisionReason.trim()) return;

    onExecuteProductAction(product.id, selectedAction, decisionReason, decisionNotes);
    setSelectedAction(null);
    setDecisionReason('');
    setDecisionNotes('');
    onClose();
  };

  const getStatusBadge = (status: ProductApprovalStatus) => {
    switch (status) {
      case 'approved':
        return <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> বাজারে অনুমোদিত</span>;
      case 'pending_approval':
        return <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> অনুমোদনের অপেক্ষায়</span>;
      case 'needs_correction':
        return <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-orange-100 text-orange-900 border border-orange-300 flex items-center gap-1"><RotateCcw className="w-3.5 h-3.5" /> সংশোধন প্রয়োজন</span>;
      case 'rejected':
        return <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-rose-100 text-rose-900 border border-rose-300 flex items-center gap-1"><XCircle className="w-3.5 h-3.5" /> প্রত্যাখ্যাত</span>;
      case 'suspended':
        return <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-stone-200 text-stone-800 border border-stone-400 flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5" /> বাজার স্থগিত</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto font-bengali">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-auto flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-stone-900 px-6 py-5 text-white flex items-center justify-between border-b border-emerald-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-800/80 border border-emerald-700/80 flex items-center justify-center text-amber-400">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono tracking-wide text-emerald-300 font-bold bg-emerald-900/60 px-2 py-0.5 rounded border border-emerald-800">
                  {product.id}
                </span>
                <span className="text-xs text-emerald-200">· {product.category}</span>
              </div>
              <h2 className="text-lg font-bold text-white mt-0.5">{product.name}</h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {getStatusBadge(currentStatus)}
            <button 
              onClick={onClose}
              className="p-1.5 rounded-xl hover:bg-white/10 text-stone-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          
          {/* Top Product Overview */}
          <div className="flex flex-col sm:flex-row items-start gap-4 p-4 rounded-2xl bg-stone-50 border border-stone-200">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-24 h-24 rounded-xl object-cover border border-stone-200 shrink-0" 
            />
            <div className="space-y-1.5 flex-1 min-w-0">
              <h4 className="font-bold text-stone-900 text-sm">{product.name}</h4>
              <p className="text-stone-600 text-[11px] leading-relaxed line-clamp-2">
                {product.description}
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-stone-600 text-[11px] pt-1">
                <span>উৎপাদক: <strong>{product.producerName}</strong></span>
                <span>উৎস: <strong>{product.origin} ({product.district})</strong></span>
                <span>প্রস্তাবিত পাইকারি দর: <strong className="text-emerald-900">৳{product.pricePerUnit} / {product.unit}</strong></span>
                <span>উপলব্ধ স্টক: <strong>{product.availableQuantity.toLocaleString()} {product.unit}</strong></span>
              </div>
            </div>
          </div>

          {/* Quality Specifications */}
          <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-3">
            <h5 className="font-bold text-stone-900 text-xs flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-800" />
              <span>কোয়ালিটি ও সরবরাহ স্পেসিফিকেশন</span>
            </h5>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px]">
              <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-stone-400 block">অর্গানিক স্ট্যাটাস</span>
                <strong className={product.specifications.organic ? 'text-emerald-800' : 'text-stone-800'}>
                  {product.specifications.organic ? '১০০% অর্গানিক জুম' : 'কনভেনশনাল'}
                </strong>
              </div>
              <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-stone-400 block">গ্রেডিং / পিউরিটি</span>
                <strong className="text-stone-800">{product.qualityGrade || product.specifications.purityGrade}</strong>
              </div>
              <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-stone-400 block">প্যাকেজিং ধরন</span>
                <strong className="text-stone-800">{product.specifications.packaging}</strong>
              </div>
              <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-stone-400 block">সংরক্ষণ মেয়াদ (Shelf-life)</span>
                <strong className="text-stone-800">{product.specifications.shelfLife}</strong>
              </div>
            </div>
          </div>

          {/* Pricing Tiers if available */}
          {product.bulkPricingTiers && product.bulkPricingTiers.length > 0 && (
            <div className="space-y-2">
              <h5 className="font-bold text-stone-800 text-xs">বাল্ক প্রাইসিং স্ল্যাব:</h5>
              <div className="grid grid-cols-3 gap-2">
                {product.bulkPricingTiers.map((tier, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-200 text-center">
                    <span className="text-[10px] text-stone-500 block">{tier.minQty} - {tier.maxQty} {product.unit}</span>
                    <strong className="text-emerald-950 font-bold">৳{tier.price} / {product.unit}</strong>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Decision Form (§4) */}
          <form onSubmit={handleSubmit} className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-4">
            <div className="flex items-center justify-between text-stone-700 text-xs">
              <span className="font-bold text-emerald-950">তদারক কর্মকর্তা: {currentOfficerName}</span>
              <span className="text-stone-500">{currentOfficerRole}</span>
            </div>

            <div className="space-y-2">
              <label className="font-bold text-stone-800 block text-xs">
                পণ্য অনুমোদনের প্রশাসনিক সিদ্ধান্ত:
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => { setSelectedAction('approved'); setDecisionReason('পণ্যের মান, গ্রেড ও জিআই ভৌগোলিক শর্ত সন্তোষজনক।'); }}
                  className={`p-2.5 rounded-xl border text-center cursor-pointer transition-all ${
                    selectedAction === 'approved'
                      ? 'border-emerald-600 bg-emerald-100/80 text-emerald-950 ring-2 ring-emerald-600 font-bold'
                      : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-700'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 mx-auto mb-1" />
                  <span>অনুমোদন করুন</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setSelectedAction('needs_correction'); setDecisionReason('প্যাকেজিং বিবরণ ও গ্রেড সার্টিফিকেটে অসংগতি রয়েছে।'); }}
                  className={`p-2.5 rounded-xl border text-center cursor-pointer transition-all ${
                    selectedAction === 'needs_correction'
                      ? 'border-orange-600 bg-orange-100/80 text-orange-950 ring-2 ring-orange-600 font-bold'
                      : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-700'
                  }`}
                >
                  <RotateCcw className="w-4 h-4 text-orange-700 mx-auto mb-1" />
                  <span>সংশোধনে পাঠান</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setSelectedAction('suspended'); setDecisionReason('মানসম্মত নয় বা বাজার নীতিমালার ব্যত্যয়।'); }}
                  className={`p-2.5 rounded-xl border text-center cursor-pointer transition-all ${
                    selectedAction === 'suspended'
                      ? 'border-stone-600 bg-stone-200 text-stone-950 ring-2 ring-stone-600 font-bold'
                      : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-700'
                  }`}
                >
                  <AlertTriangle className="w-4 h-4 text-stone-700 mx-auto mb-1" />
                  <span>স্থগিত করুন</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setSelectedAction('rejected'); setDecisionReason('মিথ্যা তথ্য বা মানহীন পণ্যের কারণে ক্যাটালগ বাতিল।'); }}
                  className={`p-2.5 rounded-xl border text-center cursor-pointer transition-all ${
                    selectedAction === 'rejected'
                      ? 'border-rose-600 bg-rose-100/80 text-rose-950 ring-2 ring-rose-600 font-bold'
                      : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-700'
                  }`}
                >
                  <XCircle className="w-4 h-4 text-rose-700 mx-auto mb-1" />
                  <span>প্রত্যাখ্যান করুন</span>
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-stone-800 block text-xs">
                সিদ্ধান্তের কারণ (বাধ্যতামূলক):
              </label>
              <input
                type="text"
                required
                value={decisionReason}
                onChange={(e) => setDecisionReason(e.target.value)}
                placeholder="যেমন: স্থানীয় ল্যাব রিপোর্ট ও অর্গানিক জুম মানদণ্ড যাচাই সম্পন্ন..."
                className="w-full p-2.5 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-white"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-stone-800 block text-xs">
                মন্তব্য (ঐচ্ছিক):
              </label>
              <input
                type="text"
                value={decisionNotes}
                onChange={(e) => setDecisionNotes(e.target.value)}
                placeholder="উপজেলা কৃষি সম্প্রসারণ অধিদপ্তরের মাঠ রিপোর্ট..."
                className="w-full p-2.5 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-white"
              />
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-stone-300 text-stone-700 rounded-xl font-bold hover:bg-stone-100 cursor-pointer"
              >
                বাতিল
              </button>
              <button
                type="submit"
                disabled={!selectedAction || !decisionReason.trim()}
                className={`px-5 py-2 rounded-xl font-bold text-white shadow-xs cursor-pointer ${
                  !selectedAction || !decisionReason.trim()
                    ? 'bg-stone-300 cursor-not-allowed'
                    : 'bg-emerald-800 hover:bg-emerald-900'
                }`}
              >
                পণ্য অনুমোদন সিদ্ধান্ত কার্যকর
              </button>
            </div>

          </form>

        </div>

      </div>
    </div>
  );
};
