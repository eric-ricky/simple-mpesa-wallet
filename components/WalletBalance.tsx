"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getWalletState } from '@/lib/wallet-storage';
import { WalletState } from '@/lib/types';

export default function WalletBalance() {
  const [walletState, setWalletState] = useState<WalletState>({ balance: 0, transactions: [] });

  useEffect(() => {
    setWalletState(getWalletState());
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Wallet Balance</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-4xl font-bold text-primary">
          KES {walletState.balance.toLocaleString()}
        </p>
      </CardContent>
    </Card>
  );
}