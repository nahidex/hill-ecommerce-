import React, { useState } from 'react';
import { 
  BarChart3, 
  X, 
  Download, 
  Printer, 
  Calendar, 
  Filter, 
  FileSpreadsheet, 
  CheckCircle, 
  TrendingUp, 
  Clock, 
  Truck,
  MapPin,
  AlertTriangle
} from 'lucide-react';
import { DeliveryItem } from '../../types';

interface LogisticsReportsModalProps {
  deliveries: DeliveryItem[];
  isOpen: boolean;
  onClose: () => void;
}

type ReportType = 
  | 'daily'
  | 'monthly'
  | 'cost_analysis'
  | 'on_time'
  | 'route_district'
  | 'delay_damage'
  | 'carrier_perf';

const REPORT_TABS: { key: ReportType; label: string; icon: any }[] = [
  { key: 'daily', label: 'দৈনিক ডেলিভারি রিপোর্ট', icon: Calendar },
  { key: 'monthly', label: 'মাসিক সরবরাহ রিপোর্ট', icon: BarChart3 },
  { key: 'cost_analysis', label: 'পরিবহন খরচ বিশ্লেষণ', icon: TrendingUp },
  { key: 'on_time', label: 'অন-টাইম পারফরম্যান্স', icon: Clock },
  { key: 'route_district', label: 'জেলা ও রুটভিত্তিক রিপোর্ট', icon: MapPin },
  { key: 'delay_damage', label: 'বিলম্ব ও ক্ষতি বিশ্লেষণ', icon: AlertTriangle },
  { key: 'carrier_perf', label: 'ক্যারিয়ার পারফরম্যান্স', icon: Truck }
];

