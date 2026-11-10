import React, { useState } from 'react';
import { 
  X, 
  Send, 
  Paperclip, 
  CheckCircle2, 
  MessageSquare, 
  Image as ImageIcon, 
  FileText 
} from 'lucide-react';
import { ProductItem, UserSession } from '../../types';

interface MarketplaceInquiryModalProps {
  product: ProductItem | null;
  isOpen: boolean;
  onClose: () => void;
  buyer: UserSession;
  onSendInquiryMessage: (messageText: string) => void;
}

export const MarketplaceInquiryModal: React.FC<MarketplaceInquiryModalProps> = ({
  product,
  isOpen,
  onClose,
  buyer,
  onSendInquiryMessage
}) => {
  if (!isOpen || !product) return null;

  const [inquiryType, setInquiryType] = useState<'quote' | 'order' | 'shipping' | 'quality'>('quote');
  const [message, setMessage] = useState(`নমস্কার ${product.producerName} সাহেব, আমরা আপনার ${product.name} পাইকারি লট সম্পর্কে বিস্তারিত জানতে আগ্রহী।`);
  const [attachment, setAttachment] = useState<string | null>(null);
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSendInquiryMessage(message);
    setSentSuccess(true);
    setTimeout(() => {
      setSentSuccess(false);
      onClose();
    }, 1800);
  };

  const handleSimulateAttachment = () => {
    setAttachment('trade_inquiry_specifications.pdf');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-stone-200 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-emerald-800" />
            <div>
              <h3 className="text-sm font-bold text-stone-900">
                বিক্রেতার সঙ্গে সরাসরি ইনকোয়ারি
              </h3>
              <p className="text-[11px] text-stone-500">প্রাপক: {product.producerName}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {sentSuccess ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7 text-emerald-700" />
            </div>
            <h4 className="text-base font-bold text-stone-900">ইনকোয়ারি বার্তা সফলভাবে পাঠানো হয়েছে!</h4>
            <p className="text-xs text-stone-600">
              বিক্রেতা বার্তাটি পেয়েছেন। আপনার ড্যাশবোর্ড মেসেজিং সেন্টারে এর উত্তর দেখতে পাবেন।
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            
            {/* Target Product */}
            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-center gap-3 text-xs">
              <img src={product.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
              <div>
                <div className="font-bold text-stone-900">{product.name}</div>
                <div className="text-[11px] text-emerald-800">তালিকাভুক্ত দর: ৳{product.pricePerUnit}/{product.unit}</div>
              </div>
            </div>

            {/* Inquiry Subject/Category */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                যোগাযোগের বিষয়
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setInquiryType('quote')}
                  className={`py-1.5 px-2.5 rounded-lg border text-left cursor-pointer ${inquiryType === 'quote' ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-bold' : 'border-stone-200 text-stone-700'}`}
                >
                  দর ও কোটেশন আলোচনা
                </button>
                <button
                  type="button"
                  onClick={() => setInquiryType('shipping')}
                  className={`py-1.5 px-2.5 rounded-lg border text-left cursor-pointer ${inquiryType === 'shipping' ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-bold' : 'border-stone-200 text-stone-700'}`}
                >
                  লজিস্টিকস ও পরিবহন
                </button>
              </div>
            </div>

            {/* Message Body */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                আপনার বার্তা
              </label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700"
              />
            </div>

            {/* Attachment Simulator */}
            <div>
              {attachment ? (
                <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50 text-xs text-emerald-950 border border-emerald-200">
                  <div className="flex items-center gap-1.5 truncate">
                    <FileText className="w-4 h-4 text-emerald-700" />
                    <span className="truncate">{attachment}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAttachment(null)}
                    className="text-stone-400 hover:text-stone-700 ml-2"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleSimulateAttachment}
                  className="text-xs text-stone-600 hover:text-emerald-900 flex items-center gap-1.5 py-1 px-2 rounded hover:bg-stone-100 transition-colors cursor-pointer"
                >
                  <Paperclip className="w-3.5 h-3.5" />
                  <span>কাগজপত্র বা ছবি সংযুক্ত করুন (PDF/JPG)</span>
                </button>
              )}
            </div>

            <div className="pt-2 border-t border-stone-200 flex justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-stone-600 rounded-lg hover:bg-stone-100"
              >
                বাতিল
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-amber-300" />
                <span>বার্তা পাঠান</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
