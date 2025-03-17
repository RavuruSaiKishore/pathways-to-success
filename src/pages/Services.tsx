
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Services: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Our Services</h1>
            <p className="text-foreground/80 max-w-3xl mx-auto">
              At CG Lines, we offer a comprehensive range of career guidance services designed to help you navigate your professional journey with confidence.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              {
                title: "Career Counseling",
                description: "One-on-one sessions with experienced professionals to help you discover your strengths and interests.",
                features: [
                  "Personalized guidance",
                  "Interest assessment",
                  "Skill gap analysis",
                  "Goal setting assistance"
                ],
                popular: true
              },
              {
                title: "Resume Building",
                description: "Expert assistance in creating resumes that stand out and showcase your skills effectively.",
                features: [
                  "Professional templates",
                  "Content optimization",
                  "Keyword optimization",
                  "ATS compatibility check"
                ],
                popular: false
              },
              {
                title: "Interview Preparation",
                description: "Comprehensive preparation for job interviews, including mock interviews and feedback.",
                features: [
                  "Industry-specific coaching",
                  "Mock interviews",
                  "Feedback sessions",
                  "Negotiation strategies"
                ],
                popular: false
              }
            ].map((service, index) => (
              <Card key={index} className={`overflow-hidden ${service.popular ? 'border-primary' : ''}`}>
                {service.popular && (
                  <div className="bg-primary text-primary-foreground text-center text-sm py-1">
                    Most Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mr-2" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full">Book Service</Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="bg-card border border-border rounded-lg p-8 mb-16">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4">Personalized Career Roadmap</h2>
                <p className="text-foreground/80 mb-4">
                  Our flagship service helps you create a comprehensive, personalized career roadmap based on your skills, interests, and goals.
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    "Comprehensive skill assessment",
                    "Industry trend analysis",
                    "Short and long-term goal planning",
                    "Regular check-ins and adjustments",
                    "Access to our professional network"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/professionals">
                  <Button>Find a Career Professional</Button>
                </Link>
              </div>
              <div className="bg-background rounded-lg overflow-hidden">
                <img 
                  src="/placeholder.svg" 
                  alt="Career Roadmap" 
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold mb-6">Additional Services</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Career Workshops",
                description: "Group sessions focused on specific career development topics and skills."
              },
              {
                title: "Job Placement",
                description: "Assistance in finding suitable job opportunities matching your skills and preferences."
              },
              {
                title: "Professional Networking",
                description: "Access to networking events and connections with industry professionals."
              },
              {
                title: "Skill Development",
                description: "Guidance on acquiring and improving skills relevant to your career goals."
              },
              {
                title: "Career Change Support",
                description: "Specialized guidance for professionals looking to transition to a new field."
              },
              {
                title: "Student Career Planning",
                description: "Early career guidance for students to help them make informed educational choices."
              }
            ].map((service, index) => (
              <div key={index} className="bg-card p-6 rounded-lg border border-border hover:shadow-md transition-shadow">
                <h3 className="font-semibold mb-2">{service.title}</h3>
                <p className="text-foreground/80 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Services;
