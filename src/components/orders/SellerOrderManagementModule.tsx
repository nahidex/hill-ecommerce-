import React, { useState, useMemo } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  FileText, 
  Clock, 
  CheckCircle2, 
  Truck, 
  DollarSign, 
  AlertCircle, 
  Eye, 
  Printer, 
  MessageSquare, 
  TrendingUp, 
  ArrowRight,
  ShieldCheck,
  Package,
  Layers,
  Check,
  XCircle,
  Boxes,
  Send
} from 'lucide-react';
import { 
  OrderItem, 
  RFQItem, 
  UserSession, 
  QuotationItem, 
  OrderStageKey, 
  NegotiationOffer,
  ProductItem
} from '../../types';

import { OrderProgressTracker } from './OrderProgressTracker';
import { OrderDetailsModal } from './OrderDetailsModal';
import { OrderPrintableInvoiceModal } from './OrderPrintableInvoiceModal';
import { OrderNegotiationModal } from './OrderNegotiationModal';
import { QuotationResponseModal } from './QuotationResponseModal';
import { OrderChatModal } from './OrderChatModal';

interface SellerOrderManagementModuleProps {
  user: UserSession;
  orders: OrderItem[];
  rfqs: RFQItem[];
  products: ProductItem[];
  onAdvanceStage: (orderId: string, nextStage: OrderStageKey, note?: string) => void;
  onSendCounterOffer: (orderId: string, offer: NegotiationOffer) => void;
  onAcceptPrice: (orderId: string, agreedPrice: number) => void;
  onRejectOffer: (orderId: string, reason: string) => void;
  onSubmitQuotation: (rfqId: string, quote: QuotationItem) => void;
  onAcceptOrder: (orderId: string) => void;
  onRejectOrder: (orderId: string, reason: string) => void;
}

