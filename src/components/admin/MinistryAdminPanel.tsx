import React, { useState } from 'react';
import { 
  Building2, 
  LayoutDashboard, 
  Users, 
  Package, 
  ShieldCheck, 
  CreditCard, 
  Truck, 
  Key, 
  BarChart3, 
  FileText,
  Search,
  Bell,
  ArrowRight
} from 'lucide-react';
import { 
  AdminUserItem, 
  ProductItem, 
  OrderItem, 
  EscrowRecord, 
  BuyerPaymentTransaction, 
  SellerSettlementItem, 
  RefundRecord, 
  FinancialDisputeRecord, 
  DeliveryItem 
} from '../../types';
import { MinistryAdminDashboard } from './MinistryAdminDashboard';
import { UserVerificationModule } from './UserVerificationModule';
import { ProductApprovalModule } from './ProductApprovalModule';
import { RBACManagementModule } from './RBACManagementModule';
import { UserProfileManagementModal } from './UserProfileManagementModal';
import { MinistryFinancialDashboard } from '../payment/MinistryFinancialDashboard';
import { MinistryMonitoringView } from '../logistics/MinistryMonitoringView';

interface MinistryAdminPanelProps {
  users: AdminUserItem[];
  products: ProductItem[];
  orders: OrderItem[];
  escrows: EscrowRecord[];
  transactions: BuyerPaymentTransaction[];
  settlements: SellerSettlementItem[];
  refunds: RefundRecord[];
  disputes: FinancialDisputeRecord[];
  deliveries: DeliveryItem[];
  onUpdateUserVerification: (
    userId: string,
    action: 'approved' | 'correction_requested' | 'rejected' | 'suspended' | 'reactivated' | 'under_review',
    reason: string,
    notes?: string
  ) => void;
  onUpdateProductApproval: (
    productId: string,
    action: 'approved' | 'needs_correction' | 'rejected' | 'suspended',
    reason: string,
    notes?: string
  ) => void;
  onUpdateUserProfile: (
    userId: string,
    updatedData: Partial<AdminUserItem>,
    auditReason: string
  ) => void;
  onViewDeliveryDetails?: (delivery: DeliveryItem) => void;
  onOpenFinancialReports?: () => void;
  onOpenLogisticsReports?: () => void;
}

