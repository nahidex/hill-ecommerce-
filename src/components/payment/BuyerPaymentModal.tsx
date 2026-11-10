import React, { useState } from 'react';
import { 
  Lock, 
  ShieldCheck, 
  CheckCircle2, 
  CreditCard, 
  Building2, 
  Smartphone, 
  X, 
  ArrowRight, 
  AlertCircle, 
  FileText,
  DollarSign,
  QrCode,
  Check,
  Clock,
  Loader2
} from 'lucide-react';
import { 
  OrderItem, 
  PaymentMethodType, 
  BuyerPaymentTransaction, 
  EscrowRecord 
} from '../../types';
import { SAMPLE_PAYMENT_PROVIDERS } from '../../data/escrowMock';

interface BuyerPaymentModalProps {
  order: OrderItem;
  isOpen: boolean;
  onClose: () => void;
  onCompletePayment: (paymentData: {
    orderId: string;
    orderNumber: string;
    amount: number;
    paymentMethod: PaymentMethodType;
    providerName: string;
    transactionRef: string;
  }) => void;
}

export const BuyerPaymentModal: React.FC<BuyerPaymentModalProps> = ({
  order,
  isOpen,
  onClose,
  onCompletePayment
}) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType>('bank_transfer');
  const [selectedProviderId, setSelectedProviderId] = useState<string>('prov-sonali');
  const [paymentStep, setPaymentStep] = useState<'review' | 'provider_gateway' | 'processing' | 'success'>('review');
  const [simulatedAccountNo, setSimulatedAccountNo] = useState('০১২০-৪৪০০৯২১');
  const [simulatedOtp, setSimulatedOtp] = useState('১ ২ ৩ ৪');
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedTxRef, setGeneratedTxRef] = useState('');

  if (!isOpen) return null;

  // Breakdown calculation
  const productTotal = order.totalProductPrice || (order.quantity * order.unitPrice);
  const shippingCost = order.shippingCost || 4500;
  const packagingCost = order.packagingCost || 800;
  const grandTotal = order.totalAmount || (productTotal + shippingCost + packagingCost);

  const matchedProvider = SAMPLE_PAYMENT_PROVIDERS.find(p => p.id === selectedProviderId) || SAMPLE_PAYMENT_PROVIDERS[0];

  const handleSelectMethod = (method: PaymentMethodType, providerId: string) => {
    setSelectedMethod(method);
    setSelectedProviderId(providerId);
  };

  const handleProceedToGateway = () => {
    setPaymentStep('provider_gateway');
  };

  const handleConfirmSimulatedPayment = () => {
    setIsProcessing(true);
    setPaymentStep('processing');

    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const prefix = selectedMethod === 'bank_transfer' ? 'SBL-RTGS' : selectedMethod === 'mfs_bkash' ? 'BKASH-PGW' : 'BBL-CARD';
    const txRef = `${prefix}-${randomSuffix}`;
    setGeneratedTxRef(txRef);

    setTimeout(() => {
      setIsProcessing(false);
      setPaymentStep('success');

      onCompletePayment({
        orderId: order.id,
        orderNumber: order.orderNumber,
        amount: grandTotal,
        paymentMethod: selectedMethod,
        providerName: matchedProvider.name,
        transactionRef: txRef
      });
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto font-bengali">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-stone-200 animate-in fade-in">
        
        {/* Header */}
        <div className="p-4 bg-stone-100 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-800 text-amber-300 flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-sm sm:text-base">
                নিরাপদ এসক্রো পেমেন্ট পোর্টাল (Escrow Checkout)
              </h3>
              <p className="text-[11px] text-stone-500">
                অর্ডার: <span className="font-mono font-bold text-emerald-950">{order.orderNumber}</span> · পার্বত্য চট্টগ্রাম বিষয়ক মন্ত্রণালয়
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-xs">
          
          {/* STEP 1: REVIEW & METHOD SELECTION */}
          {paymentStep === 'review' && (
            <div className="space-y-5">
              
              {/* Escrow Trust Assurance */}
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
                <div className="space-y-0.5 text-[11px] leading-relaxed">
                  <div className="font-bold text-emerald-950">শতভাগ নিরাপদ এসক্রো ট্রাস্ট মডেল:</div>
                  <p className="text-stone-700">
                    আপনার পরিশোধিত অর্থ সরাসরি বিক্রেতার কাছে যাবে না। এটি অনুমোদিত তফসিলি ব্যাংকের এসক্রো অ্যাকাউন্টে সুরক্ষিত থাকবে। পণ্য বুঝে পেয়ে আপনার সন্তোষজনক GRN ছাড়পত্রের পরই বিক্রেতা অর্থ পাবেন।
                  </p>
                </div>
              </div>

              {/* Order Cost Breakdown Box */}
              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/70 space-y-2.5">
                <span className="font-bold text-stone-900 text-xs block pb-1 border-b border-stone-200">
                  অর্ডারের আর্থিক বিবরণী (ORDER SUMMARY)
                </span>

                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-stone-600">পণ্য: {order.productName} ({order.quantity} {order.unit}):</span>
                    <span className="font-bold text-stone-900">৳{productTotal.toLocaleString('bn-BD')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-600">পাহাড়ি পরিবহন ও লজিস্টিকস ভাড়া:</span>
                    <span className="font-bold text-stone-900">৳{shippingCost.toLocaleString('bn-BD')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-600">প্যাকেজিং ও অন্যান্য সম্মত খরচ:</span>
                    <span className="font-bold text-stone-900">৳{packagingCost.toLocaleString('bn-BD')}</span>
                  </div>
                  <div className="pt-2 border-t border-stone-200 flex justify-between items-center text-sm font-bold">
                    <span className="text-emerald-950">সর্বমোট প্রদেয় অর্থ:</span>
                    <span className="text-emerald-900 text-base">৳{grandTotal.toLocaleString('bn-BD')}</span>
                  </div>
                </div>

                <div className="text-[10px] text-stone-500 pt-1">
                  বিক্রেতা: <strong>{order.sellerName}</strong> ({order.sellerCompany || 'ভেরিফাইড পাহাড়ি উৎপাদক'})
                </div>
              </div>

              {/* Payment Methods Options */}
              <div className="space-y-2.5">
                <label className="font-bold text-stone-800 block text-xs">
                  পেমেন্ট পদ্ধতি ও অনুমোদিত আর্থিক প্রতিষ্ঠান নির্বাচন করুন:
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  
                  {/* Sonali Bank */}
                  <div 
                    onClick={() => handleSelectMethod('bank_transfer', 'prov-sonali')}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex items-start gap-3 ${
                      selectedMethod === 'bank_transfer' && selectedProviderId === 'prov-sonali'
                        ? 'border-emerald-800 bg-emerald-50/80 ring-1 ring-emerald-800'
                        : 'border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-900 text-white flex items-center justify-center shrink-0">
                      <Building2 className="w-4 h-4 text-amber-300" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-stone-900 text-xs">সোনালী ব্যাংক পিএলসি</div>
                      <div className="text-[10px] text-stone-500">ট্রেজারি ও এসক্রো ট্রাস্ট অ্যাকাউন্ট (RTGS/EFT)</div>
                      <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold mt-1 inline-block">
                        মন্ত্রণালয় অফিসিয়াল পার্টনার
                      </span>
                    </div>
                  </div>

                  {/* BRAC Bank */}
                  <div 
                    onClick={() => handleSelectMethod('card_gateway', 'prov-brac')}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex items-start gap-3 ${
                      selectedMethod === 'card_gateway' && selectedProviderId === 'prov-brac'
                        ? 'border-emerald-800 bg-emerald-50/80 ring-1 ring-emerald-800'
                        : 'border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-900 text-white flex items-center justify-center shrink-0">
                      <CreditCard className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-stone-900 text-xs">ব্র্যাক ব্যাংক কর্পোরেট গেটওয়ে</div>
                      <div className="text-[10px] text-stone-500">ভিসা / মাস্টারকার্ড ও কর্পোরেট ব্যাংকিং</div>
                      <span className="text-[9px] bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded font-bold mt-1 inline-block">
                        ইনস্ট্যান্ট ভেরিফিকেশন
                      </span>
                    </div>
                  </div>

                  {/* bKash */}
                  <div 
                    onClick={() => handleSelectMethod('mfs_bkash', 'prov-bkash')}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex items-start gap-3 ${
                      selectedMethod === 'mfs_bkash'
                        ? 'border-pink-700 bg-pink-50/70 ring-1 ring-pink-700'
                        : 'border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-pink-700 text-white flex items-center justify-center shrink-0">
                      <Smartphone className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-stone-900 text-xs">বিকাশ মার্চেন্ট এগ্রো গেটওয়ে</div>
                      <div className="text-[10px] text-stone-500">বিকাশ ওয়ালেট ও মার্চেন্ট কিউআর কোড</div>
                      <span className="text-[9px] bg-pink-100 text-pink-800 px-1.5 py-0.2 rounded font-bold mt-1 inline-block">
                        বাংলাদেশ ব্যাংক অনুমোদিত MFS
                      </span>
                    </div>
                  </div>

                  {/* Nagad */}
                  <div 
                    onClick={() => handleSelectMethod('mfs_nagad', 'prov-nagad')}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex items-start gap-3 ${
                      selectedMethod === 'mfs_nagad'
                        ? 'border-orange-600 bg-orange-50/70 ring-1 ring-orange-600'
                        : 'border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-orange-600 text-white flex items-center justify-center shrink-0">
                      <Smartphone className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-stone-900 text-xs">নগদ ইসলামিক ও ডিজিটাল ওয়ালেট</div>
                      <div className="text-[10px] text-stone-500">ডাক অধিদপ্তর সংলগ্ন ডিজিটাল লেনদেন</div>
                      <span className="text-[9px] bg-orange-100 text-orange-800 px-1.5 py-0.2 rounded font-bold mt-1 inline-block">
                        ডিজিটাল ডাক সেবা
                      </span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Simulation Disclaimer (§1, §3) */}
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-950 text-[11px] leading-relaxed">
                <strong>ডেমো প্রোটোটাইপ বিজ্ঞপ্তি:</strong> এটি একটি সিমুলেটেড পেমেন্ট প্রসেসিং ইন্টারফেস। আপনার কোনো ব্যাংক হিসাব থেকে বাস্তব টাকা কর্তন করা হবে না এবং কোনো কার্ডের সংবেদনশীল গোপন তথ্য সংগ্রহ করা হয় না।
              </div>

              {/* Bottom Actions */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl border border-stone-300 text-stone-600 font-semibold hover:bg-stone-50 cursor-pointer"
                >
                  বাতিল
                </button>
                <button
                  type="button"
                  onClick={handleProceedToGateway}
                  className="px-5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <span>অনুমোদিত গেটওয়েতে যান (৳{grandTotal.toLocaleString('bn-BD')})</span>
                  <ArrowRight className="w-4 h-4 text-amber-300" />
                </button>
              </div>

            </div>
          )}

          {/* STEP 2: SIMULATED BANK / MFS SECURE GATEWAY */}
          {paymentStep === 'provider_gateway' && (
            <div className="space-y-5 animate-in fade-in">
              
              <div className="p-4 bg-stone-900 text-white rounded-xl space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-amber-400 font-bold uppercase">{matchedProvider.name}</span>
                  <span className="text-stone-400 font-mono">256-Bit SSL Encrypted</span>
                </div>
                <div className="text-xs text-stone-300">
                  মার্চেন্ট অ্যাকাউন্ট: <strong>Hill eCommerce Ministry Escrow Trust</strong>
                </div>
                <div className="text-lg font-bold text-white pt-1">
                  পরিশোধযোগ্য অর্থ: ৳{grandTotal.toLocaleString('bn-BD')}
                </div>
              </div>

              {/* Gateway Simulation Inputs */}
              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 space-y-3">
                <div className="text-xs font-bold text-stone-900">
                  {matchedProvider.shortName} এসক্রো গেটওয়ে সিমুলেশন:
                </div>

                <div>
                  <label className="block text-stone-600 text-[11px] mb-1 font-semibold">
                    {selectedMethod === 'bank_transfer' ? 'ব্যাংক হিসাব নম্বর:' : 'মোবাইল ওয়ালেট নম্বর:'}
                  </label>
                  <input
                    type="text"
                    value={simulatedAccountNo}
                    onChange={(e) => setSimulatedAccountNo(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-lg p-2 font-mono text-stone-900 focus:ring-1 focus:ring-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 text-[11px] mb-1 font-semibold">
                    ওয়ান-টাইম সিকিউরিটি কোড (সিমুলেটেড OTP):
                  </label>
                  <input
                    type="text"
                    value={simulatedOtp}
                    onChange={(e) => setSimulatedOtp(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-lg p-2 font-mono text-stone-900 focus:ring-1 focus:ring-emerald-700"
                  />
                  <span className="text-[10px] text-stone-400 mt-1 block">
                    (ডেমো পরিবেশ: যেকোনো ৪-সংখ্যার ডেমো কোড গ্রহণযোগ্য)
                  </span>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-[11px] text-emerald-950 flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-800 shrink-0" />
                <span>নিরাপত্তা প্রতিশ্রুতি: প্ল্যাটফর্মে কোনো পাসওয়ার্ড, পিন বা ওটিপি সংরক্ষণ করা হয় না।</span>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setPaymentStep('review')}
                  className="px-4 py-2 rounded-xl border border-stone-300 text-stone-600 font-semibold cursor-pointer"
                >
                  ← পুনরায় যাচাই
                </button>
                <button
                  type="button"
                  onClick={handleConfirmSimulatedPayment}
                  className="px-5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 text-amber-300" />
                  <span>পেমেন্ট নিশ্চিত করুন ও এসক্রোতে জমা দিন</span>
                </button>
              </div>

            </div>
          )}

          {/* STEP 3: PROCESSING SPINNER */}
          {paymentStep === 'processing' && (
            <div className="py-12 text-center space-y-4 animate-in fade-in">
              <Loader2 className="w-12 h-12 text-emerald-800 animate-spin mx-auto" />
              <div className="space-y-1">
                <h4 className="font-bold text-stone-900 text-base">
                  {matchedProvider.name} গেটওয়ের মাধ্যমে লেনদেন যাচাই হচ্ছে...
                </h4>
                <p className="text-xs text-stone-500">
                  এসক্রো ট্রাস্ট অ্যাকাউন্টে তহবিল জমা ও নিরাপত্তা ভেরিফিকেশন সম্পন্ন করা হচ্ছে।
                </p>
              </div>
            </div>
          )}

          {/* STEP 4: SUCCESS CONFIRMATION */}
          {paymentStep === 'success' && (
            <div className="space-y-5 animate-in fade-in py-2">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-stone-900 text-lg">
                  পেমেন্ট সফল ও এসক্রো ট্রাস্টে সংরক্ষিত!
                </h4>
                <p className="text-xs text-stone-600 max-w-md mx-auto">
                  আপনার <strong>৳{grandTotal.toLocaleString('bn-BD')}</strong> টাকা সোনালী ব্যাংক এসক্রো ট্রাস্টে জমা হয়েছে। বিক্রেতাকে সরবরাহ শুরুর নির্দেশনা পাঠানো হয়েছে।
                </p>
              </div>

              {/* Transaction Mini Receipt Card */}
              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 space-y-2 text-xs">
                <div className="flex justify-between pb-1 border-b border-stone-200">
                  <span className="text-stone-500">ট্রানজেকশন রেফারেন্স:</span>
                  <span className="font-bold font-mono text-stone-900">{generatedTxRef}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">অর্ডার নম্বর:</span>
                  <span className="font-bold font-mono text-emerald-950">{order.orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">আর্থিক প্রতিষ্ঠান:</span>
                  <span className="font-semibold text-stone-800">{matchedProvider.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">পরিশোধিত অর্থ:</span>
                  <span className="font-bold text-emerald-900 text-sm">৳{grandTotal.toLocaleString('bn-BD')}</span>
                </div>
              </div>

              <div className="flex items-center justify-center pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs shadow-xs cursor-pointer"
                >
                  সম্পন্ন করুন ও ড্যাশবোর্ডে ফিরুন
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
