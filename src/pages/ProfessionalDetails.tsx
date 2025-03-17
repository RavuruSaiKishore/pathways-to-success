
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Mail, Phone, Star, Linkedin, Twitter } from 'lucide-react';
import { professionals } from '@/data/professionals';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';

const ProfessionalDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  
  const professional = professionals.find(p => p.id === id);
  
  if (!professional) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Professional Not Found</h1>
            <p className="mb-6">The professional you're looking for doesn't exist.</p>
            <Link to="/professionals" className="text-primary hover:underline">
              View All Professionals
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20 pb-16">
        <div className="container mx-auto px-4">
          <Link to="/professionals" className="inline-flex items-center text-primary hover:underline mb-6">
            <ArrowLeft size={16} className="mr-1" /> Back to All Professionals
          </Link>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Professional Info Column */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-xl overflow-hidden border border-border shadow-md">
                {/* Header with Image */}
                <div className="relative h-64 w-full">
                  <img 
                    src={professional.image} 
                    alt={professional.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex justify-between items-end">
                      <div>
                        <h1 className="text-3xl font-bold mb-1">{professional.name}</h1>
                        <p className="text-white/80">{professional.title}</p>
                      </div>
                      
                      <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                        <Star size={16} className="text-yellow-400 fill-yellow-400" />
                        <span className="ml-1 font-medium">{professional.rating}</span>
                        <span className="mx-1">•</span>
                        <span className="text-sm">{professional.reviewCount} reviews</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <div className="flex flex-wrap gap-3 mb-6">
                    <span className="px-3 py-1 rounded-full bg-primary/90 text-white text-xs font-medium">
                      {professional.specialization}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-secondary/40 text-xs font-medium dark:bg-secondary/20">
                      {professional.experience} Experience
                    </span>
                  </div>
                  
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-3">About</h2>
                    <p className="text-foreground/80 leading-relaxed">{professional.fullBio}</p>
                  </div>
                  
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-3">Qualifications</h2>
                    <ul className="list-disc pl-5 space-y-1 text-foreground/80">
                      {professional.qualifications.map((qualification, index) => (
                        <li key={index}>{qualification}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Sidebar Column */}
            <div>
              <Card className="sticky top-24 shadow-md mb-6">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Book a Consultation</h3>
                  
                  <Button 
                    onClick={() => setIsBookingModalOpen(true)}
                    className="w-full mb-4"
                  >
                    <Calendar size={16} className="mr-2" />
                    Schedule Appointment
                  </Button>
                  
                  <Separator className="my-6" />
                  
                  <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <Mail size={16} className="mr-3 text-muted-foreground" />
                      <a 
                        href={`mailto:${professional.contact.email}`}
                        className="text-primary hover:underline"
                      >
                        {professional.contact.email}
                      </a>
                    </div>
                    
                    <div className="flex items-center text-sm">
                      <Phone size={16} className="mr-3 text-muted-foreground" />
                      <a 
                        href={`tel:${professional.contact.phone}`}
                        className="hover:underline"
                      >
                        {professional.contact.phone}
                      </a>
                    </div>
                    
                    <div className="flex items-center mt-2 pt-2 border-t border-border">
                      {professional.contact.social.linkedin && (
                        <a 
                          href={professional.contact.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-accent hover:bg-accent/80 mr-2 transition-colors"
                          aria-label="LinkedIn"
                        >
                          <Linkedin size={16} />
                        </a>
                      )}
                      
                      {professional.contact.social.twitter && (
                        <a 
                          href={professional.contact.social.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-accent hover:bg-accent/80 transition-colors"
                          aria-label="Twitter"
                        >
                          <Twitter size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <BookingModal 
        professional={professional} 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)}
      />
      
      <Footer />
    </div>
  );
};

export default ProfessionalDetails;
