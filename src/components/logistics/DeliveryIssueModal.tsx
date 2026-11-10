import React, { useState } from 'react';
import { 
  AlertTriangle, 
  X, 
  Camera, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  ShieldAlert,
  Send,
  UserCheck
} from 'lucide-react';
import { DeliveryItem, DeliveryIssueItem, IssueCategory, IssueStatus } from '../../types';

interface DeliveryIssueModalProps {
  delivery: DeliveryItem;
  isOpen: boolean;
  onClose: () => void;
  onSubmitIssue: (deliveryId: string, issue: Omit<DeliveryIssueItem, 'id' | 'issueNumber'>) => void;
  onResolveIssue?: (deliveryId: string, resolutionNote: string) => void;
  currentUserRole: 'buyer' | 'seller';
}

const ISSUE_CATEGORIES: { key: IssueCategory; label: string }[] = [
  { key: 'delayed', label: 'অস্বাভাবিক ডেলিভারি বিলম্ব' },
  { key: 'shortage', label: 'চালানের তুলনায় পণ্যের ঘাটতি' },
  { key: 'damaged', label: 'পরিবহনে পণ্য বিনষ্ট বা নষ্ট' },
  { key: 'wrong_product', label: 'অর্ডারের সাথে পণ্যের অমিল / ভুল পণ্য' },
  { key: 'transport_failure', label: 'যানবাহন বিকল / দুর্ঘটনা' },
  { key: 'lost', label: 'পণ্য হারিয়ে যাওয়া' },
  { key: 'other', label: 'অন্যান্য সমস্যা' }
];

