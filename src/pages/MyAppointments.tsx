
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { professionals } from '@/data/professionals';
import { Link } from 'react-router-dom';

interface Appointment {
  id: string;
  professionalId: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
}

const MyAppointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, this would fetch from an API
    // For now, we'll use localStorage to simulate
    const loadAppointments = () => {
      setIsLoading(true);
      try {
        const savedAppointments = localStorage.getItem('userAppointments');
        if (savedAppointments) {
          setAppointments(JSON.parse(savedAppointments));
        }
      } catch (error) {
        console.error('Error loading appointments:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadAppointments();
  }, []);
  
  const getProfessionalById = (id: string) => {
    return professionals.find(p => p.id === id) || null;
  };
  
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">My Appointments</h1>
          <p className="text-muted-foreground mb-8">
            View and manage your scheduled appointments with career professionals.
          </p>
          
          {isLoading ? (
            <div className="flex justify-center my-12">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
            </div>
          ) : appointments.length === 0 ? (
            <div className="text-center py-12 bg-card rounded-lg border border-border">
              <Calendar size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">No Appointments Yet</h3>
              <p className="text-muted-foreground mb-6">
                You haven't scheduled any appointments with our professionals.
              </p>
              <Link to="/professionals" className="btn-primary">
                Find Career Professionals
              </Link>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {appointments.map((appointment) => {
                const professional = getProfessionalById(appointment.professionalId);
                if (!professional) return null;
                
                return (
                  <div 
                    key={appointment.id}
                    className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="p-4 border-b border-border flex items-center space-x-3">
                      <img 
                        src={professional.image} 
                        alt={professional.name}
                        className="w-10 h-10 rounded-full object-cover" 
                      />
                      <div>
                        <h3 className="font-medium">{professional.name}</h3>
                        <p className="text-xs text-muted-foreground">{professional.specialization}</p>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-start mb-3">
                        <Calendar size={16} className="mt-0.5 mr-2 text-muted-foreground" />
                        <div>
                          <div className="text-sm font-medium">
                            {format(new Date(appointment.date), 'MMMM d, yyyy')}
                          </div>
                          <div className="text-xs text-muted-foreground">Date</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start mb-4">
                        <Clock size={16} className="mt-0.5 mr-2 text-muted-foreground" />
                        <div>
                          <div className="text-sm font-medium">{appointment.time}</div>
                          <div className="text-xs text-muted-foreground">Time</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className={`text-xs px-2.5 py-0.5 rounded-full ${getStatusBadgeClass(appointment.status)}`}>
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </span>
                        
                        <Link 
                          to={`/professionals/${professional.id}`}
                          className="text-primary text-sm font-medium inline-flex items-center hover:underline"
                        >
                          View Professional <ArrowRight size={14} className="ml-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MyAppointments;
