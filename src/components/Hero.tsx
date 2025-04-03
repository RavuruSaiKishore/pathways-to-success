
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden hero-clip bg-gradient-to-br from-primary/5 via-primary/10 to-transparent">
      <div 
        className="absolute inset-0 z-0 opacity-70"
        style={{
          backgroundImage: 'url(/placeholder.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(8px)',
          opacity: 0.1
        }}
      ></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="order-2 lg:order-1">
            <span className="inline-block py-1 px-3 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6 animate-fade-in opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              Career Guidance Platform
            </span>
            <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl leading-tight text-foreground mb-6 text-balance">
              <span className="inline-block animate-fade-in opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
                Chart Your Course to
              </span>
              <br />
              <span className="text-primary relative inline-block animate-fade-in opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
                Career Success
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-primary/30 rounded-full"></span>
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg text-pretty animate-fade-in opacity-0" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
              Personalized guidance, expert mentorship, and strategic insights to help you navigate your professional journey with confidence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in opacity-0" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
              <Link to="/professionals" className="btn-primary px-8 py-3 rounded-full text-base gap-2 hover-scale">
                Find a Professional
                <ArrowRight size={18} />
              </Link>
              <Link to="/services" className="btn-outline px-8 py-3 rounded-full text-base hover-scale">
                Explore Services
              </Link>
            </div>
            
            <div className="mt-12 flex items-center gap-6 animate-fade-in opacity-0" style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}>
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-white overflow-hidden"
                    style={{ backgroundImage: `url(/placeholder.svg)`, backgroundSize: 'cover' }}
                  ></div>
                ))}
              </div>
              <div className="text-sm">
                <p className="font-medium">Trusted by 2,000+ professionals</p>
                <div className="flex items-center mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg 
                      key={star}
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="currentColor" 
                      className="w-4 h-4 text-yellow-500"
                    >
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                  ))}
                  <span className="ml-1 text-muted-foreground">4.9/5</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative w-full max-w-md h-[500px] glass-card rounded-2xl overflow-hidden shadow-xl animate-fade-in opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
              <img 
                src="/placeholder.svg" 
                alt="Career professionals guiding students" 
                className="w-full h-full object-cover" 
              />
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <span className="text-white/80 text-sm">Featured Professional</span>
                <h3 className="text-white text-xl font-medium mt-1">Dr. Sarah Johnson</h3>
                <p className="text-white/80 text-sm mt-1">Technology & Engineering Specialist</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 inset-x-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#ffffff" fillOpacity="1" d="M0,256L48,240C96,224,192,192,288,192C384,192,480,224,576,229.3C672,235,768,213,864,213.3C960,213,1056,235,1152,229.3C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
