import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Truck, 
  FileText, 
  Download, 
  ShieldCheck, 
  Clock, 
  Layers,
  Search,
  Filter,
  Eye,
  RefreshCw
} from 'lucide-react';
import { DeliveryItem } from '../../types';
import { MINISTRY_DISTRICT_STATS } from '../../data/logisticsMock';

interface MinistryMonitoringViewProps {
  deliveries: DeliveryItem[];
  onViewDelivery: (delivery: DeliveryItem) => void;
  onOpenReports: () => void;
}

export const MinistryMonitoringView: React.FC<MinistryMonitoringViewProps> = ({
  deliveries,
  onViewDelivery,
  onOpenReports
}) => {
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Stats calculation
  const totalDeliveries = deliveries.length;
  const delayedDeliveries = deliveries.filter(d => d.isDelayed).length;
  const deliveredCount = deliveries.filter(d => d.stage === 'delivered').length;
  const inTransitCount = deliveries.filter(d => ['picked_up', 'in_transit', 'arrived_hub', 'out_for_delivery'].includes(d.stage)).length;
  const issuesCount = deliveries.filter(d => d.issue).length;

  const onTimePercentage = totalDeliveries > 0 
    ? (((totalDeliveries - delayedDeliveries) / totalDeliveries) * 100).toFixed(1)
    : '95.4';

  const filteredDeliveries = deliveries.filter(d => {
    if (selectedDistrict !== 'all' && !d.pickupAddress.includes(selectedDistrict) && !d.deliveryAddress.includes(selectedDistrict)) {
      return false;
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        d.challanNumber.toLowerCase().includes(q) ||
        d.orderNumber.toLowerCase().includes(q) ||
        d.productName.toLowerCase().includes(q) ||
        d.sellerName.toLowerCase().includes(q) ||
        d.buyerName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 font-bengali">
      
      {/* Top Banner with Ministry Crest */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950 via-emerald-900 to-stone-900 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 opacity-10 flex items-center pr-10 pointer-events-none">
          <Building2 className="w-64 h-64 text-white" />
        </div>

        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-stone-950 uppercase tracking-wider">
              মন্ত্রণালয় সেন্ট্রাল ওভারভিউ
            </span>
            <span className="text-emerald-300 text-xs">পার্বত্য চট্টগ্রাম বিষয়ক মন্ত্রণালয়</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            পার্বত্য জেলাভিত্তিক সরবরাহ ও লজিস্টিকস সেন্ট্রাল মনিটরিং
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 max-w-2xl">
            রাঙামাটি, খাগড়াছড়ি ও বান্দরবান থেকে সারা দেশে পাইকারি কৃষিপণ্য, ফলমূল ও তাঁতপণ্য সরবরাহ চেইনের অন-টাইম ট্র্যাকিং, নিরাপত্তা এবং বিরোধ নিষ্পত্তি প্ল্যাটফর্ম।
          </p>

          <div className="pt-3 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenReports}
              className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-stone-950 text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>পূর্ণাঙ্গ মন্ত্রণালয়ের অডিট রিপোর্ট দেখুন</span>
            </button>
            <div className="text-[11px] text-stone-300 flex items-center gap-1.5 bg-white/10 px-3 py-2 rounded-xl">
              <Clock className="w-3.5 h-3.5 text-amber-300" />
              <span>সর্বশেষ কেন্দ্রীয় সিঙ্ক: আজ সকাল ১০:০০ টা</span>
            </div>
          </div>
        </div>
      </div>

      {/* Regional Weather & Mountain Highway Alert Notice */}
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 text-xs flex items-start gap-3 shadow-2xs">
        <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-bold flex items-center gap-2">
            <span>পাহাড়ি মহাসড়ক ও আবহাওয়া সতর্কতা (ট্রান্সপোর্ট গাইডলাইন):</span>
            <span className="text-[10px] bg-amber-200 text-amber-900 px-1.5 py-0.2 rounded font-semibold">লাইভ নোটিশ</span>
          </div>
          <p className="text-stone-700 text-[11px] leading-relaxed">
            খাগড়াছড়ি-চট্টগ্রাম ও বান্দরবান-কেরানীহাট মহাসড়কে বৃষ্টিপাতের কারণে চালকদের গতি নিয়ন্ত্রণে রেখে পণ্য পরিবহনের নির্দেশ দেওয়া হয়েছে। পচনশীল ফলবাহী পিকআপ ও ট্রাক অগ্রাধিকার ভিত্তিতে পারাপার নিশ্চিত করা হচ্ছে।
          </p>
        </div>
      </div>

      {/* Top Aggregate Key Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs space-y-1">
          <span className="text-stone-500 block text-[11px]">মোট চালিত চালান:</span>
          <span className="font-bold text-stone-900 text-xl">{totalDeliveries} টি</span>
          <span className="text-[10px] text-stone-400 block">চলতি মৌসুমে</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs space-y-1">
          <span className="text-stone-500 block text-[11px]">ট্রানজিটে চলমান:</span>
          <span className="font-bold text-blue-700 text-xl">{inTransitCount} টি</span>
          <span className="text-[10px] text-blue-600 block">পাহাড়ি ও জাতীয় মহাসড়কে</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs space-y-1">
          <span className="text-stone-500 block text-[11px]">ডেলিভারি সম্পন্ন:</span>
          <span className="font-bold text-emerald-800 text-xl">{deliveredCount} টি</span>
          <span className="text-[10px] text-emerald-600 block">GRN ছাড়পত্র প্রাপ্ত</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs space-y-1">
          <span className="text-stone-500 block text-[11px]">অন-টাইম ডেলিভারি হার:</span>
          <span className="font-bold text-emerald-700 text-xl">{onTimePercentage}%</span>
          <span className="text-[10px] text-emerald-600 block">জাতীয় মানের শীর্ষে</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-2xs space-y-1">
          <span className="text-stone-500 block text-[11px]">বিলম্ব / সক্রিয় বিরোধ:</span>
          <span className="font-bold text-rose-700 text-xl">{delayedDeliveries + issuesCount} টি</span>
          <span className="text-[10px] text-rose-600 block">সালিশ সেলে পর্যালোচিত</span>
        </div>
      </div>

      {/* District-wise Supply Overview Cards (3 Hill Districts) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-800" />
            <span>পার্বত্য তিন জেলার লজিস্টিকস পারফরম্যান্স চিত্র</span>
          </h3>
          <span className="text-xs text-stone-500">মৌসুমী কৃষিপণ্য প্রবাহ</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {MINISTRY_DISTRICT_STATS.map((d) => (
            <div 
              key={d.district}
              onClick={() => setSelectedDistrict(selectedDistrict === d.district ? 'all' : d.district)}
              className={`p-4 rounded-xl border transition-all cursor-pointer shadow-2xs ${
                selectedDistrict === d.district
                  ? 'bg-emerald-50 border-emerald-800 ring-2 ring-emerald-800/20'
                  : 'bg-white border-stone-200 hover:border-emerald-700'
              }`}
            >
              <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                <span className="font-bold text-stone-900 text-base">{d.district} জেলা</span>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                  {d.onTimeRate}% অন-টাইম
                </span>
              </div>

              <div className="py-2.5 space-y-1.5 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>মোট পরিবহন চালান:</span>
                  <span className="font-bold text-stone-900">{d.totalDeliveries} টি</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>বিলম্ব ও আটকে থাকা:</span>
                  <span className="font-bold text-rose-700">{d.delayedCount} টি</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>নিবন্ধিত সক্রিয় ক্যারিয়ার:</span>
                  <span className="font-bold text-stone-800">{d.activeCarriers} টি পরিবহন সংস্থা</span>
                </div>
                <div className="pt-2 border-t border-stone-100">
                  <span className="text-stone-400 block text-[10px]">প্রধান উৎপাদিত পণ্য:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {d.topProducts.map((p, i) => (
                      <span key={i} className="text-[10px] bg-stone-100 text-stone-700 px-1.5 py-0.5 rounded">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-2 text-right">
                <span className="text-[11px] text-emerald-800 font-bold hover:underline">
                  {selectedDistrict === d.district ? 'ফিল্টার বাতিল' : 'এই জেলার চালান দেখুন →'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shipments Central Audit Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden">
        <div className="p-4 bg-stone-50 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-emerald-800" />
            <h4 className="font-bold text-stone-900 text-sm">
              কেন্দ্রীয় চালান ট্র্যাকিং রেজিস্ট্রি ({filteredDeliveries.length})
            </h4>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="চালান, অর্ডার বা নাম লিখুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg w-48 sm:w-64 focus:ring-1 focus:ring-emerald-700"
              />
            </div>

            {selectedDistrict !== 'all' && (
              <button
                onClick={() => setSelectedDistrict('all')}
                className="px-2.5 py-1 text-xs bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-lg font-semibold"
              >
                ফিল্টার মুছুন
              </button>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 text-[11px]">
              <tr>
                <th className="p-3">চালান ও তারিখ</th>
                <th className="p-3">পণ্য ও পরিমাণ</th>
                <th className="p-3">উৎস (উৎপাদক)</th>
                <th className="p-3">গন্তব্য (ক্রেতা)</th>
                <th className="p-3">বর্তমান অবস্থান ও ক্যারিয়ার</th>
                <th className="p-3 text-center">স্ট্যাটাস</th>
                <th className="p-3 text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {filteredDeliveries.map((del) => (
                <tr key={del.id} className="hover:bg-stone-50/50">
                  <td className="p-3">
                    <div className="font-bold text-stone-900 font-mono">{del.challanNumber}</div>
                    <div className="text-[10px] text-stone-500 font-mono">{del.orderNumber}</div>
                    <div className="text-[10px] text-stone-400">{del.challanDate}</div>
                  </td>
                  <td className="p-3">
                    <div className="font-bold text-stone-900">{del.productName}</div>
                    <div className="text-[11px] text-emerald-800 font-bold">
                      {del.quantity} {del.unit}
                    </div>
                    <div className="text-[10px] text-stone-500">
                      {del.packaging.packageCount} টি {del.packaging.packagingType}
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="font-semibold text-stone-800">{del.sellerName}</div>
                    <div className="text-[10px] text-stone-500">{del.pickupAddress}</div>
                  </td>
                  <td className="p-3">
                    <div className="font-semibold text-stone-800">{del.buyerName}</div>
                    <div className="text-[10px] text-stone-500">{del.deliveryAddress}</div>
                  </td>
                  <td className="p-3">
                    <div className="font-semibold text-stone-900 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-emerald-700" />
                      <span>{del.currentLocation}</span>
                    </div>
                    <div className="text-[10px] text-stone-500">
                      {del.transport.providerName} · {del.transport.vehicleNumber}
                    </div>
                  </td>
                  <td className="p-3 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      del.stage === 'delivered'
                        ? 'bg-emerald-100 text-emerald-800'
                        : del.isDelayed
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                    }`}>
                      {del.stage === 'delivered' ? 'ডেলিভারি সম্পন্ন' : del.isDelayed ? 'বিলম্বিত' : 'ট্রানজিটে'}
                    </span>
                    {del.issue && (
                      <span className="block text-[9px] text-rose-700 font-bold mt-0.5">
                        সক্রিয় অভিযোগ
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => onViewDelivery(del)}
                      className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold text-xs flex items-center gap-1 ml-auto cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>তদন্ত</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
