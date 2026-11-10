import React from 'react';
import { 
  UserSession, 
  EscrowRecord, 
  BuyerPaymentTransaction, 
  SellerSettlementItem, 
  RefundRecord, 
  FinancialDisputeRecord,
  TransactionItem
} from '../../types';
import { PaymentEscrowDashboard } from '../payment/PaymentEscrowDashboard';
import { 
  INITIAL_ESCROWS, 
  INITIAL_BUYER_PAYMENTS, 
  INITIAL_SELLER_SETTLEMENTS, 
  INITIAL_REFUNDS, 
  INITIAL_FINANCIAL_DISPUTES 
} from '../../data/escrowMock';

interface PaymentModuleProps {
  user: UserSession;
  transactions?: TransactionItem[];
  escrows?: EscrowRecord[];
  buyerPayments?: BuyerPaymentTransaction[];
  settlements?: SellerSettlementItem[];
  refunds?: RefundRecord[];
  disputes?: FinancialDisputeRecord[];
  onConfirmRelease?: (escrowId: string, note: string) => void;
  onPauseDispute?: (escrowId: string, reason: string) => void;
  onRequestRefund?: (refundData: any) => void;
  onApproveRefund?: (refundId: string) => void;
  onSubmitDispute?: (disputeData: any) => void;
  onResolveDispute?: (disputeId: string, summary: string) => void;
}

export const PaymentModule: React.FC<PaymentModuleProps> = ({
  user,
  escrows = INITIAL_ESCROWS,
  buyerPayments = INITIAL_BUYER_PAYMENTS,
  settlements = INITIAL_SELLER_SETTLEMENTS,
  refunds = INITIAL_REFUNDS,
  disputes = INITIAL_FINANCIAL_DISPUTES,
  onConfirmRelease = () => {},
  onPauseDispute = () => {},
  onRequestRefund = () => {},
  onApproveRefund = () => {},
  onSubmitDispute = () => {},
  onResolveDispute = () => {}
}) => {
  return (
    <PaymentEscrowDashboard
      user={user}
      escrows={escrows}
      transactions={buyerPayments}
      settlements={settlements}
      refunds={refunds}
      disputes={disputes}
      onConfirmRelease={onConfirmRelease}
      onPauseDispute={onPauseDispute}
      onRequestRefund={onRequestRefund}
      onApproveRefund={onApproveRefund}
      onSubmitDispute={onSubmitDispute}
      onResolveDispute={onResolveDispute}
    />
  );
};
