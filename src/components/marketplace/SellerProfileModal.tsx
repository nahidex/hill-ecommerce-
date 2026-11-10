import React from 'react';
import { 
  X, 
  ShieldCheck, 
  MapPin, 
  Star, 
  Phone, 
  Mail, 
  Package, 
  CheckCircle2, 
  Building2, 
  MessageSquare,
  Award,
  Calendar
} from 'lucide-react';
import { SellerProfile, ProductItem } from '../../types';

interface SellerProfileModalProps {
  seller: SellerProfile | null;
  isOpen: boolean;
  onClose: () => void;
  sellerProducts: ProductItem[];
  onSelectProduct: (product: ProductItem) => void;
  onContactSeller: (seller: SellerProfile) => void;
}

export const SellerProfileModal: React.FC<SellerProfileModalProps> = ({
  seller,
  isOpen,
  onClose,
  sellerProducts,
  onSelectProduct,
  onContactSeller
}) => {
  if (!isOpen || !seller) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Cover Strip */}
        <div className="h-28 bg-gradient-to-r from-emerald-950 via-emerald-900 to-stone-900 relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/40 text-white hover:bg-black/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Details Header */}
        <div className="px-6 pb-6 pt-0 relative -mt-12 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-stone-200">
            <div className="flex items-end gap-3.5">
              <img
                src={seller.avatar}
                alt={seller.name}
                referrerPolicy="no-referrer"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover bg-white p-1 border border-stone-200 shadow-md shrink-0"
              />
              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h3 className="text-lg sm:text-xl font-bold text-stone-900">{seller.name}</h3>
                  {seller.verified && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded border border-emerald-300">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                      যাচাইকৃত
                    </span>
                  )}
                </div>
                <div className="text-xs font-semibold text-emerald-900">{seller.businessName}</div>
                <div className="text-[11px] text-stone-500 flex items-center gap-2 mt-0.5">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-700" />
                    {seller.upazila}, {seller.district}
                  </span>
                  <span>·</span>
                  <span>ব্যবসার ধরন: {seller.sellerType}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                onContactSeller(seller);
                onClose();
              }}
              className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
            >
              <MessageSquare className="w-3.5 h-3.5 text-amber-300" />
              <span>সরাসরি চ্যাট করুন</span>
            </button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-[10px] text-stone-500 block">গড় রেটিং</span>
              <span className="text-sm font-bold text-amber-800">★ {seller.rating}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-[10px] text-stone-500 block">তালিকাভুক্ত পণ্য</span>
              <span className="text-sm font-bold text-stone-900">{seller.listedProductsCount}টি</span>
            </div>
            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-[10px] text-stone-500 block">সফল লেনদেন</span>
              <span className="text-sm font-bold text-emerald-800">{seller.completedTransactions}+</span>
            </div>
            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-[10px] text-stone-500 block">প্ল্যাটফর্ম সদস্য</span>
              <span className="text-xs font-bold text-stone-700">{seller.joinedDate}</span>
            </div>
          </div>

          {/* Bio */}
          <div>
            <span className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-1">
              উদ্যোক্তার পরিচিতি ও উৎপাদন সক্ষমতা:
            </span>
            <p className="text-xs text-stone-600 leading-relaxed bg-stone-50 p-3 rounded-xl border border-stone-200">
              {seller.bio}
            </p>
          </div>

          {/* Seller's Products Preview */}
          <div className="space-y-2 pt-2">
            <span className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
              এই বিক্রেতার অন্যান্য পাইকারি লট ({sellerProducts.length})
            </span>

            <div className="space-y-2 max-h-48 overflow-y-auto">
              {sellerProducts.map(p => (
                <div
                  key={p.id}
                  onClick={() => {
                    onSelectProduct(p);
                    onClose();
                  }}
                  className="p-2.5 rounded-xl border border-stone-200 hover:border-emerald-400 hover:bg-stone-50 flex items-center justify-between gap-3 text-xs cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <img src={p.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <div className="font-bold text-stone-900">{p.name}</div>
                      <div className="text-[10px] text-stone-500">মজুত: {p.availableQuantity} {p.unit} · {p.origin}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-emerald-900 tabular-nums">৳{p.pricePerUnit}/{p.unit}</div>
                    <span className="text-[10px] text-stone-400">বিস্তারিত দেখুন →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
