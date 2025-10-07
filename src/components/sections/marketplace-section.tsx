'use client';
import { useState, useEffect } from 'react';
import { ContentWrapper } from '@/components/content-wrapper';
import { ProductCard, Product } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Search, Plus } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useCart } from '@/hooks/use-cart';
import Link from 'next/link';
import CreditBanner from '../credit-banner';
import { fetchProducts } from '@/app/products/actions';

const categories = ["All Products", "Groceries", "Electronics", "Crafts", "Services", "Clothing", "Digital", "Other"];

function SellProductDialog({ children }: { children: React.ReactNode }) {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                    <DialogTitle>Sell Your Product</DialogTitle>
                    <AlertDescription>Fill in the details to list your product on the marketplace.</AlertDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="product-name" className="text-right">Product Name</Label>
                        <Input id="product-name" placeholder="e.g., Handmade Ceramic Vase" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">Description</Label>
                        <Textarea id="description" placeholder="Describe your product" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="price" className="text-right">Price (UGX)</Label>
                        <Input id="price" placeholder="e.g., 25000" type="number" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="category" className="text-right">Category</Label>
                        <Input id="category" placeholder="e.g., Crafts" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="image" className="text-right">Image</Label>
                        <Input id="image" type="file" className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">List Product</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

type MarketplaceSectionProps = {
  initialProducts: any[]; // Replace 'any' with your Product type if available
  initialAdverts: any[];  // Replace 'any' with your Advert type if available
};

export default function MarketplaceSection({ initialProducts, initialAdverts }: MarketplaceSectionProps) {
  const [activeCategory, setActiveCategory] = useState("All Products");
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchProducts();
        setProducts(data || []);
      } catch (err) {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  // Improved filter: category and search
  const filteredProducts = products.filter(product => {
    const matchesCategory =
      activeCategory === 'All Products' ||
      (product.category && product.category.toLowerCase() === activeCategory.toLowerCase());
    const matchesSearch =
      !search ||
      product.title?.toLowerCase().includes(search.toLowerCase()) ||
      product.description?.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <ContentWrapper>
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">Kasanje Marketplace</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">Discover local products and services from your community.</p>
      </div>

      <CreditBanner />

      <div className="mt-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="pl-10 w-full bg-white"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        {user && (
          <SellProductDialog>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="mr-2 h-4 w-4" />
              Sell Your Product
            </Button>
          </SellProductDialog>
        )}
      </div>
      
      {!user && (
          <p className="text-center text-muted-foreground mt-4 text-sm">
            Please{' '}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              log in
            </Link>
            {' '}to sell a product.
          </p>
      )}

      <div className="mt-8 flex justify-center flex-wrap gap-2">
        {categories.map(category => (
          <Button
            key={category}
            variant={activeCategory === category ? 'default' : 'outline'}
            onClick={() => setActiveCategory(category)}
            className={activeCategory === category ? 'bg-accent text-accent-foreground' : 'bg-white'}
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {loading ? (
          <div className="col-span-full text-center text-muted-foreground">Loading products...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="col-span-full text-center text-muted-foreground">No products found.</div>
        ) : (
          filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))
        )}
      </div>
    </ContentWrapper>
  );
}

