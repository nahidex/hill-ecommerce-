import React, { useState } from 'react';
import { 
  CheckCircle2, 
  X, 
  ShieldCheck, 
  AlertTriangle, 
  Lock, 
  FileCheck, 
  DollarSign, 
  Building2, 
  Clock, 
  PauseCircle,
  HelpCircle
} from 'lucide-react';
import { EscrowRecord } from '../../types';

interface PaymentReleaseModalProps {
  escrow: EscrowRecord;
  isOpen: boolean;
  onClose: () => void;
  onConfirmRelease: (escrowId: string, note: string) => void;
  onPauseDispute: (escrowId: string, reason: string) => void;
  currentUserRole: string;
}

export const PaymentReleaseModal: React.FC<PaymentReleaseModalProps> = ({
  escrow,
  isOpen,
  onClose,
  onConfirmRelease,
  onPauseDispute,
  currentUserRole
}) => {
  const [releaseNote, setReleaseNote] = useState('');
  const [disputeReason, setDisputeReason] = useState('');
  const [showDisputeInput, setShowDisputeInput] = useState(false);

  if (!isOpen) return null;

  const cond = escrow.releaseConditions;
  const allConditionsSatisfied = cond.deliveryConfirmed && cond.grnVerified && cond.noActiveDispute && cond.agreedAmountVerified;

  const handleRelease = () => {
    onConfirmRelease(escrow.id, releaseNote || 'অনুমোদিত তফসিলি ব্যাংকের মাধ্যমে বিক্রেতার হিসাবে অর্থ ছাড় সম্পন্ন।');
    onClose();
  };

  const handlePause = () => {
    if (!disputeReason.trim()) return;
    onPauseDispute(escrow.id, disputeReason);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto font-bengali">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-stone-200 animate-in fade-in">
        
        {/* Header */}
        <div className="p-4 bg-stone-100 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-800 text-amber-300 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-sm sm:text-base">
                এসক্রো অর্থ ছাড় যাচাই ও অনুমোদন (Escrow Release Verification)
              </h3>
              <p className="text-[11px] text-stone-500">
                এসক্রো আইডি: <span className="font-mono font-bold text-emerald-950">{escrow.escrowNumber}</span> · অর্ডার: {escrow.orderNumber}
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
          
          {/* Top Escrow Summary */}
          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 space-y-2">
            <div className="flex justify-between items-center pb-2 border-b border-stone-200">
              <span className="font-bold text-stone-900 text-sm">{escrow.productName}</span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                escrow.status === 'released' 
                  ? 'bg-emerald-100 text-emerald-800' 
                  : escrow.status === 'paused_dispute'
                    ? 'bg-rose-100 text-rose-800'
                    : 'bg-amber-100 text-amber-800'
              }`}>
                {escrow.statusLabel}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px]">
              <div>
                <span className="text-stone-500 block text-[10px]">মোট এসক্রো ফান্ড:</span>
                <span className="font-bold text-stone-900 text-sm">৳{escrow.totalAmount.toLocaleString('bn-BD')}</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[10px]">প্ল্যাটফর্ম ও ব্যাংক ফি:</span>
                <span className="font-semibold text-stone-700">৳{(escrow.platformFee + escrow.bankCharge).toLocaleString('bn-BD')}</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[10px]">বিক্রেতার নিট প্রাপ্য:</span>
                <span className="font-bold text-emerald-950 text-sm">৳{escrow.netSellerPayout.toLocaleString('bn-BD')}</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[10px]">আর্থিক প্রতিষ্ঠান:</span>
                <span className="font-semibold text-stone-800">{escrow.providerName}</span>
              </div>
            </div>

            <div className="text-[10px] text-stone-500 pt-1 flex justify-between border-t border-stone-200">
              <span>ক্রেতা: <strong>{escrow.buyerName}</strong></span>
              <span>বিক্রেতা: <strong>{escrow.sellerName}</strong></span>
            </div>
          </div>

          {/* 4 Essential Release Conditions (§8) */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="font-bold text-stone-800 block text-xs">
                অর্থ ছাড়ের পূর্বশর্ত যাচাই তালিকা (MANDATORY CONDITIONS CHECKLIST):
              </label>
              <span className="text-[10px] text-stone-500">ব্যাংকিং রুলস ও এসক্রো ট্রাস্ট</span>
            </div>

            <div className="space-y-2">
              
              {/* Condition 1: Delivery Confirmed */}
              <div className={`p-3 rounded-xl border flex items-center justify-between ${
                cond.deliveryConfirmed ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950' : 'bg-rose-50 border-rose-300 text-rose-950'
              }`}>
                <div className="flex items-center gap-2.5">
                  {cond.deliveryConfirmed ? <CheckCircle2 className="w-4 h-4 text-emerald-700" /> : <AlertTriangle className="w-4 h-4 text-rose-700" />}
                  <div>
                    <span className="font-bold text-xs block">১. পণ্য পরিবহন ও ডেলিভারি সম্পন্ন</span>
                    <span className="text-[10px] text-stone-600">গন্তব্যে কাভার্ড ভ্যান পৌঁছানো ও আনলোডিং রেকর্ড</span>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${cond.deliveryConfirmed ? 'bg-emerald-200 text-emerald-900' : 'bg-rose-200 text-rose-900'}`}>
                  {cond.deliveryConfirmed ? 'নিশ্চিত' : 'অসম্পূর্ণ'}
                </span>
              </div>

              {/* Condition 2: GRN Verified */}
              <div className={`p-3 rounded-xl border flex items-center justify-between ${
                cond.grnVerified ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950' : 'bg-amber-50 border-amber-300 text-amber-950'
              }`}>
                <div className="flex items-center gap-2.5">
                  {cond.grnVerified ? <CheckCircle2 className="w-4 h-4 text-emerald-700" /> : <Clock className="w-4 h-4 text-amber-700" />}
                  <div>
                    <span className="font-bold text-xs block">২. ক্রেতার পণ্য প্রাপ্তি ও GRN ছাড়পত্র গ্রহণ</span>
                    <span className="text-[10px] text-stone-600">ক্রেতা কর্তৃক মালামাল পরীক্ষা করে ডিজিটাল GRN প্রদান</span>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${cond.grnVerified ? 'bg-emerald-200 text-emerald-900' : 'bg-amber-200 text-amber-900'}`}>
                  {cond.grnVerified ? 'GRN গৃহীত' : 'অপেক্ষমাণ'}
                </span>
              </div>

              {/* Condition 3: No Active Dispute */}
              <div className={`p-3 rounded-xl border flex items-center justify-between ${
                cond.noActiveDispute ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950' : 'bg-rose-50 border-rose-300 text-rose-950'
              }`}>
                <div className="flex items-center gap-2.5">
                  {cond.noActiveDispute ? <CheckCircle2 className="w-4 h-4 text-emerald-700" /> : <AlertTriangle className="w-4 h-4 text-rose-700" />}
                  <div>
                    <span className="font-bold text-xs block">৩. কোনো সক্রিয় বিরোধ বা অভিযোগ নেই</span>
                    <span className="text-[10px] text-stone-600">গুণগত মান বা ঘাটতি সংক্রান্ত কোনো মামলা নেই</span>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${cond.noActiveDispute ? 'bg-emerald-200 text-emerald-900' : 'bg-rose-200 text-rose-900'}`}>
                  {cond.noActiveDispute ? 'ক্লিয়ারেন্স ঠিক আছে' : 'বিরোধ সক্রিয়'}
                </span>
              </div>

              {/* Condition 4: Agreed Amount Verified */}
              <div className={`p-3 rounded-xl border flex items-center justify-between ${
                cond.agreedAmountVerified ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950' : 'bg-stone-50 border-stone-300 text-stone-900'
              }`}>
                <div className="flex items-center gap-2.5">
                  {cond.agreedAmountVerified ? <CheckCircle2 className="w-4 h-4 text-emerald-700" /> : <HelpCircle className="w-4 h-4 text-stone-500" />}
                  <div>
                    <span className="font-bold text-xs block">৪. চূড়ান্ত মূল্য ও প্রযোজ্য কর্তন ফি যাচাই</span>
                    <span className="text-[10px] text-stone-600">ব্যাংক ট্রাস্ট ও প্ল্যাটফর্ম ফি সমন্বয় সম্পন্ন</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-200 text-emerald-900">
                  যাচাইকৃত
                </span>
              </div>

            </div>
          </div>

          {/* Dispute Pause Control Trigger */}
          {showDisputeInput ? (
            <div className="p-4 rounded-xl border border-rose-300 bg-rose-50 space-y-3">
              <span className="font-bold text-rose-900 text-xs block">
                বিরোধের কারণে অর্থ ছাড় স্থগিতকরণ কারণ উল্লেখ করুন:
              </span>
              <textarea
                rows={2}
                required
                value={disputeReason}
                onChange={(e) => setDisputeReason(e.target.value)}
                placeholder="যেমন: মালামালে ২০% ঘাটতি পাওয়ায় ক্রেতা সালিশি নিষ্পত্তির জন্য আবেদন করেছেন।"
                className="w-full bg-white border border-stone-300 rounded-lg p-2 text-xs focus:ring-1 focus:ring-rose-700"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowDisputeInput(false)}
                  className="px-3 py-1.5 rounded-lg border border-stone-300 text-stone-600 font-semibold"
                >
                  বাতিল
                </button>
                <button
                  type="button"
                  onClick={handlePause}
                  disabled={!disputeReason.trim()}
                  className="px-4 py-1.5 rounded-lg bg-rose-700 hover:bg-rose-800 text-white font-bold disabled:opacity-50"
                >
                  অর্থ ছাড় স্থগিত করুন
                </button>
              </div>
            </div>
          ) : (
            escrow.status !== 'released' && (
              <div className="flex justify-between items-center pt-1 text-[11px]">
                <span className="text-stone-500">কোনো সমস্যা বা অমিল থাকলে অর্থ ছাড় স্থগিত রাখা যায়:</span>
                <button
                  type="button"
                  onClick={() => setShowDisputeInput(true)}
                  className="text-rose-700 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <PauseCircle className="w-3.5 h-3.5" />
                  <span>বিরোধের কারণে অর্থ ছাড় স্থগিত করুন</span>
                </button>
              </div>
            )
          )}

          {/* Action Approval Note */}
          {allConditionsSatisfied && escrow.status !== 'released' && (
            <div className="space-y-1">
              <label className="font-semibold text-stone-700 block text-xs">
                অনুমোদন ও অর্থ ছাড়ের মন্তব্য (ঐচ্ছিক):
              </label>
              <input
                type="text"
                value={releaseNote}
                onChange={(e) => setReleaseNote(e.target.value)}
                placeholder="যেমন: ক্রেতার পূর্ণাঙ্গ সন্তুষ্টি যাচাই করে বিক্রেতার সোনালী ব্যাংক হিসাবে অর্থ ছাড় অনুমোদিত হলো।"
                className="w-full border border-stone-300 rounded-lg p-2 text-xs focus:ring-1 focus:ring-emerald-700"
              />
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-stone-300 text-stone-600 font-semibold hover:bg-stone-50 cursor-pointer"
            >
              বন্ধ করুন
            </button>
            {escrow.status !== 'released' && (
              <button
                type="button"
                onClick={handleRelease}
                disabled={!allConditionsSatisfied}
                className="px-5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 disabled:opacity-50 text-white font-bold flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4 text-amber-300" />
                <span>অনুমোদিত ব্যাংকের মাধ্যমে অর্থ ছাড় সম্পন্ন করুন</span>
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
