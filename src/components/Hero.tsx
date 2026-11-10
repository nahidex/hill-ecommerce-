import React from 'react';
import { ArrowRight, Search, ShieldCheck, CheckCircle2, Award, Users } from 'lucide-react';
import { HERO_IMAGE } from '../data/products';

interface HeroProps {
  onStartBusiness: () => void;
  onExploreProducts: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartBusiness, onExploreProducts }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/60 via-stone-50 to-white pt-8 pb-16 lg:py-20 border-b border-stone-200/80">
      {/* Subtle organic background tint */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-24 right-0 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Heading, Subheading & Direct CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Context kicker: clean unboxed text */}
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 tracking-wide">
              <span>পার্বত্য চট্টগ্রাম বিষয়ক মন্ত্রণালয়</span>
              <span aria-hidden="true">·</span>
              <span className="text-amber-800">জাতীয় ডিজিটাল হাব</span>
              <span aria-hidden="true">·</span>
              <span className="text-stone-600">বান্দরবান · রাঙামাটি · খাগড়াছড়ি</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-bold text-stone-900 leading-[1.2] tracking-tight">
              পার্বত্য অঞ্চলের পণ্য, <br />
              <span className="text-emerald-900">পৌঁছে যাক সারা দেশে</span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-stone-700 leading-relaxed max-w-2xl">
              উৎপাদক, কৃষক, উদ্যোক্তা ও পাইকারি ক্রেতাদের জন্য একটি নির্ভরযোগ্য ডিজিটাল মার্কেটপ্লেস। সরাসরি উৎপাদকের কাছ থেকে পণ্য সংগ্রহ করুন এবং সম্প্রসারণ করুন আপনার ব্যবসা।
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onStartBusiness}
                className="flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold text-white bg-emerald-800 hover:bg-emerald-900 active:scale-98 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer border border-emerald-950/20"
              >
                <span>ব্যবসা শুরু করুন</span>
                <ArrowRight className="w-5 h-5 text-amber-300" />
              </button>

              <button
                onClick={onExploreProducts}
                className="flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-stone-800 bg-white hover:bg-stone-100 hover:text-emerald-900 active:scale-98 rounded-xl border border-stone-300 shadow-xs transition-all cursor-pointer"
              >
                <Search className="w-4 h-4 text-emerald-700" />
                <span>পণ্য খুঁজুন</span>
              </button>
            </div>

            {/* Key Trust Signals */}
            <div className="pt-4 border-t border-stone-200/90 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>সরাসরি কৃষক ও উৎপাদক</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>প্রস্তাবিত সুরক্ষিত এসক্রো লেনদেন</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <Award className="w-4 h-4 text-amber-700 shrink-0" />
                <span>শতভাগ খাঁটি পাহাড়ি স্বাদ</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Composite showcasing Hill Produce & Producers */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Image Frame */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl ring-1 ring-stone-900/10 bg-stone-100 aspect-[16/10] sm:aspect-[4/3] lg:aspect-[5/4]">
                <img
                  src={HERO_IMAGE}
                  alt="পার্বত্য চট্টগ্রামের কৃষিপণ্য ও উৎপাদক"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transform hover:scale-102 transition-transform duration-500"
                  loading="eager"
                />
                
                {/* Visual gradient scrim for legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent pointer-events-none" />

                {/* Bottom text inside frame */}
                <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                  <div className="text-xs font-semibold text-amber-300 tracking-wider">
                    সাজেক · থানচি · বান্দরবান · রাঙামাটি
                  </div>
                  <div className="text-base font-bold mt-0.5">
                    উচ্চ পাহাড়ি ঢালে জুম ও অর্গানিক ফলমূলের প্রাচুর্য
                  </div>
                  <div className="text-xs text-stone-200 mt-1">
                    কৃষকের ঘাম ও মেহনতের সঠিক মূল্য নিশ্চিতে সরকারি সমন্বিত উদ্যোগ
                  </div>
                </div>
              </div>

              {/* Floating Verified Trust Card */}
              <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-white p-3.5 sm:p-4 rounded-xl shadow-lg border border-stone-200 max-w-[240px] sm:max-w-[270px]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-stone-900">১২,৫০০+ নিবন্ধিত উৎপাদক</div>
                    <div className="text-[11px] text-stone-500">৩টি পার্বত্য জেলা জুড়ে সমবায় নেটওয়ার্ক</div>
                  </div>
                </div>
              </div>

              {/* Top floating pill-free verified stamp */}
              <div className="absolute -top-3 -right-2 sm:-right-4 bg-emerald-900 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-md flex items-center gap-1.5 border border-emerald-700">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>মন্ত্রণালয় অনুমোদিত মডেল</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
