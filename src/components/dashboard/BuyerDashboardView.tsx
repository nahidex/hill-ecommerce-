import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Plus, 
  CheckCircle2, 
  Clock, 
  Truck, 
  ShieldCheck, 
  DollarSign, 
  MessageSquare, 
  ArrowRight,
  AlertTriangle,
  FileCheck,
  Check,
  Eye,
  RotateCcw,
  ShoppingBag
} from 'lucide-react';
import { UserSession, OrderItem, RFQItem, ProductItem } from '../../types';

interface BuyerDashboardViewProps {
  user: UserSession;
  orders: OrderItem[];
  rfqs: RFQItem[];
  onOpenRFQModal: () => void;
  onExploreMarketplace: () => void;
  onOpenOrderManagement?: () => void;
  onOpenLogistics?: () => void;
  onOpenMessages: () => void;
  onViewPayments: () => void;
  onConfirmDeliveryAndReleaseEscrow: (orderId: string) => void;
}

export const BuyerDashboardView: React.FC<BuyerDashboardViewProps> = ({
  user,
  orders,
  rfqs,
  onOpenRFQModal,
  onExploreMarketplace,
  onOpenOrderManagement,
  onOpenLogistics,
  onOpenMessages,
  onViewPayments,
  onConfirmDeliveryAndReleaseEscrow
}) => {
  const [selectedOrderForDispute, setSelectedOrderForDispute] = useState<string | null>(null);
  const [disputeReason, setDisputeReason] = useState('');
  const [disputeSuccess, setDisputeSuccess] = useState(false);

  // Statistics calculation
  const totalRFQs = rfqs.length;
  const pendingRFQs = rfqs.filter(r => r.status === 'open').length;
  const confirmedOrders = orders.filter(o => o.status === 'processing' || o.status === 'shipped').length;
  const inTransitDelivery = orders.filter(o => o.status === 'shipped').length;
  const completedOrders = orders.filter(o => o.status === 'delivered').length;
  const totalPurchaseVolume = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const escrowLockedAmount = orders
    .filter(o => o.status !== 'delivered' && o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const handleOpenDispute = (orderId: string) => {
    setSelectedOrderForDispute(orderId);
    setDisputeSuccess(false);
  };

  const handleDisputeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDisputeSuccess(true);
    setTimeout(() => {
      setSelectedOrderForDispute(null);
      setDisputeSuccess(false);
      setDisputeReason('');
    }, 1800);
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      
      {/* 1. Statistics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3.5">
        <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs">
          <div className="text-xs text-stone-500 font-medium">মোট ক্রয় অনুরোধ (RFQ)</div>
          <div className="text-2xl font-bold text-stone-900 mt-1 tabular-nums">{totalRFQs}</div>
          <div className="text-[11px] text-emerald-800 mt-1">কোটেশন আহ্বান</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs">
          <div className="text-xs text-stone-500 font-medium">অপেক্ষমাণ অনুরোধ</div>
          <div className="text-2xl font-bold text-amber-600 mt-1 tabular-nums">{pendingRFQs}</div>
          <div className="text-[11px] text-stone-400 mt-1">প্রস্তাব জমা হচ্ছে</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs">
          <div className="text-xs text-stone-500 font-medium">নিশ্চিত অর্ডার</div>
          <div className="text-2xl font-bold text-stone-900 mt-1 tabular-nums">{confirmedOrders}</div>
          <div className="text-[11px] text-stone-400 mt-1">চলমান চুক্তি</div>
        </div>

        <div 
          onClick={onOpenLogistics}
          className={`p-4 rounded-xl bg-white border border-stone-200 shadow-2xs ${onOpenLogistics ? 'cursor-pointer hover:border-amber-500 hover:bg-amber-50/30 transition-all' : ''}`}
          title="পণ্য সরবরাহ ও ট্র্যাকিং পোর্টাল খুলুন"
        >
          <div className="text-xs text-stone-500 font-medium flex items-center justify-between">
            <span>চলমান ডেলিভারি</span>
            {onOpenLogistics && <Truck className="w-3.5 h-3.5 text-amber-700" />}
          </div>
          <div className="text-2xl font-bold text-amber-700 mt-1 tabular-nums">{inTransitDelivery}</div>
          <div className="text-[11px] text-amber-700 mt-1">পাহাড় থেকে ট্রানজিটে →</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs">
          <div className="text-xs text-stone-500 font-medium">সম্পন্ন অর্ডার</div>
          <div className="text-2xl font-bold text-emerald-700 mt-1 tabular-nums">{completedOrders}</div>
          <div className="text-[11px] text-emerald-800 mt-1">পণ্য বুঝে পাওয়া হয়েছে</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs col-span-2 sm:col-span-1">
          <div className="text-xs text-stone-500 font-medium">মোট ক্রয়ের পরিমাণ</div>
          <div className="text-2xl font-bold text-stone-900 mt-1 tabular-nums">
            ৳{totalPurchaseVolume.toLocaleString()}
          </div>
          <div className="text-[11px] text-stone-400 mt-1">চালান সমাহার</div>
        </div>

        <div className="p-4 rounded-xl bg-emerald-950 text-white border border-emerald-900 shadow-2xs col-span-2 sm:col-span-1">
          <div className="text-xs text-emerald-300 font-medium">এসক্রোতে সুরক্ষিত</div>
          <div className="text-2xl font-bold text-amber-400 mt-1 tabular-nums">
            ৳{escrowLockedAmount.toLocaleString()}
          </div>
          <div className="text-[11px] text-stone-300 mt-1">ডেলিভারি পর ছাড় হবে</div>
        </div>
      </div>

      {/* 2. Quick Action Buttons Strip */}
      <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-bold text-stone-900">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
          <span>পাইকারি ক্রেতা কুইক টুলস:</span>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {onOpenLogistics && (
            <button
              onClick={onOpenLogistics}
              className="px-4 py-2 bg-emerald-900 hover:bg-emerald-950 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Truck className="w-3.5 h-3.5 text-amber-300" />
              <span>আমার পণ্য সরবরাহ (Phase 6)</span>
            </button>
          )}

          <button
            onClick={onExploreMarketplace}
            className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 text-emerald-800" />
            <span>পাইকারি পণ্য খুঁজুন</span>
          </button>

          {onOpenOrderManagement && (
            <button
              onClick={onOpenOrderManagement}
              className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-stone-950 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>অর্ডার নিয়ন্ত্রণ কক্ষ (Phase 5)</span>
            </button>
          )}

          <button
            onClick={onOpenRFQModal}
            className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5 text-amber-300" />
            <span>নতুন ক্রয় অনুরোধ (RFQ)</span>
          </button>

          <button
            onClick={onViewPayments}
            className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>পেমেন্ট ও এসক্রো ট্র্যাকার</span>
          </button>

          <button
            onClick={onOpenMessages}
            className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5 text-amber-700" />
            <span>কোটেশন চ্যাট</span>
          </button>
        </div>
      </div>

      {/* 3. Active Orders & Delivery Track */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-stone-900">
              আমার পাইকারি ক্রয় অর্ডার ও ডেলিভারি ট্র্যাকিং
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              পণ্য পৌঁছানোর পর গুণমান নিশ্চিত করে উৎপাদকের কাছে এসক্রো অর্থ ছাড় করুন
            </p>
          </div>
          <div className="text-xs font-semibold text-emerald-800 flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>১০০% এসক্রো মানি-ব্যাক গ্যারান্টি</span>
          </div>
        </div>

        <div className="divide-y divide-stone-100">
          {orders.map((order) => {
            const isDelivered = order.status === 'delivered';
            const isShipped = order.status === 'shipped';

            return (
              <div key={order.id} className="p-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 hover:bg-stone-50/50 transition-colors">
                
                {/* Product & Order details */}
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-stone-100 overflow-hidden shrink-0 border border-stone-200">
                    <img
                      src={order.productImage}
                      alt={order.productName}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-stone-900">{order.orderNumber}</span>
                      <span className="text-stone-300">·</span>
                      <span className="text-xs text-stone-500">তারিখ: {order.orderDate}</span>
                    </div>
                    <h4 className="text-sm font-bold text-stone-900 mt-1">{order.productName}</h4>
                    <div className="text-xs text-stone-600 mt-0.5">
                      পরিমাণ: <strong>{order.quantity.toLocaleString()} {order.unit}</strong> (দর: ৳{order.unitPrice}/{order.unit}) · গন্তব্য: {order.destination}
                    </div>
                  </div>
                </div>

                {/* Amount & Actions */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto justify-between lg:justify-end">
                  <div className="text-left sm:text-right">
                    <div className="text-base font-bold text-emerald-950 tabular-nums">
                      ৳{order.totalAmount.toLocaleString()}
                    </div>
                    <span className="text-[11px] text-stone-500 block">
                      {order.escrowStatus === 'in_escrow' ? 'এসক্রোতে গচ্ছিত' : 'উৎপাদকে ছাড়কৃত'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Confirm receipt & release escrow button */}
                    {isShipped && (
                      <button
                        onClick={() => onConfirmDeliveryAndReleaseEscrow(order.id)}
                        className="px-3.5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                      >
                        <CheckCircle2 className="w-4 h-4 text-amber-300" />
                        <span>পণ্য পেয়েছি (অর্থ ছাড় করুন)</span>
                      </button>
                    )}

                    {isDelivered && (
                      <span className="px-3 py-1.5 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-lg text-xs font-semibold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5 text-emerald-700" />
                        <span>পণ্য গৃহীত ও এসক্রো রিলিজ সম্পন্ন</span>
                      </span>
                    )}

                    {/* Dispute opener button */}
                    {!isDelivered && (
                      <button
                        onClick={() => handleOpenDispute(order.id)}
                        className="px-2.5 py-2 bg-stone-100 hover:bg-rose-50 text-stone-600 hover:text-rose-700 rounded-lg text-xs font-medium flex items-center gap-1 cursor-pointer"
                      >
                        <AlertTriangle className="w-3.5 h-3.5 text-stone-400 hover:text-rose-600" />
                        <span>বিরোধ নিষ্পত্তি</span>
                      </button>
                    )}

                    <button
                      onClick={onOpenMessages}
                      title="সরবরাহকারীর সাথে যোগাযোগ"
                      className="p-2 text-stone-500 hover:text-emerald-900 hover:bg-stone-100 rounded-lg cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Active RFQs & Quotations received */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-stone-200 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-stone-900">
              আমার পোস্টকৃত ক্রয় অনুরোধ (RFQs)
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              উৎপাদকদের পাঠানো কোটেশন পর্যালোচনা করুন ও অনুমোদন দিন
            </p>
          </div>
          <button
            onClick={onOpenRFQModal}
            className="text-xs font-bold text-emerald-800 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>নতুন RFQ তৈরি</span>
          </button>
        </div>

        <div className="divide-y divide-stone-100">
          {rfqs.map((rfq) => (
            <div key={rfq.id} className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {rfq.rfqNumber}
                  </span>
                  <span className="text-xs text-stone-500">পোস্ট তারিখ: {rfq.date}</span>
                </div>
                <h4 className="text-sm font-bold text-stone-900 mt-1">{rfq.productRequirement}</h4>
                <div className="text-xs text-stone-500 mt-0.5">
                  চাহিদা: <strong>{rfq.requiredQuantity.toLocaleString()} {rfq.unit}</strong> · টার্গেট দর: ৳{rfq.targetPricePerUnit}/{rfq.unit} · জেলা: {rfq.district}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-900 block">
                    {rfq.quotationCount}টি কোটেশন জমা পড়েছে
                  </span>
                  <span className="text-[11px] text-stone-500">
                    সর্বনিম্ন কোটেশন: ৳{rfq.targetPricePerUnit - 1}/{rfq.unit}
                  </span>
                </div>

                <button
                  onClick={onOpenMessages}
                  className="px-3.5 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5 text-amber-300" />
                  <span>কোটেশন দেখুন ও ডিল করুন</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dispute Modal */}
      {selectedOrderForDispute && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>মন্ত্রণালয় বিরোধ নিষ্পত্তি সেল (Dispute Resolution)</span>
              </div>
              <button
                onClick={() => setSelectedOrderForDispute(null)}
                className="text-stone-400 hover:text-stone-700"
              >
                ✕
              </button>
            </div>

            {disputeSuccess ? (
              <div className="py-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-emerald-700" />
                </div>
                <h4 className="text-sm font-bold text-stone-900">অভিযোগ গৃহীত হয়েছে</h4>
                <p className="text-xs text-stone-600">
                  অর্ডারটি সাময়িকভাবে স্থগিত রাখা হয়েছে এবং জেলা প্রশাসনের তদন্ত কর্মকর্তার নিকট প্রেরণ করা হয়েছে। কোনো অর্থ ছাড় করা হবে না।
                </p>
              </div>
            ) : (
              <form onSubmit={handleDisputeSubmit} className="pt-4 space-y-4">
                <p className="text-xs text-stone-600">
                  অর্ডারের পণ্য মানহীন, ওজনে কম অথবা ক্ষতিগ্রস্ত হলে মন্ত্রণালয়ের মধ্যস্থতায় অভিযোগ দাখিল করুন। এসক্রো অর্থ তাৎক্ষণিকভাবে হোল্ড করা হবে।
                </p>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    অভিযোগের কারণ ও বিবরণ <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={disputeReason}
                    onChange={(e) => setDisputeReason(e.target.value)}
                    placeholder="পণ্য বা ডেলিভারির সুনির্দিষ্ট সমস্যা উল্লেখ করুন..."
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-rose-500"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedOrderForDispute(null)}
                    className="px-3 py-1.5 text-xs text-stone-600 rounded-lg hover:bg-stone-100"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 text-xs font-bold text-white bg-rose-700 hover:bg-rose-800 rounded-lg transition-colors cursor-pointer"
                  >
                    অভিযোগ দাখিল করুন
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
