
import React from 'react';
import { Testimonial } from '@/data/testimonials';
import { cn } from '@/lib/utils';
import { Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  testimonial,
  className
}) => {
  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1",
        className
      )}
    >
      <CardContent className="p-6">
        <div className="flex items-start mb-4">
          <Quote size={24} className="text-primary/30 mt-1 flex-shrink-0" />
        </div>
        
        <p className="text-foreground/80 text-pretty mb-6 min-h-[120px] text-balance">
          "{testimonial.testimonial}"
        </p>
        
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-primary/20">
            <img 
              src={testimonial.image} 
              alt={testimonial.name} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div>
            <h4 className="font-medium text-foreground">{testimonial.name}</h4>
            <p className="text-sm text-muted-foreground">
              {testimonial.position}, {testimonial.company}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
