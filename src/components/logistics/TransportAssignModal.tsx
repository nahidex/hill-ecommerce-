import React, { useState } from 'react';
import { 
  Truck, 
  X, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  User, 
  DollarSign, 
  Clock, 
  ShieldCheck,
  Building,
  Navigation
} from 'lucide-react';
import { DeliveryItem, TransportInfo, TransportMode } from '../../types';
import { SAMPLE_TRANSPORT_PROVIDERS } from '../../data/logisticsMock';

interface TransportAssignModalProps {
  delivery: DeliveryItem;
  isOpen: boolean;
  onClose: () => void;
  onAssignTransport: (deliveryId: string, transportData: TransportInfo) => void;
}

const TRANSPORT_MODES: { mode: TransportMode; label: string; desc: string }[] = [
  { mode: 'own', label: 'নিজস্ব পরিবহন', desc: 'উৎপাদকের নিজস্ব পিকআপ বা ভটভটি' },
  { mode: 'third_party', label: '৩য় পক্ষ লজিস্টিকস', desc: 'ভেরিফাইড পাহাড়ি কার্গো এজেন্সি' },
  { mode: 'buyer_assigned', label: 'ক্রেতার নিজস্ব গাড়ি', desc: 'ক্রেতার আড়তের পাঠানো ট্রাক' },
  { mode: 'courier', label: 'কুরিয়ার সার্ভিস', desc: 'ডোর-টু-ডোর এক্সপ্রেস কার্গো' }
];

const VEHICLE_TYPES = [
  '১.৫ টন মিনি পিকআপ',
  '৩ টন কাভার্ড ট্রাক',
  '৫ টন মিডিয়াম ট্রাক',
  '৭.৫ টন বড় ট্রাক',
  'কাপ্তাই লেক মালবাহী ট্রলার / কার্গো বোট',
  'কুরিয়ার কার্গো ভ্যান'
];

