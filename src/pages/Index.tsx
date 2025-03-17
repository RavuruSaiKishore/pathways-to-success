
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import ProfessionalCard from '@/components/ProfessionalCard';
import BlogCard from '@/components/BlogCard';
import { professionals } from '@/data/professionals';
import { blogs } from '@/data/blogs';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star as StarIcon } from 'lucide-react';

const Index: React.FC = () => {
  const navigate = useNavigate();
  
  const featuredProfessionals = professionals.slice(0, 3);
  const recentBlogs = blogs.slice(0, 3);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        {/* Featured Professionals */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">Meet Our Professionals</h2>
                <p className="text-muted-foreground max-w-2xl">
                  Our team of expert professionals is ready to help you achieve your goals.
                </p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => navigate('/professionals')}
                className="mt-4 md:mt-0"
              >
                View All <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {featuredProfessionals.map((professional) => (
                <ProfessionalCard 
                  key={professional.id} 
                  professional={professional} 
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Recent Blogs */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">Latest Articles</h2>
                <p className="text-muted-foreground max-w-2xl">
                  Stay updated with our latest articles and insights.
                </p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => navigate('/blog')}
                className="mt-4 md:mt-0"
              >
                View All <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              {recentBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
