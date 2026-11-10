import React, { useState, useEffect } from 'react';
import { ShieldCheck, Truck } from 'lucide-react';
import { PageView, AccountType, ProductItem, DashboardTab, UserSession, OrderItem, RFQItem, TransactionItem, NotificationItem } from './types';
import { SAMPLE_PRODUCTS } from './data/products';
import { 
  DEMO_PROFILES, 
  INITIAL_ORDERS, 
  INITIAL_RFQS, 
  INITIAL_TRANSACTIONS, 
  INITIAL_NOTIFICATIONS 
} from './data/dashboardMock';

// Public Landing Components
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PlatformHighlights } from './components/PlatformHighlights';
import { WholesaleMarketplace } from './components/WholesaleMarketplace';
import { ProductDetailModal } from './components/ProductDetailModal';
import { IndividualShopSection } from './components/IndividualShopSection';
import { HowItWorks } from './components/HowItWorks';
import { SecureTransaction } from './components/SecureTransaction';
import { ProductCategories } from './components/ProductCategories';
import { WhyHillEcommerce } from './components/WhyHillEcommerce';
import { CallToAction } from './components/CallToAction';
import { Footer } from './components/Footer';

// Pages
import { RegistrationPage } from './pages/RegistrationPage';
import { LoginPage } from './pages/LoginPage';
import { MarketplacePage } from './pages/MarketplacePage';

// Dashboard Components
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { FarmerDashboardView } from './components/dashboard/FarmerDashboardView';
import { SupplierDashboardView } from './components/dashboard/SupplierDashboardView';
import { BuyerDashboardView } from './components/dashboard/BuyerDashboardView';
import { EntrepreneurDashboardView } from './components/dashboard/EntrepreneurDashboardView';
import { ProfileModule } from './components/dashboard/ProfileModule';
import { PaymentModule } from './components/dashboard/PaymentModule';
import { ReportsModule } from './components/dashboard/ReportsModule';
import { MessagesModule } from './components/dashboard/MessagesModule';
import { NotificationsModule } from './components/dashboard/NotificationsModule';
import { ShopPreviewModal } from './components/dashboard/ShopPreviewModal';
import { AddProductModal } from './components/dashboard/AddProductModal';
import { RFQModal } from './components/dashboard/RFQModal';

// Phase 5: Buyer Order Management & RFQ Response
import { OrderStageKey, NegotiationOffer, QuotationItem } from './types';
import { BuyerOrderManagementModule } from './components/orders/BuyerOrderManagementModule';
import { SellerOrderManagementModule } from './components/orders/SellerOrderManagementModule';

// Phase 6: Order Delivery & Logistics Management
import { 
  DeliveryItem, 
  DeliveryStageKey, 
  PackagingInfo, 
  TransportInfo, 
  GoodsReceivedNote, 
  DeliveryIssueItem 
} from './types';
import { INITIAL_DELIVERIES } from './data/logisticsMock';
import { SellerLogisticsModule } from './components/logistics/SellerLogisticsModule';
import { BuyerDeliveryModule } from './components/logistics/BuyerDeliveryModule';
import { MinistryMonitoringView } from './components/logistics/MinistryMonitoringView';
import { DeliveryDetailsModal } from './components/logistics/DeliveryDetailsModal';
import { LogisticsReportsModal } from './components/logistics/LogisticsReportsModal';

// Phase 7: Payment, Escrow & Secure Transactions
import { 
  EscrowRecord, 
  EscrowStatusKey,
  BuyerPaymentTransaction, 
  SellerSettlementItem, 
  RefundRecord, 
  FinancialDisputeRecord, 
  PaymentMethodType 
} from './types';
import { 
  INITIAL_ESCROWS, 
  INITIAL_BUYER_PAYMENTS, 
  INITIAL_SELLER_SETTLEMENTS, 
  INITIAL_REFUNDS, 
  INITIAL_FINANCIAL_DISPUTES 
} from './data/escrowMock';
import { BuyerPaymentModal } from './components/payment/BuyerPaymentModal';
import { MinistryFinancialDashboard } from './components/payment/MinistryFinancialDashboard';
import { FinancialReportsModal } from './components/payment/FinancialReportsModal';

