import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { RatingStars } from '@/components/ui/rating-stars';
import { useCart } from '@/hooks/use-cart';

export type Product = {
  id: string;
  name: string; // <-- Add this line
  title: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  image_url: string;
  rating: number;
  review_count: number;
  seller_name: string;
  in_stock: boolean;
  created_dt: string;
  updated_dt: string;
  user_id: string;
  created_by: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const { addToCart } = useCart();
  const { 
    title, price, currency, category, rating, review_count, image_url, 
    seller_name, in_stock 
  } = product;

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl group rounded-lg">
      <div className="aspect-square relative overflow-hidden">
        {image_url ? (
          <Image
            src={image_url}
            alt={title}
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
        <h3 className="font-semibold font-body line-clamp-2 text-base">{title}</h3>
        <div className="flex items-center gap-2">
          {price && <p className="text-lg font-bold text-primary">{currency} {price}</p>}
          {!in_stock && <Badge variant="destructive">Out of Stock</Badge>}
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <RatingStars rating={rating} />
            <span>({review_count})</span>
        </div>
        {seller_name && <div className="text-xs text-muted-foreground">Seller: {seller_name}</div>}
        {onAddToCart && (
          <Button onClick={() => onAddToCart(product)} className="w-full mt-2" disabled={!in_stock}>
            Add to Cart
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
