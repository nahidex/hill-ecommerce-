import React, { useState } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  BarChart3, 
  Lock, 
  DollarSign, 
  AlertTriangle, 
  RotateCcw, 
  MapPin, 
  Download, 
  FileText, 
  Printer, 
  Eye, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  Scale, 
  Layers
} from 'lucide-react';
import { EscrowRecord, BuyerPaymentTransaction, SellerSettlementItem, RefundRecord, FinancialDisputeRecord } from '../../types';
import { MINISTRY_FINANCIAL_DISTRICT_STATS } from '../../data/escrowMock';
import { PaymentReceiptModal } from './PaymentReceiptModal';
import { FinancialReportsModal } from './FinancialReportsModal';

interface MinistryFinancialDashboardProps {
  escrows: EscrowRecord[];
  transactions: BuyerPaymentTransaction[];
  settlements: SellerSettlementItem[];
  refunds: RefundRecord[];
  disputes: FinancialDisputeRecord[];
  onOpenReports: () => void;
}

export const MinistryFinancialDashboard: React.FC<MinistryFinancialDashboardProps> = ({
  escrows,
  transactions,
  settlements,
  refunds,
  disputes,
  onOpenReports
}) => {
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEscrowForReceipt, setSelectedEscrowForReceipt] = useState<EscrowRecord | null>(null);

  // Financial aggregates
  const totalVolume = transactions.reduce((acc, t) => acc + t.amount, 0);
  const totalCompletedVolume = settlements.filter(s => s.status === 'released').reduce((acc, s) => acc + s.netPayout, 0);
  const activeEscrowHeld = escrows.filter(e => e.status !== 'released' && e.status !== 'refunded').reduce((acc, e) => acc + e.totalAmount, 0);
  const pendingReleaseVolume = escrows.filter(e => e.status === 'awaiting_release').reduce((acc, e) => acc + e.netSellerPayout, 0);
  const totalRefundedVolume = refunds.filter(r => r.status === 'completed').reduce((acc, r) => acc + r.requestedAmount, 0);
  const disputedVolume = escrows.filter(e => e.status === 'paused_dispute').reduce((acc, e) => acc + e.totalAmount, 0);

  const filteredEscrows = escrows.filter(e => {
    if (selectedDistrict !== 'all') {
      const match = e.productName.includes(selectedDistrict) || 
                    e.sellerCompany.includes(selectedDistrict) || 
                    (selectedDistrict === 'রাঙামাটি' && e.productName.includes('আনারস')) ||
                    (selectedDistrict === 'খাগড়াছড়ি' && e.productName.includes('হলুদ')) ||
                    (selectedDistrict === 'বান্দরবান' && e.productName.includes('আম'));
      if (!match) return false;
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        e.escrowNumber.toLowerCase().includes(q) ||
        e.orderNumber.toLowerCase().includes(q) ||
        e.productName.toLowerCase().includes(q) ||
        e.buyerName.toLowerCase().includes(q) ||
        e.sellerName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 font-bengali">
      
      {/* Top Banner with Ministry Emblem */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950 via-emerald-900 to-stone-900 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-stone-950 uppercase tracking-wider">
              মন্ত্রণালয় সেন্ট্রাল অডিট
            </span>
            <span className="text-emerald-300 text-xs">পার্বত্য চট্টগ্রাম বিষয়ক মন্ত্রণালয়</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            পার্বত্য জেলাভিত্তিক ডিজিটাল আর্থিক লেনদেন ও এসক্রো ট্রাস্ট পর্যবেক্ষণ
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 max-w-3xl leading-relaxed">
            রাঙামাটি, বান্দরবান ও খাগড়াছড়ি জেলার এগ্রো-কমার্স ও পাইকারি ট্রেডিংয়ের কেন্দ্রীয় ক্যাশ-ফ্লো, ব্যাংকিং এসক্রো ক্লিয়ারিং, রিফান্ড ও বিরোধ নিষ্পত্তির স্বচ্ছ ডিজিটাল ওভারভিউ।
          </p>

          <div className="pt-3 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenReports}
              className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-stone-950 text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>কেন্দ্রীয় আর্থিক অডিট রিপোর্ট (CSV ও প্রিন্ট)</span>
            </button>
            <div className="text-[11px] text-stone-300 flex items-center gap-1.5 bg-white/10 px-3 py-2 rounded-xl">
              <Clock className="w-3.5 h-3.5 text-amber-300" />
              <span>বাংলাদেশ ব্যাংক অনুমোদিত এসক্রো ট্রাস্ট ফ্রেমওয়ার্ক</span>
            </div>
          </div>
        </div>
      </div>

      {/* STATUTORY & LEGAL DISCLAIMER BANNER (§11 MANDATORY REQUIREMENT) */}
      <div className="p-4 rounded-xl bg-stone-100 border border-stone-300 text-stone-800 text-xs flex items-start gap-3 shadow-2xs">
        <ShieldCheck className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold block text-stone-900">
            মন্ত্রণালয় পর্যবেক্ষণ, সহায়ক ভূমিকা ও আইনি দায়মুক্তি নীতি (§11):
          </span>
          <p className="text-stone-600 text-[11px] leading-relaxed">
            পার্বত্য চট্টগ্রাম বিষয়ক মন্ত্রণালয় ডিজিটাল মার্কেটপ্লেস ও এসক্রো ট্রাস্ট কাঠামোর সেন্ট্রাল মনিটরিং, রিপোর্টিং এবং বাণিজ্যিক মধ্যস্থতা নিশ্চিত করে। 
            মন্ত্রণালয় <strong>গ্রাহকদের তহবিল নিজস্ব তহবিলে জমা রাখে না</strong>, কোনো ক্রেতা-বিক্রেতার বাণিজ্যিক ব্যর্থতার জন্য সরকারি তহবিল থেকে ক্ষতিপূরণ বা পেমেন্ট গ্যারান্টি দেয় না এবং ইচ্ছামাফিক কোনো অর্থ স্থানান্তরের আদেশ জারি করে না। সকল এসক্রো ট্রাস্ট হিসাব লাইসেন্সপ্রাপ্ত ব্যাংক ও এমএফএস পার্টনারদের বিধিসম্মত কাঠামোর অধীন পরিচালিত।
          </p>
        </div>
      </div>

      {/* Aggregated Financial Overview KPIs (§11) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        <div className="p-3.5 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-1">
          <span className="text-[10px] text-stone-500 block leading-tight">মোট লেনদেনের সংখ্যা</span>
          <span className="font-bold text-xl text-stone-900 block">{transactions.length} টি</span>
          <span className="text-[9px] text-stone-400 block">চলতি মৌসুমে</span>
        </div>

        <div className="p-3.5 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-1">
          <span className="text-[10px] text-stone-500 block leading-tight">মোট লেনদেনের মূল্য</span>
          <span className="font-bold text-base text-stone-900 block truncate">
            ৳{totalVolume.toLocaleString('bn-BD')}
          </span>
          <span className="text-[9px] text-emerald-800 block">বাণিজ্যিক টার্নওভার</span>
        </div>

        <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-300 shadow-2xs space-y-1">
          <span className="text-[10px] text-emerald-800 font-bold block leading-tight">সম্পন্ন লেনদেন</span>
          <span className="font-bold text-base text-emerald-950 block truncate">
            ৳{totalCompletedVolume.toLocaleString('bn-BD')}
          </span>
          <span className="text-[9px] text-emerald-700 block">সফলভাবে সেটেলমেন্ট</span>
        </div>

        <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-300 shadow-2xs space-y-1">
          <span className="text-[10px] text-amber-800 font-bold block leading-tight">চলমান Escrow ট্রাস্ট</span>
          <span className="font-bold text-base text-amber-950 block truncate">
            ৳{activeEscrowHeld.toLocaleString('bn-BD')}
          </span>
          <span className="text-[9px] text-amber-700 block">ব্যাংক হেফাজতে লক</span>
        </div>

        <div className="p-3.5 bg-blue-50 rounded-xl border border-blue-200 shadow-2xs space-y-1">
          <span className="text-[10px] text-blue-800 font-semibold block leading-tight">ছাড়ের অপেক্ষায় থাকা</span>
          <span className="font-bold text-base text-blue-950 block truncate">
            ৳{pendingReleaseVolume.toLocaleString('bn-BD')}
          </span>
          <span className="text-[9px] text-blue-700 block">GRN ছাড়পত্র প্রাপ্ত</span>
        </div>

        <div className="p-3.5 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-1">
          <span className="text-[10px] text-stone-500 block leading-tight">ফেরতকৃত অর্থ</span>
          <span className="font-bold text-base text-stone-900 block truncate">
            ৳{totalRefundedVolume.toLocaleString('bn-BD')}
          </span>
          <span className="text-[9px] text-stone-400 block">রিফান্ড কার্যকর</span>
        </div>

        <div className="p-3.5 bg-rose-50 rounded-xl border border-rose-300 shadow-2xs space-y-1">
          <span className="text-[10px] text-rose-800 font-bold block leading-tight">বিরোধপূর্ণ অর্থ</span>
          <span className="font-bold text-base text-rose-950 block truncate">
            ৳{disputedVolume.toLocaleString('bn-BD')}
          </span>
          <span className="text-[9px] text-rose-700 block">{disputes.length} টি মামলা</span>
        </div>
      </div>

      {/* District-wise Financial Volume Cards (3 Hill Districts) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-800" />
            <span>পার্বত্য তিন জেলার আর্থিক ক্যাশ-ফ্লো ও ব্যাংকিং পার্টনার চিত্র</span>
          </h3>
          <span className="text-xs text-stone-500">চলতি অর্থবছর</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {MINISTRY_FINANCIAL_DISTRICT_STATS.map((d) => (
            <div 
              key={d.district}
              onClick={() => setSelectedDistrict(selectedDistrict === d.district ? 'all' : d.district)}
              className={`p-4 rounded-xl border transition-all cursor-pointer shadow-2xs ${
                selectedDistrict === d.district
                  ? 'bg-emerald-50 border-emerald-800 ring-2 ring-emerald-800/20'
                  : 'bg-white border-stone-200 hover:border-emerald-700'
              }`}
            >
              <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                <span className="font-bold text-stone-900 text-base">{d.district} জেলা</span>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                  {d.totalTransactions} টি লেনদেন
                </span>
              </div>

              <div className="py-2.5 space-y-1.5 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>মোট ট্রেড ভলিউম:</span>
                  <span className="font-bold text-stone-900">৳{d.totalVolume.toLocaleString('bn-BD')}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>চলমান এসক্রো তহবিল:</span>
                  <span className="font-bold text-amber-800">৳{d.escrowHeld.toLocaleString('bn-BD')}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>সফলভাবে ছাড়কৃত অর্থ:</span>
                  <span className="font-bold text-emerald-950">৳{d.releasedFunds.toLocaleString('bn-BD')}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>প্রধান ব্যাংকিং পার্টনার:</span>
                  <span className="font-medium text-stone-800">{d.primaryBank}</span>
                </div>
                <div className="pt-2 border-t border-stone-100">
                  <span className="text-stone-400 block text-[10px]">শীর্ষ বিক্রিত কৃষিপণ্য:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {d.topProducts.map((p, i) => (
                      <span key={i} className="text-[10px] bg-stone-100 text-stone-700 px-1.5 py-0.5 rounded">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-2 text-right">
                <span className="text-[11px] text-emerald-800 font-bold hover:underline">
                  {selectedDistrict === d.district ? 'ফিল্টার মুছুন' : 'এই জেলার লেনদেন দেখুন →'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Central Escrow Register for Ministry Oversight */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden">
        <div className="p-4 bg-stone-50 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-emerald-800" />
            <h4 className="font-bold text-stone-900 text-sm">
              কেন্দ্রীয় এসক্রো অডিট রেজিস্ট্রি ({filteredEscrows.length})
            </h4>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="এসক্রো, অর্ডার বা নাম লিখুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg w-48 sm:w-64 focus:ring-1 focus:ring-emerald-700"
              />
            </div>

            {selectedDistrict !== 'all' && (
              <button
                onClick={() => setSelectedDistrict('all')}
                className="px-2.5 py-1 text-xs bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-lg font-semibold"
              >
                ফিল্টার মুছুন
              </button>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 text-[11px]">
              <tr>
                <th className="p-3">এসক্রো নম্বর ও তারিখ</th>
                <th className="p-3">অর্ডার ও পণ্য</th>
                <th className="p-3">ক্রেতা ও বিক্রেতা</th>
                <th className="p-3">আর্থিক প্রতিষ্ঠান</th>
                <th className="p-3 text-right">তহবিলের পরিমাণ (৳)</th>
                <th className="p-3 text-center">এসক্রো স্ট্যাটাস</th>
                <th className="p-3 text-right">রসিদ অডিট</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {filteredEscrows.map((esc) => (
                <tr key={esc.id} className="hover:bg-stone-50/50">
                  <td className="p-3">
                    <div className="font-bold font-mono text-stone-900">{esc.escrowNumber}</div>
                    <div className="text-[10px] text-stone-500 font-mono">{esc.orderNumber}</div>
                    <div className="text-[10px] text-stone-400">{esc.depositDate}</div>
                  </td>
                  <td className="p-3">
                    <div className="font-bold text-stone-900">{esc.productName}</div>
                    <div className="text-[11px] text-emerald-800 font-semibold">{esc.quantity} {esc.unit}</div>
                  </td>
                  <td className="p-3">
                    <div className="text-stone-800 font-medium">ক্রেতা: {esc.buyerName}</div>
                    <div className="text-[10px] text-stone-500">বিক্রেতা: {esc.sellerName}</div>
                  </td>
                  <td className="p-3 text-stone-700 font-medium">{esc.providerName}</td>
                  <td className="p-3 text-right font-bold text-emerald-950 text-sm">
                    ৳{esc.totalAmount.toLocaleString('bn-BD')}
                  </td>
                  <td className="p-3 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      esc.status === 'released' ? 'bg-emerald-100 text-emerald-800' :
                      esc.status === 'paused_dispute' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {esc.statusLabel}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => setSelectedEscrowForReceipt(esc)}
                      className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold text-xs flex items-center gap-1 ml-auto cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>রসিদ</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Receipt Modal */}
      <PaymentReceiptModal
        escrow={selectedEscrowForReceipt}
        isOpen={!!selectedEscrowForReceipt}
        onClose={() => setSelectedEscrowForReceipt(null)}
      />

    </div>
  );
};
