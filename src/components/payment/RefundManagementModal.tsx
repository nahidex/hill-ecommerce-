import React, { useState } from 'react';
import { 
  RotateCcw, 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  FileText, 
  DollarSign, 
  ShieldCheck,
  Send,
  PlusCircle
} from 'lucide-react';
import { RefundRecord, EscrowRecord } from '../../types';

interface RefundManagementModalProps {
  refunds: RefundRecord[];
  escrows: EscrowRecord[];
  isOpen: boolean;
  onClose: () => void;
  onRequestRefund: (refundData: Omit<RefundRecord, 'id' | 'refundNumber' | 'status' | 'statusLabel'>) => void;
  onApproveRefund?: (refundId: string) => void;
  userRole: string;
}

const REFUND_REASONS = [
  'অর্ডার বাতিলকরণ (উভয় পক্ষের সম্মতি)',
  'নির্ধারিত সময়ে পণ্য সরবরাহ হয়নি',
  'আংশিক পণ্য সরবরাহ ও ঘাটতি সমন্বয়',
  'পরিবহনে পণ্য ক্ষতিগ্রস্ত বা বিনষ্ট',
  'অর্ডারের স্পেসিফিকেশনের সাথে অমিল / ভুল পণ্য',
  'উভয় পক্ষের সমঝোতায় আংশিক ক্ষতিপূরণ',
  'অন্যান্য যৌক্তিক কারণ'
];

