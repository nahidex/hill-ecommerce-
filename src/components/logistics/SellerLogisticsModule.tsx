import React, { useState } from 'react';
import { 
  Truck, 
  Package, 
  Box, 
  Clock, 
  Navigation, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Search, 
  Filter, 
  FileText, 
  Printer, 
  Eye, 
  BarChart3, 
  PlusCircle, 
  Calendar, 
  MapPin, 
  Layers,
  ArrowRight
} from 'lucide-react';
import { DeliveryItem, DeliveryStageKey } from '../../types';
import { DeliveryDetailsModal } from './DeliveryDetailsModal';
import { DeliveryChallanModal } from './DeliveryChallanModal';
import { PackagingManagementModal } from './PackagingManagementModal';
import { TransportAssignModal } from './TransportAssignModal';
import { DeliveryIssueModal } from './DeliveryIssueModal';
import { GoodsReceivedModal } from './GoodsReceivedModal';
import { LogisticsReportsModal } from './LogisticsReportsModal';

interface SellerLogisticsModuleProps {
  deliveries: DeliveryItem[];
  onUpdatePackaging: (deliveryId: string, packagingData: any) => void;
  onAssignTransport: (deliveryId: string, transportData: any) => void;
  onAdvanceStage: (deliveryId: string, nextStage: DeliveryStageKey, note: string, location: string) => void;
  onAddCheckpoint: (deliveryId: string, location: string, statusText: string, note?: string) => void;
  onSubmitGRN: (deliveryId: string, grnData: any) => void;
  onSubmitIssue: (deliveryId: string, issueData: any) => void;
  onResolveIssue: (deliveryId: string, resolutionNote: string) => void;
}

