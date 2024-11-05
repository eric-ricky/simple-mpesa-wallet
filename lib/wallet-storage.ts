import { Transaction, WalletState } from './types';

const WALLET_STORAGE_KEY = 'digital_wallet_state';

export function getWalletState(): WalletState {
  if (typeof window === 'undefined') return { balance: 0, transactions: [] };
  
  const stored = localStorage.getItem(WALLET_STORAGE_KEY);
  if (!stored) {
    const initial: WalletState = { balance: 0, transactions: [] };
    localStorage.setItem(WALLET_STORAGE_KEY, JSON.stringify(initial));
    return initial;
  }
  
  return JSON.parse(stored);
}

export function updateWalletState(state: WalletState) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(WALLET_STORAGE_KEY, JSON.stringify(state));
}

export function addTransaction(transaction: Transaction) {
  const state = getWalletState();
  const newState = {
    balance: transaction.type === 'DEPOSIT' 
      ? state.balance + transaction.amount 
      : state.balance - transaction.amount,
    transactions: [transaction, ...state.transactions]
  };
  updateWalletState(newState);
  return newState;
}