export const DeliveryIssueModal: React.FC<DeliveryIssueModalProps> = ({
  delivery,
  isOpen,
  onClose,
  onSubmitIssue,
  onResolveIssue,
  currentUserRole
}) => {
  const existingIssue = delivery.issue;

  const [category, setCategory] = useState<IssueCategory>(existingIssue?.issueCategory || 'delayed');
  const [description, setDescription] = useState(existingIssue?.description || '');
  const [photos, setPhotos] = useState<string[]>(existingIssue?.attachedPhotos || []);
  const [replyText, setReplyText] = useState('');

  if (!isOpen) return null;

  const handleSimulateAddPhoto = () => {
    const photoUrl = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80';
    setPhotos([...photos, photoUrl]);
  };

  const handleFileComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    const matchedCategory = ISSUE_CATEGORIES.find(c => c.key === category);

    onSubmitIssue(delivery.id, {
      orderNumber: delivery.orderNumber,
      deliveryId: delivery.id,
      complainantName: currentUserRole === 'buyer' ? delivery.buyerName : delivery.sellerName,
      complainantRole: currentUserRole,
      issueCategory: category,
      categoryLabel: matchedCategory ? matchedCategory.label : 'অভিযোগ',
      description,
      attachedPhotos: photos,
      issueDate: new Date().toLocaleDateString('bn-BD', { day: '2-digit', month: 'long', year: 'numeric' }),
      status: 'new',
      statusLabel: 'নতুন অভিযোগ',
      history: [
        {
          timestamp: new Date().toLocaleDateString('bn-BD', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
          actor: currentUserRole === 'buyer' ? 'ক্রেতা' : 'বিক্রেতা',
          note: description,
          status: 'অভিযোগ দাখিলকৃত'
        }
      ]
    });
    onClose();
  };

  const handleResolve = () => {
    if (!replyText.trim() || !onResolveIssue) return;
    onResolveIssue(delivery.id, replyText);
    setReplyText('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-stone-200 animate-in fade-in">
        
        {/* Header */}
        <div className="p-4 bg-stone-100 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-700" />
            <div>
              <h3 className="font-bold text-stone-900 text-sm sm:text-base">
                {existingIssue ? `অভিযোগ বিবরণী – ${existingIssue.issueNumber}` : 'ডেলিভারি সংক্রান্ত সমস্যা ও অভিযোগ দাখিল'}
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

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-xs">
          
          {existingIssue ? (
            /* View Existing Issue Mode */
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-rose-900 text-sm">{existingIssue.categoryLabel}</span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white text-rose-800 border border-rose-300">
                    {existingIssue.statusLabel}
                  </span>
                </div>
                <p className="text-stone-700 text-xs leading-relaxed">
                  {existingIssue.description}
                </p>
                <div className="text-[10px] text-stone-500 flex items-center justify-between pt-2 border-t border-rose-200">
                  <span>অভিযোগকারী: {existingIssue.complainantName} ({existingIssue.complainantRole === 'buyer' ? 'ক্রেতা' : 'বিক্রেতা'})</span>
                  <span>তারিখ: {existingIssue.issueDate}</span>
                </div>
              </div>

              {/* Photos if attached */}
              {existingIssue.attachedPhotos && existingIssue.attachedPhotos.length > 0 && (
                <div className="space-y-1.5">
                  <span className="font-semibold text-stone-700 block">সংযুক্ত প্রমাণ ছবি:</span>
                  <div className="flex items-center gap-2 overflow-x-auto">
                    {existingIssue.attachedPhotos.map((url, i) => (
                      <img key={i} src={url} alt="Proof" className="w-16 h-16 rounded-lg object-cover border border-stone-300" />
                    ))}
                  </div>
                </div>
              )}

              {/* Issue Timeline History */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                <span className="font-bold text-stone-900 block pb-1 border-b border-stone-200">
                  কার্যক্রম ও সমাধানের অগ্রগতি লগ
                </span>
                <div className="space-y-2 pt-1 max-h-48 overflow-y-auto">
                  {existingIssue.history?.map((h, idx) => (
                    <div key={idx} className="bg-white p-2.5 rounded-lg border border-stone-200 text-xs space-y-0.5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-stone-800">{h.actor} ({h.status})</span>
                        <span className="text-stone-400 text-[10px]">{h.timestamp}</span>
                      </div>
                      <p className="text-stone-600 text-[11px]">{h.note}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resolution Form / Response Input if not resolved */}
              {existingIssue.status !== 'resolved' && (
                <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-3">
                  <div className="font-bold text-emerald-950 text-xs">
                    সমাধান ও সমঝোতা নোট প্রদান করুন:
                  </div>
                  <textarea
                    rows={2}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="যেমন: ক্ষতিপূরণ হিসেবে আগামী চালানে ঘাটতি পণ্য সমন্বয় করা হবে অথবা দ্রুত বিকল্প পরিবহন ব্যবস্থা করা হয়েছে।"
                    className="w-full bg-white border border-stone-300 rounded-lg p-2 text-xs focus:ring-1 focus:ring-emerald-700"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={handleResolve}
                      disabled={!replyText.trim()}
                      className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 disabled:opacity-50 text-white font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4 text-amber-300" />
                      <span>সমাধান হিসেবে নিশ্চিত করুন</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* File New Issue Form */
            <form onSubmit={handleFileComplaint} className="space-y-4">
              
              <div>
                <label className="font-bold text-stone-800 block mb-1">
                  ১. সমস্যার প্রধান ধরন নির্বাচন করুন:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {ISSUE_CATEGORIES.map((c) => (
                    <button
                      key={c.key}
                      type="button"
                      onClick={() => setCategory(c.key)}
                      className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                        category === c.key
                          ? 'border-rose-700 bg-rose-50 text-rose-900 font-bold ring-1 ring-rose-700'
                          : 'border-stone-200 hover:bg-stone-50 text-stone-700 font-medium'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-800 block mb-1">
                  ২. সমস্যার সুনির্দিষ্ট বিবরণ:
                </label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="যেমন: নির্ধারিত সময় পেরিয়ে গেলেও ট্রাক এখনও গন্তব্যে পৌঁছায়নি অথবা চালক ফোন রিসিভ করছেন না।"
                  className="w-full border border-stone-300 rounded-xl p-2.5 text-xs focus:ring-1 focus:ring-rose-700"
                />
              </div>

              <div>
                <label className="font-bold text-stone-800 block mb-1">
                  ৩. প্রমাণ ছবি বা চালানের রসিদ (ঐচ্ছিক):
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleSimulateAddPhoto}
                    className="px-3 py-1.5 rounded-lg border border-dashed border-stone-400 bg-stone-50 hover:bg-stone-100 text-stone-700 font-medium flex items-center gap-1.5 cursor-pointer text-xs"
                  >
                    <Camera className="w-4 h-4 text-rose-700" />
                    <span>ছবি সংযুক্ত করুন</span>
                  </button>
                  <span className="text-[11px] text-stone-500">
                    {photos.length} টি ছবি সংযুক্ত
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-[11px] flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>
                  অভিযোগ দাখিলের সাথে সাথেই বিক্রেতা ও মন্ত্রণালয়ের সাপোর্ট টিম তাৎক্ষণিক নোটিফিকেশন পাবে। সমাধান না হওয়া পর্যন্ত এসক্রো ফান্ড আটকে থাকবে।
                </span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl border border-stone-300 text-stone-600 font-semibold"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>অভিযোগ জমা দিন</span>
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
