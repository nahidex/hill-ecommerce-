import React, { useState } from 'react';
import { 
  BarChart3, 
  X, 
  Download, 
  Printer, 
  Calendar, 
  Filter, 
  FileSpreadsheet, 
  DollarSign, 
  ShieldCheck, 
  Clock, 
  CreditCard,
  Building2,
  RotateCcw,
  AlertTriangle
} from 'lucide-react';
import { EscrowRecord, BuyerPaymentTransaction, SellerSettlementItem, RefundRecord } from '../../types';

interface FinancialReportsModalProps {
  escrows: EscrowRecord[];
  transactions: BuyerPaymentTransaction[];
  settlements: SellerSettlementItem[];
  refunds: RefundRecord[];
  isOpen: boolean;
  onClose: () => void;
}

type ReportType = 
  | 'daily'
  | 'monthly'
  | 'buyer_wise'
  | 'seller_wise'
  | 'district_wise'
  | 'method_wise'
  | 'escrow_trust'
  | 'release_settlement'
  | 'refunds'
  | 'disputes';

const REPORT_TABS: { key: ReportType; label: string; icon: any }[] = [
  { key: 'daily', label: 'দৈনিক লেনদেন প্রতিবেদন', icon: Calendar },
  { key: 'monthly', label: 'মাসিক লেনদেন প্রতিবেদন', icon: BarChart3 },
  { key: 'buyer_wise', label: 'ক্রেতাভিত্তিক লেনদেন', icon: CreditCard },
  { key: 'seller_wise', label: 'বিক্রেতাভিত্তিক লেনদেন', icon: Building2 },
  { key: 'district_wise', label: 'জেলা অনুযায়ী লেনদেন', icon: Filter },
  { key: 'method_wise', label: 'পেমেন্ট পদ্ধতিভিত্তিক', icon: DollarSign },
  { key: 'escrow_trust', label: 'Escrow ট্রাস্ট ব্যালেন্স', icon: ShieldCheck },
  { key: 'release_settlement', label: 'অর্থ ছাড় ও সেটেলমেন্ট', icon: Clock },
  { key: 'refunds', label: 'রিফান্ড ও অর্থ ফেরত', icon: RotateCcw },
  { key: 'disputes', label: 'বিরোধ নিষ্পত্তি রিপোর্ট', icon: AlertTriangle }
];

