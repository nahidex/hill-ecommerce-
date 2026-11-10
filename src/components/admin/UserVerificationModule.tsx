import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  AlertTriangle, 
  RotateCcw, 
  Eye, 
  ShieldCheck, 
  Building2, 
  MapPin, 
  UserCheck, 
  UserX, 
  RefreshCw,
  SlidersHorizontal,
  Download
} from 'lucide-react';
import { 
  AdminUserItem, 
  VerificationStatusKey, 
  AccountType 
} from '../../types';
import { UserVerificationModal } from './UserVerificationModal';

interface UserVerificationModuleProps {
  users: AdminUserItem[];
  onUpdateUserVerification: (
    userId: string,
    action: 'approved' | 'correction_requested' | 'rejected' | 'suspended' | 'reactivated' | 'under_review',
    reason: string,
    notes?: string
  ) => void;
  onViewUserProfile?: (user: AdminUserItem) => void;
}

export const UserVerificationModule: React.FC<UserVerificationModuleProps> = ({
  users,
  onUpdateUserVerification,
  onViewUserProfile
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [activeUserForModal, setActiveUserForModal] = useState<AdminUserItem | null>(null);

  // Filtered users
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = u.name.toLowerCase().includes(q);
        const matchId = u.memberId.toLowerCase().includes(q);
        const matchBusiness = u.businessName.toLowerCase().includes(q);
        const matchMobile = u.mobile.includes(q);
        const matchEmail = u.email.toLowerCase().includes(q);
        if (!matchName && !matchId && !matchBusiness && !matchMobile && !matchEmail) return false;
      }

      // Role filter
      if (selectedRole !== 'all' && u.role !== selectedRole) return false;

      // Status filter
      if (selectedStatus !== 'all' && u.verificationStatus !== selectedStatus) return false;

      // District filter
      if (selectedDistrict !== 'all' && !u.district.includes(selectedDistrict)) return false;

      return true;
    });
  }, [users, searchQuery, selectedRole, selectedStatus, selectedDistrict]);

  // Status counts for badge tabs
  const countAll = users.length;
  const countPending = users.filter(u => u.verificationStatus === 'pending_verification' || u.verificationStatus === 'under_review').length;
  const countApproved = users.filter(u => u.verificationStatus === 'approved').length;
  const countCorrection = users.filter(u => u.verificationStatus === 'correction_requested').length;
  const countSuspended = users.filter(u => u.verificationStatus === 'suspended' || u.verificationStatus === 'rejected').length;

  const getStatusBadge = (status: VerificationStatusKey) => {
    switch (status) {
      case 'approved':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300 inline-flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-700" /> অনুমোদিত</span>;
      case 'pending_verification':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-950 border border-amber-300 inline-flex items-center gap-1"><Clock className="w-3 h-3 text-amber-700" /> যাচাই বাকি</span>;
      case 'under_review':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-100 text-blue-900 border border-blue-300 inline-flex items-center gap-1"><Clock className="w-3 h-3 text-blue-700" /> যাচাই চলছে</span>;
      case 'correction_requested':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-orange-100 text-orange-900 border border-orange-300 inline-flex items-center gap-1"><RotateCcw className="w-3 h-3 text-orange-700" /> সংশোধন তলব</span>;
      case 'rejected':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-100 text-rose-900 border border-rose-300 inline-flex items-center gap-1"><XCircle className="w-3 h-3 text-rose-700" /> প্রত্যাখ্যাত</span>;
      case 'suspended':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-stone-200 text-stone-800 border border-stone-400 inline-flex items-center gap-1"><AlertTriangle className="w-3 h-3 text-stone-700" /> স্থগিত</span>;
      case 'new_registration':
      default:
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-stone-100 text-stone-700 border border-stone-300">নতুন</span>;
    }
  };

  const exportUsersCSV = () => {
    const headers = 'আইডি,সদস্য_নম্বর,নাম,প্রতিষ্ঠান,ধরন,মোবাইল,ইমেইল,জেলা,উপজেলা,স্ট্যাটাস,নিবন্ধন_তারিখ\n';
    const rows = filteredUsers.map(u => 
      `"${u.id}","${u.memberId}","${u.name}","${u.businessName}","${u.roleLabel}","${u.mobile}","${u.email}","${u.district}","${u.upazila}","${u.verificationStatusLabel}","${u.joinedDate}"`
    ).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Hill_eCommerce_Users_Verification_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      
      {/* 1. Header & Metric Quick Filter Bar */}
      <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-800" />
              <h3 className="text-base font-bold text-stone-900">
                ব্যবহারকারী যাচাইকরণ ও অনুমোদন সেল (User Verification)
              </h3>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              কৃষক, সরবরাহকারী, পাইকারি ক্রেতা ও উদ্যোক্তাদের NID ও ব্যবসায়িক সনদের সরকারি অনুমোদন
            </p>
          </div>

          <button
            onClick={exportUsersCSV}
            className="px-3.5 py-1.5 border border-stone-300 hover:bg-stone-50 text-stone-700 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer self-stretch sm:self-auto justify-center"
          >
            <Download className="w-3.5 h-3.5 text-stone-500" />
            <span>CSV তালিকা এক্সপোর্ট</span>
          </button>
        </div>

        {/* Status Quick Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold scrollbar-none">
          <button
            onClick={() => setSelectedStatus('all')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              selectedStatus === 'all'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            সকল ব্যবহারকারী ({countAll})
          </button>
          <button
            onClick={() => setSelectedStatus('pending_verification')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              selectedStatus === 'pending_verification'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200'
            }`}
          >
            <Clock className="w-3 h-3" />
            <span>যাচাইয়ের অপেক্ষায় ({countPending})</span>
          </button>
          <button
            onClick={() => setSelectedStatus('approved')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              selectedStatus === 'approved'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100 border border-emerald-200'
            }`}
          >
            <CheckCircle2 className="w-3 h-3" />
            <span>অনুমোদিত ({countApproved})</span>
          </button>
          <button
            onClick={() => setSelectedStatus('correction_requested')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              selectedStatus === 'correction_requested'
                ? 'bg-orange-700 text-white shadow-xs'
                : 'bg-orange-50 text-orange-950 hover:bg-orange-100 border border-orange-200'
            }`}
          >
            <RotateCcw className="w-3 h-3" />
            <span>সংশোধনে পাঠানো ({countCorrection})</span>
          </button>
          <button
            onClick={() => setSelectedStatus('suspended')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              selectedStatus === 'suspended'
                ? 'bg-rose-800 text-white shadow-xs'
                : 'bg-rose-50 text-rose-900 hover:bg-rose-100 border border-rose-200'
            }`}
          >
            <AlertTriangle className="w-3 h-3" />
            <span>স্থগিত / বাতিল ({countSuspended})</span>
          </button>
        </div>

        {/* Filter Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-stone-100 text-xs">
          
          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="নাম, আইডি, মোবাইল, প্রতিষ্ঠান..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-stone-50"
            />
          </div>

          {/* User Category Filter (§3) */}
          <div className="flex items-center gap-2">
            <span className="text-stone-500 whitespace-nowrap">শ্রেণি:</span>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full p-1.5 rounded-xl border border-stone-300 bg-white font-medium focus:outline-none focus:ring-1 focus:ring-emerald-700"
            >
              <option value="all">সকল ব্যবহারকারীর ধরন</option>
              <option value="farmer">১. উৎপাদক / কৃষক</option>
              <option value="supplier">২. বিক্রেতা / সরবরাহকারী</option>
              <option value="buyer">৩. পাইকারি ক্রেতা</option>
              <option value="entrepreneur">৪. ব্যক্তিগত উদ্যোক্তা</option>
            </select>
          </div>

          {/* District Filter */}
          <div className="flex items-center gap-2">
            <span className="text-stone-500 whitespace-nowrap">জেলা:</span>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full p-1.5 rounded-xl border border-stone-300 bg-white font-medium focus:outline-none focus:ring-1 focus:ring-emerald-700"
            >
              <option value="all">সকল জেলা</option>
              <option value="রাঙামাটি">রাঙামাটি</option>
              <option value="খাগড়াছড়ি">খাগড়াছড়ি</option>
              <option value="বান্দরবান">বান্দরবান</option>
              <option value="ঢাকা">ঢাকা ও অন্যান্য</option>
            </select>
          </div>

          {/* Reset Filters */}
          <div className="flex items-center justify-end">
            {(searchQuery || selectedRole !== 'all' || selectedStatus !== 'all' || selectedDistrict !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedRole('all');
                  setSelectedStatus('all');
                  setSelectedDistrict('all');
                }}
                className="text-stone-500 hover:text-stone-800 text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>ফিল্টার মুছুন</span>
              </button>
            )}
          </div>

        </div>

      </div>

      {/* 2. User Directory Table (§3) */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        
        {filteredUsers.length === 0 ? (
          <div className="py-16 text-center text-stone-400 text-xs space-y-2">
            <Users className="w-8 h-8 mx-auto opacity-30 text-stone-500" />
            <p>আপনার অনুসন্ধানে কোনো ব্যবহারকারী পাওয়া যায়নি।</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-stone-50/80 border-b border-stone-200 text-stone-600 font-bold">
                  <th className="py-3 px-4">আইডি ও ব্যবহারকারী</th>
                  <th className="py-3 px-3">প্রতিষ্ঠান ও ধরন</th>
                  <th className="py-3 px-3">যোগাযোগ (মোবাইল/ইমেইল)</th>
                  <th className="py-3 px-3">এলাকা (জেলা/উপজেলা)</th>
                  <th className="py-3 px-3">নিবন্ধন তারিখ</th>
                  <th className="py-3 px-3 text-center">যাচাইয়ের অবস্থা</th>
                  <th className="py-3 px-4 text-right">কার্যক্রম</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredUsers.map((u) => {
                  const isActionable = u.verificationStatus === 'pending_verification' || u.verificationStatus === 'under_review';
                  
                  return (
                    <tr key={u.id} className="hover:bg-stone-50/60 transition-colors">
                      
                      {/* ID & User */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <img 
                            src={u.avatar} 
                            alt={u.name} 
                            className="w-9 h-9 rounded-xl object-cover border border-stone-200 shrink-0" 
                          />
                          <div>
                            <div className="font-bold text-stone-900 text-xs">{u.name}</div>
                            <span className="font-mono text-[10px] text-emerald-900 font-semibold bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                              {u.memberId}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Business & Category */}
                      <td className="py-3.5 px-3">
                        <div className="font-semibold text-stone-800">{u.businessName}</div>
                        <span className="text-[10px] text-stone-500">
                          {u.roleLabel}
                        </span>
                      </td>

                      {/* Contact */}
                      <td className="py-3.5 px-3">
                        <div className="font-mono text-stone-800">{u.mobile}</div>
                        <div className="text-[10px] text-stone-400 font-mono truncate max-w-[140px]">{u.email}</div>
                      </td>

                      {/* District & Upazila */}
                      <td className="py-3.5 px-3">
                        <span className="font-bold text-stone-800">{u.district}</span>
                        <div className="text-[10px] text-stone-500">{u.upazila}</div>
                      </td>

                      {/* Joined Date */}
                      <td className="py-3.5 px-3 text-stone-500 whitespace-nowrap">
                        {u.joinedDate}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-3 text-center">
                        {getStatusBadge(u.verificationStatus)}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          
                          {/* Quick Verify / Action Modal trigger */}
                          <button
                            onClick={() => setActiveUserForModal(u)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                              isActionable
                                ? 'bg-emerald-800 hover:bg-emerald-900 text-white shadow-xs'
                                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                            }`}
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>{isActionable ? 'যাচাই ও সিদ্ধান্ত' : 'বিস্তারিত'}</span>
                          </button>

                          {/* Profile management modal trigger */}
                          {onViewUserProfile && (
                            <button
                              onClick={() => onViewUserProfile(u)}
                              title="পূর্ণাঙ্গ প্রোফাইল ও অডিট"
                              className="px-2 py-1.5 border border-stone-200 hover:bg-stone-100 text-stone-600 rounded-lg cursor-pointer"
                            >
                              প্রোফাইল
                            </button>
                          )}

                        </div>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

      </div>

      {/* 3. Integrated Verification Modal */}
      <UserVerificationModal
        user={activeUserForModal}
        isOpen={!!activeUserForModal}
        onClose={() => setActiveUserForModal(null)}
        onExecuteAction={(userId, action, reason, notes) => {
          onUpdateUserVerification(userId, action, reason, notes);
          // Update the locally active user view
          if (activeUserForModal && activeUserForModal.id === userId) {
            setActiveUserForModal(null);
          }
        }}
      />

    </div>
  );
};
