import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  MessageSquare, 
  ShieldCheck, 
  MapPin, 
  Truck, 
  Calendar, 
  Package, 
  Check, 
  XCircle, 
  ArrowRight,
  TrendingUp,
  FileText,
  User,
  AlertTriangle
} from 'lucide-react';
import { OrderItem, UserSession, OrderStageKey } from '../../types';
import { OrderProgressTracker } from './OrderProgressTracker';

interface OrderDetailsModalProps {
  order: OrderItem | null;
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserSession;
  onOpenPrintInvoice: (order: OrderItem) => void;
  onOpenNegotiation: (order: OrderItem) => void;
  onOpenChat: (order: OrderItem) => void;
  onAdvanceStage?: (orderId: string, nextStage: OrderStageKey, note?: string) => void;
  onAcceptOrder?: (orderId: string) => void;
  onRejectOrder?: (orderId: string, reason: string) => void;
  onCancelOrder?: (orderId: string, reason: string) => void;
  onInitiatePayment?: (order: OrderItem) => void;
}

export const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  order,
  isOpen,
  onClose,
  currentUser,
  onOpenPrintInvoice,
  onOpenNegotiation,
  onOpenChat,
  onAdvanceStage,
  onAcceptOrder,
  onRejectOrder,
  onCancelOrder,
  onInitiatePayment
}) => {
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectBox, setShowRejectBox] = useState(false);

  if (!isOpen || !order) return null;

  const isBuyer = currentUser.role === 'buyer';
  const isSeller = currentUser.role === 'farmer' || currentUser.role === 'supplier' || currentUser.role === 'entrepreneur';

  const productTotal = order.totalProductPrice || (order.quantity * order.unitPrice);
  const shipping = order.shippingCost || 0;
  const packaging = order.packagingCost || 0;
  const grandTotal = order.totalAmount || (productTotal + shipping + packaging);

  const currentStage = order.stage || 'request_submitted';

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto font-bengali">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-4 bg-emerald-950 text-white flex items-center justify-between border-b border-emerald-900">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold text-amber-300 bg-emerald-900 px-2 py-0.5 rounded border border-emerald-800">
              {order.orderNumber}
            </span>
            <h3 className="text-base font-bold text-white">
              পাইকারি অর্ডারের পূর্ণ বিবরণ
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenPrintInvoice(order)}
              className="px-3 py-1 bg-amber-400 hover:bg-amber-300 text-stone-950 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">চালান প্রিন্ট</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-emerald-200 hover:text-white rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs text-stone-700">
          
          {/* 1. Visual 9-Stage Progress Tracker */}
          <OrderProgressTracker
            currentStage={currentStage}
            stageNumber={order.stageNumber}
            activityHistory={order.activityHistory || []}
            showHistoryDrawer={true}
          />

          {/* 2. Product & Quantity Card */}
          <div className="p-4 rounded-xl border border-stone-200 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={order.productImage}
                alt={order.productName}
                className="w-16 h-16 rounded-xl object-cover border border-stone-200 shrink-0"
              />
              <div className="space-y-1">
                <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider">
                  তালিকাভুক্ত পাইকারি পণ্য
                </span>
                <h4 className="text-base font-bold text-stone-900">{order.productName}</h4>
                <div className="text-stone-500">
                  অর্ডারের পরিমাণ: <strong className="text-stone-900 tabular-nums">{order.quantity.toLocaleString()} {order.unit}</strong>
                </div>
              </div>
            </div>

            <div className="sm:text-right w-full sm:w-auto p-3 sm:p-0 rounded-lg bg-stone-50 sm:bg-transparent">
              <span className="text-[10px] text-stone-400 block font-bold uppercase">প্রতি একক দর</span>
              <span className="text-xl font-bold text-emerald-950 tabular-nums">৳{order.unitPrice}</span>
              <span className="text-stone-500 text-xs"> / {order.unit}</span>
            </div>
          </div>

          {/* 3. Buyer & Seller Parties Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Buyer Details */}
            <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/60 space-y-1.5">
              <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-stone-400" />
                <span>ক্রেতার বিবরণ</span>
              </div>
              <div className="font-bold text-stone-900 text-sm">{order.customerName}</div>
              <div className="text-stone-600">প্রতিষ্ঠান: {order.buyerCompanyName || order.customerRole}</div>
              <div className="text-stone-600">মোবাইল: {order.customerPhone}</div>
              <div className="text-stone-700 font-medium">গন্তব্য: {order.destination}</div>
            </div>

            {/* Seller Details */}
            <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/60 space-y-1.5">
              <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>বিক্রেতা / সমবায় বিবরণ</span>
              </div>
              <div className="font-bold text-stone-900 text-sm">{order.sellerName || 'উ থোয়াই মারমা'}</div>
              <div className="text-stone-600">উৎস: পার্বত্য চট্টগ্রাম সমবায় নেটওয়ার্ক</div>
              <div className="text-stone-600">যোগাযোগ: {order.sellerPhone || '০১৮১৮-৪৫৬৭৮৯'}</div>
              <div className="text-emerald-800 font-bold">ভেরিফাইড আইডি: HC-PROD-2026-VAL</div>
            </div>
          </div>

          {/* 4. Financial Cost Breakdown */}
          <div className="p-4 rounded-xl border border-stone-200 bg-white space-y-2">
            <h5 className="font-bold text-stone-900 mb-2">মূল্য ও খরচের হিসাব বিবরণী:</h5>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-100">
                <span className="text-[10px] text-stone-400 block">পণ্য উপমোট</span>
                <span className="text-sm font-bold text-stone-800 tabular-nums">৳{productTotal.toLocaleString()}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-100">
                <span className="text-[10px] text-stone-400 block">পরিবহন খরচ</span>
                <span className="text-sm font-bold text-stone-800 tabular-nums">৳{shipping.toLocaleString()}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-100">
                <span className="text-[10px] text-stone-400 block">প্যাকেজিং খরচ</span>
                <span className="text-sm font-bold text-stone-800 tabular-nums">৳{packaging.toLocaleString()}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200">
                <span className="text-[10px] text-emerald-800 font-bold block uppercase">সর্বমোট চুক্তি মূল্য</span>
                <span className="text-sm font-extrabold text-emerald-950 tabular-nums">৳{grandTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* 5. Delivery & Agreed Terms */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl border border-stone-200 bg-stone-50 space-y-1">
              <div className="font-bold text-stone-800 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-stone-500" />
                <span>প্রত্যাশিত সরবরাহের তারিখ:</span>
              </div>
              <p className="text-stone-600 pl-5">{order.expectedDeliveryDate || 'অর্ডার নিশ্চিতের ৭ দিনের মধ্যে'}</p>
            </div>

            <div className="p-3.5 rounded-xl border border-stone-200 bg-stone-50 space-y-1">
              <div className="font-bold text-stone-800 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>এসক্রো স্থিতি:</span>
              </div>
              <p className="text-emerald-900 font-semibold pl-5">
                {order.escrowStatus === 'released' 
                  ? 'অর্থ সফলভাবে বিক্রেতার একাউন্টে স্থানান্তরিত' 
                  : order.escrowStatus === 'refunded' 
                    ? 'অর্থ ক্রেতার কাছে রিফান্ড সম্পন্ন' 
                    : 'বাংলাদেশ ব্যাংক অনুমোদিত এসক্রো ট্রাস্টে সংরক্ষিত'}
              </p>
            </div>
          </div>

          {order.specialInstructions && (
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 space-y-0.5">
              <div className="font-bold">বিশেষ নির্দেশনা:</div>
              <p>{order.specialInstructions}</p>
            </div>
          )}

          {/* Rejection / Cancellation box if open */}
          {showRejectBox && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl space-y-3">
              <div className="font-bold text-rose-900">বাতিল / প্রত্যাখ্যানের কারণ উল্লেখ করুন:</div>
              <textarea
                rows={2}
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="কারণ লিখুন..."
                className="w-full p-2.5 rounded-lg border border-rose-300 text-xs focus:outline-none focus:ring-1 focus:ring-rose-500 bg-white"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowRejectBox(false)}
                  className="px-3 py-1.5 rounded-lg bg-stone-200 text-stone-700 font-semibold"
                >
                  ফিরে যান
                </button>
                <button
                  onClick={() => {
                    if (!rejectReason.trim()) return;
                    if (isSeller && onRejectOrder) {
                      onRejectOrder(order.id, rejectReason);
                    } else if (onCancelOrder) {
                      onCancelOrder(order.id, rejectReason);
                    }
                    setShowRejectBox(false);
                    onClose();
                  }}
                  className="px-4 py-1.5 rounded-lg bg-rose-700 text-white font-bold"
                >
                  নিশ্চিত করুন
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenChat(order)}
              className="px-3.5 py-2 border border-stone-300 hover:bg-stone-100 text-stone-800 rounded-xl font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 text-stone-500" />
              <span>বার্তা পাঠান</span>
            </button>

            {currentStage !== 'completed' && currentStage !== 'cancelled' && (
              <button
                onClick={() => onOpenNegotiation(order)}
                className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-900 rounded-xl font-bold cursor-pointer"
              >
                মূল্য আলোচনা
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {/* Seller Controls */}
            {isSeller && currentStage === 'request_submitted' && onAcceptOrder && (
              <button
                onClick={() => {
                  onAcceptOrder(order.id);
                  onClose();
                }}
                className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Check className="w-4 h-4 text-amber-300" />
                <span>অর্ডার গ্রহণ করুন</span>
              </button>
            )}

            {isSeller && currentStage === 'confirmed' && onAdvanceStage && (
              <button
                onClick={() => {
                  onAdvanceStage(order.id, 'preparing', 'পণ্য বাছাই ও গ্রেডিং শুরু হয়েছে।');
                  onClose();
                }}
                className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <span>পণ্য প্রস্তুতকরণ শুরু করুন</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {isSeller && currentStage === 'preparing' && onAdvanceStage && (
              <button
                onClick={() => {
                  onAdvanceStage(order.id, 'ready_to_ship', 'চালান প্যাকিং সম্পন্ন ও লোডিং পয়েন্টে প্রস্তুত।');
                  onClose();
                }}
                className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <span>সরবরাহের জন্য প্রস্তুত ঘোষণা</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {isSeller && currentStage === 'ready_to_ship' && onAdvanceStage && (
              <button
                onClick={() => {
                  onAdvanceStage(order.id, 'shipped', 'ট্রাকে পণ্য লোড করে ঢাকা/চট্টগ্রামের উদ্দেশ্যে পাঠানো হয়েছে।');
                  onClose();
                }}
                className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <span>পণ্য প্রেরণ (ট্রানজিট) কনফার্ম করুন</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Buyer Controls */}
            {isBuyer && currentStage === 'shipped' && onAdvanceStage && (
              <button
                onClick={() => {
                  onAdvanceStage(order.id, 'received', 'ওয়্যারহাউজে পণ্য গ্রহণ ও আনলোড সম্পন্ন।');
                  onClose();
                }}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-stone-950 rounded-xl font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <span>পণ্য প্রাপ্তি স্বীকার করুন</span>
              </button>
            )}

            {isBuyer && currentStage === 'received' && onAdvanceStage && (
              <button
                onClick={() => {
                  onAdvanceStage(order.id, 'completed', 'ক্রেতা সন্তোষ প্রকাশ করেছেন ও এসক্রো অর্থ ছাড়ের অনুমোদন দিয়েছেন।');
                  onClose();
                }}
                className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Check className="w-4 h-4 text-amber-300" />
                <span>অর্ডার সম্পন্ন ও এসক্রো ছাড় অনুমোদন</span>
              </button>
            )}

            {/* Buyer Payment Button */}
            {isBuyer && (currentStage === 'confirmed' || order.escrowStatus === 'pending_deposit') && onInitiatePayment && (
              <button
                onClick={() => {
                  onInitiatePayment(order);
                  onClose();
                }}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <ShieldCheck className="w-4 h-4 text-amber-300" />
                <span>নিরাপদ এসক্রো পেমেন্ট করুন</span>
              </button>
            )}

            {/* Cancel/Reject Trigger */}
            {currentStage !== 'completed' && currentStage !== 'cancelled' && !showRejectBox && (
              <button
                onClick={() => setShowRejectBox(true)}
                className="px-3 py-2 text-rose-700 hover:bg-rose-50 rounded-xl font-bold"
              >
                {isSeller ? 'প্রত্যাখ্যান' : 'অর্ডার বাতিল'}
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
