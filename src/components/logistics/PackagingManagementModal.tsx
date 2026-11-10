import React, { useState } from 'react';
import { 
  Box, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  Printer, 
  Thermometer, 
  Zap, 
  Tag, 
  Layers,
  Scale
} from 'lucide-react';
import { DeliveryItem, PackagingInfo, PackagingType } from '../../types';

interface PackagingManagementModalProps {
  delivery: DeliveryItem;
  isOpen: boolean;
  onClose: () => void;
  onUpdatePackaging: (deliveryId: string, packagingData: PackagingInfo) => void;
}

const PACKAGING_TYPES: PackagingType[] = [
  'বস্তা',
  'কার্টন',
  'ঝুড়ি',
  'বাক্স',
  'পলিব্যাগ',
  'প্লাস্টিক ক্রেট',
  'অন্যান্য'
];

export const PackagingManagementModal: React.FC<PackagingManagementModalProps> = ({
  delivery,
  isOpen,
  onClose,
  onUpdatePackaging
}) => {
  const current = delivery.packaging;

  const [packagingType, setPackagingType] = useState<PackagingType>(current.packagingType || 'বস্তা');
  const [packageCount, setPackageCount] = useState<number>(current.packageCount || 10);
  const [weightPerPkg, setWeightPerPkg] = useState<number>(current.weightPerPackage || 40);
  const [packagingDate, setPackagingDate] = useState<string>(
    current.packagingDate || new Date().toLocaleDateString('bn-BD', { day: '2-digit', month: 'long', year: 'numeric' })
  );
  const [status, setStatus] = useState<'pending' | 'in_progress' | 'completed'>(current.status || 'completed');
  const [instructions, setInstructions] = useState<string>(current.packagingInstructions || '');
  const [isPerishable, setIsPerishable] = useState<boolean>(current.isPerishable ?? false);
  const [storageTemp, setStorageTemp] = useState<string>(current.storageTemperature || 'স্বাভাবিক শুষ্ক তাপমাত্রা');
  const [fastTransit, setFastTransit] = useState<boolean>(current.fastTransitRequired ?? false);
  const [freshnessNotes, setFreshnessNotes] = useState<string>(current.freshnessInstructions || '');

  const [showLabelPrint, setShowLabelPrint] = useState(false);

  if (!isOpen) return null;

  const totalCalculatedWeight = (Number(packageCount) || 0) * (Number(weightPerPkg) || 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdatePackaging(delivery.id, {
      packagingType,
      packageCount: Number(packageCount),
      weightPerPackage: Number(weightPerPkg),
      totalWeight: totalCalculatedWeight,
      packagingDate,
      status,
      packagingInstructions: instructions,
      isPerishable,
      storageTemperature: storageTemp,
      fastTransitRequired: fastTransit,
      freshnessInstructions: freshnessNotes
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-stone-200 animate-in fade-in">
        
        {/* Header */}
        <div className="p-4 bg-stone-100 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Box className="w-5 h-5 text-emerald-800" />
            <div>
              <h3 className="font-bold text-stone-900 text-sm sm:text-base">
                পণ্য প্যাকেজিং ও গুণগত মান নিয়ন্ত্রণ
              </h3>
              <p className="text-[11px] text-stone-500">
                অর্ডার: {delivery.orderNumber} · পণ্য: {delivery.productName} ({delivery.quantity} {delivery.unit})
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowLabelPrint(!showLabelPrint)}
              className="text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-stone-300 bg-white text-stone-700 hover:bg-stone-50 flex items-center gap-1 cursor-pointer"
            >
              <Tag className="w-3.5 h-3.5 text-emerald-700" />
              <span>{showLabelPrint ? 'ফর্ম দেখুন' : 'প্যাকেজ লেবেল'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        {showLabelPrint ? (
          /* Printable Label View */
          <div className="p-6 overflow-y-auto space-y-4 font-bengali">
            <div className="p-6 rounded-2xl border-2 border-dashed border-stone-400 bg-white space-y-4 max-w-md mx-auto">
              <div className="flex items-center justify-between border-b pb-2">
                <div className="font-brand font-bold text-stone-900">
                  Hill <span className="text-amber-700">eCommerce</span>
                </div>
                <div className="text-[10px] bg-emerald-900 text-white px-2 py-0.5 rounded font-mono">
                  {delivery.challanNumber}
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <div className="font-bold text-base text-stone-900">{delivery.productName}</div>
                <div className="text-stone-600">লট আইডি: LOT-{delivery.orderNumber.replace('ORD-', '')}</div>
                <div className="text-stone-600">প্যাকেজ টাইপ: <strong>{packagingType}</strong></div>
                <div className="text-stone-600">প্যাকেজ সংখ্যা: <strong>{packageCount} টি ({weightPerPkg} কেজি/প্যাকেট)</strong></div>
                <div className="text-stone-900 font-bold text-sm">মোট নিট ওজন: {totalCalculatedWeight} কেজি</div>
              </div>

              <div className="p-2.5 bg-stone-50 rounded border text-[11px] space-y-1">
                <div>প্রেরক: {delivery.sellerName} ({delivery.sellerCompany})</div>
                <div>প্রাপক: {delivery.buyerName} ({delivery.buyerCompany})</div>
                <div>গন্তব্য: {delivery.deliveryAddress}</div>
              </div>

              {isPerishable && (
                <div className="p-2 rounded bg-rose-50 border border-rose-300 text-rose-800 text-[10px] font-bold text-center uppercase">
                  ⚠ পচনশীল ও ভঙ্গুর পণ্য – সাবধানে হ্যান্ডল করুন
                </div>
              )}

              <div className="flex justify-center pt-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-1.5 rounded-lg bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>লেবেল প্রিন্ট করুন</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Form Controls */
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-5 text-xs">
            
            {/* Packaging Type Selector */}
            <div className="space-y-2">
              <label className="font-bold text-stone-800 block text-xs">
                ১. প্যাকেজিংয়ের মাধ্যম বা পাত্র নির্বাচন করুন:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {PACKAGING_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setPackagingType(type)}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer font-semibold ${
                      packagingType === type
                        ? 'border-emerald-800 bg-emerald-50 text-emerald-950 ring-1 ring-emerald-800'
                        : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Counts & Weight Matrix */}
            <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 space-y-3">
              <div className="font-bold text-stone-900 text-xs flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-emerald-800" />
                <span>২. প্যাকেট সংখ্যা ও ওজনের হিসাব:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-stone-600 text-[11px] mb-1 font-semibold">প্যাকেটের সংখ্যা (টি):</label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={packageCount}
                    onChange={(e) => setPackageCount(Number(e.target.value))}
                    className="w-full bg-white border border-stone-300 rounded-lg p-2 font-bold text-stone-900 focus:ring-1 focus:ring-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 text-[11px] mb-1 font-semibold">প্রতি প্যাকেটের ওজন (কেজি):</label>
                  <input
                    type="number"
                    min={0.1}
                    step={0.1}
                    required
                    value={weightPerPkg}
                    onChange={(e) => setWeightPerPkg(Number(e.target.value))}
                    className="w-full bg-white border border-stone-300 rounded-lg p-2 text-stone-800 focus:ring-1 focus:ring-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 text-[11px] mb-1 font-semibold">মোট নিট ওজন (স্বয়ংক্রিয়):</label>
                  <div className="w-full bg-emerald-50 border border-emerald-300 rounded-lg p-2 font-bold text-emerald-950 text-sm">
                    {totalCalculatedWeight} কেজি
                  </div>
                </div>
              </div>
            </div>

            {/* Dates & Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-stone-800 block mb-1">প্যাকেজিংয়ের তারিখ:</label>
                <input
                  type="text"
                  value={packagingDate}
                  onChange={(e) => setPackagingDate(e.target.value)}
                  className="w-full border border-stone-300 rounded-lg p-2 focus:ring-1 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-800 block mb-1">বর্তমান প্যাকেজিং স্ট্যাটাস:</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full border border-stone-300 rounded-lg p-2 font-medium focus:ring-1 focus:ring-emerald-700"
                >
                  <option value="pending">পেন্ডিং (অপেক্ষমাণ)</option>
                  <option value="in_progress">প্যাকেজিং চলছে</option>
                  <option value="completed">প্যাকেজিং সম্পূর্ণ সম্পন্ন</option>
                </select>
              </div>
            </div>

            {/* Perishable Produce Cold Chain Controls */}
            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-amber-200">
                <div className="flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-amber-700" />
                  <span className="font-bold text-amber-950 text-xs">৩. পচনশীল পণ্য ও তাপমাত্রা নিয়ন্ত্রণ</span>
                </div>
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-amber-950">
                  <input
                    type="checkbox"
                    checked={isPerishable}
                    onChange={(e) => setIsPerishable(e.target.checked)}
                    className="w-4 h-4 text-emerald-700 rounded focus:ring-emerald-700"
                  />
                  <span>পচনশীল পাহাড়ি ফল বা শাকসবজি</span>
                </label>
              </div>

              {isPerishable && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 animate-in fade-in">
                  <div>
                    <label className="block text-stone-700 text-[11px] font-semibold mb-1">প্রয়োজনীয় তাপমাত্রা:</label>
                    <input
                      type="text"
                      value={storageTemp}
                      onChange={(e) => setStorageTemp(e.target.value)}
                      placeholder="যেমন: ১৫° - ২০° সেলসিয়াস অথবা ছায়াযুক্ত বাতাস"
                      className="w-full bg-white border border-stone-300 rounded-lg p-2 text-xs focus:ring-1 focus:ring-amber-700"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 text-[11px] font-semibold mb-1">দ্রুত পরিবহন ফ্ল্যাগ:</label>
                    <label className="flex items-center gap-2 bg-white p-2 rounded-lg border border-stone-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={fastTransit}
                        onChange={(e) => setFastTransit(e.target.checked)}
                        className="w-4 h-4 text-amber-700 rounded"
                      />
                      <span className="font-semibold text-stone-800 text-[11px]">২৪ ঘণ্টার মধ্যে দ্রুত ডেলিভারি নিশ্চিত করতে হবে</span>
                    </label>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-stone-700 text-[11px] font-semibold mb-1">টাটকা রাখার ও লেবেলিং নির্দেশনা:</label>
                    <input
                      type="text"
                      value={freshnessNotes}
                      onChange={(e) => setFreshnessNotes(e.target.value)}
                      placeholder="যেমন: প্রতিটি আনারসে কলার পাতা মোড়ানো, বাতাসের ভেন্টিলেশন পর্যাপ্ত রাখুন।"
                      className="w-full bg-white border border-stone-300 rounded-lg p-2 text-xs focus:ring-1 focus:ring-amber-700"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* General packaging instructions */}
            <div>
              <label className="font-semibold text-stone-800 block mb-1">
                প্যাকেজিং নির্দেশনা ও লেবেলিং বিবরণ:
              </label>
              <textarea
                rows={2}
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="যেমন: ৫০ কেজির ফুড গ্রেড জুট বস্তা, রাঙামাটি জুম ফার্মার সিলগালা যুক্ত করা হয়েছে।"
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
                <span>প্যাকেজিং তথ্য সংরক্ষণ করুন</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
