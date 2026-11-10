import React, { useRef } from 'react';
import { 
  Printer, 
  X, 
  Mountain, 
  ShieldCheck, 
  CheckCircle2, 
  Lock, 
  FileText, 
  QrCode,
  Building2,
  Calendar,
  CreditCard
} from 'lucide-react';
import { BuyerPaymentTransaction, EscrowRecord } from '../../types';

interface PaymentReceiptModalProps {
  transaction?: BuyerPaymentTransaction | null;
  escrow?: EscrowRecord | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PaymentReceiptModal: React.FC<PaymentReceiptModalProps> = ({
  transaction,
  escrow,
  isOpen,
  onClose
}) => {
  const printRef = useRef<HTMLDivElement>(null);

  if (!isOpen || (!transaction && !escrow)) return null;

  const handlePrint = () => {
    window.print();
  };

  const receiptNo = transaction?.receiptNumber || `RCPT-${new Date().getFullYear()}-${escrow?.escrowNumber.slice(-4) || '8801'}`;
  const txRef = transaction?.transactionRef || escrow?.transactionRef || 'TXN-SBL-2026-90412';
  const orderNo = transaction?.orderNumber || escrow?.orderNumber || 'ORD-2026-0850';
  const escrowNo = transaction?.escrowNumber || escrow?.escrowNumber || 'ESC-2026-0784';
  const totalAmount = transaction?.amount || escrow?.totalAmount || 0;
  const buyerName = escrow?.buyerName || 'মেসার্স সততা মসলা মিলস';
  const buyerCompany = escrow?.buyerCompany || 'মেসার্স সততা মসলা মিলস লিমিটেড';
  const sellerName = transaction?.sellerName || escrow?.sellerName || 'কামাল আহমেদ চৌধুরী';
  const productName = transaction?.productName || escrow?.productName || 'খাগড়াছড়ির পাহাড়ি খাঁটি হলুদ';
  const provider = transaction?.providerName || escrow?.providerName || 'সোনালী ব্যাংক পিএলসি';
  const paymentMethod = transaction?.paymentMethodLabel || 'অনুমোদিত এসক্রো ট্রাস্ট অ্যাকাউন্ট (RTGS/EFT)';
  const dateStr = transaction?.transactionDate || escrow?.depositDate || '০৮ নভেম্বর ২০২৬';

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-stone-200">
        
        {/* Top Control Bar (Excluded from Print) */}
        <div className="p-4 bg-stone-100 border-b border-stone-200 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-800" />
            <h3 className="font-bold text-stone-900 text-sm sm:text-base">
              অফিসিয়াল পেমেন্ট রসিদ – {receiptNo}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>রসিদ প্রিন্ট করুন</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Receipt Body */}
        <div ref={printRef} className="p-6 sm:p-10 overflow-y-auto font-bengali text-stone-900 space-y-6">
          
          {/* Header */}
          <div className="text-center border-b-2 border-emerald-900 pb-5 space-y-1 relative">
            <div className="flex items-center justify-between">
              
              {/* Ministry Logo Left */}
              <div className="text-left flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-emerald-900 text-amber-400 flex items-center justify-center font-bold text-sm">
                  <Mountain className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-emerald-950">পার্বত্য চট্টগ্রাম বিষয়ক মন্ত্রণালয়</div>
                  <div className="text-[9px] text-stone-600">গণপ্রজাতন্ত্রী বাংলাদেশ সরকার</div>
                </div>
              </div>

              {/* Title Center */}
              <div className="text-center">
                <div className="inline-block px-3 py-1 rounded-md bg-emerald-900 text-white font-bold text-sm sm:text-base uppercase tracking-wide">
                  ইলেক্ট্রনিক পেমেন্ট ও এসক্রো ট্রাস্ট রসিদ
                </div>
                <div className="text-[10px] text-stone-500 font-medium mt-0.5">
                  ELECTRONIC TRANSACTION RECEIPT · SECURE ESCROW PROTECTION
                </div>
              </div>

              {/* Brand Right */}
              <div className="text-right">
                <div className="font-brand font-bold text-base text-stone-900">
                  Hill <span className="text-amber-700">eCommerce</span>
                </div>
                <div className="text-[9px] text-emerald-800 font-semibold">ডিজিটাল পাইকারি মার্কেটপ্লেস</div>
              </div>

