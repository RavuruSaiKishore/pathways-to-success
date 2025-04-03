
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ThemeToggle';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => setIsOpen(!isOpen);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    // Close mobile menu when route changes
    setIsOpen(false);
    
    // Check if user is logged in
    const userInfo = localStorage.getItem('userInfo');
    setIsLoggedIn(!!userInfo);
  }, [location]);
  
  const navLinks = [
    { name: 'Home', path: '/home' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Professionals', path: '/professionals' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full',
        scrolled 
          ? 'bg-background/80 backdrop-blur-md shadow-sm py-3' 
          : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link 
            to="/home" 
            className="flex items-center"
          >
            <img 
              src="/lovable-uploads/c75e382f-5bec-47b3-8afa-3c7358e4e8e1.png" 
              alt="GuidEX Logo" 
              className="h-10"
            />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "navbar-item",
                  isActive(link.path) ? "active" : ""
                )}
              >
                {link.name}
              </Link>
            ))}
            <ThemeToggle />
            {isLoggedIn ? (
              <Link
                to="/profile"
                className="btn-primary ml-4 flex items-center gap-2"
              >
                <User size={18} />
                Profile
              </Link>
            ) : (
              <Link
                to="/login"
                className="btn-primary ml-4"
              >
                Login
              </Link>
            )}
          </nav>
          
          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className="flex items-center"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      <div 
        className={cn(
          "fixed inset-0 bg-background z-40 pt-20 transition-transform duration-300 ease-in-out transform md:hidden overflow-y-auto",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="container mx-auto px-4 flex flex-col space-y-4 mt-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                "text-lg py-3 border-b border-border font-medium",
                isActive(link.path) ? "text-primary" : "text-foreground"
              )}
            >
              {link.name}
            </Link>
          ))}
          {isLoggedIn ? (
            <Link
              to="/profile"
              className="btn-primary self-start mt-4 flex items-center gap-2"
            >
              <User size={18} />
              Profile
            </Link>
          ) : (
            <Link
              to="/login"
              className="btn-primary self-start mt-4"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
