
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Coins, Plus } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface AddCoinsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCoins: (amount: number) => void;
}

const coinPackages = [
  { value: '100', label: '100 Coins', price: '$10' },
  { value: '300', label: '300 Coins', price: '$25' },
  { value: '500', label: '500 Coins', price: '$40' },
];

const AddCoinsModal: React.FC<AddCoinsModalProps> = ({ isOpen, onClose, onAddCoins }) => {
  const [selectedAmount, setSelectedAmount] = useState(coinPackages[0].value);
  const [customAmount, setCustomAmount] = useState('');
  const [isCustomAmount, setIsCustomAmount] = useState(false);

  const handleAddCoins = () => {
    const amount = isCustomAmount ? parseInt(customAmount, 10) : parseInt(selectedAmount, 10);
    if (!isNaN(amount) && amount > 0) {
      onAddCoins(amount);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center">
            <Coins size={20} className="mr-2 text-primary" />
            Add Coins to Wallet
          </DialogTitle>
          <DialogDescription>
            Select a coin package or enter a custom amount.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <RadioGroup 
            value={isCustomAmount ? 'custom' : selectedAmount} 
            onValueChange={(value) => {
              if (value === 'custom') {
                setIsCustomAmount(true);
              } else {
                setIsCustomAmount(false);
                setSelectedAmount(value);
              }
            }}
          >
            {coinPackages.map((pkg) => (
              <div key={pkg.value} className="flex items-center space-x-2 mb-3">
                <RadioGroupItem value={pkg.value} id={`package-${pkg.value}`} />
                <Label htmlFor={`package-${pkg.value}`} className="flex justify-between w-full">
                  <span>{pkg.label}</span>
                  <span className="text-muted-foreground">{pkg.price}</span>
                </Label>
              </div>
            ))}
            
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="custom" id="custom-amount" />
              <Label htmlFor="custom-amount" className="w-full">
                {isCustomAmount ? (
                  <Input 
                    type="number" 
                    placeholder="Enter amount" 
                    value={customAmount} 
                    onChange={(e) => setCustomAmount(e.target.value)} 
                    className="w-full mt-1" 
                    min="1"
                  />
                ) : (
                  "Custom Amount"
                )}
              </Label>
            </div>
          </RadioGroup>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleAddCoins} disabled={isCustomAmount && (!customAmount || parseInt(customAmount, 10) <= 0)}>
            <Plus size={16} className="mr-2" />
            Add Coins
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddCoinsModal;
