import React, { useState } from 'react';
import { 
  Package, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  DollarSign, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  MessageSquare, 
  Check, 
  X, 
  Search, 
  ShieldCheck, 
  Star,
  Layers,
  ArrowUpRight,
  Truck
} from 'lucide-react';
import { ProductItem, OrderItem, UserSession } from '../../types';
import { MiniLineChart } from '../charts/MiniLineChart';
import { MiniDonutChart } from '../charts/MiniDonutChart';

interface FarmerDashboardViewProps {
  user: UserSession;
  products: ProductItem[];
  orders: OrderItem[];
  onOpenAddProduct: () => void;
  onOpenMessages: () => void;
  onViewPayments: () => void;
  onUpdateOrderStatus: (orderId: string, status: OrderItem['status']) => void;
  onToggleProductStatus: (productId: string) => void;
}

export const FarmerDashboardView: React.FC<FarmerDashboardViewProps> = ({
  user,
  products,
  orders,
  onOpenAddProduct,
  onOpenMessages,
  onViewPayments,
  onUpdateOrderStatus,
  onToggleProductStatus
}) => {
  const [productSearch, setProductSearch] = useState('');
  const [selectedProductCategory, setSelectedProductCategory] = useState('all');

  // Stats calculation
  const totalListedProducts = products.length;
  const activeAvailableProducts = products.filter(p => p.status !== 'out_of_stock').length;
  const totalSalesOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const completedOrders = orders.filter(o => o.status === 'delivered').length;
  const totalSalesRevenue = orders
    .filter(o => o.status === 'delivered' || o.status === 'shipped')
    .reduce((sum, o) => sum + o.totalAmount, 0);
  const potentialIncome = orders
    .filter(o => o.status === 'processing' || o.status === 'pending')
    .reduce((sum, o) => sum + o.totalAmount, 0);
  const inTransitOrders = orders.filter(o => o.status === 'shipped').length;
  const cancelledOrders = orders.filter(o => o.status === 'cancelled').length;

  // Illustrative 6-month revenue trend ending at the current snapshot
  const revenueTrend = [0.38, 0.52, 0.6, 0.74, 0.86, 1].map(
    factor => Math.round((totalSalesRevenue || 50000) * factor)
  );

  const filteredProducts = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(productSearch.toLowerCase());
    const matchCat = selectedProductCategory === 'all' || p.categorySlug === selectedProductCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-8 animate-in fade-in">
      
      {/* 1. Statistics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3.5">
        
        <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs">
          <div className="text-xs text-stone-500 font-medium">মোট তালিকাভুক্ত পণ্য</div>
          <div className="text-2xl font-bold text-stone-900 mt-1 tabular-nums">
            {totalListedProducts}
          </div>
          <div className="text-[11px] text-emerald-800 mt-1 flex items-center gap-0.5">
            <span>সবজি, ফল ও মসলা</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs">
          <div className="text-xs text-stone-500 font-medium">বিক্রির জন্য প্রস্তুত</div>
          <div className="text-2xl font-bold text-emerald-800 mt-1 tabular-nums">
            {activeAvailableProducts}
          </div>
          <div className="text-[11px] text-stone-400 mt-1">সক্রিয় লট</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs">
          <div className="text-xs text-stone-500 font-medium">মোট বিক্রয় অর্ডার</div>
          <div className="text-2xl font-bold text-stone-900 mt-1 tabular-nums">
            {totalSalesOrders}
          </div>
          <div className="text-[11px] text-amber-700 mt-1">পাইকারি বাল্ক চুক্তি</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs">
          <div className="text-xs text-stone-500 font-medium">অপেক্ষমাণ অর্ডার</div>
          <div className="text-2xl font-bold text-amber-600 mt-1 tabular-nums">
            {pendingOrders}
          </div>
          <div className="text-[11px] text-stone-400 mt-1">অনুমোদনের অপেক্ষায়</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs">
          <div className="text-xs text-stone-500 font-medium">সম্পন্ন অর্ডার</div>
          <div className="text-2xl font-bold text-emerald-700 mt-1 tabular-nums">
            {completedOrders}
          </div>
          <div className="text-[11px] text-emerald-800 mt-1">সফল ডেলিভারি</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs col-span-2 sm:col-span-1">
          <div className="text-xs text-stone-500 font-medium">মোট বিক্রয়ের পরিমাণ</div>
          <div className="text-2xl font-bold text-stone-900 mt-1 tabular-nums">
            ৳{totalSalesRevenue.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-800 mt-1">হিসাবে জমা হয়েছে</div>
        </div>

        <div className="p-4 rounded-xl bg-emerald-950 text-white border border-emerald-900 shadow-2xs col-span-2 sm:col-span-1">
          <div className="text-xs text-emerald-300 font-medium">সম্ভাব্য পাইকারি আয়</div>
          <div className="text-2xl font-bold text-amber-400 mt-1 tabular-nums">
            ৳{potentialIncome.toLocaleString()}
          </div>
          <div className="text-[11px] text-stone-300 mt-1">এসক্রোতে প্রসেসিং</div>
        </div>

      </div>

      {/* 2. Analytics: Revenue Trend & Order Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-stone-200 shadow-2xs p-5">
          <h3 className="text-sm font-bold text-stone-900">মাসভিত্তিক বিক্রয় আয়ের প্রবণতা</h3>
          <p className="text-xs text-stone-500 mt-0.5 mb-2">গত ৬ মাসের পাইকারি বিক্রয় আয়ের গ্রাফিকাল চিত্র</p>
          <MiniLineChart
            categories={['মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর']}
            series={[{ label: 'বিক্রয় আয়', color: '#065f46', values: revenueTrend }]}
            formatValue={(v) => `৳${v.toLocaleString()}`}
          />
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs p-5">
          <h3 className="text-sm font-bold text-stone-900">অর্ডারের বর্তমান অবস্থা</h3>
          <p className="text-xs text-stone-500 mt-0.5 mb-3">মোট {totalSalesOrders}টি অর্ডারের বিভাজন</p>
          <MiniDonutChart
            size={120}
            strokeWidth={14}
            centerValue={`${totalSalesOrders}`}
            centerLabel="মোট অর্ডার"
            data={[
              { label: 'সম্পন্ন', value: completedOrders || 1, color: '#065f46' },
              { label: 'পরিবহনে', value: inTransitOrders, color: '#2563eb' },
              { label: 'অপেক্ষমাণ', value: pendingOrders, color: '#d97706' },
              { label: 'বাতিল', value: cancelledOrders, color: '#9f1239' }
            ]}
          />
        </div>
      </div>

      {/* 3. Quick Actions Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-900 via-emerald-800 to-stone-900 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-md">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
            কৃষক ও সমবায় টুলকিট
          </span>
          <h3 className="text-lg font-bold">
            নতুন ফসল উঠেছে? সরাসরি সারা দেশের পাইকারি বাজারে বিজ্ঞাপন দিন
          </h3>
          <p className="text-xs text-stone-300 max-w-xl">
            পার্বত্য চট্টগ্রাম বিষয়ক মন্ত্রণালয়ের বিশেষ লজিস্টিকস ও এসক্রো সুরক্ষায় মধ্যস্বত্বভোগী ছাড়াই ন্যায্য মূল্য নিশ্চিত করুন।
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          <button
            onClick={onOpenAddProduct}
            className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-950 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>নতুন পণ্য যুক্ত করুন</span>
          </button>

          <button
            onClick={onOpenMessages}
            className="px-4 py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white border border-emerald-600 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-amber-300" />
            <span>ক্রেতার সাথে মূল্য আলোচনা</span>
          </button>
        </div>
      </div>

      {/* 4. Product Listing Management Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-stone-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-stone-900">
              পণ্য ব্যবস্থাপনা (Product Listing Management)
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              আপনার তালিকাভুক্ত ফসলের মজুত, একক মূল্য এবং বিক্রয় অবস্থা নিয়ন্ত্রণ করুন
            </p>
          </div>

          <div className="flex items-center gap-2.5 w-full md:w-auto">
            <div className="relative flex-1 md:w-60">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="পণ্য খুঁজুন..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="w-full text-xs pl-8 pr-3 py-1.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-stone-50"
              />
            </div>

            <button
              onClick={onOpenAddProduct}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg flex items-center gap-1 shrink-0 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>পণ্য যোগ</span>
            </button>
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50/75 text-stone-600 font-semibold">
                <th className="py-3 px-4">পণ্যের ছবি ও নাম</th>
                <th className="py-3 px-4">ক্যাটাগরি</th>
                <th className="py-3 px-4">উপলব্ধ পরিমাণ</th>
                <th className="py-3 px-4">একক মূল্য</th>
                <th className="py-3 px-4">ন্যূনতম অর্ডার</th>
                <th className="py-3 px-4">অবস্থা</th>
                <th className="py-3 px-4 text-right">কার্যক্রম</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredProducts.map((p) => {
                const isOutOfStock = p.status === 'out_of_stock';
                return (
                  <tr key={p.id} className="hover:bg-stone-50/60 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-lg bg-stone-100 overflow-hidden shrink-0 border border-stone-200">
                          <img
                            src={p.image}
                            alt={p.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-bold text-stone-900 line-clamp-1">{p.name}</div>
                          <div className="text-[11px] text-stone-500">{p.origin}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-stone-700 font-medium">
                      {p.category}
                    </td>

                    <td className="py-3 px-4 font-semibold text-stone-900 tabular-nums">
                      {p.availableQuantity.toLocaleString()} {p.unit}
                    </td>

                    <td className="py-3 px-4 font-bold text-emerald-900 tabular-nums">
                      ৳{p.pricePerUnit} <span className="text-stone-400 font-normal">/ {p.unit}</span>
                    </td>

                    <td className="py-3 px-4 text-stone-600 tabular-nums">
                      {p.minOrderQuantity} {p.unit}
                    </td>

                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                          isOutOfStock
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {isOutOfStock ? 'স্টক শেষ' : 'বিক্রির জন্য উন্মুক্ত'}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onToggleProductStatus(p.id)}
                          title={isOutOfStock ? 'সক্রিয় করুন' : 'স্টক শেষ চিহ্নিত করুন'}
                          className="p-1.5 text-stone-500 hover:text-emerald-800 rounded hover:bg-stone-100"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={onOpenAddProduct}
                          title="সম্পাদনা"
                          className="p-1.5 text-stone-500 hover:text-amber-700 rounded hover:bg-stone-100"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="p-3 bg-stone-50 border-t border-stone-200 text-xs text-stone-500 flex items-center justify-between">
          <span>মোট {filteredProducts.length}টি তালিকাভুক্ত পণ্য প্রদর্শিত হচ্ছে</span>
          <span className="text-emerald-800 font-medium">মন্ত্রণালয় মান যাচাইকৃত গ্রেড-১ লট</span>
        </div>
      </div>

      {/* 4. Incoming Purchase Requests & Orders */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-stone-200 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-stone-900">
              ক্রেতাদের ক্রয় অনুরোধ ও চলমান অর্ডার
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              অর্ডার গ্রহণ করুন, সরাসরি মূল্য আলোচনা করুন অথবা চালান প্রেরণ করুন
            </p>
          </div>
          <button
            onClick={onViewPayments}
            className="text-xs font-semibold text-emerald-800 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>পেমেন্টের অবস্থা দেখুন</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-stone-100">
          {orders.map((order) => {
            return (
              <div key={order.id} className="p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-stone-50/60 transition-colors">
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-stone-100 overflow-hidden shrink-0 border border-stone-200 mt-0.5">
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
                      <span className="text-xs font-semibold text-emerald-800">{order.customerName}</span>
                    </div>
                    <div className="text-xs font-bold text-stone-800 mt-1">
                      {order.productName} ({order.quantity.toLocaleString()} {order.unit})
                    </div>
                    <div className="text-[11px] text-stone-500 flex items-center gap-2 mt-0.5">
                      <span>গন্তব্য: {order.destination}</span>
                      <span>·</span>
                      <span>তারিখ: {order.orderDate}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                  <div className="text-left sm:text-right">
                    <div className="text-sm font-bold text-stone-900 tabular-nums">
                      ৳{order.totalAmount.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-emerald-800 font-medium">
                      {order.escrowStatus === 'in_escrow' ? 'এসক্রোতে সুরক্ষিত' : 'অর্থ ছাড় হয়েছে'}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {order.status === 'pending' && (
                      <>
                        <button
                          onClick={() => onUpdateOrderStatus(order.id, 'processing')}
                          className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>গ্রহণ করুন</span>
                        </button>
                        <button
                          onClick={() => onUpdateOrderStatus(order.id, 'cancelled')}
                          className="px-2.5 py-1.5 bg-stone-100 hover:bg-rose-50 text-stone-600 hover:text-rose-700 rounded-lg text-xs font-medium cursor-pointer"
                        >
                          প্রত্যাখ্যান
                        </button>
                      </>
                    )}

                    {order.status === 'processing' && (
                      <button
                        onClick={() => onUpdateOrderStatus(order.id, 'shipped')}
                        className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <Truck className="w-3.5 h-3.5" />
                        <span>চালান প্রেরণ করুন</span>
                      </button>
                    )}

                    {order.status === 'shipped' && (
                      <span className="px-2.5 py-1 rounded bg-amber-50 text-amber-800 text-xs font-semibold border border-amber-200">
                        ট্রানজিটে রয়েছে
                      </span>
                    )}

                    {order.status === 'delivered' && (
                      <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200 flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                        <span>ডেলিভারি সম্পন্ন</span>
                      </span>
                    )}

                    <button
                      onClick={onOpenMessages}
                      title="ক্রেতার সাথে চ্যাট করুন"
                      className="p-2 rounded-lg text-stone-500 hover:text-emerald-900 hover:bg-stone-100 cursor-pointer"
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

    </div>
  );
};
