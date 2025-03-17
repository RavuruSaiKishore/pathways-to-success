
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Users, BookOpen, Calendar, ArrowUpRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import ProfessionalCard from '@/components/ProfessionalCard';
import TestimonialCard from '@/components/TestimonialCard';
import FaqSection from '@/components/FaqSection';
import BlogCard from '@/components/BlogCard';
import { professionals } from '@/data/professionals';
import { testimonials } from '@/data/testimonials';
import { faqs } from '@/data/faqs';
import { blogPosts } from '@/data/blogs';
import BookingModal from '@/components/BookingModal';

const Index = () => {
  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openBookingModal = (professionalId) => {
    const professional = professionals.find(p => p.id === professionalId);
    setSelectedProfessional(professional);
    setIsModalOpen(true);
  };
  
  const closeBookingModal = () => {
    setIsModalOpen(false);
  };
  
  const featuredProfessionals = professionals.slice(0, 4);
  const featuredTestimonials = testimonials.slice(0, 3);
  const featuredFaqs = faqs.slice(0, 6);
  const featuredBlogPosts = blogPosts.slice(0, 3);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />
        
        {/* Stats Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="p-6 rounded-xl bg-secondary/50">
                <div className="flex justify-center mb-4">
                  <Users size={32} className="text-primary" />
                </div>
                <h3 className="text-3xl font-bold mb-2">2,000+</h3>
                <p className="text-muted-foreground">Professionals Guided</p>
              </div>
              
              <div className="p-6 rounded-xl bg-secondary/50">
                <div className="flex justify-center mb-4">
                  <Star size={32} className="text-primary" />
                </div>
                <h3 className="text-3xl font-bold mb-2">98%</h3>
                <p className="text-muted-foreground">Success Rate</p>
              </div>
              
              <div className="p-6 rounded-xl bg-secondary/50">
                <div className="flex justify-center mb-4">
                  <BookOpen size={32} className="text-primary" />
                </div>
                <h3 className="text-3xl font-bold mb-2">50+</h3>
                <p className="text-muted-foreground">Career Domains</p>
              </div>
              
              <div className="p-6 rounded-xl bg-secondary/50">
                <div className="flex justify-center mb-4">
                  <Calendar size={32} className="text-primary" />
                </div>
                <h3 className="text-3xl font-bold mb-2">10,000+</h3>
                <p className="text-muted-foreground">Consultations</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Career Professionals Section */}
        <section className="py-20 bg-gradient-to-b from-white to-secondary/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold mb-4">Meet Our Career Professionals</h2>
              <p className="text-muted-foreground text-lg text-pretty">
                Expert guidance from industry leaders with proven track records in helping professionals achieve their career goals.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProfessionals.map((professional) => (
                <ProfessionalCard 
                  key={professional.id} 
                  professional={professional} 
                />
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Link 
                to="/professionals" 
                className="btn-outline px-8 py-3 rounded-full text-base inline-flex items-center gap-2"
              >
                View All Professionals
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
        
        {/* Services Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="inline-block py-1 px-3 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
                  Our Services
                </span>
                <h2 className="text-4xl font-bold mb-6">Comprehensive Career Solutions</h2>
                <p className="text-muted-foreground text-lg mb-8">
                  We offer a range of specialized services designed to help you navigate every stage of your career journey.
                </p>
                
                <div className="space-y-6">
                  {[
                    {
                      icon: <Users size={20} />,
                      title: "Career Counseling",
                      description: "Personalized guidance to help you explore career options aligned with your skills and interests."
                    },
                    {
                      icon: <BookOpen size={20} />,
                      title: "Resume Building",
                      description: "Expert assistance in crafting compelling resumes that highlight your unique value proposition."
                    },
                    {
                      icon: <Calendar size={20} />,
                      title: "Interview Preparation",
                      description: "Comprehensive coaching to help you excel in interviews and secure your desired position."
                    }
                  ].map((service, index) => (
                    <div key={index} className="flex">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4">
                        {service.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-medium mb-2">{service.title}</h3>
                        <p className="text-muted-foreground">{service.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-10">
                  <Link 
                    to="/services" 
                    className="btn-primary px-8 py-3 rounded-full text-base inline-flex items-center gap-2"
                  >
                    Explore All Services
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
              
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-xl animate-fade-in">
                  <img 
                    src="/placeholder.svg" 
                    alt="Career Services" 
                    className="w-full h-auto" 
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <button 
                      onClick={() => openBookingModal(professionals[0].id)}
                      className="btn-primary px-6 py-3 rounded-full text-base w-full flex items-center justify-center gap-2"
                    >
                      Book a Consultation
                      <ArrowUpRight size={18} />
                    </button>
                  </div>
                </div>
                
                <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-primary/10 rounded-full z-[-1]"></div>
                <div className="absolute -top-8 -left-8 w-24 h-24 bg-primary/10 rounded-full z-[-1]"></div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold mb-4">What Our Clients Say</h2>
              <p className="text-muted-foreground text-lg text-pretty">
                Hear from professionals who have transformed their careers with our guidance and expertise.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredTestimonials.map((testimonial) => (
                <TestimonialCard 
                  key={testimonial.id} 
                  testimonial={testimonial} 
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <span className="inline-block py-1 px-3 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
                  FAQs
                </span>
                <h2 className="text-4xl font-bold mb-6">Frequently Asked Questions</h2>
                <p className="text-muted-foreground text-lg mb-8">
                  Find answers to common questions about our career guidance services and how we can help you achieve your professional goals.
                </p>
                
                <img 
                  src="/placeholder.svg" 
                  alt="Career Guidance" 
                  className="rounded-xl shadow-lg" 
                />
              </div>
              
              <div>
                <FaqSection faqs={featuredFaqs} />
                
                <div className="mt-10">
                  <Link 
                    to="/about#faqs" 
                    className="inline-flex items-center text-primary font-medium gap-1 hover:gap-2 transition-all"
                  >
                    View all FAQs <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Blog Section */}
        <section className="py-20 bg-gradient-to-b from-white to-secondary/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold mb-4">Latest Career Insights</h2>
              <p className="text-muted-foreground text-lg text-pretty">
                Stay updated with the latest trends, tips, and strategies to navigate the evolving professional landscape.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredBlogPosts.map((post) => (
                <BlogCard 
                  key={post.id} 
                  post={post} 
                />
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Link 
                to="/blog" 
                className="btn-outline px-8 py-3 rounded-full text-base inline-flex items-center gap-2"
              >
                View All Articles
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold mb-6">Ready to Accelerate Your Career?</h2>
              <p className="text-white/80 text-lg mb-8">
                Take the first step towards a more fulfilling professional journey with expert guidance tailored to your aspirations.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/professionals" 
                  className="px-8 py-3 rounded-full text-base bg-white text-primary hover:bg-white/90 transition-colors inline-flex items-center justify-center gap-2"
                >
                  Find a Professional
                  <ArrowRight size={18} />
                </Link>
                
                <button 
                  onClick={() => openBookingModal(professionals[0].id)}
                  className="px-8 py-3 rounded-full text-base bg-transparent border border-white hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2"
                >
                  Book a Consultation
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      
      {selectedProfessional && (
        <BookingModal
          professional={selectedProfessional}
          isOpen={isModalOpen}
          onClose={closeBookingModal}
        />
      )}
    </div>
  );
};

export default Index;
