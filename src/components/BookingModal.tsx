
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Professional } from '@/data/professionals';
import { format } from 'date-fns';
import { Check, Calendar, Clock, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { v4 as uuidv4 } from 'uuid';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

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
  const navigate = useNavigate();
  const { toast } = useToast();
  
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
    
    // In a real application, this would send the booking data to a backend
    try {
      // Create the appointment object
      const appointment = {
        id: uuidv4(),
        professionalId: professional.id,
        date: selectedDate,
        time: selectedTime,
        description,
        expertiseLevel,
        status: 'confirmed',
        createdAt: new Date().toISOString()
      };
      
      // Save to localStorage (simulating a backend)
      const existingAppointments = JSON.parse(localStorage.getItem('userAppointments') || '[]');
      const updatedAppointments = [...existingAppointments, appointment];
      localStorage.setItem('userAppointments', JSON.stringify(updatedAppointments));
      
      // Show success state
      setBookingStatus('success');
      
      // Display toast notification
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
                </>
              )}
            </div>
            
            <DialogFooter>
              <button
                onClick={handleCloseAndReset}
                className="px-4 py-2 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleBookAppointment}
                disabled={!selectedDate || !selectedTime}
                className={cn(
                  "px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center",
                  (!selectedDate || !selectedTime) && "opacity-50 cursor-not-allowed"
                )}
              >
                <Check size={16} className="mr-2" />
                Book Appointment
              </button>
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
                
                <div className="text-sm mt-2 pt-2 border-t border-border">
                  <p className="font-medium mb-1">Experience Level: <span className="font-normal">{expertiseLevel}</span></p>
                  <p className="text-xs text-muted-foreground mb-1">Description:</p>
                  <p className="text-sm">{description}</p>
                </div>
              </div>
            </div>
            
            <DialogFooter className="flex-col sm:flex-row gap-3">
              <button
                onClick={handleCloseAndReset}
                className="w-full sm:w-auto px-4 py-2 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Close
              </button>
              <button
                onClick={handleViewAppointments}
                className="w-full sm:w-auto px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                View My Appointments
              </button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