export const SellerOrderManagementModule: React.FC<SellerOrderManagementModuleProps> = ({
  user,
  orders,
  rfqs,
  products,
  onAdvanceStage,
  onSendCounterOffer,
  onAcceptPrice,
  onRejectOffer,
  onSubmitQuotation,
  onAcceptOrder,
  onRejectOrder
}) => {
  // Navigation tabs for seller
  const [activeMainTab, setActiveMainTab] = useState<'incoming_requests' | 'rfqs' | 'submitted_quotes' | 'under_negotiation' | 'confirmed_processing' | 'completed'>('incoming_requests');
  const [rfqStatusTab, setRfqStatusTab] = useState<'all' | 'new' | 'quoted' | 'awaiting' | 'expired' | 'closed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProductFilter, setSelectedProductFilter] = useState('all');

  // Modals state
  const [detailedOrder, setDetailedOrder] = useState<OrderItem | null>(null);
  const [printableOrder, setPrintableOrder] = useState<OrderItem | null>(null);
  const [negotiatingOrder, setNegotiatingOrder] = useState<OrderItem | null>(null);
  const [respondingRFQ, setRespondingRFQ] = useState<RFQItem | null>(null);
  const [chatOrder, setChatOrder] = useState<OrderItem | null>(null);

  // Rejection box
  const [rejectingOrderId, setRejectingOrderId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  // 1. Group orders according to seller sections (§11)
  const incomingRequests = useMemo(() => {
    return orders.filter(o => o.stage === 'request_submitted' || (o.status === 'pending' && o.stage !== 'negotiation'));
  }, [orders]);

  const underNegotiationOrders = useMemo(() => {
    return orders.filter(o => o.stage === 'negotiation' || o.status === 'negotiation');
  }, [orders]);

  const confirmedAndProcessingOrders = useMemo(() => {
    return orders.filter(o => o.stage === 'confirmed' || o.stage === 'preparing' || o.stage === 'ready_to_ship' || o.stage === 'shipped' || o.stage === 'received');
  }, [orders]);

  const completedOrders = useMemo(() => {
    return orders.filter(o => o.stage === 'completed' || o.status === 'delivered');
  }, [orders]);

  // My submitted quotations
  const mySubmittedQuotations = useMemo(() => {
    const list: { rfq: RFQItem; quote: QuotationItem }[] = [];
    rfqs.forEach(r => {
      if (r.quotations) {
        r.quotations.forEach(q => {
          if (q.sellerId === user.id || q.sellerName.includes(user.name)) {
            list.push({ rfq: r, quote: q });
          }
        });
      }
    });
    return list;
  }, [rfqs, user]);

  // Filtered RFQs for seller
  const filteredRFQs = useMemo(() => {
    return rfqs.filter(r => {
      if (rfqStatusTab === 'new') return r.status === 'open';
      if (rfqStatusTab === 'quoted') return r.status === 'quoted' || (r.quotations && r.quotations.some(q => q.sellerId === user.id));
      if (rfqStatusTab === 'awaiting') return r.status === 'open';
      if (rfqStatusTab === 'expired') return r.status === 'expired';
      if (rfqStatusTab === 'closed') return r.status === 'closed' || r.status === 'accepted';
      return true;
    });
  }, [rfqs, rfqStatusTab, user]);

  return (
    <div className="space-y-8 animate-in fade-in font-bengali">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-stone-200">
        <div>
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
            উৎপাদক ও বিক্রেতা ড্যাশবোর্ড
          </span>
          <h2 className="text-2xl font-bold text-stone-900 mt-0.5">
            অর্ডার অনুরোধ ও কোটেশন প্রতিক্রিয়া ব্যবস্থাপনা
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            পাইকারি ক্রেতাদের ক্রয়াদেশ গ্রহণ, পাল্টা দর প্রস্তাব, RFQ কোটেশন ও চালান অগ্রগতি নিয়ন্ত্রণ
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3.5 py-1.5 rounded-xl bg-amber-100 text-amber-950 font-bold text-xs border border-amber-300 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse"></span>
            <span>নতুন অর্ডার অনুরোধ: {incomingRequests.length}টি</span>
          </div>
        </div>
      </div>

      {/* 2. Seller Section Navigation Tabs (§11) */}
      <div className="border-b border-stone-200 flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'incoming_requests', label: `নতুন অর্ডার অনুরোধ (${incomingRequests.length})`, icon: ShoppingBag },
          { id: 'rfqs', label: `নতুন RFQ ও কোটেশন (${rfqs.length})`, icon: FileText },
          { id: 'submitted_quotes', label: `জমা দেওয়া মূল্য প্রস্তাব (${mySubmittedQuotations.length})`, icon: Send },
          { id: 'under_negotiation', label: `মূল্য আলোচনাধীন (${underNegotiationOrders.length})`, icon: TrendingUp },
          { id: 'confirmed_processing', label: `নিশ্চিত ও সরবরাহাধীন (${confirmedAndProcessingOrders.length})`, icon: Truck },
          { id: 'completed', label: `সম্পন্ন অর্ডার (${completedOrders.length})`, icon: CheckCircle2 }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeMainTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveMainTab(tab.id as any)}
              className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-emerald-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SECTION 1: INCOMING WHOLESALE REQUESTS (§3) */}
      {activeMainTab === 'incoming_requests' && (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-200">
            <div>
              <h3 className="text-base font-bold text-stone-900">ক্রেতাদের নতুন পাইকারি অর্ডার অনুরোধসমূহ</h3>
              <p className="text-xs text-stone-500">অনুরোধ যাচাই করে সরাসরি গ্রহণ করুন, পাল্টা দর পাঠান অথবা প্রত্যাখ্যান করুন</p>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {incomingRequests.length}টি অপেক্ষমাণ অনুরোধ
            </span>
          </div>

          {incomingRequests.length === 0 ? (
            <div className="py-12 text-center text-stone-400 text-xs">
              বর্তমানে কোনো নতুন অর্ডার অনুরোধ অপেক্ষমাণ নেই।
            </div>
          ) : (
            <div className="space-y-4">
              {incomingRequests.map(order => (
                <div key={order.id} className="p-5 rounded-2xl border border-stone-200 bg-stone-50/70 hover:bg-stone-50 transition-all space-y-4 text-xs">
                  
                  {/* Top Bar with 12 Displayed Fields (§3) */}
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <img
                        src={order.productImage}
                        alt={order.productName}
                        className="w-16 h-16 rounded-xl object-cover border border-stone-200 shrink-0"
                      />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-emerald-900 font-bold bg-white px-2 py-0.5 rounded border border-stone-200">
                            {order.orderNumber}
                          </span>
                          <span className="text-stone-400">·</span>
                          <span className="text-stone-500">অনুরোধের তারিখ: {order.orderDate}</span>
                        </div>

                        <h4 className="font-bold text-stone-900 text-base">{order.productName}</h4>

                        <div className="text-stone-600 flex flex-wrap items-center gap-x-4 gap-y-1">
                          <span>ক্রেতা: <strong>{order.customerName}</strong></span>
                          <span>প্রতিষ্ঠান: <strong>{order.buyerCompanyName || order.customerRole}</strong></span>
                          <span>ফোন: {order.customerPhone}</span>
                          <span>গন্তব্য: {order.destination}</span>
                        </div>
                      </div>
                    </div>

                    {/* Price and Quantity Metrics */}
                    <div className="lg:text-right p-3 lg:p-0 rounded-xl bg-white lg:bg-transparent border lg:border-none border-stone-200 w-full lg:w-auto">
                      <div className="text-stone-500">
                        চাহিদার পরিমাণ: <strong className="text-stone-900 tabular-nums">{order.quantity.toLocaleString()} {order.unit}</strong>
                      </div>
                      <div className="text-stone-500 mt-0.5">
                        প্রস্তাবিত একক দর: <strong className="text-emerald-900 tabular-nums">৳{order.unitPrice}</strong> / {order.unit}
                      </div>
                      <div className="text-sm font-extrabold text-stone-900 mt-1 tabular-nums">
                        মোট প্রস্তাবিত মূল্য: ৳{order.totalAmount.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Delivery Date & Special Instructions */}
                  <div className="p-3.5 rounded-xl bg-white border border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-stone-600">
                    <div>
                      <strong>প্রত্যাশিত সরবরাহের তারিখ:</strong> {order.expectedDeliveryDate || '৭ দিনের মধ্যে'}
                    </div>
                    <div>
                      <strong>বিশেষ নির্দেশনা:</strong> {order.specialInstructions || 'স্ট্যান্ডার্ড ফুড গ্রেড প্যাকিং সাপেক্ষে'}
                    </div>
                  </div>

                  {/* Reject Box if active for this order */}
                  {rejectingOrderId === order.id ? (
                    <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl space-y-2">
                      <div className="font-bold text-rose-900">প্রত্যাখ্যানের কারণ লিখুন:</div>
                      <input
                        type="text"
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)}
                        placeholder="যেমন: স্টক ফুরিয়ে গেছে / পরিবহন সম্ভব নয়..."
                        className="w-full p-2 bg-white rounded-lg border border-rose-300 text-xs"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setRejectingOrderId(null)}
                          className="px-3 py-1 bg-stone-200 rounded-lg text-stone-700 font-semibold"
                        >
                          বাতিল
                        </button>
                        <button
                          onClick={() => {
                            if (!rejectReason.trim()) return;
                            onRejectOrder(order.id, rejectReason);
                            setRejectingOrderId(null);
                          }}
                          className="px-4 py-1 bg-rose-700 text-white rounded-lg font-bold"
                        >
                          প্রত্যাখ্যান নিশ্চিত করুন
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* The 5 Actions (§3) */
                    <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                      <button
                        onClick={() => setDetailedOrder(order)}
                        className="px-3 py-1.5 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-lg font-bold cursor-pointer"
                      >
                        বিস্তারিত দেখুন
                      </button>

                      <div className="flex flex-wrap items-center gap-2 ml-auto">
                        <button
                          onClick={() => setChatOrder(order)}
                          className="px-3 py-1.5 border border-stone-300 hover:bg-white text-stone-700 rounded-lg font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-stone-500" />
                          <span>ক্রেতার সঙ্গে যোগাযোগ</span>
                        </button>

                        <button
                          onClick={() => setNegotiatingOrder(order)}
                          className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-stone-950 rounded-lg font-bold cursor-pointer shadow-xs"
                        >
                          মূল্য প্রস্তাব পাঠান (কাউন্টার)
                        </button>

                        <button
                          onClick={() => setRejectingOrderId(order.id)}
                          className="px-3 py-1.5 text-rose-700 hover:bg-rose-50 rounded-lg font-bold"
                        >
                          প্রত্যাখ্যান করুন
                        </button>

                        <button
                          onClick={() => onAcceptOrder(order.id)}
                          className="px-4 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <Check className="w-4 h-4 text-amber-300" />
                          <span>অর্ডার গ্রহণ করুন</span>
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SECTION 2: RFQ MANAGEMENT FOR SELLER (§4) */}
      {activeMainTab === 'rfqs' && (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 space-y-5">
          
          {/* Sub tabs: নতুন RFQ, উত্তর দেওয়া হয়েছে, অপেক্ষমাণ, মেয়াদ শেষ, বন্ধ */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-stone-200">
            <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {[
                { id: 'all', label: 'সব RFQ' },
                { id: 'new', label: 'নতুন RFQ' },
                { id: 'quoted', label: 'উত্তর প্রদান করা হয়েছে' },
                { id: 'awaiting', label: 'অপেক্ষমাণ' },
                { id: 'expired', label: 'সময়সীমা শেষ' },
                { id: 'closed', label: 'বন্ধ করা হয়েছে' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setRfqStatusTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                    rfqStatusTab === tab.id
                      ? 'bg-stone-900 text-white'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <span className="text-xs text-stone-500 font-medium">
              মোট {filteredRFQs.length}টি বিজ্ঞপ্তি
            </span>
          </div>

          <div className="space-y-4">
            {filteredRFQs.map(rfq => {
              const hasQuoted = rfq.quotations && rfq.quotations.some(q => q.sellerId === user.id);

              return (
                <div key={rfq.id} className="p-5 rounded-2xl border border-stone-200 bg-stone-50/70 hover:bg-stone-50 transition-all space-y-3 text-xs">
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-emerald-900 font-bold bg-white px-2 py-0.5 rounded border border-stone-200">
                        {rfq.rfqNumber}
                      </span>
                      <span className="text-stone-400">·</span>
                      <span className="text-stone-500">প্রকাশের তারিখ: {rfq.date}</span>
                    </div>

                    <span className="text-stone-500">
                      প্রস্তাব জমার শেষ তারিখ: <strong className="text-rose-700">{rfq.submissionDeadline || '১২ নভেম্বর ২০২৬'}</strong>
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-stone-900 text-base">{rfq.productRequirement}</h4>
                    <p className="text-stone-600 text-[11px] mt-1 leading-relaxed">
                      {rfq.productDescription || 'খাঁটি পাহাড়ি ফসল সরাসরি সমবায় থেকে সংগ্রহের জন্য আহ্বান।'}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-stone-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-stone-700">
                    <div>
                      <span className="text-[10px] text-stone-400 block font-bold">প্রয়োজনীয় পরিমাণ</span>
                      <span className="font-bold text-stone-900 tabular-nums">{rfq.requiredQuantity.toLocaleString()} {rfq.unit}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-400 block font-bold">কাঙ্ক্ষিত একক দর</span>
                      <span className="font-bold text-emerald-900 tabular-nums">৳{rfq.targetPricePerUnit} / {rfq.unit}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-400 block font-bold">সরবরাহের স্থান</span>
                      <span className="font-medium text-stone-800">{rfq.deliveryLocation || rfq.district}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-400 block font-bold">গুণগত মান / গ্রেড</span>
                      <span className="font-medium text-stone-800">{rfq.qualityGrade || '১ম গ্রেড অর্গানিক'}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] text-stone-500 font-medium">
                      ক্রেতা: {rfq.buyerName} ({rfq.companyName}) · মোট {rfq.quotations?.length || rfq.quotationCount}টি কোটেশন জমা
                    </span>

                    <button
                      onClick={() => setRespondingRFQ(rfq)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ${
                        hasQuoted
                          ? 'bg-stone-200 text-stone-800 hover:bg-stone-300'
                          : 'bg-emerald-800 hover:bg-emerald-900 text-white'
                      }`}
                    >
                      <Send className="w-3.5 h-3.5 text-amber-300" />
                      <span>{hasQuoted ? 'কোটেশন হালনাগাদ করুন' : 'মূল্য প্রস্তাব (কোটেশন) জমা দিন'}</span>
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* SECTION 3: SUBMITTED QUOTATIONS */}
      {activeMainTab === 'submitted_quotes' && (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 space-y-4">
          <div className="pb-3 border-b border-stone-200">
            <h3 className="text-base font-bold text-stone-900">আমার জমা দেওয়া মূল্য প্রস্তাবসমূহ (My Submitted Quotations)</h3>
            <p className="text-xs text-stone-500">বিভিন্ন ক্রেতার RFQ-তে আপনার সমবায়ের দেওয়া দর ও চুক্তির বর্তমান স্থিতি</p>
          </div>

          {mySubmittedQuotations.length === 0 ? (
            <div className="py-12 text-center text-stone-400 text-xs">
              আপনি এখনো কোনো RFQ-তে কোটেশন জমা দেননি।
            </div>
          ) : (
            <div className="space-y-4">
              {mySubmittedQuotations.map(({ rfq, quote }) => (
                <div key={quote.id} className="p-4 rounded-xl border border-stone-200 bg-stone-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 font-mono text-emerald-900 font-bold">
                      <span>{rfq.rfqNumber}</span>
                      <span className="text-stone-400">·</span>
                      <span className="text-stone-600 font-sans">{rfq.productRequirement}</span>
                    </div>
                    <div className="text-stone-500">
                      ক্রেতা: {rfq.companyName} · আপনার দর: <strong>৳{quote.proposedUnitPrice}/{quote.unit}</strong> (চাহিদা: {quote.offeredQuantity} {quote.unit})
                    </div>
                    <div className="text-[11px] text-stone-400">
                      সর্বমোট কোটেশন: ৳{quote.totalAmount.toLocaleString()} · ডেলিভারি: {quote.expectedDeliveryDate}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold text-[11px]">
                      {quote.status === 'accepted' ? 'ক্রেতা গ্রহণ করেছেন' : 'বিচারাধীন'}
                    </span>
                    <div className="text-[10px] text-stone-400 mt-1">জমা: {quote.submittedDate}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SECTION 4: UNDER NEGOTIATION */}
      {activeMainTab === 'under_negotiation' && (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 space-y-4">
          <div className="pb-3 border-b border-stone-200">
            <h3 className="text-base font-bold text-stone-900">দর কষাকষি ও আলোচনাধীন অর্ডার</h3>
            <p className="text-xs text-stone-500">যেসব অর্ডারে ক্রেতা ও আপনার মধ্যে এখনো মূল্য চূড়ান্ত হয়নি</p>
          </div>

          <div className="space-y-4">
            {underNegotiationOrders.map(order => (
              <div key={order.id} className="p-4.5 rounded-xl border border-stone-200 bg-stone-50/70 space-y-3 text-xs">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-emerald-900 font-bold">{order.orderNumber}</span>
                    <span className="text-stone-400">·</span>
                    <span className="font-bold text-stone-900">{order.productName}</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded bg-amber-100 text-amber-900 font-bold text-[10px]">
                    পাল্টা প্রস্তাব বিবেচনাধীন
                  </span>
                </div>

                <div className="p-3 bg-white rounded-lg border border-stone-200 flex flex-wrap items-center justify-between gap-3 text-stone-600">
                  <div>
                    <span>ক্রেতা: <strong>{order.customerName}</strong></span>
                    <span className="mx-2">·</span>
                    <span>পরিমাণ: <strong>{order.quantity.toLocaleString()} {order.unit}</strong></span>
                  </div>
                  <div className="font-bold text-stone-900">
                    বর্তমান অফার: <span className="text-emerald-800">৳{order.unitPrice}</span> / {order.unit}
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-1">
                  <button
                    onClick={() => setNegotiatingOrder(order)}
                    className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-stone-950 rounded-xl font-bold cursor-pointer shadow-xs"
                  >
                    কাউন্টার প্রস্তাব দিন / দর দেখুন
                  </button>
                  <button
                    onClick={() => onAcceptPrice(order.id, order.unitPrice)}
                    className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-bold cursor-pointer shadow-xs"
                  >
                    দর গ্রহণ ও নিশ্চিত করুন
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 5: CONFIRMED & PROCESSING (WITH ADVANCE STAGE ACTIONS) */}
      {activeMainTab === 'confirmed_processing' && (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 space-y-4">
          <div className="pb-3 border-b border-stone-200">
            <h3 className="text-base font-bold text-stone-900">নিশ্চিত ও সরবরাহাধীন পাইকারি অর্ডার</h3>
            <p className="text-xs text-stone-500">পণ্য প্রস্তুতকরণ, প্যাকেজিং ও পাহাড়ি পথ পেরিয়ে ট্রাক লোডিং অগ্রগতি আপডেট করুন</p>
          </div>

          <div className="space-y-4">
            {confirmedAndProcessingOrders.map(order => {
              const stage = order.stage || 'confirmed';

              return (
                <div key={order.id} className="p-5 rounded-2xl border border-stone-200 bg-stone-50/70 space-y-4 text-xs">
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-emerald-900 font-bold bg-white px-2 py-0.5 rounded border border-stone-200">
                        {order.orderNumber}
                      </span>
                      <h4 className="font-bold text-stone-900 text-sm">{order.productName}</h4>
                    </div>

                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold text-[11px]">
                      {stage === 'confirmed' ? 'অর্ডার নিশ্চিত' :
                       stage === 'preparing' ? 'পণ্য প্রস্তুতকরণ চলছে' :
                       stage === 'ready_to_ship' ? 'সরবরাহে প্রস্তুত' :
                       stage === 'shipped' ? 'পণ্য ট্রানজিটে আছে' : 'পণ্য গৃহীত'}
                    </span>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-stone-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-stone-600">
                    <div>
                      <span className="text-[10px] text-stone-400 block">ক্রেতা</span>
                      <span className="font-bold text-stone-900">{order.customerName}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-400 block">পরিমাণ</span>
                      <span className="font-bold text-stone-900">{order.quantity.toLocaleString()} {order.unit}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-400 block">মোট মূল্য</span>
                      <span className="font-bold text-emerald-900">৳{order.totalAmount.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-400 block">গন্তব্য</span>
                      <span className="font-medium text-stone-800">{order.destination}</span>
                    </div>
                  </div>

                  {/* Stage Progress Bar embedded */}
                  <OrderProgressTracker
                    currentStage={stage}
                    stageNumber={order.stageNumber}
                    activityHistory={order.activityHistory || []}
                    showHistoryDrawer={false}
                  />

                  {/* Advance Stage Control Buttons for Seller */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-stone-200/80">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setDetailedOrder(order)}
                        className="px-3 py-1.5 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-lg font-bold cursor-pointer"
                      >
                        বিস্তারিত
                      </button>
                      <button
                        onClick={() => setPrintableOrder(order)}
                        className="px-3 py-1.5 border border-stone-300 hover:bg-stone-100 text-stone-700 rounded-lg flex items-center gap-1 cursor-pointer"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>চালান</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      {stage === 'confirmed' && (
                        <button
                          onClick={() => onAdvanceStage(order.id, 'preparing', 'বাগান থেকে ফসল সংগ্রহ ও সর্টিং শুরু হয়েছে।')}
                          className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <span>পণ্য প্রস্তুতকরণ শুরু করুন</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {stage === 'preparing' && (
                        <button
                          onClick={() => onAdvanceStage(order.id, 'ready_to_ship', 'পণ্য প্যাকেজিং সম্পন্ন ও লোডিং পয়েন্টে প্রস্তুত।')}
                          className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <span>সরবরাহের জন্য প্রস্তুত ঘোষণা</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {stage === 'ready_to_ship' && (
                        <button
                          onClick={() => onAdvanceStage(order.id, 'shipped', 'ট্রাকে পণ্য লোড করে চালান প্রেরণ করা হয়েছে।')}
                          className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-stone-950 rounded-xl font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <Truck className="w-4 h-4" />
                          <span>পণ্য প্রেরণ (ট্রানজিট) নিশ্চিত করুন</span>
                        </button>
                      )}

                      {stage === 'shipped' && (
                        <span className="text-amber-800 font-bold bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200 flex items-center gap-1.5">
                          <Truck className="w-4 h-4 text-amber-700" />
                          <span>পাহাড় থেকে গন্তব্যে ট্রানজিটে রয়েছে</span>
                        </span>
                      )}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* SECTION 6: COMPLETED ORDERS */}
      {activeMainTab === 'completed' && (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 space-y-4">
          <div className="pb-3 border-b border-stone-200">
            <h3 className="text-base font-bold text-stone-900">সম্পন্ন অর্ডার ও অর্থছাড়ের বিবরণ</h3>
            <p className="text-xs text-stone-500">ক্রেতা কর্তৃক পণ্য খালাস সম্পন্ন ও এসক্রো অর্থ ছাড় হওয়া সম্পন্ন অর্ডারসমূহ</p>
          </div>

          <div className="space-y-3">
            {completedOrders.map(order => (
              <div key={order.id} className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 font-mono text-emerald-900 font-bold">
                    <span>{order.orderNumber}</span>
                    <span className="text-stone-400">·</span>
                    <span className="font-sans font-bold text-stone-900">{order.productName}</span>
                  </div>
                  <div className="text-stone-600">
                    ক্রেতা: {order.customerName} · পরিমাণ: {order.quantity.toLocaleString()} {order.unit} · গন্তব্য: {order.destination}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-base font-extrabold text-emerald-950 tabular-nums">
                      ৳{order.totalAmount.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-emerald-700 font-bold block">
                      এসক্রো অর্থ ছাড় সম্পন্ন
                    </span>
                  </div>

                  <button
                    onClick={() => setPrintableOrder(order)}
                    className="p-2 border border-stone-300 hover:bg-white text-stone-700 rounded-lg cursor-pointer"
                    title="চালান প্রিন্ট"
                  >
                    <Printer className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ALL MODALS */}
      <OrderDetailsModal
        order={detailedOrder}
        isOpen={!!detailedOrder}
        onClose={() => setDetailedOrder(null)}
        currentUser={user}
        onOpenPrintInvoice={(ord) => setPrintableOrder(ord)}
        onOpenNegotiation={(ord) => setNegotiatingOrder(ord)}
        onOpenChat={(ord) => setChatOrder(ord)}
        onAdvanceStage={onAdvanceStage}
        onAcceptOrder={onAcceptOrder}
        onRejectOrder={onRejectOrder}
      />

      <OrderPrintableInvoiceModal
        order={printableOrder}
        isOpen={!!printableOrder}
        onClose={() => setPrintableOrder(null)}
      />

      <OrderNegotiationModal
        order={negotiatingOrder}
        isOpen={!!negotiatingOrder}
        onClose={() => setNegotiatingOrder(null)}
        currentUser={user}
        onSendCounterOffer={onSendCounterOffer}
        onAcceptPrice={onAcceptPrice}
        onRejectOffer={onRejectOffer}
      />

      <QuotationResponseModal
        rfq={respondingRFQ}
        isOpen={!!respondingRFQ}
        onClose={() => setRespondingRFQ(null)}
        seller={user}
        products={products}
        onSubmitQuotation={onSubmitQuotation}
      />

      <OrderChatModal
        isOpen={!!chatOrder}
        onClose={() => setChatOrder(null)}
        currentUser={user}
        orderNumber={chatOrder?.orderNumber}
        counterPartyName={chatOrder?.customerName || 'ক্রেতা প্রতিনিধি'}
        counterPartyRole="পাইকারি ক্রেতা"
      />

    </div>
  );
};
