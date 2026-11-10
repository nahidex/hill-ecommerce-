import React, { useState } from 'react';
import { X, Plus, Upload, CheckCircle2, AlertCircle, Mountain } from 'lucide-react';
import { ProductItem } from '../../types';
import { PINEAPPLE_IMAGE, SPICES_IMAGE, HANDLOOM_IMAGE, MANGO_IMAGE } from '../../data/products';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (newProduct: ProductItem) => void;
  defaultDistrict?: string;
  defaultProducerName?: string;
}

export const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onAddProduct,
  defaultDistrict = 'বান্দরবান',
  defaultProducerName = 'আমার সমবায় খামার'
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('ফলমূল');
  const [categorySlug, setCategorySlug] = useState<'agriculture' | 'fruits' | 'spices' | 'handicraft' | 'apparel' | 'processed' | 'bamboo'>('fruits');
  const [origin, setOrigin] = useState(`${defaultDistrict}`);
  const [pricePerUnit, setPricePerUnit] = useState<number>(45);
  const [unit, setUnit] = useState('কেজি');
  const [availableQuantity, setAvailableQuantity] = useState<number>(1000);
  const [minOrderQuantity, setMinOrderQuantity] = useState<number>(100);
  const [harvestDate, setHarvestDate] = useState('নভেম্বর ২০২৬');
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState(PINEAPPLE_IMAGE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleCategoryChange = (val: string) => {
    setCategory(val);
    if (val === 'ফলমূল') {
      setCategorySlug('fruits');
      setSelectedImage(PINEAPPLE_IMAGE);
      setUnit('পিস');
    } else if (val === 'মসলা ও খাদ্যপণ্য') {
      setCategorySlug('spices');
      setSelectedImage(SPICES_IMAGE);
      setUnit('কেজি');
    } else if (val === 'ঐতিহ্যবাহী পোশাক' || val === 'হস্তশিল্প') {
      setCategorySlug('apparel');
      setSelectedImage(HANDLOOM_IMAGE);
      setUnit('সেট');
    } else if (val === 'বাঁশ ও বেতের পণ্য') {
      setCategorySlug('bamboo');
      setSelectedImage(HANDLOOM_IMAGE);
      setUnit('পিস');
    } else {
      setCategorySlug('agriculture');
      setSelectedImage(SPICES_IMAGE);
      setUnit('কেজি');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('পণ্যের নাম প্রদান করুন');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const newProd: ProductItem = {
        id: `prod-${Date.now()}`,
        name,
        category,
        categorySlug,
        origin: `${origin}, ${defaultDistrict}`,
        district: defaultDistrict as any,
        upazila: origin,
        producerName: defaultProducerName,
        producerType: 'ভেরিফাইড স্থানীয় উৎপাদক',
        isPerishable: categorySlug === 'fruits' || categorySlug === 'agriculture',
        qualityGrade: 'A-Grade (প্রিমিয়াম)',
        pricePerUnit: Number(pricePerUnit),
        unit,
        minOrderQuantity: Number(minOrderQuantity),
        availableQuantity: Number(availableQuantity),
        rating: 5.0,
        totalReviews: 1,
        harvestDate,
        description: description || 'পাহাড়ের খাঁটি মাটিতে সম্পূর্ণ প্রাকৃতিক ও কীটনাশকমুক্ত উপায়ে উৎপাদিত প্রিমিয়াম মানের পণ্য।',
        image: selectedImage,
        badge: 'নতুন লিস্টিং',
        status: 'active',
        specifications: {
          organic: true,
          packaging: 'ফুড-গ্রেড প্যাকিং / কুশনযুক্ত কাঠের কার্টন',
          deliveryTime: '২৪-৪৮ ঘণ্টার মধ্যে সরবরাহ',
          shelfLife: '১৫ দিন',
          purityGrade: 'গ্রেড-এ বাছাইকৃত লট'
        }
      };

      onAddProduct(newProd);
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50">
          <div>
            <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
              ইনভেন্টরি লিস্টিং ফরম
            </div>
            <h3 className="text-lg font-bold text-stone-900 mt-0.5">
              নতুন পাহাড়ি পণ্য তালিকাভুক্ত করুন
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {error && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              পণ্যের পূর্ণ নাম <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="যেমন: রুমা জায়ান্ট কিউ মিষ্টি আনারস / দীঘিনালার পাহাড়ি হলুদ"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full text-xs sm:text-sm px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                পণ্যের ক্যাটাগরি
              </label>
              <select
                value={category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700"
              >
                <option value="ফলমূল">ফলমূল (আনারস, কলা, কমলা)</option>
                <option value="মসলা ও খাদ্যপণ্য">মসলা ও খাদ্যপণ্য (হলুদ, আদা)</option>
                <option value="কৃষিপণ্য">কৃষিপণ্য (জুমের চাল, সরিষা, ভুট্টা)</option>
                <option value="বাঁশ ও বেতের পণ্য">বাঁশ ও বেতের পণ্য</option>
                <option value="ঐতিহ্যবাহী পোশাক">ঐতিহ্যবাহী পোশাক (পিনন-হাদি, শাল)</option>
                <option value="প্রক্রিয়াজাত পণ্য">প্রক্রিয়াজাত পণ্য (কফি, কাজুবাদাম)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                উৎপাদন এলাকা / উপজেলা
              </label>
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="যেমন: রুমা বাজার, বান্দরবান"
                className="w-full text-xs px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                একক মূল্য (টাকা) <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                required
                min={1}
                value={pricePerUnit}
                onChange={(e) => setPricePerUnit(Number(e.target.value))}
                className="w-full text-xs px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700 tabular-nums"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                পরিমাপের একক
              </label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700"
              >
                <option value="কেজি">কেজি</option>
                <option value="পিস">পিস</option>
                <option value="হালি">হালি</option>
                <option value="মণ">মণ</option>
                <option value="টন">টন</option>
                <option value="সেট">সেট</option>
              </select>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                ন্যূনতম পাইকারি অর্ডার
              </label>
              <input
                type="number"
                min={1}
                value={minOrderQuantity}
                onChange={(e) => setMinOrderQuantity(Number(e.target.value))}
                className="w-full text-xs px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700 tabular-nums"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                বর্তমানে বিক্রির জন্য উপলব্ধ পরিমাণ
              </label>
              <input
                type="number"
                required
                min={1}
                value={availableQuantity}
                onChange={(e) => setAvailableQuantity(Number(e.target.value))}
                className="w-full text-xs px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700 tabular-nums"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                হার্ভেস্ট মৌসুম / তারিখ
              </label>
              <input
                type="text"
                value={harvestDate}
                onChange={(e) => setHarvestDate(e.target.value)}
                placeholder="যেমন: চলতি নভেম্বর ২০২৬"
                className="w-full text-xs px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700"
              />
            </div>
          </div>

          {/* Product Image Option Selection */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              পণ্যের ছবি নির্বাচন
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: 'আম্রপালি আম', img: MANGO_IMAGE },
                { label: 'আনারস', img: PINEAPPLE_IMAGE },
                { label: 'মসলা / কৃষি', img: SPICES_IMAGE },
                { label: 'তাঁত / কারুশিল্প', img: HANDLOOM_IMAGE }
              ].map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImage(item.img)}
                  className={`p-1 rounded-xl border text-center transition-all cursor-pointer ${
                    selectedImage === item.img
                      ? 'border-emerald-700 ring-2 ring-emerald-600/30 bg-emerald-50'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <img src={item.img} alt={item.label} className="w-full h-12 rounded-lg object-cover mb-1" />
                  <span className="text-[10px] font-semibold text-stone-700 block truncate">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              পণ্যের গুণমান ও বিস্তারিত বিবরণ
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="পণ্যটির বিশেষত্ব, জাত, প্যাকিং ও পরিবহন সুবিধা সম্পর্কে লিখুন..."
              className="w-full text-xs px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-emerald-700"
            />
          </div>

          {/* Action buttons */}
          <div className="pt-3 border-t border-stone-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-stone-600 hover:bg-stone-100"
            >
              বাতিল
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 rounded-lg text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 shadow-sm transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-70"
            >
              <Plus className="w-4 h-4 text-amber-300" />
              <span>{isSubmitting ? 'সংরক্ষণ হচ্ছে...' : 'পণ্য প্রকাশ করুন'}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
