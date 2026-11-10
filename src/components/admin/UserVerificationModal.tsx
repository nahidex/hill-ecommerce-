import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  RotateCcw, 
  User, 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  Clock, 
  ExternalLink,
  Eye,
  Check,
  AlertCircle,
  FileCheck,
  Layers,
  History
} from 'lucide-react';
import { 
  AdminUserItem, 
  VerificationStatusKey, 
  UserVerificationAuditEntry 
} from '../../types';

interface UserVerificationModalProps {
  user: AdminUserItem | null;
  isOpen: boolean;
  onClose: () => void;
  currentOfficerName?: string;
  currentOfficerRole?: string;
  onExecuteAction: (
    userId: string,
    action: 'approved' | 'correction_requested' | 'rejected' | 'suspended' | 'reactivated' | 'under_review',
    reason: string,
    notes?: string
  ) => void;
}

export const UserVerificationModal: React.FC<UserVerificationModalProps> = ({
  user,
  isOpen,
  onClose,
  currentOfficerName = 'মো. শাহজাহান কবির (যুগ্মসচিব)',
  currentOfficerRole = 'মন্ত্রণালয় সুপার অ্যাডমিন',
  onExecuteAction
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'documents' | 'audit' | 'action'>('profile');
  const [selectedAction, setSelectedAction] = useState<
    'approved' | 'correction_requested' | 'rejected' | 'suspended' | 'reactivated' | 'under_review' | null
  >(null);
  const [decisionReason, setDecisionReason] = useState('');
  const [decisionNotes, setDecisionNotes] = useState('');
  const [selectedPreviewDoc, setSelectedPreviewDoc] = useState<string | null>(null);

  if (!isOpen || !user) return null;

  const handleActionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAction || !decisionReason.trim()) return;

    onExecuteAction(user.id, selectedAction, decisionReason, decisionNotes);
    setSelectedAction(null);
    setDecisionReason('');
    setDecisionNotes('');
    onClose();
  };

  const getStatusBadge = (status: VerificationStatusKey) => {
    switch (status) {
      case 'approved':
        return <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> অনুমোদিত</span>;
      case 'pending_verification':
        return <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> যাচাইয়ের অপেক্ষায়</span>;
      case 'under_review':
        return <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-blue-100 text-blue-900 border border-blue-300 flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> যাচাই চলছে</span>;
      case 'correction_requested':
        return <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-orange-100 text-orange-900 border border-orange-300 flex items-center gap-1"><RotateCcw className="w-3.5 h-3.5" /> সংশোধনের জন্য ফেরত</span>;
      case 'rejected':
        return <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-rose-100 text-rose-900 border border-rose-300 flex items-center gap-1"><XCircle className="w-3.5 h-3.5" /> প্রত্যাখ্যাত</span>;
      case 'suspended':
        return <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-stone-200 text-stone-800 border border-stone-400 flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5" /> সাময়িক স্থগিত</span>;
      case 'new_registration':
      default:
        return <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-stone-100 text-stone-800 border border-stone-300 flex items-center gap-1">নতুন নিবন্ধন</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto font-bengali">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-auto flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-stone-900 px-6 py-5 text-white flex items-center justify-between border-b border-emerald-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-800/80 border border-emerald-700/80 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono tracking-wide text-emerald-300 font-bold bg-emerald-900/60 px-2 py-0.5 rounded border border-emerald-800">
                  {user.memberId}
                </span>
                <span className="text-xs text-emerald-200">· {user.roleLabel}</span>
              </div>
              <h2 className="text-lg font-bold text-white mt-0.5">{user.name} ({user.businessName})</h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {getStatusBadge(user.verificationStatus)}
            <button 
              onClick={onClose}
              className="p-1.5 rounded-xl hover:bg-white/10 text-stone-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-stone-50 border-b border-stone-200 px-6 flex items-center gap-2 text-xs font-bold shrink-0">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'profile'
                ? 'border-emerald-800 text-emerald-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>প্রোফাইল ও ব্যবসা পরিচিতি</span>
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={`py-3 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'documents'
                ? 'border-emerald-800 text-emerald-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>সনদ ও প্রমাণপত্র ({user.documents.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`py-3 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'audit'
                ? 'border-emerald-800 text-emerald-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>অডিট ও সিদ্ধান্তের ইতিহাস ({user.auditHistory.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('action')}
            className={`py-3 px-3 border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ml-auto ${
              activeTab === 'action'
                ? 'border-emerald-800 text-emerald-900'
                : 'border-transparent text-amber-800 hover:text-amber-950 font-bold'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
            <span>প্রশাসনিক যাচাই সিদ্ধান্ত</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">

          {/* TAB 1: PROFILE & BUSINESS DETAILS */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              
              {/* Basic Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                  <h4 className="font-bold text-stone-900 text-sm flex items-center gap-2">
                    <User className="w-4 h-4 text-emerald-800" />
                    <span>ব্যক্তিগত পরিচিতি ও ঠিকানা</span>
                  </h4>

                  <div className="space-y-2 text-stone-700">
                    <div className="flex justify-between">
                      <span className="text-stone-500">পূর্ণ নাম:</span>
                      <strong className="text-stone-900">{user.name}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">মোবাইল নম্বর:</span>
                      <strong className="font-mono">{user.mobile}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">ই-মেইল:</span>
                      <span className="text-stone-900 font-mono">{user.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">জেলা ও উপজেলা:</span>
                      <strong>{user.district} জেলা, {user.upazila} উপজেলা</strong>
                    </div>
                    <div className="pt-1 text-[11px] text-stone-600">
                      <span className="text-stone-400 block">স্থায়ী ঠিকানা:</span>
                      {user.address}
                    </div>
                    <div className="flex justify-between pt-1 border-t border-stone-200 text-stone-500">
                      <span>নিবন্ধনের তারিখ:</span>
                      <span>{user.joinedDate}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                  <h4 className="font-bold text-stone-900 text-sm flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-emerald-800" />
                    <span>ব্যবসায়িক ও উৎপাদন সক্ষমতা</span>
                  </h4>

                  <div className="space-y-2 text-stone-700">
                    <div className="flex justify-between">
                      <span className="text-stone-500">প্রতিষ্ঠানের নাম:</span>
                      <strong className="text-stone-900">{user.businessName}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">ব্যবহারকারীর শ্রেণি:</span>
                      <strong className="text-emerald-900 font-bold">{user.roleLabel}</strong>
                    </div>

                    {user.farmingAreaAcre && (
                      <div className="flex justify-between">
                        <span className="text-stone-500">চাষযোগ্য জমির পরিমাণ:</span>
                        <strong>{user.farmingAreaAcre} একর (পাহাড়ি ঢাল ও সমতল)</strong>
                      </div>
                    )}
                    {user.productionType && (
                      <div className="flex justify-between">
                        <span className="text-stone-500">উৎপাদনের ধরন:</span>
                        <strong>{user.productionType}</strong>
                      </div>
                    )}
                    {user.tradeLicenseNoMasked && (
                      <div className="flex justify-between">
                        <span className="text-stone-500">ট্রেড লাইসেন্স নম্বর:</span>
                        <strong className="font-mono text-emerald-900">{user.tradeLicenseNoMasked}</strong>
                      </div>
                    )}
                    {user.warehouseCapacity && (
                      <div className="flex justify-between">
                        <span className="text-stone-500">সংগ্রহ ও আড়ত সক্ষমতা:</span>
                        <strong>{user.warehouseCapacity}</strong>
                      </div>
                    )}
                    {user.buyerType && (
                      <div className="flex justify-between">
                        <span className="text-stone-500">ক্রেতার ধরন:</span>
                        <strong className="text-stone-900">{user.buyerType} ({user.annualTurnoverEstimated})</strong>
                      </div>
                    )}
                    {user.craftTradition && (
                      <div className="flex justify-between">
                        <span className="text-stone-500">ঐতিহ্যবাহী কারুশিল্প:</span>
                        <strong>{user.craftTradition}</strong>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Activity Track Record */}
              <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200">
                <h5 className="font-bold text-emerald-950 mb-2 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-emerald-800" />
                  <span>Hill eCommerce প্ল্যাটফর্মে ট্র্যাক রেকর্ড</span>
                </h5>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="bg-white p-2.5 rounded-xl border border-emerald-100">
                    <span className="text-stone-500 text-[10px] block">তালিকাভুক্ত পণ্য</span>
                    <strong className="text-base text-stone-900 tabular-nums">{user.listedProductCount}টি</strong>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-emerald-100">
                    <span className="text-stone-500 text-[10px] block">সম্পন্ন অর্ডার</span>
                    <strong className="text-base text-stone-900 tabular-nums">{user.ordersCount}টি</strong>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-emerald-100">
                    <span className="text-stone-500 text-[10px] block">মোট লেনদেন মূল্য</span>
                    <strong className="text-base text-emerald-950 tabular-nums">৳{user.totalTransactionValue.toLocaleString('bn-BD')}</strong>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-emerald-100">
                    <span className="text-stone-500 text-[10px] block">বিরোধ বা অভিযোগ</span>
                    <strong className={`text-base tabular-nums ${user.disputeCount > 0 ? 'text-rose-700' : 'text-emerald-700'}`}>
                      {user.disputeCount}টি
                    </strong>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: VERIFICATION DOCUMENTS */}
          {activeTab === 'documents' && (
            <div className="space-y-4">
              
              {/* Demo Privacy Disclaimer */}
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-950 flex items-start gap-2 text-xs">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p>
                  <strong>আইনগত সুরক্ষা নোটিশ:</strong> ডেমো সিস্টেমে প্রদর্শিত এনআইডি বা লাইসেন্স নথিগুলো শুধুমাত্র মডেল রূপায়ণের জন্য ব্যবহৃত নমুনা কপি। 
                  বাস্তব নাগরিকদের সংবেদনশীল তথ্য ডিজিটাল নিরাপত্তা আইন অনুযায়ী সম্পূর্ণ সুরক্ষিত রাখা হয়।
                </p>
              </div>

              {user.documents.length === 0 ? (
                <div className="py-12 text-center text-stone-400">
                  ব্যবহারকারী এখনও কোনো নথি আপলোড করেননি।
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {user.documents.map((doc) => (
                    <div 
                      key={doc.id}
                      className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              {doc.type === 'nid' ? 'জাতীয় পরিচয়পত্র' :
                               doc.type === 'trade_license' ? 'ট্রেড লাইসেন্স' :
                               doc.type === 'land_certificate' ? 'কৃষি প্রত্যয়ন' : 'পণ্যের নমুনা ছবি'}
                            </span>
                            <h5 className="font-bold text-stone-900 text-sm mt-1">{doc.title}</h5>
                          </div>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            doc.verificationStatus === 'verified'
                              ? 'bg-emerald-100 text-emerald-900'
                              : doc.verificationStatus === 'rejected'
                                ? 'bg-rose-100 text-rose-900'
                                : 'bg-amber-100 text-amber-900'
                          }`}>
                            {doc.verificationStatus === 'verified' ? 'যাচাইকৃত' :
                             doc.verificationStatus === 'rejected' ? 'বাতিল' : 'যাচাই বাকি'}
                          </span>
                        </div>

                        <div className="text-[11px] text-stone-600 space-y-1">
                          <div>নথি নম্বর (মাস্কড): <strong className="font-mono text-stone-800">{doc.documentNumberMasked}</strong></div>
                          <div>ইস্যু তারিখ: {doc.issuedDate} {doc.expiryDate && `· মেয়াদ: ${doc.expiryDate}`}</div>
                          {doc.notes && <div className="text-stone-500 italic">নোট: {doc.notes}</div>}
                        </div>
                      </div>

                      {/* Mock Document Thumbnail */}
                      <div className="relative rounded-xl overflow-hidden border border-stone-200 group bg-stone-100 aspect-video flex items-center justify-center">
                        <img 
                          src={doc.fileUrl} 
                          alt={doc.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                        />
                        <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <button
                            onClick={() => setSelectedPreviewDoc(doc.fileUrl)}
                            className="px-3 py-1.5 bg-white text-stone-900 rounded-lg font-bold text-xs flex items-center gap-1 cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>বড় করে দেখুন</span>
                          </button>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              )}

            </div>
          )}

          {/* TAB 3: AUDIT HISTORY */}
          {activeTab === 'audit' && (
            <div className="space-y-4">
              <h4 className="font-bold text-stone-900 text-sm flex items-center gap-2">
                <History className="w-4 h-4 text-emerald-800" />
                <span>যাচাইকরণ লগ ও প্রশাসনিক সিদ্ধান্তসমূহ</span>
              </h4>

              {user.auditHistory.length === 0 ? (
                <div className="py-8 text-center text-stone-400">
                  এখনও কোনো প্রশাসনিক সিদ্ধান্ত লিপিবদ্ধ হয়নি।
                </div>
              ) : (
                <div className="space-y-3">
                  {user.auditHistory.map((item) => (
                    <div 
                      key={item.id} 
                      className="p-3.5 rounded-xl border border-stone-200 bg-stone-50 space-y-1 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-stone-900 text-sm">{item.actionLabel}</span>
                        <span className="text-[10px] text-stone-400">{item.timestamp}</span>
                      </div>
                      <div className="text-emerald-900 font-semibold text-[11px]">
                        দায়িত্বপ্রাপ্ত কর্মকর্তা: {item.officerName} ({item.officerRole})
                      </div>
                      <p className="text-stone-700 text-xs mt-1">
                        <strong>সিদ্ধান্তের কারণ:</strong> {item.reason}
                      </p>
                      {item.notes && (
                        <p className="text-stone-500 text-[11px] italic">
                          মন্তব্য: {item.notes}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: ACTION DECISION PANEL (§3) */}
          {activeTab === 'action' && (
            <form onSubmit={handleActionSubmit} className="space-y-5">
              
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-950 text-xs">দায়িত্বপ্রাপ্ত কর্মকর্তা:</span>
                  <span className="font-bold text-stone-900">{currentOfficerName}</span>
                </div>
                <div className="flex items-center justify-between text-stone-600 text-[11px]">
                  <span>প্রশাসনিক পদবি:</span>
                  <span>{currentOfficerRole}</span>
                </div>
                <div className="flex items-center justify-between text-stone-600 text-[11px]">
                  <span>কার্যক্রমের সময়:</span>
                  <span>আজ, {new Date().toLocaleTimeString('bn-BD')}</span>
                </div>
              </div>

              {/* Action Selection Buttons */}
              <div className="space-y-2">
                <label className="font-bold text-stone-800 block text-xs">
                  প্রশাসনিক সিদ্ধান্ত নির্বাচন করুন:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => { setSelectedAction('approved'); setDecisionReason('কাগজপত্র ও NID তথ্য সঠিক পাওয়া গেছে।'); }}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      selectedAction === 'approved'
                        ? 'border-emerald-600 bg-emerald-100/70 text-emerald-950 ring-2 ring-emerald-600'
                        : 'border-stone-200 bg-white hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                      <span>অনুমোদন করুন</span>
                    </div>
                    <span className="text-[10px] text-stone-500 block mt-0.5">স্থায়ীভাবে লাইভ ও সক্রিয়</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setSelectedAction('under_review'); setDecisionReason('তথ্য অধিকতর তদন্ত সাপেক্ষে যাচাই চলছে।'); }}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      selectedAction === 'under_review'
                        ? 'border-blue-600 bg-blue-100/70 text-blue-950 ring-2 ring-blue-600'
                        : 'border-stone-200 bg-white hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-blue-900">
                      <Clock className="w-4 h-4 text-blue-700" />
                      <span>তথ্য যাচাই (চলমান)</span>
                    </div>
                    <span className="text-[10px] text-stone-500 block mt-0.5">মাঠ পর্যায়ে তদন্ত</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setSelectedAction('correction_requested'); setDecisionReason('অস্পষ্ট নথি ও তথ্যে ঘাটতি রয়েছে, পুনরায় আপলোড করুন।'); }}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      selectedAction === 'correction_requested'
                        ? 'border-orange-600 bg-orange-100/70 text-orange-950 ring-2 ring-orange-600'
                        : 'border-stone-200 bg-white hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-orange-900">
                      <RotateCcw className="w-4 h-4 text-orange-700" />
                      <span>সংশোধনে ফেরত পাঠান</span>
                    </div>
                    <span className="text-[10px] text-stone-500 block mt-0.5">নতুন ডকুমেন্ট তলব</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setSelectedAction('suspended'); setDecisionReason('শর্ত লঙ্ঘন বা সাময়িক স্থগিতাদেশ জারি।'); }}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      selectedAction === 'suspended'
                        ? 'border-stone-600 bg-stone-200 text-stone-950 ring-2 ring-stone-600'
                        : 'border-stone-200 bg-white hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-stone-900">
                      <AlertTriangle className="w-4 h-4 text-stone-700" />
                      <span>সাময়িক স্থগিত করুন</span>
                    </div>
                    <span className="text-[10px] text-stone-500 block mt-0.5">অ্যাকাউন্ট কার্যক্রম বন্ধ</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setSelectedAction('reactivated'); setDecisionReason('স্থগিতাদেশ প্রত্যাহার ও অ্যাকাউন্ট পুনঃসক্রিয়।'); }}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      selectedAction === 'reactivated'
                        ? 'border-teal-600 bg-teal-100/70 text-teal-950 ring-2 ring-teal-600'
                        : 'border-stone-200 bg-white hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-teal-900">
                      <Check className="w-4 h-4 text-teal-700" />
                      <span>পুনরায় সক্রিয় করুন</span>
                    </div>
                    <span className="text-[10px] text-stone-500 block mt-0.5">স্থগিতাদেশ অবসান</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setSelectedAction('rejected'); setDecisionReason('ভুয়া তথ্য বা অযোগ্যতার কারণে নিবন্ধন বাতিল।'); }}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      selectedAction === 'rejected'
                        ? 'border-rose-600 bg-rose-100/70 text-rose-950 ring-2 ring-rose-600'
                        : 'border-stone-200 bg-white hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold text-rose-900">
                      <XCircle className="w-4 h-4 text-rose-700" />
                      <span>প্রত্যাখ্যান করুন</span>
                    </div>
                    <span className="text-[10px] text-stone-500 block mt-0.5">স্থায়ীভাবে বাতিল</span>
                  </button>
                </div>
              </div>

              {/* Reason input */}
              <div className="space-y-1.5">
                <label className="font-bold text-stone-800 block text-xs">
                  সিদ্ধান্তের সুনির্দিষ্ট কারণ (বাধ্যতামূলক):
                </label>
                <input
                  type="text"
                  required
                  value={decisionReason}
                  onChange={(e) => setDecisionReason(e.target.value)}
                  placeholder="যেমন: NID নম্বর জাতীয় ডাটাবেজে সঠিক ও কৃষিকাজের প্রত্যক্ষ প্রমাণ পাওয়া গেছে..."
                  className="w-full p-2.5 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white"
                />
              </div>

              {/* Optional comments */}
              <div className="space-y-1.5">
                <label className="font-bold text-stone-800 block text-xs">
                  অতিরিক্ত পর্যবেক্ষণ বা মন্তব্য (ঐচ্ছিক):
                </label>
                <textarea
                  rows={2}
                  value={decisionNotes}
                  onChange={(e) => setDecisionNotes(e.target.value)}
                  placeholder="মাঠ পরিদর্শন বা সমবায় কর্মকর্তার রেফারেন্স..."
                  className="w-full p-2.5 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('profile')}
                  className="px-4 py-2 border border-stone-300 text-stone-700 rounded-xl font-bold hover:bg-stone-100 cursor-pointer"
                >
                  ফিরে যান
                </button>
                <button
                  type="submit"
                  disabled={!selectedAction || !decisionReason.trim()}
                  className={`px-5 py-2 rounded-xl font-bold text-white shadow-xs cursor-pointer transition-all ${
                    !selectedAction || !decisionReason.trim()
                      ? 'bg-stone-300 cursor-not-allowed'
                      : 'bg-emerald-800 hover:bg-emerald-900'
                  }`}
                >
                  প্রশাসনিক সিদ্ধান্ত কার্যকর করুন
                </button>
              </div>

            </form>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-stone-100 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500 shrink-0">
          <span>পার্বত্য চট্টগ্রাম বিষয়ক মন্ত্রণালয় · ডিজিটাল হিল ই-কমার্স প্ল্যাটফর্ম</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-lg font-bold cursor-pointer"
          >
            বন্ধ করুন
          </button>
        </div>

      </div>

      {/* Large Image Preview Modal */}
      {selectedPreviewDoc && (
        <div className="fixed inset-0 z-60 bg-stone-950/80 flex items-center justify-center p-4">
          <div className="relative max-w-2xl w-full bg-white rounded-2xl overflow-hidden p-2 shadow-2xl">
            <button
              onClick={() => setSelectedPreviewDoc(null)}
              className="absolute top-4 right-4 p-1.5 bg-stone-900/80 hover:bg-stone-900 text-white rounded-full cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <img src={selectedPreviewDoc} alt="Document" className="w-full h-auto max-h-[80vh] object-contain rounded-xl" />
            <div className="p-2 text-center text-[11px] text-stone-500 font-medium">
              নমুনা সরকারি নথি প্রিভিউ (সুরক্ষিত মোড)
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
