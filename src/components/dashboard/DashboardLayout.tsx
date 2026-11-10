import React, { useState } from 'react';
import { 
  Mountain, 
  LayoutDashboard, 
  User, 
  Package, 
  ShoppingBag, 
  MessageSquare, 
  CreditCard, 
  Bell, 
  BarChart3, 
  Settings, 
  LogOut, 
  Search, 
  Store, 
  FileText, 
  Menu, 
  X, 
  CheckCircle, 
  ExternalLink,
  ChevronDown,
  ShieldCheck,
  Sparkles,
  Truck,
  Building2
} from 'lucide-react';
import { UserSession, AccountType, DashboardTab, PageView, NotificationItem } from '../../types';

interface DashboardLayoutProps {
  user: UserSession;
  activeTab: DashboardTab;
  onSelectTab: (tab: DashboardTab) => void;
  onSwitchRole: (newRole: AccountType) => void;
  onLogout: () => void;
  onNavigateToPublic: () => void;
  notifications: NotificationItem[];
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  user,
  activeTab,
  onSelectTab,
  onSwitchRole,
  onLogout,
  onNavigateToPublic,
  notifications,
  children
}) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  const unreadNotifsCount = notifications.filter(n => n.unread).length;

  // Sidebar Menu Items customized per role
  const getNavItems = () => {
    const baseItems = [
      { id: 'overview' as DashboardTab, label: 'ড্যাশবোর্ড', icon: LayoutDashboard },
      { id: 'profile' as DashboardTab, label: 'আমার প্রোফাইল', icon: User },
      { id: 'products' as DashboardTab, label: 'পণ্য ব্যবস্থাপনা', icon: Package },
      { id: 'orders' as DashboardTab, label: 'অর্ডার ব্যবস্থাপনা', icon: ShoppingBag }
    ];

    // Logistics & Delivery Nav Tab
    if (user.role === 'buyer') {
      baseItems.push({ id: 'logistics' as DashboardTab, label: 'আমার পণ্য সরবরাহ', icon: Truck });
    } else {
      baseItems.push({ id: 'logistics' as DashboardTab, label: 'লজিস্টিকস ও ডেলিভারি', icon: Truck });
    }

    if (user.role === 'buyer' || user.role === 'supplier') {
      baseItems.push({ id: 'rfq' as DashboardTab, label: 'কোটেশন ও RFQ', icon: FileText });
    }

    if (user.role === 'entrepreneur') {
      baseItems.push({ id: 'shop_settings' as DashboardTab, label: 'আমার অনলাইন শপ', icon: Store });
    }

    baseItems.push(
      { id: 'messages' as DashboardTab, label: 'বার্তা ও যোগাযোগ', icon: MessageSquare },
      { id: 'payments' as DashboardTab, label: 'পেমেন্ট ও লেনদেন', icon: CreditCard },
      { id: 'notifications' as DashboardTab, label: 'নোটিফিকেশন', icon: Bell },
      { id: 'reports' as DashboardTab, label: 'রিপোর্ট ও হিসাব', icon: BarChart3 },
      { id: 'ministry_monitor' as DashboardTab, label: 'মন্ত্রণালয় মনিটরিং', icon: Building2 },
      { id: 'settings' as DashboardTab, label: 'সেটিংস', icon: Settings }
    );

    return baseItems;
  };

  const navItems = getNavItems();

  const getRoleLabel = (role: AccountType) => {
    switch (role) {
      case 'farmer':
        return 'উৎপাদক / কৃষক';
      case 'supplier':
        return 'বিক্রেতা / সরবরাহকারী';
      case 'buyer':
        return 'পাইকারি ক্রেতা';
      case 'entrepreneur':
        return 'ব্যক্তিগত উদ্যোক্তা';
      case 'ministry_admin':
        return 'মন্ত্রণালয় প্রশাসক';
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col font-bengali">
      
      {/* 1. Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white border-b border-stone-200 shadow-2xs">
        
        {/* Micro Ministry Bar */}
        <div className="bg-emerald-950 text-emerald-100 text-[11px] py-1 px-4 text-center font-medium">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <span className="hidden sm:inline">পার্বত্য চট্টগ্রাম বিষয়ক মন্ত্রণালয় · ডিজিটাল মার্কেটপ্লেস হাব</span>
            <div className="flex items-center gap-2 mx-auto sm:mx-0">
              <span className="text-amber-400 font-bold">ডেমো মোড:</span>
              <span>অন্যান্য অ্যাকাউন্টে সুইচ করুন:</span>
              <div className="flex items-center gap-1 font-semibold">
                <button
                  onClick={() => onSwitchRole('farmer')}
                  className={`px-1.5 py-0.5 rounded text-[10px] cursor-pointer ${user.role === 'farmer' ? 'bg-amber-400 text-stone-950' : 'text-emerald-300 hover:text-white'}`}
                >
                  কৃষক
                </button>
                <span>·</span>
                <button
                  onClick={() => onSwitchRole('supplier')}
                  className={`px-1.5 py-0.5 rounded text-[10px] cursor-pointer ${user.role === 'supplier' ? 'bg-amber-400 text-stone-950' : 'text-emerald-300 hover:text-white'}`}
                >
                  সরবরাহকারী
                </button>
                <span>·</span>
                <button
                  onClick={() => onSwitchRole('buyer')}
                  className={`px-1.5 py-0.5 rounded text-[10px] cursor-pointer ${user.role === 'buyer' ? 'bg-amber-400 text-stone-950' : 'text-emerald-300 hover:text-white'}`}
                >
                  পাইকারি ক্রেতা
                </button>
                <span>·</span>
                <button
                  onClick={() => onSwitchRole('entrepreneur')}
                  className={`px-1.5 py-0.5 rounded text-[10px] cursor-pointer ${user.role === 'entrepreneur' ? 'bg-amber-400 text-stone-950' : 'text-emerald-300 hover:text-white'}`}
                >
                  উদ্যোক্তা
                </button>
                <span>·</span>
                <button
                  onClick={() => onSwitchRole('ministry_admin')}
                  className={`px-1.5 py-0.5 rounded text-[10px] cursor-pointer font-bold ${user.role === 'ministry_admin' ? 'bg-amber-400 text-stone-950 shadow-xs' : 'text-amber-300 hover:text-white'}`}
                >
                  মন্ত্রণালয় প্রশাসক
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navbar Bar */}
        <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Left: Mobile Toggle & Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="lg:hidden p-2 text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-100"
            >
              {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <button
              onClick={onNavigateToPublic}
              className="flex items-center gap-2.5 text-left group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-800 to-emerald-950 flex items-center justify-center text-white shadow-xs">
                <Mountain className="w-5 h-5 text-amber-400" />
              </div>
              <span className="font-brand font-bold text-xl text-stone-900 tracking-tight hidden sm:inline">
                Hill <span className="text-amber-700">eCommerce</span>
              </span>
            </button>
          </div>

          {/* Center Search Bar */}
          <div className="relative max-w-xs sm:max-w-md w-full hidden md:block">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="ড্যাশবোর্ডে সার্চ করুন..."
              className="w-full text-xs bg-stone-50 border border-stone-200 rounded-xl pl-9 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-emerald-700 focus:bg-white transition-colors"
            />
          </div>

          {/* Right Actions: Notifications, Messages, Profile & Logout */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Public Storefront Link */}
            <button
              onClick={onNavigateToPublic}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-700 hover:text-emerald-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
            >
              <span>পাবলিক সাইট দেখুন</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                className="p-2 text-stone-600 hover:text-emerald-900 hover:bg-stone-100 rounded-xl relative cursor-pointer"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifsCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-600 ring-2 ring-white"></span>
                )}
              </button>

              {/* Notification Popover */}
              {notifDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-stone-200 p-4 z-50 animate-in fade-in">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-100 text-xs font-bold text-stone-900">
                    <span>নোটিফিকেশন ({unreadNotifsCount} নতুন)</span>
                    <button
                      onClick={() => {
                        setNotifDropdownOpen(false);
                        onSelectTab('notifications');
                      }}
                      className="text-emerald-800 hover:underline"
                    >
                      সব দেখুন
                    </button>
                  </div>
                  <div className="py-2 space-y-2 max-h-60 overflow-y-auto divide-y divide-stone-100">
                    {notifications.slice(0, 3).map(n => (
                      <div
                        key={n.id}
                        onClick={() => {
                          setNotifDropdownOpen(false);
                          if (n.linkTab) onSelectTab(n.linkTab);
                        }}
                        className="pt-2 text-xs cursor-pointer hover:text-emerald-900"
                      >
                        <div className="font-semibold text-stone-800">{n.title}</div>
                        <p className="text-[11px] text-stone-500 line-clamp-1">{n.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Messages Icon */}
            <button
              onClick={() => onSelectTab('messages')}
              className="p-2 text-stone-600 hover:text-emerald-900 hover:bg-stone-100 rounded-xl relative cursor-pointer"
            >
              <MessageSquare className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white"></span>
            </button>

            {/* Profile Block */}
            <div
              onClick={() => onSelectTab('profile')}
              className="flex items-center gap-2 pl-2 border-l border-stone-200 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-900 text-amber-300 flex items-center justify-center font-bold text-sm shadow-2xs">
                {user.name.slice(0, 2)}
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-xs font-bold text-stone-900 leading-tight truncate max-w-[120px]">
                  {user.name}
                </div>
                <div className="text-[10px] text-emerald-800 font-semibold leading-tight">
                  {getRoleLabel(user.role)}
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={onLogout}
              title="লগআউট করুন"
              className="p-2 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>

          </div>

        </div>
      </header>

      {/* 2. Body Container: Sidebar + Viewport */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex">
        
        {/* Desktop Sidebar (250px) */}
        <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-stone-200 py-6 px-4 space-y-6 shrink-0">
          
          {/* User mini badge in sidebar */}
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
            <div className="text-[10px] uppercase tracking-wider font-semibold text-stone-500">
              সক্রিয় অ্যাকাউন্ট
            </div>
            <div className="font-bold text-xs text-stone-900 truncate">{user.name}</div>
            <div className="text-[11px] text-emerald-800 font-medium">
              {getRoleLabel(user.role)}
            </div>
            <div className="pt-1 text-[10px] text-stone-400 font-mono">
              আইডি: {user.memberId}
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-emerald-900 text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-stone-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.id === 'notifications' && unreadNotifsCount > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-400 text-stone-950 tabular-nums">
                      {unreadNotifsCount}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Bottom Security Card */}
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-950 space-y-1">
            <div className="font-bold flex items-center gap-1 text-emerald-900">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>এসক্রো সুরক্ষিত হাব</span>
            </div>
            <p className="text-[10px] text-emerald-800 leading-snug">
              আপনার লেনদেন ও বিক্রয় শতভাগ মন্ত্রণালয়ের এসক্রো মডেল দ্বারা সুরক্ষিত।
            </p>
          </div>

        </aside>

        {/* Mobile Drawer */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div className="w-64 bg-white border-r border-stone-200 p-5 flex flex-col justify-between shadow-2xl">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-4">
                  <span className="font-brand font-bold text-lg text-emerald-950">Hill eCommerce</span>
                  <button onClick={() => setMobileSidebarOpen(false)} className="p-1">
                    <X className="w-5 h-5 text-stone-600" />
                  </button>
                </div>

                <nav className="space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          onSelectTab(item.id);
                          setMobileSidebarOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold ${
                          isActive ? 'bg-emerald-900 text-white' : 'text-stone-700 hover:bg-stone-100'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-4 border-t border-stone-200 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileSidebarOpen(false);
                    onNavigateToPublic();
                  }}
                  className="w-full py-2 text-xs font-semibold text-emerald-900 bg-emerald-50 rounded-lg text-center"
                >
                  পাবলিক সাইটে যান
                </button>
                <button
                  onClick={onLogout}
                  className="w-full py-2 text-xs font-semibold text-rose-700 hover:bg-rose-50 rounded-lg text-center"
                >
                  লগআউট করুন
                </button>
              </div>
            </div>
            <div className="flex-1 bg-stone-950/50" onClick={() => setMobileSidebarOpen(false)}></div>
          </div>
        )}

        {/* 3. Main Content Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-x-hidden">
          
          {/* Welcome Section */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-stone-900">
                  স্বাগতম, {user.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  {getRoleLabel(user.role)}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-600">
                আপনার ব্যবসায়িক কার্যক্রম ও লেনদেনের সারসংক্ষেপ এখানে দেখতে পারবেন।
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="text-right text-xs">
                <span className="text-stone-400 block text-[11px]">এলাকা</span>
                <span className="font-semibold text-stone-800">{user.upazila}, {user.district}</span>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" title="অনলাইন"></span>
            </div>
          </div>

          {/* Render Active Tab Children View */}
          {children}

        </main>

      </div>

    </div>
  );
};
