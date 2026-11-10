import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  AlertTriangle, 
  Truck, 
  Package, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  PlusCircle, 
  Navigation,
  FileCheck,
  Building2,
  Box
} from 'lucide-react';
import { DeliveryItem, DeliveryStageKey } from '../../types';

interface DeliveryProgressTimelineProps {
  delivery: DeliveryItem;
  canUpdate?: boolean;
  onAdvanceStage?: (deliveryId: string, nextStage: DeliveryStageKey, note: string, location: string) => void;
  onAddCheckpoint?: (deliveryId: string, location: string, statusText: string, note?: string) => void;
}

export const DELIVERY_STAGES_CONFIG: {
  key: DeliveryStageKey;
  stepNumber: number;
  label: string;
  shortDesc: string;
  icon: any;
}[] = [
  { key: 'order_confirmed', stepNumber: 1, label: 'অর্ডার নিশ্চিত', shortDesc: 'চুক্তি ও অর্ডার কনফার্মেশন সম্পন্ন', icon: FileCheck },
  { key: 'preparing', stepNumber: 2, label: 'পণ্য প্রস্তুত হচ্ছে', shortDesc: 'বাগান/ফার্ম থেকে সংগ্রহ ও গ্রেডিং', icon: Package },
  { key: 'packaging_completed', stepNumber: 3, label: 'প্যাকেজিং সম্পন্ন', shortDesc: 'বস্তা/ক্রেট প্যাকিং ও লেবেলিং', icon: Box },
  { key: 'ready_for_transport', stepNumber: 4, label: 'পরিবহনের অপেক্ষায়', shortDesc: 'ডিপো/লোডিং পয়েন্টে প্রস্তুত', icon: Clock },
  { key: 'picked_up', stepNumber: 5, label: 'যানবাহনে লোড সম্পন্ন', shortDesc: 'পরিবহনকারী চালান গ্রহণ করেছে', icon: Truck },
  { key: 'in_transit', stepNumber: 6, label: 'পথে রয়েছে', shortDesc: 'পাহাড় ও মহাসড়ক ট্রানজিটে চলমান', icon: Navigation },
  { key: 'arrived_hub', stepNumber: 7, label: 'আঞ্চলিক হাবে পৌঁছেছে', shortDesc: 'গন্তব্য জেলা/আড়ত সংলগ্ন ডিপো', icon: Building2 },
  { key: 'out_for_delivery', stepNumber: 8, label: 'ডেলিভারির জন্য বের হয়েছে', shortDesc: 'ক্রেতার গুদামে আনলোডিংয়ের জন্য প্রস্তুত', icon: Truck },
  { key: 'delivered', stepNumber: 9, label: 'ডেলিভারি সম্পন্ন', shortDesc: 'ক্রেতা কর্তৃক চালান ও পণ্য গ্রহণ', icon: CheckCircle2 }
];

