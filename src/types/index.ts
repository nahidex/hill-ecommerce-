export type PageView = 'home' | 'signup' | 'login' | 'dashboard' | 'marketplace';

export type AccountType = 'farmer' | 'supplier' | 'buyer' | 'entrepreneur';

export type DashboardTab = 
  | 'overview' 
  | 'products' 
  | 'orders' 
  | 'logistics'
  | 'messages' 
  | 'payments' 
  | 'notifications' 
  | 'reports' 
  | 'profile' 
  | 'settings' 
  | 'shop_settings' 
  | 'rfq' 
  | 'dispute'
  | 'ministry_monitor';

export interface UserSession {
  id: string;
  name: string;
  role: AccountType;
  email: string;
  mobile: string;
  district: string;
  upazila: string;
  address: string;
  avatar: string;
  verified: boolean;
  memberId: string;
  businessName?: string;
  shopName?: string;
  bio?: string;
  joinedDate: string;
}

export interface BulkPriceTier {
  minQty: number;
  maxQty: number | string;
  price: number | string;
}

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  categorySlug: 'agriculture' | 'fruits' | 'spices' | 'handicraft' | 'apparel' | 'processed' | 'bamboo';
  origin: string;
  district: 'খাগড়াছড়ি' | 'বান্দরবান' | 'রাঙামাটি';
  upazila: string;
  producerName: string;
  producerType: string;
  sellerId?: string;
  sellerType?: 'উৎপাদক' | 'কৃষক' | 'সরবরাহকারী' | 'সমবায় সমিতি' | 'ব্যবসায়ী';
  isVerifiedSeller?: boolean;
  isPerishable: boolean;
  qualityGrade: string;
  pricePerUnit: number;
  unit: string;
  minOrderQuantity: number;
  availableQuantity: number;
  rating: number;
  totalReviews: number;
  harvestDate?: string;
  description: string;
  image: string;
  galleryImages?: string[];
  badge?: string;
  status?: 'active' | 'out_of_stock' | 'pending_approval';
  bulkPricingTiers?: BulkPriceTier[];
  specifications: {
    organic: boolean;
    packaging: string;
    deliveryTime: string;
    shelfLife: string;
    purityGrade: string;
    storageRequirement?: string;
  };
}

export interface CategoryInfo {
  id: string;
  name: string;
  slug: string;
  description: string;
  itemCount: number;
  districts: string[];
  iconName: string;
}

export type OrderStageKey = 
  | 'request_submitted' 
  | 'negotiation' 
  | 'confirmed' 
  | 'preparing' 
  | 'ready_to_ship' 
  | 'shipped' 
  | 'received' 
  | 'completed' 
  | 'cancelled';

export interface OrderActivityLog {
  id: string;
  stageKey: OrderStageKey;
  stageNumber: number;
  title: string;
  note: string;
  timestamp: string;
  actor: string;
}

export interface NegotiationOffer {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: 'buyer' | 'seller';
  priceOffer: number;
  quantity?: number;
  note: string;
  timestamp: string;
  status: 'active' | 'countered' | 'accepted' | 'rejected';
}

export interface OrderItem {
  id: string;
  orderNumber: string;
  productName: string;
  productId?: string;
  productImage: string;
  customerName: string;
  customerRole: string;
  customerPhone: string;
  buyerId?: string;
  buyerCompanyName?: string;
  sellerId?: string;
  sellerName?: string;
  sellerPhone?: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  initialProposedPrice?: number;
  totalProductPrice?: number;
  shippingCost?: number;
  packagingCost?: number;
  totalAmount: number;
  orderDate: string;
  expectedDeliveryDate?: string;
  destination: string;
  specialInstructions?: string;
  agreedTerms?: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'negotiation';
  stage?: OrderStageKey;
  stageNumber?: number;
  escrowStatus: 'deposited' | 'in_escrow' | 'released' | 'refunded';
  activityHistory?: OrderActivityLog[];
  negotiationHistory?: NegotiationOffer[];
}

