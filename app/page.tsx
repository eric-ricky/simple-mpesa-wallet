import WalletBalance from "@/components/WalletBalance";
import TopUpForm from "@/components/TopUpForm";
import TransactionHistory from "@/components/TransactionHistory";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Digital Wallet</h1>
        <div className="max-w-2xl mx-auto space-y-6">
          <WalletBalance />
          <TopUpForm />
          <TransactionHistory />
        </div>
      </div>
    </main>
  );
}