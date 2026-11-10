import React, { useState } from 'react';
import { 
  Lock, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownLeft, 
  CreditCard, 
  Building2, 
  Smartphone, 
  AlertTriangle, 
  RotateCcw, 
  FileText, 
  Printer, 
  Eye, 
  Download, 
  Search, 
  Filter, 
  BarChart3, 
  ChevronRight, 
  ShieldAlert,
  Scale,
  PlusCircle,
  ExternalLink
} from 'lucide-react';
import { 
  UserSession, 
  EscrowRecord, 
  BuyerPaymentTransaction, 
  SellerSettlementItem, 
  RefundRecord, 
  FinancialDisputeRecord, 
  FinancialServiceProvider,
  PaymentMethodType
} from '../../types';
import { PaymentReceiptModal } from './PaymentReceiptModal';
import { BuyerPaymentModal } from './BuyerPaymentModal';
import { PaymentReleaseModal } from './PaymentReleaseModal';
import { RefundManagementModal } from './RefundManagementModal';
import { TransactionDisputeModal } from './TransactionDisputeModal';
import { PaymentProviderModal } from './PaymentProviderModal';
import { FinancialReportsModal } from './FinancialReportsModal';

interface PaymentEscrowDashboardProps {
  user: UserSession;
  escrows: EscrowRecord[];
  transactions: BuyerPaymentTransaction[];
  settlements: SellerSettlementItem[];
  refunds: RefundRecord[];
  disputes: FinancialDisputeRecord[];
  onConfirmRelease: (escrowId: string, note: string) => void;
  onPauseDispute: (escrowId: string, reason: string) => void;
  onRequestRefund: (refundData: any) => void;
  onApproveRefund: (refundId: string) => void;
  onSubmitDispute: (disputeData: any) => void;
  onResolveDispute: (disputeId: string, summary: string) => void;
}

