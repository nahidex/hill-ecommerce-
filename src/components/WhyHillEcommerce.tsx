import React from 'react';
import { Network, TrendingUp, BadgePercent, Laptop, Globe, ShieldCheck } from 'lucide-react';

export const WhyHillEcommerce: React.FC = () => {
  const reasons = [
    {
      title: 'উৎপাদকদের সরাসরি বাজার সংযোগ',
      desc: 'পাহাড়ের প্রত্যন্ত জনপদের কৃষক ও শিল্পীদের জাতীয় সাপ্লাই চেইনের সাথে সরাসরি সংযুক্ত করে মধ্যস্বত্বভোগীদের দৌরাত্ম্য দূর করা।',
      icon: Network,
    },
    {
      title: 'পাইকারি বাণিজ্যের অবাধ সুযোগ',
      desc: 'ঢাকা, চট্টগ্রামসহ দেশের প্রধান বাণিজ্যিক কেন্দ্রগুলোর বড় বড় প্রতিষ্ঠান সরাসরি বাল্ক লটে পাহাড়ি কৃষিপণ্য সংগ্রহের নিশ্চয়তা পায়।',
      icon: TrendingUp,
    },
    {
      title: 'ন্যায্য ও প্রতিযোগিতামূলক মূল্য',
      desc: 'উৎপাদক পান তার কঠোর পরিশ্রমের প্রকৃত মূল্য, আর পাইকারি ক্রেতারা পান মধ্যস্বত্বভোগীবিহীন যৌক্তিক সাশ্রয়ী মূল্য।',
      icon: BadgePercent,
    },
    {
      title: 'ক্ষুদ্র উদ্যোক্তাদের ডিজিটাল অন্তর্ভুক্তি',
      desc: 'নারী তাঁতশিল্পী ও ক্ষুদ্র আদিবাসী উদ্যোক্তারা বিনামূল্যে আধুনিক ই-কমার্স প্ল্যাটফর্ম ব্যবহারের সুযোগ পেয়ে স্বাবলম্বী হচ্ছেন।',
      icon: Laptop,
    },
    {
      title: 'দেশব্যাপী বাজার সম্প্রসারণ',
      desc: 'পার্বত্য অঞ্চলের ব্র্যান্ডিং বিশ্বস্ততার সাথে ছড়িয়ে পড়বে ৬৪ জেলায়। আধুনিক লজিস্টিকস নিশ্চিত করবে দ্রুত পণ্য পরিবহন।',
      icon: Globe,
    },
    {
      title: 'নির্ভরযোগ্য লেনদেন পরিবেশ',
      desc: 'মন্ত্রণালয়ের প্রত্যক্ষ তত্ত্বাবধান এবং নিরাপদ এসক্রো পেমেন্টের মাধ্যমে নিশ্চিত হয় জিরো-ফ্রড ও শতভাগ আর্থিক সুরক্ষা।',
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="about-section" className="py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="text-xs font-semibold text-emerald-800 tracking-wider">
            আমাদের লক্ষ্য ও স্বাতন্ত্র্য
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 mt-1">
            কেন Hill eCommerce?
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-2">
            পার্বত্য চট্টগ্রামের সম্ভাবনাময় জনপদ ও জাতীয় অর্থনীতির মধ্যে আধুনিক ডিজিটাল সেতুবন্ধন।
          </p>
        </div>

        {/* 6 Grid items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-2xl bg-stone-50/70 hover:bg-stone-50 border border-stone-200 hover:border-emerald-200 transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-emerald-900 text-amber-300 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-stone-900 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Ministry Institutional Box */}
        <div className="mt-12 p-6 rounded-2xl bg-emerald-950 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-xs font-semibold text-amber-400">
              পার্বত্য চট্টগ্রাম বিষয়ক মন্ত্রণালয়, গণপ্রজাতন্ত্রী বাংলাদেশ সরকার
            </div>
            <div className="text-base sm:text-lg font-bold">
              পাহাড়ের কৃষ্টি, সংস্কৃতি ও অর্থনৈতিক স্বনির্ভরতার জাতীয় প্রত্যয়
            </div>
            <div className="text-xs text-stone-300">
              তিন পার্বত্য জেলা পরিষদ (রাঙামাটি, বান্দরবান, খাগড়াছড়ি) ও উন্নয়ন বোর্ডের সার্বিক সহায়তায় পরিচালিত।
            </div>
          </div>
          <div className="shrink-0 text-right">
            <span className="inline-block px-4 py-2 rounded-lg bg-emerald-900 border border-emerald-700 text-xs font-semibold text-emerald-100">
              জাতীয় ডিজিটাল ইকোনমি ফ্রেমওয়ার্ক
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