export interface QuotationItem {
  id: string;
  rfqId: string;
  rfqNumber: string;
  sellerId: string;
  sellerName: string;
  sellerBusiness: string;
  sellerPhone: string;
  sellerRating: number;
  sellerDistrict: string;
  proposedUnitPrice: number;
  offeredQuantity: number;
  unit: string;
  totalProductPrice: number;
  shippingCost: number;
  packagingCost: number;
  totalAmount: number;
  expectedDeliveryDate: string;
  paymentTerms: string;
  validUntil: string;
  additionalTerms?: string;
  notes?: string;
  status: 'submitted' | 'accepted' | 'rejected' | 'negotiating' | 'draft';
  submittedDate: string;
}

export interface RFQItem {
  id: string;
  rfqNumber: string;
  buyerId?: string;
  buyerName: string;
  companyName: string;
  buyerPhone?: string;
  productRequirement: string;
  productDescription?: string;
  category: string;
  requiredQuantity: number;
  unit: string;
  qualityGrade?: string;
  targetPricePerUnit: number;
  deliveryLocation?: string;
  requiredDeliveryDate: string;
  deliveryDeadline?: string;
  submissionDeadline?: string;
  additionalTerms?: string;
  publishDate?: string;
  district: string;
  status: 'open' | 'quoted' | 'accepted' | 'closed' | 'awaiting_response' | 'expired';
  quotationCount: number;
  myQuotePrice?: number;
  date: string;
  specifications?: string;
  quotations?: QuotationItem[];
}

export interface BulkOrderRequest {
  id: string;
  requestId: string;
  productId: string;
  productName: string;
  productImage: string;
  sellerName: string;
  buyerName: string;
  buyerPhone: string;
  quantity: number;
  unit: string;
  proposedPrice: number;
  totalEstimatedPrice: number;
  deliveryLocation: string;
  deliveryDate: string;
  additionalInstructions?: string;
  status: 'submitted' | 'under_negotiation' | 'accepted' | 'declined';
  createdAt: string;
}

export interface PriceNegotiation {
  id: string;
  productId: string;
  productName: string;
  sellerName: string;
  buyerName: string;
  sellerInitialPrice: number;
  buyerProposedPrice: number;
  currentOffer: number;
  unit: string;
  status: 'in_progress' | 'agreed' | 'rejected';
  history: {
    sender: string;
    isSeller: boolean;
    priceOffer: number;
    note: string;
    time: string;
  }[];
}

export interface SellerProfile {
  id: string;
  name: string;
  businessName: string;
  district: string;
  upazila: string;
  sellerType: 'উৎপাদক' | 'কৃষক' | 'সরবরাহকারী' | 'সমবায় সমিতি' | 'ব্যবসায়ী';
  verified: boolean;
  rating: number;
  totalReviews: number;
  listedProductsCount: number;
  completedTransactions: number;
  avatar: string;
  bio: string;
  joinedDate: string;
  phone: string;
  email: string;
}

export interface TransactionItem {
  id: string;
  invoiceNumber: string;
  title: string;
  counterParty: string;
  partyRole: string;
  date: string;
  amount: number;
  type: 'credit' | 'debit' | 'escrow_hold';
  status: 'completed' | 'in_escrow' | 'pending';
  escrowStatusText: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'order' | 'rfq' | 'payment' | 'delivery' | 'message' | 'dispute';
  unread: boolean;
  linkTab?: DashboardTab;
}

export interface ChatMessage {
  id: string;
  sender: string;
  senderRole: string;
  text: string;
  time: string;
  isMe: boolean;
  attachmentName?: string;
}

// ==========================================
// Phase 6: Delivery & Logistics Management
// ==========================================

export type DeliveryStageKey = 
  | 'order_confirmed'
  | 'preparing'
  | 'packaging_completed'
  | 'ready_for_transport'
  | 'picked_up'
  | 'in_transit'
  | 'arrived_hub'
  | 'out_for_delivery'
  | 'delivered'
  | 'delayed'
  | 'disputed'
  | 'cancelled';

export type PackagingType = 'বস্তা' | 'কার্টন' | 'ঝুড়ি' | 'বাক্স' | 'পলিব্যাগ' | 'প্লাস্টিক ক্রেট' | 'অন্যান্য';

