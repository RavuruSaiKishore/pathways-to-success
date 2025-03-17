
export interface Professional {
  id: string;
  name: string;
  title: string;
  specialization: string;
  bio: string;
  fullBio: string;
  experience: string;
  qualifications: string[];
  image: string;
  rating: number;
  reviewCount: number;
  availableDates: {
    date: string;
    slots: {
      time: string;
      available: boolean;
    }[];
  }[];
  contact: {
    email: string;
    phone: string;
    social: {
      linkedin?: string;
      twitter?: string;
    };
  };
}

export const professionals: Professional[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    title: "Career Counselor",
    specialization: "Technology & Engineering",
    bio: "Helping tech professionals find their dream careers for over 10 years.",
    fullBio: "Dr. Sarah Johnson has been guiding students and professionals in the technology sector for over a decade. With a PhD in Career Psychology and extensive industry experience at leading tech companies, she specializes in helping individuals navigate the rapidly evolving tech landscape. Sarah's approach combines data-driven insights with compassionate guidance to help her clients discover fulfilling career paths.",
    experience: "12 years",
    qualifications: [
      "PhD in Career Psychology",
      "Certified Career Development Professional",
      "Former HR Director at TechGiant Inc."
    ],
    image: "/placeholder.svg",
    rating: 4.9,
    reviewCount: 127,
    availableDates: [
      {
        date: "2023-06-15",
        slots: [
          { time: "09:00 AM", available: true },
          { time: "11:00 AM", available: true },
          { time: "02:00 PM", available: false },
          { time: "04:00 PM", available: true }
        ]
      },
      {
        date: "2023-06-16",
        slots: [
          { time: "10:00 AM", available: true },
          { time: "01:00 PM", available: true },
          { time: "03:00 PM", available: true }
        ]
      }
    ],
    contact: {
      email: "sarah.johnson@cglines.com",
      phone: "+1 (555) 123-4567",
      social: {
        linkedin: "linkedin.com/in/sarahjohnson",
        twitter: "twitter.com/drsarahjohnson"
      }
    }
  },
  {
    id: "2",
    name: "Michael Chen",
    title: "Career Coach",
    specialization: "Business & Finance",
    bio: "Former Wall Street executive helping students break into finance.",
    fullBio: "Michael Chen brings 15 years of Wall Street experience to his career coaching practice. After a successful career in investment banking, he now dedicates his time to helping students and young professionals navigate the competitive world of finance and business. His insider knowledge of recruitment processes at top firms gives his clients a significant advantage in their job search.",
    experience: "15 years",
    qualifications: [
      "MBA from Wharton",
      "Former VP at Goldman Sachs",
      "Certified Financial Planner"
    ],
    image: "/placeholder.svg",
    rating: 4.8,
    reviewCount: 93,
    availableDates: [
      {
        date: "2023-06-15",
        slots: [
          { time: "10:00 AM", available: false },
          { time: "01:00 PM", available: true },
          { time: "03:00 PM", available: true }
        ]
      },
      {
        date: "2023-06-16",
        slots: [
          { time: "09:00 AM", available: true },
          { time: "11:00 AM", available: true },
          { time: "02:00 PM", available: true }
        ]
      }
    ],
    contact: {
      email: "michael.chen@cglines.com",
      phone: "+1 (555) 987-6543",
      social: {
        linkedin: "linkedin.com/in/michaelchen"
      }
    }
  },
  {
    id: "3",
    name: "Aisha Patel",
    title: "Career Strategist",
    specialization: "Healthcare & Medicine",
    bio: "Guiding medical professionals through career transitions and advancement.",
    fullBio: "Aisha Patel specializes in career development for healthcare professionals at all stages of their careers. With experience as a medical recruiter and healthcare administrator, she understands the unique challenges and opportunities in the medical field. Aisha has helped hundreds of doctors, nurses, and allied health professionals find meaningful roles and navigate complex career decisions.",
    experience: "9 years",
    qualifications: [
      "Master's in Healthcare Management",
      "Certified Healthcare Recruiter",
      "Former Medical Center HR Director"
    ],
    image: "/placeholder.svg",
    rating: 4.7,
    reviewCount: 86,
    availableDates: [
      {
        date: "2023-06-17",
        slots: [
          { time: "09:00 AM", available: true },
          { time: "11:00 AM", available: false },
          { time: "02:00 PM", available: true }
        ]
      },
      {
        date: "2023-06-18",
        slots: [
          { time: "10:00 AM", available: true },
          { time: "01:00 PM", available: true },
          { time: "03:00 PM", available: false }
        ]
      }
    ],
    contact: {
      email: "aisha.patel@cglines.com",
      phone: "+1 (555) 234-5678",
      social: {
        linkedin: "linkedin.com/in/aishapatel",
        twitter: "twitter.com/aishapatel"
      }
    }
  },
  {
    id: "4",
    name: "James Wilson",
    title: "Career Mentor",
    specialization: "Creative Arts & Design",
    bio: "Emmy-winning creative director helping artists build sustainable careers.",
    fullBio: "James Wilson has spent over two decades in the creative industry, earning recognition including an Emmy award for his directorial work. Now, he mentors emerging artists and designers, helping them develop both their creative voice and business acumen. James believes in sustainable creative careers and helps his clients find the balance between artistic fulfillment and financial stability.",
    experience: "20 years",
    qualifications: [
      "BFA in Fine Arts",
      "Emmy Award Winner",
      "Former Creative Director at ArtistryStudio"
    ],
    image: "/placeholder.svg",
    rating: 4.9,
    reviewCount: 115,
    availableDates: [
      {
        date: "2023-06-19",
        slots: [
          { time: "11:00 AM", available: true },
          { time: "02:00 PM", available: true },
          { time: "04:00 PM", available: true }
        ]
      },
      {
        date: "2023-06-20",
        slots: [
          { time: "10:00 AM", available: false },
          { time: "01:00 PM", available: true },
          { time: "03:00 PM", available: true }
        ]
      }
    ],
    contact: {
      email: "james.wilson@cglines.com",
      phone: "+1 (555) 345-6789",
      social: {
        linkedin: "linkedin.com/in/jameswilson",
        twitter: "twitter.com/jameswilson"
      }
    }
  }
];
