import React from 'react';
import { 
  FileText, 
  MessageSquare, 
  CheckCircle, 
  Package, 
  Boxes, 
  Truck, 
  PackageCheck, 
  CheckCheck, 
  XCircle,
  Clock,
  ChevronRight
} from 'lucide-react';
import { OrderStageKey, OrderActivityLog } from '../../types';

interface OrderProgressTrackerProps {
  currentStage: OrderStageKey;
  stageNumber?: number;
  activityHistory?: OrderActivityLog[];
  showHistoryDrawer?: boolean;
}

export const STAGES_LIST: { key: OrderStageKey; number: number; label: string; desc: string; icon: any }[] = [
  { key: 'request_submitted', number: 1, label: 'নতুন অর্ডার অনুরোধ', desc: 'ক্রেতার ক্রয় অনুরোধ জমা', icon: FileText },
  { key: 'negotiation', number: 2, label: 'মূল্য আলোচনা', desc: 'দর ও শর্তাবলি সমঝোতা', icon: MessageSquare },
  { key: 'confirmed', number: 3, label: 'অর্ডার নিশ্চিতকরণ', desc: 'উভয় পক্ষের সম্মতি', icon: CheckCircle },
  { key: 'preparing', number: 4, label: 'পণ্য প্রস্তুতকরণ', desc: 'বাছাই ও গ্রেডিং চলছে', icon: Package },
  { key: 'ready_to_ship', number: 5, label: 'সরবরাহে প্রস্তুত', desc: 'প্যাকিং ও চালান রেডি', icon: Boxes },
  { key: 'shipped', number: 6, label: 'পণ্য প্রেরণ', desc: 'ট্রাকে ট্রানজিটে আছে', icon: Truck },
  { key: 'received', number: 7, label: 'পণ্য গ্রহণ', desc: 'ওয়্যারহাউজে আনলোড ও মান যাচাই', icon: PackageCheck },
  { key: 'completed', number: 8, label: 'অর্ডার সম্পন্ন', desc: 'এসক্রো অর্থ ছাড় সম্পন্ন', icon: CheckCheck }
];

export const OrderProgressTracker: React.FC<OrderProgressTrackerProps> = ({
  currentStage,
  stageNumber = 1,
  activityHistory = [],
  showHistoryDrawer = false
}) => {
  const isCancelled = currentStage === 'cancelled';

  // Determine current active index in the 8 normal steps
  const activeIndex = STAGES_LIST.findIndex(s => s.key === currentStage);
  const currentStep = activeIndex >= 0 ? activeIndex + 1 : (stageNumber || 1);

  return (
    <div className="bg-stone-50 rounded-2xl border border-stone-200 p-5 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200/80 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
          <h4 className="text-sm font-bold text-stone-900">
            অর্ডার অগ্রগতির ৯-ধাপ ট্র্যাকার (9-Stage Lifecycle Tracker)
          </h4>
        </div>
        <div>
          {isCancelled ? (
            <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold flex items-center gap-1 border border-rose-200">
              <XCircle className="w-3.5 h-3.5" />
              <span>ধাপ ৯: অর্ডার বাতিল</span>
            </span>
          ) : (
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold flex items-center gap-1 border border-emerald-200">
              <Clock className="w-3.5 h-3.5 text-emerald-700" />
              <span>ধাপ {currentStep}/৮: {STAGES_LIST[activeIndex]?.label || 'চলমান'}</span>
            </span>
          )}
        </div>
      </div>

      {/* Visual Stepper */}
      {isCancelled ? (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 flex items-center gap-3 text-xs">
          <XCircle className="w-6 h-6 text-rose-600 shrink-0" />
          <div>
            <div className="font-bold text-sm">এই অর্ডারটি বাতিল করা হয়েছে</div>
            <div className="text-rose-700 mt-0.5">উভয় পক্ষের সমঝোতায় অথবা প্রতিকূল কারণে বাতিল হয়েছে এবং এসক্রো অর্থ রিফান্ড প্রক্রিয়াধীন/সম্পন্ন।</div>
          </div>
        </div>
      ) : (
        <div className="relative">
          {/* Connecting bar for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-6 right-6 h-1 bg-stone-200 -translate-y-5 z-0" />
          <div 
            className="hidden lg:block absolute top-1/2 left-6 h-1 bg-emerald-700 -translate-y-5 z-0 transition-all duration-500"
            style={{ width: `${Math.min(100, (Math.max(0, currentStep - 1) / (STAGES_LIST.length - 1)) * 100)}%` }}
          />

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 relative z-10">
            {STAGES_LIST.map((stage, idx) => {
              const isPassed = idx + 1 < currentStep;
              const isCurrent = idx + 1 === currentStep;
              const isUpcoming = idx + 1 > currentStep;
              const Icon = stage.icon;

              return (
                <div 
                  key={stage.key}
                  className={`flex flex-col items-center text-center p-2.5 rounded-xl transition-all ${
                    isCurrent 
                      ? 'bg-emerald-50 border-2 border-emerald-600 shadow-sm scale-102' 
                      : isPassed 
                        ? 'bg-white border border-emerald-200' 
                        : 'bg-white/60 border border-stone-200 opacity-60'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center mb-1.5 transition-colors ${
                    isCurrent 
                      ? 'bg-emerald-800 text-white ring-4 ring-emerald-100' 
                      : isPassed 
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-stone-200 text-stone-500'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>

                  <span className="text-[10px] font-bold text-stone-500">ধাপ {stage.number}</span>
                  <div className={`text-xs font-bold leading-tight mt-0.5 ${
                    isCurrent ? 'text-emerald-950 font-extrabold' : isPassed ? 'text-stone-800' : 'text-stone-500'
                  }`}>
                    {stage.label}
                  </div>
                  <span className="text-[10px] text-stone-500 line-clamp-1 mt-0.5">{stage.desc}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Activity Timeline Drawer if requested */}
      {(showHistoryDrawer || activityHistory.length > 0) && (
        <div className="pt-3 border-t border-stone-200 space-y-2">
          <div className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-emerald-800" />
            <span>অর্ডারের সাম্প্রতিক কার্যক্রমের লগ (Order Activity History):</span>
          </div>

          <div className="divide-y divide-stone-200/70 bg-white rounded-xl border border-stone-200 overflow-hidden max-h-48 overflow-y-auto">
            {activityHistory.length === 0 ? (
              <div className="p-3 text-center text-xs text-stone-400">কোনো পূর্ববর্তী কার্যক্রমের তথ্য পাওয়া যায়নি।</div>
            ) : (
              activityHistory.map((log) => (
                <div key={log.id} className="p-3 flex items-start justify-between gap-3 text-xs">
                  <div className="space-y-0.5">
                    <div className="font-bold text-stone-900 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                      <span>{log.title}</span>
                    </div>
                    <p className="text-stone-600 text-[11px] pl-4">{log.note}</p>
                    <div className="text-[10px] text-stone-400 pl-4">দায়িত্বশীল: {log.actor}</div>
                  </div>
                  <span className="text-[10px] text-stone-400 whitespace-nowrap bg-stone-100 px-2 py-0.5 rounded">
                    {log.timestamp}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
