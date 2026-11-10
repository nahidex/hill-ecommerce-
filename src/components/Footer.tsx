import React from 'react';
import { Mountain, Mail, Phone, MapPin, ExternalLink, ShieldCheck, Heart } from 'lucide-react';
import { PageView } from '../types';

interface FooterProps {
  onNavigate: (page: PageView, sectionId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800">
      
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand & Mission (Col 1 & 2) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-900 flex items-center justify-center text-white shadow-md">
                <Mountain className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <span className="font-brand font-bold text-2xl text-white tracking-tight">
                  Hill <span className="text-amber-400">eCommerce</span>
                </span>
                <span className="block text-xs text-emerald-400 font-medium">
                  পার্বত্য ডিজিটাল মার্কেটপ্লেস
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-sm">
              পার্বত্য চট্টগ্রাম বিষয়ক মন্ত্রণালয়ের উদ্যোগে প্রস্তাবিত একটি আধুনিক প্ল্যাটফর্ম—যা পাহাড়ি উৎপাদক, কৃষক ও কারুশিল্পীদের সাথে দেশের পাইকারি ও সাধারণ ক্রেতাদের সরাসরি যুক্ত করে।
            </p>

            <div className="p-3.5 rounded-xl bg-stone-800/80 border border-stone-700/80 flex items-center gap-3 text-xs text-stone-300">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>নিরাপদ আর্থিক লেনদেন ও এসক্রো সুরক্ষা সহকারে প্রস্তাবিত জাতীয় সেবা।</span>
            </div>
          </div>

          {/* Column 2: প্ল্যাটফর্ম ও সেবা */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              প্ল্যাটফর্ম
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('marketplace')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  পাইকারি বাজার
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('home', 'online-shop')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  অনলাইন শপ প্রিভিউ
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('home', 'categories-section')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  পণ্য ক্যাটাগরি
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('home', 'how-it-works')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  যেভাবে কাজ করে
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('home', 'secure-transactions')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  নিরাপদ এসক্রো লেনদেন
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: ব্যবহারকারীর নির্দেশিকা ও নীতিমালা */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              নির্দেশিকা ও নীতি
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('signup')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  কৃষক ও বিক্রেতা নিবন্ধন
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('signup')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  পাইকারি ক্রেতা নিবন্ধন
                </button>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="hover:text-amber-400 transition-colors block"
                >
                  ব্যবহারকারীর নির্দেশিকা
                </a>
              </li>
              <li>
                <span className="text-stone-400 hover:text-stone-200 cursor-pointer">
                  শর্তাবলি ও নীতিমালা
                </span>
              </li>
              <li>
                <span className="text-stone-400 hover:text-stone-200 cursor-pointer">
                  গোপনীয়তা নীতি
                </span>
              </li>
              <li>
                <span className="text-stone-400 hover:text-stone-200 cursor-pointer">
                  সাধারণ প্রশ্নোত্তর (FAQ)
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: যোগাযোগ */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              যোগাযোগ
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>ভবন নং ৪, বাংলাদেশ সচিবালয়, ঢাকা-১০০০</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+৮৮০ ২-৯৫১০০০০ (হেল্পডেস্ক)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>support@hillecommerce.gov.bd</span>
              </li>
              <li className="pt-2">
                <div className="text-[11px] text-stone-500">
                  জরুরি সহায়তা: সকাল ৯:০০ - বিকাল ৫:০০ (সরকারি কর্মদিবস)
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Official Government Initiative Bottom Bar */}
      <div className="border-t border-stone-800 bg-stone-950 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          
          <div className="space-y-1">
            <div className="text-sm font-bold text-amber-400">
              উদ্যোগ: পার্বত্য চট্টগ্রাম বিষয়ক মন্ত্রণালয়, গণপ্রজাতন্ত্রী বাংলাদেশ সরকার।
            </div>
            <div className="text-xs text-stone-400">
              © ২০২৬ Hill eCommerce প্ল্যাটফর্ম। সর্বস্বত্ব সংরক্ষিত।
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-stone-400">
            <span>রাঙামাটি</span>
            <span>·</span>
            <span>বান্দরবান</span>
            <span>·</span>
            <span>খাগড়াছড়ি</span>
          </div>

        </div>
      </div>
    </footer>
  );
};
