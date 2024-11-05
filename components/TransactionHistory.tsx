"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getWalletState } from '@/lib/wallet-storage';
import { Transaction } from '@/lib/types';
import { ArrowDownCircle, ArrowUpCircle } from 'lucide-react';

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const updateTransactions = () => {
      const { transactions } = getWalletState();
      setTransactions(transactions);
    };

    updateTransactions();
    window.addEventListener('wallet-updated', updateTransactions);
    return () => window.removeEventListener('wallet-updated', updateTransactions);
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.length === 0 ? (
            <p className="text-center text-muted-foreground">No transactions yet</p>
          ) : (
            transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 rounded-lg border"
              >
                <div className="flex items-center gap-3">
                  {transaction.type === 'DEPOSIT' ? (
                    <ArrowDownCircle className="text-green-500" />
                  ) : (
                    <ArrowUpCircle className="text-red-500" />
                  )}
                  <div>
                    <p className="font-medium">
                      {transaction.type === 'DEPOSIT' ? 'Top Up' : 'Withdrawal'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(transaction.timestamp).toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Ref: {transaction.reference}
                    </p>
                  </div>
                </div>
                <p className={`font-bold ${
                  transaction.type === 'DEPOSIT' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {transaction.type === 'DEPOSIT' ? '+' : '-'} KES {transaction.amount.toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}