import React, { useState } from 'react';
import { 
  X, 
  User, 
  Building2, 
  ShieldCheck, 
  Package, 
  ShoppingBag, 
  CreditCard, 
  AlertTriangle, 
  FileText, 
  Calendar, 
  Phone, 
  Mail, 
  MapPin, 
  Edit3, 
  Save, 
  Clock, 
  CheckCircle2, 
  RotateCcw,
  History,
  Check
} from 'lucide-react';
import { 
  AdminUserItem, 
  ProductItem, 
  OrderItem, 
  EscrowRecord 
} from '../../types';

interface UserProfileManagementModalProps {
  user: AdminUserItem | null;
  isOpen: boolean;
  onClose: () => void;
  products?: ProductItem[];
  orders?: OrderItem[];
  escrows?: EscrowRecord[];
  currentOfficerName?: string;
  onUpdateUserProfile: (
    userId: string,
    updatedData: Partial<AdminUserItem>,
    auditReason: string
  ) => void;
}

export const UserProfileManagementModal: React.FC<UserProfileManagementModalProps> = ({
  user,
  isOpen,
  onClose,
  products = [],
  orders = [],
  escrows = [],
  currentOfficerName = 'মো. শাহজাহান কবির (যুগ্মসচিব)',
  onUpdateUserProfile
}) => {
  const [activeSection, setActiveSection] = useState<'overview' | 'products' | 'orders' | 'escrow' | 'audit' | 'edit'>('overview');
  
  // Editable fields
  const [editAddress, setEditAddress] = useState('');
  const [editUpazila, setEditUpazila] = useState('');
  const [editDistrict, setEditDistrict] = useState('');
  const [editMobile, setEditMobile] = useState('');
  const [editBusinessName, setEditBusinessName] = useState('');
  const [editNotes, setEditNotes] = useState('');
  const [updateReason, setUpdateReason] = useState('');

  // Sync state when modal opens
  React.useEffect(() => {
    if (user) {
      setEditAddress(user.address || '');
      setEditUpazila(user.upazila || '');
      setEditDistrict(user.district || '');
      setEditMobile(user.mobile || '');
      setEditBusinessName(user.businessName || '');
      setEditNotes('');
      setUpdateReason('');
    }
  }, [user]);

  if (!isOpen || !user) return null;

  // Filter items relating to this user
  const userProducts = products.filter(p => p.producerName.includes(user.name) || p.producerName.includes(user.businessName) || p.district === user.district);
  const userOrders = orders.filter(o => o.customerName.includes(user.name) || (o.sellerName && o.sellerName.includes(user.name)));
  const userEscrows = escrows.filter(e => e.buyerName.includes(user.name) || e.sellerName.includes(user.name));

  const handleSaveProfileChanges = (e: React.FormEvent) => {
    e.preventDefault();
    if (!updateReason.trim()) return;

    onUpdateUserProfile(
      user.id,
      {
        address: editAddress,
        upazila: editUpazila,
        district: editDistrict,
        mobile: editMobile,
        businessName: editBusinessName
      },
      updateReason
    );
    setActiveSection('overview');
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto font-bengali">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-auto flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-stone-900 px-6 py-5 text-white flex items-center justify-between border-b border-emerald-800 shrink-0">
          <div className="flex items-center gap-3.5">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-12 h-12 rounded-2xl object-cover border-2 border-emerald-400 shadow-md shrink-0" 
            />
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

          <button 
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-white/10 text-stone-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section Navigation Tabs (§5) */}
        <div className="bg-stone-50 border-b border-stone-200 px-6 flex items-center gap-1.5 text-xs font-bold overflow-x-auto shrink-0 scrollbar-none">
          <button
            onClick={() => setActiveSection('overview')}
            className={`py-3 px-3 border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeSection === 'overview'
                ? 'border-emerald-800 text-emerald-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>প্রোফাইল বিবরণ</span>
          </button>

          <button
            onClick={() => setActiveSection('products')}
            className={`py-3 px-3 border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeSection === 'products'
                ? 'border-emerald-800 text-emerald-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>তালিকাভুক্ত পণ্য ({user.listedProductCount})</span>
          </button>

          <button
            onClick={() => setActiveSection('orders')}
            className={`py-3 px-3 border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeSection === 'orders'
                ? 'border-emerald-800 text-emerald-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>অর্ডার ও কার্যক্রম ({user.ordersCount})</span>
          </button>

          <button
            onClick={() => setActiveSection('escrow')}
            className={`py-3 px-3 border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeSection === 'escrow'
                ? 'border-emerald-800 text-emerald-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>লেনদেন ও এসক্রো সারসংক্ষেপ</span>
          </button>

          <button
            onClick={() => setActiveSection('audit')}
            className={`py-3 px-3 border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeSection === 'audit'
                ? 'border-emerald-800 text-emerald-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>যাচাই ও অডিট ইতিহাস</span>
          </button>

          <button
            onClick={() => setActiveSection('edit')}
            className={`py-3 px-3 border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ml-auto ${
              activeSection === 'edit'
                ? 'border-emerald-800 text-emerald-900'
                : 'border-transparent text-amber-800 hover:text-amber-950 font-bold'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5 text-amber-600" />
            <span>তথ্য সংশোধন</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">

          {/* SECTION 1: OVERVIEW */}
          {activeSection === 'overview' && (
            <div className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2.5">
                  <h4 className="font-bold text-stone-900 text-xs flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-emerald-800" />
                    <span>প্রাতিষ্ঠানিক ও ব্যক্তিগত পরিচয়</span>
                  </h4>

                  <div className="space-y-1.5 text-stone-700">
                    <div className="flex justify-between">
                      <span className="text-stone-500">নাম:</span>
                      <strong className="text-stone-900">{user.name}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">প্রতিষ্ঠান:</span>
                      <strong>{user.businessName}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">ব্যবহারকারীর শ্রেণি:</span>
                      <strong className="text-emerald-900">{user.roleLabel}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">মোবাইল:</span>
                      <span className="font-mono">{user.mobile}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">ইমেইল:</span>
                      <span className="font-mono">{user.email}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2.5">
                  <h4 className="font-bold text-stone-900 text-xs flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-800" />
                    <span>ভৌগোলিক এলাকা ও নিবন্ধন তথ্য</span>
                  </h4>

                  <div className="space-y-1.5 text-stone-700">
                    <div className="flex justify-between">
                      <span className="text-stone-500">জেলা:</span>
                      <strong>{user.district}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">উপজেলা:</span>
                      <strong>{user.upazila}</strong>
                    </div>
                    <div className="pt-1 text-[11px]">
                      <span className="text-stone-500 block">পূর্ণাঙ্গ ঠিকানা:</span>
                      <span className="text-stone-800">{user.address}</span>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-stone-200">
                      <span className="text-stone-500">নিবন্ধন তারিখ:</span>
                      <span>{user.joinedDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">যাচাই অবস্থা:</span>
                      <strong className="text-emerald-800">{user.verificationStatusLabel}</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dispute & Complaints History */}
              <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-2">
                <h4 className="font-bold text-stone-900 text-xs flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  <span>অভিযোগ ও বিরোধের ইতিহাস (Dispute & Complaint History)</span>
                </h4>
                {user.disputeCount === 0 ? (
                  <p className="text-stone-500 text-[11px] py-1">
                    এই ব্যবহারকারীর অ্যাকাউন্টে কোনো সক্রিয় বা অমীমাংসিত অভিযোগ নেই। অ্যাকাউন্ট সন্তোষজনক।
                  </p>
                ) : (
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-stone-800 text-[11px] space-y-1">
                    <div className="font-bold text-amber-950">১টি পূর্ববর্তী বিরোধ রিপোর্ট (লজিস্টিকস ক্ষতিপূরণ সংক্রান্ত)</div>
                    <p className="text-stone-600">মন্ত্রণালয় মধ্যস্থতাকারী সেল কর্তৃক সফলভাবে আপস ও নিষ্পত্তি কার্যকর হয়েছে।</p>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* SECTION 2: LISTED PRODUCTS */}
          {activeSection === 'products' && (
            <div className="space-y-3">
              <h4 className="font-bold text-stone-900 text-xs">
                {user.businessName} কর্তৃক তালিকাভুক্ত পণ্যসমূহ ({userProducts.length}টি প্রদর্শন)
              </h4>

              {userProducts.length === 0 ? (
                <div className="py-12 text-center text-stone-400">
                  এখনও কোনো পণ্য তালিকাভুক্ত করা হয়নি।
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {userProducts.map((p) => (
                    <div key={p.id} className="p-3 rounded-xl border border-stone-200 bg-stone-50 flex items-start gap-3">
                      <img src={p.image} alt={p.name} className="w-14 h-14 rounded-lg object-cover border border-stone-200 shrink-0" />
                      <div className="space-y-1 flex-1 min-w-0">
                        <div className="font-bold text-stone-900 text-xs truncate">{p.name}</div>
                        <div className="text-[11px] text-emerald-800 font-bold">৳{p.pricePerUnit} / {p.unit}</div>
                        <div className="text-[10px] text-stone-500">স্টক: {p.availableQuantity} {p.unit} · {p.district}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* SECTION 3: ORDERS */}
          {activeSection === 'orders' && (
            <div className="space-y-3">
              <h4 className="font-bold text-stone-900 text-xs">অর্ডার ও বাল্ক ট্রেড হিস্ট্রি</h4>

              {userOrders.length === 0 ? (
                <div className="py-12 text-center text-stone-400">
                  সংশ্লিষ্ট কোনো অর্ডারের রেকর্ড পাওয়া যায়নি।
                </div>
              ) : (
                <div className="space-y-2">
                  {userOrders.map((ord) => (
                    <div key={ord.id} className="p-3 rounded-xl border border-stone-200 bg-stone-50 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-mono text-[10px] font-bold text-emerald-900 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">{ord.orderNumber}</span>
                        <div className="font-bold text-stone-900 mt-0.5">{ord.productName}</div>
                        <div className="text-[10px] text-stone-500">{ord.orderDate} · {ord.destination}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-stone-900 tabular-nums">৳{ord.totalAmount.toLocaleString()}</div>
                        <span className="text-[10px] text-emerald-700 font-bold">সম্পন্ন</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* SECTION 4: ESCROW SUMMARY */}
          {activeSection === 'escrow' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="text-stone-500 text-[10px] block">মোট লেনদেন ভলিউম</span>
                  <strong className="text-base text-stone-900 tabular-nums">৳{user.totalTransactionValue.toLocaleString('bn-BD')}</strong>
                </div>
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                  <span className="text-emerald-900 text-[10px] block font-bold">সোনালী ব্যাংক ট্রাস্ট হিসাব</span>
                  <strong className="text-base text-emerald-950 tabular-nums">সক্রিয় ও সুরক্ষিত</strong>
                </div>
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="text-stone-500 text-[10px] block">অমীমাংসিত অর্থ</span>
                  <strong className="text-base text-stone-900 tabular-nums">৳০</strong>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-stone-700 text-xs space-y-1.5">
                <h5 className="font-bold text-stone-900 text-xs">এসক্রো কমপ্লায়েন্স স্ট্যাটাস</h5>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  এই গ্রাহকের সমস্ত পাইকারি ক্রয়-বিক্রয় সোনালী ব্যাংক পিএলসি এবং বাংলাদেশ ব্যাংকের ন্যাশনাল পেমেন্ট সুইচ (NPSB) 
                  নীতিমালা অনুযায়ী এসক্রো ট্রাস্ট অ্যাকাউন্টের মাধ্যমে সম্পন্ন হয়েছে। কোনো অস্বাভাবিক লেনদেন বা মানি লন্ডারিং সন্দেহ পরিলক্ষিত হয়নি।
                </p>
              </div>
            </div>
          )}

          {/* SECTION 5: AUDIT LOGS */}
          {activeSection === 'audit' && (
            <div className="space-y-3">
              <h4 className="font-bold text-stone-900 text-xs">যাচাইকরণ ও প্রশাসনিক অডিট লগ</h4>

              <div className="space-y-2.5">
                {user.auditHistory.map((aud) => (
                  <div key={aud.id} className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-stone-900">{aud.actionLabel}</span>
                      <span className="text-[10px] text-stone-400">{aud.timestamp}</span>
                    </div>
                    <div className="text-emerald-900 text-[11px]">কর্মকর্তা: {aud.officerName} ({aud.officerRole})</div>
                    <div className="text-stone-700 text-[11px]"><strong>কারণ:</strong> {aud.reason}</div>
                    {aud.notes && <div className="text-stone-500 text-[10px] italic">মন্তব্য: {aud.notes}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 6: EDIT PROFILE (ADMINISTRATIVE UPDATE) (§5) */}
          {activeSection === 'edit' && (
            <form onSubmit={handleSaveProfileChanges} className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-4">
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-950 text-xs flex items-center justify-between">
                <span>প্রশাসনিক এডিটর: <strong>{currentOfficerName}</strong></span>
                <span className="text-[10px] font-bold text-amber-800">অডিট লগে স্বয়ংক্রিয় সংরক্ষণ হবে</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-stone-800 block text-xs">প্রতিষ্ঠানের নাম:</label>
                  <input
                    type="text"
                    value={editBusinessName}
                    onChange={(e) => setEditBusinessName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-800 block text-xs">মোবাইল নম্বর:</label>
                  <input
                    type="text"
                    value={editMobile}
                    onChange={(e) => setEditMobile(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-800 block text-xs">জেলা:</label>
                  <input
                    type="text"
                    value={editDistrict}
                    onChange={(e) => setEditDistrict(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-stone-800 block text-xs">উপজেলা:</label>
                  <input
                    type="text"
                    value={editUpazila}
                    onChange={(e) => setEditUpazila(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-white"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="font-bold text-stone-800 block text-xs">পূর্ণাঙ্গ ঠিকানা:</label>
                  <input
                    type="text"
                    value={editAddress}
                    onChange={(e) => setEditAddress(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-white"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="font-bold text-stone-800 block text-xs">
                    প্রশাসনিক সংশোধনের কারণ (বাধ্যতামূলক):
                  </label>
                  <input
                    type="text"
                    required
                    value={updateReason}
                    onChange={(e) => setUpdateReason(e.target.value)}
                    placeholder="যেমন: কৃষক লিখিত আবেদনের প্রেক্ষিতে মোবাইল নম্বর ও সমবায় ঠিকানা হালনাগাদ..."
                    className="w-full p-2.5 rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-white"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveSection('overview')}
                  className="px-4 py-2 border border-stone-300 text-stone-700 rounded-xl font-bold hover:bg-stone-100 cursor-pointer"
                >
                  ফিরে যান
                </button>
                <button
                  type="submit"
                  disabled={!updateReason.trim()}
                  className={`px-5 py-2 rounded-xl font-bold text-white shadow-xs cursor-pointer ${
                    !updateReason.trim()
                      ? 'bg-stone-300 cursor-not-allowed'
                      : 'bg-emerald-800 hover:bg-emerald-900'
                  }`}
                >
                  পরিবর্তন সংরক্ষণ ও অডিট লগ লিপিবদ্ধকরণ
                </button>
              </div>
            </form>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-100 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500 shrink-0">
          <span>ব্যবহারকারী প্রোফাইল আইডি: {user.id}</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-lg font-bold cursor-pointer"
          >
            বন্ধ করুন
          </button>
        </div>

      </div>
    </div>
  );
};
