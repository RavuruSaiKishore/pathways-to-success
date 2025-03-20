
import React from "react";
import { Link } from "react-router-dom";
import Hero from "@/components/Hero";
import ProfessionalCard from "@/components/ProfessionalCard";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { professionals } from "@/data/professionals";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Index: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Hero />

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-8">
            Featured Professionals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {professionals.map((professional) => (
              <ProfessionalCard key={professional.id} professional={professional} />
            ))}
          </div>
          <div className="text-center mt-6">
            <Link to="/professionals">
              <Button variant="secondary">View All Professionals</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-8">
            Why Choose Our Platform?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Expert Guidance</h3>
                <p className="text-gray-600">
                  Connect with seasoned professionals who offer valuable career
                  advice and mentorship.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  Diverse Expertise
                </h3>
                <p className="text-gray-600">
                  Access professionals from various fields, ensuring you find
                  the right match for your career aspirations.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  Personalized Support
                </h3>
                <p className="text-gray-600">
                  Receive tailored support and guidance to help you achieve
                  your unique career goals.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
