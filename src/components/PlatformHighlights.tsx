import React from 'react';
import { Package, MessageSquareText, ShieldCheck, Store, ArrowUpRight } from 'lucide-react';

interface PlatformHighlightsProps {
  onSelectHighlight?: (highlightKey: string) => void;
}

export const PlatformHighlights: React.FC<PlatformHighlightsProps> = ({ onSelectHighlight }) => {
  const highlights = [
    {
      id: 'wholesale',
      title: 'পাইকারি পণ্য ক্রয়-বিক্রয়',
      desc: 'বাল্ক লটে পাহাড়ি কৃষিপণ্য ও ফলমূল সরাসরি পাইকারি মূল্যে ক্রয়ের সুযোগ। সুপারশপ ও আড়তদারদের জন্য সাশ্রয়ী সমাধান।',
      icon: Package,
      accent: 'emerald',
      target: 'wholesale-market'
    },
    {
      id: 'direct-connect',
      title: 'সরাসরি উৎপাদকের সঙ্গে যোগাযোগ',
      desc: 'কোনো মধ্যস্বত্বভোগী ছাড়া স্থানীয় পাহাড়ি কৃষক, চাষী ও নারী তাঁতশিল্পীদের সাথে সরাসরি চ্যাট ও অর্ডার নিশ্চিতকরণ।',
      icon: MessageSquareText,
      accent: 'amber',
      target: 'how-it-works'
    },
    {
      id: 'escrow-security',
      title: 'নিরাপদ লেনদেন ব্যবস্থা',
      desc: 'প্রস্তাবিত ডিজিটাল এসক্রো মেথডে পণ্য সঠিকভাবে হাতে পাওয়া পর্যন্ত অর্থ সম্পূর্ণ সুরক্ষিত থাকবে। কোনো ঝুঁকি নেই।',
      icon: ShieldCheck,
      accent: 'emerald',
      target: 'secure-transactions'
    },
    {
      id: 'custom-shop',
      title: 'নিজস্ব অনলাইন শপ তৈরি',
      desc: 'পাহাড়ের যেকোনো ক্ষুদ্র উদ্যোক্তা নিজস্ব ব্র্যান্ডের ডিজিটাল দোকান তৈরি করে দেশব্যাপী পণ্য বিক্রি করতে পারবেন।',
      icon: Store,
      accent: 'amber',
      target: 'online-shop'
    }
  ];

  const scrollToSection = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section header info */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-semibold text-emerald-800 tracking-wider">
            প্ল্যাটফর্মের মূল সুবিধা
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
            আধুনিক ডিজিটাল বাণিজ্যের চারটি স্তম্ভ
          </h2>
          <p className="text-sm text-stone-600 mt-2">
            পাহাড়ের সম্ভাবনাময় অর্থনীতিকে প্রযুক্তির মাধ্যমে দেশের মূলধারার বাজারের সাথে যুক্ত করার প্রয়াস।
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => scrollToSection(item.target)}
                className="group p-6 rounded-2xl bg-stone-50 hover:bg-white border border-stone-200 hover:border-emerald-300 transition-all duration-300 hover:shadow-md cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white group-hover:bg-emerald-800 text-emerald-800 group-hover:text-white border border-stone-200 group-hover:border-emerald-700 flex items-center justify-center transition-colors shadow-2xs mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-stone-900 group-hover:text-emerald-950 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-stone-600 mt-2.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-200/60 flex items-center justify-between text-xs font-semibold text-emerald-800">
                  <span>বিস্তারিত জানুন</span>
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
