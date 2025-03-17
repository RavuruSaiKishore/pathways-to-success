
import React, { useState, useEffect } from 'react';
import { Wallet as WalletIcon, Plus, ArrowDown, ArrowUp, CreditCard, AlertCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import AddCoinsModal from '@/components/AddCoinsModal';
import WalletTransaction from '@/components/WalletTransaction';
import { walletService } from '@/services/walletService';

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: 'credit' | 'debit';
  description: string;
  appointmentId?: string;
}

const Wallet: React.FC = () => {
  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isAddCoinsModalOpen, setIsAddCoinsModalOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load wallet data from localStorage
    const walletData = walletService.getWalletData();
    setBalance(walletData.balance);
    setTransactions(walletData.transactions);
  }, []);

  const handleAddCoins = (amount: number) => {
    try {
      const updatedWallet = walletService.addCoins(amount);
      setBalance(updatedWallet.balance);
      setTransactions(updatedWallet.transactions);
      
      toast({
        title: "Coins Added Successfully",
        description: `${amount} coins have been added to your wallet.`,
      });

      setIsAddCoinsModalOpen(false);
    } catch (error) {
      toast({
        title: "Failed to Add Coins",
        description: "There was an error adding coins to your wallet.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">My Wallet</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Wallet Balance Card */}
            <Card className="lg:col-span-1">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl flex items-center">
                  <WalletIcon size={20} className="mr-2 text-primary" />
                  Wallet Balance
                </CardTitle>
                <CardDescription>Your current coin balance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-center py-6">
                  {balance} <span className="text-lg font-normal text-muted-foreground">coins</span>
                </div>
                {balance < 50 && (
                  <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-lg p-3 mb-4 flex items-start">
                    <AlertCircle size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">Your coin balance is low. Consider adding more coins to your wallet.</p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={() => setIsAddCoinsModalOpen(true)}
                >
                  <Plus size={16} className="mr-2" />
                  Add Coins
                </Button>
              </CardFooter>
            </Card>
            
            {/* Transactions History */}
            <Card className="lg:col-span-2">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl">Transaction History</CardTitle>
                <CardDescription>Recent activity in your wallet</CardDescription>
              </CardHeader>
              <CardContent>
                {transactions.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No transactions yet. Add coins to your wallet to get started.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {transactions.map((transaction) => (
                      <WalletTransaction 
                        key={transaction.id} 
                        transaction={transaction} 
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <AddCoinsModal
        isOpen={isAddCoinsModalOpen}
        onClose={() => setIsAddCoinsModalOpen(false)}
        onAddCoins={handleAddCoins}
      />
      
      <Footer />
    </div>
  );
};

export default Wallet;
