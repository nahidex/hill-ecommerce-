import React, { useRef } from 'react';
import { 
  Printer, 
  Download, 
  X, 
  Mountain, 
  ShieldCheck, 
  Truck, 
  FileText,
  AlertCircle
} from 'lucide-react';
import { DeliveryItem } from '../../types';

interface DeliveryChallanModalProps {
  delivery: DeliveryItem;
  isOpen: boolean;
  onClose: () => void;
}

export const DeliveryChallanModal: React.FC<DeliveryChallanModalProps> = ({
  delivery,
  isOpen,
  onClose
}) => {
  const printAreaRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-stone-200">
        
        {/* Modal Top Actions (Excluded from print) */}
        <div className="p-4 bg-stone-100 border-b border-stone-200 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-800" />
            <h3 className="font-bold text-stone-900 text-sm sm:text-base">
              অফিসিয়াল ডেলিভারি চালানপত্র – {delivery.challanNumber}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>চালান প্রিন্ট করুন</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Challan Content Area */}
        <div ref={printAreaRef} className="p-6 sm:p-10 overflow-y-auto font-bengali text-stone-900 space-y-6">
          
          {/* Challan Top Header with Ministry & Hill eCommerce Logos */}
          <div className="text-center border-b-2 border-emerald-900 pb-5 space-y-1 relative">
            <div className="flex items-center justify-between">
              {/* Ministry Seal Left */}
              <div className="text-left flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-emerald-900 text-amber-400 flex items-center justify-center font-bold text-sm">
                  <Mountain className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-emerald-950">পার্বত্য চট্টগ্রাম বিষয়ক মন্ত্রণালয়</div>
                  <div className="text-[9px] text-stone-600">গণপ্রজাতন্ত্রী বাংলাদেশ সরকার</div>
                </div>
              </div>

              {/* Title Center */}
              <div className="text-center">
                <div className="inline-block px-4 py-1 rounded-md bg-emerald-900 text-white font-bold text-base sm:text-lg tracking-wide uppercase">
                  ডেলিভারি চালানপত্র (DELIVERY CHALLAN)
                </div>
                <div className="text-[11px] text-stone-500 font-medium mt-1">
                  মূল কপি · পরিবহন ও পণ্য সরবরাহের ছাড়পত্র
                </div>
              </div>

              {/* Hill eCommerce Right */}
              <div className="text-right">
                <div className="font-brand font-bold text-base text-stone-900">
                  Hill <span className="text-amber-700">eCommerce</span>
                </div>
                <div className="text-[9px] text-emerald-800 font-semibold">ডিজিটাল পাইকারি মার্কেটপ্লেস হাব</div>
              </div>
            </div>
          </div>

          {/* Challan Metadata Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs">
            <div>
              <span className="text-stone-500 block text-[10px]">চালান নম্বর:</span>
              <span className="font-bold text-stone-950 text-sm font-mono">{delivery.challanNumber}</span>
            </div>
            <div>
              <span className="text-stone-500 block text-[10px]">চালানের তারিখ:</span>
              <span className="font-semibold text-stone-900">{delivery.challanDate}</span>
            </div>
            <div>
              <span className="text-stone-500 block text-[10px]">সংশ্লিষ্ট অর্ডার নম্বর:</span>
              <span className="font-bold text-emerald-900 font-mono">{delivery.orderNumber}</span>
            </div>
            <div>
              <span className="text-stone-500 block text-[10px]">ডেলিভারি ট্র্যাকিং আইডি:</span>
              <span className="font-bold text-stone-900 font-mono">{delivery.deliveryNumber}</span>
            </div>
          </div>

          {/* Sender & Receiver Dual Column Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Sender / Producer Info */}
            <div className="p-4 rounded-xl border border-stone-300 bg-stone-50/50 space-y-1.5 text-xs">
              <div className="font-bold text-emerald-950 text-xs uppercase tracking-wider pb-1 border-b border-stone-200 flex items-center justify-between">
                <span>১. প্রেরকের বিবরণ (SELLER / DISPATCHER)</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">ভেরিফাইড বিক্রেতা</span>
              </div>
              <div className="pt-1">
                <div className="font-bold text-stone-900 text-sm">{delivery.sellerName}</div>
                <div className="text-stone-700 font-medium">{delivery.sellerCompany}</div>
                <div className="text-stone-600 mt-1">উৎস/লোডিং পয়েন্ট: {delivery.pickupAddress}</div>
                <div className="text-stone-600">মোবাইল: {delivery.sellerPhone}</div>
              </div>
            </div>

            {/* Receiver / Buyer Info */}
            <div className="p-4 rounded-xl border border-stone-300 bg-stone-50/50 space-y-1.5 text-xs">
              <div className="font-bold text-emerald-950 text-xs uppercase tracking-wider pb-1 border-b border-stone-200 flex items-center justify-between">
                <span>২. প্রাপকের বিবরণ (BUYER / CONSIGNEE)</span>
                <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">নিবন্ধিত ক্রেতা</span>
              </div>
              <div className="pt-1">
                <div className="font-bold text-stone-900 text-sm">{delivery.buyerName}</div>
                <div className="text-stone-700 font-medium">{delivery.buyerCompany}</div>
                <div className="text-stone-600 mt-1">গন্তব্য/ডেলিভারি ঠিকানা: {delivery.deliveryAddress}</div>
                <div className="text-stone-600">মোবাইল: {delivery.buyerPhone}</div>
              </div>
            </div>

          </div>

          {/* Transport Details Block */}
          <div className="p-4 rounded-xl border border-stone-300 bg-amber-50/30 text-xs space-y-2">
            <div className="font-bold text-stone-900 flex items-center gap-2 pb-1 border-b border-amber-200">
              <Truck className="w-4 h-4 text-amber-700" />
              <span>৩. পরিবহন ও যানবাহনের বিবরণ (TRANSPORT & CARRIER DETAILS)</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              <div>
                <span className="text-stone-500 block text-[10px]">পরিবহন সংস্থা:</span>
                <span className="font-bold text-stone-800">{delivery.transport.providerName}</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[10px]">যানবাহনের ধরন ও নম্বর:</span>
                <span className="font-bold text-stone-900">{delivery.transport.vehicleType} · {delivery.transport.vehicleNumber}</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[10px]">চালকের নাম ও ফোন:</span>
                <span className="font-semibold text-stone-800">{delivery.transport.driverName} ({delivery.transport.driverPhone})</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[10px]">লোডিং সময়:</span>
                <span className="font-semibold text-stone-800">{delivery.transport.pickupDateTime}</span>
              </div>
            </div>
          </div>

          {/* Product Items Table */}
          <div className="border border-stone-300 rounded-xl overflow-hidden text-xs">
            <div className="bg-stone-100 px-4 py-2 font-bold text-stone-900 border-b border-stone-300">
              ৪. প্রেরিত পণ্যের তালিকা ও স্পেসিফিকেশন (DISPATCHED ITEMS LIST)
            </div>
            <table className="w-full text-left">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-700 text-[11px]">
                <tr>
                  <th className="p-3">ক্রমিক</th>
                  <th className="p-3">পণ্যের বিবরণ</th>
                  <th className="p-3">প্যাকেজিং ধরন</th>
                  <th className="p-3 text-center">প্যাকেটের সংখ্যা</th>
                  <th className="p-3 text-right">প্রতি প্যাকেট ওজন</th>
                  <th className="p-3 text-right">মোট পরিমাণ / নিট ওজন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 font-medium">
                <tr>
                  <td className="p-3 text-stone-500">০১</td>
                  <td className="p-3">
                    <div className="font-bold text-stone-900">{delivery.productName}</div>
                    <div className="text-[10px] text-stone-500">আইডি: {delivery.productId}</div>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-stone-100 border border-stone-300 text-stone-800 text-[11px]">
                      {delivery.packaging.packagingType}
                    </span>
                  </td>
                  <td className="p-3 text-center font-bold text-stone-900">
                    {delivery.packaging.packageCount} টি
                  </td>
                  <td className="p-3 text-right text-stone-800">
                    {delivery.packaging.weightPerPackage} কেজি
                  </td>
                  <td className="p-3 text-right font-bold text-emerald-950 text-sm">
                    {delivery.quantity} {delivery.unit}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Instructions & Quality Certification */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl border border-stone-200 bg-stone-50 space-y-1">
              <span className="font-bold text-stone-800 block text-[11px]">প্যাকেজিং ও বিশেষ হ্যান্ডলিং নির্দেশনা:</span>
              <p className="text-stone-600 text-[11px] leading-relaxed">
                {delivery.packaging.packagingInstructions || 'ফুড গ্রেড প্যাকেজিং সম্পন্ন। আর্দ্রতারোধী স্থানে রাখুন।'}
              </p>
              {delivery.packaging.isPerishable && (
                <div className="text-rose-700 font-bold text-[10px] flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>পচনশীল পণ্য: তাপমাত্রা {delivery.packaging.storageTemperature || 'নিয়ন্ত্রিত'} বজায় রাখুন।</span>
                </div>
              )}
            </div>

            <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-1">
              <span className="font-bold text-emerald-900 block text-[11px]">মন্ত্রণালয়ের সুরক্ষা ও সততা সনদ:</span>
              <p className="text-stone-600 text-[11px] leading-relaxed">
                পার্বত্য চট্টগ্রাম বিষয়ক মন্ত্রণালয়ের ডিজিটাল ফ্রেমওয়ার্কের আওতায় পণ্যটি লোড ও প্রেরিত হয়েছে। কোনো ব্যত্যয় দেখা দিলে ৭২ ঘণ্টার মধ্যে অভিযোগ দাখিলযোগ্য।
              </p>
            </div>
          </div>

          {/* Signatures & Seal Section */}
          <div className="pt-10 border-t-2 border-dashed border-stone-300">
            <div className="grid grid-cols-3 gap-6 text-center text-xs">
              
              {/* Sender Signature */}
              <div className="space-y-6">
                <div className="h-12 flex items-end justify-center">
                  <span className="font-serif italic text-emerald-900 text-sm border-b border-stone-400 px-4">
                    {delivery.sellerName}
                  </span>
                </div>
                <div>
                  <div className="font-bold text-stone-900">প্রেরক / বিক্রেতার স্বাক্ষর ও সিল</div>
                  <div className="text-[10px] text-stone-500">তারিখ: {delivery.challanDate}</div>
                </div>
              </div>

              {/* Carrier Signature */}
              <div className="space-y-6">
                <div className="h-12 flex items-end justify-center">
                  <span className="font-serif italic text-stone-800 text-sm border-b border-stone-400 px-4">
                    {delivery.transport.driverName}
                  </span>
                </div>
                <div>
                  <div className="font-bold text-stone-900">পরিবহনকারী / চালকের স্বাক্ষর</div>
                  <div className="text-[10px] text-stone-500">আইডি: {delivery.transport.vehicleNumber}</div>
                </div>
              </div>

              {/* Receiver Signature (Blank for physical or digital GRN stamp) */}
              <div className="space-y-6">
                <div className="h-12 flex items-end justify-center">
                  {delivery.grn ? (
                    <span className="font-bold text-emerald-700 border-2 border-emerald-600 px-3 py-1 rounded text-xs uppercase">
                      ডিজিটাল GRN গৃহীত
                    </span>
                  ) : (
                    <div className="w-36 border-b border-stone-400 mx-auto"></div>
                  )}
                </div>
                <div>
                  <div className="font-bold text-stone-900">প্রাপক / ক্রেতার স্বাক্ষর ও সিল</div>
                  <div className="text-[10px] text-stone-500">প্রাপ্তি নিশ্চিতকরণের সময়</div>
                </div>
              </div>

            </div>
          </div>

          {/* Footer declaration */}
          <div className="text-center text-[10px] text-stone-400 pt-4 border-t border-stone-200">
            ইলেক্ট্রনিক চালানপত্র · Hill eCommerce · পার্বত্য চট্টগ্রাম বিষয়ক মন্ত্রণালয় · হেল্পলাইন: ১৬১২৩
          </div>

        </div>

      </div>
    </div>
  );
};
