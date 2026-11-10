import React, { useState } from 'react';
import { 
  AlertTriangle, 
  X, 
  ShieldAlert, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  Scale, 
  Clock, 
  FileText, 
  Image,
  PauseCircle,
  HelpCircle
} from 'lucide-react';
import { FinancialDisputeRecord, EscrowRecord } from '../../types';

interface TransactionDisputeModalProps {
  disputes: FinancialDisputeRecord[];
  escrows: EscrowRecord[];
  isOpen: boolean;
  onClose: () => void;
  onSubmitDispute: (disputeData: Omit<FinancialDisputeRecord, 'id' | 'disputeNumber' | 'status' | 'statusLabel' | 'history'>) => void;
  onResolveDispute?: (disputeId: string, resolutionSummary: string) => void;
  currentUserRole: string;
}

const DISPUTE_CATEGORIES = [
  'পণ্য সরবরাহ হয়নি (নন-ডেলিভারি)',
  'পণ্যের পরিমাণে ঘাটতি (শর্টেজ)',
  'পণ্য ক্ষতিগ্রস্ত বা বিনষ্ট',
  'পণ্যের গুণগত মান ও আর্দ্রতা নিয়ে অমিল',
  'ভুল মূল্য বা অতিরিক্ত পরিবহন চার্জ দাবি',
  'পেমেন্ট সংক্রান্ত কারিগরি সমস্যা',
  'অর্থ ছাড় সংক্রান্ত শর্ত নিয়ে বিরোধ',
  'অন্যান্য যৌক্তিক আর্থিক বিরোধ'
];