export const DeliveryProgressTimeline: React.FC<DeliveryProgressTimelineProps> = ({
  delivery,
  canUpdate = false,
  onAdvanceStage,
  onAddCheckpoint
}) => {
  const [showAddCheckpoint, setShowAddCheckpoint] = useState(false);
  const [cpLocation, setCpLocation] = useState('');
  const [cpStatus, setCpStatus] = useState('');
  const [cpNote, setCpNote] = useState('');

  const [showAdvanceModal, setShowAdvanceModal] = useState(false);
  const [nextLocation, setNextLocation] = useState(delivery.currentLocation || '');
  const [nextNote, setNextNote] = useState('');

  const currentStep = delivery.stageNumber || 1;

  // Find next step in line
  const nextConfigIndex = DELIVERY_STAGES_CONFIG.findIndex(s => s.stepNumber === currentStep + 1);
  const nextStageConfig = nextConfigIndex !== -1 ? DELIVERY_STAGES_CONFIG[nextConfigIndex] : null;

  const handleAdvance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nextStageConfig || !onAdvanceStage) return;
    onAdvanceStage(delivery.id, nextStageConfig.key, nextNote || `${nextStageConfig.label} আপডেট সম্পন্ন`, nextLocation || delivery.currentLocation);
    setShowAdvanceModal(false);
    setNextNote('');
  };

  const handleCreateCheckpoint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cpLocation || !cpStatus || !onAddCheckpoint) return;
    onAddCheckpoint(delivery.id, cpLocation, cpStatus, cpNote);
    setShowAddCheckpoint(false);
    setCpLocation('');
    setCpStatus('');
    setCpNote('');
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-5 space-y-6">
      
      {/* Header bar of Timeline */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-stone-900 text-base">সরবরাহ ও ট্র্যাকিং স্ট্যাটাস</h3>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold border border-emerald-300">
              ধাপ {currentStep}/৯
            </span>
            {delivery.isDelayed && (
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 font-semibold border border-rose-300 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                বিলম্বিত ডেলিভারি
              </span>
            )}
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            ম্যানুয়াল চেকপোস্ট ও পাহাড়ি পরিবহন নেটওয়ার্কের সর্বশেষ হালনাগাদ
          </p>
        </div>

        {/* Action Controls for Seller / Logistics Officer */}
        {canUpdate && currentStep < 9 && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAddCheckpoint(true)}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-stone-300 text-stone-700 hover:bg-stone-50 flex items-center gap-1.5 cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5 text-stone-500" />
              <span>চেকপোস্ট যোগ করুন</span>
            </button>
            {nextStageConfig && (
              <button
                onClick={() => setShowAdvanceModal(true)}
                className="text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <span>পরবর্তী ধাপে নিন ({nextStageConfig.label})</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Delay alert banner if any */}
      {delivery.isDelayed && (
        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="font-bold">বিলম্বের কারণ ও সতর্কতা:</p>
            <p className="text-stone-700">{delivery.delayReason || 'আবহাওয়া বা পাহাড়ি রাস্তায় যানজটের কারণে সময় কিছুটা দীর্ঘ হতে পারে।'}</p>
          </div>
        </div>
      )}

      {/* 9 Stages Horizontal Stepper (Scrollable on small screens) */}
      <div className="overflow-x-auto pb-3 pt-2">
        <div className="min-w-[850px] flex items-start justify-between relative px-2">
          {/* Background Connecting Line */}
          <div className="absolute top-5 left-8 right-8 h-1 bg-stone-200 -z-0" />
          {/* Active Filled Line */}
          <div 
            className="absolute top-5 left-8 h-1 bg-emerald-600 transition-all duration-500 -z-0"
            style={{ 
              width: `${Math.min(100, Math.max(0, ((currentStep - 1) / (DELIVERY_STAGES_CONFIG.length - 1)) * 100))}%` 
            }} 
          />

          {DELIVERY_STAGES_CONFIG.map((stage) => {
            const isCompleted = stage.stepNumber < currentStep;
            const isCurrent = stage.stepNumber === currentStep;
            const isUpcoming = stage.stepNumber > currentStep;
            const Icon = stage.icon;

            return (
              <div 
                key={stage.key} 
                className="flex flex-col items-center text-center relative z-10 w-24 group"
              >
                {/* Node Circle */}
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all shadow-2xs ${
                    isCompleted 
                      ? 'bg-emerald-800 text-white ring-4 ring-emerald-100' 
                      : isCurrent 
                        ? 'bg-amber-500 text-stone-950 ring-4 ring-amber-100 animate-pulse' 
                        : 'bg-white text-stone-400 border-2 border-stone-300'
                  }`}
                  title={`${stage.stepNumber}. ${stage.label}`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-amber-300" />
                  ) : (
                    <Icon className={`w-4 h-4 ${isCurrent ? 'text-stone-950' : 'text-stone-400'}`} />
                  )}
                </div>

                {/* Stage Title */}
                <div className="mt-2 space-y-0.5">
                  <div className={`text-[11px] font-bold leading-tight ${
                    isCurrent ? 'text-amber-800' : isCompleted ? 'text-emerald-950' : 'text-stone-400'
                  }`}>
                    {stage.label}
                  </div>
                  <div className="text-[9px] text-stone-500 leading-tight hidden group-hover:block">
                    {stage.shortDesc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Current Position & Checkpoint Log */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-2">
        
        {/* Left: Current Status Summary Box */}
        <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
          <div className="text-xs font-bold text-stone-800 uppercase tracking-wide flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-emerald-700" />
            <span>বর্তমান অবস্থান ও সময়</span>
          </div>

          <div className="space-y-2 text-xs">
            <div>
              <span className="text-stone-500 block text-[11px]">বর্তমান লোকেশন:</span>
              <span className="font-bold text-stone-900 text-sm">{delivery.currentLocation || 'নির্ধারণ করা হয়নি'}</span>
            </div>
            <div>
              <span className="text-stone-500 block text-[11px]">সর্বশেষ আপডেট সময়:</span>
              <span className="font-semibold text-stone-800">{delivery.lastUpdatedTime}</span>
            </div>
            <div>
              <span className="text-stone-500 block text-[11px]">প্রত্যাশিত পৌঁছানোর তারিখ:</span>
              <span className="font-semibold text-emerald-800">{delivery.expectedDeliveryDate}</span>
            </div>
            <div className="pt-2 border-t border-stone-200">
              <span className="text-stone-500 block text-[11px]">পরিবহন মাধ্যম:</span>
              <span className="font-medium text-stone-800">
                {delivery.transport.vehicleType} · {delivery.transport.vehicleNumber}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Checkpoint Progression Log */}
        <div className="lg:col-span-2 p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-xs font-bold text-stone-800 uppercase tracking-wide flex items-center gap-1.5">
              <Navigation className="w-4 h-4 text-emerald-700" />
              <span>চেকপোস্ট ও অগ্রগতি লগ ({delivery.transport.trackingCheckpoints?.length || 0})</span>
            </div>
            <span className="text-[10px] text-stone-500 font-medium">পাহাড়ি হাইওয়ে রিপোর্ট</span>
          </div>

          <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
            {delivery.transport.trackingCheckpoints && delivery.transport.trackingCheckpoints.length > 0 ? (
              delivery.transport.trackingCheckpoints.map((cp, idx) => (
                <div key={cp.id || idx} className="flex items-start gap-3 text-xs bg-white p-2.5 rounded-lg border border-stone-200 shadow-2xs">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-stone-900">{cp.location}</span>
                      <span className="text-[10px] text-stone-400">{cp.timestamp}</span>
                    </div>
                    <p className="text-emerald-900 font-semibold">{cp.statusText}</p>
                    {cp.note && <p className="text-[11px] text-stone-600">{cp.note}</p>}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-stone-400 text-xs">
                কোনো মধ্যবর্তী চেকপোস্ট লগ যুক্ত করা হয়নি।
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Modal: Advance Stage */}
      {showAdvanceModal && nextStageConfig && (
        <div className="fixed inset-0 z-50 bg-stone-950/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-stone-200 animate-in fade-in">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <h4 className="font-bold text-stone-900 text-sm">
                ডেলিভারি স্ট্যাটাস পরবর্তী ধাপে রূপান্তর
              </h4>
              <button 
                onClick={() => setShowAdvanceModal(false)}
                className="text-stone-400 hover:text-stone-600 text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAdvance} className="space-y-3 text-xs">
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950">
                <span className="font-bold block">বর্তমান পর্যায়: ধাপ {currentStep}</span>
                <span className="font-bold text-emerald-800 block text-sm mt-0.5">
                  রূপান্তর হবে: ধাপ {nextStageConfig.stepNumber} – {nextStageConfig.label}
                </span>
                <p className="text-[11px] text-stone-600 mt-1">{nextStageConfig.shortDesc}</p>
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">বর্তমান অবস্থান (লোকেশন):</label>
                <input
                  type="text"
                  required
                  value={nextLocation}
                  onChange={(e) => setNextLocation(e.target.value)}
                  placeholder="যেমন: কাপ্তাই রোড চেকপোস্ট, রাঙামাটি"
                  className="w-full border border-stone-300 rounded-lg p-2 focus:ring-1 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">অগ্রগতি বা ট্রানজিট নোট:</label>
                <textarea
                  rows={3}
                  value={nextNote}
                  onChange={(e) => setNextNote(e.target.value)}
                  placeholder="যেমন: কাভার্ড ভ্যান সফলভাবে লোড করে চালক চট্টগ্রামের উদ্দেশ্যে রওনা হয়েছে।"
                  className="w-full border border-stone-300 rounded-lg p-2 focus:ring-1 focus:ring-emerald-700"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setShowAdvanceModal(false)}
                  className="px-3.5 py-1.5 rounded-lg border border-stone-300 text-stone-600 font-semibold"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-emerald-800 text-white font-bold hover:bg-emerald-900 cursor-pointer shadow-xs"
                >
                  নিশ্চিত করুন ও আপডেট পাঠান
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Checkpoint */}
      {showAddCheckpoint && (
        <div className="fixed inset-0 z-50 bg-stone-950/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-stone-200 animate-in fade-in">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <h4 className="font-bold text-stone-900 text-sm">
                নতুন ট্র্যাকিং চেকপোস্ট যোগ করুন
              </h4>
              <button 
                onClick={() => setShowAddCheckpoint(false)}
                className="text-stone-400 hover:text-stone-600 text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCheckpoint} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-stone-700 block mb-1">চেকপোস্ট এলাকা / স্থান:</label>
                <input
                  type="text"
                  required
                  value={cpLocation}
                  onChange={(e) => setCpLocation(e.target.value)}
                  placeholder="যেমন: ফটিকছড়ি হাইওয়ে পয়েন্ট, চট্টগ্রাম"
                  className="w-full border border-stone-300 rounded-lg p-2 focus:ring-1 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">স্ট্যাটাস / পরিস্থিতির শিরোনাম:</label>
                <input
                  type="text"
                  required
                  value={cpStatus}
                  onChange={(e) => setCpStatus(e.target.value)}
                  placeholder="যেমন: পাহাড়ি চেকপোস্ট অতিক্রম, গাড়ি সচল"
                  className="w-full border border-stone-300 rounded-lg p-2 focus:ring-1 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">বিস্তারিত বিবরণ (ঐচ্ছিক):</label>
                <textarea
                  rows={2}
                  value={cpNote}
                  onChange={(e) => setCpNote(e.target.value)}
                  placeholder="যেমন: বৃষ্টি থেমেছে, কাভার্ড ট্রাকের পণ্য অক্ষত ও স্বাভাবিক গতিতে চলছে।"
                  className="w-full border border-stone-300 rounded-lg p-2 focus:ring-1 focus:ring-emerald-700"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setShowAddCheckpoint(false)}
                  className="px-3.5 py-1.5 rounded-lg border border-stone-300 text-stone-600 font-semibold"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-emerald-800 text-white font-bold hover:bg-emerald-900 cursor-pointer shadow-xs"
                >
                  চেকপোস্ট যুক্ত করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
