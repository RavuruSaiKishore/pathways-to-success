
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4">About CG Lines</h1>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h2 className="text-xl font-semibold mb-3">Our Mission</h2>
              <p className="text-foreground/80 mb-6 leading-relaxed">
                At CG Lines, our mission is to bridge the gap between ambition and achievement by providing personalized career guidance to individuals at all stages of their professional journey. We believe that everyone deserves access to quality career advice that can transform their aspirations into tangible success.
              </p>
              
              <h2 className="text-xl font-semibold mb-3">Our Vision</h2>
              <p className="text-foreground/80 leading-relaxed">
                We envision a world where career decisions are made with confidence, clarity, and purpose. Through our platform, we aim to democratize career counseling and create a community where knowledge flows freely between professionals and those seeking guidance.
              </p>
            </div>
            
            <div className="bg-card rounded-lg overflow-hidden">
              <img 
                src="/placeholder.svg" 
                alt="CG Lines Team" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="font-semibold mb-2">Our Approach</h3>
                <p className="text-foreground/80 text-sm">
                  We combine technology with human expertise to deliver personalized career guidance that respects individual differences while providing actionable insights based on industry trends and requirements.
                </p>
              </div>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold mb-6">Our Core Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                title: "Authenticity",
                description: "We believe in providing honest, transparent advice tailored to each individual's unique situation.",
              },
              {
                title: "Excellence",
                description: "We strive for excellence in all our services, constantly updating our knowledge and improving our platform.",
              },
              {
                title: "Inclusivity",
                description: "We are committed to making career guidance accessible to people from all backgrounds and walks of life.",
              },
              {
                title: "Innovation",
                description: "We embrace innovative approaches to career development, leveraging technology to enhance the guidance experience.",
              }
            ].map((value, index) => (
              <div key={index} className="bg-card rounded-lg p-6 border border-border hover:shadow-md transition-shadow">
                <h3 className="font-semibold mb-3 text-primary">{value.title}</h3>
                <p className="text-foreground/80 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
          
          <h2 className="text-2xl font-bold mb-6">Our Team</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Jane Cooper",
                role: "Founder & CEO",
                bio: "With over 15 years in career counseling, Jane founded CG Lines to make quality career guidance accessible to everyone.",
                image: "/placeholder.svg"
              },
              {
                name: "Robert Johnson",
                role: "Head of Career Professionals",
                bio: "Robert brings 12 years of experience in talent acquisition and professional development to our team of career experts.",
                image: "/placeholder.svg"
              },
              {
                name: "Amanda Lee",
                role: "Chief Technology Officer",
                bio: "Amanda leads our technology initiatives, ensuring our platform delivers a seamless experience for all users.",
                image: "/placeholder.svg"
              }
            ].map((member, index) => (
              <div key={index} className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-md transition-shadow">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-primary text-sm mb-2">{member.role}</p>
                  <p className="text-foreground/80 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
