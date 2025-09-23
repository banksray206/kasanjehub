
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import type { ImagePlaceholder } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { RatingStars } from '@/components/ui/rating-stars';
import { useCart } from '@/hooks/use-cart';

export interface Product {
  id: string;
  name: string;
  price?: string;
  imageId: string;
  category?: string;
  rating: number;
  reviewCount: number;
}
interface ProductCardProps {
  product: Product;
  image?: ImagePlaceholder;
}

export function ProductCard({ product, image }: ProductCardProps) {
  const { addToCart } = useCart();
  const { name, price, category, rating, reviewCount } = product;

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl group rounded-lg">
      <div className="aspect-square relative overflow-hidden">
        {image ? (
          <Image
            src={image.imageUrl}
            alt={image.description}
            data-ai-hint={image.imageHint}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <span className="text-muted-foreground text-sm">No Image</span>
          </div>
        )}
        <Button size="icon" className="absolute top-2 right-2 h-8 w-8 bg-green-500 hover:bg-green-600 rounded-full" onClick={() => addToCart(product)}>
            <ShoppingCart className="h-4 w-4" />
        </Button>
      </div>
      <CardContent className="p-3 space-y-2">
        {category && <Badge variant="secondary" className="text-blue-600 bg-blue-100">{category}</Badge>}
        <h3 className="font-semibold font-body line-clamp-2 text-base">{name}</h3>
        {price && <p className="text-lg font-bold text-primary">UGX {price}</p>}
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <RatingStars rating={rating} />
            <span>({reviewCount})</span>
        </div>
        <Button variant="outline" className="w-full border-green-500 text-green-500 hover:bg-green-500 hover:text-white" onClick={() => addToCart(product)}>
            <ShoppingCart />
            Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}
