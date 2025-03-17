
import React from 'react';
import { ArrowUp, ArrowDown, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { Transaction } from '@/pages/Wallet';

interface WalletTransactionProps {
  transaction: Transaction;
}

const WalletTransaction: React.FC<WalletTransactionProps> = ({ transaction }) => {
  const isCredit = transaction.type === 'credit';
  
  return (
    <div className="flex items-center p-3 rounded-lg border border-border hover:bg-accent/10 transition-colors">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
        isCredit ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
      }`}>
        {isCredit ? <ArrowUp size={18} /> : <ArrowDown size={18} />}
      </div>
      
      <div className="ml-3 flex-grow">
        <div className="font-medium">{transaction.description}</div>
        <div className="text-xs text-muted-foreground flex items-center">
          <Calendar size={12} className="mr-1" />
          {format(new Date(transaction.date), 'MMM d, yyyy - h:mm a')}
        </div>
      </div>
      
      <div className={`font-medium ${
        isCredit ? 'text-green-600' : 'text-red-600'
      }`}>
        {isCredit ? '+' : '-'}{transaction.amount} coins
      </div>
    </div>
  );
};

export default WalletTransaction;
