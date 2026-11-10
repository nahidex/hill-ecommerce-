import React, { useState } from 'react';
import { X, Send, Check, ShieldCheck, Clock, User, AlertCircle } from 'lucide-react';
import { OrderItem, NegotiationOffer, UserSession } from '../../types';

interface OrderNegotiationModalProps {
  order: OrderItem | null;
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserSession;
  onSendCounterOffer: (orderId: string, offer: NegotiationOffer) => void;
  onAcceptPrice: (orderId: string, agreedPrice: number) => void;
  onRejectOffer: (orderId: string, reason: string) => void;
}

export const OrderNegotiationModal: React.FC<OrderNegotiationModalProps> = ({
  order,
  isOpen,
  onClose,
  currentUser,
  onSendCounterOffer,
  onAcceptPrice,
  onRejectOffer
}) => {
  const [newOfferPrice, setNewOfferPrice] = useState<number>(order ? order.unitPrice : 0);
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectBox, setShowRejectBox] = useState(false);

  if (!isOpen || !order) return null;

  const isBuyer = currentUser.role === 'buyer';
  const roleLabel = isBuyer ? 'buyer' : 'seller';

  const history = order.negotiationHistory || [];
  const latestOffer = history[history.length - 1];
  const currentPrice = latestOffer ? latestOffer.priceOffer : order.unitPrice;

  const handleSendOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOfferPrice || newOfferPrice <= 0) return;

    setIsSubmitting(true);
    const offer: NegotiationOffer = {
      id: `neg-${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderRole: roleLabel,
      priceOffer: Number(newOfferPrice),
      quantity: order.quantity,
      note: note.trim() || `${currentUser.name} প্রতি ${order.unit} ৳${newOfferPrice} মূল্যের প্রস্তাব পাঠিয়েছেন।`,
      timestamp: 'এইমাত্র',
      status: 'active'
    };

    setTimeout(() => {
      onSendCounterOffer(order.id, offer);
      setIsSubmitting(false);
      setNote('');
    }, 400);
  };

  const handleAccept = () => {
    onAcceptPrice(order.id, currentPrice);
    onClose();
  };

  const handleReject = () => {
    if (!rejectReason.trim()) return;
    onRejectOffer(order.id, rejectReason);
    setShowRejectBox(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto font-bengali">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 bg-emerald-950 text-white flex items-center justify-between border-b border-emerald-900">
          <div>
            <div className="text-[11px] text-amber-300 font-bold uppercase tracking-wider">
              দ্বিপাক্ষিক দর কষাকষি ব্যবস্থা
            </div>
            <h3 className="text-base font-bold text-white mt-0.5">
              মূল্য আলোচনা: {order.orderNumber}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-emerald-200 hover:text-white rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Product & Current State Bar */}
        <div className="p-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <img 
              src={order.productImage} 
              alt={order.productName} 
              className="w-12 h-12 rounded-lg object-cover border border-stone-200"
            />
            <div>
              <div className="font-bold text-stone-900">{order.productName}</div>
              <div className="text-stone-500">চাহিদা: {order.quantity.toLocaleString()} {order.unit}</div>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-stone-500 block">বর্তমান প্রস্তাবিত দর</span>
            <span className="text-base font-bold text-emerald-800 tabular-nums">৳{currentPrice}</span>
            <span className="text-stone-500 text-[11px]"> / {order.unit}</span>
          </div>
        </div>

        {/* Chronological Negotiation Timeline */}
        <div className="p-4 overflow-y-auto flex-1 space-y-3 bg-stone-100/50 min-h-[180px]">
          <div className="text-xs font-bold text-stone-600 mb-1">প্রস্তাব বিনিময়ের ইতিহাস:</div>
          
          {history.length === 0 ? (
            <div className="text-center py-8 text-xs text-stone-400">
              প্রাথমিক অর্ডার অনুযায়ী প্রতি {order.unit} ৳{order.unitPrice} দর প্রস্তাবিত হয়েছে।
            </div>
          ) : (
            history.map((item, idx) => {
              const isMe = item.senderRole === roleLabel;
              return (
                <div 
                  key={item.id || idx}
                  className={`p-3 rounded-xl border text-xs space-y-1 ${
                    isMe 
                      ? 'ml-8 bg-emerald-50 border-emerald-200 text-emerald-950' 
                      : 'mr-8 bg-white border-stone-200 text-stone-900 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-semibold text-stone-500">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3 text-stone-400" />
                      <span>{item.senderName} ({item.senderRole === 'buyer' ? 'ক্রেতা' : 'বিক্রেতা'})</span>
                    </span>
                    <span className="text-[10px]">{item.timestamp}</span>
                  </div>

                  <div className="text-sm font-bold text-stone-900">
                    প্রস্তাবিত দর: <span className="text-emerald-800 tabular-nums">৳{item.priceOffer}</span> / {order.unit}
                    <span className="text-xs font-normal text-stone-500 ml-2">
                      (মোট: ৳{(item.priceOffer * order.quantity).toLocaleString()})
                    </span>
                  </div>

                  {item.note && (
                    <p className="text-stone-600 text-[11px] leading-relaxed pt-0.5 border-t border-stone-200/60">
                      "{item.note}"
                    </p>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Reject Dialog Section if triggered */}
        {showRejectBox ? (
          <div className="p-4 bg-rose-50 border-t border-rose-200 text-xs space-y-3">
            <div className="font-bold text-rose-900">অর্ডার প্রত্যাখ্যানের কারণ উল্লেখ করুন:</div>
            <textarea
              rows={2}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="যেমন: প্রস্তাবিত দরে লাভজনক হবে না / মজুদ স্বল্পতা..."
              className="w-full p-2.5 rounded-lg border border-rose-300 text-xs focus:outline-none focus:ring-1 focus:ring-rose-500 bg-white"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowRejectBox(false)}
                className="px-3 py-1.5 rounded-lg bg-stone-200 text-stone-700 font-semibold"
              >
                বাতিল
              </button>
              <button
                type="button"
                onClick={handleReject}
                className="px-4 py-1.5 rounded-lg bg-rose-700 text-white font-bold"
              >
                প্রত্যাখ্যান নিশ্চিত করুন
              </button>
            </div>
          </div>
        ) : (
          /* Counter Offer Form & Actions */
          <div className="p-4 bg-white border-t border-stone-200 space-y-3">
            <form onSubmit={handleSendOffer} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-stone-700 mb-1">
                    আপনার প্রস্তাবিত একক দর (টাকা)
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={newOfferPrice}
                    onChange={(e) => setNewOfferPrice(Number(e.target.value))}
                    className="w-full p-2 text-xs font-bold rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700 tabular-nums"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-stone-700 mb-1">
                    মন্তব্য বা যৌক্তিকতা
                  </label>
                  <input
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="দর পরিবর্তনের কারণ লিখুন..."
                    className="w-full p-2 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-100 text-xs">
                <button
                  type="button"
                  onClick={() => setShowRejectBox(true)}
                  className="px-3 py-1.5 text-rose-700 hover:bg-rose-50 rounded-lg font-bold"
                >
                  প্রত্যাখ্যান করুন
                </button>

                <div className="flex items-center gap-2 ml-auto">
                  <button
                    type="button"
                    onClick={handleAccept}
                    className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Check className="w-4 h-4 text-amber-300" />
                    <span>বর্তমান দর (৳{currentPrice}) গ্রহণ করুন</span>
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-stone-950 rounded-xl font-bold flex items-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-60"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>পাল্টা প্রস্তাব পাঠান</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
