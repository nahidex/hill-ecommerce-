import React, { useState } from 'react';
import { ShieldCheck, Lock, CheckCircle, Scale, Building2, ArrowRight, ArrowDown } from 'lucide-react';

export const SecureTransaction: React.FC = () => {
  const [activeWorkflowStage, setActiveWorkflowStage] = useState(0);

  const workflowStages = [
    {
      num: '১',
      title: 'অর্ডার ও এসক্রো ডিপোজিট',
      subtitle: 'ক্রেতা পেমেন্ট জমা রাখেন',
      desc: 'ক্রেতা অর্ডার করার পর টাকা সরাসরি বিক্রেতার কাছে যায় না। বাংলাদেশ ব্যাংক অনুমোদিত এসক্রো ট্রাস্ট অ্যাকাউন্টে সুরক্ষিতভাবে জমা থাকে।',
      party: 'ক্রেতা ও ট্রাস্ট ব্যাংক'
    },
    {
      num: '২',
      title: 'চালান প্রস্তুত ও পরিবহন',
      subtitle: 'পাহাড় থেকে যাত্রা শুরু',
      desc: 'অর্থ ডিপোজিট নিশ্চিত হলে উৎপাদক পণ্য প্যাকিং ও পরিবহন লজিস্টিকসের মাধ্যমে ক্রেতার ঠিকানায় প্রেরণ করেন এবং ট্র্যাকিং কোড দেন।',
      party: 'উৎপাদক ও পরিবহন অংশীদার'
    },
    {
      num: '৩',
      title: 'পণ্য গ্রহণ ও গুণগত যাচাই',
      subtitle: 'ক্রেতার সন্তুষ্টি নিশ্চিতকরণ',
      desc: 'পণ্য হাতে পাওয়ার পর ক্রেতা পরিমাণ ও মান যাচাই করেন। কোনো অমিল থাকলে তাৎক্ষণিক রিপোর্ট ও ডিসপিউট ওপেন করার অপশন থাকে।',
      party: 'ক্রেতা ও স্থানীয় ইন্সপেক্টর'
    },
    {
      num: '৪',
      title: 'সফল পেমেন্ট রিলিজ',
      subtitle: 'উৎপাদকের হিসাবে অর্থ স্থানান্তর',
      desc: 'ক্রেতার নিশ্চিতকরণের সাথে সাথে এসক্রো সিস্টেম স্বয়ংক্রিয়ভাবে উৎপাদকের ব্যাংক বা মোবাইল ওয়ালেটে অর্থ স্থানান্তর সম্পন্ন করে।',
      party: 'এসক্রো সিস্টেম ও উৎপাদক'
    }
  ];

  return (
    <section id="secure-transactions" className="py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="text-xs font-semibold text-emerald-800 tracking-wider">
            বিশ্বস্ততার সরকারি সুরক্ষা
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 mt-1">
            নিরাপদ ও স্বচ্ছ লেনদেন ব্যবস্থা
          </h2>
          <p className="text-base text-stone-600 mt-3 leading-relaxed">
            পার্বত্য চট্টগ্রাম বিষয়ক মন্ত্রণালয়ের উদ্যোগে প্রস্তাবিত আধুনিক ডিজিটাল এসক্রো মডেল। যেখানে কোনো পক্ষই প্রতারিত হবে না।
          </p>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-stone-900">ডিজিটাল এসক্রো পেমেন্ট</h3>
            <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
              অনুমোদিত তফসিলি ব্যাংকের মাধ্যমে পণ্য সরবরাহের আগ পর্যন্ত ক্রেতার অর্থ শতভাগ সংরক্ষিত থাকবে।
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-3">
              <CheckCircle className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-stone-900">ক্রেতার প্রাপ্তি নিশ্চিতকরণ</h3>
            <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
              পণ্য পৌঁছানোর পর ক্রেতার সন্তোষজনক যাচাই সাপেক্ষে তবেই বিক্রেতার অ্যাকাউন্টে অর্থ ছাড় করা হবে।
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-stone-900">বিরোধ নিষ্পত্তিতে সহায়তা</h3>
            <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
              যেকোনো মতানৈক্যে পার্বত্য জেলা প্রশাসন ও মন্ত্রণালয়ের মধ্যস্থতায় দ্রুত ও নিরপেক্ষ বিরোধ নিষ্পত্তির বিধান।
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-3">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-stone-900">পারস্পরিক আস্থা ও সুরক্ষা</h3>
            <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">
              ডিজিটাল ট্রেসিবিলিটি ও চুক্তির মাধ্যমে ক্ষুদ্র পাহাড়ি কৃষক এবং বৃহৎ করপোরেট ক্রেতার মধ্যে বিশ্বাসযোগ্যতা তৈরি।
            </p>
          </div>
        </div>

        {/* Transaction Workflow Diagram */}
        <div className="rounded-2xl border border-stone-200 bg-stone-50 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-stone-200">
            <div>
              <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
                Transaction Workflow Diagram
              </div>
              <h3 className="text-lg font-bold text-stone-900">
                এসক্রো লেনদেন প্রবাহ চিত্র (ধাপে ধাপে)
              </h3>
            </div>
            <div className="text-xs text-stone-500">
              যেকোনো ধাপে ক্লিক করে বিস্তারিত দেখুন
            </div>
          </div>

          {/* Workflow Steps Line */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            {workflowStages.map((stage, i) => {
              const isSelected = activeWorkflowStage === i;
              return (
                <div
                  key={i}
                  onClick={() => setActiveWorkflowStage(i)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-white border-emerald-700 shadow-md ring-2 ring-emerald-600/10'
                      : 'bg-white/70 border-stone-200 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center ${
                        isSelected
                          ? 'bg-emerald-900 text-amber-300'
                          : 'bg-stone-100 text-stone-700'
                      }`}
                    >
                      {stage.num}
                    </span>
                    <span className="text-[11px] font-medium text-emerald-800">
                      {stage.party}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-stone-900">{stage.title}</h4>
                  <div className="text-xs text-stone-500 mt-0.5">{stage.subtitle}</div>
                  <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                    {stage.desc}
                  </p>

                  {/* Flow Arrow to next for desktop */}
                  {i < 3 && (
                    <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-stone-100 border border-stone-300 items-center justify-center text-stone-600">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom badge */}
          <div className="mt-6 pt-4 border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-600">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>নিরাপদ আর্থিক লেনদেনের নিশ্চয়তা প্রদান করবে প্রস্তাবিত জাতীয় ডিজিটাল এসক্রো ফ্রেমওয়ার্ক।</span>
            </div>
            <span className="font-semibold text-emerald-800">
              জিরো-রিস্ক পাইকারি বাণিজ্য
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
