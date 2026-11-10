import React, { useState, useMemo } from 'react';
import { 
  ArrowRight, 
  Search, 
  SlidersHorizontal, 
  Sparkles, 
  ShieldCheck, 
  Building2, 
  FileText, 
  HelpCircle 
} from 'lucide-react';
import { 
  PageView, 
  UserSession, 
  ProductItem, 
  BulkOrderRequest, 
  RFQItem, 
  SellerProfile 
} from '../types';
import { SAMPLE_PRODUCTS, SELLER_PROFILES } from '../data/products';

import { MarketplaceHeader } from '../components/marketplace/MarketplaceHeader';
import { MarketplaceHeroSearch } from '../components/marketplace/MarketplaceHeroSearch';
import { CategoryBar } from '../components/marketplace/CategoryBar';
import { MarketplaceFilterSidebar } from '../components/marketplace/MarketplaceFilterSidebar';
import { ProductCardB2B } from '../components/marketplace/ProductCardB2B';
import { ProductDetailPage } from '../components/marketplace/ProductDetailPage';
import { BulkOrderRequestModal } from '../components/marketplace/BulkOrderRequestModal';
import { PriceNegotiationModal } from '../components/marketplace/PriceNegotiationModal';
import { SellerProfileModal } from '../components/marketplace/SellerProfileModal';
import { MarketplaceInquiryModal } from '../components/marketplace/MarketplaceInquiryModal';
import { DistrictMarketplaceSection } from '../components/marketplace/DistrictMarketplaceSection';
import { FeaturedWholesaleSection } from '../components/marketplace/FeaturedWholesaleSection';
import { RFQModal } from '../components/dashboard/RFQModal';
import { Footer } from '../components/Footer';

interface MarketplacePageProps {
  onNavigate: (page: PageView, sectionId?: string) => void;
  isLoggedIn: boolean;
  currentUser: UserSession;
  products: ProductItem[];
  onSubmitRFQ: (rfq: RFQItem) => void;
}

