import React from 'react';
import { 
  X, 
  Truck, 
  Box, 
  FileText, 
  Navigation, 
  DollarSign, 
  AlertTriangle, 
  PackageCheck, 
  MapPin, 
  Phone, 
  Calendar, 
  CheckCircle2, 
  ShieldCheck, 
  Clock,
  Printer
} from 'lucide-react';
import { DeliveryItem } from '../../types';
import { DeliveryProgressTimeline } from './DeliveryProgressTimeline';

interface DeliveryDetailsModalProps {
  delivery: DeliveryItem;
  isOpen: boolean;
  onClose: () => void;
  onOpenPackaging: () => void;
  onOpenTransport: () => void;
  onOpenChallan: () => void;
  onOpenGRN: () => void;
  onOpenIssue: () => void;
  canEdit?: boolean;
  onAdvanceStage?: (deliveryId: string, nextStage: any, note: string, location: string) => void;
  onAddCheckpoint?: (deliveryId: string, location: string, statusText: string, note?: string) => void;
}

export const DeliveryDetailsModal: React.FC<DeliveryDetailsModalProps> = ({
  delivery,
  isOpen,
  onClose,
  onOpenPackaging,
  onOpenTransport,
  onOpenChallan,
  onOpenGRN,
  onOpenIssue,
  canEdit = true,
  onAdvanceStage,
  onAddCheckpoint
}) => {
  if (!isOpen) return null;

  const cost = delivery.costs;

  const getCostBearerLabel = (bearer: string) => {
    switch (bearer) {
      case 'buyer': return 'ক্রেতা বহন করবেন';
      case 'seller': return 'বিক্রেতা বহন করবেন';
      case 'shared': return 'উভয় পক্ষ যৌথভাবে (৫০-৫০)';
      default: return bearer;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[94vh] flex flex-col shadow-2xl border border-stone-200 animate-in fade-in">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-stone-100 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-900 text-amber-400 flex items-center justify-center shadow-xs">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-stone-900 text-base sm:text-lg">
                  ডেলিভারি চালান বিস্তারিত – {delivery.deliveryNumber}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  চালান: {delivery.challanNumber}
                </span>
                {delivery.isDelayed && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-300 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    বিলম্বিত
                  </span>
                )}
              </div>
              <p className="text-xs text-stone-500">
                অর্ডার নম্বর: <span className="font-mono font-bold text-emerald-900">{delivery.orderNumber}</span> · তৈরির তারিখ: {delivery.challanDate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenChallan}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold shadow-2xs cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>চালানপত্র দেখুন</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content Scroll Area */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 font-bengali text-xs">
          
          {/* Quick Action Toolbar (7 Actions required) */}
          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mr-1">
              লজিস্টিকস অ্যাকশন:
            </span>

            {canEdit && (
              <>
                <button
                  onClick={onOpenPackaging}
                  className="px-3 py-1.5 rounded-lg bg-white border border-stone-300 hover:border-emerald-700 hover:bg-emerald-50 text-stone-800 font-semibold flex items-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <Box className="w-3.5 h-3.5 text-emerald-800" />
                  <span>প্যাকেজিং আপডেট</span>
                </button>

                <button
                  onClick={onOpenTransport}
                  className="px-3 py-1.5 rounded-lg bg-white border border-stone-300 hover:border-emerald-700 hover:bg-emerald-50 text-stone-800 font-semibold flex items-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <Truck className="w-3.5 h-3.5 text-amber-700" />
                  <span>পরিবহন নির্ধারণ</span>
                </button>
              </>
            )}

            <button
              onClick={onOpenChallan}
              className="px-3 py-1.5 rounded-lg bg-white border border-stone-300 hover:border-emerald-700 hover:bg-emerald-50 text-stone-800 font-semibold flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-stone-600" />
              <span>ডেলিভারি চালান প্রিন্ট</span>
            </button>

            <button
              onClick={onOpenGRN}
              className={`px-3 py-1.5 rounded-lg border font-semibold flex items-center gap-1.5 shadow-2xs cursor-pointer ${
                delivery.grn 
                  ? 'bg-emerald-100 text-emerald-950 border-emerald-300' 
                  : 'bg-white border-stone-300 hover:border-emerald-700 hover:bg-emerald-50 text-stone-800'
              }`}
            >
              <PackageCheck className="w-3.5 h-3.5 text-emerald-800" />
              <span>{delivery.grn ? 'GRN প্রাপ্তি নোট দেখুন' : 'পণ্য প্রাপ্তি GRN নিশ্চিতকরণ'}</span>
            </button>

            <button
              onClick={onOpenIssue}
              className={`px-3 py-1.5 rounded-lg border font-semibold flex items-center gap-1.5 shadow-2xs cursor-pointer ${
                delivery.issue 
                  ? 'bg-rose-100 text-rose-950 border-rose-300' 
                  : 'bg-white border-stone-300 hover:border-rose-700 hover:bg-rose-50 text-rose-700'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
              <span>{delivery.issue ? 'অভিযোগ স্ট্যাটাস দেখুন' : 'সমস্যা / বিলম্ব রিপোর্ট'}</span>
            </button>
          </div>

          {/* Section 1: 9-Stage Visual Timeline with Manual Checkpoint Logging */}
          <DeliveryProgressTimeline
            delivery={delivery}
            canUpdate={canEdit}
            onAdvanceStage={onAdvanceStage}
            onAddCheckpoint={onAddCheckpoint}
          />

          {/* Section 2: 13 Displayed Fields in High-Density Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {/* Field 1 & 5: Product & Quantity */}
            <div className="p-4 rounded-xl border border-stone-200 bg-white space-y-2 shadow-2xs">
              <span className="font-bold text-stone-400 uppercase tracking-wide text-[10px] block">
                পণ্যের বিবরণ ও পরিমাণ
              </span>
              <div className="flex items-center gap-3">
                <img 
                  src={delivery.productImage} 
                  alt={delivery.productName} 
                  className="w-14 h-14 rounded-lg object-cover border border-stone-200" 
                />
                <div>
                  <h4 className="font-bold text-stone-900 text-xs sm:text-sm">{delivery.productName}</h4>
                  <div className="text-emerald-900 font-bold text-sm">
                    {delivery.quantity} {delivery.unit}
                  </div>
                  <div className="text-stone-500 text-[11px]">
                    {delivery.packaging.packageCount} টি {delivery.packaging.packagingType} ({delivery.packaging.weightPerPackage} কেজি/প্যাকেট)
                  </div>
                </div>
              </div>
            </div>

            {/* Field 3: Buyer Details */}
            <div className="p-4 rounded-xl border border-stone-200 bg-white space-y-2 shadow-2xs">
              <span className="font-bold text-stone-400 uppercase tracking-wide text-[10px] block">
                প্রাপক / ক্রেতার তথ্য
              </span>
              <div>
                <h4 className="font-bold text-stone-900 text-sm">{delivery.buyerName}</h4>
                <div className="text-stone-700 font-medium text-xs">{delivery.buyerCompany}</div>
                <div className="text-stone-600 text-[11px] flex items-center gap-1.5 mt-1">
                  <Phone className="w-3.5 h-3.5 text-stone-400" />
                  <span>{delivery.buyerPhone}</span>
                </div>
                <div className="text-stone-600 text-[11px] flex items-start gap-1.5 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                  <span>{delivery.deliveryAddress}</span>
                </div>
              </div>
            </div>

            {/* Field 4: Seller Details */}
            <div className="p-4 rounded-xl border border-stone-200 bg-white space-y-2 shadow-2xs">
              <span className="font-bold text-stone-400 uppercase tracking-wide text-[10px] block">
                প্রেরক / বিক্রেতার তথ্য
              </span>
              <div>
                <h4 className="font-bold text-stone-900 text-sm">{delivery.sellerName}</h4>
                <div className="text-stone-700 font-medium text-xs">{delivery.sellerCompany}</div>
                <div className="text-stone-600 text-[11px] flex items-center gap-1.5 mt-1">
                  <Phone className="w-3.5 h-3.5 text-stone-400" />
                  <span>{delivery.sellerPhone}</span>
                </div>
                <div className="text-stone-600 text-[11px] flex items-start gap-1.5 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                  <span>{delivery.pickupAddress}</span>
                </div>
              </div>
            </div>

            {/* Field 6 & 11: Transport & Vehicle Info */}
            <div className="p-4 rounded-xl border border-stone-200 bg-white space-y-2 shadow-2xs">
              <span className="font-bold text-stone-400 uppercase tracking-wide text-[10px] block">
                যানবাহন ও চালকের তথ্য
              </span>
              <div className="space-y-1">
                <div className="font-bold text-stone-900">{delivery.transport.providerName}</div>
                <div className="text-stone-700 font-medium">
                  {delivery.transport.vehicleType} · <span className="font-mono text-emerald-900 font-bold">{delivery.transport.vehicleNumber}</span>
                </div>
                <div className="text-stone-600 text-[11px]">
                  চালক: {delivery.transport.driverName} ({delivery.transport.driverPhone})
                </div>
                <div className="text-stone-500 text-[10px] pt-1">
                  লোডিং: {delivery.transport.pickupDateTime}
                </div>
              </div>
            </div>

            {/* Field 9: Schedule & Transit Time */}
            <div className="p-4 rounded-xl border border-stone-200 bg-white space-y-2 shadow-2xs">
              <span className="font-bold text-stone-400 uppercase tracking-wide text-[10px] block">
                ডেলিভারি শিডিউল ও সময়সীমা
              </span>
              <div className="space-y-1.5">
                <div>
                  <span className="text-stone-500 block text-[10px]">প্রত্যাশিত পৌঁছানোর তারিখ:</span>
                  <span className="font-bold text-stone-900 text-sm">{delivery.expectedDeliveryDate}</span>
                </div>
                <div>
                  <span className="text-stone-500 block text-[10px]">প্রত্যাশিত আগমন সময়:</span>
                  <span className="font-semibold text-emerald-800">{delivery.transport.expectedArrivalDateTime}</span>
                </div>
                {delivery.actualDeliveryDate && (
                  <div>
                    <span className="text-stone-500 block text-[10px]">প্রকৃত ডেলিভারি সময়:</span>
                    <span className="font-bold text-emerald-700">{delivery.actualDeliveryDate}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Field 13: Packaging Instructions & Cold Chain */}
            <div className="p-4 rounded-xl border border-stone-200 bg-white space-y-2 shadow-2xs">
              <span className="font-bold text-stone-400 uppercase tracking-wide text-[10px] block">
                প্যাকেজিং ও বিশেষ হ্যান্ডলিং
              </span>
              <div className="space-y-1">
                <div className="font-semibold text-stone-800">
                  ধরন: {delivery.packaging.packagingType} ({delivery.packaging.packageCount} টি প্যাকেট)
                </div>
                <p className="text-stone-600 text-[11px] leading-tight">
                  {delivery.packaging.packagingInstructions || 'ফুড গ্রেড প্যাকেজিং ও সিল সম্পন্ন।'}
                </p>
                {delivery.packaging.isPerishable && (
                  <div className="pt-1 text-rose-700 font-bold text-[10px]">
                    ❄ পচনশীল পণ্য (তাপমাত্রা: {delivery.packaging.storageTemperature || 'নিয়ন্ত্রিত'})
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Section 3: Delivery Cost Breakdown (§10) */}
          <div className="p-5 rounded-2xl border border-stone-200 bg-stone-50 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-stone-200 gap-2">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-800" />
                <h4 className="font-bold text-stone-900 text-sm">ডেলিভারি খরচ বিবরণ ও দায়িত্ব</h4>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-stone-600">খরচ বহনকারী:</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-950 font-bold border border-emerald-300">
                  {getCostBearerLabel(cost.costBearer)}
                </span>
                {cost.agreedWithParties && (
                  <span className="text-[10px] text-emerald-700 flex items-center gap-1 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" /> উভয় পক্ষের সম্মতি নিশ্চিত
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-1">
              <div className="p-3 bg-white rounded-xl border border-stone-200">
                <span className="text-stone-500 block text-[10px]">পরিবহন খরচ:</span>
                <span className="font-bold text-stone-900 text-sm">৳{cost.transportCost.toLocaleString('bn-BD')}</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-stone-200">
                <span className="text-stone-500 block text-[10px]">প্যাকেজিং খরচ:</span>
                <span className="font-bold text-stone-900 text-sm">৳{cost.packagingCost.toLocaleString('bn-BD')}</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-stone-200">
                <span className="text-stone-500 block text-[10px]">লোডিং ও আনলোডিং:</span>
                <span className="font-bold text-stone-900 text-sm">৳{cost.loadingUnloadingCost.toLocaleString('bn-BD')}</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-stone-200">
                <span className="text-stone-500 block text-[10px]">অন্যান্য আনুষঙ্গিক:</span>
                <span className="font-bold text-stone-900 text-sm">৳{cost.otherCost.toLocaleString('bn-BD')}</span>
              </div>
              <div className="p-3 bg-emerald-900 text-white rounded-xl">
                <span className="text-emerald-200 block text-[10px]">মোট ডেলিভারি খরচ:</span>
                <span className="font-bold text-amber-300 text-base">৳{cost.totalDeliveryCost.toLocaleString('bn-BD')}</span>
              </div>
            </div>
          </div>

          {/* Section 4: GRN Status Card if Completed or Partial */}
          {delivery.grn && (
            <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50/60 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-800" />
                  <span className="font-bold text-emerald-950 text-sm">
                    পণ্য প্রাপ্তির ডিজিটাল ছাড়পত্র (GRN: {delivery.grn.grnNumber})
                  </span>
                </div>
                <button
                  onClick={onOpenGRN}
                  className="text-xs font-bold text-emerald-800 hover:underline cursor-pointer"
                >
                  সম্পূর্ণ বিবরণ দেখুন
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-1">
                <div>
                  <span className="text-stone-500 block text-[10px]">গ্রহণকৃত পরিমাণ:</span>
                  <span className="font-bold text-emerald-950">{delivery.grn.receivedQuantity} {delivery.grn.unit}</span>
                </div>
                <div>
                  <span className="text-stone-500 block text-[10px]">ঘাটতি বা ক্ষতি:</span>
                  <span className="font-bold text-rose-800">{delivery.grn.shortageQuantity + delivery.grn.damagedQuantity} {delivery.grn.unit}</span>
                </div>
                <div>
                  <span className="text-stone-500 block text-[10px]">গ্রহণকারী কর্মকর্তা:</span>
                  <span className="font-semibold text-stone-800">{delivery.grn.receivedBy}</span>
                </div>
                <div>
                  <span className="text-stone-500 block text-[10px]">গ্রহণের তারিখ ও সময়:</span>
                  <span className="font-semibold text-stone-800">{delivery.grn.receiptDateTime}</span>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
