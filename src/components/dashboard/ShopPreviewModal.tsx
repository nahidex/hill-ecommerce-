import React from 'react';
import { X, Store, ExternalLink } from 'lucide-react';
import { UserSession } from '../../types';
import { ShopPreviewContent } from './ShopPreviewContent';

interface ShopPreviewModalProps {
  user: UserSession;
  isOpen: boolean;
  onClose: () => void;
}

export const ShopPreviewModal: React.FC<ShopPreviewModalProps> = ({ user, isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleOpenInNewTab = () => {
    const encodedUser = encodeURIComponent(JSON.stringify(user));
    const url = `${window.location.origin}${window.location.pathname}?shop=${encodedUser}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };


  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="relative bg-white rounded-2xl max-w-5xl w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Control Bar */}
        <div className="px-5 py-3 bg-stone-900 text-white flex items-center justify-between text-xs border-b border-stone-800">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-mono text-emerald-400 bg-stone-800 px-3 py-1 rounded-md text-[11px]">
              <Store className="w-3.5 h-3.5" />
              hillecommerce.gov.bd/shop/{user.role === 'entrepreneur' ? 'marma-crafts' : 'producer-store'}
            </span>
            <span className="hidden sm:inline text-stone-400">| গ্রাহক প্রিভিউ মোড</span>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-[11px] text-amber-300 font-semibold bg-amber-950/60 border border-amber-800/60 px-2 py-0.5 rounded">
              লাইভ প্রিভিউ
            </span>
            <button
              onClick={handleOpenInNewTab}
              className="p-1.5 flex items-center gap-1.5 text-stone-300 hover:text-white rounded-lg hover:bg-stone-800 transition-colors cursor-pointer text-[11px] font-semibold"
              title="নতুন ট্যাবে খুলুন"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="hidden sm:inline">নতুন ট্যাবে খুলুন</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <ShopPreviewContent user={user} />

      </div>
    </div>
  );
};
