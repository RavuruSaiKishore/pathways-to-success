
export interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  testimonial: string;
  image: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Alex Thompson",
    position: "Software Engineer",
    company: "Google",
    testimonial: "The guidance I received from CG Lines completely transformed my career trajectory. Dr. Johnson's insights helped me navigate the tech industry and land my dream job at Google. I couldn't be more grateful for their support.",
    image: "/placeholder.svg"
  },
  {
    id: "2",
    name: "Priya Sharma",
    position: "Medical Resident",
    company: "Mayo Clinic",
    testimonial: "As a medical professional, I was struggling to balance my career aspirations with personal wellbeing. Aisha's mentorship provided the clarity I needed to make confident decisions about my specialization and work-life integration.",
    image: "/placeholder.svg"
  },
  {
    id: "3",
    name: "Marcus Johnson",
    position: "Graphic Designer",
    company: "Creative Studios",
    testimonial: "James Wilson's mentorship was a game-changer for my creative career. His practical advice on portfolio development and client relationships helped me establish myself as a freelance designer with a steady stream of meaningful projects.",
    image: "/placeholder.svg"
  },
  {
    id: "4",
    name: "Sophia Rodriguez",
    position: "Investment Analyst",
    company: "Morgan Stanley",
    testimonial: "Michael's insights into the finance industry were invaluable. His guidance on interview preparation and networking strategies helped me stand out in a competitive field and secure a position at a top firm straight out of college.",
    image: "/placeholder.svg"
  },
  {
    id: "5",
    name: "Jordan Lee",
    position: "Marketing Director",
    company: "Spotify",
    testimonial: "The career pivot strategies I learned through CG Lines helped me transition from a technical role to marketing leadership. Their holistic approach to career development considers both skills and personal fulfillment.",
    image: "/placeholder.svg"
  },
  {
    id: "6",
    name: "Emma Wilson",
    position: "Data Scientist",
    company: "Microsoft",
    testimonial: "As someone changing careers in my 30s, I was worried about starting over. My career counselor at CG Lines helped me identify transferable skills and create a strategic plan that made my transition both smooth and rewarding.",
    image: "/placeholder.svg"
  }
]
