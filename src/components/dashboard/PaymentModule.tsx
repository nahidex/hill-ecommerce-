import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  ArrowUpRight, 
  ArrowDownLeft, 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Download,
  Filter
} from 'lucide-react';
import { TransactionItem, UserSession } from '../../types';

interface PaymentModuleProps {
  user: UserSession;
  transactions: TransactionItem[];
}

export const PaymentModule: React.FC<PaymentModuleProps> = ({ user, transactions }) => {
  const [filterType, setFilterType] = useState<'all' | 'escrow' | 'completed'>('all');
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  // Financial calculations
  const totalTransactions = transactions.reduce((sum, tx) => sum + tx.amount, 0);
  const pendingPayments = transactions
    .filter(tx => tx.status === 'pending')
    .reduce((sum, tx) => sum + tx.amount, 0);
  const completedPayments = transactions
    .filter(tx => tx.status === 'completed')
    .reduce((sum, tx) => sum + tx.amount, 0);
  const escrowHeldAmount = transactions
    .filter(tx => tx.status === 'in_escrow')
    .reduce((sum, tx) => sum + tx.amount, 0);
  const refundableAmount = 0; // Escrow refundable balance if disputed

  const filteredTransactions = transactions.filter(tx => {
    if (filterType === 'escrow') return tx.status === 'in_escrow';
    if (filterType === 'completed') return tx.status === 'completed';
    return true;
  });

  const handleDownloadInvoice = (invNum: string) => {
    setDownloadSuccess(invNum);
    setTimeout(() => setDownloadSuccess(null), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      
      {/* 1. Escrow Guarantee Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950 via-emerald-900 to-stone-900 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-amber-400 text-stone-950 flex items-center justify-center shrink-0 font-bold">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold">Hill eCommerce Escrow Protection</h3>
              <span className="text-[10px] bg-emerald-800 text-amber-300 px-2 py-0.5 rounded border border-emerald-600 font-semibold">
                বাংলাদেশ ব্যাংক অনুমোদিত মডেল
              </span>
            </div>
            <p className="text-xs text-stone-300 mt-1 max-w-xl">
              পণ্য সরবরাহ এবং ক্রেতার গুণগত মান পরীক্ষা সম্পন্ন না হওয়া পর্যন্ত অর্থ সরকারি সুরক্ষায় সংরক্ষিত থাকে।
            </p>
          </div>
        </div>

        <div className="text-left md:text-right shrink-0">
          <div className="text-xs text-emerald-300">বর্তমান ট্রাস্ট এসক্রো ব্যালেন্স</div>
          <div className="text-2xl font-bold text-amber-400 tabular-nums">
            ৳{escrowHeldAmount.toLocaleString()}
          </div>
        </div>
      </div>

      {/* 2. Financial Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        
        <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs">
          <div className="text-xs text-stone-500 font-medium">মোট লেনদেন ভলিউম</div>
          <div className="text-2xl font-bold text-stone-900 mt-1 tabular-nums">
            ৳{totalTransactions.toLocaleString()}
          </div>
          <div className="text-[11px] text-stone-400 mt-1">সর্বমোট সম্পাদিত লেনদেন</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs">
          <div className="text-xs text-stone-500 font-medium">অপেক্ষমাণ পেমেন্ট</div>
          <div className="text-2xl font-bold text-amber-600 mt-1 tabular-nums">
            ৳{pendingPayments.toLocaleString()}
          </div>
          <div className="text-[11px] text-stone-400 mt-1">প্রক্রিয়াধীন চালান</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs">
          <div className="text-xs text-stone-500 font-medium">সম্পন্ন পেমেন্ট</div>
          <div className="text-2xl font-bold text-emerald-700 mt-1 tabular-nums">
            ৳{completedPayments.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-800 mt-1">হিসাবে স্থানান্তরিত</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs">
          <div className="text-xs text-stone-500 font-medium">Escrow-তে সংরক্ষিত</div>
          <div className="text-2xl font-bold text-stone-900 mt-1 tabular-nums">
            ৳{escrowHeldAmount.toLocaleString()}
          </div>
          <div className="text-[11px] text-amber-700 mt-1">ডেলিভারি সাপেক্ষে ছাড়</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs col-span-2 sm:col-span-1">
          <div className="text-xs text-stone-500 font-medium">ফেরতযোগ্য অর্থ</div>
          <div className="text-2xl font-bold text-stone-900 mt-1 tabular-nums">
            ৳{refundableAmount.toLocaleString()}
          </div>
          <div className="text-[11px] text-stone-400 mt-1">কোনো বিরোধ নেই</div>
        </div>

      </div>

      {/* 3. Transactions Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        
        <div className="p-5 border-b border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-stone-900">লেনদেনের ইতিহাস (Transaction Ledger)</h3>
            <p className="text-xs text-stone-500 mt-0.5">
              সকল ইনভয়েস, এসক্রো ডিপোজিট ও ব্যাংক সেটেলমেন্টের তালিকা
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-lg text-xs">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                filterType === 'all' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-600'
              }`}
            >
              সব লেনদেন
            </button>
            <button
              onClick={() => setFilterType('escrow')}
              className={`px-3 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                filterType === 'escrow' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-600'
              }`}
            >
              এসক্রো হোল্ড
            </button>
            <button
              onClick={() => setFilterType('completed')}
              className={`px-3 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                filterType === 'completed' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-600'
              }`}
            >
              সম্পন্ন
            </button>
          </div>
        </div>

        {downloadSuccess && (
          <div className="p-3 bg-emerald-50 text-emerald-800 text-xs font-semibold border-b border-emerald-200 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>ইনভয়েস {downloadSuccess} সফলভাবে ডাউনলোড হয়েছে (পিডিএফ প্রিভিউ)।</span>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50/75 text-stone-600 font-semibold">
                <th className="py-3 px-4">ইনভয়েস নং ও তারিখ</th>
                <th className="py-3 px-4">বিবরণ</th>
                <th className="py-3 px-4">সংশ্লিষ্ট পক্ষ</th>
                <th className="py-3 px-4">পরিমাণ (টাকা)</th>
                <th className="py-3 px-4">এসক্রো স্ট্যাটাস</th>
                <th className="py-3 px-4 text-right">রসিদ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredTransactions.map((tx) => {
                const isCompleted = tx.status === 'completed';
                const isEscrow = tx.status === 'in_escrow';

                return (
                  <tr key={tx.id} className="hover:bg-stone-50/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-mono font-bold text-stone-900">{tx.invoiceNumber}</div>
                      <div className="text-[11px] text-stone-500">{tx.date}</div>
                    </td>

                    <td className="py-3.5 px-4 font-medium text-stone-900">
                      {tx.title}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-stone-800">{tx.counterParty}</div>
                      <div className="text-[10px] text-stone-400">{tx.partyRole}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-bold text-sm text-stone-900 tabular-nums">
                        ৳{tx.amount.toLocaleString()}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded text-[10px] font-semibold ${
                          isCompleted
                            ? 'bg-emerald-100 text-emerald-800'
                            : isEscrow
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-stone-100 text-stone-700'
                        }`}
                      >
                        {tx.escrowStatusText}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleDownloadInvoice(tx.invoiceNumber)}
                        title="ইনভয়েস ডাউনলোড"
                        className="p-1.5 text-stone-500 hover:text-emerald-800 rounded hover:bg-stone-100 cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="p-3 bg-stone-50 border-t border-stone-200 text-xs text-stone-500">
          * এটি Phase 02 প্রোটোটাইপ ইন্টারফেস। মন্ত্রণালয় অনুমোদিত ব্যাংকিং এপিআই-এর সাথে সমন্বিত লেনদেন প্রবাহ প্রদর্শিত হচ্ছে।
        </div>
      </div>

    </div>
  );
};
