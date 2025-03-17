
import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Professional } from '@/data/professionals';

export interface Review {
  id: string;
  professionalId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewSectionProps {
  professional: Professional;
}

const StarRating = ({ 
  rating, 
  onRatingChange 
}: { 
  rating: number, 
  onRatingChange?: (rating: number) => void 
}) => {
  const [hoverRating, setHoverRating] = useState(0);
  
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`${onRatingChange ? 'cursor-pointer' : 'cursor-default'}`}
          onClick={() => onRatingChange && onRatingChange(star)}
          onMouseEnter={() => onRatingChange && setHoverRating(star)}
          onMouseLeave={() => onRatingChange && setHoverRating(0)}
        >
          <Star 
            size={20} 
            className={`${
              (hoverRating ? star <= hoverRating : star <= rating)
                ? 'text-yellow-500 fill-yellow-500' 
                : 'text-gray-300 fill-gray-300'
            } transition-colors`} 
          />
        </button>
      ))}
    </div>
  );
};

const ReviewSection: React.FC<ReviewSectionProps> = ({ professional }) => {
  const { toast } = useToast();
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: '',
  });
  const [reviews, setReviews] = useState<Review[]>(() => {
    // Load reviews from localStorage or use an empty array
    const savedReviews = localStorage.getItem(`reviews_${professional.id}`);
    return savedReviews ? JSON.parse(savedReviews) : [];
  });
  
  const handleRatingChange = (rating: number) => {
    setNewReview((prev) => ({ ...prev, rating }));
  };
  
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewReview((prev) => ({ ...prev, comment: e.target.value }));
  };
  
  const submitReview = () => {
    if (newReview.rating === 0) {
      toast({
        title: "Rating Required",
        description: "Please select a star rating before submitting.",
        variant: "destructive",
      });
      return;
    }
    
    if (newReview.comment.trim() === '') {
      toast({
        title: "Comment Required",
        description: "Please enter a comment before submitting.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, you would send this to a backend API
    const review: Review = {
      id: Date.now().toString(),
      professionalId: professional.id,
      userId: "current-user", // In a real app, this would be the actual user ID
      userName: "Current User", // In a real app, this would be the actual user name
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString(),
    };
    
    const updatedReviews = [review, ...reviews];
    setReviews(updatedReviews);
    
    // Store in localStorage (simulating a backend)
    localStorage.setItem(`reviews_${professional.id}`, JSON.stringify(updatedReviews));
    
    // Reset form
    setNewReview({ rating: 0, comment: '' });
    
    toast({
      title: "Review Submitted",
      description: "Thank you for sharing your experience!",
    });
  };
  
  return (
    <div className="mt-8 space-y-6">
      <h2 className="text-xl font-semibold">Reviews</h2>
      
      {/* Submit a review */}
      <div className="bg-accent/50 rounded-lg p-4">
        <h3 className="font-medium mb-2">Share Your Experience</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm mb-1">Rating</label>
            <StarRating rating={newReview.rating} onRatingChange={handleRatingChange} />
          </div>
          
          <div>
            <label className="block text-sm mb-1">Comment</label>
            <Textarea 
              placeholder="What was your experience with this professional?"
              value={newReview.comment}
              onChange={handleCommentChange}
              className="resize-none"
              rows={3}
            />
          </div>
          
          <Button onClick={submitReview} size="sm">
            Submit Review
          </Button>
        </div>
      </div>
      
      {/* Display existing reviews */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p className="text-muted-foreground text-sm">No reviews yet. Be the first to share your experience.</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="border-b border-border pb-4 last:border-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium">{review.userName}</p>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(review.date), 'MMM d, yyyy')}
                  </p>
                </div>
                <StarRating rating={review.rating} />
              </div>
              <p className="text-sm">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
