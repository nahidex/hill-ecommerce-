import React, { useState, useMemo } from 'react';
import { 
  Package, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  RotateCcw, 
  AlertTriangle, 
  Eye, 
  MapPin, 
  Layers, 
  DollarSign, 
  RefreshCw,
  Building2,
  Tag
} from 'lucide-react';
import { ProductItem, ProductApprovalStatus } from '../../types';
import { ProductApprovalModal } from './ProductApprovalModal';

interface ProductApprovalModuleProps {
  products: ProductItem[];
  onUpdateProductApproval: (
    productId: string,
    action: 'approved' | 'needs_correction' | 'rejected' | 'suspended',
    reason: string,
    notes?: string
  ) => void;
}

export const ProductApprovalModule: React.FC<ProductApprovalModuleProps> = ({
  products,
  onUpdateProductApproval
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [activeProductForModal, setActiveProductForModal] = useState<ProductItem | null>(null);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchId = p.id.toLowerCase().includes(q);
        const matchProducer = p.producerName.toLowerCase().includes(q);
        const matchOrigin = p.origin.toLowerCase().includes(q);
        if (!matchName && !matchId && !matchProducer && !matchOrigin) return false;
      }

      // District
      if (selectedDistrict !== 'all' && p.district !== selectedDistrict) return false;

      // Category
      if (selectedCategory !== 'all' && p.categorySlug !== selectedCategory && p.category !== selectedCategory) return false;

      // Status
      const status = p.approvalStatus || (p.status === 'pending_approval' ? 'pending_approval' : 'approved');
      if (selectedStatus !== 'all' && status !== selectedStatus) return false;

      return true;
    });
  }, [products, searchQuery, selectedDistrict, selectedCategory, selectedStatus]);

  const countAll = products.length;
  const countPending = products.filter(p => (p.approvalStatus === 'pending_approval' || p.status === 'pending_approval')).length;
  const countApproved = products.filter(p => (!p.approvalStatus || p.approvalStatus === 'approved') && p.status !== 'pending_approval').length;
  const countNeedsCorrection = products.filter(p => p.approvalStatus === 'needs_correction').length;
  const countSuspended = products.filter(p => p.approvalStatus === 'suspended' || p.approvalStatus === 'rejected').length;

  const getStatusBadge = (status: ProductApprovalStatus) => {
    switch (status) {
      case 'approved':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300 inline-flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-700" /> অনুমোদিত</span>;
      case 'pending_approval':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-950 border border-amber-300 inline-flex items-center gap-1"><Clock className="w-3 h-3 text-amber-700" /> অনুমোদনের অপেক্ষায়</span>;
      case 'needs_correction':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-orange-100 text-orange-900 border border-orange-300 inline-flex items-center gap-1"><RotateCcw className="w-3 h-3 text-orange-700" /> সংশোধন তলব</span>;
      case 'rejected':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-100 text-rose-900 border border-rose-300 inline-flex items-center gap-1"><XCircle className="w-3 h-3 text-rose-700" /> প্রত্যাখ্যাত</span>;
      case 'suspended':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-stone-200 text-stone-800 border border-stone-400 inline-flex items-center gap-1"><AlertTriangle className="w-3 h-3 text-stone-700" /> স্থগিত</span>;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      
      {/* 1. Header & Filters */}
      <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-emerald-800" />
              <h3 className="text-base font-bold text-stone-900">
                পণ্য অনুমোদন ও মান পর্যবেক্ষণ সেল (Product Approval & Monitoring)
              </h3>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              কৃষিজ পণ্য, ফলমূল, মসলা ও হস্তশিল্প পণ্যের গ্রেডিং, অর্গানিক সনদ ও বাজার অনুমোদন
            </p>
          </div>
        </div>

        {/* Status Quick Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold scrollbar-none">
          <button
            onClick={() => setSelectedStatus('all')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              selectedStatus === 'all'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            সকল পণ্য ({countAll})
          </button>
          <button
            onClick={() => setSelectedStatus('pending_approval')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              selectedStatus === 'pending_approval'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200'
            }`}
          >
            <Clock className="w-3 h-3" />
            <span>অনুমোদনের অপেক্ষায় ({countPending})</span>
          </button>
          <button
            onClick={() => setSelectedStatus('approved')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              selectedStatus === 'approved'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100 border border-emerald-200'
            }`}
          >
            <CheckCircle2 className="w-3 h-3" />
            <span>লাইভ অনুমোদিত ({countApproved})</span>
          </button>
          <button
            onClick={() => setSelectedStatus('needs_correction')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              selectedStatus === 'needs_correction'
                ? 'bg-orange-700 text-white shadow-xs'
                : 'bg-orange-50 text-orange-950 hover:bg-orange-100 border border-orange-200'
            }`}
          >
            <RotateCcw className="w-3 h-3" />
            <span>সংশোধন তলব ({countNeedsCorrection})</span>
          </button>
          <button
            onClick={() => setSelectedStatus('suspended')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              selectedStatus === 'suspended'
                ? 'bg-rose-800 text-white shadow-xs'
                : 'bg-rose-50 text-rose-900 hover:bg-rose-100 border border-rose-200'
            }`}
          >
            <AlertTriangle className="w-3 h-3" />
            <span>স্থগিত / বাতিল ({countSuspended})</span>
          </button>
        </div>

        {/* Filter Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-stone-100 text-xs">
          
          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="পণ্য, উৎপাদক, লট নম্বর..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-stone-50"
            />
          </div>

          {/* District Filter (§4) */}
          <div className="flex items-center gap-2">
            <span className="text-stone-500 whitespace-nowrap">জেলা:</span>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full p-1.5 rounded-xl border border-stone-300 bg-white font-medium focus:outline-none focus:ring-1 focus:ring-emerald-700"
            >
              <option value="all">সকল জেলা</option>
              <option value="খাগড়াছড়ি">খাগড়াছড়ি</option>
              <option value="বান্দরবান">বান্দরবান</option>
              <option value="রাঙামাটি">রাঙামাটি</option>
            </select>
          </div>

          {/* Category Filter (§4) */}
          <div className="flex items-center gap-2">
            <span className="text-stone-500 whitespace-nowrap">ক্যাটাগরি:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-1.5 rounded-xl border border-stone-300 bg-white font-medium focus:outline-none focus:ring-1 focus:ring-emerald-700"
            >
              <option value="all">সকল ক্যাটাগরি</option>
              <option value="fruits">ফলমূল</option>
              <option value="spices">মসলা ও অর্থকরী</option>
              <option value="agriculture">কৃষি ফসল</option>
              <option value="apparel">ঐতিহ্যবাহী পোশাক ও থামি</option>
              <option value="handicraft">হস্তশিল্প ও কারুপণ্য</option>
              <option value="bamboo">বাঁশ ও বেত সামগ্রী</option>
            </select>
          </div>

          {/* Reset Filters */}
          <div className="flex items-center justify-end">
            {(searchQuery || selectedDistrict !== 'all' || selectedCategory !== 'all' || selectedStatus !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedDistrict('all');
                  setSelectedCategory('all');
                  setSelectedStatus('all');
                }}
                className="text-stone-500 hover:text-stone-800 text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>ফিল্টার মুছুন</span>
              </button>
            )}
          </div>

        </div>

      </div>

      {/* 2. Product Approval Table (§4) */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center text-stone-400 text-xs space-y-2">
            <Package className="w-8 h-8 mx-auto opacity-30 text-stone-500" />
            <p>আপনার ফিল্টারে কোনো পণ্য খুঁজে পাওয়া যায়নি।</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-stone-50/80 border-b border-stone-200 text-stone-600 font-bold">
                  <th className="py-3 px-4">পণ্য ও আইডি</th>
                  <th className="py-3 px-3">ক্যাটাগরি</th>
                  <th className="py-3 px-3">উৎপাদক ও বিক্রেতা</th>
                  <th className="py-3 px-3">উৎস (জেলা/উপজেলা)</th>
                  <th className="py-3 px-3">উপলব্ধ পরিমাণ</th>
                  <th className="py-3 px-3">প্রস্তাবিত পাইকারি দর</th>
                  <th className="py-3 px-3 text-center">অনুমোদনের অবস্থা</th>
                  <th className="py-3 px-4 text-right">কার্যক্রম</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredProducts.map((p) => {
                  const status = p.approvalStatus || (p.status === 'pending_approval' ? 'pending_approval' : 'approved');
                  const isActionable = status === 'pending_approval' || status === 'needs_correction';

                  return (
                    <tr key={p.id} className="hover:bg-stone-50/60 transition-colors">
                      
                      {/* Product & ID */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={p.image} 
                            alt={p.name} 
                            className="w-10 h-10 rounded-xl object-cover border border-stone-200 shrink-0" 
                          />
                          <div>
                            <div className="font-bold text-stone-900 text-xs line-clamp-1">{p.name}</div>
                            <span className="font-mono text-[10px] text-emerald-900 font-semibold bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                              {p.id}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-3">
                        <span className="font-semibold text-stone-800">{p.category}</span>
                        {p.specifications.organic && (
                          <div className="text-[10px] text-emerald-700 font-medium">অর্গানিক জুম</div>
                        )}
                      </td>

                      {/* Producer / Seller */}
                      <td className="py-3.5 px-3">
                        <div className="font-bold text-stone-800">{p.producerName}</div>
                        <span className="text-[10px] text-stone-500">{p.producerType}</span>
                      </td>

                      {/* Origin District */}
                      <td className="py-3.5 px-3">
                        <span className="font-bold text-stone-800">{p.district}</span>
                        <div className="text-[10px] text-stone-500">{p.upazila}</div>
                      </td>

                      {/* Quantity */}
                      <td className="py-3.5 px-3 font-medium text-stone-800">
                        {p.availableQuantity.toLocaleString()} {p.unit}
                      </td>

                      {/* Unit Price */}
                      <td className="py-3.5 px-3">
                        <span className="font-bold text-emerald-950 tabular-nums">৳{p.pricePerUnit}</span>
                        <span className="text-[10px] text-stone-400 block">প্রতি {p.unit}</span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-3 text-center">
                        {getStatusBadge(status)}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => setActiveProductForModal(p)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ml-auto ${
                            isActionable
                              ? 'bg-emerald-800 hover:bg-emerald-900 text-white shadow-xs'
                              : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                          }`}
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>{isActionable ? 'অনুমোদন ও সিদ্ধান্ত' : 'পর্যবেক্ষণ'}</span>
                        </button>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 3. Integrated Product Approval Modal */}
      <ProductApprovalModal
        product={activeProductForModal}
        isOpen={!!activeProductForModal}
        onClose={() => setActiveProductForModal(null)}
        onExecuteProductAction={(productId, action, reason, notes) => {
          onUpdateProductApproval(productId, action, reason, notes);
          setActiveProductForModal(null);
        }}
      />

    </div>
  );
};
