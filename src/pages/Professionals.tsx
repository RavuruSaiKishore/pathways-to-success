
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Filter } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProfessionalCard from '@/components/ProfessionalCard';
import { professionals } from '@/data/professionals';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';

// Extract unique specializations from professionals data
const specializations = Array.from(
  new Set(professionals.map(prof => prof.specialization))
);

const Professionals: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecializations, setSelectedSpecializations] = useState<string[]>([]);
  
  // Filter professionals based on search query and selected specializations
  const filteredProfessionals = professionals.filter(professional => {
    const matchesSearch = 
      professional.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      professional.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      professional.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSpecialization = 
      selectedSpecializations.length === 0 || 
      selectedSpecializations.includes(professional.specialization);
    
    return matchesSearch && matchesSpecialization;
  });
  
  const handleSpecializationChange = (specialization: string) => {
    setSelectedSpecializations(prev => 
      prev.includes(specialization)
        ? prev.filter(s => s !== specialization)
        : [...prev, specialization]
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-2">Our Career Professionals</h1>
            <p className="text-foreground/80 max-w-2xl mx-auto">
              Connect with our experienced career experts who can guide you through every step of your professional journey.
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8 mb-12">
            {/* Filters Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-card rounded-lg border border-border p-6 sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold">Filters</h2>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setSelectedSpecializations([])}
                    className="text-xs h-8"
                  >
                    Clear All
                  </Button>
                </div>
                
                <Separator className="my-4" />
                
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-3">Specialization</h3>
                  <div className="space-y-2">
                    {specializations.map(specialization => (
                      <div key={specialization} className="flex items-center">
                        <Checkbox 
                          id={`specialization-${specialization}`}
                          checked={selectedSpecializations.includes(specialization)}
                          onCheckedChange={() => handleSpecializationChange(specialization)}
                        />
                        <label 
                          htmlFor={`specialization-${specialization}`}
                          className="ml-2 text-sm cursor-pointer"
                        >
                          {specialization}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <Button className="w-full">Apply Filters</Button>
              </div>
            </div>
            
            {/* Professionals List */}
            <div className="lg:w-3/4">
              <div className="mb-6 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input
                    placeholder="Search by name, title, or specialization..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" className="sm:w-auto">
                  <MapPin size={18} className="mr-2" />
                  Near Me
                </Button>
                <Button variant="outline" className="sm:w-auto lg:hidden">
                  <Filter size={18} className="mr-2" />
                  Filters
                </Button>
              </div>
              
              {filteredProfessionals.length === 0 ? (
                <div className="text-center py-12 bg-card rounded-lg border border-border">
                  <h3 className="text-xl font-medium mb-2">No Professionals Found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search criteria to find career professionals
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedSpecializations([]);
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProfessionals.map(professional => (
                    <Link to={`/professionals/${professional.id}`} key={professional.id}>
                      <ProfessionalCard professional={professional} />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Professionals;
