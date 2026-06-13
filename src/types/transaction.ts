export type TransactionType = "buy_whole" | "buy_shares" | "donate";
export type PaymentMethod = "stripe" | "mpesa" | "paypal";
export type PaymentStatus = "pending" | "completed" | "failed" | "refunded";

export interface ShareDetails {
  sharesBought: number;
  pricePerShare: number;
}

export interface Transaction {
  id: string;
  buyerId: string;
  sellerId: string;
  projectId: string;
  type: TransactionType;
  amount: number;
  currency: string;
  shareDetails?: ShareDetails;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  transactionId: string;
  createdAt: Date;
  completedAt?: Date;
}