export const TransactionDisputeModal: React.FC<TransactionDisputeModalProps> = ({
  disputes,
  escrows,
  isOpen,
  onClose,
  onSubmitDispute,
  onResolveDispute,
  currentUserRole
}) => {
  const [selectedDisputeId, setSelectedDisputeId] = useState<string>(disputes[0]?.id || '');
  const [showNewDisputeForm, setShowNewDisputeForm] = useState(false);

  // New Dispute Form State
  const [selectedEscrowId, setSelectedEscrowId] = useState(escrows[0]?.id || '');
  const [category, setCategory] = useState(DISPUTE_CATEGORIES[0]);
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [resolutionInput, setResolutionInput] = useState('');

  if (!isOpen) return null;

  const activeDispute = disputes.find(d => d.id === selectedDisputeId) || disputes[0];
  const selectedEscrow = escrows.find(e => e.id === selectedEscrowId) || escrows[0];

  const handleSimulateAddPhoto = () => {
    const url = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80';
    setPhotos([...photos, url]);
  };

  const handleCreateDispute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEscrow || !description.trim()) return;

    onSubmitDispute({
      orderNumber: selectedEscrow.orderNumber,
      transactionRef: selectedEscrow.transactionRef,
      escrowNumber: selectedEscrow.escrowNumber,
      buyerName: selectedEscrow.buyerName,
      sellerName: selectedEscrow.sellerName,
      category,
      description,
      evidencePhotos: photos,
      filingDate: new Date().toLocaleDateString('bn-BD', { day: '2-digit', month: 'long', year: 'numeric' }),
      buyerStatement: description
    });

    setShowNewDisputeForm(false);
    setDescription('');
  };

  const handleResolve = () => {
    if (!activeDispute || !resolutionInput.trim() || !onResolveDispute) return;
    onResolveDispute(activeDispute.id, resolutionInput);
    setResolutionInput('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto font-bengali">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-stone-200 animate-in fade-in">
        
        {/* Header */}
        <div className="p-4 bg-stone-100 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-700 text-white flex items-center justify-center">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-sm sm:text-base">
                আর্থিক লেনদেন বিরোধ ও এসক্রো সালিশি সেল (Dispute Management)
              </h3>
              <p className="text-[11px] text-stone-500">
                পার্বত্য চট্টগ্রাম বিষয়ক মন্ত্রণালয় · নিরপেক্ষ মধ্যস্থতা ও এসক্রো সুরক্ষা
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!showNewDisputeForm && (
              <button
                onClick={() => setShowNewDisputeForm(true)}
                className="text-xs font-bold px-3 py-1.5 rounded-lg bg-rose-700 hover:bg-rose-800 text-white flex items-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <span>নতুন বিরোধ দায়ের</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-xs">
          
          {/* CRITICAL WARNING BANNER (§10) */}
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-300 text-rose-950 flex items-start gap-3 shadow-2xs">
            <PauseCircle className="w-5 h-5 text-rose-700 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="font-bold flex items-center gap-2 text-xs">
                <span>সতর্কতা: বিরোধাধীন চালানের এসক্রো অর্থ ছাড় স্থগিত নীতি</span>
                <span className="text-[9px] bg-rose-200 text-rose-900 px-1.5 py-0.2 rounded font-bold uppercase">
                  আইনগত বাধ্যবাধকতা
                </span>
              </div>
              <p className="text-stone-700 text-[11px] leading-relaxed">
                কোনো অর্ডারে সক্রিয় বিরোধ (Active Dispute) চলমান থাকা অবস্থায় অনুমোদিত ব্যাংকিং এসক্রো চুক্তির বিধি অনুযায়ী বিক্রেতার অনুকূলে অর্থ ছাড় স্বয়ংক্রিয়ভাবে স্থগিত (Paused) থাকে। মধ্যস্থতা সেল বা উভয় পক্ষের সম্মতিতে নিষ্পত্তি না হওয়া পর্যন্ত ব্যাংক কোনো অর্থ ছাড় করবে না।
              </p>
            </div>
          </div>

          {showNewDisputeForm ? (
            /* File New Dispute Form */
            <form onSubmit={handleCreateDispute} className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                <h4 className="font-bold text-stone-900 text-sm">নতুন বিরোধ ও অভিযোগ দাখিল ফরম</h4>
                <button
                  type="button"
                  onClick={() => setShowNewDisputeForm(false)}
                  className="text-stone-400 hover:text-stone-700 text-xs font-semibold"
                >
                  বিদ্যমান বিরোধ দেখুন
                </button>
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">বিরোধপূর্ণ অর্ডার ও এসক্রো নির্বাচন:</label>
                <select
                  value={selectedEscrowId}
                  onChange={(e) => setSelectedEscrowId(e.target.value)}
                  className="w-full border border-stone-300 rounded-lg p-2 font-medium focus:ring-1 focus:ring-rose-700"
                >
                  {escrows.map(e => (
                    <option key={e.id} value={e.id}>
                      {e.orderNumber} – {e.productName} ({e.buyerName} vs {e.sellerName})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">বিরোধের ক্যাটাগরি (৮টি অনুমোদিত ধরন):</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-stone-300 rounded-lg p-2 font-medium focus:ring-1 focus:ring-rose-700"
                >
                  {DISPUTE_CATEGORIES.map((c, i) => (
                    <option key={i} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">বিরোধের বিস্তারিত বিবরণ ও আর্থিক দাবিনামা:</label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="যেমন: ৮০০ কেজি আম্রপালি আমের মধ্যে ১২০ কেজি ফল গরমে নষ্ট ছিল। আমরা ৳১২,০০০ রিফান্ড চাই অথবা পরবর্তী চালানে ঘাটতি সমন্বয়ের দাবি জানাচ্ছি।"
                  className="w-full border border-stone-300 rounded-lg p-2 text-xs focus:ring-1 focus:ring-rose-700"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-700 block mb-1">প্রমাণপত্র ও ছবি সংযুক্তি:</label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleSimulateAddPhoto}
                    className="px-3 py-1.5 rounded-lg border border-dashed border-stone-400 bg-stone-50 hover:bg-stone-100 text-stone-700 font-medium flex items-center gap-1.5 cursor-pointer text-xs"
                  >
                    <Image className="w-4 h-4 text-rose-700" />
                    <span>প্রমাণ ছবি যুক্ত করুন</span>
                  </button>
                  <span className="text-[11px] text-stone-500">{photos.length}টি ফাইল সংযুক্ত</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setShowNewDisputeForm(false)}
                  className="px-3.5 py-1.5 rounded-lg border border-stone-300 text-stone-600 font-semibold"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>বিরোধ দায়ের করুন ও এসক্রো স্থগিত রাখুন</span>
                </button>
              </div>
            </form>
          ) : activeDispute ? (
            /* Active Dispute Case File */
            <div className="space-y-4">
              
              {/* Dispute Metadata Strip */}
              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-stone-900 text-sm">{activeDispute.disputeNumber}</span>
                    <span className="text-stone-300">·</span>
                    <span className="font-mono text-emerald-950 font-bold">{activeDispute.orderNumber}</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                    {activeDispute.statusLabel}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                  <div>
                    <span className="text-stone-500 block text-[10px]">বিরোধের ধরন:</span>
                    <span className="font-bold text-stone-900">{activeDispute.category}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[10px]">এসক্রো নম্বর:</span>
                    <span className="font-mono font-bold text-emerald-900">{activeDispute.escrowNumber}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[10px]">অভিযোগের তারিখ:</span>
                    <span className="font-medium text-stone-800">{activeDispute.filingDate}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[10px]">স্থগিত এসক্রো ফান্ড:</span>
                    <span className="font-bold text-rose-700 text-sm">৳১,০১,২০০</span>
                  </div>
                </div>

                <div className="text-[10px] text-stone-500 pt-1 flex justify-between border-t border-stone-200">
                  <span>অভিযোগকারী ক্রেতা: <strong>{activeDispute.buyerName}</strong></span>
                  <span>প্রতিপক্ষ বিক্রেতা: <strong>{activeDispute.sellerName}</strong></span>
                </div>
              </div>

              {/* Arguments Column */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                
                {/* Buyer Statement */}
                <div className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/50 space-y-1">
                  <div className="font-bold text-blue-950 flex items-center justify-between pb-1 border-b border-blue-200">
                    <span>ক্রেতার বক্তব্য ও দাবি</span>
                    <span className="text-[10px] text-blue-700">দাখিলকৃত</span>
                  </div>
                  <p className="text-stone-700 text-[11px] leading-relaxed pt-1">
                    {activeDispute.buyerStatement || activeDispute.description}
                  </p>
                </div>

                {/* Seller Statement */}
                <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/50 space-y-1">
                  <div className="font-bold text-amber-950 flex items-center justify-between pb-1 border-b border-amber-200">
                    <span>বিক্রেতার জবাব ও সমঝোতা প্রস্তাব</span>
                    <span className="text-[10px] text-amber-700">জবাব প্রদানকৃত</span>
                  </div>
                  <p className="text-stone-700 text-[11px] leading-relaxed pt-1">
                    {activeDispute.sellerStatement || 'বিক্রেতার বক্তব্য পর্যালোচনার জন্য অপেক্ষমাণ।'}
                  </p>
                </div>

              </div>

              {/* Mediator Recommendation */}
              {activeDispute.mediatorRecommendation && (
                <div className="p-3.5 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-950 space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-xs text-emerald-950">
                    <Scale className="w-4 h-4 text-emerald-800" />
                    <span>মন্ত্রণালয় সালিশি সেল মধ্যস্থতাকারীর সুপারিশ:</span>
                  </div>
                  <p className="text-stone-700 text-[11px] leading-relaxed">
                    {activeDispute.mediatorRecommendation}
                  </p>
                </div>
              )}

              {/* Photos */}
              {activeDispute.evidencePhotos && activeDispute.evidencePhotos.length > 0 && (
                <div className="space-y-1.5">
                  <span className="font-bold text-stone-700 block">সংযুক্ত প্রমাণ ছবি ও দলিল:</span>
                  <div className="flex items-center gap-2 overflow-x-auto">
                    {activeDispute.evidencePhotos.map((img, i) => (
                      <img key={i} src={img} alt="Evidence" className="w-16 h-16 rounded-lg object-cover border border-stone-300" />
                    ))}
                  </div>
                </div>
              )}

              {/* Resolution Action */}
              {activeDispute.status !== 'resolved' && onResolveDispute && (
                <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-3">
                  <span className="font-bold text-emerald-950 text-xs block">
                    মধ্যস্থতা ও সমঝোতা রায় প্রদান (উভয় পক্ষের সম্মতি নিশ্চিতকরণ):
                  </span>
                  <input
                    type="text"
                    value={resolutionInput}
                    onChange={(e) => setResolutionInput(e.target.value)}
                    placeholder="যেমন: উভয় পক্ষ ৳১২,০০০ রিফান্ডে একমত হয়েছে। বাকি ৳৮৮,৪৯৪ বিক্রেতার হিসাবে ছাড়ের নির্দেশ দেওয়া হলো।"
                    className="w-full bg-white border border-stone-300 rounded-lg p-2 text-xs focus:ring-1 focus:ring-emerald-700"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={handleResolve}
                      disabled={!resolutionInput.trim()}
                      className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 disabled:opacity-50 text-white font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4 text-amber-300" />
                      <span>বিরোধ নিষ্পত্তি সম্পন্ন করুন ও এসক্রো ছাড় উন্মুক্ত করুন</span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          ) : (
            <div className="p-8 text-center text-stone-400">
              কোনো সক্রিয় বিরোধ নথিভুক্ত নেই।
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
