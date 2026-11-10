import React, { useState } from 'react';
import { 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  ArrowUpRight, 
  Calendar, 
  Download, 
  Layers,
  CheckCircle2
} from 'lucide-react';
import { UserSession } from '../../types';

interface ReportsModuleProps {
  user: UserSession;
}

export const ReportsModule: React.FC<ReportsModuleProps> = ({ user }) => {
  const [selectedRange, setSelectedRange] = useState('6m');

  const monthlyData = [
    { month: 'মে', sales: 42000, purchases: 31000, orders: 8 },
    { month: 'জুন', sales: 58000, purchases: 45000, orders: 12 },
    { month: 'জুলাই', sales: 74000, purchases: 52000, orders: 16 },
    { month: 'আগস্ট', sales: 69000, purchases: 61000, orders: 14 },
    { month: 'সেপ্টেম্বর', sales: 92000, purchases: 78000, orders: 21 },
    { month: 'অক্টোবর', sales: 115000, purchases: 94000, orders: 26 },
    { month: 'নভেম্বর', sales: 148000, purchases: 120000, orders: 32 }
  ];

  const maxSales = Math.max(...monthlyData.map(d => d.sales));

  const categoryShare = [
    { name: 'ফলমূল (আনারস, কলা)', percent: 45, color: 'bg-emerald-600' },
    { name: 'মসলা ও খাদ্যপণ্য (হলুদ, আদা)', percent: 30, color: 'bg-amber-500' },
    { name: 'হস্তশিল্প ও বস্ত্র (পিনন-হাদি)', percent: 15, color: 'bg-emerald-900' },
    { name: 'অন্যান্য (বাঁশ, মধু, কফি)', percent: 10, color: 'bg-stone-500' }
  ];

  const orderStatusBreakdown = [
    { label: 'সম্পন্ন ও অর্থ ছাড়', count: 48, percent: '৬৮%', color: 'text-emerald-700' },
    { label: 'ট্রানজিটে চলমান', count: 14, percent: '২০%', color: 'text-amber-700' },
    { label: 'অপেক্ষমাণ / প্রস্তুত হচ্ছে', count: 8, percent: '১২%', color: 'text-stone-600' }
  ];

  return (
    <div className="space-y-6 animate-in fade-in">
      
      {/* Header with date filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-stone-200">
        <div>
          <h3 className="text-lg font-bold text-stone-900">ব্যবসায়িক অ্যানালিটিক্স ও রিপোর্ট</h3>
          <p className="text-xs text-stone-500 mt-0.5">
            মাসভিত্তিক বিক্রয়, সরবরাহ ভলিউম ও ক্যাটাগরি শেয়ারের গ্রাফিকাল বিশ্লেষণ
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center p-1 bg-stone-100 rounded-lg text-xs">
            <button
              onClick={() => setSelectedRange('3m')}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                selectedRange === '3m' ? 'bg-white text-stone-900 shadow-2xs font-bold' : 'text-stone-600'
              }`}
            >
              ৩ মাস
            </button>
            <button
              onClick={() => setSelectedRange('6m')}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                selectedRange === '6m' ? 'bg-white text-stone-900 shadow-2xs font-bold' : 'text-stone-600'
              }`}
            >
              ৬ মাস
            </button>
            <button
              onClick={() => setSelectedRange('1y')}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                selectedRange === '1y' ? 'bg-white text-stone-900 shadow-2xs font-bold' : 'text-stone-600'
              }`}
            >
              ১ বছর
            </button>
          </div>

          <button className="px-3.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer">
            <Download className="w-3.5 h-3.5" />
            <span>রিপোর্ট এক্সপোর্ট</span>
          </button>
        </div>
      </div>

      {/* Main Bar Chart: Monthly Volume */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-stone-900">
              মাসভিত্তিক বাণিজ্যিক লেনদেন ও বিক্রয় প্রবণতা (২০২৬)
            </h4>
            <div className="text-xs text-stone-500 mt-0.5 flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-800"></span>
                <span>বিক্রয় আয় (টাকা)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-amber-500"></span>
                <span>ক্রয় ও সংগ্রহ (টাকা)</span>
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs text-stone-400 block">গড় প্রবৃদ্ধি</span>
            <span className="text-sm font-bold text-emerald-800 flex items-center gap-0.5">
              <TrendingUp className="w-4 h-4" />
              +৩২.৪%
            </span>
          </div>
        </div>

        {/* Visual Bar Chart */}
        <div className="pt-6">
          <div className="grid grid-cols-7 gap-2 sm:gap-6 items-end h-56 border-b border-stone-200 pb-3">
            {monthlyData.map((d, i) => {
              const salesHeightPercent = (d.sales / maxSales) * 100;
              const purchaseHeightPercent = (d.purchases / maxSales) * 100;

              return (
                <div key={i} className="flex flex-col items-center h-full justify-end group">
                  <div className="w-full flex items-end justify-center gap-1 sm:gap-2 h-full">
                    {/* Sales Bar */}
                    <div
                      style={{ height: `${salesHeightPercent}%` }}
                      className="w-1/2 max-w-[28px] bg-emerald-800 rounded-t group-hover:bg-emerald-700 transition-all relative flex justify-center"
                    >
                      <span className="hidden group-hover:block absolute -top-7 text-[10px] bg-stone-900 text-white px-1.5 py-0.5 rounded shadow z-10 whitespace-nowrap tabular-nums">
                        ৳{d.sales.toLocaleString()}
                      </span>
                    </div>

                    {/* Purchases Bar */}
                    <div
                      style={{ height: `${purchaseHeightPercent}%` }}
                      className="w-1/2 max-w-[28px] bg-amber-400 rounded-t group-hover:bg-amber-300 transition-all relative flex justify-center"
                    >
                      <span className="hidden group-hover:block absolute -top-7 text-[10px] bg-stone-900 text-white px-1.5 py-0.5 rounded shadow z-10 whitespace-nowrap tabular-nums">
                        ৳{d.purchases.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-semibold text-stone-600 mt-2">
                    {d.month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Two columns: Category Share & Order Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Category Share */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 space-y-4">
          <h4 className="text-sm font-bold text-stone-900">পণ্য ক্যাটাগরি অনুযায়ী আয়ের বণ্টন</h4>
          
          {/* Progress Stack */}
          <div className="h-3 w-full rounded-full bg-stone-100 flex overflow-hidden">
            {categoryShare.map((cat, i) => (
              <div
                key={i}
                style={{ width: `${cat.percent}%` }}
                className={`${cat.color}`}
                title={`${cat.name}: ${cat.percent}%`}
              />
            ))}
          </div>

          <div className="space-y-2.5 pt-2">
            {categoryShare.map((cat, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${cat.color}`}></span>
                  <span className="text-stone-700 font-medium">{cat.name}</span>
                </div>
                <span className="font-bold text-stone-900 tabular-nums">{cat.percent}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Order Status Breakdown */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 space-y-4">
          <h4 className="text-sm font-bold text-stone-900">অর্ডার ও ডেলিভারি সক্ষমতা</h4>
          <p className="text-xs text-stone-500">
            নির্ধারিত সময়ে পণ্য হস্তান্তর ও সফল এসক্রো নিষ্পত্তির হার
          </p>

          <div className="space-y-3 pt-1">
            {orderStatusBreakdown.map((item, i) => (
              <div key={i} className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-stone-900">{item.label}</div>
                  <div className="text-[11px] text-stone-500">{item.count}টি চালান</div>
                </div>
                <div className={`text-base font-bold tabular-nums ${item.color}`}>
                  {item.percent}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
