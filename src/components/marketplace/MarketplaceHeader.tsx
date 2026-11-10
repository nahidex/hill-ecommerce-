import React, { useState } from 'react';
import { 
  Mountain, 
  Search, 
  ShoppingBag, 
  MessageSquare, 
  Bell, 
  User, 
  ArrowRight, 
  Menu, 
  X, 
  ShieldCheck, 
  FileText, 
  ExternalLink 
} from 'lucide-react';
import { PageView, UserSession } from '../../types';

interface MarketplaceHeaderProps {
  currentPage: PageView;
  onNavigate: (page: PageView, sectionId?: string) => void;
  isLoggedIn: boolean;
  currentUser: UserSession;
  onOpenRFQModal: () => void;
  onFilterSellerType?: (type: string) => void;
  unreadNotifsCount?: number;
}

export const MarketplaceHeader: React.FC<MarketplaceHeaderProps> = ({
  currentPage,
  onNavigate,
  isLoggedIn,
  currentUser,
  onOpenRFQModal,
  onFilterSellerType,
  unreadNotifsCount = 2
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToCategories = () => {
    const el = document.getElementById('marketplace-categories');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-stone-200 shadow-2xs">
      
      {/* Top Ministry Bar */}
      <div className="bg-emerald-950 text-emerald-100 text-[11px] py-1 px-4 font-medium border-b border-emerald-900/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            <span>পার্বত্য চট্টগ্রাম বিষয়ক মন্ত্রণালয় · জাতীয় B2B পাইকারি মার্কেটপ্লেস</span>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-emerald-300">
            <span>সরাসরি কৃষক-পাইকার সংযোগ</span>
            <span>|</span>
            <span>প্রস্তাবিত ডিজিটাল এসক্রো সুরক্ষা</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        
        {/* Brand Zone */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-800 to-emerald-950 flex items-center justify-center text-white shadow-xs group-hover:scale-102 transition-transform">
              <Mountain className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <span className="font-brand font-bold text-xl sm:text-2xl text-stone-900 tracking-tight leading-none block">
                Hill <span className="text-amber-700">eCommerce</span>
              </span>
              <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider block">
                B2B পাইকারি বাজার
              </span>
            </div>
          </button>
        </div>

        {/* Center Navigation Menu */}
        <nav className="hidden xl:flex items-center gap-6 text-[14px] font-semibold text-stone-700">
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-emerald-900 transition-colors cursor-pointer"
          >
            হোম
          </button>
          
          <button
            onClick={() => onNavigate('marketplace')}
            className="text-emerald-900 font-bold border-b-2 border-emerald-800 pb-0.5 cursor-pointer"
          >
            পাইকারি বাজার
          </button>

          <button
            onClick={scrollToCategories}
            className="hover:text-emerald-900 transition-colors cursor-pointer"
          >
            পণ্য ক্যাটাগরি
          </button>

          <button
            onClick={() => {
              if (onFilterSellerType) onFilterSellerType('উৎপাদক');
            }}
            className="hover:text-emerald-900 transition-colors cursor-pointer"
          >
            উৎপাদক খুঁজুন
          </button>

          <button
            onClick={() => {
              if (onFilterSellerType) onFilterSellerType('সরবরাহকারী');
            }}
            className="hover:text-emerald-900 transition-colors cursor-pointer"
          >
            সরবরাহকারী খুঁজুন
          </button>
        </nav>

        {/* Right Actions: RFQ, Orders, Messages, Account */}
        <div className="hidden md:flex items-center gap-3">
          
          {/* Post RFQ Button */}
          <button
            onClick={onOpenRFQModal}
            className="px-3.5 py-2 text-xs font-bold text-emerald-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>RFQ আহ্বান করুন</span>
          </button>

          {/* If Logged In */}
          {isLoggedIn ? (
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => onNavigate('dashboard')}
                title="আমার অর্ডার"
                className="p-2 text-stone-600 hover:text-emerald-900 hover:bg-stone-100 rounded-xl cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('dashboard')}
                title="বার্তা"
                className="p-2 text-stone-600 hover:text-emerald-900 hover:bg-stone-100 rounded-xl cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('dashboard')}
                className="flex items-center gap-2 pl-2 border-l border-stone-200 cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-900 text-amber-300 font-bold flex items-center justify-center text-xs">
                  {currentUser.name.slice(0, 2)}
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-stone-900 leading-tight max-w-[100px] truncate">
                    {currentUser.name}
                  </div>
                  <div className="text-[10px] text-emerald-800 font-semibold leading-tight">
                    আমার ড্যাশবোর্ড
                  </div>
                </div>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('login')}
                className="px-3.5 py-2 text-xs font-semibold text-stone-700 hover:text-emerald-900 rounded-lg hover:bg-stone-100 cursor-pointer"
              >
                লগইন
              </button>
              <button
                onClick={() => onNavigate('signup')}
                className="px-4 py-2 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl shadow-xs cursor-pointer flex items-center gap-1"
              >
                <span>নিবন্ধন</span>
                <ArrowRight className="w-3 h-3 text-amber-300" />
              </button>
            </div>
          )}

        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenRFQModal}
            className="px-2.5 py-1.5 text-xs font-bold bg-amber-400 text-stone-950 rounded-lg"
          >
            RFQ
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-stone-600 hover:text-stone-900"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white px-4 py-4 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-2 text-sm font-semibold text-stone-800">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('home');
              }}
              className="text-left py-2 px-3 rounded-lg hover:bg-stone-50"
            >
              হোম
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('marketplace');
              }}
              className="text-left py-2 px-3 rounded-lg bg-emerald-50 text-emerald-900"
            >
              পাইকারি বাজার
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                scrollToCategories();
              }}
              className="text-left py-2 px-3 rounded-lg hover:bg-stone-50"
            >
              পণ্য ক্যাটাগরি
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onFilterSellerType) onFilterSellerType('উৎপাদক');
              }}
              className="text-left py-2 px-3 rounded-lg hover:bg-stone-50"
            >
              উৎপাদক খুঁজুন
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onFilterSellerType) onFilterSellerType('সরবরাহকারী');
              }}
              className="text-left py-2 px-3 rounded-lg hover:bg-stone-50"
            >
              সরবরাহকারী খুঁজুন
            </button>
          </div>

          <div className="pt-3 border-t border-stone-200 space-y-2">
            {isLoggedIn ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('dashboard');
                }}
                className="w-full py-2.5 bg-emerald-800 text-white rounded-xl text-xs font-bold text-center"
              >
                আমার ড্যাশবোর্ডে প্রবেশ করুন
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate('login');
                  }}
                  className="py-2 text-xs font-semibold text-emerald-900 bg-emerald-50 rounded-lg text-center"
                >
                  লগইন
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate('signup');
                  }}
                  className="py-2 text-xs font-bold text-white bg-emerald-800 rounded-lg text-center"
                >
                  নিবন্ধন করুন
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </header>
  );
};