// Phase 8: Ministry Admin Panel, User Verification & Monitoring System
import { AdminUserItem, ProductApprovalStatus, VerificationStatusKey } from './types';
import { SAMPLE_ADMIN_USERS } from './data/adminMock';
import { MinistryAdminPanel } from './components/admin/MinistryAdminPanel';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeDashboardTab, setActiveDashboardTab] = useState<DashboardTab>('overview');
  const [currentUser, setCurrentUser] = useState<UserSession>(DEMO_PROFILES.farmer);
  const [selectedRoleForRegistration, setSelectedRoleForRegistration] = useState<AccountType>('farmer');

  // Shared Application State
  const [products, setProducts] = useState<ProductItem[]>(SAMPLE_PRODUCTS);
  const [orders, setOrders] = useState<OrderItem[]>(INITIAL_ORDERS);
  const [rfqs, setRfqs] = useState<RFQItem[]>(INITIAL_RFQS);
  const [transactions, setTransactions] = useState<TransactionItem[]>(INITIAL_TRANSACTIONS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [deliveries, setDeliveries] = useState<DeliveryItem[]>(INITIAL_DELIVERIES);

  // Phase 7: Financial & Escrow State
  const [escrows, setEscrows] = useState<EscrowRecord[]>(INITIAL_ESCROWS);
  const [buyerPayments, setBuyerPayments] = useState<BuyerPaymentTransaction[]>(INITIAL_BUYER_PAYMENTS);
  const [settlements, setSettlements] = useState<SellerSettlementItem[]>(INITIAL_SELLER_SETTLEMENTS);
  const [refunds, setRefunds] = useState<RefundRecord[]>(INITIAL_REFUNDS);
  const [financialDisputes, setFinancialDisputes] = useState<FinancialDisputeRecord[]>(INITIAL_FINANCIAL_DISPUTES);
  const [orderForPayment, setOrderForPayment] = useState<OrderItem | null>(null);
  const [ministrySubView, setMinistrySubView] = useState<'finance' | 'logistics'>('finance');
  const [isMinistryFinReportsOpen, setIsMinistryFinReportsOpen] = useState(false);

  // Phase 8: Ministry Admin & User Verification State
  const [adminUsers, setAdminUsers] = useState<AdminUserItem[]>(SAMPLE_ADMIN_USERS);

  // Modals & Inspection
  const [ministryInspectedDelivery, setMinistryInspectedDelivery] = useState<DeliveryItem | null>(null);
  const [isMinistryReportsOpen, setIsMinistryReportsOpen] = useState(false);

  // Modals
  const [activeModalProduct, setActiveModalProduct] = useState<ProductItem | null>(null);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isRFQModalOpen, setIsRFQModalOpen] = useState(false);
  const [isShopPreviewOpen, setIsShopPreviewOpen] = useState(false);

  // Navigation Handler
  const handleNavigate = (page: PageView, sectionId?: string) => {
    setCurrentPage(page);
    if (page === 'home') {
      if (sectionId) {
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenRegistrationWithRole = (role: AccountType) => {
    setSelectedRoleForRegistration(role);
    setCurrentPage('signup');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Login handler
  const handleLoginSuccess = (role: AccountType) => {
    const profile = DEMO_PROFILES[role] || DEMO_PROFILES.farmer;
    setCurrentUser(profile);
    setIsLoggedIn(true);
    setActiveDashboardTab('overview');
    setCurrentPage('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Logout handler
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('login');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Switch role inside dashboard
  const handleSwitchRole = (newRole: AccountType) => {
    const profile = DEMO_PROFILES[newRole];
    if (profile) {
      setCurrentUser(profile);
      setActiveDashboardTab('overview');
    }
  };

  // Data Actions
  const handleAddProduct = (newProd: ProductItem) => {
    setProducts(prev => [newProd, ...prev]);
    // Also push a notification
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'নতুন পণ্য সফলভাবে তালিকাভুক্ত হয়েছে',
      message: `${newProd.name} পাইকারি বাজারে লাইভ করা হয়েছে।`,
      time: 'এইমাত্র',
      type: 'order',
      unread: true,
      linkTab: 'products'
    };
    setNotifications(prev => [notif, ...prev]);
  };

  const handleToggleProductStatus = (productId: string) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        return {
          ...p,
          status: p.status === 'out_of_stock' ? 'active' : 'out_of_stock'
        };
      }
      return p;
    }));
  };

  const handleUpdateOrderStatus = (orderId: string, status: OrderItem['status']) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return { ...o, status };
      }
      return o;
    }));
  };

  const handleConfirmDeliveryAndReleaseEscrow = (orderId: string) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          status: 'delivered',
          escrowStatus: 'released'
        };
      }
      return o;
    }));

    // Record escrow completion transaction
    const newTx: TransactionItem = {
      id: `tx-${Date.now()}`,
      invoiceNumber: `INV-2026-${Math.floor(100 + Math.random() * 900)}`,
      title: 'পণ্য প্রাপ্তি সাপেক্ষে এসক্রো অর্থ ছাড় সম্পন্ন',
      counterParty: 'বাংলাদেশ ব্যাংক এসক্রো ট্রাস্ট',
      partyRole: 'আর্থিক প্রতিষ্ঠান',
      date: 'আজ',
      amount: 42000,
      type: 'credit',
      status: 'completed',
      escrowStatusText: 'সফলভাবে বিক্রেতার হিসাবে স্থানান্তরিত'
    };
    setTransactions(prev => [newTx, ...prev]);

    // Push notification
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'এসক্রো অর্থ সফলভাবে ছাড় হয়েছে',
      message: 'ক্রেতার সন্তুষ্টি সাপেক্ষে উৎপাদকের একাউন্টে পেমেন্ট রিলিজ করা হয়েছে।',
      time: 'এইমাত্র',
      type: 'payment',
      unread: true,
      linkTab: 'payments'
    };
    setNotifications(prev => [notif, ...prev]);
  };

  const handleSubmitRFQ = (newRFQ: RFQItem) => {
    setRfqs(prev => [newRFQ, ...prev]);
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'নতুন RFQ আহ্বান পোস্ট হয়েছে',
      message: `${newRFQ.productRequirement}-এর জন্য পাইকারি বিজ্ঞপ্তি প্রকাশিত হয়েছে।`,
      time: 'এইমাত্র',
      type: 'rfq',
      unread: true,
      linkTab: 'rfq'
    };
    setNotifications(prev => [notif, ...prev]);
  };

  const handleUpdateShopInfo = (shopName: string, bio: string) => {
    setCurrentUser(prev => ({
      ...prev,
      shopName,
      bio
    }));
  };

  // Phase 5: Advance Stage in 9-stage order lifecycle
  const handleAdvanceStage = (orderId: string, nextStage: OrderStageKey, note?: string) => {
    const stageNumbers: Record<OrderStageKey, number> = {
      request_submitted: 1,
      negotiation: 2,
      confirmed: 3,
      preparing: 4,
      ready_to_ship: 5,
      shipped: 6,
      received: 7,
      completed: 8,
      cancelled: 9
    };

    const stageTitles: Record<OrderStageKey, string> = {
      request_submitted: 'নতুন অর্ডার অনুরোধ',
      negotiation: 'মূল্য ও শর্তাবলি আলোচনা',
      confirmed: 'অর্ডার নিশ্চিতকরণ',
      preparing: 'পণ্য প্রস্তুতকরণ শুরু',
      ready_to_ship: 'সরবরাহের জন্য প্রস্তুত',
      shipped: 'পণ্য প্রেরণ (ট্রানজিট)',
      received: 'ওয়্যারহাউজে পণ্য গ্রহণ',
      completed: 'অর্ডার সফলভাবে সম্পন্ন ও অর্থ ছাড়',
      cancelled: 'অর্ডার বাতিল'
    };

    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        const nextNum = stageNumbers[nextStage] || o.stageNumber || 1;
        const newLog = {
          id: `log-${Date.now()}`,
          stageKey: nextStage,
          stageNumber: nextNum,
          title: stageTitles[nextStage] || 'স্ট্যাটাস আপডেট',
          note: note || `${o.orderNumber} অর্ডারের ধাপ '${stageTitles[nextStage]}' এ উন্নীত হয়েছে।`,
          timestamp: 'এইমাত্র',
          actor: currentUser.name
        };

        const newStatus = nextStage === 'completed' ? 'delivered' :
                          nextStage === 'cancelled' ? 'cancelled' :
                          nextStage === 'shipped' || nextStage === 'received' ? 'shipped' :
                          nextStage === 'negotiation' ? 'negotiation' :
                          nextStage === 'confirmed' || nextStage === 'preparing' || nextStage === 'ready_to_ship' ? 'processing' : 'pending';

        const newEscrow = nextStage === 'completed' ? 'released' :
                          nextStage === 'cancelled' ? 'refunded' : o.escrowStatus;

        return {
          ...o,
          stage: nextStage,
          stageNumber: nextNum,
          status: newStatus as any,
          escrowStatus: newEscrow,
          activityHistory: [newLog, ...(o.activityHistory || [])]
        };
      }
      return o;
    }));

    // Trigger Notification
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `অর্ডার অগ্রগতির নতুন ধাপ: ${stageTitles[nextStage]}`,
      message: `${orderId} চালানের কার্যক্রম সাফল্যের সাথে পরবর্তী ধাপে স্থানান্তরিত হয়েছে।`,
      time: 'এইমাত্র',
      type: 'order',
      unread: true,
      linkTab: 'orders'
    };
    setNotifications(prev => [notif, ...prev]);
  };

  const handleSendCounterOffer = (orderId: string, offer: NegotiationOffer) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        const newProductTotal = offer.priceOffer * o.quantity;
        const shipping = o.shippingCost || 0;
        const packaging = o.packagingCost || 0;
        const grandTotal = newProductTotal + shipping + packaging;

        const newLog = {
          id: `log-${Date.now()}`,
          stageKey: 'negotiation' as OrderStageKey,
          stageNumber: 2,
          title: `${offer.senderName} (${offer.senderRole === 'buyer' ? 'ক্রেতা' : 'বিক্রেতা'}) পাল্টা প্রস্তাব পাঠিয়েছেন`,
          note: `প্রস্তাবিত নতুন দর: ৳${offer.priceOffer}/${o.unit}। মোট: ৳${grandTotal.toLocaleString()}`,
          timestamp: 'এইমাত্র',
          actor: offer.senderName
        };

        return {
          ...o,
          unitPrice: offer.priceOffer,
          totalProductPrice: newProductTotal,
          totalAmount: grandTotal,
          stage: 'negotiation' as OrderStageKey,
          stageNumber: 2,
          status: 'negotiation' as any,
          negotiationHistory: [...(o.negotiationHistory || []), offer],
          activityHistory: [newLog, ...(o.activityHistory || [])]
        };
      }
      return o;
    }));

    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'নতুন মূল্য প্রস্তাব বিনিময় হয়েছে',
      message: `${currentUser.name} অর্ডারে ৳${offer.priceOffer} দরের পাল্টা প্রস্তাব পাঠিয়েছেন।`,
      time: 'এইমাত্র',
      type: 'rfq',
      unread: true,
      linkTab: 'orders'
    };
    setNotifications(prev => [notif, ...prev]);
  };

  const handleAcceptPrice = (orderId: string, agreedPrice: number) => {
    handleAdvanceStage(orderId, 'confirmed', `উভয় পক্ষ প্রতি এককে ৳${agreedPrice} মূল্যে চূড়ান্ত একমত হয়েছেন। অর্ডার আনুষ্ঠানিকভাবে নিশ্চিত।`);
  };

  const handleRejectOffer = (orderId: string, reason: string) => {
    handleAdvanceStage(orderId, 'cancelled', `অর্ডার প্রত্যাখ্যানের কারণ: ${reason}`);
  };

  const handleAcceptOrder = (orderId: string) => {
    handleAdvanceStage(orderId, 'confirmed', 'বিক্রেতা অর্ডার আনুষ্ঠানিকভাবে গ্রহণ করেছেন।');
  };

  const handleCancelOrder = (orderId: string, reason: string) => {
    handleAdvanceStage(orderId, 'cancelled', `অর্ডার বাতিলের কারণ: ${reason}`);
  };

  const handleSubmitQuotation = (rfqId: string, quote: QuotationItem) => {
    setRfqs(prev => prev.map(r => {
      if (r.id === rfqId) {
        const existingQuotes = r.quotations || [];
        const updatedQuotes = [quote, ...existingQuotes.filter(q => q.sellerId !== quote.sellerId)];
        return {
          ...r,
          quotations: updatedQuotes,
          quotationCount: updatedQuotes.length,
          status: 'quoted'
        };
      }
      return r;
    }));

    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'নতুন RFQ কোটেশন জমা হয়েছে',
      message: `${quote.sellerName} ${quote.rfqNumber}-এ প্রতি এককে ৳${quote.proposedUnitPrice} দর প্রস্তাব করেছেন।`,
      time: 'এইমাত্র',
      type: 'rfq',
      unread: true,
      linkTab: 'orders'
    };
    setNotifications(prev => [notif, ...prev]);
  };

  const handleAcceptQuotation = (rfqId: string, quote: QuotationItem) => {
    setRfqs(prev => prev.map(r => {
      if (r.id === rfqId) {
        return {
          ...r,
          status: 'accepted',
          quotations: (r.quotations || []).map(q => q.id === quote.id ? { ...q, status: 'accepted' } : q)
        };
      }
      return r;
    }));

    const matchingRfq = rfqs.find(r => r.id === rfqId);
    const newOrder: OrderItem = {
      id: `ord-${Date.now()}`,
      orderNumber: `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      productName: matchingRfq?.productRequirement || 'পাহাড়ি কৃষিপণ্য',
      productImage: SAMPLE_PRODUCTS[0]?.image || '',
      customerName: currentUser.name,
      customerRole: 'পাইকারি করপোরেট ক্রেতা',
      customerPhone: currentUser.mobile,
      buyerId: currentUser.id,
      buyerCompanyName: currentUser.businessName || currentUser.name,
      sellerId: quote.sellerId,
      sellerName: quote.sellerName,
      sellerPhone: quote.sellerPhone,
      quantity: quote.offeredQuantity,
      unit: quote.unit,
      unitPrice: quote.proposedUnitPrice,
      totalProductPrice: quote.totalProductPrice,
      shippingCost: quote.shippingCost,
      packagingCost: quote.packagingCost,
      totalAmount: quote.totalAmount,
      orderDate: 'আজ, ১০ নভেম্বর ২০২৬',
      expectedDeliveryDate: quote.expectedDeliveryDate,
      destination: matchingRfq?.deliveryLocation || 'ঢাকা ওয়্যারহাউজ',
      specialInstructions: quote.additionalTerms || 'কোটেশন অনুযায়ী সরবরাহ',
      status: 'processing',
      stage: 'confirmed',
      stageNumber: 3,
      escrowStatus: 'in_escrow',
      activityHistory: [
        {
          id: `log-${Date.now()}`,
          stageKey: 'confirmed',
          stageNumber: 3,
          title: 'কোটেশন গ্রহণের মাধ্যমে নতুন নিশ্চিত অর্ডার সৃষ্টি',
          note: `${quote.sellerName}-এর কোটেশন অনুমোদনের পর সরাসরি অর্ডার কনফার্ম হয়েছে।`,
          timestamp: 'এইমাত্র',
          actor: currentUser.name
        }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);

    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'কোটেশন অনুমোদিত ও অর্ডার নিশ্চিত হয়েছে',
      message: `${quote.sellerName}-এর কোটেশন অনুমোদন করে ${newOrder.orderNumber} অর্ডার তৈরি করা হয়েছে।`,
      time: 'এইমাত্র',
      type: 'order',
      unread: true,
      linkTab: 'orders'
    };
    setNotifications(prev => [notif, ...prev]);
  };

  // ============================================================
  // Phase 6: Order Delivery & Logistics Management Handlers
  // ============================================================

  // Update Packaging (§4)
  const handleUpdatePackaging = (deliveryId: string, packagingData: PackagingInfo) => {
    setDeliveries(prev => prev.map(d => {
      if (d.id === deliveryId) {
        const isComplete = packagingData.status === 'completed';
        const nextStageKey = isComplete && d.stageNumber < 3 ? 'packaging_completed' : d.stage;
        const nextStageNum = isComplete && d.stageNumber < 3 ? 3 : d.stageNumber;
        const historyLog = {
          id: `h-${Date.now()}`,
          stage: nextStageKey as DeliveryStageKey,
          stageNumber: nextStageNum,
          title: 'প্যাকেজিং তথ্য হালনাগাদ সম্পন্ন',
          location: d.pickupAddress,
          timestamp: new Date().toLocaleDateString('bn-BD', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
          actor: currentUser.name,
          note: `${packagingData.packageCount} টি ${packagingData.packagingType} প্যাকেজিং রেকর্ড সংরক্ষিত হয়েছে।`
        };
        return {
          ...d,
          packaging: packagingData,
          stage: nextStageKey as DeliveryStageKey,
          stageNumber: nextStageNum,
          history: [...d.history, historyLog]
        };
      }
      return d;
    }));

    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'প্যাকেজিং হালনাগাদ সম্পন্ন',
      message: `${deliveryId} চালানের প্যাকেজিং ও লেবেলিং তথ্য সফলভাবে সংরক্ষণ করা হয়েছে।`,
      time: 'এইমাত্র',
      type: 'order',
      unread: true,
      linkTab: 'logistics'
    };
    setNotifications(prev => [notif, ...prev]);
  };

  // Assign Transport (§5)
  const handleAssignTransport = (deliveryId: string, transportData: TransportInfo) => {
    setDeliveries(prev => prev.map(d => {
      if (d.id === deliveryId) {
        const nextStageKey = d.stageNumber < 4 ? 'ready_for_transport' : d.stage;
        const nextStageNum = d.stageNumber < 4 ? 4 : d.stageNumber;
        const historyLog = {
          id: `h-${Date.now()}`,
          stage: nextStageKey as DeliveryStageKey,
          stageNumber: nextStageNum,
          title: 'যানবাহন ও চালক বরাদ্দ সম্পন্ন',
          location: transportData.pickupLocation,
          timestamp: new Date().toLocaleDateString('bn-BD', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
          actor: currentUser.name,
          note: `পরিবহন: ${transportData.providerName}, গাড়ি: ${transportData.vehicleNumber}, চালক: ${transportData.driverName}`
        };
        return {
          ...d,
          transport: transportData,
          stage: nextStageKey as DeliveryStageKey,
          stageNumber: nextStageNum,
          history: [...d.history, historyLog]
        };
      }
      return d;
    }));

    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'যানবাহন বরাদ্দ নিশ্চিত হয়েছে',
      message: `${deliveryId} চালানের জন্য পরিবহন ক্যারিয়ার ও চালক সফলভাবে নির্ধারণ করা হয়েছে।`,
      time: 'এইমাত্র',
      type: 'order',
      unread: true,
      linkTab: 'logistics'
    };
    setNotifications(prev => [notif, ...prev]);
  };

  // Advance Delivery Stage (§7)
  const handleAdvanceDeliveryStage = (deliveryId: string, nextStage: DeliveryStageKey, note: string, location: string) => {
    const STAGE_NUMBERS: Record<DeliveryStageKey, number> = {
      order_confirmed: 1,
      preparing: 2,
      packaging_completed: 3,
      ready_for_transport: 4,
      picked_up: 5,
      in_transit: 6,
      arrived_hub: 7,
      out_for_delivery: 8,
      delivered: 9,
      delayed: 6,
      disputed: 6,
      cancelled: 1
    };

    const STAGE_LABELS: Record<DeliveryStageKey, string> = {
      order_confirmed: 'অর্ডার নিশ্চিত',
      preparing: 'পণ্য প্রস্তুত হচ্ছে',
      packaging_completed: 'প্যাকেজিং সম্পন্ন',
      ready_for_transport: 'পরিবহনের অপেক্ষায়',
      picked_up: 'যানবাহনে লোড সম্পন্ন',
      in_transit: 'পথে রয়েছে',
      arrived_hub: 'আঞ্চলিক হাবে পৌঁছেছে',
      out_for_delivery: 'ডেলিভারির জন্য বের হয়েছে',
      delivered: 'ডেলিভারি সম্পন্ন',
      delayed: 'বিলম্বিত',
      disputed: 'বিরোধপূর্ণ',
      cancelled: 'বাতিল'
    };

    const nextNum = STAGE_NUMBERS[nextStage] || 1;

    setDeliveries(prev => prev.map(d => {
      if (d.id === deliveryId) {
        const historyLog = {
          id: `h-${Date.now()}`,
          stage: nextStage,
          stageNumber: nextNum,
          title: STAGE_LABELS[nextStage] || 'স্ট্যাটাস আপডেট',
          location: location || d.currentLocation,
          timestamp: new Date().toLocaleDateString('bn-BD', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
          actor: currentUser.name,
          note: note || `${STAGE_LABELS[nextStage]} সম্পন্ন হয়েছে।`
        };

        return {
          ...d,
          stage: nextStage,
          stageNumber: nextNum,
          currentLocation: location || d.currentLocation,
          lastUpdatedTime: new Date().toLocaleDateString('bn-BD', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
          actualDeliveryDate: nextStage === 'delivered' ? 'আজ' : d.actualDeliveryDate,
          history: [...d.history, historyLog]
        };
      }
      return d;
    }));

    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `ডেলিভারি অগ্রগতি: ${STAGE_LABELS[nextStage]}`,
      message: `${deliveryId} চালানের ট্র্যাকিং অবস্থান হালনাগাদ করা হয়েছে (${location})।`,
      time: 'এইমাত্র',
      type: 'order',
      unread: true,
      linkTab: 'logistics'
    };
    setNotifications(prev => [notif, ...prev]);
  };

  // Add Checkpoint (§7)
  const handleAddDeliveryCheckpoint = (deliveryId: string, location: string, statusText: string, note?: string) => {
    setDeliveries(prev => prev.map(d => {
      if (d.id === deliveryId) {
        const newCp = {
          id: `cp-${Date.now()}`,
          location,
          timestamp: new Date().toLocaleDateString('bn-BD', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
          statusText,
          note
        };
        const existingCps = d.transport.trackingCheckpoints || [];
        return {
          ...d,
          currentLocation: location,
          lastUpdatedTime: newCp.timestamp,
          transport: {
            ...d.transport,
            trackingCheckpoints: [...existingCps, newCp]
          }
        };
      }
      return d;
    }));
  };

  // Submit GRN (§9)
  const handleSubmitGRN = (deliveryId: string, grnData: Omit<GoodsReceivedNote, 'id' | 'grnNumber'>) => {
    const grnNumber = `GRN-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
    const fullGRN: GoodsReceivedNote = {
      ...grnData,
      id: `grn-${Date.now()}`,
      grnNumber
    };

    setDeliveries(prev => prev.map(d => {
      if (d.id === deliveryId) {
        const isFull = grnData.receiptType === 'full';
        const historyLog = {
          id: `h-${Date.now()}`,
          stage: 'delivered' as DeliveryStageKey,
          stageNumber: 9,
          title: isFull ? 'পণ্য প্রাপ্তি ও GRN ছাড়পত্র সম্পন্ন' : `আংশিক/সমস্যাযুক্ত পণ্য প্রাপ্তি (${grnData.receiptType})`,
          location: d.deliveryAddress,
          timestamp: fullGRN.receiptDateTime,
          actor: fullGRN.receivedBy,
          note: `GRN নম্বর ${grnNumber} এর অধীনে ${grnData.receivedQuantity} ${d.unit} পণ্য গ্রহণ করা হয়েছে।`
        };

        return {
          ...d,
          grn: fullGRN,
          stage: 'delivered' as DeliveryStageKey,
          stageNumber: 9,
          actualDeliveryDate: fullGRN.receiptDateTime,
          history: [...d.history, historyLog]
        };
      }
      return d;
    }));

    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `ডিজিটাল GRN ছাড়পত্র (${grnNumber})`,
      message: `${deliveryId} চালানের ক্রেতা পণ্য প্রাপ্তি ও ছাড়পত্র নিশ্চিত করেছেন।`,
      time: 'এইমাত্র',
      type: 'payment',
      unread: true,
      linkTab: 'logistics'
    };
    setNotifications(prev => [notif, ...prev]);
  };

  // Submit Delivery Issue (§11)
  const handleSubmitDeliveryIssue = (deliveryId: string, issueData: Omit<DeliveryIssueItem, 'id' | 'issueNumber'>) => {
    const issueNumber = `ISS-${new Date().getFullYear()}-${Math.floor(10 + Math.random() * 90)}`;
    const fullIssue: DeliveryIssueItem = {
      ...issueData,
      id: `iss-${Date.now()}`,
      issueNumber
    };

    setDeliveries(prev => prev.map(d => {
      if (d.id === deliveryId) {
        return {
          ...d,
          isDelayed: issueData.issueCategory === 'delayed' ? true : d.isDelayed,
          delayReason: issueData.description,
          issue: fullIssue
        };
      }
      return d;
    }));

    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `নতুন অভিযোগ দাখিল: ${issueNumber}`,
      message: `${deliveryId} চালানে ${issueData.categoryLabel} সংক্রান্ত অভিযোগ রেকর্ড করা হয়েছে।`,
      time: 'এইমাত্র',
      type: 'dispute',
      unread: true,
      linkTab: 'logistics'
    };
    setNotifications(prev => [notif, ...prev]);
  };

  // Resolve Delivery Issue (§11)
  const handleResolveDeliveryIssue = (deliveryId: string, resolutionNote: string) => {
    setDeliveries(prev => prev.map(d => {
      if (d.id === deliveryId && d.issue) {
        const updatedIssue: DeliveryIssueItem = {
          ...d.issue,
          status: 'resolved',
          statusLabel: 'সমাধান সম্পন্ন',
          resolutionNotes: resolutionNote,
          history: [
            ...(d.issue.history || []),
            {
              timestamp: new Date().toLocaleDateString('bn-BD', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
              actor: currentUser.name,
              note: resolutionNote,
              status: 'উভয় পক্ষের সমঝোতায় সমাধান সম্পন্ন'
            }
          ]
        };
        return {
          ...d,
          isDelayed: false,
          issue: updatedIssue
        };
      }
      return d;
    }));
  };

  // ============================================================
  // Phase 7: Payment, Escrow & Financial Management Handlers
  // ============================================================

  // Complete Buyer Payment (§4)
  const handleCompleteBuyerPayment = (paymentData: {
    orderId: string;
    orderNumber: string;
    amount: number;
    paymentMethod: PaymentMethodType;
    providerName: string;
    transactionRef: string;
  }) => {
    const methodLabels: Record<PaymentMethodType, string> = {
      bank_transfer: 'সোনালী ব্যাংক পিএলসি (RTGS/EFT)',
      mfs_bkash: 'বিকাশ এগ্রো পেমেন্ট গেটওয়ে',
      mfs_nagad: 'নগদ ডিজিটাল ওয়ালেট',
      card_gateway: 'ব্র্যাক ব্যাংক ভিসা / মাস্টারকার্ড গেটওয়ে',
      other_approved: 'অনুমোদিত ডিজিটাল পেমেন্ট'
    };

    const newEscrowNo = `ESC-2026-${Math.floor(800 + Math.random() * 100)}`;
    const newTxNo = `TXN-${Math.floor(10000 + Math.random() * 90000)}`;
    const dateNow = new Date().toLocaleDateString('bn-BD', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });

    // 1. Update Order status
    setOrders(prev => prev.map(o => {
      if (o.id === paymentData.orderId || o.orderNumber === paymentData.orderNumber) {
        return {
          ...o,
          status: 'processing',
          stage: 'confirmed',
          escrowStatus: 'in_escrow',
          escrowId: newEscrowNo
        };
      }
      return o;
    }));

    // 2. Create Escrow Record
    const newEscrow: EscrowRecord = {
      id: `esc-${Date.now()}`,
      escrowNumber: newEscrowNo,
      orderId: paymentData.orderId,
      orderNumber: paymentData.orderNumber,
      buyerId: currentUser.id,
      buyerName: currentUser.name,
      buyerCompany: currentUser.businessName || currentUser.name,
      sellerId: 'user-farmer-01',
      sellerName: 'মং শৈ প্রু মারমা',
      sellerCompany: 'মারমা অর্গানিক ফার্মস',
      productName: 'পাহাড়ি এগ্রো লট',
      quantity: 1,
      unit: 'লট',
      productAmount: paymentData.amount - 5000,
      deliveryCost: 4500,
      otherCost: 500,
      totalAmount: paymentData.amount,
      depositDate: dateNow,
      status: 'funds_secured',
      statusLabel: 'অর্থ সুরক্ষিত (এসক্রো ট্রাস্টে জমা)',
      releaseConditions: {
        deliveryConfirmed: false,
        grnVerified: false,
        noActiveDispute: true,
        agreedAmountVerified: true
      },
      expectedReleaseDate: 'ডেলিভারি সাপেক্ষে',
      providerId: 'prov-sonali',
      providerName: paymentData.providerName,
      transactionRef: paymentData.transactionRef,
      platformFee: Math.round(paymentData.amount * 0.005),
      bankCharge: 200,
      netSellerPayout: paymentData.amount - Math.round(paymentData.amount * 0.005) - 200,
      auditTrail: [
        {
          id: `aud-${Date.now()}`,
          timestamp: dateNow,
          actor: currentUser.name,
          actorRole: 'পাইকারি ক্রেতা',
          action: 'এসক্রো ট্রাস্ট ডিপোজিট সম্পন্ন',
          details: `${paymentData.providerName} মাধ্যমে ৳${paymentData.amount.toLocaleString('bn-BD')} এসক্রো ট্রাস্ট অ্যাকাউন্টে জমা।`,
          transactionRef: paymentData.transactionRef
        }
      ]
    };
    setEscrows(prev => [newEscrow, ...prev]);

    // 3. Create Buyer Transaction
    const newTx: BuyerPaymentTransaction = {
      id: `bpt-${Date.now()}`,
      transactionNumber: newTxNo,
      orderNumber: paymentData.orderNumber,
      escrowNumber: newEscrowNo,
      sellerName: 'মং শৈ প্রু মারমা',
      productName: 'পাহাড়ি এগ্রো লট',
      quantity: 1,
      unit: 'লট',
      amount: paymentData.amount,
      paymentMethod: paymentData.paymentMethod,
      paymentMethodLabel: methodLabels[paymentData.paymentMethod] || 'ডিজিটাল পেমেন্ট',
      providerName: paymentData.providerName,
      transactionDate: dateNow,
      transactionRef: paymentData.transactionRef,
      receiptNumber: `RCPT-2026-${Math.floor(5000 + Math.random() * 4000)}`,
      status: 'in_escrow',
      statusLabel: 'এসক্রোতে সংরক্ষিত',
      isSimulated: true
    };
    setBuyerPayments(prev => [newTx, ...prev]);

    // 4. Create Notification
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'পেমেন্ট সফল ও এসক্রো ট্রাস্টে সংরক্ষিত',
      message: `${paymentData.orderNumber} অর্ডারে ৳${paymentData.amount.toLocaleString('bn-BD')} সফলভাবে সোনালী ব্যাংক এসক্রো ট্রাস্টে জমা হয়েছে।`,
      time: 'এইমাত্র',
      type: 'payment',
      unread: true,
      linkTab: 'payments'
    };
    setNotifications(prev => [notif, ...prev]);
  };

  // Confirm Escrow Release (§8)
  const handleConfirmEscrowRelease = (escrowId: string, note: string) => {
    const dateNow = new Date().toLocaleDateString('bn-BD', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });

    setEscrows(prev => prev.map(e => {
      if (e.id === escrowId) {
        const updatedAudit = [
          ...e.auditTrail,
          {
            id: `aud-${Date.now()}`,
            timestamp: dateNow,
            actor: currentUser.name,
            actorRole: currentUser.role === 'buyer' ? 'ক্রেতা' : 'মন্ত্রণালয় এসক্রো সেল',
            action: 'অর্থ ছাড় অনুমোদন',
            details: note || 'GRN সন্তোষজনক পাওয়ার পর বিক্রেতার ব্যাংক হিসাবে অর্থ ছাড় কার্যকর।',
            transactionRef: e.transactionRef
          }
        ];

        return {
          ...e,
          status: 'released' as EscrowStatusKey,
          statusLabel: 'অর্থ ছাড় সম্পন্ন (ব্যাংক ট্রান্সফার)',
          actualReleaseDate: dateNow,
          auditTrail: updatedAudit
        };
      }
      return e;
    }));

    // Update Settlements
    setSettlements(prev => prev.map(s => {
      const matched = escrows.find(e => e.id === escrowId);
      if (matched && (s.escrowNumber === matched.escrowNumber || s.orderNumber === matched.orderNumber)) {
        return {
          ...s,
          status: 'released',
          statusLabel: 'ব্যাংকে ছাড় সম্পন্ন',
          releaseDate: dateNow
        };
      }
      return s;
    }));

    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'এসক্রো অর্থ ছাড় সম্পন্ন',
      message: `এসক্রো চুক্তির আওতায় বিক্রেতার ব্যাংক হিসাবে অর্থ সফলভাবে স্থানান্তরিত হয়েছে।`,
      time: 'এইমাত্র',
      type: 'payment',
      unread: true,
      linkTab: 'payments'
    };
    setNotifications(prev => [notif, ...prev]);
  };

  // Pause on Dispute (§8, §10)
  const handlePauseEscrowDispute = (escrowId: string, reason: string) => {
    const dateNow = new Date().toLocaleDateString('bn-BD', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });

    setEscrows(prev => prev.map(e => {
      if (e.id === escrowId) {
        const updatedAudit = [
          ...e.auditTrail,
          {
            id: `aud-${Date.now()}`,
            timestamp: dateNow,
            actor: currentUser.name,
            actorRole: 'পার্টি / সিস্টেম',
            action: 'অর্থ ছাড় স্থগিত',
            details: `বিরোধ ও অভিযোগের কারণে অর্থ ছাড় স্থগিত: ${reason}`,
            transactionRef: e.transactionRef
          }
        ];

        return {
          ...e,
          status: 'paused_dispute' as EscrowStatusKey,
          statusLabel: 'বিরোধের কারণে অর্থ ছাড় স্থগিত',
          releaseConditions: {
            ...e.releaseConditions,
            noActiveDispute: false
          },
          auditTrail: updatedAudit
        };
      }
      return e;
    }));

    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'এসক্রো অর্থ ছাড় স্থগিত',
      message: `বিরোধ দায়েরের প্রেক্ষিতে এসক্রো ট্রাস্টে অর্থ ছাড় সাময়িকভাবে স্থগিত রাখা হয়েছে।`,
      time: 'এইমাত্র',
      type: 'dispute',
      unread: true,
      linkTab: 'payments'
    };
    setNotifications(prev => [notif, ...prev]);
  };

  // Request Refund (§9)
  const handleRequestRefund = (refundData: any) => {
    const refNo = `RFD-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRefund: RefundRecord = {
      id: `ref-${Date.now()}`,
      refundNumber: refNo,
      ...refundData,
      status: 'under_review',
      statusLabel: 'পর্যালোচনাধীন (ব্যাংক যাচাই)',
      approvedBy: 'মন্ত্রণালয় এসক্রো সেল'
    };

    setRefunds(prev => [newRefund, ...prev]);

    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `রিফান্ড আবেদন দাখিল: ${refNo}`,
      message: `${refundData.orderNumber} অর্ডারে ৳${refundData.requestedAmount.toLocaleString('bn-BD')} রিফান্ড আবেদন জমা হয়েছে।`,
      time: 'এইমাত্র',
      type: 'payment',
      unread: true,
      linkTab: 'payments'
    };
    setNotifications(prev => [notif, ...prev]);
  };

  // Approve Refund (§9)
  const handleApproveRefund = (refundId: string) => {
    const dateNow = new Date().toLocaleDateString('bn-BD', { day: '2-digit', month: 'long', year: 'numeric' });

    setRefunds(prev => prev.map(r => {
      if (r.id === refundId) {
        return {
          ...r,
          status: 'completed',
          statusLabel: 'অর্থ ফেরত সম্পন্ন',
          completionDate: dateNow,
          approvedBy: 'সোনালী ব্যাংক এসক্রো ডেস্ক'
        };
      }
      return r;
    }));

    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'রিফান্ড অর্থ ফেরত সম্পন্ন',
      message: `অনুমোদিত ব্যাংক দ্বারা ক্রেতার একাউন্টে অর্থ ফেরত সফলভাবে সম্পন্ন হয়েছে।`,
      time: 'এইমাত্র',
      type: 'payment',
      unread: true,
      linkTab: 'payments'
    };
    setNotifications(prev => [notif, ...prev]);
  };

  // Submit Financial Dispute (§10)
  const handleSubmitFinancialDispute = (disputeData: any) => {
    const dspNo = `DSP-2026-${Math.floor(100 + Math.random() * 900)}`;
    const newDispute: FinancialDisputeRecord = {
      id: `fdisp-${Date.now()}`,
      disputeNumber: dspNo,
      ...disputeData,
      status: 'mediation',
      statusLabel: 'মধ্যস্থতা ও সালিশি আলোচনাধীন',
      history: [
        {
          date: new Date().toLocaleDateString('bn-BD', { day: '2-digit', month: 'long', year: 'numeric' }),
          actor: currentUser.name,
          action: 'বিরোধ দাখিল',
          note: disputeData.description
        }
      ]
    };

    setFinancialDisputes(prev => [newDispute, ...prev]);

    // Pause matching escrow
    setEscrows(prev => prev.map(e => {
      if (e.orderNumber === disputeData.orderNumber || e.escrowNumber === disputeData.escrowNumber) {
        return {
          ...e,
          status: 'paused_dispute' as EscrowStatusKey,
          statusLabel: 'বিরোধের কারণে অর্থ ছাড় স্থগিত',
          releaseConditions: {
            ...e.releaseConditions,
            noActiveDispute: false
          }
        };
      }
      return e;
    }));

    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `নতুন আর্থিক বিরোধ দায়ের: ${dspNo}`,
      message: `${disputeData.orderNumber} অর্ডারে বিরোধ দায়েরের ফলে এসক্রো ফান্ড লক রাখা হয়েছে।`,
      time: 'এইমাত্র',
      type: 'dispute',
      unread: true,
      linkTab: 'payments'
    };
    setNotifications(prev => [notif, ...prev]);
  };

  // Resolve Financial Dispute (§10)
  const handleResolveFinancialDispute = (disputeId: string, summary: string) => {
    setFinancialDisputes(prev => prev.map(d => {
      if (d.id === disputeId) {
        // unpause matching escrow
        setEscrows(eprev => eprev.map(e => {
          if (e.orderNumber === d.orderNumber || e.escrowNumber === d.escrowNumber) {
            return {
              ...e,
              status: 'awaiting_release' as EscrowStatusKey,
              statusLabel: 'বিরোধ নিষ্পত্তিকৃত (অর্থ ছাড়ের অপেক্ষায়)',
              releaseConditions: {
                ...e.releaseConditions,
                noActiveDispute: true
              }
            };
          }
          return e;
        }));

        return {
          ...d,
          status: 'resolved',
          statusLabel: 'মীমাংসিত ও নিষ্পত্তি সম্পন্ন',
          resolutionSummary: summary,
          history: [
            ...d.history,
            {
              date: new Date().toLocaleDateString('bn-BD', { day: '2-digit', month: 'long', year: 'numeric' }),
              actor: currentUser.name,
              action: 'বিরোধ নিষ্পত্তি',
              note: summary
            }
          ]
        };
      }
      return d;
    }));

    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'বিরোধ সফলভাবে নিষ্পত্তি হয়েছে',
      message: `মধ্যস্থতা সেলের সুপারিশ অনুসারে উভয় পক্ষের সম্মতিতে বিরোধ নিষ্পত্তি হয়েছে।`,
      time: 'এইমাত্র',
      type: 'payment',
      unread: true,
      linkTab: 'payments'
    };
    setNotifications(prev => [notif, ...prev]);
  };

  // Phase 8: User Verification Handler
  const handleUpdateUserVerification = (
    userId: string,
    action: 'approved' | 'correction_requested' | 'rejected' | 'suspended' | 'reactivated' | 'under_review',
    reason: string,
    notes?: string
  ) => {
    const actionLabels: Record<string, string> = {
      approved: 'অনুমোদন কার্যকর',
      correction_requested: 'সংশোধনের জন্য ফেরত',
      rejected: 'নিবন্ধন প্রত্যাখ্যান',
      suspended: 'অ্যাকাউন্ট সাময়িক স্থগিত',
      reactivated: 'অ্যাকাউন্ট পুনরায় সক্রিয়',
      under_review: 'যাচাই তদন্ত চলমান'
    };

    const statusMap: Record<string, VerificationStatusKey> = {
      approved: 'approved',
      correction_requested: 'correction_requested',
      rejected: 'rejected',
      suspended: 'suspended',
      reactivated: 'approved',
      under_review: 'under_review'
    };

    const dateNow = new Date().toLocaleDateString('bn-BD', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });

    setAdminUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const newAudit = {
          id: `aud-${Date.now()}`,
          timestamp: dateNow,
          officerName: currentUser.name || 'মো. শাহজাহান কবির (যুগ্মসচিব)',
          officerRole: 'মন্ত্রণালয় সুপার অ্যাডমিন',
          action,
          actionLabel: actionLabels[action] || 'প্রশাসনিক সিদ্ধান্ত',
          reason,
          notes
        };

        const newStatus = statusMap[action] || u.verificationStatus;

        return {
          ...u,
          verificationStatus: newStatus,
          verificationStatusLabel: actionLabels[action] || u.verificationStatusLabel,
          auditHistory: [newAudit, ...u.auditHistory]
        };
      }
      return u;
    }));

    const targetUser = adminUsers.find(u => u.id === userId);

    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `প্রশাসনিক যাচাই: ${actionLabels[action]}`,
      message: `${targetUser?.name || 'ব্যবহারকারী'} (${targetUser?.businessName || ''}) এর জন্য সিদ্ধান্ত কার্যকর হয়েছে (${reason})।`,
      time: 'এইমাত্র',
      type: 'rfq',
      unread: true,
      linkTab: 'ministry_monitor'
    };
    setNotifications(prev => [notif, ...prev]);
  };

  // Phase 8: Product Approval Handler
  const handleUpdateProductApproval = (
    productId: string,
    action: 'approved' | 'needs_correction' | 'rejected' | 'suspended',
    reason: string,
    notes?: string
  ) => {
    const actionLabels: Record<string, string> = {
      approved: 'পণ্য অনুমোদন কার্যকর',
      needs_correction: 'সংশোধনে প্রেরণ',
      rejected: 'পণ্য ক্যাটালগ বাতিল',
      suspended: 'বাজার প্রদর্শন স্থগিত'
    };

    const dateNow = new Date().toLocaleDateString('bn-BD', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });

    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const newAudit = {
          id: `paud-${Date.now()}`,
          timestamp: dateNow,
          officerName: currentUser.name || 'সাদিয়া আফরিন মিলি',
          officerRole: 'পণ্য ও বাজার তদারক কর্মকর্তা',
          action,
          actionLabel: actionLabels[action] || 'সিদ্ধান্ত',
          reason,
          notes
        };

        const existingAudit = p.approvalAuditHistory || [];

        return {
          ...p,
          approvalStatus: action as ProductApprovalStatus,
          status: action === 'approved' ? 'active' : action === 'suspended' ? 'out_of_stock' : 'pending_approval',
          approvalAuditHistory: [newAudit, ...existingAudit]
        };
      }
      return p;
    }));

    const prod = products.find(p => p.id === productId);

    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `পণ্য তদারকি: ${actionLabels[action]}`,
      message: `${prod?.name || 'পণ্য'} এর অনুমোদন স্ট্যাটাস হালনাগাদ করা হয়েছে।`,
      time: 'এইমাত্র',
      type: 'order',
      unread: true,
      linkTab: 'ministry_monitor'
    };
    setNotifications(prev => [notif, ...prev]);
  };

  // Phase 8: Profile Update Handler
  const handleUpdateUserProfile = (
    userId: string,
    updatedData: Partial<AdminUserItem>,
    auditReason: string
  ) => {
    const dateNow = new Date().toLocaleDateString('bn-BD', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });

    setAdminUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const newAudit = {
          id: `aud-${Date.now()}`,
          timestamp: dateNow,
          officerName: currentUser.name || 'মো. শাহজাহান কবির (যুগ্মসচিব)',
          officerRole: 'মন্ত্রণালয় সুপার অ্যাডমিন',
          action: 'under_review' as any,
          actionLabel: 'প্রশাসনিক তথ্য সংশোধন',
          reason: auditReason,
          notes: 'কর্তৃপক্ষ কর্তৃক প্রোফাইল হালনাগাদ'
        };

        return {
          ...u,
          ...updatedData,
          auditHistory: [newAudit, ...u.auditHistory]
        };
      }
      return u;
    }));

    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'ব্যবহারকারী প্রোফাইল হালনাগাদ',
      message: `আইডি ${userId} এর তথ্য ও অডিট লগ সফলভাবে সংরক্ষণ করা হয়েছে।`,
      time: 'এইমাত্র',
      type: 'rfq',
      unread: true,
      linkTab: 'ministry_monitor'
    };
    setNotifications(prev => [notif, ...prev]);
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col text-stone-900 font-bengali">
      
      {/* 1. PUBLIC LANDING PAGE */}
      {currentPage === 'home' && (
        <>
          <Header
            currentPage={currentPage}
            onNavigate={handleNavigate}
            isLoggedIn={isLoggedIn}
          />
          <main className="flex-1">
            <Hero
              onStartBusiness={() => handleOpenRegistrationWithRole('farmer')}
              onExploreProducts={() => handleNavigate('marketplace')}
            />

            <PlatformHighlights />

            <WholesaleMarketplace
              onSelectProduct={(prod) => setActiveModalProduct(prod)}
              onGoToSignUp={() => handleOpenRegistrationWithRole('supplier')}
              onExploreMarketplace={() => handleNavigate('marketplace')}
            />

            <IndividualShopSection
              onOpenShop={() => handleOpenRegistrationWithRole('entrepreneur')}
            />

            <HowItWorks
              onRegisterClick={() => handleNavigate('signup')}
            />

            <SecureTransaction />

            <ProductCategories
              onSelectCategory={() => handleNavigate('home', 'wholesale-market')}
            />

            <WhyHillEcommerce />

            <CallToAction
              onRegister={() => handleNavigate('signup')}
              onLogin={() => handleNavigate('login')}
            />
          </main>
          
          <Footer onNavigate={handleNavigate} />

          {/* Product Detail Modal */}
          <ProductDetailModal
            product={activeModalProduct}
            onClose={() => setActiveModalProduct(null)}
            onRequestQuote={() => {
              setActiveModalProduct(null);
              handleOpenRegistrationWithRole('buyer');
            }}
          />
        </>
      )}

      {/* 2. REGISTRATION PAGE */}
      {currentPage === 'signup' && (
        <RegistrationPage
          defaultRole={selectedRoleForRegistration}
          onNavigate={handleNavigate}
          onRegisterSuccess={(role) => handleLoginSuccess(role)}
        />
      )}

      {/* 3. LOGIN PAGE */}
      {currentPage === 'login' && (
        <LoginPage
          onNavigate={handleNavigate}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {/* 4. ROLE-BASED DASHBOARD SYSTEM */}
      {currentPage === 'dashboard' && (
        <DashboardLayout
          user={currentUser}
          activeTab={activeDashboardTab}
          onSelectTab={(tab) => setActiveDashboardTab(tab)}
          onSwitchRole={handleSwitchRole}
          onLogout={handleLogout}
          onNavigateToPublic={() => handleNavigate('home')}
          notifications={notifications}
        >
          {/* TAB 1: OVERVIEW (ROLE-SPECIFIC) */}
          {activeDashboardTab === 'overview' && (
            <>
              {currentUser.role === 'farmer' && (
                <FarmerDashboardView
                  user={currentUser}
                  products={products}
                  orders={orders}
                  onOpenAddProduct={() => setIsAddProductOpen(true)}
                  onOpenMessages={() => setActiveDashboardTab('messages')}
                  onViewPayments={() => setActiveDashboardTab('payments')}
                  onUpdateOrderStatus={handleUpdateOrderStatus}
                  onToggleProductStatus={handleToggleProductStatus}
                />
              )}

              {currentUser.role === 'supplier' && (
                <SupplierDashboardView
                  user={currentUser}
                  orders={orders}
                  rfqs={rfqs}
                  products={products}
                  onOpenAddProduct={() => setIsAddProductOpen(true)}
                  onOpenMessages={() => setActiveDashboardTab('messages')}
                  onUpdateOrderStatus={handleUpdateOrderStatus}
                />
              )}

              {currentUser.role === 'buyer' && (
                <BuyerDashboardView
                  user={currentUser}
                  orders={orders}
                  rfqs={rfqs}
                  onOpenRFQModal={() => setIsRFQModalOpen(true)}
                  onExploreMarketplace={() => handleNavigate('marketplace')}
                  onOpenOrderManagement={() => setActiveDashboardTab('orders')}
                  onOpenLogistics={() => setActiveDashboardTab('logistics')}
                  onOpenMessages={() => setActiveDashboardTab('messages')}
                  onViewPayments={() => setActiveDashboardTab('payments')}
                  onConfirmDeliveryAndReleaseEscrow={handleConfirmDeliveryAndReleaseEscrow}
                  onInitiatePayment={(ord) => setOrderForPayment(ord)}
                />
              )}

              {currentUser.role === 'entrepreneur' && (
                <EntrepreneurDashboardView
                  user={currentUser}
                  products={products}
                  orders={orders}
                  onOpenShopPreview={() => setIsShopPreviewOpen(true)}
                  onOpenAddProduct={() => setIsAddProductOpen(true)}
                  onOpenMessages={() => setActiveDashboardTab('messages')}
                  onViewPayments={() => setActiveDashboardTab('payments')}
                  onUpdateShopInfo={handleUpdateShopInfo}
                />
              )}

              {currentUser.role === 'ministry_admin' && (
                <MinistryAdminPanel
                  users={adminUsers}
                  products={products}
                  orders={orders}
                  escrows={escrows}
                  transactions={buyerPayments}
                  settlements={settlements}
                  refunds={refunds}
                  disputes={financialDisputes}
                  deliveries={deliveries}
                  onUpdateUserVerification={handleUpdateUserVerification}
                  onUpdateProductApproval={handleUpdateProductApproval}
                  onUpdateUserProfile={handleUpdateUserProfile}
                  onViewDeliveryDetails={(del) => setMinistryInspectedDelivery(del)}
                  onOpenFinancialReports={() => setIsMinistryFinReportsOpen(true)}
                  onOpenLogisticsReports={() => setIsMinistryReportsOpen(true)}
                />
              )}
            </>
          )}

          {/* TAB: PRODUCTS MANAGEMENT */}
          {activeDashboardTab === 'products' && (
            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                <div>
                  <h3 className="text-base font-bold text-stone-900">পণ্য ও ইনভেন্টরি ক্যাটালগ</h3>
                  <p className="text-xs text-stone-500">আপনার তালিকাভুক্ত পণ্য এবং পাইকারি লটের বিস্তারিত বিবরণ</p>
                </div>
                <button
                  onClick={() => setIsAddProductOpen(true)}
                  className="px-4 py-2 bg-emerald-800 text-white rounded-xl text-xs font-bold hover:bg-emerald-900 transition-colors cursor-pointer"
                >
                  + নতুন পণ্য যুক্ত করুন
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map(p => (
                  <div key={p.id} className="p-4 rounded-xl border border-stone-200 flex items-start gap-3 bg-stone-50/50">
                    <img src={p.image} alt={p.name} className="w-16 h-16 rounded-lg object-cover border border-stone-200" />
                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="text-xs font-bold text-stone-900 truncate">{p.name}</div>
                      <div className="text-[11px] text-emerald-800 font-semibold">৳{p.pricePerUnit} / {p.unit}</div>
                      <div className="text-[10px] text-stone-500">স্টক: {p.availableQuantity} {p.unit} · {p.origin}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: ORDERS MANAGEMENT (PHASE 5 INTEGRATION) */}
          {activeDashboardTab === 'orders' && (
            currentUser.role === 'buyer' ? (
              <BuyerOrderManagementModule
                user={currentUser}
                orders={orders}
                rfqs={rfqs}
                onOpenRFQModal={() => setIsRFQModalOpen(true)}
                onAdvanceStage={handleAdvanceStage}
                onSendCounterOffer={handleSendCounterOffer}
                onAcceptPrice={handleAcceptPrice}
                onRejectOffer={handleRejectOffer}
                onAcceptQuotation={handleAcceptQuotation}
                onCancelOrder={handleCancelOrder}
                onInitiatePayment={(ord) => setOrderForPayment(ord)}
              />
            ) : (
              <SellerOrderManagementModule
                user={currentUser}
                orders={orders}
                rfqs={rfqs}
                products={products}
                onAdvanceStage={handleAdvanceStage}
                onSendCounterOffer={handleSendCounterOffer}
                onAcceptPrice={handleAcceptPrice}
                onRejectOffer={handleRejectOffer}
                onSubmitQuotation={handleSubmitQuotation}
                onAcceptOrder={handleAcceptOrder}
                onRejectOrder={handleRejectOffer}
              />
            )
          )}

          {/* TAB: LOGISTICS & DELIVERY MANAGEMENT (PHASE 6 INTEGRATION) */}
          {activeDashboardTab === 'logistics' && (
            currentUser.role === 'buyer' ? (
              <BuyerDeliveryModule
                deliveries={deliveries}
                onSubmitGRN={handleSubmitGRN}
                onSubmitIssue={handleSubmitDeliveryIssue}
                onResolveIssue={handleResolveDeliveryIssue}
              />
            ) : (
              <SellerLogisticsModule
                deliveries={deliveries}
                onUpdatePackaging={handleUpdatePackaging}
                onAssignTransport={handleAssignTransport}
                onAdvanceStage={handleAdvanceDeliveryStage}
                onAddCheckpoint={handleAddDeliveryCheckpoint}
                onSubmitGRN={handleSubmitGRN}
                onSubmitIssue={handleSubmitDeliveryIssue}
                onResolveIssue={handleResolveDeliveryIssue}
              />
            )
          )}

          {/* TAB: MINISTRY ADMIN, USER VERIFICATION & MONITORING PANEL (PHASE 8 INTEGRATION) */}
          {activeDashboardTab === 'ministry_monitor' && (
            <MinistryAdminPanel
              users={adminUsers}
              products={products}
              orders={orders}
              escrows={escrows}
              transactions={buyerPayments}
              settlements={settlements}
              refunds={refunds}
              disputes={financialDisputes}
              deliveries={deliveries}
              onUpdateUserVerification={handleUpdateUserVerification}
              onUpdateProductApproval={handleUpdateProductApproval}
              onUpdateUserProfile={handleUpdateUserProfile}
              onViewDeliveryDetails={(del) => setMinistryInspectedDelivery(del)}
              onOpenFinancialReports={() => setIsMinistryFinReportsOpen(true)}
              onOpenLogisticsReports={() => setIsMinistryReportsOpen(true)}
            />
          )}

          {/* TAB: RFQ & QUOTES */}
          {activeDashboardTab === 'rfq' && (
            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                <div>
                  <h3 className="text-base font-bold text-stone-900">কোটেশন ও RFQ এক্সচেঞ্জ</h3>
                  <p className="text-xs text-stone-500">বাল্ক ক্রয় অনুরোধ ও সরবরাহকারীদের দর প্রস্তাব</p>
                </div>
                {currentUser.role === 'buyer' && (
                  <button
                    onClick={() => setIsRFQModalOpen(true)}
                    className="px-4 py-2 bg-emerald-800 text-white rounded-xl text-xs font-bold"
                  >
                    + নতুন RFQ আহ্বান
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {rfqs.map(r => (
                  <div key={r.id} className="p-4 rounded-xl border border-stone-200 bg-stone-50/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                    <div>
                      <span className="font-mono text-[11px] font-bold text-emerald-900">{r.rfqNumber}</span>
                      <h4 className="font-bold text-stone-900 text-sm mt-0.5">{r.productRequirement}</h4>
                      <div className="text-stone-500 mt-0.5">
                        কোম্পানি: {r.companyName} · চাহিদা: {r.requiredQuantity} {r.unit} · টার্গেট দর: ৳{r.targetPricePerUnit}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-emerald-800">{r.quotationCount}টি কোটেশন জমা</span>
                      <div className="text-[11px] text-stone-400">ডেলিভারি: {r.requiredDeliveryDate}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: SHOP SETTINGS (FOR ENTREPRENEUR) */}
          {activeDashboardTab === 'shop_settings' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                  <div>
                    <h3 className="text-base font-bold text-stone-900">আমার অনলাইন শপ ব্যবস্থাপনা</h3>
                    <p className="text-xs text-stone-500">দোকানের নাম, পণ্য ও ব্র্যান্ডিং নিয়ন্ত্রণ করুন</p>
                  </div>
                  <button
                    onClick={() => setIsShopPreviewOpen(true)}
                    className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-stone-950 rounded-xl text-xs font-bold cursor-pointer shadow-xs"
                  >
                    শপ প্রিভিউ দেখুন
                  </button>
                </div>

                <div className="text-xs text-stone-700 space-y-2">
                  <div><strong>দোকানের ঠিকানা:</strong> <code className="bg-stone-100 px-2 py-0.5 rounded text-emerald-800">hillecommerce.gov.bd/shop/marma-crafts</code></div>
                  <div><strong>মোট সক্রিয় পণ্য:</strong> {products.length}টি</div>
                  <div><strong>এসক্রো স্ট্যাটাস:</strong> নিয়মিত সক্রিয়</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: PROFILE */}
          {activeDashboardTab === 'profile' && (
            <ProfileModule
              user={currentUser}
              onUpdateUser={(updated) => setCurrentUser(updated)}
            />
          )}

          {/* TAB: PAYMENTS (PHASE 7 INTEGRATION) */}
          {activeDashboardTab === 'payments' && (
            <PaymentModule
              user={currentUser}
              transactions={transactions}
              escrows={escrows}
              buyerPayments={buyerPayments}
              settlements={settlements}
              refunds={refunds}
              disputes={financialDisputes}
              onConfirmRelease={handleConfirmEscrowRelease}
              onPauseDispute={handlePauseEscrowDispute}
              onRequestRefund={handleRequestRefund}
              onApproveRefund={handleApproveRefund}
              onSubmitDispute={handleSubmitFinancialDispute}
              onResolveDispute={handleResolveFinancialDispute}
            />
          )}

          {/* TAB: REPORTS */}
          {activeDashboardTab === 'reports' && (
            <ReportsModule user={currentUser} />
          )}

          {/* TAB: MESSAGES */}
          {activeDashboardTab === 'messages' && (
            <MessagesModule user={currentUser} />
          )}

          {/* TAB: NOTIFICATIONS */}
          {activeDashboardTab === 'notifications' && (
            <NotificationsModule
              notifications={notifications}
              onSelectTab={(tab) => setActiveDashboardTab(tab)}
            />
          )}

          {/* TAB: SETTINGS */}
          {activeDashboardTab === 'settings' && (
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-5 max-w-3xl">
              <div>
                <h3 className="text-base font-bold text-stone-900">অ্যাকাউন্ট ও নিরাপত্তা সেটিংস</h3>
                <p className="text-xs text-stone-500 mt-0.5">পাসওয়ার্ড, নোটিফিকেশন অ্যালার্ট ও এসক্রো ব্যাংক অ্যাকাউন্ট সেটিংস</p>
              </div>

              <div className="space-y-4 pt-3 border-t border-stone-200 text-xs">
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-stone-900">টু-ফ্যাক্টর এসএমএস ভেরিফিকেশন (2FA)</div>
                    <div className="text-stone-500">লগইনের সময় ওটিপি কোড বাধ্যতামূলক করুন</div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 font-bold">সক্রিয়</span>
                </div>

                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-stone-900">এসক্রো অর্থ উত্তোলনের ব্যাংক অ্যাকাউন্ট</div>
                    <div className="text-stone-500">সোনালী ব্যাংক পিএলসি · হিসাব নং: ০১২০-XXXXXX</div>
                  </div>
                  <button className="text-emerald-800 font-bold hover:underline">পরিবর্তন</button>
                </div>
              </div>
            </div>
          )}
        </DashboardLayout>
      )}

      {/* 5. B2B WHOLESALE MARKETPLACE (PHASE 03) */}
      {currentPage === 'marketplace' && (
        <MarketplacePage
          onNavigate={handleNavigate}
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
          products={products}
          onSubmitRFQ={handleSubmitRFQ}
        />
      )}

      {/* Global Modals for Dashboard and Public */}
      <AddProductModal
        isOpen={isAddProductOpen}
        onClose={() => setIsAddProductOpen(false)}
        onAddProduct={handleAddProduct}
        defaultDistrict={currentUser.district}
        defaultProducerName={currentUser.businessName || currentUser.name}
      />

      <RFQModal
        isOpen={isRFQModalOpen}
        onClose={() => setIsRFQModalOpen(false)}
        onSubmitRFQ={handleSubmitRFQ}
        buyer={currentUser}
      />

      <ShopPreviewModal
        user={currentUser}
        isOpen={isShopPreviewOpen}
        onClose={() => setIsShopPreviewOpen(false)}
      />

      {/* Ministry Inspection Modal */}
      {ministryInspectedDelivery && (
        <DeliveryDetailsModal
          delivery={ministryInspectedDelivery}
          isOpen={true}
          onClose={() => setMinistryInspectedDelivery(null)}
          onOpenPackaging={() => {}}
          onOpenTransport={() => {}}
          onOpenChallan={() => {}}
          onOpenGRN={() => {}}
          onOpenIssue={() => {}}
          canEdit={false}
        />
      )}

      {/* Ministry Reports Modal */}
      <LogisticsReportsModal
        deliveries={deliveries}
        isOpen={isMinistryReportsOpen}
        onClose={() => setIsMinistryReportsOpen(false)}
      />

      {/* Buyer Payment Modal (Phase 7) */}
      {orderForPayment && (
        <BuyerPaymentModal
          order={orderForPayment}
          isOpen={!!orderForPayment}
          onClose={() => setOrderForPayment(null)}
          onCompletePayment={(paymentData) => {
            handleCompleteBuyerPayment(paymentData);
            setOrderForPayment(null);
          }}
        />
      )}

      {/* Ministry Financial Reports Modal (Phase 7) */}
      <FinancialReportsModal
        escrows={escrows}
        transactions={buyerPayments}
        settlements={settlements}
        refunds={refunds}
        isOpen={isMinistryFinReportsOpen}
        onClose={() => setIsMinistryFinReportsOpen(false)}
      />

    </div>
  );
}
