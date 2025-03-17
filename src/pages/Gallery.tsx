
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Sample gallery data
const galleryImages = [
  {
    id: 1,
    title: "Career Guidance Workshop 2023",
    category: "events",
    image: "/placeholder.svg",
    description: "Students attending our annual career guidance workshop for university graduates."
  },
  {
    id: 2,
    title: "Tech Industry Panel",
    category: "events",
    image: "/placeholder.svg",
    description: "Industry leaders discussing the future of technology careers."
  },
  {
    id: 3,
    title: "Resume Building Session",
    category: "workshops",
    image: "/placeholder.svg",
    description: "Professionals learning how to craft standout resumes."
  },
  {
    id: 4,
    title: "Career Fair 2023",
    category: "events",
    image: "/placeholder.svg",
    description: "Our biggest career fair connecting students with potential employers."
  },
  {
    id: 5,
    title: "Interview Skills Workshop",
    category: "workshops",
    image: "/placeholder.svg",
    description: "Practice session for mastering job interview techniques."
  },
  {
    id: 6,
    title: "Healthcare Careers Seminar",
    category: "seminars",
    image: "/placeholder.svg",
    description: "Exploring opportunities in the healthcare sector."
  },
  {
    id: 7,
    title: "Entrepreneurship Talk",
    category: "seminars",
    image: "/placeholder.svg",
    description: "Successful entrepreneurs sharing their journey and insights."
  },
  {
    id: 8,
    title: "Networking Mixer",
    category: "events",
    image: "/placeholder.svg",
    description: "Professionals connecting and building valuable relationships."
  },
  {
    id: 9,
    title: "Career Change Workshop",
    category: "workshops",
    image: "/placeholder.svg",
    description: "Guidance for professionals looking to transition to new fields."
  },
  {
    id: 10,
    title: "Student Mentorship Program",
    category: "success-stories",
    image: "/placeholder.svg",
    description: "Our mentorship program participants during a group session."
  },
  {
    id: 11,
    title: "Graduate Job Placement Success",
    category: "success-stories",
    image: "/placeholder.svg",
    description: "Recent graduates who found their dream jobs through our program."
  },
  {
    id: 12,
    title: "Leadership Development Program",
    category: "workshops",
    image: "/placeholder.svg",
    description: "Building the next generation of industry leaders."
  },
];

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);
  
  const categories = [
    { id: "all", label: "All" },
    { id: "events", label: "Events" },
    { id: "workshops", label: "Workshops" },
    { id: "seminars", label: "Seminars" },
    { id: "success-stories", label: "Success Stories" }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Gallery</h1>
          <p className="text-foreground/80 mb-8">
            Explore our career events, workshops, and success stories through our visual gallery.
          </p>
          
          <Tabs defaultValue="all" className="mb-12">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
              {categories.map(category => (
                <TabsTrigger key={category.id} value={category.id}>{category.label}</TabsTrigger>
              ))}
            </TabsList>
            
            {categories.map(category => (
              <TabsContent key={category.id} value={category.id}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {galleryImages
                    .filter(img => category.id === 'all' || img.category === category.id)
                    .map(image => (
                      <div 
                        key={image.id}
                        className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => setSelectedImage(image)}
                      >
                        <div className="relative aspect-[4/3]">
                          <img 
                            src={image.image} 
                            alt={image.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium truncate">{image.title}</h3>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {image.description}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
          
          <Separator className="my-8" />
          
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Share Your Career Journey</h2>
            <p className="text-foreground/80 max-w-2xl mx-auto mb-6">
              Have you participated in our events or benefited from our services? Share your photos and stories with us to inspire others on their career path.
            </p>
            <div className="flex justify-center space-x-4">
              <a href="#" className="btn-primary">
                Submit Your Story
              </a>
              <a href="#" className="btn-secondary">
                Upload Photos
              </a>
            </div>
          </div>
        </div>
      </main>
      
      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="bg-card rounded-lg overflow-hidden max-w-3xl w-full max-h-[90vh] flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative h-[50vh]">
              <img 
                src={selectedImage.image} 
                alt={selectedImage.title} 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{selectedImage.title}</h3>
              <p className="text-foreground/80">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Gallery;
