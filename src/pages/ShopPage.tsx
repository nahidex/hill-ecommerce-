import React from 'react';
import { Store } from 'lucide-react';
import { UserSession } from '../types';
import { ShopPreviewContent } from '../components/dashboard/ShopPreviewContent';

interface ShopPageProps {
  user: UserSession;
}

export const ShopPage: React.FC<ShopPageProps> = ({ user }) => {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <div className="px-5 py-3 bg-stone-900 text-white flex items-center gap-3 text-xs border-b border-stone-800">
        <span className="flex items-center gap-1.5 font-mono text-emerald-400 bg-stone-800 px-3 py-1 rounded-md text-[11px]">
          <Store className="w-3.5 h-3.5" />
          hillecommerce.gov.bd/shop/{user.role === 'entrepreneur' ? 'marma-crafts' : 'producer-store'}
        </span>
        <span className="hidden sm:inline text-stone-400">| গ্রাহক প্রিভিউ মোড</span>
      </div>

      <ShopPreviewContent user={user} />
    </div>
  );
};
