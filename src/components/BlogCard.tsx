
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';
import { BlogPost } from '@/data/blogs';
import { cn } from '@/lib/utils';

interface BlogCardProps {
  post: BlogPost;
  className?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, className }) => {
  return (
    <div 
      className={cn(
        "group rounded-xl overflow-hidden border border-border transition-all duration-300 hover:shadow-md bg-card",
        className
      )}
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full bg-background text-foreground text-xs font-medium">
            {post.category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center text-sm text-muted-foreground mb-3">
          <Calendar size={14} className="mr-1" />
          <span>{post.date}</span>
          <span className="mx-2">•</span>
          <span>{post.author}</span>
        </div>
        
        <h3 className="font-display font-medium text-xl mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-200">
          {post.title}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {post.excerpt}
        </p>
        
        <Link 
          to={`/blog/${post.slug}`}
          className="inline-flex items-center text-primary text-sm font-medium gap-1 hover:gap-2 transition-all"
        >
          Read More <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
