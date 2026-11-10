import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  Camera, 
  X, 
  FileText, 
  ShieldCheck, 
  Upload, 
  Printer, 
  PackageCheck,
  AlertTriangle
} from 'lucide-react';
import { DeliveryItem, GoodsReceiptType, GoodsReceivedNote } from '../../types';

interface GoodsReceivedModalProps {
  delivery: DeliveryItem;
  isOpen: boolean;
  onClose: () => void;
  onSubmitGRN: (deliveryId: string, grnData: Omit<GoodsReceivedNote, 'id' | 'grnNumber'>) => void;
}

export const GoodsReceivedModal: React.FC<GoodsReceivedModalProps> = ({
  delivery,
  isOpen,
  onClose,
  onSubmitGRN
}) => {
  const [receiptType, setReceiptType] = useState<GoodsReceiptType>(
    delivery.grn?.receiptType || 'full'
  );
  const [receivedQty, setReceivedQty] = useState<number>(
    delivery.grn?.receivedQuantity ?? delivery.quantity
  );
  const [shortageQty, setShortageQty] = useState<number>(
    delivery.grn?.shortageQuantity || 0
  );
  const [damagedQty, setDamagedQty] = useState<number>(
    delivery.grn?.damagedQuantity || 0
  );
  const [problemDesc, setProblemDesc] = useState<string>(
    delivery.grn?.problemDescription || ''
  );
  const [comments, setComments] = useState<string>(
    delivery.grn?.buyerComments || ''
  );
  const [receivedBy, setReceivedBy] = useState<string>(
    delivery.grn?.receivedBy || delivery.buyerName
  );
  const [samplePhotos, setSamplePhotos] = useState<string[]>(
    delivery.grn?.attachedPhotos || []
  );

  if (!isOpen) return null;

  const isExistingGRN = !!delivery.grn;

  const handleTypeChange = (type: GoodsReceiptType) => {
    setReceiptType(type);
    if (type === 'full') {
      setReceivedQty(delivery.quantity);
      setShortageQty(0);
      setDamagedQty(0);
    } else if (type === 'partial') {
      setReceivedQty(Math.floor(delivery.quantity * 0.8));
      setShortageQty(Math.ceil(delivery.quantity * 0.2));
    } else if (type === 'damaged') {
      setDamagedQty(Math.ceil(delivery.quantity * 0.15));
      setReceivedQty(delivery.quantity - Math.ceil(delivery.quantity * 0.15));
    }
  };

  const handleSimulateAddPhoto = () => {
    const newPhotoUrl = `https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=80`;
    setSamplePhotos([...samplePhotos, newPhotoUrl]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitGRN(delivery.id, {
      deliveryId: delivery.id,
      orderNumber: delivery.orderNumber,
      receiptType,
      receivedQuantity: Number(receivedQty),
      shortageQuantity: Number(shortageQty),
      damagedQuantity: Number(damagedQty),
      unit: delivery.unit,
      problemDescription: problemDesc,
      buyerComments: comments,
      receiptDateTime: new Date().toLocaleDateString('bn-BD', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      receivedBy: receivedBy || delivery.buyerName,
      attachedPhotos: samplePhotos,
      status: receiptType === 'full' ? 'verified' : 'disputed'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-stone-200 animate-in fade-in">
        
        {/* Header */}
        <div className="p-4 bg-stone-100 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PackageCheck className="w-5 h-5 text-emerald-800" />
            <div>
              <h3 className="font-bold text-stone-900 text-sm sm:text-base">
                পণ্য প্রাপ্তি ও চালান নিশ্চিতকরণ (Goods Received Note - GRN)
              </h3>
              <p className="text-[11px] text-stone-500">
                চালান: {delivery.challanNumber} · অর্ডার: {delivery.orderNumber}
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
          
          {/* Top Product Summary */}
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center gap-3">
            <img 
              src={delivery.productImage} 
              alt={delivery.productName} 
              className="w-14 h-14 rounded-lg object-cover border border-stone-300 shrink-0" 
            />
            <div className="flex-1">
              <span className="font-bold text-stone-900 text-sm block">{delivery.productName}</span>
              <div className="text-stone-600 text-[11px] flex items-center gap-2 mt-0.5">
                <span>চালানে মোট পরিমাণ: <strong className="text-emerald-950">{delivery.quantity} {delivery.unit}</strong></span>
                <span>·</span>
                <span>প্যাকেজ: {delivery.packaging.packageCount} টি ({delivery.packaging.packagingType})</span>
              </div>
              <div className="text-stone-500 text-[10px]">
                প্রেরক: {delivery.sellerName} ({delivery.sellerCompany})
              </div>
            </div>
          </div>

          {/* Step 1: Select Receipt Type */}
          <div className="space-y-2">
            <label className="font-bold text-stone-800 block text-xs">
              ১. প্রাপ্ত পণ্যের অবস্থা নির্বাচন করুন:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { type: 'full' as GoodsReceiptType, label: 'সম্পূর্ণ অক্ষত', desc: 'শতভাগ সঠিক ও পরিচ্ছন্ন' },
                { type: 'partial' as GoodsReceiptType, label: 'আংশিক প্রাপ্তি', desc: 'কিছু পরিমাণ ঘাটতি আছে' },
                { type: 'damaged' as GoodsReceiptType, label: 'ক্ষতিগ্রস্ত প্রাপ্তি', desc: 'পণ্য বিনষ্ট বা নষ্ট' },
                { type: 'wrong_item' as GoodsReceiptType, label: 'ভুল পণ্য', desc: 'অর্ডারের সাথে অমিল' },
              ].map((opt) => (
                <button
                  key={opt.type}
                  type="button"
                  onClick={() => handleTypeChange(opt.type)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    receiptType === opt.type
                      ? 'border-emerald-800 bg-emerald-50/70 ring-1 ring-emerald-800'
                      : 'border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  <div className={`font-bold text-xs ${receiptType === opt.type ? 'text-emerald-950' : 'text-stone-800'}`}>
                    {opt.label}
                  </div>
                  <div className="text-[10px] text-stone-500 mt-0.5">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Quantity Reconciliation */}
          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-3">
            <div className="font-bold text-stone-900 text-xs">২. পরিমাণ হিসাব ও রেকর্ড:</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-stone-600 text-[11px] mb-1 font-semibold">গ্রহণকৃত পরিমাণ ({delivery.unit}):</label>
                <input
                  type="number"
                  min={0}
                  max={delivery.quantity}
                  value={receivedQty}
                  onChange={(e) => setReceivedQty(Number(e.target.value))}
                  className="w-full bg-white border border-stone-300 rounded-lg p-2 font-bold text-stone-900 focus:ring-1 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block text-stone-600 text-[11px] mb-1 font-semibold">ঘাটতি পরিমাণ ({delivery.unit}):</label>
                <input
                  type="number"
                  min={0}
                  value={shortageQty}
                  onChange={(e) => setShortageQty(Number(e.target.value))}
                  className="w-full bg-white border border-stone-300 rounded-lg p-2 text-stone-800 focus:ring-1 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block text-stone-600 text-[11px] mb-1 font-semibold">ক্ষতিগ্রস্ত পরিমাণ ({delivery.unit}):</label>
                <input
                  type="number"
                  min={0}
                  value={damagedQty}
                  onChange={(e) => setDamagedQty(Number(e.target.value))}
                  className="w-full bg-white border border-stone-300 rounded-lg p-2 text-rose-700 font-semibold focus:ring-1 focus:ring-emerald-700"
                />
              </div>
            </div>

            {receiptType !== 'full' && (
              <div className="pt-2">
                <label className="block text-stone-700 text-[11px] font-semibold mb-1">
                  ঘাটতি বা ক্ষতির সুনির্দিষ্ট কারণ ও বিবরণ:
                </label>
                <textarea
                  rows={2}
                  value={problemDesc}
                  onChange={(e) => setProblemDesc(e.target.value)}
                  placeholder="যেমন: ৩টি বস্তার মুখ আলগা থাকায় ২০ কেজি হলুদ পড়ে নষ্ট হয়েছে অথবা ট্রাকে অতিরিক্ত গরমে ফল ক্ষতিগ্রস্ত হয়েছে।"
                  className="w-full bg-white border border-stone-300 rounded-lg p-2 text-xs focus:ring-1 focus:ring-emerald-700"
                />
              </div>
            )}
          </div>

          {/* Step 3: Photo Proof Upload & Receiver Person */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Photos */}
            <div className="space-y-2">
              <label className="font-semibold text-stone-800 block text-xs">
                প্রমাণস্বরূপ পণ্যের ছবি (ঐচ্ছিক):
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSimulateAddPhoto}
                  className="px-3 py-2 rounded-lg border border-dashed border-stone-400 bg-stone-50 hover:bg-stone-100 text-stone-700 font-medium flex items-center gap-1.5 cursor-pointer text-xs"
                >
                  <Camera className="w-4 h-4 text-emerald-800" />
                  <span>ছবি যোগ করুন</span>
                </button>
                <span className="text-[11px] text-stone-500">
                  {samplePhotos.length} টি ছবি সংযুক্ত
                </span>
              </div>
              {samplePhotos.length > 0 && (
                <div className="flex items-center gap-2 overflow-x-auto pt-1">
                  {samplePhotos.map((url, i) => (
                    <img key={i} src={url} alt="Proof" className="w-12 h-12 rounded object-cover border border-stone-300" />
                  ))}
                </div>
              )}
            </div>

            {/* Receiver Name */}
            <div className="space-y-2">
              <label className="font-semibold text-stone-800 block text-xs">
                পণ্য গ্রহণকারী কর্মকর্তার নাম / পদবী:
              </label>
              <input
                type="text"
                required
                value={receivedBy}
                onChange={(e) => setReceivedBy(e.target.value)}
                placeholder="যেমন: তানভীর আহমেদ (গুদাম ইনচার্জ)"
                className="w-full border border-stone-300 rounded-lg p-2 focus:ring-1 focus:ring-emerald-700"
              />
            </div>

          </div>

          {/* Comments */}
          <div>
            <label className="font-semibold text-stone-800 block text-xs mb-1">
              ক্রেতার সাধারণ মন্তব্য / চালক ফিডব্যাক:
            </label>
            <input
              type="text"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="যেমন: ড্রাইভার যথাসময়ে পণ্য পৌঁছে দিয়েছে। প্যাকেজিং মানসম্মত ছিল।"
              className="w-full border border-stone-300 rounded-lg p-2 focus:ring-1 focus:ring-emerald-700"
            />
          </div>

          {/* Escrow & Ministry Guarantee Note */}
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950 flex items-start gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
            <div className="text-[11px] leading-relaxed">
              <strong>মন্ত্রণালয় এসক্রো নীতি:</strong> আপনার সন্তোষজনক GRN সাবমিশনের পরই বিক্রয় রেকর্ড চূড়ান্ত হবে। কোনো অমিল থাকলে 'ডিসপ্যুট বা অভিযোগ' এর আওতায় বিক্রেতা ও মন্ত্রণালয়ের সালিশ সেল স্বয়ংক্রিয়ভাবে সক্রিয় হবে।
            </div>
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
              <span>GRN নিশ্চিত করুন ও ছাড়পত্র দিন</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