export const FinancialReportsModal: React.FC<FinancialReportsModalProps> = ({
  escrows,
  transactions,
  settlements,
  refunds,
  isOpen,
  onClose
}) => {
  const [activeReport, setActiveReport] = useState<ReportType>('daily');
  const [districtFilter, setDistrictFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  if (!isOpen) return null;

  // Total metrics
  const totalVolume = transactions.reduce((acc, t) => acc + t.amount, 0);
  const escrowHeld = escrows.filter(e => e.status !== 'released' && e.status !== 'refunded').reduce((acc, e) => acc + e.totalAmount, 0);
  const totalReleased = settlements.filter(s => s.status === 'released').reduce((acc, s) => acc + s.netPayout, 0);
  const totalRefunded = refunds.filter(r => r.status === 'completed').reduce((acc, r) => acc + r.requestedAmount, 0);

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    const headers = 'আইডি,অর্ডার_নম্বর,ক্রেতা,বিক্রেতা,পণ্য,পরিমাণ_টাকা,পদ্ধতি,স্ট্যাটাস,তারিখ\n';
    const rows = transactions.map(t => 
      `"${t.transactionNumber}","${t.orderNumber}","${t.buyerName || 'ক্রেতা'}","${t.sellerName}","${t.productName}","${t.amount}","${t.paymentMethodLabel}","${t.statusLabel}","${t.transactionDate}"`
    ).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Hill_eCommerce_Financial_Report_${activeReport}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto font-bengali">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-stone-200">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-stone-100 border-b border-stone-200 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-900 text-amber-400 flex items-center justify-center">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-base">আর্থিক লেনদেন ও এসক্রো অডিট প্রতিবেদন (§12)</h3>
              <p className="text-xs text-stone-500">পার্বত্য চট্টগ্রাম বিষয়ক মন্ত্রণালয় · কেন্দ্রীয় আর্থিক তথ্য রেজিস্ট্রি</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="px-3 py-1.5 rounded-lg bg-white border border-stone-300 hover:bg-stone-50 text-stone-800 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-800" />
              <span>CSV এক্সপোর্ট</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Printer className="w-4 h-4" />
              <span>রিপোর্ট প্রিন্ট</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Report 10 Selector Tabs */}
        <div className="p-3 bg-stone-50 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs print:hidden">
          <div className="flex items-center gap-1 overflow-x-auto pb-1 max-w-full">
            {REPORT_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeReport === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveReport(tab.key)}
                  className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 shrink-0 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-emerald-900 text-white shadow-2xs'
                      : 'text-stone-600 hover:bg-stone-200 hover:text-stone-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <select
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
              className="bg-white border border-stone-300 rounded-lg px-2.5 py-1 text-xs font-medium focus:ring-1 focus:ring-emerald-700"
            >
              <option value="all">সমগ্র পার্বত্য অঞ্চল (সব জেলা)</option>
              <option value="রাঙামাটি">রাঙামাটি</option>
              <option value="খাগড়াছড়ি">খাগড়াছড়ি</option>
              <option value="বান্দরবান">বান্দরবান</option>
            </select>
          </div>
        </div>

        {/* Report Body */}
        <div className="p-6 overflow-y-auto space-y-6 font-bengali text-xs">
          
          {/* Top 4 Financial Summary KPI Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl border border-stone-200 bg-stone-50">
              <span className="text-stone-500 block text-[10px]">মোট লেনদেন ভলিউম:</span>
              <span className="font-bold text-stone-900 text-lg">৳{totalVolume.toLocaleString('bn-BD')}</span>
              <span className="text-[10px] text-stone-400 block">{transactions.length} টি লেনদেন</span>
            </div>

            <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50">
              <span className="text-amber-800 block text-[10px]">বর্তমান এসক্রো ট্রাস্ট ব্যালেন্স:</span>
              <span className="font-bold text-amber-950 text-lg">৳{escrowHeld.toLocaleString('bn-BD')}</span>
              <span className="text-[10px] text-amber-700 block">ব্যাংক হেফাজতে সংরক্ষিত</span>
            </div>

            <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50">
              <span className="text-emerald-800 block text-[10px]">বিক্রেতার অনুকূলে ছাড়কৃত:</span>
              <span className="font-bold text-emerald-950 text-lg">৳{totalReleased.toLocaleString('bn-BD')}</span>
              <span className="text-[10px] text-emerald-700 block">GRN যাচাই সাপেক্ষে</span>
            </div>

            <div className="p-3.5 rounded-xl border border-rose-200 bg-rose-50">
              <span className="text-rose-800 block text-[10px]">ফেরতকৃত রিফান্ড ভলিউম:</span>
              <span className="font-bold text-rose-950 text-lg">৳{totalRefunded.toLocaleString('bn-BD')}</span>
              <span className="text-[10px] text-rose-700 block">নিষ্পত্তিকৃত রিফান্ড</span>
            </div>
          </div>

          {/* Table Render according to Active Tab */}
          <div className="border border-stone-200 rounded-xl overflow-hidden bg-white shadow-2xs">
            <div className="p-3.5 bg-stone-100 border-b border-stone-200 flex items-center justify-between font-bold text-stone-900">
              <span>{REPORT_TABS.find(t => t.key === activeReport)?.label} – ডাটা রেজিস্ট্রি</span>
              <span className="text-[11px] text-stone-500 font-normal">
                সর্বশেষ হালনাগাদ: আজ সকাল ১১:০০ টা
              </span>
            </div>

            <div className="overflow-x-auto">
              {activeReport === 'escrow_trust' ? (
                <table className="w-full text-left">
                  <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 text-[11px]">
                    <tr>
                      <th className="p-3">এসক্রো নম্বর ও অর্ডার</th>
                      <th className="p-3">পণ্য ও পক্ষগণ</th>
                      <th className="p-3">তহবিল পরিমাণ</th>
                      <th className="p-3">আর্থিক প্রতিষ্ঠান</th>
                      <th className="p-3">সম্ভাব্য অর্থ ছাড়ের তারিখ</th>
                      <th className="p-3 text-center">স্ট্যাটাস</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {escrows.map(e => (
                      <tr key={e.id} className="hover:bg-stone-50/50">
                        <td className="p-3">
                          <div className="font-bold font-mono text-stone-900">{e.escrowNumber}</div>
                          <div className="text-[10px] text-stone-500 font-mono">{e.orderNumber}</div>
                        </td>
                        <td className="p-3">
                          <div className="font-semibold text-stone-900">{e.productName}</div>
                          <div className="text-[10px] text-stone-500">ক্রেতা: {e.buyerName} · বিক্রেতা: {e.sellerName}</div>
                        </td>
                        <td className="p-3 font-bold text-emerald-950">
                          ৳{e.totalAmount.toLocaleString('bn-BD')}
                        </td>
                        <td className="p-3 text-stone-700">{e.providerName}</td>
                        <td className="p-3 text-stone-600">{e.expectedReleaseDate}</td>
                        <td className="p-3 text-center">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            e.status === 'released' ? 'bg-emerald-100 text-emerald-800' :
                            e.status === 'paused_dispute' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {e.statusLabel}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : activeReport === 'release_settlement' ? (
                <table className="w-full text-left">
                  <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 text-[11px]">
                    <tr>
                      <th className="p-3">সেটেলমেন্ট নম্বর</th>
                      <th className="p-3">অর্ডার ও পণ্য</th>
                      <th className="p-3">মোট বিক্রয়মূল্য</th>
                      <th className="p-3">কর্তন / ফি</th>
                      <th className="p-3">বিক্রেতার নিট প্রাপ্তি</th>
                      <th className="p-3 text-center">ছাড়ের অবস্থা</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {settlements.map(s => (
                      <tr key={s.id} className="hover:bg-stone-50/50">
                        <td className="p-3 font-mono font-bold text-stone-900">{s.settlementNumber}</td>
                        <td className="p-3">
                          <div className="font-bold text-stone-900">{s.productName}</div>
                          <div className="text-[10px] text-stone-500">{s.buyerCompany}</div>
                        </td>
                        <td className="p-3 font-medium text-stone-900">৳{s.orderValue.toLocaleString('bn-BD')}</td>
                        <td className="p-3 text-rose-700">৳{(s.platformFeeAmount + s.bankCharge).toLocaleString('bn-BD')}</td>
                        <td className="p-3 font-bold text-emerald-950">৳{s.netPayout.toLocaleString('bn-BD')}</td>
                        <td className="p-3 text-center">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            s.status === 'released' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {s.statusLabel}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <table className="w-full text-left">
                  <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 text-[11px]">
                    <tr>
                      <th className="p-3">ট্রানজেকশন নম্বর ও তারিখ</th>
                      <th className="p-3">অর্ডার ও পণ্য</th>
                      <th className="p-3">বিক্রেতা / প্রাপক</th>
                      <th className="p-3">পেমেন্ট মাধ্যম</th>
                      <th className="p-3 text-right">পরিমাণ (৳)</th>
                      <th className="p-3 text-center">স্ট্যাটাস</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {transactions.map(t => (
                      <tr key={t.id} className="hover:bg-stone-50/50">
                        <td className="p-3">
                          <div className="font-bold font-mono text-stone-900">{t.transactionNumber}</div>
                          <div className="text-[10px] text-stone-500">{t.transactionDate}</div>
                        </td>
                        <td className="p-3">
                          <div className="font-bold text-stone-900">{t.productName}</div>
                          <div className="text-[10px] text-stone-500 font-mono">{t.orderNumber}</div>
                        </td>
                        <td className="p-3 text-stone-800 font-semibold">{t.sellerName}</td>
                        <td className="p-3 text-stone-700">{t.paymentMethodLabel}</td>
                        <td className="p-3 text-right font-bold text-emerald-950 text-sm">
                          ৳{t.amount.toLocaleString('bn-BD')}
                        </td>
                        <td className="p-3 text-center">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            {t.statusLabel}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Ministry Regulatory Sign-off */}
          <div className="p-3.5 rounded-xl border border-stone-200 bg-stone-50 text-[11px] text-stone-600 flex items-center justify-between">
            <div>
              <strong>আর্থিক প্রত্যয়ন:</strong> পার্বত্য চট্টগ্রাম বিষয়ক মন্ত্রণালয় ডিজিটাল মার্কেটপ্লেস এসক্রো ফ্রেমওয়ার্ক অনুসারে প্রতিবেদনটি স্বয়ংক্রিয়ভাবে সংকলিত।
            </div>
            <div className="font-mono text-stone-400">তারিখ: {new Date().toLocaleDateString('bn-BD')}</div>
          </div>

        </div>

      </div>
    </div>
  );
};
