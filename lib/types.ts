export interface Transaction {
  id: string;
  type: 'DEPOSIT' | 'WITHDRAWAL';
  amount: number;
  timestamp: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  reference: string;
}

export interface WalletState {
  balance: number;
  transactions: Transaction[];
}