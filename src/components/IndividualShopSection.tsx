import React from 'react';
import { Store, CheckCircle, ArrowRight, Star, ShoppingBag, Eye, TrendingUp, Sparkles, ShieldCheck } from 'lucide-react';
import { HANDLOOM_IMAGE, PINEAPPLE_IMAGE } from '../data/products';

interface IndividualShopSectionProps {
  onOpenShop: () => void;
}

export const IndividualShopSection: React.FC<IndividualShopSectionProps> = ({ onOpenShop }) => {
  return (
    <section id="online-shop" className="py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title & Description */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="text-xs font-semibold text-emerald-800 tracking-wider">
            ব্যক্তিগত উদ্যোক্তাদের সুযোগ
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 mt-1">
            তৈরি করুন নিজের অনলাইন শপ
          </h2>
          <p className="text-base text-stone-600 mt-3 leading-relaxed">
            ব্যক্তিগত উদ্যোক্তা ও ক্ষুদ্র ব্যবসায়ীরা Hill eCommerce-এ নিজেদের দোকান তৈরি করে পণ্য প্রদর্শন ও বিক্রয় করতে পারবেন। আধুনিক ই-কমার্স সুবিধা ও দেশব্যাপী গ্রাহকদের সাথে সরাসরি সংযোগ।
          </p>
        </div>

        {/* Feature Grid & Interactive Demo Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Entrepreneur Benefits */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <Store className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-stone-900">কাস্টম ব্র্যান্ডেড স্টোরফ্রন্ট</h3>
                    <p className="text-xs text-stone-600 mt-1">
                      নিজের দোকানের নাম, লোগো, কাভার ছবি ও গল্প যুক্ত করে আলাদা শপ পেজ তৈরি করুন।
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-stone-900">সহজ ইনভেন্টরি ও অর্ডার ম্যানেজমেন্ট</h3>
                    <p className="text-xs text-stone-600 mt-1">
                      মোবাইল থেকেই স্টক আপডেট, নতুন পণ্য লিস্টিং ও গ্রাহকদের সাথে সরাসরি চ্যাটের সুবিধা।
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-stone-900">সরকারি সনদ ও বিশ্বস্ত বিক্রেতা ব্যাজ</h3>
                    <p className="text-xs text-stone-600 mt-1">
                      মন্ত্রণালয়ের যাচাইকৃত ব্যাজ থাকায় দেশ-বিদেশের ক্রেতারা নির্দ্বিধায় অর্ডার প্রদান করেন।
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenShop}
                className="w-full sm:w-auto px-7 py-3 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>আপনার অনলাইন শপ খুলুন</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>
              <div className="text-[11px] text-stone-500 mt-2 text-center sm:text-left">
                * কোনো প্রাথমিক ফি ছাড়াই রেজিস্ট্রেশন ও স্টোর সেটাপ
              </div>
            </div>
          </div>

          {/* Right Column: Demo Preview of an Individual Shop */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-stone-300 shadow-xl overflow-hidden bg-white">
              
              {/* Browser-like Preview Header */}
              <div className="px-4 py-2.5 bg-stone-100 border-b border-stone-200 flex items-center justify-between text-xs text-stone-500">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                </div>
                <div className="bg-white px-4 py-1 rounded-md text-[11px] font-mono text-stone-600 border border-stone-200 shadow-2xs">
                  hillecommerce.gov.bd/shop/marma-crafts
                </div>
                <span className="text-[10px] text-emerald-700 font-semibold">লাইভ ডেমো প্রিভিউ</span>
              </div>

              {/* Shop Cover & Profile Header */}
              <div className="relative">
                <div className="h-28 sm:h-36 bg-gradient-to-r from-emerald-900 via-emerald-800 to-stone-900 overflow-hidden relative">
                  <img
                    src={HANDLOOM_IMAGE}
                    alt="মারমা হস্তশিল্প কভার"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-40 mix-blend-overlay"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 to-transparent"></div>
                </div>

                <div className="px-6 pb-4 pt-0 relative flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-10">
                  <div className="flex items-end gap-3.5">
                    <div className="w-20 h-20 rounded-2xl bg-white p-1 shadow-md border border-stone-200 shrink-0 overflow-hidden">
                      <div className="w-full h-full rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white font-bold text-2xl font-brand">
                        MC
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-lg font-bold text-stone-900">মারমা ক্রাফট অ্যান্ড অর্গানিক হাব</h4>
                        <span className="text-emerald-700 text-xs font-semibold flex items-center gap-0.5">
                          <CheckCircle className="w-3.5 h-3.5 fill-emerald-600 text-white" />
                          ভেরিফাইড
                        </span>
                      </div>
                      <div className="text-xs text-stone-500 flex items-center gap-2 mt-0.5">
                        <span>রোয়াংছড়ি, বান্দরবান</span>
                        <span>·</span>
                        <span className="text-amber-800 font-medium">★ ৪.৯ (১২০+ রিভিউ)</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <div className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-900 text-xs font-semibold border border-emerald-200">
                      ২৪টি পণ্য সক্রিয়
                    </div>
                  </div>
                </div>
              </div>

              {/* Demo Products Shelf */}
              <div className="p-6 pt-2 border-t border-stone-100 bg-stone-50/50">
                <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-3">
                  দোকানের জনপ্রিয় পণ্যসমূহ
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-2.5 rounded-xl bg-white border border-stone-200 shadow-2xs">
                    <div className="aspect-square rounded-lg bg-stone-100 overflow-hidden mb-2">
                      <img
                        src={HANDLOOM_IMAGE}
                        alt="পিনন ও হাদি"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-xs font-bold text-stone-900 truncate">কোমর তাঁতের শাল</div>
                    <div className="text-xs text-emerald-900 font-bold mt-1">৳১,৪৫০</div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white border border-stone-200 shadow-2xs">
                    <div className="aspect-square rounded-lg bg-stone-100 overflow-hidden mb-2">
                      <img
                        src={PINEAPPLE_IMAGE}
                        alt="আনারস"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-xs font-bold text-stone-900 truncate">রুমা জুমি আনারস</div>
                    <div className="text-xs text-emerald-900 font-bold mt-1">৳৪৫ / পিস</div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white border border-stone-200 shadow-2xs col-span-2 sm:col-span-1">
                    <div className="aspect-square rounded-lg bg-stone-100 overflow-hidden mb-2 flex items-center justify-center p-2 bg-gradient-to-br from-amber-50 to-emerald-50">
                      <div className="text-center">
                        <Store className="w-8 h-8 text-emerald-800 mx-auto mb-1" />
                        <span className="text-[10px] text-stone-500 font-medium">আপনার পণ্য এখানে</span>
                      </div>
                    </div>
                    <div className="text-xs font-bold text-stone-900 truncate">আপনার প্রথম পণ্য</div>
                    <div className="text-xs text-stone-400 mt-1">খুব সহজেই যুক্ত করুন</div>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
