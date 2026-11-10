import React, { useState } from 'react';
import { 
  X, 
  Scale, 
  CheckCircle2, 
  XCircle, 
  Send, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  DollarSign 
} from 'lucide-react';
import { ProductItem, UserSession } from '../../types';

interface PriceNegotiationModalProps {
  product: ProductItem | null;
  isOpen: boolean;
  onClose: () => void;
  buyer: UserSession;
  onFinalDealAgreed: (product: ProductItem, agreedPrice: number) => void;
}

export const PriceNegotiationModal: React.FC<PriceNegotiationModalProps> = ({
  product,
  isOpen,
  onClose,
  buyer,
  onFinalDealAgreed
}) => {
  if (!isOpen || !product) return null;

  const sellerInitial = product.pricePerUnit;
  const buyerInitialProposal = Math.round(sellerInitial * 0.88);

  const [counterOfferInput, setCounterOfferInput] = useState<number>(buyerInitialProposal);
  const [negotiationStatus, setNegotiationStatus] = useState<'in_progress' | 'agreed' | 'rejected'>('in_progress');
  const [agreedPrice, setAgreedPrice] = useState<number>(Math.round((sellerInitial + buyerInitialProposal) / 2));

  const [history, setHistory] = useState([
    {
      sender: `${product.producerName} (বিক্রেতা)`,
      isSeller: true,
      priceOffer: sellerInitial,
      note: 'আমাদের প্রাথমিক পাইকারি তালিকাভুক্ত দর। ফলগুলো সরাসরি পাহাড় থেকে বাছাইকৃত গ্রেড-এ।',
      time: 'সকাল ১০:০০'
    },
    {
      sender: `${buyer.name} (ক্রেতা)`,
      isSeller: false,
      priceOffer: buyerInitialProposal,
      note: 'আমরা এককালীন বড় লটে নিচ্ছি, পরিবহন খরচ বিবেচনায় এই দরটি অনুকূল হবে।',
      time: 'সকাল ১০:০৫'
    },
    {
      sender: `${product.producerName} (বিক্রেতা)`,
      isSeller: true,
      priceOffer: Math.round((sellerInitial * 0.94)),
      note: 'মন্ত্রণালয় এসক্রো নিশ্চিত থাকলে আমরা প্রতি এককে কিছুটা ছাড় দিয়ে এই কাউন্টার-অফার দিচ্ছি।',
      time: 'সকাল ১০:১০'
    }
  ]);

  const handleSendCounterOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!counterOfferInput) return;

    const newStep = {
      sender: `${buyer.name} (ক্রেতা)`,
      isSeller: false,
      priceOffer: counterOfferInput,
      note: 'আমার সর্বশেষ প্রস্তাবিত চূড়ান্ত দর। এটি মানলে অবিলম্বে অর্ডার নিশ্চিত করব।',
      time: 'এইমাত্র'
    };

    setHistory(prev => [...prev, newStep]);

    // Simulate seller agreeing if close to mid-range
    setTimeout(() => {
      const mid = Math.round((sellerInitial + counterOfferInput) / 2);
      setAgreedPrice(mid);
      const sellerAccept = {
        sender: `${product.producerName} (বিক্রেতা)`,
        isSeller: true,
        priceOffer: mid,
        note: `সম্মতি প্রদান করা হলো! চূড়ান্ত দর ৳${mid} / ${product.unit} নির্ধারণ করা হোক।`,
        time: 'এইমাত্র'
      };
      setHistory(prev => [...prev, sellerAccept]);
      setNegotiationStatus('agreed');
    }, 1200);
  };

  const handleAcceptFinal = () => {
    onFinalDealAgreed(product, agreedPrice);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-800 text-amber-300 flex items-center justify-center">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-900">
                লাইভ মূল্য আলোচনা (Price Negotiation System)
              </h3>
              <p className="text-[11px] text-stone-500">
                পণ্য: {product.name} ({product.district})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Price Anchors Top Bar */}
        <div className="p-4 bg-emerald-950 text-white grid grid-cols-3 gap-2 text-center text-xs">
          <div className="p-2 rounded-lg bg-emerald-900/60 border border-emerald-800">
            <span className="text-[10px] text-emerald-300 block">বিক্রেতার মূল দর</span>
            <span className="text-base font-bold text-white tabular-nums">৳{sellerInitial}</span>
            <span className="text-[10px] text-stone-300"> / {product.unit}</span>
          </div>

          <div className="p-2 rounded-lg bg-emerald-900/60 border border-emerald-800">
            <span className="text-[10px] text-emerald-300 block">ক্রেতার প্রস্তাবনা</span>
            <span className="text-base font-bold text-amber-300 tabular-nums">৳{counterOfferInput}</span>
            <span className="text-[10px] text-stone-300"> / {product.unit}</span>
          </div>

          <div className="p-2 rounded-lg bg-emerald-900/90 border border-amber-400/60">
            <span className="text-[10px] text-amber-300 block font-bold">সম্ভাব্য সমঝোতা দর</span>
            <span className="text-base font-bold text-amber-400 tabular-nums">৳{agreedPrice}</span>
            <span className="text-[10px] text-stone-200"> / {product.unit}</span>
          </div>
        </div>

        {/* Negotiation Chat/History Thread */}
        <div className="flex-1 p-5 overflow-y-auto space-y-3.5 bg-stone-50/50">
          <div className="text-center text-[11px] text-stone-400 py-1">
            মন্ত্রণালয় অনুমোদিত দ্বিপাক্ষিক দরকষাকষি চ্যানেল · সব অফার ডিজিটালভাবে সংরক্ষিত
          </div>

          {history.map((step, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-xl border max-w-[85%] ${
                step.isSeller
                  ? 'bg-white border-stone-200 ml-0 mr-auto shadow-2xs'
                  : 'bg-emerald-900 border-emerald-800 text-white ml-auto mr-0 shadow-2xs'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] pb-1 border-b border-stone-100/30 mb-1.5">
                <span className={`font-bold ${step.isSeller ? 'text-stone-900' : 'text-amber-300'}`}>
                  {step.sender}
                </span>
                <span className="text-[10px] opacity-70 tabular-nums">{step.time}</span>
              </div>

              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-xs font-semibold">প্রস্তাবিত দর:</span>
                <span className={`text-base font-bold tabular-nums ${step.isSeller ? 'text-emerald-900' : 'text-amber-400'}`}>
                  ৳{step.priceOffer} / {product.unit}
                </span>
              </div>

              <p className="text-xs leading-relaxed opacity-90">{step.note}</p>
            </div>
          ))}

          {negotiationStatus === 'agreed' && (
            <div className="p-4 rounded-xl bg-emerald-100 border border-emerald-300 text-center space-y-2 animate-in zoom-in-95">
              <CheckCircle2 className="w-8 h-8 text-emerald-700 mx-auto" />
              <div className="font-bold text-emerald-950 text-sm">
                অভিনন্দন! উভয় পক্ষ ৳{agreedPrice} / {product.unit} দরে একমত হয়েছেন।
              </div>
              <p className="text-xs text-emerald-800">
                এই দরে সরাসরি বাল্ক অর্ডার রিকোয়েস্ট নিশ্চিত করুন।
              </p>
              <button
                onClick={handleAcceptFinal}
                className="mt-2 px-6 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
              >
                এই দরে ক্রয় অনুরোধ কনফার্ম করুন
              </button>
            </div>
          )}
        </div>

        {/* Counter Offer Input Bar */}
        {negotiationStatus === 'in_progress' && (
          <form onSubmit={handleSendCounterOffer} className="p-4 bg-white border-t border-stone-200 flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-stone-700">নতুন অফার (৳):</span>
              <input
                type="number"
                min={1}
                value={counterOfferInput}
                onChange={(e) => setCounterOfferInput(Number(e.target.value))}
                className="w-24 px-2.5 py-1.5 text-xs font-bold border border-stone-300 rounded-lg tabular-nums focus:outline-none focus:ring-1 focus:ring-emerald-700"
              />
            </div>

            <button
              type="submit"
              className="flex-1 py-2 px-4 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>কাউন্টার-অফার পাঠান</span>
              <Send className="w-3.5 h-3.5 text-amber-300" />
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
