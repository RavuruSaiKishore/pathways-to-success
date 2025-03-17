
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { Professional } from '@/data/professionals';
import { cn } from '@/lib/utils';

interface ProfessionalCardProps {
  professional: Professional;
  variant?: 'default' | 'compact';
  className?: string;
}

const ProfessionalCard: React.FC<ProfessionalCardProps> = ({ 
  professional, 
  variant = 'default',
  className
}) => {
  const isCompact = variant === 'compact';
  
  return (
    <div 
      className={cn(
        "bg-card rounded-xl overflow-hidden border border-border transition-all duration-300 hover-scale group",
        className
      )}
    >
      <div className="relative">
        <img 
          src={professional.image} 
          alt={professional.name} 
          className={cn(
            "w-full object-cover transition-transform duration-500 group-hover:scale-105",
            isCompact ? "h-48" : "h-64"
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <span className="px-3 py-1 rounded-full bg-primary/90 text-white text-xs font-medium">
            {professional.specialization}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display font-medium text-xl">{professional.name}</h3>
          
          <div className="flex items-center">
            <Star size={16} className="text-yellow-500 fill-yellow-500" />
            <span className="ml-1 text-sm font-medium">{professional.rating}</span>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4">{professional.title}</p>
        
        {!isCompact && (
          <p className="text-sm text-foreground/80 mb-6">{professional.bio}</p>
        )}
        
        <div className="flex items-center justify-between mt-4">
          <Link 
            to={`/professionals/${professional.id}`}
            className="text-primary text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all"
          >
            View Profile <ArrowRight size={16} />
          </Link>
          
          <span className="text-sm text-muted-foreground">
            {professional.reviewCount} reviews
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalCard;
