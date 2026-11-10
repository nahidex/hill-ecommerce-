import React, { useState } from 'react';
import { UserCheck, Search, FileCheck, CheckCircle2, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onRegisterClick: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onRegisterClick }) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      stepNumber: '০১',
      title: 'নিবন্ধন করুন',
      subtitle: 'নিজের অ্যাকাউন্ট তৈরি করুন',
      description: 'কৃষক/উৎপাদক, সরবরাহকারী, পাইকারি ক্রেতা অথবা ব্যক্তিগত উদ্যোক্তা হিসেবে আপনার সঠিক পরিচয় ও মোবাইল নম্বর দিয়ে বিনামূল্যে রেজিস্ট্রেশন করুন।',
      icon: UserCheck,
      details: 'জাতীয় পরিচয়পত্র ও মোবাইল ভেরিফিকেশনের মাধ্যমে বিশ্বস্ত প্রোফাইল প্রস্তুত হয়।'
    },
    {
      stepNumber: '০২',
      title: 'পণ্য তালিকাভুক্ত করুন বা খুঁজুন',
      subtitle: 'লট বিবরণ ও মূল্য যাচাই',
      description: 'বিক্রেতা হলে সরাসরি পণ্যের ছবি, গুণমান ও পাইকারি দর যুক্ত করুন। ক্রেতা হলে সরাসরি ৩টি পার্বত্য জেলার খাঁটি পণ্যের ক্যাটালগ অনুসন্ধান ও ফিল্টার করুন।',
      icon: Search,
      details: 'জেলা, উপজেলা ও হার্ভেস্ট তারিখ অনুযায়ী রিয়েল-টাইম তথ্য দেখার সুযোগ।'
    },
    {
      stepNumber: '০৩',
      title: 'অর্ডার নিশ্চিত করুন',
      subtitle: 'সরাসরি আলোচনা ও কোটেশন অনুমোদন',
      description: 'ন্যূনতম অর্ডার পরিমাণ সাপেক্ষে উৎপাদকের সাথে সরাসরি যোগাযোগ করুন, দরদাম চূড়ান্ত করুন এবং অনুমোদিত এসক্রো অ্যাকাউন্টে অর্থ জমা দিন।',
      icon: FileCheck,
      details: 'কোনো গোপন চার্জ নেই; ডিজিটাল ইনভয়েস ও স্বচ্ছ চুক্তিনামা।'
    },
    {
      stepNumber: '০৪',
      title: 'পণ্য গ্রহণ ও লেনদেন সম্পন্ন',
      subtitle: 'নিরাপদ ডেলিভারি ও অর্থ ছাড়',
      description: 'পাহাড় থেকে সরাসরি সংরক্ষিত লজিস্টিকসের মাধ্যমে পণ্য আপনার ঠিকানায় পৌঁছাবে। পণ্য গুণমান যাচাই শেষে ক্রেতার নিশ্চিতকরণে উৎপাদকের কাছে অর্থ স্থানান্তরিত হবে।',
      icon: CheckCircle2,
      details: 'মন্ত্রণালয় সমন্বিত পর্যবেক্ষণ থাকায় উভয় পক্ষই শতভাগ নিরাপদ।'
    }
  ];

  return (
    <section id="how-it-works" className="py-16 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-semibold text-emerald-800 tracking-wider">
            সহজ ও স্বচ্ছ কর্মপদ্ধতি
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 mt-1">
            যেভাবে কাজ করে Hill eCommerce
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-2">
            পাহাড়ের প্রত্যন্ত অঞ্চল থেকে দেশের যেকোনো প্রান্তে পণ্য কেনাবেচায় মাত্র চারটি সহজ ধাপ।
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            const isSelected = activeStep === idx;
            return (
              <div
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-white border-emerald-600 shadow-md ring-2 ring-emerald-600/10'
                    : 'bg-white/80 border-stone-200 hover:border-stone-300 hover:bg-white'
                }`}
              >
                <div>
                  {/* Step header with index and icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-2xl font-bold text-stone-300 font-brand">
                      {item.stepNumber}
                    </span>
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-emerald-900 text-amber-300'
                          : 'bg-stone-100 text-emerald-800'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-stone-900 leading-snug">
                    {item.title}
                  </h3>
                  <div className="text-xs font-medium text-emerald-800 mt-0.5">
                    {item.subtitle}
                  </div>

                  <p className="text-xs text-stone-600 mt-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-100">
                  <div className="text-[11px] text-stone-500 italic">
                    {item.details}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action button */}
        <div className="mt-12 text-center">
          <button
            onClick={onRegisterClick}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <span>ধাপ ১: এখনই বিনামূল্যে একাউন্ট খুলুন</span>
            <ArrowRight className="w-4 h-4 text-amber-300" />
          </button>
        </div>

      </div>
    </section>
  );
};