export const MarketplacePage: React.FC<MarketplacePageProps> = ({
  onNavigate,
  isLoggedIn,
  currentUser,
  products,
  onSubmitRFQ
}) => {
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(3000);
  const [minQuantity, setMinQuantity] = useState<number>(0);
  const [sellerType, setSellerType] = useState<string>('all');
  const [productType, setProductType] = useState<'all' | 'perishable' | 'non-perishable'>('all');
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'latest' | 'price_low' | 'price_high' | 'quantity_high'>('latest');

  // Modals & Active Views
  const [detailedProduct, setDetailedProduct] = useState<ProductItem | null>(null);
  const [bulkOrderProduct, setBulkOrderProduct] = useState<ProductItem | null>(null);
  const [negotiationProduct, setNegotiationProduct] = useState<ProductItem | null>(null);
  const [inquiryProduct, setInquiryProduct] = useState<ProductItem | null>(null);
  const [activeSellerProfileId, setActiveSellerProfileId] = useState<string | null>(null);
  const [isRFQModalOpen, setIsRFQModalOpen] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Filter & Search Logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesOrigin = p.origin.toLowerCase().includes(q);
        const matchesCat = p.category.toLowerCase().includes(q);
        const matchesProducer = p.producerName.toLowerCase().includes(q);
        if (!matchesName && !matchesOrigin && !matchesCat && !matchesProducer) {
          return false;
        }
      }

      // 2. Category
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'fruits') {
          if (p.categorySlug !== 'fruits') return false;
        } else if (selectedCategory === 'agriculture') {
          if (p.categorySlug !== 'agriculture') return false;
        } else if (selectedCategory === 'spices') {
          if (p.categorySlug !== 'spices') return false;
        } else if (selectedCategory === 'bamboo') {
          if (p.categorySlug !== 'bamboo') return false;
        } else if (selectedCategory === 'apparel') {
          if (p.categorySlug !== 'apparel') return false;
        } else if (selectedCategory === 'processed') {
          if (p.categorySlug !== 'processed') return false;
        }
      }

      // 3. District
      if (selectedDistrict !== 'all' && p.district !== selectedDistrict) {
        return false;
      }

      // 4. Price
      if (p.pricePerUnit < minPrice || p.pricePerUnit > maxPrice) {
        return false;
      }

      // 5. Quantity
      if (minQuantity > 0 && p.availableQuantity < minQuantity) {
        return false;
      }

      // 6. Seller Type
      if (sellerType !== 'all') {
        if (p.sellerType && p.sellerType !== sellerType) {
          return false;
        }
      }

      // 7. Product Type (Perishable vs Non-perishable)
      if (productType === 'perishable' && !p.isPerishable) {
        return false;
      }
      if (productType === 'non-perishable' && p.isPerishable) {
        return false;
      }

      // 8. Verified Seller
      if (verifiedOnly && !p.isVerifiedSeller) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_low') return a.pricePerUnit - b.pricePerUnit;
      if (sortBy === 'price_high') return b.pricePerUnit - a.pricePerUnit;
      if (sortBy === 'quantity_high') return b.availableQuantity - a.availableQuantity;
      return 0; // default latest
    });
  }, [
    products, 
    searchQuery, 
    selectedCategory, 
    selectedDistrict, 
    minPrice, 
    maxPrice, 
    minQuantity, 
    sellerType, 
    productType, 
    verifiedOnly, 
    sortBy
  ]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedDistrict('all');
    setMinPrice(0);
    setMaxPrice(3000);
    setMinQuantity(0);
    setSellerType('all');
    setProductType('all');
    setVerifiedOnly(false);
    setSortBy('latest');
  };

  const handlePerformSearch = () => {
    const el = document.getElementById('marketplace-products-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuickSearch = (keyword: string) => {
    setSearchQuery(keyword);
    handlePerformSearch();
  };

  const handleFilterBySellerType = (type: string) => {
    setSellerType(type);
    handlePerformSearch();
  };

  const handleSelectDistrictFromCards = (districtName: string) => {
    setSelectedDistrict(districtName);
    handlePerformSearch();
  };

  const handleBulkOrderSubmitted = (req: BulkOrderRequest) => {
    setSuccessToast(`ক্রয় অনুরোধ ${req.requestId} সফলভাবে জমা হয়েছে!`);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  const handleFinalDealAgreed = (p: ProductItem, agreedPrice: number) => {
    setSuccessToast(`৳${agreedPrice}/${p.unit} চূড়ান্ত সমঝোতা দরে ডিল সম্পন্ন হয়েছে!`);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  const activeSellerObj = activeSellerProfileId ? SELLER_PROFILES[activeSellerProfileId] : null;
  const activeSellerProducts = activeSellerProfileId
    ? products.filter(p => p.sellerId === activeSellerProfileId)
    : [];

  return (
    <div className="min-h-screen bg-stone-50 font-bengali flex flex-col text-stone-900">
      
      {/* 1. Marketplace Header */}
      <MarketplaceHeader
        currentPage="marketplace"
        onNavigate={onNavigate}
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        onOpenRFQModal={() => setIsRFQModalOpen(true)}
        onFilterSellerType={handleFilterBySellerType}
      />

      {/* Toast Notification */}
      {successToast && (
        <div className="fixed top-20 right-5 z-50 p-4 rounded-xl bg-emerald-900 text-white text-xs font-semibold shadow-xl border border-emerald-700 animate-in fade-in flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-amber-300 shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* If viewing a detailed product, show Product Details View */}
      {detailedProduct ? (
        <ProductDetailPage
          product={detailedProduct}
          onBack={() => setDetailedProduct(null)}
          onRequestBulkOrder={(p) => setBulkOrderProduct(p)}
          onOpenNegotiation={(p) => setNegotiationProduct(p)}
          onContactSeller={(p) => setInquiryProduct(p)}
          onOpenSellerProfile={(sellerId) => setActiveSellerProfileId(sellerId)}
        />
      ) : (
        /* Otherwise show the main B2B Wholesale Marketplace Homepage */
        <main className="flex-1">
          
          {/* 2. Hero Search Section */}
          <MarketplaceHeroSearch
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedDistrict={selectedDistrict}
            onDistrictChange={setSelectedDistrict}
            selectedQuantityMin={minQuantity}
            onQuantityMinChange={setMinQuantity}
            onPerformSearch={handlePerformSearch}
            onQuickSearchClick={handleQuickSearch}
          />

          {/* 3. 10 Product Categories Navigation Bar */}
          <CategoryBar
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          {/* 4. Featured Wholesale Section */}
          <FeaturedWholesaleSection
            products={products}
            onSelectProduct={(p) => setDetailedProduct(p)}
            onRequestQuote={(p) => setBulkOrderProduct(p)}
          />

          {/* 5. Main Product Catalog & Filter Layout */}
          <section id="marketplace-products-section" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
            
            {/* Catalog Top Info & Sort Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200 mb-8">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
                  পাইকারি পণ্যের তালিকা (Bulk Product Listings)
                </h2>
                <div className="text-xs text-stone-500 mt-1 flex items-center gap-2">
                  <span>মোট <strong>{filteredProducts.length}</strong>টি পাইকারি লট পাওয়া গেছে</span>
                  {selectedDistrict !== 'all' && (
                    <>
                      <span>·</span>
                      <span className="text-emerald-800 font-bold">{selectedDistrict} জেলা</span>
                    </>
                  )}
                  {selectedCategory !== 'all' && (
                    <>
                      <span>·</span>
                      <span className="text-amber-800 font-bold">ফিল্টারকৃত ক্যাটাগরি</span>
                    </>
                  )}
                </div>
              </div>

              {/* Sorting Bar */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-stone-500 font-medium">সর্ট করুন:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="p-2 rounded-xl bg-white border border-stone-300 text-stone-800 font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-700"
                >
                  <option value="latest">সর্বশেষ তালিকাভুক্ত</option>
                  <option value="price_low">একক দর: কম থেকে বেশি</option>
                  <option value="price_high">একক দর: বেশি থেকে কম</option>
                  <option value="quantity_high">সর্বাধিক উপলব্ধ পরিমাণ</option>
                </select>
              </div>
            </div>

            {/* Layout Split: Left Filter Sidebar + Right Product Grid */}
            <div className="flex flex-col lg:flex-row items-start gap-8">
              
              {/* Left Advanced Filter Sidebar */}
              <MarketplaceFilterSidebar
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                selectedDistrict={selectedDistrict}
                onDistrictChange={setSelectedDistrict}
                minPrice={minPrice}
                maxPrice={maxPrice}
                onPriceChange={(min, max) => {
                  setMinPrice(min);
                  setMaxPrice(max);
                }}
                minQuantity={minQuantity}
                onQuantityChange={setMinQuantity}
                sellerType={sellerType}
                onSellerTypeChange={setSellerType}
                productType={productType}
                onProductTypeChange={setProductType}
                verifiedOnly={verifiedOnly}
                onVerifiedOnlyChange={setVerifiedOnly}
                onResetFilters={handleResetFilters}
              />

              {/* Right Product Grid */}
              <div className="flex-1 w-full">
                {filteredProducts.length === 0 ? (
                  <div className="py-20 text-center bg-white rounded-2xl border border-stone-200 p-8 space-y-3">
                    <p className="text-base font-bold text-stone-700">কোনো পাইকারি পণ্য খুঁজে পাওয়া যায়নি।</p>
                    <p className="text-xs text-stone-500">আপনার ফিল্টার বা সার্চ কিওয়ার্ড পরিবর্তন করে পুনরায় চেষ্টা করুন।</p>
                    <button
                      onClick={handleResetFilters}
                      className="mt-2 px-4 py-2 bg-emerald-800 text-white rounded-xl text-xs font-bold hover:bg-emerald-900 cursor-pointer"
                    >
                      সব ফিল্টার রিসেট করুন
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCardB2B
                        key={product.id}
                        product={product}
                        onViewDetails={(p) => setDetailedProduct(p)}
                        onRequestQuote={(p) => setBulkOrderProduct(p)}
                        onOpenSellerProfile={(sellerId) => setActiveSellerProfileId(sellerId)}
                      />
                    ))}
                  </div>
                )}
              </div>

            </div>

          </section>

          {/* 6. District-wise Marketplace Discovery Cards */}
          <DistrictMarketplaceSection
            onSelectDistrict={handleSelectDistrictFromCards}
          />

          {/* 7. RFQ Callout Strip */}
          <section className="bg-emerald-900 text-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
              <div className="space-y-1.5 max-w-2xl">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  Request for Quotation (RFQ)
                </span>
                <h3 className="text-2xl font-bold">
                  কাঙ্ক্ষিত পণ্য খুঁজে পাচ্ছেন না? সরাসরি পাইকারি রিকোয়ারমেন্ট পোস্ট করুন
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100">
                  ৩ পার্বত্য জেলার শত শত নিবন্ধিত উৎপাদক ও কৃষক সমবায় আপনার চাহিদা দেখে সরাসরি কোটেশন পাঠাবে।
                </p>
              </div>

              <button
                onClick={() => setIsRFQModalOpen(true)}
                className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-stone-950 rounded-xl text-sm font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer shrink-0"
              >
                <FileText className="w-4 h-4" />
                <span>বিনামূল্যে RFQ আহ্বান করুন</span>
              </button>
            </div>
          </section>

        </main>
      )}

      {/* 8. Footer */}
      <Footer onNavigate={onNavigate} />

      {/* MODALS */}
      
      {/* Bulk Order Request Modal */}
      <BulkOrderRequestModal
        product={bulkOrderProduct}
        isOpen={!!bulkOrderProduct}
        onClose={() => setBulkOrderProduct(null)}
        buyer={currentUser}
        onSubmitRequest={handleBulkOrderSubmitted}
      />

      {/* Price Negotiation Modal */}
      <PriceNegotiationModal
        product={negotiationProduct}
        isOpen={!!negotiationProduct}
        onClose={() => setNegotiationProduct(null)}
        buyer={currentUser}
        onFinalDealAgreed={handleFinalDealAgreed}
      />

      {/* Direct Inquiry Modal */}
      <MarketplaceInquiryModal
        product={inquiryProduct}
        isOpen={!!inquiryProduct}
        onClose={() => setInquiryProduct(null)}
        buyer={currentUser}
        onSendInquiryMessage={() => {
          setSuccessToast('ইনকোয়ারি বার্তা সফলভাবে পাঠানো হয়েছে!');
          setTimeout(() => setSuccessToast(null), 2500);
        }}
      />

      {/* Seller Profile Modal */}
      <SellerProfileModal
        seller={activeSellerObj}
        isOpen={!!activeSellerProfileId}
        onClose={() => setActiveSellerProfileId(null)}
        sellerProducts={activeSellerProducts}
        onSelectProduct={(p) => setDetailedProduct(p)}
        onContactSeller={(s) => {
          if (activeSellerProducts.length > 0) {
            setInquiryProduct(activeSellerProducts[0]);
          }
        }}
      />

      {/* RFQ Submission Modal */}
      <RFQModal
        isOpen={isRFQModalOpen}
        onClose={() => setIsRFQModalOpen(false)}
        onSubmitRFQ={(newRFQ) => {
          onSubmitRFQ(newRFQ);
          setSuccessToast('আপনার RFQ সফলভাবে প্রকাশিত হয়েছে!');
          setTimeout(() => setSuccessToast(null), 3000);
        }}
        buyer={currentUser}
      />

    </div>
  );
};
