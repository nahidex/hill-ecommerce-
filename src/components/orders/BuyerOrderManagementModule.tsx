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
  Plus, 
  TrendingUp, 
  ArrowRight,
  ShieldCheck,
  Package,
  Layers,
  ChevronRight,
  Check
} from 'lucide-react';
import { 
  OrderItem, 
  RFQItem, 
  UserSession, 
  QuotationItem, 
  OrderStageKey, 
  NegotiationOffer 
} from '../../types';

import { OrderProgressTracker } from './OrderProgressTracker';
import { OrderDetailsModal } from './OrderDetailsModal';
import { OrderPrintableInvoiceModal } from './OrderPrintableInvoiceModal';
import { OrderNegotiationModal } from './OrderNegotiationModal';
import { QuotationComparisonModal } from './QuotationComparisonModal';
import { OrderChatModal } from './OrderChatModal';

interface BuyerOrderManagementModuleProps {
  user: UserSession;
  orders: OrderItem[];
  rfqs: RFQItem[];
  onOpenRFQModal: () => void;
  onAdvanceStage: (orderId: string, nextStage: OrderStageKey, note?: string) => void;
  onSendCounterOffer: (orderId: string, offer: NegotiationOffer) => void;
  onAcceptPrice: (orderId: string, agreedPrice: number) => void;
  onRejectOffer: (orderId: string, reason: string) => void;
  onAcceptQuotation: (rfqId: string, quote: QuotationItem) => void;
  onCancelOrder: (orderId: string, reason: string) => void;
  onInitiatePayment?: (order: OrderItem) => void;
}

