import React, { useState } from 'react';
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  Edit3, 
  Save, 
  Camera, 
  Building2, 
  Calendar,
  AlertCircle
} from 'lucide-react';
import { UserSession } from '../../types';
import { CHT_DISTRICTS_DATA } from '../../data/products';

interface ProfileModuleProps {
  user: UserSession;
  onUpdateUser: (updatedUser: UserSession) => void;
}

export const ProfileModule: React.FC<ProfileModuleProps> = ({ user, onUpdateUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [mobile, setMobile] = useState(user.mobile);
  const [email, setEmail] = useState(user.email);
  const [district, setDistrict] = useState(user.district);
  const [upazila, setUpazila] = useState(user.upazila);
  const [address, setAddress] = useState(user.address);
  const [bio, setBio] = useState(user.bio || '');
  const [businessName, setBusinessName] = useState(user.businessName || '');
  const [successToast, setSuccessToast] = useState(false);

  const handleDistrictChange = (dName: string) => {
    setDistrict(dName);
    const found = CHT_DISTRICTS_DATA.find(d => d.district === dName);
    setUpazila(found?.upazilas[0] || 'সদর');
  };

  const currentUpazilas = CHT_DISTRICTS_DATA.find(d => d.district === district)?.upazilas || ['সদর'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserSession = {
      ...user,
      name,
      mobile,
      email,
      district,
      upazila,
      address,
      bio,
      businessName
    };
    onUpdateUser(updated);
    setIsEditing(false);
    setSuccessToast(true);
    setTimeout(() => setSuccessToast(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in">
      
      {/* Toast Notification */}
      {successToast && (
        <div className="p-4 rounded-xl bg-emerald-800 text-white text-xs font-semibold flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-300" />
            <span>প্রোফাইল তথ্য সফলভাবে হালনাগাদ করা হয়েছে!</span>
          </div>
        </div>
      )}

      {/* Profile Overview Card */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        
        {/* Cover Strip */}
        <div className="h-28 bg-gradient-to-r from-emerald-950 via-emerald-800 to-stone-900"></div>

        <div className="px-6 pb-6 pt-4 relative flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="flex items-end gap-4">
            <div className="w-24 h-24 -mt-14 rounded-2xl bg-white p-1 shadow-lg border border-stone-200 shrink-0 relative">
              <div className="w-full h-full rounded-xl bg-gradient-to-br from-emerald-800 to-emerald-950 text-amber-300 flex items-center justify-center font-bold text-3xl font-brand">
                {name.slice(0, 2)}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900">{name}</h2>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  মন্ত্রণালয় যাচাইকৃত প্রোফাইল
                </span>
              </div>

              <div className="text-xs text-stone-500 mt-1 flex items-center gap-2 flex-wrap">
                <span>মেম্বার আইডি: <strong>{user.memberId}</strong></span>
                <span>·</span>
                <span className="capitalize font-semibold text-emerald-900">
                  {user.role === 'farmer' && 'উৎপাদক / কৃষক'}
                  {user.role === 'supplier' && 'বিক্রেতা / সরবরাহকারী'}
                  {user.role === 'buyer' && 'পাইকারি ক্রেতা'}
                  {user.role === 'entrepreneur' && 'ব্যক্তিগত উদ্যোক্তা'}
                </span>
                <span>·</span>
                <span>যোগদান: {user.joinedDate}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 text-xs font-bold rounded-xl border transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-300"
          >
            <Edit3 className="w-3.5 h-3.5 text-emerald-800" />
            <span>{isEditing ? 'সম্পাদনা বাতিল' : 'প্রোফাইল সম্পাদনা করুন'}</span>
          </button>
        </div>

        {/* View mode details */}
        {!isEditing ? (
          <div className="p-6 border-t border-stone-200 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="space-y-3">
              <div>
                <span className="text-stone-400 block text-[11px]">ব্যবসা বা প্রতিষ্ঠানের নাম:</span>
                <span className="text-sm font-bold text-stone-900">{businessName || 'ব্যক্তিগত প্রোফাইল'}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[11px]">মোবাইল নম্বর:</span>
                <span className="text-sm font-semibold text-stone-800">{mobile}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[11px]">ই-মেইল:</span>
                <span className="text-sm font-semibold text-stone-800">{email || 'যুক্ত করা হয়নি'}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-stone-400 block text-[11px]">জেলা ও উপজেলা:</span>
                <span className="text-sm font-bold text-stone-900">{upazila}, {district}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[11px]">বিস্তারিত ঠিকানা:</span>
                <span className="text-sm text-stone-700">{address}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[11px]">সংক্ষিপ্ত বিবরণী (Bio):</span>
                <span className="text-sm text-stone-700">{bio || 'কোনো বিবরণ যোগ করা হয়নি'}</span>
              </div>
            </div>
          </div>
        ) : (
          /* Edit mode form */
          <form onSubmit={handleSubmit} className="p-6 border-t border-stone-200 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">পূর্ণ নাম</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">ব্যবসা প্রতিষ্ঠানের নাম</label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">মোবাইল নম্বর</label>
                <input
                  type="tel"
                  required
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">ই-মেইল</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">জেলা</label>
                <select
                  value={district}
                  onChange={(e) => handleDistrictChange(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700"
                >
                  <option value="বান্দরবান">বান্দরবান</option>
                  <option value="রাঙামাটি">রাঙামাটি</option>
                  <option value="খাগড়াছড়ি">খাগড়াছড়ি</option>
                  <option value="চট্টগ্রাম">চট্টগ্রাম</option>
                  <option value="ঢাকা">ঢাকা</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">উপজেলা</label>
                <select
                  value={upazila}
                  onChange={(e) => setUpazila(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700"
                >
                  {currentUpazilas.map(u => (
                    <option key={u} value={u}>{u}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-stone-700 mb-1">ঠিকানা</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-stone-700 mb-1">সংক্ষিপ্ত পরিচিতি ও অভিজ্ঞতা (Bio)</label>
                <textarea
                  rows={2}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-stone-200">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-xs font-semibold text-stone-600 rounded-lg hover:bg-stone-100"
              >
                বাতিল
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Save className="w-3.5 h-3.5 text-amber-300" />
                <span>পরিবর্তন সংরক্ষণ করুন</span>
              </button>
            </div>
          </form>
        )}

      </div>

      {/* Ministry Trust Assurance */}
      <div className="p-4 rounded-xl bg-stone-100 border border-stone-200 flex items-center gap-3 text-xs text-stone-600">
        <ShieldCheck className="w-5 h-5 text-emerald-800 shrink-0" />
        <span>
          আপনার প্রোফাইল জাতীয় ডিজিটাল পরিচয়পত্রের সাথে যুক্ত। আপনার যোগাযোগের তথ্য সুরক্ষিত ও এনক্রিপ্ট রাখা হয়।
        </span>
      </div>

    </div>
  );
};
