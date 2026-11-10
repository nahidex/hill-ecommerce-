import React, { useState } from 'react';
import { Menu, X, ArrowRight, ShieldCheck, Mountain } from 'lucide-react';
import { PageView } from '../types';

interface HeaderProps {
  currentPage: PageView;
  onNavigate: (page: PageView, sectionId?: string) => void;
  isLoggedIn?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate, isLoggedIn }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId?: string) => {
    setMobileMenuOpen(false);
    if (currentPage !== 'home') {
      onNavigate('home', sectionId);
    } else if (sectionId) {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
      {/* Top micro-strip for Ministry attribution */}
      <div className="bg-emerald-950 text-emerald-100 text-[11px] sm:text-xs py-1 px-4 text-center font-medium border-b border-emerald-900/40">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
          <span>পার্বত্য চট্টগ্রাম বিষয়ক মন্ত্রণালয়ের উদ্যোগে প্রস্তাবিত ডিজিটাল মার্কেটপ্লেস</span>
          <span className="hidden md:inline text-emerald-300/60">|</span>
          <span className="hidden md:inline text-emerald-300/80">গণপ্রজাতন্ত্রী বাংলাদেশ সরকার</span>
        </div>
      </div>

      {/* Main Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-6">
        {/* Brand Zone */}
        <button
          onClick={() => handleNavClick()}
          className="flex items-center gap-3 text-left group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-800 to-emerald-950 flex items-center justify-center text-white shadow-sm ring-1 ring-emerald-900/20 group-hover:scale-102 transition-transform">
            <Mountain className="w-5 h-5 text-amber-400" />
          </div>
          <div className="flex flex-col">
            <span className="font-brand font-bold text-xl sm:text-2xl tracking-tight text-emerald-950 leading-none">
              Hill <span className="text-amber-700">eCommerce</span>
            </span>
            <span className="text-[11px] text-stone-500 font-medium tracking-wide">
              পার্বত্য ডিজিটাল বাণিজ্য
            </span>
          </div>
        </button>

        {/* Navigation Menu */}
        <nav className="hidden lg:flex items-center gap-7 text-[15px] font-medium text-stone-700">
          <button
            onClick={() => handleNavClick()}
            className={`transition-colors hover:text-emerald-800 cursor-pointer ${
              currentPage === 'home' ? 'text-emerald-900 font-semibold' : ''
            }`}
          >
            হোম
          </button>
          <button
            onClick={() => onNavigate('marketplace')}
            className={`transition-colors hover:text-emerald-800 cursor-pointer ${
              currentPage === 'marketplace' ? 'text-emerald-900 font-semibold' : ''
            }`}
          >
            পাইকারি বাজার
          </button>
          <button
            onClick={() => handleNavClick('online-shop')}
            className="transition-colors hover:text-emerald-800 cursor-pointer"
          >
            অনলাইন শপ
          </button>
          <button
            onClick={() => handleNavClick('categories-section')}
            className="transition-colors hover:text-emerald-800 cursor-pointer"
          >
            পণ্যসমূহ
          </button>
          <button
            onClick={() => handleNavClick('how-it-works')}
            className="transition-colors hover:text-emerald-800 cursor-pointer"
          >
            যেভাবে কাজ করে
          </button>
          <button
            onClick={() => handleNavClick('about-section')}
            className="transition-colors hover:text-emerald-800 cursor-pointer"
          >
            আমাদের সম্পর্কে
          </button>
        </nav>

        {/* Right Actions: Login & Sign Up or Dashboard */}
        <div className="hidden sm:flex items-center gap-3">
          {isLoggedIn ? (
            <button
              onClick={() => onNavigate('dashboard')}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-800 hover:from-emerald-700 hover:to-emerald-900 rounded-lg shadow-sm hover:shadow-md transition-all active:scale-98 cursor-pointer border border-emerald-900/20"
            >
              <span>আমার ড্যাশবোর্ড</span>
              <ArrowRight className="w-4 h-4 text-amber-300" />
            </button>
          ) : (
            <>
              <button
                onClick={() => onNavigate('login')}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                  currentPage === 'login'
                    ? 'text-emerald-900 bg-emerald-50'
                    : 'text-stone-700 hover:text-emerald-900 hover:bg-stone-100'
                }`}
              >
                লগইন
              </button>
              <button
                onClick={() => onNavigate('signup')}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-800 hover:from-emerald-700 hover:to-emerald-900 rounded-lg shadow-sm hover:shadow-md transition-all active:scale-98 cursor-pointer border border-emerald-900/20"
              >
                <span>নিবন্ধন করুন</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>
            </>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => onNavigate('signup')}
            className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-800 rounded-md"
          >
            নিবন্ধন
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-stone-600 hover:text-stone-900 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-2 text-base font-medium text-stone-800">
            <button
              onClick={() => handleNavClick()}
              className="text-left py-2 px-3 rounded-lg hover:bg-stone-50"
            >
              হোম
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('marketplace');
              }}
              className="text-left py-2 px-3 rounded-lg hover:bg-stone-50 font-medium text-emerald-950"
            >
              পাইকারি বাজার
            </button>
            <button
              onClick={() => handleNavClick('online-shop')}
              className="text-left py-2 px-3 rounded-lg hover:bg-stone-50"
            >
              অনলাইন শপ
            </button>
            <button
              onClick={() => handleNavClick('categories-section')}
              className="text-left py-2 px-3 rounded-lg hover:bg-stone-50"
            >
              পণ্যসমূহ
            </button>
            <button
              onClick={() => handleNavClick('how-it-works')}
              className="text-left py-2 px-3 rounded-lg hover:bg-stone-50"
            >
              যেভাবে কাজ করে
            </button>
            <button
              onClick={() => handleNavClick('about-section')}
              className="text-left py-2 px-3 rounded-lg hover:bg-stone-50"
            >
              আমাদের সম্পর্কে
            </button>
          </div>
          <div className="pt-3 border-t border-stone-200 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('login');
              }}
              className="w-full py-2.5 text-center font-semibold text-emerald-900 bg-emerald-50 rounded-lg hover:bg-emerald-100"
            >
              লগইন করুন
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('signup');
              }}
              className="w-full py-2.5 text-center font-semibold text-white bg-emerald-800 rounded-lg hover:bg-emerald-900 shadow-sm"
            >
              নতুন অ্যাকাউন্ট নিবন্ধন করুন
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