export interface PackagingInfo {
  packagingType: PackagingType;
  packageCount: number;
  weightPerPackage: number; // in kg
  totalWeight: number; // in kg
  packagingDate: string;
  status: 'pending' | 'in_progress' | 'completed';
  packagingInstructions?: string;
  isPerishable: boolean;
  storageTemperature?: string;
  fastTransitRequired: boolean;
  freshnessInstructions?: string;
}

export type TransportMode = 'own' | 'third_party' | 'buyer_assigned' | 'courier';

export interface TransportCheckpoint {
  id: string;
  location: string;
  timestamp: string;
  statusText: string;
  note?: string;
}

export interface TransportInfo {
  mode: TransportMode;
  providerName: string;
  driverName: string;
  driverPhone: string;
  vehicleType: string;
  vehicleNumber: string;
  pickupLocation: string;
  destination: string;
  pickupDateTime: string;
  expectedArrivalDateTime: string;
  actualArrivalDateTime?: string;
  transportCost: number;
  notes?: string;
  trackingCheckpoints?: TransportCheckpoint[];
}

export interface DeliveryCostBreakdown {
  transportCost: number;
  packagingCost: number;
  loadingUnloadingCost: number;
  otherCost: number;
  totalDeliveryCost: number;
  costBearer: 'buyer' | 'seller' | 'split';
  additionalCostNotes?: string;
  agreedWithParties?: boolean;
}

export type GoodsReceiptType = 'full' | 'partial' | 'damaged' | 'wrong_item' | 'not_received';

export interface GoodsReceivedNote {
  id: string;
  grnNumber: string;
  deliveryId: string;
  orderNumber: string;
  receiptType: GoodsReceiptType;
  receivedQuantity: number;
  shortageQuantity: number;
  damagedQuantity: number;
  unit: string;
  problemDescription?: string;
  attachedPhotos?: string[];
  receiptDateTime: string;
  buyerComments?: string;
  receivedBy: string;
  status: 'verified' | 'disputed';
}

export type IssueCategory = 
  | 'delayed' 
  | 'shortage' 
  | 'damaged' 
  | 'wrong_product' 
  | 'transport_failure' 
  | 'lost' 
  | 'other';

export type IssueStatus = 
  | 'new' 
  | 'under_review' 
  | 'awaiting_seller_reply' 
  | 'resolving' 
  | 'resolved' 
  | 'unresolved';

export interface DeliveryIssueItem {
  id: string;
  issueNumber: string;
  orderNumber: string;
  deliveryId: string;
  complainantName: string;
  complainantRole: 'buyer' | 'seller';
  issueCategory: IssueCategory;
  categoryLabel: string;
  description: string;
  attachedPhotos?: string[];
  issueDate: string;
  status: IssueStatus;
  statusLabel: string;
  resolutionNotes?: string;
  history?: {
    timestamp: string;
    actor: string;
    note: string;
    status: string;
  }[];
}

export interface DeliveryHistoryLog {
  id: string;
  stage: DeliveryStageKey;
  stageNumber: number;
  title: string;
  location: string;
  timestamp: string;
  actor: string;
  note: string;
}

export interface DeliveryItem {
  id: string;
  deliveryNumber: string;
  orderId: string;
  orderNumber: string;
  challanNumber: string;
  challanDate: string;
  buyerId: string;
  buyerName: string;
  buyerCompany: string;
  buyerPhone: string;
  sellerId: string;
  sellerName: string;
  sellerCompany: string;
  sellerPhone: string;
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  unit: string;
  packaging: PackagingInfo;
  transport: TransportInfo;
  costs: DeliveryCostBreakdown;
  pickupAddress: string;
  deliveryAddress: string;
  expectedDeliveryDate: string;
  actualDeliveryDate?: string;
  specialInstructions?: string;
  stage: DeliveryStageKey;
  stageNumber: number; // 1 to 9
  currentLocation: string;
  lastUpdatedTime: string;
  isDelayed: boolean;
  delayReason?: string;
  grn?: GoodsReceivedNote;
  issue?: DeliveryIssueItem;
  history: DeliveryHistoryLog[];
}