export const RefundManagementModal: React.FC<RefundManagementModalProps> = ({
  refunds,
  escrows,
  isOpen,
  onClose,
  onRequestRefund,
  onApproveRefund,
  userRole
}) => {
  const [showNewRefundForm, setShowNewRefundForm] = useState(false);
  const [selectedEscrowId, setSelectedEscrowId] = useState(escrows[0]?.id || '');
  const [refundReason, setRefundReason] = useState(REFUND_REASONS[0]);
  const [requestedAmount, setRequestedAmount] = useState<number>(10000);
  const [evidenceNote, setEvidenceNote] = useState('');

  if (!isOpen) return null;

  const selectedEscrow = escrows.find(e => e.id === selectedEscrowId) || escrows[0];

  const handleCreateRefund = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEscrow) return;

    onRequestRefund({
      orderNumber: selectedEscrow.orderNumber,
      originalTransactionRef: selectedEscrow.transactionRef,
      buyerName: selectedEscrow.buyerName,
      sellerName: selectedEscrow.sellerName,
      originalAmount: selectedEscrow.totalAmount,
      requestedAmount: Number(requestedAmount),
      refundReason,
      evidenceNote,
      requestDate: new Date().toLocaleDateString('bn-BD', { day: '2-digit', month: 'long', year: 'numeric' })
    });

    setShowNewRefundForm(false);
    setEvidenceNote('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto font-bengali">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-stone-200 animate-in fade-in">
        
        {/* Header */}
        <div className="p-4 bg-stone-100 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-800 text-amber-300 flex items-center justify-center">
              <RotateCcw className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-sm sm:text-base">
                এসক্রো রিফান্ড ও অর্থ ফেরত ব্যবস্থাপনা (Refund Management)
              </h3>
              <p className="text-[11px] text-stone-500">
                পার্বত্য চট্টগ্রাম বিষয়ক মন্ত্রণালয় এসক্রো রেগুলেশন ও ব্যাংক রিফান্ড পলিসি
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!showNewRefundForm && userRole === 'buyer' && (
              <button
                onClick={() => setShowNewRefundForm(true)}
                className="text-xs font-bold px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white flex items-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5 text-amber-300" />
                <span>নতুন রিফান্ড আবেদন</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-xs">
          
          {showNewRefundForm ? (
            /* Refund Request Form */
            <form onSubmit={handleCreateRefund} className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                <h4 className="font-bold text-stone-900 text-sm">নতুন অর্থ ফেরত (রিফান্ড) আবেদন ফরম</h4>
                <button
                  type="button"
                  onClick={() => setShowNewRefundForm(false)}
                  className="text-stone-400 hover:text-stone-700 text-xs font-semibold"
                >
                  তালিকা দেখুন
                </button>
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">সংশ্লিষ্ট অর্ডার ও এসক্রো নির্বাচন:</label>
                <select
                  value={selectedEscrowId}
                  onChange={(e) => {
                    setSelectedEscrowId(e.target.value);
                    const esc = escrows.find(x => x.id === e.target.value);
                    if (esc) setRequestedAmount(esc.totalAmount);
                  }}
                  className="w-full border border-stone-300 rounded-lg p-2 font-medium focus:ring-1 focus:ring-emerald-700"
                >
                  {escrows.map(e => (
                    <option key={e.id} value={e.id}>
                      {e.orderNumber} – {e.productName} (মোট: ৳{e.totalAmount.toLocaleString('bn-BD')})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-stone-700 block mb-1">রিফান্ডের প্রধান কারণ:</label>
                  <select
                    value={refundReason}
                    onChange={(e) => setRefundReason(e.target.value)}
                    className="w-full border border-stone-300 rounded-lg p-2 font-medium focus:ring-1 focus:ring-emerald-700"
                  >
                    {REFUND_REASONS.map((r, i) => (
                      <option key={i} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-stone-700 block mb-1">অনুরোধকৃত অর্থ (টাকা ৳):</label>
                  <input
                    type="number"
                    min={1}
                    max={selectedEscrow?.totalAmount || 500000}
                    required
                    value={requestedAmount}
                    onChange={(e) => setRequestedAmount(Number(e.target.value))}
                    className="w-full border border-stone-300 rounded-lg p-2 font-bold text-stone-900 focus:ring-1 focus:ring-emerald-700"
                  />
                  <span className="text-[10px] text-stone-500 mt-0.5 block">
                    সর্বোচ্চ গ্রহণযোগ্য: ৳{selectedEscrow?.totalAmount.toLocaleString('bn-BD')}
                  </span>
                </div>
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">
                  বিস্তারিত কারণ ও প্রমাণের বিবরণ:
                </label>
                <textarea
                  rows={3}
                  required
                  value={evidenceNote}
                  onChange={(e) => setEvidenceNote(e.target.value)}
                  placeholder="যেমন: সরবরাহকৃত হলুদ পরীক্ষায় ভেজাল ও আর্দ্রতার মাত্রা বেশি পাওয়ায় ৫০% মালামাল ফেরত পাঠানো হয়েছে। GRN কপি সংযুক্ত রয়েছে।"
                  className="w-full border border-stone-300 rounded-lg p-2 text-xs focus:ring-1 focus:ring-emerald-700"
                />
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-950 text-[11px] flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>
                  রিফান্ড আবেদন দাখিলের সাথে সাথেই বিক্রেতা ও সংশ্লিষ্ট এসক্রো ব্যাংক অবহিত হবে এবং এসক্রো অর্থ ছাড় তদন্ত শেষ না হওয়া পর্যন্ত স্বয়ংক্রিয়ভাবে স্থগিত থাকবে।
                </span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setShowNewRefundForm(false)}
                  className="px-3.5 py-1.5 rounded-lg border border-stone-300 text-stone-600 font-semibold"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Send className="w-4 h-4 text-amber-300" />
                  <span>রিফান্ড আবেদন জমা দিন</span>
                </button>
              </div>
            </form>
          ) : (
            /* Refund Records Table */
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                <span className="font-bold text-stone-900 text-sm">
                  দাখিলকৃত রিফান্ড ও অর্থ ফেরত রেকর্ড ({refunds.length})
                </span>
                <span className="text-stone-500 text-[11px]">ব্যাংকিং এসক্রো ট্রাস্ট দ্বারা পরিচালিত</span>
              </div>

              <div className="space-y-3">
                {refunds.map((rf) => (
                  <div key={rf.id} className="p-4 rounded-xl border border-stone-200 bg-stone-50/60 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-stone-900 text-xs">{rf.refundNumber}</span>
                          <span className="text-stone-300">·</span>
                          <span className="font-mono text-emerald-900 font-bold text-[11px]">{rf.orderNumber}</span>
                        </div>
                        <div className="text-stone-700 font-semibold text-xs mt-0.5">{rf.refundReason}</div>
                      </div>

                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                        rf.status === 'completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : rf.status === 'under_review'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-blue-100 text-blue-800'
                      }`}>
                        {rf.statusLabel}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px]">
                      <div>
                        <span className="text-stone-500 block text-[10px]">মূল পেমেন্ট:</span>
                        <span className="font-semibold text-stone-800">৳{rf.originalAmount.toLocaleString('bn-BD')}</span>
                      </div>
                      <div>
                        <span className="text-stone-500 block text-[10px]">ফেরতের পরিমাণ:</span>
                        <span className="font-bold text-rose-800 text-sm">৳{rf.requestedAmount.toLocaleString('bn-BD')}</span>
                      </div>
                      <div>
                        <span className="text-stone-500 block text-[10px]">আবেদনের তারিখ:</span>
                        <span className="font-medium text-stone-700">{rf.requestDate}</span>
                      </div>
                      <div>
                        <span className="text-stone-500 block text-[10px]">অনুমোদনকারী:</span>
                        <span className="font-semibold text-emerald-950">{rf.approvedBy || 'পর্যালোচনাধীন'}</span>
                      </div>
                    </div>

                    {rf.evidenceNote && (
                      <p className="text-[11px] text-stone-600 bg-white p-2 rounded border border-stone-200">
                        <strong>বিবরণ:</strong> {rf.evidenceNote}
                      </p>
                    )}

                    {onApproveRefund && rf.status !== 'completed' && (
                      <div className="flex justify-end pt-2 border-t border-stone-200">
                        <button
                          type="button"
                          onClick={() => onApproveRefund(rf.id)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-2xs"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-300" />
                          <span>রিফান্ড অনুমোদন ও অর্থ ফেরত কার্যকর করুন</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