export const TransportAssignModal: React.FC<TransportAssignModalProps> = ({
  delivery,
  isOpen,
  onClose,
  onAssignTransport
}) => {
  const current = delivery.transport;

  const [mode, setMode] = useState<TransportMode>(current.mode || 'third_party');
  const [providerName, setProviderName] = useState(current.providerName || 'পাহাড়িকা এক্সপ্রেস লজিস্টিকস');
  const [driverName, setDriverName] = useState(current.driverName || 'রফিক উল্লাহ');
  const [driverPhone, setDriverPhone] = useState(current.driverPhone || '০১৮১২-৯৮৭৬৫৪');
  const [vehicleType, setVehicleType] = useState(current.vehicleType || '৩ টন কাভার্ড ট্রাক');
  const [vehicleNumber, setVehicleNumber] = useState(current.vehicleNumber || 'চট্ট মেট্রো-ট-১১-৪৫০৯');
  const [pickupLoc, setPickupLoc] = useState(current.pickupLocation || delivery.pickupAddress);
  const [destLoc, setDestLoc] = useState(current.destination || delivery.deliveryAddress);
  const [pickupDate, setPickupDate] = useState(current.pickupDateTime || '১০ নভেম্বর ২০২৬, সকাল ০৯:০০');
  const [expectedArrival, setExpectedArrival] = useState(current.expectedArrivalDateTime || '১১ নভেম্বর ২০২৬, বিকাল ০৪:০০');
  const [cost, setCost] = useState<number>(current.transportCost || 3500);
  const [notes, setNotes] = useState(current.notes || 'বৃষ্টির দিনে পাহাড়ি রাস্তায় ত্রিস্তরীয় ত্রিপল দিয়ে কাভার করা থাকবে।');

  if (!isOpen) return null;

  const handleSelectVerifiedProvider = (provider: typeof SAMPLE_TRANSPORT_PROVIDERS[0]) => {
    setProviderName(provider.name);
    setDriverPhone(provider.phone);
    if (provider.fleetTypes.length > 0) {
      setVehicleType(provider.fleetTypes[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAssignTransport(delivery.id, {
      mode,
      providerName,
      driverName,
      driverPhone,
      vehicleType,
      vehicleNumber,
      pickupLocation: pickupLoc,
      destination: destLoc,
      pickupDateTime: pickupDate,
      expectedArrivalDateTime: expectedArrival,
      transportCost: Number(cost),
      notes,
      trackingCheckpoints: current.trackingCheckpoints || []
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-stone-200 animate-in fade-in">
        
        {/* Header */}
        <div className="p-4 bg-stone-100 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-emerald-800" />
            <div>
              <h3 className="font-bold text-stone-900 text-sm sm:text-base">
                পরিবহন ও লজিস্টিকস ক্যারিয়ার নির্ধারণ
              </h3>
              <p className="text-[11px] text-stone-500">
                অর্ডার: {delivery.orderNumber} · পণ্য: {delivery.productName} ({delivery.quantity} {delivery.unit})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-5 text-xs">
          
          {/* Step 1: Transport Mode */}
          <div className="space-y-2">
            <label className="font-bold text-stone-800 block text-xs">
              ১. পরিবহন পদ্ধতি নির্বাচন করুন:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {TRANSPORT_MODES.map((tm) => (
                <button
                  key={tm.mode}
                  type="button"
                  onClick={() => setMode(tm.mode)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    mode === tm.mode
                      ? 'border-emerald-800 bg-emerald-50 text-emerald-950 ring-1 ring-emerald-800'
                      : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                  }`}
                >
                  <div className="font-bold text-xs">{tm.label}</div>
                  <div className="text-[10px] text-stone-500 mt-0.5">{tm.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Select from Verified Carriers */}
          {mode === 'third_party' && (
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
              <span className="font-bold text-stone-800 block text-[11px]">
                পার্বত্য অঞ্চলে নিবন্ধিত ও অনুমোদিত ট্রান্সপোর্টার নির্বাচন:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SAMPLE_TRANSPORT_PROVIDERS.map((prov) => (
                  <button
                    key={prov.id}
                    type="button"
                    onClick={() => handleSelectVerifiedProvider(prov)}
                    className="p-2 rounded-lg bg-white border border-stone-200 hover:border-emerald-700 text-left transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <div>
                      <div className="font-bold text-stone-900 text-xs">{prov.name}</div>
                      <div className="text-[10px] text-stone-500">রেটিং: ★ {prov.rating} · {prov.coverage}</div>
                    </div>
                    <span className="text-[10px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                      বাছাই করুন
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Vehicle & Carrier Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-stone-800 block mb-1">পরিবহন কোম্পানি / চালানের নাম:</label>
              <input
                type="text"
                required
                value={providerName}
                onChange={(e) => setProviderName(e.target.value)}
                placeholder="যেমন: পাহাড়িকা এক্সপ্রেস লজিস্টিকস"
                className="w-full border border-stone-300 rounded-lg p-2 focus:ring-1 focus:ring-emerald-700"
              />
            </div>

            <div>
              <label className="font-semibold text-stone-800 block mb-1">যানবাহনের ধরন:</label>
              <select
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className="w-full border border-stone-300 rounded-lg p-2 font-medium focus:ring-1 focus:ring-emerald-700"
              >
                {VEHICLE_TYPES.map((v) => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-semibold text-stone-800 block mb-1">গাড়ির নিবন্ধন নম্বর:</label>
              <input
                type="text"
                required
                value={vehicleNumber}
                onChange={(e) => setVehicleNumber(e.target.value)}
                placeholder="যেমন: চট্ট মেট্রো-ট-১১-৪৫০৯ বা ঢাকা মেট্রো-ন-১৪-২০০২"
                className="w-full border border-stone-300 rounded-lg p-2 font-mono text-stone-900 focus:ring-1 focus:ring-emerald-700"
              />
            </div>

            <div>
              <label className="font-semibold text-stone-800 block mb-1">পরিবহন ভাড়া / খরচ (৳):</label>
              <input
                type="number"
                min={0}
                required
                value={cost}
                onChange={(e) => setCost(Number(e.target.value))}
                className="w-full border border-stone-300 rounded-lg p-2 font-bold text-stone-900 focus:ring-1 focus:ring-emerald-700"
              />
            </div>

            <div>
              <label className="font-semibold text-stone-800 block mb-1">চালকের নাম:</label>
              <input
                type="text"
                required
                value={driverName}
                onChange={(e) => setDriverName(e.target.value)}
                placeholder="যেমন: রফিক উল্লাহ"
                className="w-full border border-stone-300 rounded-lg p-2 focus:ring-1 focus:ring-emerald-700"
              />
            </div>

            <div>
              <label className="font-semibold text-stone-800 block mb-1">চালকের মোবাইল নম্বর:</label>
              <input
                type="text"
                required
                value={driverPhone}
                onChange={(e) => setDriverPhone(e.target.value)}
                placeholder="যেমন: ০১৮১২-৯৮৭৬৫৪"
                className="w-full border border-stone-300 rounded-lg p-2 font-mono focus:ring-1 focus:ring-emerald-700"
              />
            </div>
          </div>

          {/* Pickup & Destination Locations */}
          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 space-y-3">
            <div className="font-bold text-stone-900 text-xs flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-800" />
              <span>লোকেশন ও ট্রানজিট শিডিউল:</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-stone-600 text-[11px] mb-1 font-semibold">পিকআপ পয়েন্ট (উৎস):</label>
                <input
                  type="text"
                  required
                  value={pickupLoc}
                  onChange={(e) => setPickupLoc(e.target.value)}
                  className="w-full bg-white border border-stone-300 rounded-lg p-2 text-stone-800 focus:ring-1 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block text-stone-600 text-[11px] mb-1 font-semibold">গন্তব্য পয়েন্ট:</label>
                <input
                  type="text"
                  required
                  value={destLoc}
                  onChange={(e) => setDestLoc(e.target.value)}
                  className="w-full bg-white border border-stone-300 rounded-lg p-2 text-stone-800 focus:ring-1 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block text-stone-600 text-[11px] mb-1 font-semibold">লোডিং তারিখ ও সময়:</label>
                <input
                  type="text"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="w-full bg-white border border-stone-300 rounded-lg p-2 text-stone-800 focus:ring-1 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block text-stone-600 text-[11px] mb-1 font-semibold">আনুমানিক পৌঁছানোর সময়:</label>
                <input
                  type="text"
                  value={expectedArrival}
                  onChange={(e) => setExpectedArrival(e.target.value)}
                  className="w-full bg-white border border-stone-300 rounded-lg p-2 text-stone-800 focus:ring-1 focus:ring-emerald-700"
                />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="font-semibold text-stone-800 block mb-1">
              পাহাড়ি রাস্তা ও বিশেষ হ্যান্ডলিং নোট:
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="যেমন: পাহাড়ি বাঁক থাকায় সাবধানে ৬০ কিমি/ঘণ্টার নিচে গতি বজায় রাখা এবং ত্রিপল বাঁধা নিশ্চিত করা হয়েছে।"
              className="w-full border border-stone-300 rounded-lg p-2 text-xs focus:ring-1 focus:ring-emerald-700"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-stone-300 text-stone-600 font-semibold hover:bg-stone-50"
            >
              বাতিল
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-amber-300" />
              <span>যানবাহন নিশ্চিত করুন ও চালানে যুক্ত করুন</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
