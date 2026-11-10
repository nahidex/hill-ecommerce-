import React, { useState } from 'react';
import { 
  Truck, 
  Package, 
  Send, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  Plus, 
  Search, 
  FileText, 
  MessageSquare, 
  Warehouse, 
  ArrowRight,
  TrendingUp,
  MapPin,
  Check
} from 'lucide-react';
import { UserSession, OrderItem, RFQItem, ProductItem } from '../../types';

interface SupplierDashboardViewProps {
  user: UserSession;
  orders: OrderItem[];
  rfqs: RFQItem[];
  products: ProductItem[];
  onOpenAddProduct: () => void;
  onOpenMessages: () => void;
  onUpdateOrderStatus: (orderId: string, status: OrderItem['status']) => void;
}

export const SupplierDashboardView: React.FC<SupplierDashboardViewProps> = ({
  user,
  orders,
  rfqs,
  products,
  onOpenAddProduct,
  onOpenMessages,
  onUpdateOrderStatus
}) => {
  const [rfqList, setRfqList] = useState<RFQItem[]>(rfqs);
  const [activeTab, setActiveTab] = useState<'rfqs' | 'orders' | 'inventory'>('rfqs');
  const [quotingRfqId, setQuotingRfqId] = useState<string | null>(null);
  const [quotePrice, setQuotePrice] = useState<number>(34);

  // Stats calculation
  const totalProducts = products.length + 4;
  const activeProducts = products.length + 3;
  const totalPurchaseOrders = 14; // Farmer procurement orders
  const totalSalesOrders = orders.length + 8;
  const ongoingOrders = orders.filter(o => o.status === 'processing' || o.status === 'shipped').length + 3;
  const completedOrders = orders.filter(o => o.status === 'delivered').length + 5;
  const totalSales = 345000;
  const netEarnings = 48200;

  const handleSendQuote = (rfqId: string) => {
    setRfqList(prev => prev.map(item => {
      if (item.id === rfqId) {
        return {
          ...item,
          status: 'quoted',
          myQuotePrice: quotePrice,
          quotationCount: item.quotationCount + 1
        };
      }
      return item;
    }));
    setQuotingRfqId(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      
      {/* 1. Statistics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        <div className="p-3.5 rounded-xl bg-white border border-stone-200 shadow-2xs">
          <div className="text-[11px] text-stone-500 font-medium">মোট পণ্য</div>
          <div className="text-xl font-bold text-stone-900 mt-1 tabular-nums">{totalProducts}</div>
          <div className="text-[10px] text-stone-400 mt-0.5">গুদাম স্টক</div>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-stone-200 shadow-2xs">
          <div className="text-[11px] text-stone-500 font-medium">সক্রিয় পণ্য</div>
          <div className="text-xl font-bold text-emerald-800 mt-1 tabular-nums">{activeProducts}</div>
          <div className="text-[10px] text-emerald-800 mt-0.5">রেডি ফর সেল</div>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-stone-200 shadow-2xs">
          <div className="text-[11px] text-stone-500 font-medium">মোট ক্রয় অর্ডার</div>
          <div className="text-xl font-bold text-stone-900 mt-1 tabular-nums">{totalPurchaseOrders}</div>
          <div className="text-[10px] text-stone-400 mt-0.5">কৃষক থেকে সংগ্রহ</div>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-stone-200 shadow-2xs">
          <div className="text-[11px] text-stone-500 font-medium">মোট বিক্রয় অর্ডার</div>
          <div className="text-xl font-bold text-stone-900 mt-1 tabular-nums">{totalSalesOrders}</div>
          <div className="text-[10px] text-amber-700 mt-0.5">পাইকারি চুক্তি</div>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-stone-200 shadow-2xs">
          <div className="text-[11px] text-stone-500 font-medium">চলমান অর্ডার</div>
          <div className="text-xl font-bold text-amber-600 mt-1 tabular-nums">{ongoingOrders}</div>
          <div className="text-[10px] text-amber-800 mt-0.5">ট্রানজিটে আছে</div>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-stone-200 shadow-2xs">
          <div className="text-[11px] text-stone-500 font-medium">সম্পন্ন অর্ডার</div>
          <div className="text-xl font-bold text-emerald-700 mt-1 tabular-nums">{completedOrders}</div>
          <div className="text-[10px] text-stone-400 mt-0.5">ডেলিভারড</div>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-stone-200 shadow-2xs col-span-2 sm:col-span-1">
          <div className="text-[11px] text-stone-500 font-medium">মোট বিক্রয়</div>
          <div className="text-xl font-bold text-stone-900 mt-1 tabular-nums">৳৩.৪৫ লাখ</div>
          <div className="text-[10px] text-emerald-800 mt-0.5">টার্নওভার</div>
        </div>

        <div className="p-3.5 rounded-xl bg-emerald-950 text-white border border-emerald-900 shadow-2xs col-span-2 sm:col-span-1">
          <div className="text-[11px] text-emerald-300 font-medium">মোট নিট আয়</div>
          <div className="text-xl font-bold text-amber-400 mt-1 tabular-nums">৳৪৮,২০০</div>
          <div className="text-[10px] text-stone-300 mt-0.5">কমিশন ও মার্জিন</div>
        </div>
      </div>

      {/* 2. Warehouse & Supply Hub Banner */}
      <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
            <Warehouse className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-stone-900">{user.businessName}</h3>
              <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                সাপ্লাই চেইন পার্টনার
              </span>
            </div>
            <p className="text-xs text-stone-600 mt-0.5">
              গুদাম অবস্থান: {user.address} · নিয়মিত কাভার্ড ভ্যান ও কুল-ট্রান্সপোর্ট নেটওয়ার্ক সক্রিয়।
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenAddProduct}
            className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4 text-amber-300" />
            <span>বাল্ক পণ্য লিস্টিং</span>
          </button>
        </div>
      </div>

      {/* 3. Section Switcher Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-3">
        <button
          onClick={() => setActiveTab('rfqs')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'rfqs'
              ? 'bg-emerald-900 text-white'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          ক্রেতাদের RFQ ও কোটেশন আহ্বান ({rfqList.length})
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'orders'
              ? 'bg-emerald-900 text-white'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          চালান ও ডেলিভারি ব্যবস্থাপনা ({orders.length})
        </button>
      </div>

      {/* Tab 1: RFQ & Quotation Submission */}
      {activeTab === 'rfqs' && (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-stone-200 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-stone-900">
                চলমান পাইকারি ক্রয় অনুরোধ (Live RFQs)
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                বড় করপোরেট প্রতিষ্ঠান ও সুপারশপের চাহিদায় সরাসরি আপনার সেরা দর ও কোটেশন পাঠান
              </p>
            </div>
            <span className="text-xs font-semibold text-emerald-800">
              সরাসরি দর কষাকষির সুবিধা
            </span>
          </div>

          <div className="divide-y divide-stone-100">
            {rfqList.map((rfq) => {
              const isQuoting = quotingRfqId === rfq.id;
              const hasQuoted = rfq.status === 'quoted' || rfq.myQuotePrice;

              return (
                <div key={rfq.id} className="p-5 space-y-3 hover:bg-stone-50/50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {rfq.rfqNumber}
                        </span>
                        <span className="text-xs font-bold text-stone-900">{rfq.companyName}</span>
                        <span className="text-xs text-stone-400">({rfq.buyerName})</span>
                      </div>
                      <h4 className="text-sm font-bold text-stone-900 mt-1">
                        {rfq.productRequirement}
                      </h4>
                    </div>

                    <div className="text-left sm:text-right">
                      <div className="text-xs text-stone-500">টার্গেট মূল্য ও পরিমাণ:</div>
                      <div className="text-sm font-bold text-stone-900 tabular-nums">
                        ৳{rfq.targetPricePerUnit} / {rfq.unit} · মোট {rfq.requiredQuantity.toLocaleString()} {rfq.unit}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500 pt-1">
                    <div className="flex items-center gap-3">
                      <span>ক্যাটাগরি: <strong>{rfq.category}</strong></span>
                      <span>·</span>
                      <span>এলাকা: <strong>{rfq.district}</strong></span>
                      <span>·</span>
                      <span>ডেলিভারি প্রত্যাশা: <strong>{rfq.requiredDeliveryDate}</strong></span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-stone-400">
                        {rfq.quotationCount} জন সরবরাহকারী কোটেশন দিয়েছেন
                      </span>

                      {hasQuoted ? (
                        <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-lg flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          <span>আপনার দেওয়া কোটেশন: ৳{rfq.myQuotePrice} / {rfq.unit}</span>
                        </span>
                      ) : (
                        <button
                          onClick={() => {
                            setQuotePrice(rfq.targetPricePerUnit);
                            setQuotingRfqId(rfq.id);
                          }}
                          className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <Send className="w-3.5 h-3.5 text-amber-300" />
                          <span>কোটেশন প্রদান করুন</span>
                        </button>
                      )}

                      <button
                        onClick={onOpenMessages}
                        title="ক্রেতার সাথে চ্যাট করুন"
                        className="p-1.5 text-stone-500 hover:text-emerald-800 hover:bg-stone-100 rounded-lg cursor-pointer"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Inline Quote Form */}
                  {isQuoting && (
                    <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 mt-2 space-y-3">
                      <div className="text-xs font-bold text-emerald-950">
                        আপনার প্রস্তাবিত পাইকারি মূল্য ও শর্ত নির্ধারণ করুন:
                      </div>
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <div className="flex items-center gap-2">
                          <label className="text-xs text-stone-700">দর (প্রতি {rfq.unit}):</label>
                          <input
                            type="number"
                            value={quotePrice}
                            onChange={(e) => setQuotePrice(Number(e.target.value))}
                            className="w-24 px-2 py-1 text-xs border border-emerald-300 rounded bg-white tabular-nums font-bold"
                          />
                          <span className="text-xs text-stone-600">টাকা</span>
                        </div>

                        <div className="text-xs text-stone-600">
                          মোট চালানের আনুমানিক মূল্য: <strong className="text-stone-900 tabular-nums">৳{(quotePrice * rfq.requiredQuantity).toLocaleString()}</strong>
                        </div>

                        <div className="flex items-center gap-2 sm:ml-auto">
                          <button
                            onClick={() => setQuotingRfqId(null)}
                            className="px-3 py-1 text-xs text-stone-600 hover:bg-stone-200/60 rounded"
                          >
                            বাতিল
                          </button>
                          <button
                            onClick={() => handleSendQuote(rfq.id)}
                            className="px-4 py-1 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded"
                          >
                            কোটেশন নিশ্চিত করুন
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Orders & Delivery Tracking */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-stone-200">
            <h3 className="text-base font-bold text-stone-900">
              সরবরাহ ও ডেলিভারি অর্ডার তালিকা
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              ট্রানজিট চালানের বর্তমান অবস্থা ট্র্যাক ও আপডেট করুন
            </p>
          </div>

          <div className="divide-y divide-stone-100">
            {orders.map((o) => (
              <div key={o.id} className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-stone-900">{o.orderNumber}</span>
                    <span className="text-stone-300">·</span>
                    <span className="text-xs font-semibold text-emerald-800">{o.customerName}</span>
                  </div>
                  <h4 className="text-sm font-bold text-stone-900 mt-1">{o.productName}</h4>
                  <div className="text-xs text-stone-500 mt-0.5">
                    পরিমাণ: <strong>{o.quantity.toLocaleString()} {o.unit}</strong> · গন্তব্য: {o.destination}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-bold text-stone-900 tabular-nums">৳{o.totalAmount.toLocaleString()}</div>
                    <div className="text-[10px] text-emerald-800 font-medium">এসক্রো ডিপোজিটেড</div>
                  </div>

                  {o.status === 'processing' && (
                    <button
                      onClick={() => onUpdateOrderStatus(o.id, 'shipped')}
                      className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Truck className="w-3.5 h-3.5" />
                      <span>গাড়ি ছাড়ুন (Ship)</span>
                    </button>
                  )}

                  {o.status === 'shipped' && (
                    <span className="px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded text-xs font-semibold">
                      ট্রাকে পরিবহন চলছে
                    </span>
                  )}

                  {o.status === 'delivered' && (
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded text-xs font-semibold flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>ডেলিভারি সফল</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
