import React, { useState } from 'react';
import { 
  Bell, 
  CheckCircle2, 
  Clock, 
  Package, 
  FileText, 
  DollarSign, 
  Truck, 
  MessageSquare, 
  Check
} from 'lucide-react';
import { NotificationItem, DashboardTab } from '../../types';

interface NotificationsModuleProps {
  notifications: NotificationItem[];
  onSelectTab: (tab: DashboardTab) => void;
}

export const NotificationsModule: React.FC<NotificationsModuleProps> = ({
  notifications,
  onSelectTab
}) => {
  const [items, setItems] = useState<NotificationItem[]>(notifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const markAllAsRead = () => {
    setItems(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const markSingleAsRead = (id: string, linkTab?: DashboardTab) => {
    setItems(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
    if (linkTab) {
      onSelectTab(linkTab);
    }
  };

  const filteredItems = items.filter(n => {
    if (filter === 'unread') return n.unread;
    return true;
  });

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'order':
        return <Package className="w-4 h-4 text-emerald-800" />;
      case 'payment':
        return <DollarSign className="w-4 h-4 text-emerald-800" />;
      case 'rfq':
        return <FileText className="w-4 h-4 text-amber-700" />;
      case 'delivery':
        return <Truck className="w-4 h-4 text-amber-700" />;
      default:
        return <Bell className="w-4 h-4 text-stone-600" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden animate-in fade-in">
      
      {/* Header */}
      <div className="p-5 border-b border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-stone-900">নোটিফিকেশন সেন্টার</h3>
          <p className="text-xs text-stone-500 mt-0.5">
            নতুন অর্ডার, এসক্রো পেমেন্ট, কোটেশন ও ডেলিভারির রিয়েল-টাইম তথ্য
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center p-1 bg-stone-100 rounded-lg text-xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded font-medium ${filter === 'all' ? 'bg-white shadow-2xs font-bold text-stone-900' : 'text-stone-600'}`}
            >
              সকল নোটিফিকেশন
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-3 py-1 rounded font-medium ${filter === 'unread' ? 'bg-white shadow-2xs font-bold text-stone-900' : 'text-stone-600'}`}
            >
              অপঠিত
            </button>
          </div>

          <button
            onClick={markAllAsRead}
            className="px-3 py-1.5 text-xs text-emerald-800 hover:bg-emerald-50 rounded-lg font-semibold transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Check className="w-3.5 h-3.5" />
            <span>সব পড়া হয়েছে</span>
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="divide-y divide-stone-100">
        {filteredItems.length === 0 ? (
          <div className="py-16 text-center text-xs text-stone-500">
            কোনো নোটিফিকেশন নেই।
          </div>
        ) : (
          filteredItems.map((n) => (
            <div
              key={n.id}
              onClick={() => markSingleAsRead(n.id, n.linkTab)}
              className={`p-4 sm:p-5 flex items-start justify-between gap-4 transition-colors cursor-pointer ${
                n.unread ? 'bg-emerald-50/40 hover:bg-emerald-50/70' : 'hover:bg-stone-50'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-stone-100 flex items-center justify-center shrink-0 border border-stone-200 mt-0.5">
                  {getIcon(n.type)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className={`text-xs sm:text-sm font-bold ${n.unread ? 'text-stone-900' : 'text-stone-700'}`}>
                      {n.title}
                    </h4>
                    {n.unread && (
                      <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                    )}
                  </div>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    {n.message}
                  </p>
                  <div className="text-[10px] text-stone-400 mt-1">
                    {n.time}
                  </div>
                </div>
              </div>

              {n.linkTab && (
                <span className="text-[11px] font-semibold text-emerald-800 shrink-0 hover:underline">
                  দেখুন →
                </span>
              )}
            </div>
          ))
        )}
      </div>

    </div>
  );
};
