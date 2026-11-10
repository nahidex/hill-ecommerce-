import React from 'react';
import { X, Printer, Download, Mountain, ShieldCheck, CheckCircle2, FileText } from 'lucide-react';
import { OrderItem } from '../../types';

interface OrderPrintableInvoiceModalProps {
  order: OrderItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const OrderPrintableInvoiceModal: React.FC<OrderPrintableInvoiceModalProps> = ({
  order,
  isOpen,
  onClose
}) => {
  if (!isOpen || !order) return null;

  const handlePrint = () => {
    window.print();
  };

  const productTotal = order.totalProductPrice || (order.quantity * order.unitPrice);
  const shipping = order.shippingCost || 0;
  const packaging = order.packagingCost || 0;
  const grandTotal = order.totalAmount || (productTotal + shipping + packaging);

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95">
        
        {/* Top Control Bar (Hidden when printed) */}
        <div className="p-4 bg-stone-900 text-white rounded-t-2xl flex items-center justify-between border-b border-stone-800 print:hidden">
          <div className="flex items-center gap-2">
            <Printer className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold">অফিসিয়াল পাইকারি চালান ও কোটেশন নথি</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-1.5 bg-amber-400 hover:bg-amber-300 text-stone-950 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>প্রিন্ট করুন</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-white rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Content Area */}
        <div className="p-8 sm:p-10 overflow-y-auto flex-1 font-bengali text-stone-900 space-y-6 print:p-0">
          
          {/* Government & Platform Header */}
          <div className="text-center border-b-2 border-emerald-950 pb-6 space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-950 text-xs font-bold border border-emerald-200">
              <Mountain className="w-4 h-4 text-amber-600" />
              <span>গণপ্রজাতন্ত্রী বাংলাদেশ সরকার · পার্বত্য চট্টগ্রাম বিষয়ক মন্ত্রণালয়</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 tracking-tight mt-1">
              Hill eCommerce B2B পাইকারি চালান ও চুক্তিপত্র
            </h1>
            <p className="text-xs text-stone-500 font-medium">
              পার্বত্য অঞ্চলের ডিজিটাল পাইকারি বাজার প্ল্যাটফর্ম · এসক্রো সুরক্ষিত সরকারি মডেল
            </p>
          </div>

          {/* Invoice Meta Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs">
            <div>
              <span className="text-stone-400 block text-[10px] uppercase font-bold">চালান / অর্ডার নং</span>
              <span className="font-mono font-bold text-stone-900 text-sm">{order.orderNumber}</span>
            </div>
            <div>
              <span className="text-stone-400 block text-[10px] uppercase font-bold">তারিখ</span>
              <span className="font-semibold text-stone-800">{order.orderDate}</span>
            </div>
            <div>
              <span className="text-stone-400 block text-[10px] uppercase font-bold">প্রত্যাশিত সরবরাহ</span>
              <span className="font-semibold text-stone-800">{order.expectedDeliveryDate || '৭ দিনের মধ্যে'}</span>
            </div>
            <div>
              <span className="text-stone-400 block text-[10px] uppercase font-bold">বর্তমান স্ট্যাটাস</span>
              <span className="font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded text-[11px] inline-block mt-0.5">
                {order.status === 'delivered' ? 'সরবরাহ সম্পন্ন' : order.status === 'shipped' ? 'ট্রানজিটে আছে' : 'নিশ্চিত ও প্রক্রিয়াধীন'}
              </span>
            </div>
          </div>

          {/* Buyer & Seller Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            
            {/* Seller Box */}
            <div className="p-4 rounded-xl border border-stone-200 bg-white space-y-1.5 text-xs">
              <div className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>বিক্রেতা / সরবরাহকারীর বিবরণ</span>
              </div>
              <div className="font-bold text-stone-900 text-sm">{order.sellerName || 'রুমা হিলস এগ্রো সমবায়'}</div>
              <div className="text-stone-600">উৎস: পার্বত্য চট্টগ্রাম (রাঙামাটি / বান্দরবান / খাগড়াছড়ি)</div>
              <div className="text-stone-600">মোবাইল: {order.sellerPhone || '০১৮১৮-XXXXXX'}</div>
              <div className="text-[11px] text-emerald-800 font-semibold">ভেরিফাইড আইডি: HC-PROD-2026-VAL</div>
            </div>

            {/* Buyer Box */}
            <div className="p-4 rounded-xl border border-stone-200 bg-white space-y-1.5 text-xs">
              <div className="text-[11px] font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                <span>ক্রেতা ও গন্তব্যের বিবরণ</span>
              </div>
              <div className="font-bold text-stone-900 text-sm">{order.customerName}</div>
              <div className="text-stone-600">প্রতিষ্ঠান: {order.buyerCompanyName || order.customerRole}</div>
              <div className="text-stone-600">যোগাযোগ: {order.customerPhone}</div>
              <div className="text-stone-800 font-medium">গন্তব্য: {order.destination}</div>
            </div>

          </div>

          {/* Line Items Table */}
          <div className="border border-stone-200 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs divide-y divide-stone-200">
              <thead className="bg-stone-100 text-stone-700 font-bold">
                <tr>
                  <th className="py-3 px-4">পণ্যের বিবরণ</th>
                  <th className="py-3 px-4 text-center">পরিমাণ</th>
                  <th className="py-3 px-4 text-right">একক দর</th>
                  <th className="py-3 px-4 text-right">মোট দর (টাকা)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-stone-900">
                    <div>{order.productName}</div>
                    <div className="text-[11px] text-stone-500 font-normal mt-0.5">
                      ১ম গ্রেড পাহাড়ি জৈব ফসল · প্যাকিং ও লজিস্টিক অন্তর্ভুক্ত
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold tabular-nums">
                    {order.quantity.toLocaleString()} {order.unit}
                  </td>
                  <td className="py-3.5 px-4 text-right font-medium tabular-nums">
                    ৳{order.unitPrice.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-right font-bold text-stone-900 tabular-nums">
                    ৳{productTotal.toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Pricing Summary Breakdown */}
          <div className="flex justify-end">
            <div className="w-full sm:w-72 space-y-2 text-xs border border-stone-200 p-4 rounded-xl bg-stone-50">
              <div className="flex justify-between text-stone-600">
                <span>পণ্য উপমোট:</span>
                <span className="font-semibold tabular-nums">৳{productTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>পাহাড়ে পরিবহন খরচ:</span>
                <span className="font-semibold tabular-nums">৳{shipping.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>কুশনযুক্ত নিরাপদ প্যাকিং:</span>
                <span className="font-semibold tabular-nums">৳{packaging.toLocaleString()}</span>
              </div>
              <div className="pt-2 border-t border-stone-300 flex justify-between text-sm font-extrabold text-emerald-950">
                <span>সর্বমোট চুক্তি মূল্য:</span>
                <span className="tabular-nums">৳{grandTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Terms & Special Instructions */}
          <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs space-y-1 text-emerald-950">
            <div className="font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>সরকারি ডিজিটাল এসক্রো সুরক্ষা নীতিমালা:</span>
            </div>
            <p className="text-emerald-900 text-[11px] leading-relaxed">
              এই ক্রয় চুক্তির অর্থ ক্রেতার নিকট পণ্য অক্ষত ও সম্মত মানে পৌঁছার পর আনলোড ও কোয়ালিটি নিশ্চিত হওয়া সাপেক্ষে বিক্রেতার অ্যাকাউন্টে রিলিজ করা হবে। কোনো অসঙ্গতি পরিলক্ষিত হলে ডিজিটাল বিরোধ নিষ্পত্তি উইং ৪৮ ঘণ্টার মধ্যে সমাধান করবে।
            </p>
            {order.specialInstructions && (
              <div className="pt-1 mt-1 border-t border-emerald-200 text-[11px]">
                <strong>বিশেষ নির্দেশনা:</strong> {order.specialInstructions}
              </div>
            )}
          </div>

          {/* Official Signatures Stamp */}
          <div className="pt-8 border-t border-stone-200 grid grid-cols-2 gap-8 text-center text-xs">
            <div className="space-y-1">
              <div className="w-36 h-0.5 bg-stone-400 mx-auto mb-2"></div>
              <div className="font-bold text-stone-800">অনুমোদিত ক্রেতা প্রতিনিধি</div>
              <div className="text-[10px] text-stone-500">ডিজিটাল ভেরিফিকেশন টিক যুক্ত</div>
            </div>
            <div className="space-y-1">
              <div className="w-36 h-0.5 bg-stone-400 mx-auto mb-2"></div>
              <div className="font-bold text-stone-800">অনুমোদিত পাহাড়ি সমবায় / বিক্রেতা</div>
              <div className="text-[10px] text-stone-500">পার্বত্য চট্টগ্রাম বিষয়ক মন্ত্রণালয় রেজিস্টার্ড</div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