export const SellerLogisticsModule: React.FC<SellerLogisticsModuleProps> = ({
  deliveries,
  onUpdatePackaging,
  onAssignTransport,
  onAdvanceStage,
  onAddCheckpoint,
  onSubmitGRN,
  onSubmitIssue,
  onResolveIssue
}) => {
  const [activeFilterTab, setActiveFilterTab] = useState<'all' | 'preparing' | 'packaging_completed' | 'in_transit' | 'delivered' | 'delayed'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Active Modals
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryItem | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isChallanOpen, setIsChallanOpen] = useState(false);
  const [isPackagingOpen, setIsPackagingOpen] = useState(false);
  const [isTransportOpen, setIsTransportOpen] = useState(false);
  const [isIssueOpen, setIsIssueOpen] = useState(false);
  const [isGRNOpen, setIsGRNOpen] = useState(false);
  const [isReportsOpen, setIsReportsOpen] = useState(false);

  // 8 Summary Cards Calculations (§2)
  const totalDeliverable = deliveries.length;
  const preparingCount = deliveries.filter(d => d.stage === 'order_confirmed' || d.stage === 'preparing').length;
  const packagingCompletedCount = deliveries.filter(d => d.stage === 'packaging_completed').length;
  const readyForTransportCount = deliveries.filter(d => d.stage === 'ready_for_transport').length;
  const inTransitCount = deliveries.filter(d => ['picked_up', 'in_transit', 'arrived_hub', 'out_for_delivery'].includes(d.stage)).length;
  const deliveredCount = deliveries.filter(d => d.stage === 'delivered').length;
  const delayedCount = deliveries.filter(d => d.isDelayed).length;
  const cancelledCount = deliveries.filter(d => d.stage === 'cancelled').length;

  // Filter deliveries
  const filteredDeliveries = deliveries.filter(d => {
    if (activeFilterTab === 'preparing' && !(d.stage === 'order_confirmed' || d.stage === 'preparing')) return false;
    if (activeFilterTab === 'packaging_completed' && d.stage !== 'packaging_completed') return false;
    if (activeFilterTab === 'in_transit' && !['picked_up', 'in_transit', 'arrived_hub', 'out_for_delivery'].includes(d.stage)) return false;
    if (activeFilterTab === 'delivered' && d.stage !== 'delivered') return false;
    if (activeFilterTab === 'delayed' && !d.isDelayed) return false;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        d.challanNumber.toLowerCase().includes(q) ||
        d.orderNumber.toLowerCase().includes(q) ||
        d.productName.toLowerCase().includes(q) ||
        d.buyerName.toLowerCase().includes(q) ||
        d.transport.driverName.toLowerCase().includes(q) ||
        d.transport.vehicleNumber.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const openDetailsFor = (delivery: DeliveryItem) => {
    setSelectedDelivery(delivery);
    setIsDetailsOpen(true);
  };

  const openChallanFor = (delivery: DeliveryItem) => {
    setSelectedDelivery(delivery);
    setIsChallanOpen(true);
  };

  const openPackagingFor = (delivery: DeliveryItem) => {
    setSelectedDelivery(delivery);
    setIsPackagingOpen(true);
  };

  const openTransportFor = (delivery: DeliveryItem) => {
    setSelectedDelivery(delivery);
    setIsTransportOpen(true);
  };

  const openIssueFor = (delivery: DeliveryItem) => {
    setSelectedDelivery(delivery);
    setIsIssueOpen(true);
  };

  const openGRNFor = (delivery: DeliveryItem) => {
    setSelectedDelivery(delivery);
    setIsGRNOpen(true);
  };

  return (
    <div className="space-y-6 font-bengali">
      
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 flex items-center gap-2">
            <Truck className="w-6 h-6 text-emerald-800" />
            <span>লজিস্টিকস ও পণ্য সরবরাহ ব্যবস্থাপনা</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
            নিশ্চিত অর্ডারের প্যাকেজিং, পাহাড়ি যানবাহন নির্ধারণ, চালানপত্র তৈরি ও রুট ট্র্যাকিং
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsReportsOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-white border border-stone-300 hover:bg-stone-50 text-stone-800 text-xs font-bold flex items-center gap-2 shadow-2xs cursor-pointer"
          >
            <BarChart3 className="w-4 h-4 text-emerald-800" />
            <span>ডেলিভারি রিপোর্ট ও হিসাব</span>
          </button>
        </div>
      </div>

      {/* 8 Summary Cards Grid (§2) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {/* 1. মোট সরবরাহযোগ্য */}
        <div className="p-3 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-1">
          <div className="text-[10px] text-stone-500 font-semibold leading-tight">মোট সরবরাহযোগ্য</div>
          <div className="font-bold text-lg text-stone-900">{totalDeliverable}</div>
          <div className="text-[9px] text-stone-400">নিশ্চিত চালান</div>
        </div>

        {/* 2. প্রস্তুত হচ্ছে */}
        <div className="p-3 bg-white rounded-xl border border-amber-200 shadow-2xs space-y-1">
          <div className="text-[10px] text-amber-800 font-semibold leading-tight">পণ্য প্রস্তুত হচ্ছে</div>
          <div className="font-bold text-lg text-amber-700">{preparingCount}</div>
          <div className="text-[9px] text-amber-600">বাগান/ফার্মে সংগ্রহ</div>
        </div>

        {/* 3. প্যাকেজিং সম্পন্ন */}
        <div className="p-3 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-1">
          <div className="text-[10px] text-stone-500 font-semibold leading-tight">প্যাকেজিং সম্পন্ন</div>
          <div className="font-bold text-lg text-stone-900">{packagingCompletedCount}</div>
          <div className="text-[9px] text-stone-400">সিলগালা ও লেবেল</div>
        </div>

        {/* 4. পরিবহনের অপেক্ষায় */}
        <div className="p-3 bg-white rounded-xl border border-blue-200 shadow-2xs space-y-1">
          <div className="text-[10px] text-blue-800 font-semibold leading-tight">পরিবহনের অপেক্ষায়</div>
          <div className="font-bold text-lg text-blue-700">{readyForTransportCount}</div>
          <div className="text-[9px] text-blue-600">ডিপোতে লোডিং</div>
        </div>

        {/* 5. পথে রয়েছে */}
        <div className="p-3 bg-white rounded-xl border border-amber-200 shadow-2xs space-y-1">
          <div className="text-[10px] text-amber-800 font-semibold leading-tight">পথে রয়েছে</div>
          <div className="font-bold text-lg text-amber-700">{inTransitCount}</div>
          <div className="text-[9px] text-amber-600">মহাসড়ক ট্রানজিটে</div>
        </div>

        {/* 6. ডেলিভারি সম্পন্ন */}
        <div className="p-3 bg-white rounded-xl border border-emerald-200 shadow-2xs space-y-1">
          <div className="text-[10px] text-emerald-800 font-semibold leading-tight">ডেলিভারি সম্পন্ন</div>
          <div className="font-bold text-lg text-emerald-800">{deliveredCount}</div>
          <div className="text-[9px] text-emerald-600">GRN অনুমোদিত</div>
        </div>

        {/* 7. বিলম্বিত ডেলিভারি */}
        <div className="p-3 bg-white rounded-xl border border-rose-200 shadow-2xs space-y-1">
          <div className="text-[10px] text-rose-800 font-semibold leading-tight">বিলম্বিত ডেলিভারি</div>
          <div className="font-bold text-lg text-rose-700">{delayedCount}</div>
          <div className="text-[9px] text-rose-600">বৃষ্টি/যানজট সতর্কতা</div>
        </div>

        {/* 8. বাতিলকৃত চালান */}
        <div className="p-3 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-1">
          <div className="text-[10px] text-stone-500 font-semibold leading-tight">বাতিলকৃত চালান</div>
          <div className="font-bold text-lg text-stone-600">{cancelledCount}</div>
          <div className="text-[9px] text-stone-400">স্থগিত চালান</div>
        </div>
      </div>

      {/* Mid Level Two Columns: Recent Activities & Upcoming Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Left 2 Cols: Upcoming Delivery Schedules */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-stone-200">
            <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-800" />
              <span>আসন্ন ডেলিভারি শিডিউল ও অগ্রাধিকার</span>
            </h3>
            <span className="text-xs text-stone-500">চলতি সপ্তাহ</span>
          </div>

          <div className="space-y-3">
            {deliveries.slice(0, 3).map((del) => (
              <div 
                key={del.id}
                className="p-3.5 rounded-xl border border-stone-200 hover:border-emerald-700 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-stone-50/50"
              >
                <div className="flex items-center gap-3">
                  <img src={del.productImage} alt={del.productName} className="w-12 h-12 rounded-lg object-cover border border-stone-200 shrink-0" />
                  <div>
                    <div className="font-bold text-stone-900 text-xs sm:text-sm">{del.productName}</div>
                    <div className="text-[11px] text-emerald-900 font-semibold">
                      পরিমাণ: {del.quantity} {del.unit} · ক্রেতা: {del.buyerCompany}
                    </div>
                    <div className="text-[10px] text-stone-500 flex items-center gap-2 mt-0.5">
                      <span>গন্তব্য: {del.deliveryAddress}</span>
                      <span>·</span>
                      <span className="font-medium text-amber-800">প্রত্যাশিত: {del.expectedDeliveryDate}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    del.stage === 'delivered' 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : del.isDelayed 
                        ? 'bg-rose-100 text-rose-800' 
                        : 'bg-amber-100 text-amber-800'
                  }`}>
                    {del.stage === 'delivered' ? 'সম্পন্ন' : del.isDelayed ? 'বিলম্বিত' : 'ট্রানজিটে'}
                  </span>
                  <button
                    onClick={() => openDetailsFor(del)}
                    className="px-2.5 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <span>ট্র্যাক করুন</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Recent Delivery Activity Log */}
        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-stone-200">
            <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-800" />
              <span>সাম্প্রতিক লজিস্টিকস কার্যক্রম</span>
            </h3>
          </div>

          <div className="space-y-3 max-h-72 overflow-y-auto pr-1 text-xs">
            {deliveries.flatMap(d => d.history.slice(-1).map(h => ({ ...h, challanNumber: d.challanNumber }))).map((act, i) => (
              <div key={i} className="p-2.5 rounded-lg bg-stone-50 border border-stone-200 space-y-1">
                <div className="flex items-center justify-between text-[10px] text-stone-500">
                  <span className="font-mono font-bold text-emerald-900">{act.challanNumber}</span>
                  <span>{act.timestamp}</span>
                </div>
                <div className="font-bold text-stone-800">{act.title}</div>
                <div className="text-[11px] text-stone-600 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-stone-400" />
                  <span>{act.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Delivery Order Management Table Section (§3) */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xs overflow-hidden">
        
        {/* Table Filter Tabs & Search Bar */}
        <div className="p-4 bg-stone-50 border-b border-stone-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 max-w-full text-xs">
            {[
              { id: 'all', label: 'সব চালান' },
              { id: 'preparing', label: 'প্রস্তুত হচ্ছে' },
              { id: 'packaging_completed', label: 'প্যাকেজিং সম্পন্ন' },
              { id: 'in_transit', label: 'পথে রয়েছে' },
              { id: 'delivered', label: 'ডেলিভারি সম্পন্ন' },
              { id: 'delayed', label: 'বিলম্বিত' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilterTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg font-semibold shrink-0 cursor-pointer transition-colors ${
                  activeFilterTab === tab.id
                    ? 'bg-emerald-900 text-white shadow-2xs'
                    : 'text-stone-600 hover:bg-stone-200 hover:text-stone-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="চালান, অর্ডার, ক্রেতা বা গাড়ি নম্বর..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg w-full md:w-64 focus:ring-1 focus:ring-emerald-700"
            />
          </div>

        </div>

        {/* Deliveries Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 text-[11px]">
              <tr>
                <th className="p-3">চালান ও অর্ডার নম্বর</th>
                <th className="p-3">পণ্য ও পরিমাণ</th>
                <th className="p-3">ক্রেতা ও গন্তব্য</th>
                <th className="p-3">প্যাকেজিং তথ্য</th>
                <th className="p-3">পরিবহন ক্যারিয়ার</th>
                <th className="p-3">বর্তমান পর্যায়</th>
                <th className="p-3 text-right">কার্যক্রম (অ্যাকশন)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {filteredDeliveries.map((del) => (
                <tr key={del.id} className="hover:bg-stone-50/50">
                  
                  {/* Challan & Order */}
                  <td className="p-3">
                    <div className="font-bold text-stone-900 font-mono">{del.challanNumber}</div>
                    <div className="text-[10px] text-stone-500 font-mono">{del.orderNumber}</div>
                    <div className="text-[10px] text-stone-400">{del.challanDate}</div>
                  </td>

                  {/* Product & Qty */}
                  <td className="p-3">
                    <div className="font-bold text-stone-900">{del.productName}</div>
                    <div className="text-[11px] text-emerald-800 font-bold">
                      {del.quantity} {del.unit}
                    </div>
                    {del.packaging.isPerishable && (
                      <span className="text-[9px] bg-rose-100 text-rose-800 px-1 py-0.2 rounded font-bold">
                        পচনশীল
                      </span>
                    )}
                  </td>

                  {/* Buyer & Address */}
                  <td className="p-3">
                    <div className="font-semibold text-stone-800">{del.buyerName}</div>
                    <div className="text-stone-600 text-[11px]">{del.buyerCompany}</div>
                    <div className="text-[10px] text-stone-400 truncate max-w-[150px]">{del.deliveryAddress}</div>
                  </td>

                  {/* Packaging */}
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-stone-100 border border-stone-200 font-medium text-stone-800">
                      {del.packaging.packageCount} টি {del.packaging.packagingType}
                    </span>
                    <div className="text-[10px] text-stone-500 mt-0.5">
                      ওজন: {del.packaging.totalWeight} কেজি
                    </div>
                  </td>

                  {/* Transport */}
                  <td className="p-3">
                    <div className="font-semibold text-stone-800">{del.transport.providerName}</div>
                    <div className="text-[10px] text-stone-500 font-mono">
                      {del.transport.vehicleNumber} ({del.transport.driverName})
                    </div>
                  </td>

                  {/* Stage */}
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      del.stage === 'delivered'
                        ? 'bg-emerald-100 text-emerald-800'
                        : del.isDelayed
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                    }`}>
                      ধাপ {del.stageNumber}/৯ · {del.stage === 'delivered' ? 'সম্পন্ন' : del.isDelayed ? 'বিলম্বিত' : 'চলমান'}
                    </span>
                    <div className="text-[10px] text-stone-500 mt-0.5 flex items-center gap-1">
                      <MapPin className="w-2.5 h-2.5 text-stone-400" />
                      <span className="truncate max-w-[120px]">{del.currentLocation}</span>
                    </div>
                  </td>

                  {/* Actions (7 Actions) */}
                  <td className="p-3 text-right space-x-1">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => openDetailsFor(del)}
                        title="সম্পূর্ণ বিস্তারিত ও ট্র্যাকিং"
                        className="p-1.5 rounded-lg bg-stone-100 hover:bg-emerald-100 text-stone-700 hover:text-emerald-900 cursor-pointer"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => openPackagingFor(del)}
                        title="প্যাকেজিং আপডেট"
                        className="p-1.5 rounded-lg bg-stone-100 hover:bg-emerald-100 text-stone-700 hover:text-emerald-900 cursor-pointer"
                      >
                        <Box className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => openTransportFor(del)}
                        title="পরিবহন ও চালক নির্ধারণ"
                        className="p-1.5 rounded-lg bg-stone-100 hover:bg-emerald-100 text-stone-700 hover:text-emerald-900 cursor-pointer"
                      >
                        <Truck className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => openChallanFor(del)}
                        title="ডেলিভারি চালান প্রিন্ট"
                        className="p-1.5 rounded-lg bg-stone-100 hover:bg-emerald-100 text-stone-700 hover:text-emerald-900 cursor-pointer"
                      >
                        <Printer className="w-4 h-4" />
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* Render Active Modals */}
      {selectedDelivery && (
        <>
          <DeliveryDetailsModal
            delivery={selectedDelivery}
            isOpen={isDetailsOpen}
            onClose={() => setIsDetailsOpen(false)}
            onOpenPackaging={() => { setIsDetailsOpen(false); setIsPackagingOpen(true); }}
            onOpenTransport={() => { setIsDetailsOpen(false); setIsTransportOpen(true); }}
            onOpenChallan={() => { setIsDetailsOpen(false); setIsChallanOpen(true); }}
            onOpenGRN={() => { setIsDetailsOpen(false); setIsGRNOpen(true); }}
            onOpenIssue={() => { setIsDetailsOpen(false); setIsIssueOpen(true); }}
            canEdit={true}
            onAdvanceStage={onAdvanceStage}
            onAddCheckpoint={onAddCheckpoint}
          />

          <DeliveryChallanModal
            delivery={selectedDelivery}
            isOpen={isChallanOpen}
            onClose={() => setIsChallanOpen(false)}
          />

          <PackagingManagementModal
            delivery={selectedDelivery}
            isOpen={isPackagingOpen}
            onClose={() => setIsPackagingOpen(false)}
            onUpdatePackaging={onUpdatePackaging}
          />

          <TransportAssignModal
            delivery={selectedDelivery}
            isOpen={isTransportOpen}
            onClose={() => setIsTransportOpen(false)}
            onAssignTransport={onAssignTransport}
          />

          <DeliveryIssueModal
            delivery={selectedDelivery}
            isOpen={isIssueOpen}
            onClose={() => setIsIssueOpen(false)}
            onSubmitIssue={onSubmitIssue}
            onResolveIssue={onResolveIssue}
            currentUserRole="seller"
          />

          <GoodsReceivedModal
            delivery={selectedDelivery}
            isOpen={isGRNOpen}
            onClose={() => setIsGRNOpen(false)}
            onSubmitGRN={onSubmitGRN}
          />
        </>
      )}

      {/* Reports Modal */}
      <LogisticsReportsModal
        deliveries={deliveries}
        isOpen={isReportsOpen}
        onClose={() => setIsReportsOpen(false)}
      />

    </div>
  );
};
