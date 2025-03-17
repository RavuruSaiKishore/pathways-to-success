
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { 
  Form, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl,
  FormDescription,
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  profession: z.string().min(1, { message: "Please select your profession" }),
  goals: z.string().min(10, { message: "Please describe your goals in at least 10 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      profession: "",
      goals: ""
    }
  });

  const onSubmit = (data: FormValues) => {
    // In a real app, we would save this data to a backend or local storage
    localStorage.setItem('userInfo', JSON.stringify(data));
    
    toast({
      title: "Information submitted",
      description: "Thank you for your interest. Redirecting to home page...",
    });
    
    // Redirect to home page after a short delay
    setTimeout(() => {
      navigate('/home');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow flex items-center justify-center bg-gradient-to-br from-primary/5 via-primary/10 to-transparent p-6">
        <div className="max-w-3xl w-full bg-card rounded-xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="bg-primary p-8 text-white">
              <h1 className="font-display text-3xl font-bold mb-6">Chart Your Career Success</h1>
              <p className="mb-6">Find expert guidance from top professionals in your field.</p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-white/20 p-2 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Personalized Guidance</h3>
                    <p className="text-white/80 text-sm">Tailored advice from experienced professionals</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-white/20 p-2 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Flexible Scheduling</h3>
                    <p className="text-white/80 text-sm">Book appointments at your convenience</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-white/20 p-2 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Diverse Expertise</h3>
                    <p className="text-white/80 text-sm">Access to professionals across various fields</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-8">
              <h2 className="text-2xl font-semibold mb-6">Tell us about yourself</h2>
              <p className="text-muted-foreground mb-6">
                Complete this short form to get started on your career journey.
              </p>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your email address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="profession"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Profession</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your profession" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="student">Student</SelectItem>
                            <SelectItem value="technology">Technology</SelectItem>
                            <SelectItem value="healthcare">Healthcare</SelectItem>
                            <SelectItem value="finance">Finance</SelectItem>
                            <SelectItem value="education">Education</SelectItem>
                            <SelectItem value="creative">Creative Arts</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="goals"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Career Goals</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Briefly describe your career goals and what you hope to achieve..." 
                            className="resize-none" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          This helps us match you with the right professionals.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full">
                    Get Started
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="bg-background py-4 text-center text-muted-foreground text-sm">
        <div className="container mx-auto">
          <p>© 2023 Career Guidance Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