            </div>
          </div>

          {/* Metadata Highlights Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs">
            <div>
              <span className="text-stone-500 block text-[10px]">রসিদ নম্বর:</span>
              <span className="font-bold text-stone-950 font-mono text-sm">{receiptNo}</span>
            </div>
            <div>
              <span className="text-stone-500 block text-[10px]">লেনদেন তারিখ ও সময়:</span>
              <span className="font-semibold text-stone-900">{dateStr}</span>
            </div>
            <div>
              <span className="text-stone-500 block text-[10px]">অর্ডার নম্বর:</span>
              <span className="font-bold text-emerald-900 font-mono">{orderNo}</span>
            </div>
            <div>
              <span className="text-stone-500 block text-[10px]">এসক্রো রেফারেন্স:</span>
              <span className="font-bold text-stone-900 font-mono">{escrowNo}</span>
            </div>
          </div>

          {/* Payment Status Stamp */}
          <div className="p-3.5 rounded-xl border border-emerald-300 bg-emerald-50 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-800 text-white flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <span className="font-bold text-emerald-950 text-sm block">
                  পেমেন্ট সফল ও এসক্রো ট্রাস্টে সংরক্ষিত
                </span>
                <span className="text-stone-600 text-[11px]">
                  তহবিল অনুমোদিত ব্যাংকের এসক্রো ট্রাস্ট অ্যাকাউন্টে সুরক্ষিত রাখা হয়েছে।
                </span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded bg-emerald-800 text-white text-xs font-bold">
              যাচাইকৃত (VERIFIED)
            </span>
          </div>

