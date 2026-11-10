import React, { useState } from 'react';
import { 
  Sprout, 
  Truck, 
  Building2, 
  Store, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle,
  Eye,
  EyeOff,
  User,
  Phone,
  Mail,
  Lock,
  MapPin,
  Mountain
} from 'lucide-react';
import { AccountType, PageView } from '../types';
import { CHT_DISTRICTS_DATA } from '../data/products';

interface RegistrationPageProps {
  onNavigate: (page: PageView) => void;
  defaultRole?: AccountType;
  onRegisterSuccess?: (role: AccountType) => void;
}

export const RegistrationPage: React.FC<RegistrationPageProps> = ({ 
  onNavigate, 
  defaultRole = 'farmer',
  onRegisterSuccess 
}) => {
  const [selectedRole, setSelectedRole] = useState<AccountType>(defaultRole);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    password: '',
    confirmPassword: '',
    district: 'বান্দরবান',
    upazila: 'বান্দরবান সদর',
    address: '',
    agreedToTerms: false,

    // Farmer specific
    landType: 'জুম ও পাহাড়ি ঢাল',
    primaryCrops: 'আনারস ও পাহাড়ি ফলমূল',
    annualCapacity: '২০-৫০ মেট্রিক টন',
    farmerCardNumber: '',

    // Supplier specific
    businessName: '',
    tradeLicense: '',
    storageLocation: '',
    deliveryCoverage: 'পার্বত্য জেলা ও চট্টগ্রাম অঞ্চল',

    // Wholesale Buyer specific
    companyName: '',
    purchaseFrequency: 'সাপ্তাহিক বাল্ক লট',
    estimatedMonthlyVolume: '৫০-১০০ মণ',
    tinNumber: '',

    // Entrepreneur specific
    shopName: '',
    craftSpecialty: 'কোমর তাঁতের পোশাক ও পাহাড়ি শাল',
    socialMediaLink: ''
  });

  // Handle District Change & Update Upazilas
  const handleDistrictChange = (districtName: string) => {
    const found = CHT_DISTRICTS_DATA.find((d) => d.district === districtName);
    const newUpazila = found?.upazilas[0] || 'সদর';
    setFormData((prev) => ({
      ...prev,
      district: districtName,
      upazila: newUpazila
    }));
  };

  const currentUpazilas = CHT_DISTRICTS_DATA.find((d) => d.district === formData.district)?.upazilas || [
    'সদর',
    'উপজেলা ১',
    'উপজেলা ২'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.fullName.trim()) {
      setErrorMessage('অনুগ্রহ করে আপনার পূর্ণ নাম লিখুন');
      return;
    }
    if (!formData.mobile.trim() || formData.mobile.length < 11) {
      setErrorMessage('একটি সঠিক ১১ ডিজিটের মোবাইল নম্বর প্রদান করুন');
      return;
    }
    if (formData.password.length < 6) {
      setErrorMessage('পাসওয়ার্ড ন্যূনতম ৬ অক্ষরের হতে হবে');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('পাসওয়ার্ড এবং পাসওয়ার্ড নিশ্চিতকরণ মিলছে না');
      return;
    }
    if (!formData.agreedToTerms) {
      setErrorMessage('প্ল্যাটফর্মের শর্তাবলি ও নীতিমালায় সম্মতি প্রদান করুন');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccessModalOpen(true);
    }, 1200);
  };

  const accountTypesConfig = [
    {
      id: 'farmer' as AccountType,
      title: 'উৎপাদক / কৃষক',
      desc: 'পাহাড়ের ফলমূল, মসলা, জুম চাষী ও কৃষি খামারি',
      icon: Sprout,
      badge: 'কৃষি সংযোগ'
    },
    {
      id: 'supplier' as AccountType,
      title: 'বিক্রেতা / সরবরাহকারী',
      desc: 'কৃষিপণ্য সরবরাহকারী, স্থানীয় আড়তদার ও সমবায়',
      icon: Truck,
      badge: 'লজিস্টিকস ও সাপ্লাই'
    },
    {
      id: 'buyer' as AccountType,
      title: 'পাইকারি ক্রেতা',
      desc: 'করপোরেট প্রতিষ্ঠান, সুপারশপ ও বাল্ক পাইকার',
      icon: Building2,
      badge: 'B2B ট্রেডার্স'
    },
    {
      id: 'entrepreneur' as AccountType,
      title: 'ব্যক্তিগত উদ্যোক্তা',
      desc: 'হস্তশিল্প, ঐতিহ্যবাহী বস্ত্র ও কুটির শিল্প কারিগর',
      icon: Store,
      badge: 'অনলাইন শপ'
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Navigation Breadcrumb / Top Bar */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-stone-200">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-stone-600 hover:text-emerald-900 transition-colors text-sm font-medium cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-800 text-white flex items-center justify-center">
              <Mountain className="w-4 h-4 text-amber-400" />
            </div>
            <span>হোম পেজে ফিরে যান</span>
          </button>

          <div className="text-xs text-stone-500">
            ইতিমধ্যে অ্যাকাউন্ট আছে?{' '}
            <button
              onClick={() => onNavigate('login')}
              className="font-bold text-emerald-800 hover:underline cursor-pointer ml-1"
            >
              লগইন করুন
            </button>
          </div>
        </div>

        {/* Page Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-semibold text-emerald-800 tracking-wider">
            সদস্য নিবন্ধন ফোরাম
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 mt-1">
            Hill eCommerce-এ অ্যাকাউন্ট তৈরি করুন
          </h1>
          <p className="text-sm text-stone-600 mt-2">
            পার্বত্য চট্টগ্রাম বিষয়ক মন্ত্রণালয়ের তত্ত্বাবধানে নিরাপদ বাণিজ্যের অংশ হোন
          </p>
        </div>

        {/* Step 1: Account Type Selection */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-bold text-stone-900">
              ধাপ ১: আপনার অ্যাকাউন্টের ধরন নির্বাচন করুন
            </span>
            <span className="text-xs text-emerald-800 font-semibold">
              চারটি বিকল্প
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {accountTypesConfig.map((item) => {
              const Icon = item.icon;
              const isSelected = selectedRole === item.id;
              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setSelectedRole(item.id)}
                  className={`p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-white border-emerald-700 shadow-md ring-2 ring-emerald-600/20'
                      : 'bg-white/80 border-stone-200 hover:border-stone-300 hover:bg-white'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          isSelected
                            ? 'bg-emerald-900 text-amber-300'
                            : 'bg-stone-100 text-stone-700'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                      )}
                    </div>
                    <div className="font-bold text-stone-900 text-sm">
                      {item.title}
                    </div>
                    <p className="text-[11px] text-stone-500 mt-1 leading-snug">
                      {item.desc}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-stone-100 text-[10px] font-semibold text-emerald-800">
                    {item.badge}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Dynamic Registration Form */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-lg p-6 sm:p-8">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-200">
            <div>
              <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
                ধাপ ২: বিস্তারিত তথ্য পূরণ
              </span>
              <h2 className="text-lg font-bold text-stone-900 mt-0.5">
                {selectedRole === 'farmer' && 'কৃষক / উৎপাদক নিবন্ধন ফরম'}
                {selectedRole === 'supplier' && 'সরবরাহকারী নিবন্ধন ফরম'}
                {selectedRole === 'buyer' && 'পাইকারি ক্রেতা নিবন্ধন ফরম'}
                {selectedRole === 'entrepreneur' && 'অনলাইন শপ উদ্যোক্তা নিবন্ধন ফরম'}
              </h2>
            </div>
            <div className="px-3 py-1 rounded-md bg-stone-100 text-stone-700 text-xs font-medium">
              সব তথ্য বাংলায় বা ইংরেজিতে লিখুন
            </div>
          </div>

          {errorMessage && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-2.5 text-xs text-rose-800">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* General Info Section */}
            <div>
              <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-4">
                সাধারণ তথ্য (General Details)
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    পূর্ণ নাম <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="যেমন: মং শৈ প্রু চৌধুরী / কামাল হোসেন"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full text-xs sm:text-sm pl-9 pr-3 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700 focus:border-emerald-700 bg-stone-50/50"
                    />
                  </div>
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    মোবাইল নম্বর <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="০১৭১১-XXXXXX"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      className="w-full text-xs sm:text-sm pl-9 pr-3 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700 focus:border-emerald-700 bg-stone-50/50"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    ই-মেইল ঠিকানা (ঐচ্ছিক)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      placeholder="example@mail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full text-xs sm:text-sm pl-9 pr-3 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700 focus:border-emerald-700 bg-stone-50/50"
                    />
                  </div>
                </div>

                {/* District */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    জেলা <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.district}
                    onChange={(e) => handleDistrictChange(e.target.value)}
                    className="w-full text-xs sm:text-sm px-3 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-stone-50/50 font-medium"
                  >
                    <option value="বান্দরবান">বান্দরবান (পার্বত্য জেলা)</option>
                    <option value="রাঙামাটি">রাঙামাটি (পার্বত্য জেলা)</option>
                    <option value="খাগড়াছড়ি">খাগড়াছড়ি (পার্বত্য জেলা)</option>
                    <option value="চট্টগ্রাম">চট্টগ্রাম</option>
                    <option value="ঢাকা">ঢাকা</option>
                  </select>
                </div>

                {/* Upazila (Dynamic based on selected district) */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    উপজেলা / থানা <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.upazila}
                    onChange={(e) => setFormData({ ...formData, upazila: e.target.value })}
                    className="w-full text-xs sm:text-sm px-3 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-stone-50/50 font-medium"
                  >
                    {currentUpazilas.map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Detailed Address */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    গ্রাম / ইউনিয়ন / বিস্তারিত ঠিকানা
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="রোড, পাড়া, পোস্ট কোড"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full text-xs sm:text-sm pl-9 pr-3 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-stone-50/50"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    পাসওয়ার্ড <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="কমপক্ষে ৬ অক্ষর"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full text-xs sm:text-sm pl-9 pr-10 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-stone-50/50"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    পাসওয়ার্ড নিশ্চিতকরণ <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      placeholder="পুনরায় পাসওয়ার্ড লিখুন"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="w-full text-xs sm:text-sm pl-9 pr-10 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-stone-50/50"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Role-Specific Additional Fields */}
            <div className="pt-4 border-t border-stone-200">
              <h3 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-4">
                নির্বাচিত অ্যাকাউন্টের অতিরিক্ত তথ্য (
                {selectedRole === 'farmer' && 'কৃষক ও চাষী'}
                {selectedRole === 'supplier' && 'সরবরাহকারী'}
                {selectedRole === 'buyer' && 'পাইকারি ক্রেতা'}
                {selectedRole === 'entrepreneur' && 'ব্যক্তিগত অনলাইন শপ'}
                )
              </h3>

              {/* FARMER FIELDS */}
              {selectedRole === 'farmer' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      জমির ধরন / খামার বিবরণ
                    </label>
                    <select
                      value={formData.landType}
                      onChange={(e) => setFormData({ ...formData, landType: e.target.value })}
                      className="w-full text-xs sm:text-sm px-3 py-2.5 rounded-lg border border-stone-300 bg-stone-50/50"
                    >
                      <option value="জুম ও পাহাড়ি ঢাল">জুম ও পাহাড়ি ঢাল</option>
                      <option value="সমতল কৃষি জমি">সমতল কৃষি জমি</option>
                      <option value="ফলের স্থায়ী বাগান / অর্চার্ড">ফলের স্থায়ী বাগান / অর্চার্ড</option>
                      <option value="বনজ ও মৌমাছি পালন ক্ষেত্র">বনজ ও মৌমাছি পালন ক্ষেত্র</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      প্রধান উৎপাদিত ফসল
                    </label>
                    <input
                      type="text"
                      placeholder="যেমন: আনারস, হলুদ, আদা, কলা"
                      value={formData.primaryCrops}
                      onChange={(e) => setFormData({ ...formData, primaryCrops: e.target.value })}
                      className="w-full text-xs sm:text-sm px-3 py-2.5 rounded-lg border border-stone-300 bg-stone-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      বার্ষিক সম্ভাব্য উৎপাদন ক্ষমতা
                    </label>
                    <input
                      type="text"
                      placeholder="যেমন: ৫০ টন বা ১০,০০০ পিস"
                      value={formData.annualCapacity}
                      onChange={(e) => setFormData({ ...formData, annualCapacity: e.target.value })}
                      className="w-full text-xs sm:text-sm px-3 py-2.5 rounded-lg border border-stone-300 bg-stone-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      কৃষি কার্ড / সমবায় সমিতি নম্বর (ঐচ্ছিক)
                    </label>
                    <input
                      type="text"
                      placeholder="দাখিল করলে ভেরিফাইড ব্যাজ পাবেন"
                      value={formData.farmerCardNumber}
                      onChange={(e) => setFormData({ ...formData, farmerCardNumber: e.target.value })}
                      className="w-full text-xs sm:text-sm px-3 py-2.5 rounded-lg border border-stone-300 bg-stone-50/50"
                    />
                  </div>
                </div>
              )}

              {/* SUPPLIER FIELDS */}
              {selectedRole === 'supplier' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      ব্যবসা প্রতিষ্ঠানের নাম <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="যেমন: চেঙ্গী ভ্যালি এগ্রো ট্রেডার্স"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="w-full text-xs sm:text-sm px-3 py-2.5 rounded-lg border border-stone-300 bg-stone-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      ট্রেড লাইসেন্স নম্বর (ঐচ্ছিক)
                    </label>
                    <input
                      type="text"
                      placeholder="TRAD/CHT/2026/XXXX"
                      value={formData.tradeLicense}
                      onChange={(e) => setFormData({ ...formData, tradeLicense: e.target.value })}
                      className="w-full text-xs sm:text-sm px-3 py-2.5 rounded-lg border border-stone-300 bg-stone-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      গোডাউন / প্যাকিং সেন্টারের অবস্থান
                    </label>
                    <input
                      type="text"
                      placeholder="যেমন: রুমা বাজার রোড, বান্দরবান"
                      value={formData.storageLocation}
                      onChange={(e) => setFormData({ ...formData, storageLocation: e.target.value })}
                      className="w-full text-xs sm:text-sm px-3 py-2.5 rounded-lg border border-stone-300 bg-stone-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      সরবরাহের আওতাভুক্ত অঞ্চল
                    </label>
                    <input
                      type="text"
                      placeholder="যেমন: সমগ্র পার্বত্য জেলা ও ঢাকা-চট্টগ্রাম"
                      value={formData.deliveryCoverage}
                      onChange={(e) => setFormData({ ...formData, deliveryCoverage: e.target.value })}
                      className="w-full text-xs sm:text-sm px-3 py-2.5 rounded-lg border border-stone-300 bg-stone-50/50"
                    />
                  </div>
                </div>
              )}

              {/* WHOLESALE BUYER FIELDS */}
              {selectedRole === 'buyer' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      কোম্পানি / আড়ত / সুপারশপের নাম <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="যেমন: বেঙ্গল সুপারমার্কেট / এগ্রো প্রসেসিং লিমিটেড"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full text-xs sm:text-sm px-3 py-2.5 rounded-lg border border-stone-300 bg-stone-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      ক্রয়ের ধরন ও পুনরাবৃত্তি
                    </label>
                    <select
                      value={formData.purchaseFrequency}
                      onChange={(e) => setFormData({ ...formData, purchaseFrequency: e.target.value })}
                      className="w-full text-xs sm:text-sm px-3 py-2.5 rounded-lg border border-stone-300 bg-stone-50/50"
                    >
                      <option value="সাপ্তাহিক বাল্ক লট">সাপ্তাহিক বাল্ক লট</option>
                      <option value="মাসিক চুক্তিভিত্তিক সাপ্লাই">মাসিক চুক্তিভিত্তিক সাপ্লাই</option>
                      <option value="মৌসুমী পূর্ণাঙ্গ হার্ভেস্ট ক্রয়">মৌসুমী পূর্ণাঙ্গ হার্ভেস্ট ক্রয়</option>
                      <option value="অন-ডিমান্ড পাইকারি অর্ডার">অন-ডিমান্ড পাইকারি অর্ডার</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      আনুমানিক মাসিক ক্রয়ের পরিমাণ (ভলিউম)
                    </label>
                    <input
                      type="text"
                      placeholder="যেমন: ১০০-৫০০ মণ বা ৫-১০ লক্ষ টাকা"
                      value={formData.estimatedMonthlyVolume}
                      onChange={(e) => setFormData({ ...formData, estimatedMonthlyVolume: e.target.value })}
                      className="w-full text-xs sm:text-sm px-3 py-2.5 rounded-lg border border-stone-300 bg-stone-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      ই-টিন নম্বর / করপোরেট রেজিস্ট্রেশন (ঐচ্ছিক)
                    </label>
                    <input
                      type="text"
                      placeholder="করপোরেট এসক্রো অ্যাকাউন্টের জন্য সহায়ক"
                      value={formData.tinNumber}
                      onChange={(e) => setFormData({ ...formData, tinNumber: e.target.value })}
                      className="w-full text-xs sm:text-sm px-3 py-2.5 rounded-lg border border-stone-300 bg-stone-50/50"
                    />
                  </div>
                </div>
              )}

              {/* INDIVIDUAL ENTREPRENEUR FIELDS */}
              {selectedRole === 'entrepreneur' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      অনলাইন শপের প্রস্তাবিত নাম <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="যেমন: মারমা ক্রাফট স্টুডিও"
                      value={formData.shopName}
                      onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
                      className="w-full text-xs sm:text-sm px-3 py-2.5 rounded-lg border border-stone-300 bg-stone-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      দোকানের প্রধান পণ্যের বিশেষত্ব
                    </label>
                    <input
                      type="text"
                      placeholder="যেমন: কোমর তাঁতের শাল, বাঁশের নকশী পণ্য"
                      value={formData.craftSpecialty}
                      onChange={(e) => setFormData({ ...formData, craftSpecialty: e.target.value })}
                      className="w-full text-xs sm:text-sm px-3 py-2.5 rounded-lg border border-stone-300 bg-stone-50/50"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      ফেসবুক পেজ / সোশ্যাল মিডিয়া লিংক (ঐচ্ছিক)
                    </label>
                    <input
                      type="url"
                      placeholder="facebook.com/your-hill-craft-shop"
                      value={formData.socialMediaLink}
                      onChange={(e) => setFormData({ ...formData, socialMediaLink: e.target.value })}
                      className="w-full text-xs sm:text-sm px-3 py-2.5 rounded-lg border border-stone-300 bg-stone-50/50"
                    />
                  </div>
                </div>
              )}

            </div>

            {/* Terms & Conditions Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.agreedToTerms}
                  onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
                  className="mt-1 rounded-sm text-emerald-800 focus:ring-emerald-700"
                />
                <span className="text-xs text-stone-600 leading-relaxed">
                  আমি পার্বত্য চট্টগ্রাম বিষয়ক মন্ত্রণালয় কর্তৃক পরিচালিত <strong>Hill eCommerce</strong>-এর নীতিমালা, নিরাপদ এসক্রো টার্মস এবং ডিজিটাল কোড অব কন্ডাক্ট মেনে চলতে সম্মতি জ্ঞাপন করছি।
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 text-sm font-bold text-white bg-emerald-800 hover:bg-emerald-900 active:scale-98 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span>যাচাই করা হচ্ছে...</span>
                ) : (
                  <>
                    <span>নিবন্ধন সম্পন্ন করুন</span>
                    <ArrowRight className="w-4 h-4 text-amber-300" />
                  </>
                )}
              </button>

              <div className="text-xs text-stone-500 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>আপনার সকল তথ্য সরকারি সার্ভারে সুরক্ষিত থাকবে</span>
              </div>
            </div>

          </form>
        </div>

      </div>

      {/* Registration Success Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 text-center animate-in fade-in zoom-in-95">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center mb-4">
              <CheckCircle2 className="w-9 h-9 text-emerald-700" />
            </div>

            <h3 className="text-2xl font-bold text-stone-900">
              নিবন্ধন সফল হয়েছে!
            </h3>
            
            <p className="text-sm text-stone-600 mt-2">
              অভিনন্দন <strong className="text-stone-900">{formData.fullName}</strong>। Hill eCommerce ডিজিটাল প্ল্যাটফর্মে আপনার অ্যাকাউন্ট সফলভাবে সংরক্ষিত হয়েছে।
            </p>

            {/* Summary info box */}
            <div className="my-5 p-4 rounded-xl bg-stone-50 border border-stone-200 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-stone-500">অ্যাকাউন্টের ধরন:</span>
                <span className="font-bold text-emerald-900">
                  {selectedRole === 'farmer' && 'উৎপাদক / কৃষক'}
                  {selectedRole === 'supplier' && 'বিক্রেতা / সরবরাহকারী'}
                  {selectedRole === 'buyer' && 'পাইকারি ক্রেতা'}
                  {selectedRole === 'entrepreneur' && 'ব্যক্তিগত উদ্যোক্তা'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">মোবাইল নম্বর:</span>
                <span className="font-semibold text-stone-800">{formData.mobile}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">এলাকা:</span>
                <span className="font-semibold text-stone-800">{formData.upazila}, {formData.district}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-stone-200">
                <span className="text-stone-500">প্রস্তাবিত মেম্বার আইডি:</span>
                <span className="font-mono font-bold text-emerald-800">
                  HC-{formData.district.slice(0, 3).toUpperCase()}-2026-784
                </span>
              </div>
            </div>

            <div className="space-y-2.5">
              <button
                onClick={() => {
                  if (onRegisterSuccess) {
                    onRegisterSuccess(selectedRole);
                  } else {
                    onNavigate('login');
                  }
                }}
                className="w-full py-3 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>এখনই ড্যাশবোর্ডে প্রবেশ করুন</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>

              <button
                onClick={() => onNavigate('home')}
                className="w-full py-2.5 text-xs font-semibold text-stone-600 hover:text-stone-900 cursor-pointer"
              >
                হোমপেজে ফিরে যান
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