export const BuyerOrderManagementModule: React.FC<BuyerOrderManagementModuleProps> = ({
  user,
  orders,
  rfqs,
  onOpenRFQModal,
  onAdvanceStage,
  onSendCounterOffer,
  onAcceptPrice,
  onRejectOffer,
  onAcceptQuotation,
  onCancelOrder,
  onInitiatePayment
}) => {
  // Navigation tabs within Buyer Order Management
  const [activeMainTab, setActiveMainTab] = useState<'orders' | 'rfqs' | 'quotations_compare' | 'negotiation_history'>('orders');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [detailedOrder, setDetailedOrder] = useState<OrderItem | null>(null);
  const [printableOrder, setPrintableOrder] = useState<OrderItem | null>(null);
  const [negotiatingOrder, setNegotiatingOrder] = useState<OrderItem | null>(null);
  const [comparingRFQ, setComparingRFQ] = useState<RFQItem | null>(null);
  const [chatOrder, setChatOrder] = useState<OrderItem | null>(null);

  // 1. Calculate the 8 required summary metrics (§2)
  const totalOrderRequests = orders.length;
  const newOrderRequests = orders.filter(o => o.stage === 'request_submitted' || o.status === 'pending').length;
  const underNegotiation = orders.filter(o => o.stage === 'negotiation' || o.status === 'negotiation').length;
  const confirmedOrders = orders.filter(o => o.stage === 'confirmed').length;
  const processingOrders = orders.filter(o => o.stage === 'preparing' || o.stage === 'ready_to_ship' || o.stage === 'shipped' || o.status === 'processing' || o.status === 'shipped').length;
  const deliveredOrders = orders.filter(o => o.stage === 'received' || o.stage === 'completed' || o.status === 'delivered').length;
  const cancelledOrders = orders.filter(o => o.stage === 'cancelled' || o.status === 'cancelled').length;
  const totalEstimatedValue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  // Filtered orders list
  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesNum = o.orderNumber.toLowerCase().includes(q);
        const matchesProd = o.productName.toLowerCase().includes(q);
        const matchesSeller = (o.sellerName || '').toLowerCase().includes(q);
        if (!matchesNum && !matchesProd && !matchesSeller) return false;
      }

      if (orderStatusFilter !== 'all') {
        if (orderStatusFilter === 'new_request' && o.stage !== 'request_submitted') return false;
        if (orderStatusFilter === 'negotiation' && o.stage !== 'negotiation') return false;
        if (orderStatusFilter === 'confirmed' && o.stage !== 'confirmed') return false;
        if (orderStatusFilter === 'processing' && o.stage !== 'preparing' && o.stage !== 'ready_to_ship' && o.stage !== 'shipped') return false;
        if (orderStatusFilter === 'completed' && o.stage !== 'completed' && o.stage !== 'received') return false;
        if (orderStatusFilter === 'cancelled' && o.stage !== 'cancelled') return false;
      }

      return true;
    });
  }, [orders, searchQuery, orderStatusFilter]);

  // All RFQs that have quotations
  const rfqsWithQuotations = useMemo(() => {
    return rfqs.filter(r => (r.quotations && r.quotations.length > 0) || r.quotationCount > 0);
  }, [rfqs]);

  // All orders with negotiation history
  const negotiationOrders = useMemo(() => {
    return orders.filter(o => o.negotiationHistory && o.negotiationHistory.length > 0);
  }, [orders]);

  return (
    <div className="space-y-8 animate-in fade-in font-bengali">
      
      {/* Page Title & Main RFQ Trigger */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-stone-200">
        <div>
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
            পাইকারি ক্রয় ব্যবস্থাপনা
          </span>
          <h2 className="text-2xl font-bold text-stone-900 mt-0.5">
            ক্রেতা অর্ডার ও কোটেশন নিয়ন্ত্রণ কক্ষ (Buyer Order Management)
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            পাইকারি ক্রয়াদেশ, দ্বিপাক্ষিক দর কষাকষি, কোটেশন তুলনা ও এসক্রো চালান নিয়ন্ত্রণ
          </p>
        </div>

        <button
          onClick={onOpenRFQModal}
          className="px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto shrink-0"
        >
          <Plus className="w-4 h-4 text-amber-300" />
          <span>নতুন RFQ কোটেশন আহ্বান করুন</span>
        </button>
      </div>

      {/* 2. The 8 Summary Cards (§2) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {/* Card 1 */}
        <div className="p-3.5 rounded-xl bg-white border border-stone-200 shadow-2xs">
          <div className="text-[11px] text-stone-500 font-medium">মোট অর্ডার অনুরোধ</div>
          <div className="text-xl font-bold text-stone-900 mt-1 tabular-nums">{totalOrderRequests}</div>
          <div className="text-[10px] text-stone-400 mt-1">সর্বমোট ক্রয়াদেশ</div>
        </div>

        {/* Card 2 */}
        <div className="p-3.5 rounded-xl bg-white border border-stone-200 shadow-2xs">
          <div className="text-[11px] text-stone-500 font-medium">নতুন অর্ডার অনুরোধ</div>
          <div className="text-xl font-bold text-emerald-700 mt-1 tabular-nums">{newOrderRequests}</div>
          <div className="text-[10px] text-emerald-800 mt-1">সদ্য সাবমিটকৃত</div>
        </div>

        {/* Card 3 */}
        <div className="p-3.5 rounded-xl bg-white border border-stone-200 shadow-2xs">
          <div className="text-[11px] text-stone-500 font-medium">মূল্য আলোচনাধীন</div>
          <div className="text-xl font-bold text-amber-600 mt-1 tabular-nums">{underNegotiation}</div>
          <div className="text-[10px] text-amber-700 mt-1">দর সমঝোতা চলছে</div>
        </div>

        {/* Card 4 */}
        <div className="p-3.5 rounded-xl bg-white border border-stone-200 shadow-2xs">
          <div className="text-[11px] text-stone-500 font-medium">নিশ্চিত অর্ডার</div>
          <div className="text-xl font-bold text-emerald-900 mt-1 tabular-nums">{confirmedOrders}</div>
          <div className="text-[10px] text-stone-400 mt-1">উভয় পক্ষ সম্মত</div>
        </div>

        {/* Card 5 */}
        <div className="p-3.5 rounded-xl bg-white border border-stone-200 shadow-2xs">
          <div className="text-[11px] text-stone-500 font-medium">প্রক্রিয়াধীন অর্ডার</div>
          <div className="text-xl font-bold text-stone-900 mt-1 tabular-nums">{processingOrders}</div>
          <div className="text-[10px] text-stone-400 mt-1">প্যাকিং ও ট্রানজিট</div>
        </div>

        {/* Card 6 */}
        <div className="p-3.5 rounded-xl bg-white border border-stone-200 shadow-2xs">
          <div className="text-[11px] text-stone-500 font-medium">সরবরাহ সম্পন্ন</div>
          <div className="text-xl font-bold text-emerald-800 mt-1 tabular-nums">{deliveredOrders}</div>
          <div className="text-[10px] text-emerald-800 mt-1">পণ্য খালাস ও অর্থছাড়</div>
        </div>

        {/* Card 7 */}
        <div className="p-3.5 rounded-xl bg-white border border-stone-200 shadow-2xs">
          <div className="text-[11px] text-stone-500 font-medium">বাতিলকৃত অর্ডার</div>
          <div className="text-xl font-bold text-rose-700 mt-1 tabular-nums">{cancelledOrders}</div>
          <div className="text-[10px] text-rose-600 mt-1">রিফান্ড সম্পন্ন</div>
        </div>

        {/* Card 8 */}
        <div className="p-3.5 rounded-xl bg-emerald-950 text-white shadow-sm border border-emerald-900">
          <div className="text-[10px] text-amber-300 font-bold uppercase">মোট সম্ভাব্য মূল্য</div>
          <div className="text-base sm:text-lg font-bold text-white mt-1 tabular-nums">
            ৳{(totalEstimatedValue / 1000).toFixed(0)}k+
          </div>
          <div className="text-[10px] text-emerald-300 mt-0.5">এসক্রো বাজেট</div>
        </div>
      </div>

      {/* 3. Section Navigation Tabs (§10) */}
      <div className="border-b border-stone-200 flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setActiveMainTab('orders')}
          className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
            activeMainTab === 'orders'
              ? 'bg-emerald-900 text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>আমার অর্ডারসমূহ ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveMainTab('rfqs')}
          className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
            activeMainTab === 'rfqs'
              ? 'bg-emerald-900 text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>আমার RFQসমূহ ({rfqs.length})</span>
        </button>

        <button
          onClick={() => setActiveMainTab('quotations_compare')}
          className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
            activeMainTab === 'quotations_compare'
              ? 'bg-emerald-900 text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>প্রাপ্ত মূল্য প্রস্তাব ও তুলনা ({rfqsWithQuotations.length})</span>
        </button>

        <button
          onClick={() => setActiveMainTab('negotiation_history')}
          className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
            activeMainTab === 'negotiation_history'
              ? 'bg-emerald-900 text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>মূল্য আলোচনার ইতিহাস ({negotiationOrders.length})</span>
        </button>
      </div>

      {/* SECTION 1: MY ORDERS TABLE WITH FILTERS */}
      {activeMainTab === 'orders' && (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 space-y-5">
          
          {/* Sub-Filter Tabs & Search Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
            {/* Status pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {[
                { id: 'all', label: 'সব অর্ডার' },
                { id: 'new_request', label: 'নতুন অনুরোধ' },
                { id: 'negotiation', label: 'আলোচনাধীন' },
                { id: 'confirmed', label: 'নিশ্চিত' },
                { id: 'processing', label: 'প্রক্রিয়াধীন ও ট্রানজিট' },
                { id: 'completed', label: 'সম্পন্ন' },
                { id: 'cancelled', label: 'বাতিল' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setOrderStatusFilter(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                    orderStatusFilter === tab.id
                      ? 'bg-stone-900 text-white'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[220px]">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="অর্ডার নং বা পণ্য খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs pl-8 pr-3 py-1.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-stone-50"
              />
            </div>
          </div>

          {/* Orders Table */}
          {filteredOrders.length === 0 ? (
            <div className="py-12 text-center text-stone-400 text-xs">
              এই ফিল্টারে কোনো অর্ডার পাওয়া যায়নি।
            </div>
          ) : (
            <div className="divide-y divide-stone-100">
              {filteredOrders.map(order => {
                const stage = order.stage || 'request_submitted';
                const isUnderNeg = stage === 'negotiation';

                return (
                  <div key={order.id} className="py-4.5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 text-xs">
                    
                    {/* Left: Product & Order Info */}
                    <div className="flex items-start gap-3.5">
                      <img
                        src={order.productImage}
                        alt={order.productName}
                        className="w-14 h-14 rounded-xl object-cover border border-stone-200 shrink-0"
                      />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-emerald-900 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            {order.orderNumber}
                          </span>
                          <span className="text-stone-400">·</span>
                          <span className="text-stone-500">{order.orderDate}</span>
                        </div>

                        <h4 className="font-bold text-stone-900 text-sm">{order.productName}</h4>

                        <div className="text-stone-500 flex flex-wrap items-center gap-x-3 gap-y-1">
                          <span>বিক্রেতা: <strong className="text-stone-800">{order.sellerName || 'সমবায় সমিতি'}</strong></span>
                          <span>পরিমাণ: <strong className="text-stone-800">{order.quantity.toLocaleString()} {order.unit}</strong></span>
                          <span>দর: ৳{order.unitPrice}/{order.unit}</span>
                          <span>গন্তব্য: {order.destination}</span>
                        </div>
                      </div>
                    </div>

                    {/* Middle: Stage & Status */}
                    <div className="flex flex-col lg:items-end gap-1.5 shrink-0">
                      <div className="text-right">
                        <span className="text-[10px] text-stone-400 block font-bold">মোট চুক্তি মূল্য</span>
                        <span className="text-base font-bold text-stone-900 tabular-nums">
                          ৳{order.totalAmount.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold border ${
                          stage === 'completed'
                            ? 'bg-emerald-100 text-emerald-900 border-emerald-200'
                            : stage === 'cancelled'
                              ? 'bg-rose-100 text-rose-900 border-rose-200'
                              : stage === 'shipped' || stage === 'received'
                                ? 'bg-amber-100 text-amber-900 border-amber-200'
                                : stage === 'negotiation'
                                  ? 'bg-purple-100 text-purple-900 border-purple-200'
                                  : 'bg-stone-100 text-stone-800 border-stone-200'
                        }`}>
                          {stage === 'request_submitted' ? 'নতুন অনুরোধ' :
                           stage === 'negotiation' ? 'দর আলোচনাধীন' :
                           stage === 'confirmed' ? 'অর্ডার নিশ্চিত' :
                           stage === 'preparing' ? 'প্রস্তুতকরণ চলছে' :
                           stage === 'ready_to_ship' ? 'সরবরাহে প্রস্তুত' :
                           stage === 'shipped' ? 'ট্রানজিটে আছে' :
                           stage === 'received' ? 'পণ্য গৃহীত' :
                           stage === 'completed' ? 'অর্ডার সম্পন্ন' : 'বাতিল'}
                        </span>
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-2 shrink-0 w-full lg:w-auto pt-2 lg:pt-0 border-t lg:border-t-0 border-stone-100">
                      {(stage === 'confirmed' || order.escrowStatus === 'pending_deposit') && onInitiatePayment && (
                        <button
                          onClick={() => onInitiatePayment(order)}
                          className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-bold flex items-center justify-center gap-1 cursor-pointer shadow-xs animate-pulse"
                          title="এসক্রো ট্রাস্টে পেমেন্ট করুন"
                        >
                          <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                          <span>পেমেন্ট</span>
                        </button>
                      )}

                      <button
                        onClick={() => setDetailedOrder(order)}
                        className="flex-1 lg:flex-none px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg font-bold flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-amber-300" />
                        <span>বিস্তারিত</span>
                      </button>

                      <button
                        onClick={() => setPrintableOrder(order)}
                        className="px-2.5 py-1.5 border border-stone-300 hover:bg-stone-100 text-stone-700 rounded-lg cursor-pointer"
                        title="চালান প্রিন্ট"
                      >
                        <Printer className="w-3.5 h-3.5" />
                      </button>

                      {stage !== 'completed' && stage !== 'cancelled' && (
                        <button
                          onClick={() => setNegotiatingOrder(order)}
                          className="px-2.5 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold rounded-lg cursor-pointer"
                          title="দর আলোচনা"
                        >
                          দর আলোচনা
                        </button>
                      )}

                      <button
                        onClick={() => setChatOrder(order)}
                        className="px-2.5 py-1.5 border border-stone-300 hover:bg-stone-100 text-stone-700 rounded-lg cursor-pointer"
                        title="বার্তা"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>
      )}

      {/* SECTION 2: MY RFQS */}
      {activeMainTab === 'rfqs' && (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <div>
              <h3 className="text-base font-bold text-stone-900">আমার প্রকাশিত কোটেশন আহ্বান (RFQ List)</h3>
              <p className="text-xs text-stone-500">৩ পার্বত্য জেলার কৃষকদের উদ্দেশ্যে প্রকাশিত পাইকারি বিজ্ঞপ্তি</p>
            </div>
            <button
              onClick={onOpenRFQModal}
              className="px-3 py-1.5 bg-emerald-800 text-white rounded-lg text-xs font-bold"
            >
              + নতুন RFQ আহ্বান
            </button>
          </div>

          <div className="space-y-3">
            {rfqs.map(rfq => (
              <div key={rfq.id} className="p-4 rounded-xl border border-stone-200 bg-stone-50/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-emerald-900 font-bold">{rfq.rfqNumber}</span>
                    <span className="text-stone-400">·</span>
                    <span className="text-stone-500">প্রকাশ: {rfq.date}</span>
                  </div>
                  <h4 className="font-bold text-stone-900 text-sm">{rfq.productRequirement}</h4>
                  <div className="text-stone-500">
                    পরিমাণ: <strong>{rfq.requiredQuantity.toLocaleString()} {rfq.unit}</strong> · টার্গেট দর: ৳{rfq.targetPricePerUnit} · ডেলিভারি: {rfq.requiredDeliveryDate}
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-800 block">
                      {rfq.quotations?.length || rfq.quotationCount}টি কোটেশন জমা
                    </span>
                    <span className="text-[10px] text-stone-400">
                      {rfq.status === 'open' ? 'উন্মুক্ত আছে' : 'বিচারাধীন'}
                    </span>
                  </div>

                  <button
                    onClick={() => setComparingRFQ(rfq)}
                    className="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-stone-950 rounded-xl text-xs font-bold shadow-xs flex items-center gap-1 cursor-pointer"
                  >
                    <span>কোটেশন তুলনা করুন</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 3: QUOTATION COMPARISON (§10) */}
      {activeMainTab === 'quotations_compare' && (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 space-y-4">
          <div className="pb-3 border-b border-stone-200">
            <h3 className="text-base font-bold text-stone-900">প্রাপ্ত মূল্য প্রস্তাবসমূহ তুলনা ও অনুমোদন</h3>
            <p className="text-xs text-stone-500">বিভিন্ন উৎপাদক ও বিক্রেতাদের জমা দেওয়া কোটেশনের মধ্যে সেরাটি বাছাই করুন</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rfqsWithQuotations.map(rfq => (
              <div key={rfq.id} className="p-4 rounded-xl border border-stone-200 bg-stone-50 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-emerald-900 font-bold">{rfq.rfqNumber}</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-bold text-[10px]">
                    {rfq.quotations?.length || rfq.quotationCount}টি দরপ্রস্তাব
                  </span>
                </div>

                <h4 className="font-bold text-stone-900 text-sm">{rfq.productRequirement}</h4>

                <p className="text-stone-600 text-[11px] line-clamp-2">
                  {rfq.productDescription || 'খাঁটি পাহাড়ি পণ্য সরবরাহের জন্য আহ্বানকৃত কোটেশন।'}
                </p>

                <div className="pt-2 border-t border-stone-200 flex items-center justify-between">
                  <span className="text-stone-500">টার্গেট: ৳{rfq.targetPricePerUnit}/{rfq.unit}</span>
                  <button
                    onClick={() => setComparingRFQ(rfq)}
                    className="px-4 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>সব কোটেশন তুলনা করুন</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 4: NEGOTIATION HISTORY */}
      {activeMainTab === 'negotiation_history' && (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 space-y-4">
          <div className="pb-3 border-b border-stone-200">
            <h3 className="text-base font-bold text-stone-900">মূল্য সমঝোতার বিস্তারিত ইতিহাস (Negotiation Log)</h3>
            <p className="text-xs text-stone-500">ক্রেতা ও বিক্রেতার মাঝে আদান-প্রদানকৃত সব কাউন্টার অফার ও টাইমলাইন</p>
          </div>

          <div className="space-y-4">
            {negotiationOrders.map(order => (
              <div key={order.id} className="p-4 rounded-xl border border-stone-200 bg-stone-50/60 space-y-3 text-xs">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-emerald-900">{order.orderNumber}</span>
                    <span className="text-stone-400">·</span>
                    <span className="font-bold text-stone-900">{order.productName}</span>
                  </div>
                  <span className="text-emerald-800 font-bold">
                    বর্তমান গৃহীত/প্রস্তাবিত দর: ৳{order.unitPrice}/{order.unit}
                  </span>
                </div>

                <div className="space-y-2 pl-4 border-l-2 border-emerald-700">
                  {order.negotiationHistory?.map((neg, i) => (
                    <div key={i} className="text-[11px] text-stone-600 flex items-start justify-between gap-3">
                      <div>
                        <strong>{neg.senderName} ({neg.senderRole === 'buyer' ? 'ক্রেতা' : 'বিক্রেতা'}):</strong>
                        <span className="text-stone-900 font-bold ml-1">৳{neg.priceOffer} / {order.unit}</span>
                        <span className="text-stone-500 ml-2">"{neg.note}"</span>
                      </div>
                      <span className="text-stone-400 text-[10px] whitespace-nowrap">{neg.timestamp}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => setNegotiatingOrder(order)}
                    className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-stone-950 rounded-lg text-xs font-bold cursor-pointer"
                  >
                    পুনরায় দর আলোচনা খুলুন
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
        onCancelOrder={onCancelOrder}
        onInitiatePayment={onInitiatePayment}
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

      <QuotationComparisonModal
        rfq={comparingRFQ}
        isOpen={!!comparingRFQ}
        onClose={() => setComparingRFQ(null)}
        onAcceptQuotation={onAcceptQuotation}
        onOpenNegotiation={(quote) => {
          // If buyer wants to negotiate a quote, open negotiation for the related order
          const relatedOrder = orders.find(o => o.orderNumber.includes(quote.rfqNumber) || o.productName.includes(quote.rfqNumber));
          if (relatedOrder) {
            setNegotiatingOrder(relatedOrder);
          }
        }}
        onOpenChat={(quote) => {
          // Open direct chat with this seller
          if (orders.length > 0) {
            setChatOrder({
              ...orders[0],
              sellerName: quote.sellerName,
              sellerPhone: quote.sellerPhone
            });
          }
        }}
      />

      <OrderChatModal
        isOpen={!!chatOrder}
        onClose={() => setChatOrder(null)}
        currentUser={user}
        orderNumber={chatOrder?.orderNumber}
        counterPartyName={chatOrder?.sellerName || 'বিক্রেতা প্রতিনিধি'}
        counterPartyRole="উৎপাদক / সমবায়"
      />

    </div>
  );
};
