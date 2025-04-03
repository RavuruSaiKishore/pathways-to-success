
import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Instagram, Facebook, Twitter, Mail, ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <img 
                src="/lovable-uploads/c75e382f-5bec-47b3-8afa-3c7358e4e8e1.png" 
                alt="GuidEX Logo" 
                className="h-12"
              />
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Guiding your career journey with expert advice, personalized mentorship, and strategic insights for professional success.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h6 className="font-medium mb-6">Quick Links</h6>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/professionals" className="text-muted-foreground hover:text-primary transition-colors">
                  Career Professionals
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-muted-foreground hover:text-primary transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h6 className="font-medium mb-6">Our Services</h6>
            <ul className="space-y-3">
              <li>
                <Link to="/services#career-counseling" className="text-muted-foreground hover:text-primary transition-colors">
                  Career Counseling
                </Link>
              </li>
              <li>
                <Link to="/services#resume-building" className="text-muted-foreground hover:text-primary transition-colors">
                  Resume Building
                </Link>
              </li>
              <li>
                <Link to="/services#interview-preparation" className="text-muted-foreground hover:text-primary transition-colors">
                  Interview Preparation
                </Link>
              </li>
              <li>
                <Link to="/services#career-transitions" className="text-muted-foreground hover:text-primary transition-colors">
                  Career Transitions
                </Link>
              </li>
              <li>
                <Link to="/services#skills-assessment" className="text-muted-foreground hover:text-primary transition-colors">
                  Skills Assessment
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h6 className="font-medium mb-6">Subscribe to Our Newsletter</h6>
            <p className="text-muted-foreground mb-4">
              Stay updated with career tips, industry insights, and exclusive opportunities.
            </p>
            <form className="flex flex-col space-y-3">
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full pl-4 pr-12 py-3 rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none" 
                  required 
                />
                <button 
                  type="submit" 
                  className="absolute right-1 top-1/2 -translate-y-1/2 bg-primary text-white p-2 rounded-md"
                  aria-label="Subscribe"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 sm:mb-0">
            © {currentYear} GuidEX. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
