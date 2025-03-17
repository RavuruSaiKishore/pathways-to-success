
import { v4 as uuidv4 } from 'uuid';
import { Transaction } from '@/pages/Wallet';

interface WalletData {
  balance: number;
  transactions: Transaction[];
}

const WALLET_STORAGE_KEY = 'userWallet';

export const walletService = {
  getWalletData: (): WalletData => {
    const storedWallet = localStorage.getItem(WALLET_STORAGE_KEY);
    if (storedWallet) {
      return JSON.parse(storedWallet);
    }
    
    // Initialize with empty wallet if not found
    const emptyWallet: WalletData = {
      balance: 0,
      transactions: []
    };
    localStorage.setItem(WALLET_STORAGE_KEY, JSON.stringify(emptyWallet));
    return emptyWallet;
  },
  
  saveWalletData: (walletData: WalletData): void => {
    localStorage.setItem(WALLET_STORAGE_KEY, JSON.stringify(walletData));
  },
  
  addCoins: (amount: number): WalletData => {
    const walletData = walletService.getWalletData();
    
    const updatedBalance = walletData.balance + amount;
    
    // Create transaction record
    const transaction: Transaction = {
      id: uuidv4(),
      date: new Date().toISOString(),
      amount: amount,
      type: 'credit',
      description: 'Added coins to wallet',
    };
    
    // Update wallet data
    const updatedWalletData: WalletData = {
      balance: updatedBalance,
      transactions: [transaction, ...walletData.transactions]
    };
    
    // Save updated wallet
    walletService.saveWalletData(updatedWalletData);
    
    return updatedWalletData;
  },
  
  deductCoins: (amount: number, description: string, appointmentId?: string): WalletData => {
    const walletData = walletService.getWalletData();
    
    // Check if user has enough coins
    if (walletData.balance < amount) {
      throw new Error('Insufficient balance');
    }
    
    const updatedBalance = walletData.balance - amount;
    
    // Create transaction record
    const transaction: Transaction = {
      id: uuidv4(),
      date: new Date().toISOString(),
      amount: amount,
      type: 'debit',
      description,
      appointmentId
    };
    
    // Update wallet data
    const updatedWalletData: WalletData = {
      balance: updatedBalance,
      transactions: [transaction, ...walletData.transactions]
    };
    
    // Save updated wallet
    walletService.saveWalletData(updatedWalletData);
    
    return updatedWalletData;
  },
  
  getBalance: (): number => {
    return walletService.getWalletData().balance;
  }
};