export const MinistryAdminPanel: React.FC<MinistryAdminPanelProps> = ({
  users,
  products,
  orders,
  escrows,
  transactions,
  settlements,
  refunds,
  disputes,
  deliveries,
  onUpdateUserVerification,
  onUpdateProductApproval,
  onUpdateUserProfile,
  onViewDeliveryDetails = () => {},
  onOpenFinancialReports = () => {},
  onOpenLogisticsReports = () => {}
}) => {
  const [activeAdminTab, setActiveAdminTab] = useState<
    'dashboard' | 'verification' | 'products' | 'rbac' | 'finance' | 'logistics'
  >('dashboard');

  const [selectedUserForProfile, setSelectedUserForProfile] = useState<AdminUserItem | null>(null);

  const pendingVerificationCount = users.filter(
    u => u.verificationStatus === 'pending_verification' || u.verificationStatus === 'under_review'
  ).length;

  const pendingProductsCount = products.filter(
    p => p.approvalStatus === 'pending_approval' || p.status === 'pending_approval'
  ).length;

  return (
    <div className="space-y-6 font-bengali animate-in fade-in">
      
      {/* Admin Sub-navigation Bar */}
      <div className="bg-white rounded-2xl p-2 border border-stone-200 shadow-sm flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        
        {/* Tab 1: Dashboard Overview */}
        <button
          onClick={() => setActiveAdminTab('dashboard')}
          className={`py-2.5 px-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeAdminTab === 'dashboard'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
          }`}
        >
          <LayoutDashboard className="w-4 h-4 text-amber-300" />
          <span>কেন্দ্রীয় ড্যাশবোর্ড</span>
        </button>

        {/* Tab 2: User Verification */}
        <button
          onClick={() => setActiveAdminTab('verification')}
          className={`py-2.5 px-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeAdminTab === 'verification'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
          }`}
        >
          <Users className="w-4 h-4 text-amber-300" />
          <span>ব্যবহারকারী যাচাই</span>
          {pendingVerificationCount > 0 && (
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
              activeAdminTab === 'verification'
                ? 'bg-amber-400 text-stone-950'
                : 'bg-amber-100 text-amber-900 border border-amber-300'
            }`}>
              {pendingVerificationCount}
            </span>
          )}
        </button>

        {/* Tab 3: Product Approval */}
        <button
          onClick={() => setActiveAdminTab('products')}
          className={`py-2.5 px-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeAdminTab === 'products'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
          }`}
        >
          <Package className="w-4 h-4 text-amber-300" />
          <span>পণ্য অনুমোদন ও মান</span>
          {pendingProductsCount > 0 && (
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
              activeAdminTab === 'products'
                ? 'bg-amber-400 text-stone-950'
                : 'bg-amber-100 text-amber-900 border border-amber-300'
            }`}>
              {pendingProductsCount}
            </span>
          )}
        </button>

        {/* Tab 4: RBAC & Permissions */}
        <button
          onClick={() => setActiveAdminTab('rbac')}
          className={`py-2.5 px-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeAdminTab === 'rbac'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
          }`}
        >
          <Key className="w-4 h-4 text-amber-300" />
          <span>ভূমিকা ও অনুমতি (RBAC)</span>
        </button>

        {/* Tab 5: Financial Escrow Monitoring */}
        <button
          onClick={() => setActiveAdminTab('finance')}
          className={`py-2.5 px-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeAdminTab === 'finance'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
          }`}
        >
          <CreditCard className="w-4 h-4 text-amber-300" />
          <span>আর্থিক এসক্রো ট্রাস্ট</span>
        </button>

        {/* Tab 6: Logistics Monitoring */}
        <button
          onClick={() => setActiveAdminTab('logistics')}
          className={`py-2.5 px-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeAdminTab === 'logistics'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
          }`}
        >
          <Truck className="w-4 h-4 text-amber-300" />
          <span>লজিস্টিকস ও সাপ্লাই চেইন</span>
        </button>

      </div>

      {/* Main Tab Views */}

      {/* VIEW 1: DASHBOARD OVERVIEW */}
      {activeAdminTab === 'dashboard' && (
        <MinistryAdminDashboard
          users={users}
          products={products}
          orders={orders}
          escrows={escrows}
          onNavigateTab={(tab) => {
            if (tab === 'verification') setActiveAdminTab('verification');
            else if (tab === 'products') setActiveAdminTab('products');
            else if (tab === 'rbac') setActiveAdminTab('rbac');
            else if (tab === 'finance') setActiveAdminTab('finance');
            else if (tab === 'logistics') setActiveAdminTab('logistics');
          }}
        />
      )}

      {/* VIEW 2: USER VERIFICATION */}
      {activeAdminTab === 'verification' && (
        <UserVerificationModule
          users={users}
          onUpdateUserVerification={onUpdateUserVerification}
          onViewUserProfile={(u) => setSelectedUserForProfile(u)}
        />
      )}

      {/* VIEW 3: PRODUCT APPROVAL */}
      {activeAdminTab === 'products' && (
        <ProductApprovalModule
          products={products}
          onUpdateProductApproval={onUpdateProductApproval}
        />
      )}

      {/* VIEW 4: RBAC & PERMISSION MANAGEMENT */}
      {activeAdminTab === 'rbac' && (
        <RBACManagementModule />
      )}

      {/* VIEW 5: FINANCIAL ESCROW MONITORING */}
      {activeAdminTab === 'finance' && (
        <MinistryFinancialDashboard
          escrows={escrows}
          transactions={transactions}
          settlements={settlements}
          refunds={refunds}
          disputes={disputes}
          onOpenReports={onOpenFinancialReports}
        />
      )}

      {/* VIEW 6: LOGISTICS MONITORING */}
      {activeAdminTab === 'logistics' && (
        <MinistryMonitoringView
          deliveries={deliveries}
          onViewDelivery={onViewDeliveryDetails}
          onOpenReports={onOpenLogisticsReports}
        />
      )}

      {/* User Profile Modal Triggered from directory */}
      <UserProfileManagementModal
        user={selectedUserForProfile}
        isOpen={!!selectedUserForProfile}
        onClose={() => setSelectedUserForProfile(null)}
        products={products}
        orders={orders}
        escrows={escrows}
        onUpdateUserProfile={(userId, updatedData, auditReason) => {
          onUpdateUserProfile(userId, updatedData, auditReason);
          if (selectedUserForProfile && selectedUserForProfile.id === userId) {
            setSelectedUserForProfile({
              ...selectedUserForProfile,
              ...updatedData
            });
          }
        }}
      />

    </div>
  );
};
