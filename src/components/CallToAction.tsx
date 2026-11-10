import React from 'react';
import { ArrowRight, UserPlus, LogIn, Sparkles } from 'lucide-react';

interface CallToActionProps {
  onRegister: () => void;
  onLogin: () => void;
}

export const CallToAction: React.FC<CallToActionProps> = ({ onRegister, onLogin }) => {
  return (
    <section className="py-16 bg-gradient-to-br from-emerald-900 via-emerald-950 to-stone-950 text-white relative overflow-hidden">
      {/* Decorative hill contours backdrop */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg viewBox="0 0 1440 320" className="w-full h-full object-cover">
          <path
            fill="#ffffff"
            d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,165.3C960,149,1056,171,1152,186.7C1248,203,1344,213,1392,218.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-800/60 border border-emerald-700/60 text-xs font-medium text-amber-300">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ডিজিটাল বাংলাদেশ থেকে স্মার্ট বাংলাদেশ বিনির্মাণে পার্বত্য উদ্যোগ</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
          আপনার ব্যবসার নতুন সম্ভাবনা <br />
          <span className="text-amber-400">শুরু হোক আজই</span>
        </h2>

        <p className="text-base sm:text-lg text-emerald-100/90 max-w-2xl mx-auto leading-relaxed">
          Hill eCommerce-এর সঙ্গে যুক্ত হয়ে আপনার উৎপাদিত পণ্য ও ব্যবসাকে পৌঁছে দিন নতুন বাজারে। কৃষক, সরবরাহকারী কিংবা পাইকারি ক্রেতা—সবার জন্যই উন্মুক্ত নতুন দিগন্ত।
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onRegister}
            className="w-full sm:w-auto px-8 py-3.5 text-base font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 active:scale-98 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <UserPlus className="w-5 h-5" />
            <span>নিবন্ধন করুন</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onLogin}
            className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold text-white bg-emerald-800/80 hover:bg-emerald-800 active:scale-98 rounded-xl border border-emerald-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <LogIn className="w-5 h-5 text-emerald-300" />
            <span>লগইন করুন</span>
          </button>
        </div>

        <div className="pt-2 text-xs text-stone-400">
          কোনো প্রকার গোপন মাশুল ছাড়াই সরাসরি সাইন আপ করুন
        </div>

      </div>
    </section>
  );
};