          {/* Parties: Buyer & Seller */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            
            {/* Buyer Details */}
            <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-1">
              <div className="font-bold text-stone-500 uppercase text-[10px] pb-1 border-b border-stone-200">
                প্রদানকারী / ক্রেতা (BUYER / PAYER)
              </div>
              <div className="font-bold text-stone-900 text-sm pt-1">{buyerName}</div>
              <div className="text-stone-700">{buyerCompany}</div>
              <div className="text-stone-500 text-[11px]">আইডি: B-2026-CHTR</div>
            </div>

            {/* Seller Details */}
            <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-1">
              <div className="font-bold text-stone-500 uppercase text-[10px] pb-1 border-b border-stone-200">
                প্রাপক / বিক্রেতা (SELLER / BENEFICIARY)
              </div>
              <div className="font-bold text-stone-900 text-sm pt-1">{sellerName}</div>
              <div className="text-stone-700">{escrow?.sellerCompany || 'চেঙ্গী ভ্যালি এগ্রো সাপ্লাইয়ার্স'}</div>
              <div className="text-stone-500 text-[11px]">আইডি: S-2026-HILL</div>
            </div>

          </div>

          {/* Financial Breakdown Table */}
          <div className="border border-stone-300 rounded-xl overflow-hidden text-xs">
            <div className="bg-stone-100 px-4 py-2 font-bold text-stone-900 border-b border-stone-300">
              পরিশোধিত অর্থের বিস্তারিত বিবরণী (PAYMENT BREAKDOWN)
            </div>
            <table className="w-full text-left">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-700 text-[11px]">
                <tr>
                  <th className="p-3">ক্রমিক</th>
                  <th className="p-3">বিবরণ</th>
                  <th className="p-3 text-center">পরিমাণ</th>
                  <th className="p-3 text-right">টাকা (৳)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                <tr>
                  <td className="p-3 text-stone-500">০১</td>
                  <td className="p-3">
                    <div className="font-bold text-stone-900">{productName}</div>
                    <div className="text-[10px] text-stone-500">পাইকারি এগ্রো লট</div>
                  </td>
                  <td className="p-3 text-center text-stone-800">
                    {escrow?.quantity ? `${escrow.quantity} ${escrow.unit}` : '১ লট'}
                  </td>
                  <td className="p-3 text-right font-medium text-stone-900">
                    ৳{(escrow?.productAmount || (totalAmount - 5000)).toLocaleString('bn-BD')}
                  </td>
                </tr>
                <tr>
                  <td className="p-3 text-stone-500">০২</td>
                  <td className="p-3">
                    <div className="font-semibold text-stone-800">পাহাড়ি পরিবহন ও লজিস্টিকস চার্জ</div>
                    <div className="text-[10px] text-stone-500">কাভার্ড ভ্যান ও পাহাড়ি হাইওয়ে চার্জ</div>
                  </td>
                  <td className="p-3 text-center text-stone-800">১ চালান</td>
                  <td className="p-3 text-right font-medium text-stone-900">
                    ৳{(escrow?.deliveryCost || 4500).toLocaleString('bn-BD')}
                  </td>
                </tr>
                <tr>
                  <td className="p-3 text-stone-500">০৩</td>
                  <td className="p-3">
                    <div className="font-semibold text-stone-800">প্যাকেজিং ও অন্যান্য আনুষঙ্গিক ফি</div>
                  </td>
                  <td className="p-3 text-center text-stone-800">-</td>
                  <td className="p-3 text-right font-medium text-stone-900">
                    ৳{(escrow?.otherCost || 500).toLocaleString('bn-BD')}
                  </td>
                </tr>
              </tbody>
              <tfoot className="bg-emerald-950 text-white font-bold">
                <tr>
                  <td colSpan={3} className="p-3 text-right text-xs">
                    সর্বমোট পরিশোধিত ও এসক্রোতে সংরক্ষিত অর্থ:
                  </td>
                  <td className="p-3 text-right text-amber-300 text-sm">
                    ৳{totalAmount.toLocaleString('bn-BD')}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Banking & Escrow Trust Partner Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl border border-stone-200 bg-stone-50 space-y-1">
              <span className="font-bold text-stone-800 block text-[11px]">পেমেন্ট মাধ্যম ও ব্যাংকিং রেফারেন্স:</span>
              <div className="text-stone-700">আর্থিক সেবা প্রদানকারী: <strong>{provider}</strong></div>
              <div className="text-stone-700">পেমেন্ট মেথড: {paymentMethod}</div>
              <div className="text-stone-600 font-mono text-[11px]">ব্যাংক ট্রানজেকশন আইডি: {txRef}</div>
            </div>

            <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-1">
              <span className="font-bold text-emerald-900 block text-[11px]">মন্ত্রণালয় এসক্রো ছাড়ের নিয়মাবলী:</span>
              <p className="text-stone-600 text-[10px] leading-relaxed">
                পণ্য ক্রেতার গুদামে পৌঁছে গুণগত মান যাচাইয়ের পর এবং ডিজিটাল GRN সাবমিশনের পরই ব্যাংক থেকে বিক্রেতার হিসাবে অর্থ ছাড় করা হবে। কোনো বিরোধ সৃষ্টি হলে তদন্ত সম্পন্ন না হওয়া পর্যন্ত অর্থ ছাড় স্থগিত থাকবে।
              </p>
            </div>
          </div>

          {/* Prototype Simulation Watermark / Disclaimer (§1, §14) */}
          <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-[10px] text-center font-medium">
            * এটি একটি কার্যকরী ফ্রন্টএন্ড প্রোটোটাইপ লেনদেন রসিদ। কোনো বাস্তব টাকা ধার বা কর্তন করা হয়নি। অনুমোদিত ব্যাংকিং এপিআই ইন্টিগ্রেশনের পর প্রকৃত অর্থ ছাড় কার্যকর হবে।
          </div>

          {/* Footer Seals & Verification */}
          <div className="pt-4 border-t-2 border-dashed border-stone-300 flex items-center justify-between text-xs text-stone-500">
            <div className="flex items-center gap-2">
              <QrCode className="w-12 h-12 text-stone-800 shrink-0" />
              <div className="text-[10px]">
                <div className="font-bold text-stone-900">ডিজিটাল ভেরিফিকেশন কোড:</div>
                <div className="font-mono text-stone-600">{txRef}</div>
                <div>যাচাই করতে কিউআর কোড স্ক্যান করুন</div>
              </div>
            </div>

            <div className="text-right text-[10px] space-y-1">
              <div className="font-bold text-emerald-950">Hill eCommerce এসক্রো ক্লিয়ারিং হাউস</div>
              <div>পার্বত্য চট্টগ্রাম বিষয়ক মন্ত্রণালয়, ঢাকা, বাংলাদেশ</div>
              <div className="text-stone-400">হেল্পলাইন: ১৬১২৩ · সাপোর্ট: escrow@hillecommerce.gov.bd</div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
