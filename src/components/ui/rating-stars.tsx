import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingStarsProps {
  rating: number;
  className?: string;
  starClassName?: string;
}

export function RatingStars({ rating, className, starClassName }: RatingStarsProps) {
  return (
    <div className={cn("flex items-center gap-0.5", className)} aria-label={`Rating: ${rating} out of 5 stars`}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={cn(
            "w-4 h-4",
            i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/30",
            i === Math.floor(rating) && rating % 1 !== 0 && "text-yellow-400",
            starClassName
          )}
        />
      ))}
    </div>
  );
}