export const LogisticsReportsModal: React.FC<LogisticsReportsModalProps> = ({
  deliveries,
  isOpen,
  onClose
}) => {
  const [activeReport, setActiveReport] = useState<ReportType>('daily');
  const [districtFilter, setDistrictFilter] = useState('all');
  const [carrierFilter, setCarrierFilter] = useState('all');

  if (!isOpen) return null;

  // Filtered deliveries based on user filter
  const filteredDeliveries = deliveries.filter(d => {
    if (districtFilter !== 'all' && !d.pickupAddress.includes(districtFilter) && !d.deliveryAddress.includes(districtFilter)) {
      return false;
    }
    if (carrierFilter !== 'all' && d.transport.providerName !== carrierFilter) {
      return false;
    }
    return true;
  });

  // Calculate high-level metrics
  const totalDeliveries = filteredDeliveries.length;
  const onTimeCount = filteredDeliveries.filter(d => !d.isDelayed).length;
  const onTimePercentage = totalDeliveries > 0 ? ((onTimeCount / totalDeliveries) * 100).toFixed(1) : '100';
  const totalTransportCost = filteredDeliveries.reduce((acc, curr) => acc + curr.costs.totalDeliveryCost, 0);
  const totalVolumeKg = filteredDeliveries.reduce((acc, curr) => acc + (curr.unit === 'কেজি' ? curr.quantity : curr.quantity * 2), 0);

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    const headers = 'চালান_নম্বর,অর্ডার_নম্বর,পণ্য,পরিমাণ,প্রেরক,প্রাপক,পরিবহন,খরচ,স্ট্যাটাস\n';
    const rows = filteredDeliveries.map(d => 
      `"${d.challanNumber}","${d.orderNumber}","${d.productName}","${d.quantity} ${d.unit}","${d.sellerName}","${d.buyerName}","${d.transport.providerName}","${d.costs.totalDeliveryCost}","${d.stage}"`
    ).join('\n');
    
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Hill_eCommerce_Logistics_Report_${activeReport}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-stone-200">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-stone-100 border-b border-stone-200 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-900 text-amber-400 flex items-center justify-center">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-base">লজিস্টিকস ও সরবরাহ রিপোর্ট ও অ্যানালিটিক্স</h3>
              <p className="text-xs text-stone-500">পার্বত্য চট্টগ্রাম বিষয়ক মন্ত্রণালয় · কেন্দ্রীয় তথ্য ভাণ্ডার</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="px-3 py-1.5 rounded-lg bg-white border border-stone-300 hover:bg-stone-50 text-stone-800 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-800" />
              <span>CSV এক্সপোর্ট</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Printer className="w-4 h-4" />
              <span>রিপোর্ট প্রিন্ট</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Toolbar (Print hidden) */}
        <div className="p-3 bg-stone-50 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs print:hidden">
          {/* Report Selector Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 max-w-full">
            {REPORT_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeReport === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveReport(tab.key)}
                  className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 shrink-0 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-emerald-900 text-white shadow-2xs'
                      : 'text-stone-600 hover:bg-stone-200 hover:text-stone-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* District & Carrier Dropdowns */}
          <div className="flex items-center gap-2">
            <select
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
              className="bg-white border border-stone-300 rounded-lg px-2.5 py-1 text-xs font-medium focus:ring-1 focus:ring-emerald-700"
            >
              <option value="all">সমগ্র বাংলাদেশ (সব জেলা)</option>
              <option value="রাঙামাটি">রাঙামাটি</option>
              <option value="খাগড়াছড়ি">খাগড়াছড়ি</option>
              <option value="বান্দরবান">বান্দরবান</option>
              <option value="চট্টগ্রাম">চট্টগ্রাম</option>
              <option value="ঢাকা">ঢাকা</option>
            </select>

            <select
              value={carrierFilter}
              onChange={(e) => setCarrierFilter(e.target.value)}
              className="bg-white border border-stone-300 rounded-lg px-2.5 py-1 text-xs font-medium focus:ring-1 focus:ring-emerald-700"
            >
              <option value="all">সব ক্যারিয়ার</option>
              <option value="পাহাড়িকা এক্সপ্রেস লজিস্টিকস">পাহাড়িকা এক্সপ্রেস</option>
              <option value="চিম্বুক কার্গো সার্ভিস">চিম্বুক কার্গো</option>
              <option value="কাপ্তাই হিলফ্লিট ট্রান্সপোর্ট">কাপ্তাই হিলফ্লিট</option>
              <option value="সুন্দরবন কুরিয়ার এগ্রো এক্সপ্রেস">সুন্দরবন কুরিয়ার</option>
            </select>
          </div>
        </div>

        {/* Printable Report Content */}
        <div className="p-6 overflow-y-auto space-y-6 font-bengali text-xs">
          
          {/* Report Top Overview Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl border border-stone-200 bg-stone-50">
              <span className="text-stone-500 block text-[10px]">মোট রেকর্ডকৃত চালান:</span>
              <span className="font-bold text-stone-900 text-lg">{totalDeliveries} টি</span>
            </div>
            <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50">
              <span className="text-emerald-800 block text-[10px]">অন-টাইম ডেলিভারি হার:</span>
              <span className="font-bold text-emerald-950 text-lg">{onTimePercentage}%</span>
            </div>
            <div className="p-3.5 rounded-xl border border-stone-200 bg-stone-50">
              <span className="text-stone-500 block text-[10px]">মোট পরিবহন ও লজিস্টিকস ব্যয়:</span>
              <span className="font-bold text-stone-900 text-lg">৳{totalTransportCost.toLocaleString('bn-BD')}</span>
            </div>
            <div className="p-3.5 rounded-xl border border-stone-200 bg-stone-50">
              <span className="text-stone-500 block text-[10px]">মোট সরবরাহকৃত পণ্য ওজন:</span>
              <span className="font-bold text-stone-900 text-lg">{totalVolumeKg.toLocaleString('bn-BD')} কেজি</span>
            </div>
          </div>

          {/* Tab Specific Content Table */}
          <div className="border border-stone-200 rounded-xl overflow-hidden bg-white">
            <div className="p-3 bg-stone-100 border-b border-stone-200 flex items-center justify-between font-bold text-stone-900">
              <span>
                {REPORT_TABS.find(t => t.key === activeReport)?.label} – বিস্তারিত বিবরণী
              </span>
              <span className="text-[11px] text-stone-500 font-normal">
                {filteredDeliveries.length} টি এন্ট্রি পাওয়া গেছে
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 text-[11px]">
                  <tr>
                    <th className="p-3">চালান ও তারিখ</th>
                    <th className="p-3">অর্ডার ও পণ্য</th>
                    <th className="p-3">উৎপাদক ও গন্তব্য</th>
                    <th className="p-3">পরিবহন ক্যারিয়ার</th>
                    <th className="p-3 text-right">খরচ (৳)</th>
                    <th className="p-3 text-center">স্ট্যাটাস</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {filteredDeliveries.map((del) => (
                    <tr key={del.id} className="hover:bg-stone-50/50">
                      <td className="p-3">
                        <div className="font-bold text-stone-900 font-mono">{del.challanNumber}</div>
                        <div className="text-[10px] text-stone-500">{del.challanDate}</div>
                      </td>
                      <td className="p-3">
                        <div className="font-bold text-stone-900">{del.productName}</div>
                        <div className="text-[11px] text-emerald-800 font-medium">
                          {del.quantity} {del.unit} ({del.packaging.packagingType})
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="font-semibold text-stone-800">{del.sellerName}</div>
                        <div className="text-[10px] text-stone-500">গন্তব্য: {del.deliveryAddress}</div>
                      </td>
                      <td className="p-3">
                        <div className="font-semibold text-stone-800">{del.transport.providerName}</div>
                        <div className="text-[10px] text-stone-500">{del.transport.vehicleType} ({del.transport.vehicleNumber})</div>
                      </td>
                      <td className="p-3 text-right font-bold text-stone-900">
                        ৳{del.costs.totalDeliveryCost.toLocaleString('bn-BD')}
                      </td>
                      <td className="p-3 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          del.stage === 'delivered' 
                            ? 'bg-emerald-100 text-emerald-800'
                            : del.isDelayed
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-amber-100 text-amber-800'
                        }`}>
                          {del.stage === 'delivered' ? 'সম্পন্ন' : del.isDelayed ? 'বিলম্বিত' : 'ট্রানজিটে'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Ministry Regulatory Statement in Report */}
          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 text-[11px] text-stone-600 flex items-center justify-between">
            <div>
              <strong>রিপোর্ট সত্যতা ও নিরাপত্তা:</strong> এই প্রতিবেদনটি পার্বত্য চট্টগ্রাম বিষয়ক মন্ত্রণালয়ের Hill eCommerce কেন্দ্রীয় ক্লাউড রেজিস্ট্রি থেকে সংকলিত।
            </div>
            <div className="font-mono text-stone-400">
              তারিখ: {new Date().toLocaleDateString('bn-BD')}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
