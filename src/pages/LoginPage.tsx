import React, { useState } from 'react';
import { 
  Mountain, 
  Phone, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  X
} from 'lucide-react';
import { PageView, AccountType } from '../types';

interface LoginPageProps {
  onNavigate: (page: PageView) => void;
  onLoginSuccess: (role: AccountType) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate, onLoginSuccess }) => {
  const [identifier, setIdentifier] = useState('01818-456789');
  const [password, setPassword] = useState('farmer1234');
  const [selectedRole, setSelectedRole] = useState<AccountType>('farmer');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Forgot password modal state
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [forgotIdentifier, setForgotIdentifier] = useState('');
  const [forgotSubmitted, setForgotSubmitted] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!identifier.trim()) {
      setErrorMessage('মোবাইল নম্বর অথবা ই-মেইল ঠিকানা লিখুন');
      return;
    }
    if (!password.trim()) {
      setErrorMessage('আপনার পাসওয়ার্ড প্রদান করুন');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setLoginSuccess(true);
      setTimeout(() => {
        onLoginSuccess(selectedRole);
      }, 700);
    }, 600);
  };

  const handleDemoFill = (role: AccountType) => {
    setSelectedRole(role);
    if (role === 'farmer') {
      setIdentifier('01818-456789');
      setPassword('farmer1234');
    } else if (role === 'supplier') {
      setIdentifier('01711-876543');
      setPassword('supplier1234');
    } else if (role === 'buyer') {
      setIdentifier('tanveer.procure@bengalagro.com');
      setPassword('buyer1234');
    } else {
      setIdentifier('01825-998877');
      setPassword('crafts1234');
    }
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotIdentifier.trim()) return;
    setForgotSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto space-y-6">
        
        {/* Top return link */}
        <div className="flex items-center justify-between pb-2">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-emerald-900 transition-colors cursor-pointer"
          >
            <div className="w-7 h-7 rounded-lg bg-emerald-800 text-white flex items-center justify-center">
              <Mountain className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <span>হোমে ফিরে যান</span>
          </button>

          <span className="text-xs text-stone-500">
            সরকারি ডিজিটাল পোর্টাল
          </span>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-xl p-7 sm:p-8 space-y-6">
          
          {/* Header Brand */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-950 text-white mx-auto flex items-center justify-center shadow-md">
              <Mountain className="w-6 h-6 text-amber-400" />
            </div>
            <h1 className="text-2xl font-bold text-stone-900 tracking-tight">
              Hill <span className="text-amber-700">eCommerce</span>
            </h1>
            <p className="text-xs text-stone-600">
              আপনার অ্যাকাউন্টে প্রবেশ করতে তথ্য প্রদান করুন
            </p>
          </div>

          {/* Quick Demo Credentials Assistant for all 4 roles */}
          <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs text-stone-700 space-y-2.5">
            <div className="font-bold text-emerald-950 flex items-center justify-between">
              <span>সহজে পরীক্ষার জন্য ডেমো রোল নির্বাচন:</span>
              <span className="text-[10px] text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-300">
                এক ক্লিকে ফিল
              </span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => handleDemoFill('farmer')}
                className={`py-1.5 px-2 rounded-lg border text-[11px] font-semibold transition-all cursor-pointer text-center ${
                  selectedRole === 'farmer'
                    ? 'bg-emerald-900 text-white border-emerald-900'
                    : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                }`}
              >
                ১. উৎপাদক / কৃষক
              </button>
              <button
                type="button"
                onClick={() => handleDemoFill('supplier')}
                className={`py-1.5 px-2 rounded-lg border text-[11px] font-semibold transition-all cursor-pointer text-center ${
                  selectedRole === 'supplier'
                    ? 'bg-emerald-900 text-white border-emerald-900'
                    : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                }`}
              >
                ২. বিক্রেতা / সরবরাহকারী
              </button>
              <button
                type="button"
                onClick={() => handleDemoFill('buyer')}
                className={`py-1.5 px-2 rounded-lg border text-[11px] font-semibold transition-all cursor-pointer text-center ${
                  selectedRole === 'buyer'
                    ? 'bg-emerald-900 text-white border-emerald-900'
                    : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                }`}
              >
                ৩. পাইকারি ক্রেতা
              </button>
              <button
                type="button"
                onClick={() => handleDemoFill('entrepreneur')}
                className={`py-1.5 px-2 rounded-lg border text-[11px] font-semibold transition-all cursor-pointer text-center ${
                  selectedRole === 'entrepreneur'
                    ? 'bg-emerald-900 text-white border-emerald-900'
                    : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                }`}
              >
                ৪. ব্যক্তিগত উদ্যোক্তা
              </button>
            </div>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-2 text-xs text-rose-800">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {loginSuccess ? (
            <div className="py-8 text-center space-y-4 animate-in fade-in">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-700" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-stone-900">লগইন সফল হয়েছে!</h3>
                <p className="text-xs text-stone-600 mt-1">
                  আপনার নির্দিষ্ট ড্যাশবোর্ডে নিয়ে যাওয়া হচ্ছে...
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              
              {/* Mobile / Email Input */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  মোবাইল নম্বর / ই-মেইল
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="০১৭১১-XXXXXX বা email@domain.com"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="w-full text-xs sm:text-sm pl-9 pr-3 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700 focus:border-emerald-700 bg-stone-50/50"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  পাসওয়ার্ড
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="আপনার গোপন পাসওয়ার্ড"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full text-xs sm:text-sm pl-9 pr-10 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700 focus:border-emerald-700 bg-stone-50/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded-sm text-emerald-800 focus:ring-emerald-700"
                  />
                  <span className="text-stone-700">আমাকে মনে রাখুন</span>
                </label>

                <button
                  type="button"
                  onClick={() => {
                    setForgotSubmitted(false);
                    setForgotIdentifier(identifier);
                    setIsForgotPasswordOpen(true);
                  }}
                  className="font-medium text-emerald-800 hover:underline cursor-pointer"
                >
                  পাসওয়ার্ড ভুলে গেছেন?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 active:scale-98 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-2"
              >
                {isLoading ? (
                  <span>প্রবেশ করা হচ্ছে...</span>
                ) : (
                  <>
                    <span>লগইন করুন (ড্যাশবোর্ডে প্রবেশ)</span>
                    <ArrowRight className="w-4 h-4 text-amber-300" />
                  </>
                )}
              </button>

            </form>
          )}

          {/* Switch to Register */}
          <div className="pt-4 border-t border-stone-200 text-center text-xs text-stone-600">
            কোনো অ্যাকাউন্ট নেই?{' '}
            <button
              onClick={() => onNavigate('signup')}
              className="font-bold text-emerald-800 hover:underline cursor-pointer ml-1"
            >
              নতুন অ্যাকাউন্ট তৈরি করুন
            </button>
          </div>

        </div>

        {/* Ministry Security note */}
        <div className="text-center text-[11px] text-stone-500 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
          <span>পার্বত্য চট্টগ্রাম বিষয়ক মন্ত্রণালয় · নিরাপদ এসএসএল এনক্রিপশন</span>
        </div>

      </div>

      {/* Forgot Password Modal */}
      {isForgotPasswordOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <h3 className="text-base font-bold text-stone-900">
                পাসওয়ার্ড পুনরুদ্ধার (Password Reset)
              </h3>
              <button
                onClick={() => setIsForgotPasswordOpen(false)}
                className="text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {forgotSubmitted ? (
              <div className="py-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-emerald-700" />
                </div>
                <h4 className="text-sm font-bold text-stone-900">ওটিপি কোড পাঠানো হয়েছে!</h4>
                <p className="text-xs text-stone-600">
                  <strong className="text-stone-800">{forgotIdentifier || 'আপনার নম্বরে'}</strong> ৪ ডিজিটের একটি ভেরিফিকেশন কোড পাঠানো হয়েছে।
                </p>
                <button
                  onClick={() => setIsForgotPasswordOpen(false)}
                  className="w-full py-2.5 px-4 bg-emerald-800 text-white rounded-lg text-xs font-semibold mt-3"
                >
                  ঠিক আছে
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotPasswordSubmit} className="pt-4 space-y-4">
                <p className="text-xs text-stone-600">
                  আপনার অ্যাকাউন্টের নিবন্ধিত মোবাইল নম্বর অথবা ই-মেইল লিখুন।
                </p>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    মোবাইল নম্বর / ই-মেইল
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="০১৭১১-XXXXXX"
                    value={forgotIdentifier}
                    onChange={(e) => setForgotIdentifier(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                >
                  ভেরিফিকেশন কোড পাঠান
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
