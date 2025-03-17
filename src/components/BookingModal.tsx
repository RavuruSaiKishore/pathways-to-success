import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Professional } from '@/data/professionals';
import { format } from 'date-fns';
import { Check, Calendar, Clock, CheckCircle2, Coins, Wallet } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { v4 as uuidv4 } from 'uuid';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { walletService } from '@/services/walletService';

interface BookingModalProps {
  professional: Professional;
  isOpen: boolean;
  onClose: () => void;
}

const expertiseLevels = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' }
];

const paymentMethods = [
  { value: 'coins', label: 'Pay with Coins' },
  { value: 'card', label: 'Pay with Card' }
];

const BookingModal: React.FC<BookingModalProps> = ({ 
  professional, 
  isOpen, 
  onClose 
}) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingStatus, setBookingStatus] = useState<'input' | 'success'>('input');
  const [description, setDescription] = useState('');
  const [expertiseLevel, setExpertiseLevel] = useState('beginner');
  const [paymentMethod, setPaymentMethod] = useState('coins');
  const [walletBalance, setWalletBalance] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const appointmentCost = 100;
  
  useEffect(() => {
    const balance = walletService.getBalance();
    setWalletBalance(balance);
  }, []);
  
  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };
  
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };
  
  const handleBookAppointment = () => {
    if (!selectedDate || !selectedTime) return;
    
    if (!description.trim()) {
      toast({
        title: "Description Required",
        description: "Please provide a brief description of what you'd like to discuss.",
        variant: "destructive",
      });
      return;
    }
    
    if (paymentMethod === 'coins' && walletBalance < appointmentCost) {
      toast({
        title: "Insufficient Coins",
        description: "You don't have enough coins for this appointment. Please add more coins to your wallet or choose a different payment method.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const appointmentId = uuidv4();
      const appointment = {
        id: appointmentId,
        professionalId: professional.id,
        date: selectedDate,
        time: selectedTime,
        description,
        expertiseLevel,
        paymentMethod,
        cost: appointmentCost,
        status: 'confirmed',
        createdAt: new Date().toISOString()
      };
      
      if (paymentMethod === 'coins') {
        try {
          walletService.deductCoins(
            appointmentCost, 
            `Appointment with ${professional.name}`, 
            appointmentId
          );
          setWalletBalance(walletService.getBalance());
        } catch (error) {
          toast({
            title: "Payment Failed",
            description: "Failed to deduct coins from your wallet. Please try again.",
            variant: "destructive",
          });
          return;
        }
      }
      
      const existingAppointments = JSON.parse(localStorage.getItem('userAppointments') || '[]');
      const updatedAppointments = [...existingAppointments, appointment];
      localStorage.setItem('userAppointments', JSON.stringify(updatedAppointments));
      
      setBookingStatus('success');
      
      toast({
        title: "Appointment Booked!",
        description: `You've successfully booked an appointment with ${professional.name} on ${format(new Date(selectedDate), 'MMMM d, yyyy')} at ${selectedTime}.`,
      });
    } catch (error) {
      console.error('Error booking appointment:', error);
      toast({
        title: "Booking Failed",
        description: "There was an error booking your appointment. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleCloseAndReset = () => {
    onClose();
    setTimeout(() => {
      setSelectedDate(null);
      setSelectedTime(null);
      setDescription('');
      setExpertiseLevel('beginner');
      setPaymentMethod('coins');
      setBookingStatus('input');
    }, 300);
  };
  
  const handleViewAppointments = () => {
    handleCloseAndReset();
    navigate('/my-appointments');
  };
  
  const isDateSelected = (date: string) => selectedDate === date;
  const isTimeSelected = (time: string) => selectedTime === time;
  const isTimeAvailable = (date: string, time: string) => {
    if (!date) return false;
    
    const dateObj = professional.availableDates.find(d => d.date === date);
    if (!dateObj) return false;
    
    const timeSlot = dateObj.slots.find(s => s.time === time);
    return timeSlot?.available || false;
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={handleCloseAndReset}>
      <DialogContent className="sm:max-w-[500px]">
        {bookingStatus === 'input' ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">Book an Appointment</DialogTitle>
              <DialogDescription>
                Schedule a consultation with {professional.name}, {professional.specialization} specialist.
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              <div className="mb-6">
                <h4 className="mb-3 font-medium flex items-center">
                  <Calendar size={16} className="mr-2 text-primary" />
                  Select a Date
                </h4>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {professional.availableDates.map((dateObj) => (
                    <button
                      key={dateObj.date}
                      onClick={() => handleDateSelect(dateObj.date)}
                      className={cn(
                        "p-3 text-sm rounded-lg border transition-colors",
                        isDateSelected(dateObj.date)
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      {format(new Date(dateObj.date), 'MMM d')}
                    </button>
                  ))}
                </div>
              </div>
              
              {selectedDate && (
                <div className="mb-6">
                  <h4 className="mb-3 font-medium flex items-center">
                    <Clock size={16} className="mr-2 text-primary" />
                    Select a Time
                  </h4>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {professional.availableDates
                      .find(d => d.date === selectedDate)?.slots
                      .map((slot) => (
                        <button
                          key={slot.time}
                          onClick={() => slot.available && handleTimeSelect(slot.time)}
                          disabled={!slot.available}
                          className={cn(
                            "p-3 text-sm rounded-lg border transition-colors",
                            !slot.available && "opacity-50 cursor-not-allowed bg-muted",
                            isTimeSelected(slot.time) && slot.available
                              ? "border-primary bg-primary/10 text-primary"
                              : slot.available 
                                ? "border-border hover:border-primary/50" 
                                : "border-border"
                          )}
                        >
                          {slot.time}
                        </button>
                      ))
                    }
                  </div>
                </div>
              )}
              
              {selectedTime && (
                <>
                  <div className="mb-6">
                    <h4 className="mb-3 font-medium">Your Experience Level</h4>
                    <RadioGroup
                      value={expertiseLevel}
                      onValueChange={setExpertiseLevel}
                      className="flex flex-col space-y-2"
                    >
                      {expertiseLevels.map((level) => (
                        <div key={level.value} className="flex items-center space-x-2">
                          <RadioGroupItem value={level.value} id={level.value} />
                          <Label htmlFor={level.value}>
                            {level.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="mb-3 font-medium">Tell us what you'd like to discuss</h4>
                    <Textarea
                      placeholder="Briefly describe what topics you'd like to cover in this consultation..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="resize-none"
                      rows={4}
                    />
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="mb-3 font-medium">Payment Method</h4>
                    
                    <div className="mb-3">
                      <Alert className="bg-muted/50">
                        <AlertDescription className="flex justify-between items-center text-sm">
                          <span>Appointment Cost:</span>
                          <span className="font-semibold">{appointmentCost} coins</span>
                        </AlertDescription>
                      </Alert>
                    </div>
                    
                    <RadioGroup
                      value={paymentMethod}
                      onValueChange={setPaymentMethod}
                      className="flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem 
                          value="coins" 
                          id="payment-coins" 
                          disabled={walletBalance < appointmentCost}
                        />
                        <Label 
                          htmlFor="payment-coins" 
                          className={`flex items-center justify-between w-full ${walletBalance < appointmentCost ? 'text-muted-foreground' : ''}`}
                        >
                          <span className="flex items-center">
                            <Coins size={16} className="mr-2 text-primary" />
                            Pay with Coins
                          </span>
                          <span className="text-sm">
                            Balance: {walletBalance} coins
                          </span>
                        </Label>
                      </div>
                      
                      {walletBalance < appointmentCost && (
                        <div className="text-xs text-muted-foreground ml-6 -mt-1 mb-1">
                          <Button 
                            variant="link" 
                            className="h-auto p-0 text-xs" 
                            onClick={() => {
                              handleCloseAndReset();
                              navigate('/wallet');
                            }}
                          >
                            Add more coins to your wallet
                          </Button>
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="card" id="payment-card" />
                        <Label htmlFor="payment-card" className="flex items-center">
                          <Wallet size={16} className="mr-2 text-primary" />
                          Pay with Card
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </>
              )}
            </div>
            
            <DialogFooter>
              <Button
                variant="outline"
                onClick={handleCloseAndReset}
              >
                Cancel
              </Button>
              <Button
                onClick={handleBookAppointment}
                disabled={!selectedDate || !selectedTime}
                className={cn(
                  "flex items-center",
                  (!selectedDate || !selectedTime) && "opacity-50 cursor-not-allowed"
                )}
              >
                <Check size={16} className="mr-2" />
                Book Appointment
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center py-6 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <CheckCircle2 size={32} className="text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">Booking Confirmed!</h3>
              <p className="text-muted-foreground mb-6">
                Your appointment with {professional.name} is scheduled for {selectedDate && format(new Date(selectedDate), 'MMMM d, yyyy')} at {selectedTime}.
              </p>
              
              <div className="bg-card border border-border rounded-lg p-4 w-full mb-6">
                <div className="flex items-start mb-3">
                  <Calendar size={16} className="mt-0.5 mr-3 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">
                      {selectedDate && format(new Date(selectedDate), 'MMMM d, yyyy')}
                    </div>
                    <div className="text-xs text-muted-foreground">Date</div>
                  </div>
                </div>
                
                <div className="flex items-start mb-3">
                  <Clock size={16} className="mt-0.5 mr-3 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">{selectedTime}</div>
                    <div className="text-xs text-muted-foreground">Time</div>
                  </div>
                </div>
                
                <div className="flex items-start mb-3">
                  <Coins size={16} className="mt-0.5 mr-3 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">{appointmentCost} coins</div>
                    <div className="text-xs text-muted-foreground">Cost</div>
                  </div>
                </div>
                
                <div className="text-sm mt-2 pt-2 border-t border-border">
                  <p className="font-medium mb-1">Experience Level: <span className="font-normal">{expertiseLevel}</span></p>
                  <p className="text-xs text-muted-foreground mb-1">Description:</p>
                  <p className="text-sm">{description}</p>
                </div>
              </div>
            </div>
            
            <DialogFooter className="flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                onClick={handleCloseAndReset}
                className="w-full sm:w-auto"
              >
                Close
              </Button>
              <Button
                onClick={handleViewAppointments}
                className="w-full sm:w-auto"
              >
                View My Appointments
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
