import React, { useState } from 'react';
import { 
  Store, 
  ShoppingBag, 
  Eye, 
  Plus, 
  Star, 
  DollarSign, 
  Tag, 
  TrendingUp, 
  Palette, 
  CheckCircle2, 
  Clock, 
  Layers,
  ArrowUpRight,
  Share2
} from 'lucide-react';
import { UserSession, ProductItem, OrderItem } from '../../types';
import { HANDLOOM_IMAGE, SPICES_IMAGE } from '../../data/products';

interface EntrepreneurDashboardViewProps {
  user: UserSession;
  products: ProductItem[];
  orders: OrderItem[];
  onOpenShopPreview: () => void;
  onOpenAddProduct: () => void;
  onOpenMessages: () => void;
  onViewPayments: () => void;
  onUpdateShopInfo: (shopName: string, bio: string) => void;
}

export const EntrepreneurDashboardView: React.FC<EntrepreneurDashboardViewProps> = ({
  user,
  products,
  orders,
  onOpenShopPreview,
  onOpenAddProduct,
  onOpenMessages,
  onViewPayments,
  onUpdateShopInfo
}) => {
  const [shopName, setShopName] = useState(user.shopName || 'মারমা ক্রাফট অ্যান্ড অর্গানিক হাব');
  const [shopBio, setShopBio] = useState(user.bio || 'কোমর তাঁতে বোনা ঐতিহ্যবাহী বস্ত্র ও কারুশিল্প');
  const [isEditingShop, setIsEditingShop] = useState(false);
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'reviews'>('products');

  // Stats calculation
  const totalProducts = products.length + 8;
  const activeProducts = products.length + 6;
  const totalOrders = orders.length + 12;
  const newOrders = orders.filter(o => o.status === 'pending').length + 2;
  const completedOrders = orders.filter(o => o.status === 'delivered').length + 9;
  const totalSales = 186400;
  const shopVisitors = 3840;

  const handleSaveShopSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateShopInfo(shopName, shopBio);
    setIsEditingShop(false);
  };

  const sampleReviews = [
    {
      id: 'rev-1',
      customer: 'নুসরাত জাহান (উত্তরা, ঢাকা)',
      product: 'চাকমা নকশী কোমর তাঁত শাল',
      rating: 5,
      date: '০৫ নভেম্বর ২০২৬',
      comment: 'সুতার মান অত্যন্ত ভালো, জ্যামিতিক নকশাগুলো ছবির চেয়েও সুন্দর। প্যাকেজিংও আকর্ষণীয় ছিল।'
    },
    {
      id: 'rev-2',
      customer: 'তৌফিক হাসান (চট্টগ্রাম)',
      product: 'প্রাকৃতিক বেতের ফ্রুট বাস্কেট',
      rating: 5,
      date: '০১ নভেম্বর ২০২৬',
      comment: 'খুব টেকসই ফিনিশিং। ড্রয়িং রুমে রাখতে পেরে দারুণ লাগছে। পাহাড়ি কারিগরদের ধন্যবাদ।'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in">
      
      {/* 1. Statistics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3.5">
        <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs">
          <div className="text-xs text-stone-500 font-medium">মোট পণ্য</div>
          <div className="text-2xl font-bold text-stone-900 mt-1 tabular-nums">{totalProducts}</div>
          <div className="text-[11px] text-stone-400 mt-1">দোকানের ক্যাটালগ</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs">
          <div className="text-xs text-stone-500 font-medium">সক্রিয় পণ্য</div>
          <div className="text-2xl font-bold text-emerald-800 mt-1 tabular-nums">{activeProducts}</div>
          <div className="text-[11px] text-emerald-800 mt-1">অনলাইনে দৃশ্যমান</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs">
          <div className="text-xs text-stone-500 font-medium">মোট অর্ডার</div>
          <div className="text-2xl font-bold text-stone-900 mt-1 tabular-nums">{totalOrders}</div>
          <div className="text-[11px] text-stone-400 mt-1">খুচরা ও বুটিক বাল্ক</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs">
          <div className="text-xs text-stone-500 font-medium">নতুন অর্ডার</div>
          <div className="text-2xl font-bold text-amber-600 mt-1 tabular-nums">{newOrders}</div>
          <div className="text-[11px] text-amber-700 mt-1">প্যাকিং প্রয়োজন</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs">
          <div className="text-xs text-stone-500 font-medium">সম্পন্ন অর্ডার</div>
          <div className="text-2xl font-bold text-emerald-700 mt-1 tabular-nums">{completedOrders}</div>
          <div className="text-[11px] text-stone-400 mt-1">ডেলিভারড</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs col-span-2 sm:col-span-1">
          <div className="text-xs text-stone-500 font-medium">মোট বিক্রয়</div>
          <div className="text-2xl font-bold text-stone-900 mt-1 tabular-nums">
            ৳{totalSales.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-800 mt-1">আয় সংরক্ষিত</div>
        </div>

        <div className="p-4 rounded-xl bg-emerald-950 text-white border border-emerald-900 shadow-2xs col-span-2 sm:col-span-1">
          <div className="text-xs text-emerald-300 font-medium">দোকানের ভিজিটর</div>
          <div className="text-2xl font-bold text-amber-400 mt-1 tabular-nums">
            {shopVisitors.toLocaleString()}
          </div>
          <div className="text-[11px] text-stone-300 mt-1">গত ৩০ দিনে ট্রাফিক</div>
        </div>
      </div>

      {/* 2. Shop Showcase Card & Preview Action */}
      <div className="rounded-2xl border border-stone-200 bg-white shadow-sm overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-emerald-900 via-emerald-800 to-stone-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white p-1 shadow-md border border-stone-300 shrink-0">
              <div className="w-full h-full rounded-xl bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center text-white font-bold text-2xl font-brand">
                {shopName.slice(0, 2)}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-xl font-bold">{shopName}</h3>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-700/80 text-amber-300 border border-emerald-600">
                  ভেরিফাইড পাহাড়ি ব্র্যান্ড
                </span>
              </div>
              <p className="text-xs text-stone-300 mt-1 max-w-lg">{shopBio}</p>
              <div className="text-[11px] text-emerald-300 font-mono mt-1">
                hillecommerce.gov.bd/shop/marma-crafts
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={() => setIsEditingShop(!isEditingShop)}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold border border-white/20 transition-colors cursor-pointer"
            >
              {isEditingShop ? 'সম্পাদনা বন্ধ' : 'শপ কাস্টমাইজ'}
            </button>

            <button
              onClick={onOpenShopPreview}
              className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-950 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              <span>আমার শপ দেখুন (Preview)</span>
            </button>
          </div>
        </div>

        {/* Shop Editing Form if toggled */}
        {isEditingShop && (
          <form onSubmit={handleSaveShopSettings} className="p-5 border-t border-stone-200 bg-stone-50 space-y-4">
            <div className="text-xs font-bold text-stone-800">শপের তথ্য ও ব্র্যান্ডিং পরিবর্তন</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">দোকানের নাম</label>
                <input
                  type="text"
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-stone-300 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">সংক্ষিপ্ত পরিচিতি ও কারিগর গল্প</label>
                <input
                  type="text"
                  value={shopBio}
                  onChange={(e) => setShopBio(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-stone-300 bg-white"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsEditingShop(false)}
                className="px-3 py-1.5 text-xs text-stone-600 rounded"
              >
                বাতিল
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded"
              >
                সংরক্ষণ করুন
              </button>
            </div>
          </form>
        )}
      </div>

      {/* 3. Products & Reviews Tabs */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-stone-200 pb-2">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 text-xs font-bold rounded-lg cursor-pointer ${
              activeTab === 'products'
                ? 'bg-emerald-900 text-white'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            শপের পণ্য ও স্টক তালিকা
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-4 py-2 text-xs font-bold rounded-lg cursor-pointer ${
              activeTab === 'reviews'
                ? 'bg-emerald-900 text-white'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            ক্রেতার রিভিউ ও রেটিং ({sampleReviews.length})
          </button>
        </div>

        {/* Tab 1: Products */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-stone-200 flex items-center justify-between">
              <span className="text-xs font-bold text-stone-800">পণ্য তালিকা ও একক দর</span>
              <button
                onClick={onOpenAddProduct}
                className="px-3.5 py-1.5 bg-emerald-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>নতুন পণ্য আপলোড</span>
              </button>
            </div>

            <div className="divide-y divide-stone-100 text-xs">
              {products.map((p) => (
                <div key={p.id} className="p-4 flex items-center justify-between gap-4 hover:bg-stone-50">
                  <div className="flex items-center gap-3">
                    <img
                      src={p.image}
                      alt={p.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-lg object-cover border border-stone-200"
                    />
                    <div>
                      <h4 className="font-bold text-stone-900">{p.name}</h4>
                      <span className="text-[11px] text-stone-500">{p.category} · স্টক: {p.availableQuantity} {p.unit}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-bold text-emerald-900 tabular-nums text-sm">৳{p.pricePerUnit}</span>
                    <button
                      onClick={onOpenShopPreview}
                      className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 rounded text-stone-700 font-medium text-[11px]"
                    >
                      শপে দেখুন
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Reviews */}
        {activeTab === 'reviews' && (
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden p-5 space-y-4">
            <h3 className="text-base font-bold text-stone-900">ক্রেতাদের মতামত ও রেটিং</h3>
            <div className="space-y-3">
              {sampleReviews.map((rev) => (
                <div key={rev.id} className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-900 text-xs">{rev.customer}</span>
                    <span className="text-amber-800 font-bold text-xs">★ {rev.rating}.0</span>
                  </div>
                  <div className="text-[11px] text-emerald-800 font-medium">পণ্য: {rev.product}</div>
                  <p className="text-xs text-stone-600">{rev.comment}</p>
                  <div className="text-[10px] text-stone-400">{rev.date}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
