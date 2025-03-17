
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  image: string;
  slug: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Future of Work: Skills That Will Matter in 2024 and Beyond",
    excerpt: "As AI and automation transform industries, the most valuable skills are shifting. Discover which capabilities will help you thrive in tomorrow's workplace.",
    author: "Dr. Sarah Johnson",
    date: "May 15, 2023",
    category: "Career Trends",
    image: "/placeholder.svg",
    slug: "future-of-work-skills-2024"
  },
  {
    id: "2",
    title: "Mastering the Hybrid Work Model: Strategies for Success",
    excerpt: "With hybrid work becoming the norm, learn how to maximize productivity, visibility, and work-life balance in this new professional paradigm.",
    author: "Michael Chen",
    date: "May 10, 2023",
    category: "Work-Life Balance",
    image: "/placeholder.svg",
    slug: "mastering-hybrid-work-model"
  },
  {
    id: "3",
    title: "Career Transitions in Healthcare: Emerging Roles and Opportunities",
    excerpt: "The healthcare industry is evolving rapidly. Explore new career paths emerging for both clinical and non-clinical professionals in this dynamic field.",
    author: "Aisha Patel",
    date: "May 5, 2023",
    category: "Industry Insights",
    image: "/placeholder.svg",
    slug: "healthcare-career-transitions"
  },
  {
    id: "4",
    title: "Portfolio Building for Creative Professionals in a Digital Age",
    excerpt: "Beyond traditional showcases, learn how today's creative professionals can build compelling, multi-dimensional portfolios that capture attention.",
    author: "James Wilson",
    date: "April 30, 2023",
    category: "Creative Careers",
    image: "/placeholder.svg",
    slug: "creative-portfolio-building"
  }
];
