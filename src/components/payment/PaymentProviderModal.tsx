import React, { useState } from 'react';
import { 
  Building2, 
  X, 
  CheckCircle2, 
  Smartphone, 
  CreditCard, 
  ShieldCheck, 
  Lock, 
  AlertTriangle, 
  RefreshCw, 
  Phone, 
  Mail,
  Zap,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { FinancialServiceProvider } from '../../types';
import { SAMPLE_PAYMENT_PROVIDERS } from '../../data/escrowMock';

interface PaymentProviderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PaymentProviderModal: React.FC<PaymentProviderModalProps> = ({
  isOpen,
  onClose
}) => {
  const [providers, setProviders] = useState<FinancialServiceProvider[]>(SAMPLE_PAYMENT_PROVIDERS);
  const [testedId, setTestedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleToggleActive = (id: string) => {
    setProviders(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, isActive: !p.isActive };
      }
      return p;
    }));
  };

  const handleTestPing = (id: string) => {
    setTestedId(id);
    setTimeout(() => {
      setTestedId(null);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto font-bengali">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-stone-200 animate-in fade-in">
        
        {/* Header */}
        <div className="p-4 bg-stone-100 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-800 text-amber-300 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-sm sm:text-base">
                অনুমোদিত পেমেন্ট গেটওয়ে ও আর্থিক প্রতিষ্ঠান কনফিগারেশন (§3)
              </h3>
              <p className="text-[11px] text-stone-500">
                পার্বত্য চট্টগ্রাম বিষয়ক মন্ত্রণালয় ও বাংলাদেশ ব্যাংক অনুমোদিত এসক্রো পার্টনার নেটওয়ার্ক
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-xs">
          
          {/* Statutory Notice */}
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
            <div className="space-y-1 text-[11px] leading-relaxed">
              <span className="font-bold block text-emerald-950">
                আর্থিক মধ্যস্থতা ও এসক্রো ট্রাস্ট আইনি সুরক্ষা নীতি:
              </span>
              <p className="text-stone-700">
                Hill eCommerce প্ল্যাটফর্ম কোনো গ্রাহক বা ব্যবসায়ীর অর্থ সরাসরি নিজের তহবিলে জমা বা কাস্টডিতে রাখে না। বাংলাদেশ ব্যাংক অনুমোদিত লাইসেন্সপ্রাপ্ত ব্যাংক এবং এমএফএস প্রতিষ্ঠানসমূহ মন্ত্রণালয় ফ্রেমওয়ার্কের আওতায় ট্রাস্ট এসক্রো হিসাব পরিচালনা করে থাকে।
              </p>
            </div>
          </div>

          {/* Providers List Grid */}
          <div className="space-y-3">
            {providers.map((p) => {
              const isCommercial = p.type === 'commercial_bank';
              const isMFS = p.type === 'mfs';

              return (
                <div 
                  key={p.id}
                  className={`p-4 rounded-xl border transition-all ${
                    p.isActive ? 'bg-white border-stone-200 shadow-2xs' : 'bg-stone-50 border-stone-200 opacity-60'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                        isCommercial ? 'bg-emerald-900 text-amber-300' : isMFS ? 'bg-pink-700 text-white' : 'bg-blue-900 text-white'
                      }`}>
                        {isCommercial ? <Building2 className="w-5 h-5" /> : isMFS ? <Smartphone className="w-5 h-5" /> : <CreditCard className="w-5 h-5" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-stone-900 text-sm">{p.name}</h4>
                          <span className="px-2 py-0.2 rounded text-[10px] font-bold bg-stone-100 text-stone-700 border border-stone-300">
                            {p.typeLabel}
                          </span>
                        </div>
                        <div className="text-[11px] text-stone-500 font-mono">
                          লাইসেন্স নং: {p.licenseNumber} · হেল্পলাইন: {p.contactPhone}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        p.approvalStatus === 'approved' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {p.approvalStatus === 'approved' ? 'মন্ত্রণালয় অনুমোদিত' : 'পর্যালোচনাধীন'}
                      </span>

                      {/* Active toggle button */}
                      <button
                        type="button"
                        onClick={() => handleToggleActive(p.id)}
                        className="text-stone-500 hover:text-emerald-800 p-1 cursor-pointer"
                        title={p.isActive ? 'নিষ্ক্রিয় করুন' : 'সক্রিয় করুন'}
                      >
                        {p.isActive ? (
                          <ToggleRight className="w-7 h-7 text-emerald-700" />
                        ) : (
                          <ToggleLeft className="w-7 h-7 text-stone-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-3 text-[11px]">
                    <div>
                      <span className="text-stone-400 block text-[10px]">সেবার কার্যকারিতা:</span>
                      <span className="font-semibold text-stone-800">{p.serviceEffectiveness}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px]">এসক্রো ট্রাস্ট অ্যাকাউন্ট:</span>
                      <span className="font-mono text-emerald-950 font-bold truncate block">{p.escrowTrustAccount}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px]">ফি ও চার্জ কাঠামো:</span>
                      <span className="font-medium text-stone-700">{p.feeStructure}</span>
                    </div>
                  </div>

                  {/* API Status and Ping Tester */}
                  <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-2">
                      <span className="text-stone-500">API সংযোগ স্ট্যাটাস:</span>
                      <span className="flex items-center gap-1 font-bold text-emerald-800">
                        <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                        {p.apiStatus === 'connected' ? 'সক্রিয় (TLS 1.3 / REST)' : 'পরীক্ষামূলক স্যান্ডবক্স'}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleTestPing(p.id)}
                      className="px-2.5 py-1 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-[10px] flex items-center gap-1 cursor-pointer"
                    >
                      <RefreshCw className={`w-3 h-3 ${testedId === p.id ? 'animate-spin text-emerald-800' : ''}`} />
                      <span>{testedId === p.id ? 'পিংস টেস্ট সফল (200 OK)' : 'API টেস্ট পিং'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Security Compliance Rule (§3) */}
          <div className="p-3 bg-stone-100 rounded-xl text-stone-600 text-[11px] space-y-1">
            <span className="font-bold text-stone-800 block">ডাটা নিরাপত্তা ও গ্রাহক সুরক্ষা বিধান:</span>
            <p>
              প্ল্যাটফর্মে কার্ডের ১৬ ডিজিট নম্বর, সিভিভি, ব্যাংক অ্যাকাউন্টের পিন বা ওটিপি সংরক্ষণ সম্পূর্ণ নিষিদ্ধ। সকল প্রমাণীকরণ ব্যাংক বা এমএফএস প্রতিষ্ঠানের নিজস্ব টু-ফ্যাক্টর সিকিউর ডোমেইনে সম্পন্ন হয়।
            </p>
          </div>

          {/* Close */}
          <div className="flex justify-end pt-2 border-t border-stone-200">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-stone-800 text-white font-bold hover:bg-stone-900 cursor-pointer"
            >
              বন্ধ করুন
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
