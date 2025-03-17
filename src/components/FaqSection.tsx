
import React, { useState } from 'react';
import { FAQ } from '@/data/faqs';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FaqItemProps {
  faq: FAQ;
  isOpen: boolean;
  toggleOpen: () => void;
}

const FaqItem: React.FC<FaqItemProps> = ({ faq, isOpen, toggleOpen }) => {
  return (
    <div className="border-b border-border last:border-0">
      <button
        className="flex items-center justify-between w-full py-5 text-left focus:outline-none"
        onClick={toggleOpen}
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-medium">{faq.question}</h3>
        <span className="ml-4 flex-shrink-0">
          {isOpen ? (
            <ChevronUp size={20} className="text-primary" />
          ) : (
            <ChevronDown size={20} className="text-muted-foreground" />
          )}
        </span>
      </button>
      
      <div 
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-96 opacity-100 pb-5" : "max-h-0 opacity-0"
        )}
      >
        <p className="text-muted-foreground text-pretty">
          {faq.answer}
        </p>
      </div>
    </div>
  );
};

interface FaqSectionProps {
  faqs: FAQ[];
  className?: string;
}

const FaqSection: React.FC<FaqSectionProps> = ({ faqs, className }) => {
  const [openIndex, setOpenIndex] = useState<number>(0);
  
  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };
  
  return (
    <div className={cn("w-full", className)}>
      {faqs.map((faq, index) => (
        <FaqItem 
          key={faq.id}
          faq={faq}
          isOpen={openIndex === index}
          toggleOpen={() => toggleFaq(index)}
        />
      ))}
    </div>
  );
};

export default FaqSection;