export const PaymentEscrowDashboard: React.FC<PaymentEscrowDashboardProps> = ({
  user,
  escrows,
  transactions,
  settlements,
  refunds,
  disputes,
  onConfirmRelease,
  onPauseDispute,
  onRequestRefund,
  onApproveRefund,
  onSubmitDispute,
  onResolveDispute
}) => {
  // Navigation sub-tab inside Payment & Escrow module
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'escrow' | 'buyer_tx' | 'seller_settlement' | 'refunds' | 'disputes'>(
    user.role === 'buyer' ? 'buyer_tx' : 'overview'
  );
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [selectedReceiptTx, setSelectedReceiptTx] = useState<BuyerPaymentTransaction | null>(null);
  const [selectedReceiptEscrow, setSelectedReceiptEscrow] = useState<EscrowRecord | null>(null);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);

  const [selectedEscrowForRelease, setSelectedEscrowForRelease] = useState<EscrowRecord | null>(null);
  const [isReleaseModalOpen, setIsReleaseModalOpen] = useState(false);

  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);
  const [isDisputeModalOpen, setIsDisputeModalOpen] = useState(false);
  const [isProviderModalOpen, setIsProviderModalOpen] = useState(false);
  const [isReportsModalOpen, setIsReportsModalOpen] = useState(false);

  // 8 Summary Cards Calculations (§2)
  const totalTransactionsCount = transactions.length;
  const totalPaymentVolume = transactions.reduce((acc, t) => acc + t.amount, 0);
  const escrowHeldAmount = escrows
    .filter(e => e.status !== 'released' && e.status !== 'refunded')
    .reduce((acc, e) => acc + e.totalAmount, 0);
  const pendingReleaseAmount = escrows
    .filter(e => e.status === 'awaiting_release')
    .reduce((acc, e) => acc + e.netSellerPayout, 0);
  const releasedFundsAmount = settlements
    .filter(s => s.status === 'released')
    .reduce((acc, s) => acc + s.netPayout, 0);
  const refundedAmount = refunds
    .filter(r => r.status === 'completed')
    .reduce((acc, r) => acc + r.requestedAmount, 0);
  const activeDisputeCount = disputes.filter(d => d.status !== 'resolved').length;
  const failedTransactionsCount = transactions.filter(t => t.status === 'failed').length;

  const handleOpenReceiptForTx = (tx: BuyerPaymentTransaction) => {
    setSelectedReceiptTx(tx);
    const matchedEscrow = escrows.find(e => e.escrowNumber === tx.escrowNumber);
    setSelectedReceiptEscrow(matchedEscrow || null);
    setIsReceiptOpen(true);
  };

  const handleOpenReceiptForEscrow = (esc: EscrowRecord) => {
    setSelectedReceiptEscrow(esc);
    const matchedTx = transactions.find(t => t.escrowNumber === esc.escrowNumber);
    setSelectedReceiptTx(matchedTx || null);
    setIsReceiptOpen(true);
  };

  const handleOpenReleaseForEscrow = (esc: EscrowRecord) => {
    setSelectedEscrowForRelease(esc);
    setIsReleaseModalOpen(true);
  };

  return (
    <div className="space-y-6 font-bengali">
      
      {/* 1. Header Banner with Ministry Escrow Trust Seal */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950 via-emerald-900 to-stone-900 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-stone-950 uppercase tracking-wider">
                মন্ত্রণালয় এসক্রো ফ্রেমওয়ার্ক
              </span>
              <span className="text-emerald-300 text-xs">সোনালী ব্যাংক পিএলসি এসক্রো ট্রাস্ট পার্টনার</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              পেমেন্ট, এসক্রো ও নিরাপদ আর্থিক লেনদেন পোর্টাল
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
              পাহাড়ি উৎপাদক ও পাইকারি ক্রেতাদের মধ্যে শতভাগ এসক্রো ট্রাস্ট সুরক্ষিত লেনদেন। পণ্য গ্রহণ ও গুণগত মান সন্তুষ্টির পরই ব্যাংক কর্তৃক বিক্রেতার হিসাবে অর্থ ছাড় নিশ্চিত করা হয়।
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => setIsProviderModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 border border-white/20 transition-colors cursor-pointer"
            >
              <Building2 className="w-4 h-4 text-amber-300" />
              <span>অনুমোদিত ব্যাংক ও গেটওয়ে (§3)</span>
            </button>
            <button
              onClick={() => setIsReportsModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
            >
              <BarChart3 className="w-4 h-4" />
              <span>আর্থিক অডিট রিপোর্ট (§12)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Prototype Real Money Safety Banner (§1, §3, §14) */}
      <div className="p-3.5 rounded-xl bg-stone-100 border border-stone-300 text-stone-700 text-xs flex items-start gap-2.5 shadow-2xs">
        <ShieldCheck className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
        <div className="text-[11px] leading-relaxed">
          <strong>নিরাপত্তা ও প্রোটোটাইপ স্পষ্টীকরণ:</strong> এই প্ল্যাটফর্ম কোনো বাস্তব টাকা সরাসরি নিজের কাছে রাখে না। প্রদর্শিত সকল লেনদেন ও এসক্রো ট্রাস্ট ব্যালেন্স মন্ত্রণালয়ের প্রস্তাবিত ফিনটেক প্রোটোটাইপ প্রদর্শনীর অংশ। লাইসেন্সপ্রাপ্ত তফসিলি ব্যাংকিং এপিআই চুক্তির পরই আসল ব্যাংকিং সেটেলমেন্ট সচল হবে।
        </div>
      </div>

      {/* 2. 8 Financial Summary Cards (§2) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        
        {/* Card 1: মোট লেনদেন */}
        <div className="p-3.5 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-1">
          <span className="text-[10px] text-stone-500 font-semibold block leading-tight">মোট লেনদেন</span>
          <span className="font-bold text-lg text-stone-900 block">{totalTransactionsCount} টি</span>
          <span className="text-[9px] text-stone-400 block">কার্যকর চালান</span>
        </div>

        {/* Card 2: মোট পেমেন্ট পরিমাণ */}
        <div className="p-3.5 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-1">
          <span className="text-[10px] text-stone-500 font-semibold block leading-tight">মোট পেমেন্ট</span>
          <span className="font-bold text-base text-stone-900 block truncate">
            ৳{totalPaymentVolume.toLocaleString('bn-BD')}
          </span>
          <span className="text-[9px] text-emerald-700 block">সম্পাদিত ভলিউম</span>
        </div>

        {/* Card 3: Escrow-তে সংরক্ষিত */}
        <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-300 shadow-2xs space-y-1">
          <span className="text-[10px] text-amber-800 font-bold block leading-tight">Escrow-তে সংরক্ষিত</span>
          <span className="font-bold text-base text-amber-950 block truncate">
            ৳{escrowHeldAmount.toLocaleString('bn-BD')}
          </span>
          <span className="text-[9px] text-amber-700 block">ব্যাংকে লক করা</span>
        </div>

        {/* Card 4: ছাড়ের অপেক্ষায় */}
        <div className="p-3.5 bg-blue-50 rounded-xl border border-blue-200 shadow-2xs space-y-1">
          <span className="text-[10px] text-blue-800 font-semibold block leading-tight">ছাড়ের অপেক্ষায়</span>
          <span className="font-bold text-base text-blue-950 block truncate">
            ৳{pendingReleaseAmount.toLocaleString('bn-BD')}
          </span>
          <span className="text-[9px] text-blue-700 block">GRN যাচাইকৃত</span>
        </div>

        {/* Card 5: বিক্রেতায় ছাড়কৃত */}
        <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-300 shadow-2xs space-y-1">
          <span className="text-[10px] text-emerald-800 font-bold block leading-tight">বিক্রেতায় ছাড়কৃত</span>
          <span className="font-bold text-base text-emerald-950 block truncate">
            ৳{releasedFundsAmount.toLocaleString('bn-BD')}
          </span>
          <span className="text-[9px] text-emerald-700 block">ব্যাংক হিসাবে স্থানান্তরিত</span>
        </div>

        {/* Card 6: ফেরতকৃত অর্থ */}
        <div className="p-3.5 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-1">
          <span className="text-[10px] text-stone-500 font-semibold block leading-tight">ফেরতকৃত অর্থ</span>
          <span className="font-bold text-base text-stone-900 block truncate">
            ৳{refundedAmount.toLocaleString('bn-BD')}
          </span>
          <span className="text-[9px] text-stone-400 block">রিফান্ড সম্পন্ন</span>
        </div>

        {/* Card 7: বিরোধপূর্ণ লেনদেন */}
        <div className="p-3.5 bg-rose-50 rounded-xl border border-rose-300 shadow-2xs space-y-1">
          <span className="text-[10px] text-rose-800 font-bold block leading-tight">বিরোধপূর্ণ চালান</span>
          <span className="font-bold text-lg text-rose-700 block">{activeDisputeCount} টি</span>
          <span className="text-[9px] text-rose-600 block">অর্থ ছাড় স্থগিত</span>
        </div>

        {/* Card 8: ব্যর্থ লেনদেন */}
        <div className="p-3.5 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-1">
          <span className="text-[10px] text-stone-500 font-semibold block leading-tight">ব্যর্থ লেনদেন</span>
          <span className="font-bold text-lg text-stone-600 block">{failedTransactionsCount} টি</span>
          <span className="text-[9px] text-stone-400 block">বাতিল / অসম্পূর্ণ</span>
        </div>

      </div>

      {/* 3. Sub-Module Navigation Tabs */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs p-2 flex flex-wrap items-center justify-between gap-2 text-xs">
        
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          <button
            onClick={() => setActiveSubTab('overview')}
            className={`px-3.5 py-2 rounded-xl font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeSubTab === 'overview'
                ? 'bg-emerald-900 text-white shadow-2xs'
                : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>এসক্রো ট্রাস্ট ওভারভিউ (§2)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('escrow')}
            className={`px-3.5 py-2 rounded-xl font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeSubTab === 'escrow'
                ? 'bg-emerald-900 text-white shadow-2xs'
                : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>এসক্রো ম্যানেজমেন্ট লেজার (§5)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('buyer_tx')}
            className={`px-3.5 py-2 rounded-xl font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeSubTab === 'buyer_tx'
                ? 'bg-emerald-900 text-white shadow-2xs'
                : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>আমার লেনদেন ও রসিদ (§7)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('seller_settlement')}
            className={`px-3.5 py-2 rounded-xl font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeSubTab === 'seller_settlement'
                ? 'bg-emerald-900 text-white shadow-2xs'
                : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>বিক্রেতা অর্থ ছাড় ও সেটেলমেন্ট (§6)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('refunds')}
            className={`px-3.5 py-2 rounded-xl font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeSubTab === 'refunds'
                ? 'bg-emerald-900 text-white shadow-2xs'
                : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>রিফান্ড ও অর্থ ফেরত (§9)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('disputes')}
            className={`px-3.5 py-2 rounded-xl font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeSubTab === 'disputes'
                ? 'bg-emerald-900 text-white shadow-2xs'
                : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>আর্থিক বিরোধ ও সালিশি (§10)</span>
          </button>
        </div>

        {/* Global Quick Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRefundModalOpen(true)}
            className="px-3 py-1.5 rounded-lg border border-stone-300 hover:bg-stone-50 text-stone-700 font-semibold flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3 text-emerald-800" />
            <span>রিফান্ড আবেদন</span>
          </button>
          <button
            onClick={() => setIsDisputeModalOpen(true)}
            className="px-3 py-1.5 rounded-lg border border-rose-300 bg-rose-50 hover:bg-rose-100 text-rose-800 font-semibold flex items-center gap-1 cursor-pointer"
          >
            <AlertTriangle className="w-3 h-3 text-rose-700" />
            <span>বিরোধ মামলা</span>
          </button>
        </div>

      </div>

      {/* 4. SUB-TAB VIEWPORT RENDERING */}

      {/* TAB A: OVERVIEW & VOLUME CHARTS (§2) */}
      {activeSubTab === 'overview' && (
        <div className="space-y-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left 2 Cols: Monthly Payment Volume Chart & Settlement Stream */}
            <div className="lg:col-span-2 p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-emerald-800" />
                  <span>মাসিক পেমেন্ট ভলিউম ও এসক্রো ট্রাস্ট ফ্লো</span>
                </h3>
                <span className="text-xs text-stone-500">চলতি অর্থবছর ২০২৬</span>
              </div>

              {/* Graphical Bar Stream Visualization */}
              <div className="space-y-3 pt-2">
                {[
                  { month: 'অক্টোবর ২০২৬', volume: 3850000, percentage: 76, released: 3500000, escrow: 350000 },
                  { month: 'নভেম্বর ২০২৬ (চলতি)', volume: 4650000, percentage: 92, released: 2150000, escrow: 2500000 },
                  { month: 'ডিসেম্বর ২০২৬ (প্রক্ষেপিত)', volume: 5200000, percentage: 100, released: 0, escrow: 0 }
                ].map((bar, i) => (
                  <div key={i} className="space-y-1 text-xs">
                    <div className="flex justify-between font-semibold">
                      <span className="text-stone-800">{bar.month}</span>
                      <span className="text-stone-900 font-bold">৳{bar.volume.toLocaleString('bn-BD')}</span>
                    </div>
                    <div className="w-full bg-stone-100 h-3 rounded-full overflow-hidden flex">
                      <div 
                        className="bg-emerald-800 h-full" 
                        style={{ width: `${(bar.released / bar.volume) * 100 || 0}%` }} 
                        title={`ছাড়কৃত: ৳${bar.released.toLocaleString('bn-BD')}`}
                      />
                      <div 
                        className="bg-amber-400 h-full" 
                        style={{ width: `${(bar.escrow / bar.volume) * 100 || 0}%` }} 
                        title={`এসক্রো সংরক্ষিত: ৳${bar.escrow.toLocaleString('bn-BD')}`}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-stone-500">
                      <span>ছাড়কৃত: ৳{bar.released.toLocaleString('bn-BD')}</span>
                      <span>এসক্রো ব্যালেন্স: ৳{bar.escrow.toLocaleString('bn-BD')}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Payment Method Breakdown Strip */}
              <div className="pt-4 border-t border-stone-200">
                <span className="font-bold text-stone-900 text-xs block mb-2">
                  অনুমোদিত পেমেন্ট চ্যানেল অনুযায়ী লেনদেন হিস্যা:
                </span>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                    <span className="text-[10px] text-stone-500 block">সোনালী ও তফসিলি ব্যাংক</span>
                    <span className="font-bold text-emerald-950 text-sm">৫৮%</span>
                    <span className="text-[9px] text-stone-400 block">RTGS / EFT</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                    <span className="text-[10px] text-stone-500 block">বিকাশ ও নগদ MFS</span>
                    <span className="font-bold text-pink-700 text-sm">২৮%</span>
                    <span className="text-[9px] text-stone-400 block">মার্চেন্ট গেটওয়ে</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                    <span className="text-[10px] text-stone-500 block">ব্র্যাক ব্যাংক কার্ড ও পিওএস</span>
                    <span className="font-bold text-blue-900 text-sm">১৪%</span>
                    <span className="text-[9px] text-stone-400 block">ভিসা / মাস্টারকার্ড</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 1 Col: Recent Financial Audit Activities */}
            <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-800" />
                  <span>সাম্প্রতিক আর্থিক লেনদেন কার্যক্রম</span>
                </h3>
              </div>

              <div className="space-y-3 max-h-80 overflow-y-auto pr-1 text-xs">
                {escrows.flatMap(e => e.auditTrail.slice(-1).map(a => ({ ...a, escrowNumber: e.escrowNumber }))).map((aud, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-stone-500">
                      <span className="font-mono font-bold text-emerald-950">{aud.escrowNumber}</span>
                      <span>{aud.timestamp}</span>
                    </div>
                    <div className="font-bold text-stone-800">{aud.action}</div>
                    <p className="text-[11px] text-stone-600 leading-tight">{aud.details}</p>
                    <div className="text-[10px] text-stone-400 flex justify-between pt-1">
                      <span>কর্তা: {aud.actor}</span>
                      <span className="font-mono">{aud.transactionRef}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Active Escrow Highlights Table */}
          <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden">
            <div className="p-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
              <h4 className="font-bold text-stone-900 text-sm flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-800" />
                <span>সক্রিয় এসক্রো ট্রাস্ট চালান তালিকা ({escrows.length})</span>
              </h4>
              <button
                onClick={() => setActiveSubTab('escrow')}
                className="text-xs font-bold text-emerald-800 hover:underline cursor-pointer"
              >
                পূর্ণাঙ্গ এসক্রো লেজার দেখুন →
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 text-[11px]">
                  <tr>
                    <th className="p-3">এসক্রো নম্বর</th>
                    <th className="p-3">অর্ডার ও পণ্য</th>
                    <th className="p-3">ক্রেতা ও বিক্রেতা</th>
                    <th className="p-3">সংরক্ষিত অর্থ</th>
                    <th className="p-3">অর্থ ছাড়ের শর্ত</th>
                    <th className="p-3 text-center">স্ট্যাটাস</th>
                    <th className="p-3 text-right">রসিদ / অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {escrows.map(esc => (
                    <tr key={esc.id} className="hover:bg-stone-50/50">
                      <td className="p-3">
                        <div className="font-mono font-bold text-stone-900">{esc.escrowNumber}</div>
                        <div className="text-[10px] text-stone-500 font-mono">{esc.orderNumber}</div>
                      </td>
                      <td className="p-3">
                        <div className="font-bold text-stone-900">{esc.productName}</div>
                        <div className="text-[10px] text-emerald-900 font-semibold">{esc.quantity} {esc.unit}</div>
                      </td>
                      <td className="p-3">
                        <div className="text-stone-800 font-semibold">ক্রেতা: {esc.buyerName}</div>
                        <div className="text-[10px] text-stone-500">বিক্রেতা: {esc.sellerName}</div>
                      </td>
                      <td className="p-3">
                        <div className="font-bold text-emerald-950 text-sm">৳{esc.totalAmount.toLocaleString('bn-BD')}</div>
                        <div className="text-[10px] text-stone-400">{esc.providerName}</div>
                      </td>
                      <td className="p-3">
                        <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                          esc.releaseConditions.grnVerified ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-600'
                        }`}>
                          {esc.releaseConditions.grnVerified ? '✓ GRN ছাড়পত্র প্রস্তুত' : '• GRN অপেক্ষমাণ'}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          esc.status === 'released' ? 'bg-emerald-100 text-emerald-800' :
                          esc.status === 'paused_dispute' ? 'bg-rose-100 text-rose-800' :
                          esc.status === 'awaiting_release' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {esc.statusLabel}
                        </span>
                      </td>
                      <td className="p-3 text-right space-x-1">
                        <button
                          onClick={() => handleOpenReceiptForEscrow(esc)}
                          title="রসিদ দেখুন"
                          className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 cursor-pointer"
                        >
                          <FileText className="w-4 h-4" />
                        </button>
                        {esc.status !== 'released' && (
                          <button
                            onClick={() => handleOpenReleaseForEscrow(esc)}
                            title="অর্থ ছাড় যাচাই"
                            className="p-1.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-900 cursor-pointer font-bold"
                          >
                            <ShieldCheck className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* TAB B: ESCROW MANAGEMENT SYSTEM (§5) */}
      {activeSubTab === 'escrow' && (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden space-y-4 p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-stone-200 gap-2">
            <div>
              <h3 className="font-bold text-stone-900 text-base flex items-center gap-2">
                <Lock className="w-5 h-5 text-emerald-800" />
                <span>মন্ত্রণালয় এসক্রো ট্রাস্ট রেজিস্ট্রি লেজার (§5)</span>
              </h3>
              <p className="text-xs text-stone-500">
                ১০-ধাপের এসক্রো স্থিতি, ব্যাংক ক্লিয়ারেন্স ও শর্তানুগ অর্থ ছাড় ট্র্যাকিং
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {escrows.map((esc) => (
              <div key={esc.id} className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-stone-200">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-emerald-950 text-sm">{esc.escrowNumber}</span>
                    <span className="text-stone-300">·</span>
                    <span className="font-mono text-stone-600 text-xs">{esc.orderNumber}</span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    esc.status === 'released' ? 'bg-emerald-100 text-emerald-800' :
                    esc.status === 'paused_dispute' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {esc.statusLabel}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-stone-400 block text-[10px]">পণ্য ও পরিমাণ:</span>
                    <span className="font-bold text-stone-900">{esc.productName}</span>
                    <span className="text-emerald-900 font-semibold block">{esc.quantity} {esc.unit}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">সংশ্লিষ্ট পক্ষগণ:</span>
                    <span className="text-stone-800 block">ক্রেতা: <strong>{esc.buyerName}</strong></span>
                    <span className="text-stone-600 block">বিক্রেতা: {esc.sellerName}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">আর্থিক প্রতিষ্ঠান ও ট্রাস্ট হিসাব:</span>
                    <span className="font-semibold text-stone-900 block">{esc.providerName}</span>
                    <span className="text-stone-500 font-mono text-[10px] block">{esc.transactionRef}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">সংরক্ষিত মোট অর্থ:</span>
                    <span className="font-bold text-emerald-950 text-base">৳{esc.totalAmount.toLocaleString('bn-BD')}</span>
                    <span className="text-[10px] text-stone-500 block">নিট প্রাপ্য: ৳{esc.netSellerPayout.toLocaleString('bn-BD')}</span>
                  </div>
                </div>

                {/* Checklist bar */}
                <div className="p-2.5 rounded-lg bg-white border border-stone-200 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                  <div className="flex items-center gap-3">
                    <span className={`flex items-center gap-1 font-semibold ${esc.releaseConditions.deliveryConfirmed ? 'text-emerald-800' : 'text-stone-400'}`}>
                      <CheckCircle2 className="w-3.5 h-3.5" /> পণ্য সরবরাহ নিশ্চিত
                    </span>
                    <span className={`flex items-center gap-1 font-semibold ${esc.releaseConditions.grnVerified ? 'text-emerald-800' : 'text-stone-400'}`}>
                      <CheckCircle2 className="w-3.5 h-3.5" /> GRN ছাড়পত্র গৃহীত
                    </span>
                    <span className={`flex items-center gap-1 font-semibold ${esc.releaseConditions.noActiveDispute ? 'text-emerald-800' : 'text-rose-700'}`}>
                      <CheckCircle2 className="w-3.5 h-3.5" /> কোনো সক্রিয় বিরোধ নেই
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenReceiptForEscrow(esc)}
                      className="px-2.5 py-1 rounded bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold cursor-pointer"
                    >
                      রসিদ প্রিন্ট
                    </button>
                    {esc.status !== 'released' && (
                      <button
                        onClick={() => handleOpenReleaseForEscrow(esc)}
                        className="px-3 py-1 rounded bg-emerald-800 hover:bg-emerald-900 text-white font-bold cursor-pointer"
                      >
                        অর্থ ছাড় যাচাই ও অনুমোদন
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB C: BUYER PAYMENT HISTORY ("আমার লেনদেন" §7) */}
      {activeSubTab === 'buyer_tx' && (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden space-y-4 p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-stone-200 gap-2">
            <div>
              <h3 className="font-bold text-stone-900 text-base flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-emerald-800" />
                <span>আমার লেনদেন ও পেমেন্ট রসিদ ভাণ্ডার (§7)</span>
              </h3>
              <p className="text-xs text-stone-500">
                সকল পরিশোধিত ইনভয়েস, ব্যাংক রেফারেন্স ও অর্থ ফেরতের আবেদন
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 text-[11px]">
                <tr>
                  <th className="p-3">ট্রানজেকশন ও অর্ডার</th>
                  <th className="p-3">বিক্রেতা ও পণ্য</th>
                  <th className="p-3">পেমেন্ট মাধ্যম</th>
                  <th className="p-3">পরিশোধের তারিখ</th>
                  <th className="p-3 text-right">অর্থের পরিমাণ</th>
                  <th className="p-3 text-center">স্ট্যাটাস</th>
                  <th className="p-3 text-right">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {transactions.map(t => (
                  <tr key={t.id} className="hover:bg-stone-50/50">
                    <td className="p-3">
                      <div className="font-mono font-bold text-stone-900">{t.transactionNumber}</div>
                      <div className="text-[10px] text-stone-500 font-mono">{t.orderNumber}</div>
                    </td>
                    <td className="p-3">
                      <div className="font-bold text-stone-900">{t.productName}</div>
                      <div className="text-[11px] text-stone-500">{t.sellerName}</div>
                    </td>
                    <td className="p-3 text-stone-700">
                      {t.paymentMethodLabel}
                    </td>
                    <td className="p-3 text-stone-600">{t.transactionDate}</td>
                    <td className="p-3 text-right font-bold text-emerald-950 text-sm">
                      ৳{t.amount.toLocaleString('bn-BD')}
                    </td>
                    <td className="p-3 text-center">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {t.statusLabel}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-1">
                      <button
                        onClick={() => handleOpenReceiptForTx(t)}
                        className="px-2.5 py-1 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs cursor-pointer inline-flex items-center gap-1"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>রসিদ</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB D: SELLER PAYMENT & SETTLEMENT DASHBOARD (§6) */}
      {activeSubTab === 'seller_settlement' && (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden space-y-4 p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-stone-200 gap-2">
            <div>
              <h3 className="font-bold text-stone-900 text-base flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-800" />
                <span>বিক্রেতা অর্থ ছাড় ও ব্যাংক সেটেলমেন্ট (§6)</span>
              </h3>
              <p className="text-xs text-stone-500">
                বিক্রয়মূল্য, ব্যাংক চার্জ কর্তন ও সরাসরি ব্যাংক হিসাবে স্থানান্তরিত অর্থের হিসাব
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 text-[11px]">
                <tr>
                  <th className="p-3">সেটেলমেন্ট নম্বর</th>
                  <th className="p-3">অর্ডার ও পণ্য</th>
                  <th className="p-3">মোট বিক্রয়মূল্য</th>
                  <th className="p-3">প্ল্যাটফর্ম ও ব্যাংক ফি</th>
                  <th className="p-3">নিট প্রাপ্য অর্থ</th>
                  <th className="p-3">ব্যাংক অ্যাকাউন্ট</th>
                  <th className="p-3 text-center">ছাড়ের অবস্থা</th>
                  <th className="p-3 text-right">স্টেটমেন্ট</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {settlements.map(s => (
                  <tr key={s.id} className="hover:bg-stone-50/50">
                    <td className="p-3 font-mono font-bold text-stone-900">{s.settlementNumber}</td>
                    <td className="p-3">
                      <div className="font-bold text-stone-900">{s.productName}</div>
                      <div className="text-[10px] text-stone-500">ক্রেতা: {s.buyerCompany}</div>
                    </td>
                    <td className="p-3 font-semibold text-stone-900">৳{s.orderValue.toLocaleString('bn-BD')}</td>
                    <td className="p-3 text-rose-700 font-medium">৳{(s.platformFeeAmount + s.bankCharge).toLocaleString('bn-BD')}</td>
                    <td className="p-3 font-bold text-emerald-950 text-sm">৳{s.netPayout.toLocaleString('bn-BD')}</td>
                    <td className="p-3 font-mono text-[11px] text-stone-600">{s.bankAccountMasked}</td>
                    <td className="p-3 text-center">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        s.status === 'released' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {s.statusLabel}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => window.print()}
                        className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 cursor-pointer"
                        title="স্টেটমেন্ট ডাউনলোড"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB E: REFUNDS MANAGEMENT (§9) */}
      {activeSubTab === 'refunds' && (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden space-y-4 p-5">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <div>
              <h3 className="font-bold text-stone-900 text-base flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-emerald-800" />
                <span>রিফান্ড ও অর্থ ফেরত ব্যবস্থাপনা (§9)</span>
              </h3>
              <p className="text-xs text-stone-500">বাতিল বা সমস্যাযুক্ত অর্ডারের ব্যাংক রিফান্ড রেজিস্ট্রি</p>
            </div>
            <button
              onClick={() => setIsRefundModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <PlusCircle className="w-4 h-4 text-amber-300" />
              <span>রিফান্ড ফাইল খুলুন</span>
            </button>
          </div>

          <div className="space-y-3">
            {refunds.map(r => (
              <div key={r.id} className="p-4 rounded-xl border border-stone-200 bg-stone-50/60 space-y-2 text-xs">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-mono font-bold text-stone-900">{r.refundNumber}</span>
                    <div className="font-bold text-stone-800 mt-0.5">{r.refundReason}</div>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    r.status === 'completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {r.statusLabel}
                  </span>
                </div>
                <div className="flex justify-between text-stone-600 text-[11px]">
                  <span>ক্রেতা: <strong>{r.buyerName}</strong> · বিক্রেতা: <strong>{r.sellerName}</strong></span>
                  <span className="font-bold text-rose-800 text-sm">ফেরতের পরিমাণ: ৳{r.requestedAmount.toLocaleString('bn-BD')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB F: DISPUTES MANAGEMENT (§10) */}
      {activeSubTab === 'disputes' && (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden space-y-4 p-5">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <div>
              <h3 className="font-bold text-stone-900 text-base flex items-center gap-2">
                <Scale className="w-5 h-5 text-emerald-800" />
                <span>আর্থিক লেনদেন বিরোধ ও এসক্রো সালিশি সেল (§10)</span>
              </h3>
              <p className="text-xs text-stone-500">বিরোধ মীমাংসা সেল ও মধ্যস্থতা কার্যবিবরণী</p>
            </div>
            <button
              onClick={() => setIsDisputeModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>বিরোধ ফাইল ও মধ্যস্থতা দেখুন</span>
            </button>
          </div>

          <div className="space-y-3">
            {disputes.map(d => (
              <div key={d.id} className="p-4 rounded-xl border border-rose-200 bg-rose-50/50 space-y-2 text-xs">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-mono font-bold text-rose-900">{d.disputeNumber}</span>
                    <div className="font-bold text-stone-900 text-sm mt-0.5">{d.category}</div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                    {d.statusLabel}
                  </span>
                </div>
                <p className="text-stone-700 text-xs">{d.description}</p>
                <div className="text-[10px] text-stone-500 pt-1 flex justify-between border-t border-rose-200">
                  <span>অভিযোগকারী: {d.buyerName}</span>
                  <span className="font-mono text-emerald-900">এসক্রো: {d.escrowNumber}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ALL MODALS */}
      <PaymentReceiptModal
        transaction={selectedReceiptTx}
        escrow={selectedReceiptEscrow}
        isOpen={isReceiptOpen}
        onClose={() => setIsReceiptOpen(false)}
      />

      {selectedEscrowForRelease && (
        <PaymentReleaseModal
          escrow={selectedEscrowForRelease}
          isOpen={isReleaseModalOpen}
          onClose={() => setIsReleaseModalOpen(false)}
          onConfirmRelease={onConfirmRelease}
          onPauseDispute={onPauseDispute}
          currentUserRole={user.role}
        />
      )}

      <RefundManagementModal
        refunds={refunds}
        escrows={escrows}
        isOpen={isRefundModalOpen}
        onClose={() => setIsRefundModalOpen(false)}
        onRequestRefund={onRequestRefund}
        onApproveRefund={onApproveRefund}
        userRole={user.role}
      />

      <TransactionDisputeModal
        disputes={disputes}
        escrows={escrows}
        isOpen={isDisputeModalOpen}
        onClose={() => setIsDisputeModalOpen(false)}
        onSubmitDispute={onSubmitDispute}
        onResolveDispute={onResolveDispute}
        currentUserRole={user.role}
      />

      <PaymentProviderModal
        isOpen={isProviderModalOpen}
        onClose={() => setIsProviderModalOpen(false)}
      />

      <FinancialReportsModal
        escrows={escrows}
        transactions={transactions}
        settlements={settlements}
        refunds={refunds}
        isOpen={isReportsModalOpen}
        onClose={() => setIsReportsModalOpen(false)}
      />

    </div>
  );
};
