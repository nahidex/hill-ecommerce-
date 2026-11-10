import React, { useState } from 'react';
import { 
  Truck, 
  Package, 
  MapPin, 
  Phone, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  PackageCheck, 
  Printer, 
  Eye, 
  Search, 
  ShieldCheck,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { DeliveryItem } from '../../types';
import { DeliveryProgressTimeline } from './DeliveryProgressTimeline';
import { DeliveryChallanModal } from './DeliveryChallanModal';
import { GoodsReceivedModal } from './GoodsReceivedModal';
import { DeliveryIssueModal } from './DeliveryIssueModal';

interface BuyerDeliveryModuleProps {
  deliveries: DeliveryItem[];
  onSubmitGRN: (deliveryId: string, grnData: any) => void;
  onSubmitIssue: (deliveryId: string, issueData: any) => void;
  onResolveIssue: (deliveryId: string, resolutionNote: string) => void;
}

export const BuyerDeliveryModule: React.FC<BuyerDeliveryModuleProps> = ({
  deliveries,
  onSubmitGRN,
  onSubmitIssue,
  onResolveIssue
}) => {
  const [selectedDeliveryId, setSelectedDeliveryId] = useState<string>(
    deliveries[0]?.id || ''
  );
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [isChallanOpen, setIsChallanOpen] = useState(false);
  const [isGRNOpen, setIsGRNOpen] = useState(false);
  const [isIssueOpen, setIsIssueOpen] = useState(false);

  const selectedDelivery = deliveries.find(d => d.id === selectedDeliveryId) || deliveries[0];

  const filteredList = deliveries.filter(d => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        d.orderNumber.toLowerCase().includes(q) ||
        d.challanNumber.toLowerCase().includes(q) ||
        d.productName.toLowerCase().includes(q) ||
        d.sellerName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 font-bengali">
      
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950 via-emerald-900 to-stone-900 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-stone-950 uppercase tracking-wider">
              পাইকারি ক্রেতা লজিস্টিকস পোর্টাল
            </span>
            <span className="text-emerald-300 text-xs">পার্বত্য চট্টগ্রাম বিষয়ক মন্ত্রণালয়</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold">আমার পণ্য সরবরাহ ও লাইভ ট্র্যাকিং</h2>
          <p className="text-xs sm:text-sm text-stone-300">
            আপনার অর্ডারকৃত পাহাড়ি পণ্যের লোডিং, পরিবহন চেকপোস্ট, চালকের যোগাযোগ এবং ডিজিটাল GRN প্রাপ্তি নিশ্চিতকরণ।
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="p-3 rounded-xl bg-white/10 border border-white/20 text-center">
            <span className="text-[10px] text-emerald-200 block">মোট সক্রিয় ডেলিভারি</span>
            <span className="text-lg font-bold text-amber-300">{deliveries.length} টি</span>
          </div>
        </div>
      </div>

      {/* Main Two-Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Order & Delivery List (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          
          <div className="bg-white p-3.5 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-stone-900 text-xs uppercase tracking-wide">
                চালান ও অর্ডার তালিকা ({filteredList.length})
              </span>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="চালান বা পণ্য খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:ring-1 focus:ring-emerald-700"
              />
            </div>
          </div>

          <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
            {filteredList.map((del) => {
              const isSelected = selectedDelivery?.id === del.id;
              return (
                <div
                  key={del.id}
                  onClick={() => setSelectedDeliveryId(del.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-xs space-y-2 ${
                    isSelected
                      ? 'bg-emerald-50/80 border-emerald-800 shadow-xs ring-1 ring-emerald-800/30'
                      : 'bg-white border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-mono font-bold text-emerald-950 text-xs">
                        {del.challanNumber}
                      </div>
                      <div className="font-bold text-stone-900 text-sm mt-0.5">
                        {del.productName}
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                      del.stage === 'delivered'
                        ? 'bg-emerald-100 text-emerald-800'
                        : del.isDelayed
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                    }`}>
                      {del.stage === 'delivered' ? 'পৌঁছেছে' : del.isDelayed ? 'বিলম্বিত' : 'ট্রানজিটে'}
                    </span>
                  </div>

                  <div className="text-[11px] text-stone-600 flex items-center justify-between">
                    <span>পরিমাণ: <strong>{del.quantity} {del.unit}</strong></span>
                    <span>প্রেরক: {del.sellerName}</span>
                  </div>

                  <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between text-[10px] text-stone-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-stone-400" />
                      <span className="truncate max-w-[140px]">{del.currentLocation}</span>
                    </span>
                    <span className="font-semibold text-emerald-900">
                      ধাপ {del.stageNumber}/৯
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Right Side: Detailed Delivery Tracker & Driver Info (8 cols) */}
        {selectedDelivery ? (
          <div className="lg:col-span-8 space-y-5">
            
            {/* Top Selected Card Action Strip */}
            <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-emerald-900 text-sm">{selectedDelivery.challanNumber}</span>
                  <span className="text-stone-300">·</span>
                  <span className="font-mono text-stone-500 text-xs">{selectedDelivery.orderNumber}</span>
                  {selectedDelivery.isDelayed && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold border border-rose-300">
                      বিলম্বিত
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-stone-900 text-base mt-0.5">
                  {selectedDelivery.productName} ({selectedDelivery.quantity} {selectedDelivery.unit})
                </h3>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setIsChallanOpen(true)}
                  className="px-3 py-1.5 rounded-lg border border-stone-300 bg-white hover:bg-stone-50 text-stone-800 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <FileText className="w-3.5 h-3.5 text-emerald-800" />
                  <span>চালানপত্র দেখুন</span>
                </button>

                <button
                  onClick={() => setIsGRNOpen(true)}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <PackageCheck className="w-3.5 h-3.5 text-amber-300" />
                  <span>{selectedDelivery.grn ? 'GRN ছাড়পত্র দেখুন' : 'পণ্য প্রাপ্তি GRN নিশ্চিত করুন'}</span>
                </button>

                <button
                  onClick={() => setIsIssueOpen(true)}
                  className="px-3 py-1.5 rounded-lg border border-rose-300 bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-700" />
                  <span>{selectedDelivery.issue ? 'অভিযোগ স্ট্যাটাস' : 'সমস্যা রিপোর্ট'}</span>
                </button>
              </div>
            </div>

            {/* 9-Stage Visual Progress Timeline */}
            <DeliveryProgressTimeline
              delivery={selectedDelivery}
              canUpdate={false}
            />

            {/* Transport, Driver & Destination Information Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Transport Carrier & Driver Call Card */}
              <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3 text-xs">
                <div className="font-bold text-stone-900 flex items-center gap-2 pb-2 border-b border-stone-200">
                  <Truck className="w-4 h-4 text-emerald-800" />
                  <span>পরিবহন ও চালকের সরাসরি যোগাযোগ</span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-stone-500">পরিবহন সংস্থা:</span>
                    <span className="font-bold text-stone-900">{selectedDelivery.transport.providerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">গাড়ির ধরন ও নম্বর:</span>
                    <span className="font-bold text-stone-900">
                      {selectedDelivery.transport.vehicleType} · {selectedDelivery.transport.vehicleNumber}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">চালকের নাম:</span>
                    <span className="font-semibold text-stone-800">{selectedDelivery.transport.driverName}</span>
                  </div>
                </div>

                {/* Direct Driver Contact Phone Button */}
                <div className="pt-2 border-t border-stone-100">
                  <a
                    href={`tel:${selectedDelivery.transport.driverPhone}`}
                    className="w-full py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-950 font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Phone className="w-4 h-4 text-emerald-800" />
                    <span>চালককে কল করুন: {selectedDelivery.transport.driverPhone}</span>
                  </a>
                </div>
              </div>

              {/* Delivery Schedule & Address Card */}
              <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3 text-xs">
                <div className="font-bold text-stone-900 flex items-center gap-2 pb-2 border-b border-stone-200">
                  <MapPin className="w-4 h-4 text-emerald-800" />
                  <span>গন্তব্য ও প্রত্যাশিত পৌঁছানোর সময়</span>
                </div>

                <div className="space-y-2">
                  <div>
                    <span className="text-stone-500 block text-[10px]">আপনার ডেলিভারি গুদাম / আড়ত:</span>
                    <span className="font-semibold text-stone-800">{selectedDelivery.deliveryAddress}</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-stone-500">প্রত্যাশিত পৌঁছানোর সময়:</span>
                    <span className="font-bold text-emerald-950">{selectedDelivery.transport.expectedArrivalDateTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">প্যাকেজিং ধরন:</span>
                    <span className="font-medium text-stone-800">
                      {selectedDelivery.packaging.packageCount} টি {selectedDelivery.packaging.packagingType} ({selectedDelivery.packaging.totalWeight} কেজি)
                    </span>
                  </div>
                </div>

                {/* Ministry Escrow Banner */}
                <div className="pt-2 border-t border-stone-100 flex items-center gap-2 text-[10px] text-stone-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>পণ্য বুঝে পেয়ে সন্তোষজনক GRN প্রদান না করা পর্যন্ত অর্থ ছাড় হবে না।</span>
                </div>
              </div>

            </div>

            {/* GRN Status Card if submitted */}
            {selectedDelivery.grn && (
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-300 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-950 text-sm flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-800" />
                    পণ্য প্রাপ্তি GRN ছাড়পত্র সম্পন্ন (নম্বর: {selectedDelivery.grn.grnNumber})
                  </span>
                  <button
                    onClick={() => setIsGRNOpen(true)}
                    className="font-bold text-emerald-800 hover:underline cursor-pointer"
                  >
                    সম্পূর্ণ বিবরণ দেখুন
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  <div>
                    <span className="text-stone-500 block text-[10px]">গ্রহণকৃত পরিমাণ:</span>
                    <span className="font-bold text-emerald-950">{selectedDelivery.grn.receivedQuantity} {selectedDelivery.grn.unit}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[10px]">গ্রহণের তারিখ ও সময়:</span>
                    <span className="font-semibold text-stone-800">{selectedDelivery.grn.receiptDateTime}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[10px]">রিসিভ করেছেন:</span>
                    <span className="font-semibold text-stone-800">{selectedDelivery.grn.receivedBy}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[10px]">স্ট্যাটাস:</span>
                    <span className="font-bold text-emerald-700">যাচাইকৃত ও অনুমোদিত</span>
                  </div>
                </div>
              </div>
            )}

          </div>
        ) : (
          <div className="lg:col-span-8 p-12 text-center text-stone-400 bg-white rounded-2xl border border-stone-200">
            কোনো ডেলিভারি চালান পাওয়া যায়নি।
          </div>
        )}

      </div>

      {/* Modals */}
      {selectedDelivery && (
        <>
          <DeliveryChallanModal
            delivery={selectedDelivery}
            isOpen={isChallanOpen}
            onClose={() => setIsChallanOpen(false)}
          />

          <GoodsReceivedModal
            delivery={selectedDelivery}
            isOpen={isGRNOpen}
            onClose={() => setIsGRNOpen(false)}
            onSubmitGRN={onSubmitGRN}
          />

          <DeliveryIssueModal
            delivery={selectedDelivery}
            isOpen={isIssueOpen}
            onClose={() => setIsIssueOpen(false)}
            onSubmitIssue={onSubmitIssue}
            onResolveIssue={onResolveIssue}
            currentUserRole="buyer"
          />
        </>
      )}

    </div>
  );
};
