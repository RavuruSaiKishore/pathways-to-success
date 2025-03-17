
import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Contact: React.FC = () => {
  const { toast } = useToast();
  const mapRef = useRef<HTMLDivElement>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationLoading, setLocationLoading] = useState(true);
  const [locationError, setLocationError] = useState<string | null>(null);
  
  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLocationLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocationError("Unable to get your location. Using default location.");
          // Default to New York coordinates
          setUserLocation({ lat: 40.7128, lng: -74.0060 });
          setLocationLoading(false);
        }
      );
    } else {
      setLocationError("Geolocation is not supported by your browser. Using default location.");
      // Default to New York coordinates
      setUserLocation({ lat: 40.7128, lng: -74.0060 });
      setLocationLoading(false);
    }
  }, []);
  
  useEffect(() => {
    // Initialize map once we have the user's location
    if (userLocation && mapRef.current) {
      const mapUrl = `https://maps.google.com/maps?q=${userLocation.lat},${userLocation.lng}&z=15&output=embed`;
      const iframe = document.createElement('iframe');
      iframe.src = mapUrl;
      iframe.className = "w-full h-full border-0";
      iframe.loading = "lazy";
      iframe.referrerPolicy = "no-referrer-when-downgrade";
      iframe.allowFullscreen = true;
      
      // Clear existing content and append iframe
      mapRef.current.innerHTML = '';
      mapRef.current.appendChild(iframe);
    }
  }, [userLocation]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would send the form data to a server
    toast({
      title: "Message Sent",
      description: "Thank you for contacting us. We'll get back to you soon!",
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
            <p className="text-foreground/80 max-w-2xl mx-auto">
              Have questions about our career guidance services? We're here to help. Reach out to us using any of the methods below.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div>
              <h2 className="text-xl font-semibold mb-6">Get in Touch</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                    <Input id="name" placeholder="Your name" required />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                    <Input id="email" type="email" placeholder="Your email" required />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
                  <Input id="subject" placeholder="How can we help you?" required />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us more about your inquiry..." 
                    className="min-h-32"
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full">
                  <Send size={16} className="mr-2" />
                  Send Message
                </Button>
              </form>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-6">Contact Information</h2>
              
              <div className="bg-card rounded-lg border border-border p-6 mb-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-primary shrink-0 mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium text-sm">Our Location</h3>
                      <p className="text-foreground/80 text-sm">
                        123 Career Street, Suite 789<br />
                        New York, NY 10001
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-primary shrink-0 mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium text-sm">Phone</h3>
                      <p className="text-foreground/80 text-sm">
                        <a href="tel:+1234567890" className="hover:underline">+1 (234) 567-890</a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-primary shrink-0 mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium text-sm">Email</h3>
                      <p className="text-foreground/80 text-sm">
                        <a href="mailto:info@cglines.com" className="hover:underline">info@cglines.com</a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-primary shrink-0 mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium text-sm">Working Hours</h3>
                      <p className="text-foreground/80 text-sm">
                        Monday - Friday: 9:00 AM - 6:00 PM<br />
                        Saturday: 10:00 AM - 4:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-card rounded-lg border border-border overflow-hidden h-64">
                {locationLoading ? (
                  <div className="w-full h-full bg-secondary/20 flex items-center justify-center">
                    <p className="text-center text-muted-foreground">Loading map...</p>
                  </div>
                ) : locationError ? (
                  <div ref={mapRef} className="w-full h-full">
                    {/* Map will be loaded here via useEffect */}
                    <p className="text-center text-muted-foreground p-4">{locationError}</p>
                  </div>
                ) : (
                  <div ref={mapRef} className="w-full h-full">
                    {/* Map will be loaded here via useEffect */}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-lg border border-border p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
              <p className="text-foreground/80">
                Find quick answers to common questions about our services.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  question: "How do I book an appointment with a career professional?",
                  answer: "You can book an appointment through our website by visiting the Professionals page, selecting your preferred career expert, and choosing an available time slot."
                },
                {
                  question: "What is the cancellation policy for appointments?",
                  answer: "We understand that plans change. You can cancel or reschedule your appointment up to 24 hours before the scheduled time without any penalty."
                },
                {
                  question: "Do you offer virtual consultations?",
                  answer: "Yes, we offer both in-person and virtual consultations to accommodate different preferences and needs."
                },
                {
                  question: "How much do your services cost?",
                  answer: "Our service costs vary depending on the type of guidance you need. We offer packages starting from $99 for basic career counseling to $499 for comprehensive career development plans."
                }
              ].map((faq, index) => (
                <div key={index} className="p-4 rounded-md bg-background border border-border">
                  <h3 className="font-medium mb-2">{faq.question}</h3>
                  <p className="text-foreground/80 text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
