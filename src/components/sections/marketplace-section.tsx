

'use client';
import { useState } from 'react';
import { ContentWrapper } from '@/components/content-wrapper';
import { ProductCard, Product } from '@/components/product-card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Search, Plus, X } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import Link from 'next/link';
import CreditBanner from '../credit-banner';

const products: Product[] = [
    { id: '68c0ab73ef92e596002d4995', name: 'Local Artisan T-Shirt', price: '15000', imageId: 'product-9', category: 'clothing', rating: 4.5, reviewCount: 42 },
    { id: '68c0ab73ef92e596002d4996', name: 'Organic Local Honey - 16oz', price: '11990', imageId: 'product-10', category: 'groceries', rating: 5, reviewCount: 27 },
    { id: '68c0ab73ef92e596002d4994', name: 'Web Development Services', price: '99000', imageId: 'product-11', category: 'services', rating: 4.9, reviewCount: 15 },
    { id: '68c0ab73ef92e596002d4999', name: 'Graphic Designer', price: '25000', imageId: 'product-12', category: 'digital', rating: 4.6, reviewCount: 32 },
    { id: '68c0ab73ef92e596002d4997', name: 'Business Consulting Services', price: '120000', imageId: 'product-13', category: 'services', rating: 4.8, reviewCount: 18 },
    { id: '68c0ab73ef92e596002d4993', name: 'Fresh Local Vegetables Basket', price: '5000', imageId: 'product-14', category: 'groceries', rating: 4.7, reviewCount: 36 },
    { id: '68c0ab73ef92e596002d4998', name: 'Samsung Galaxy A05 - 6.7" 4GB RAM 64GB ROM 50MP 5000mAh - Black', price: '274900', imageId: 'product-15', category: 'electronics', rating: 4.7, reviewCount: 56 },
    { id: '68c0ab73ef92e596002d4992', name: 'Handcrafted Wooden Set', price: '50000', imageId: 'product-16', category: 'crafts', rating: 4.8, reviewCount: 24 },
    { id: '68c0acd8572e9d7af9a467b2', name: 'Powerful Bluetooth Speaker', price: '250000', imageId: 'product-17', category: 'electronics', rating: 4.6, reviewCount: 67 },
    { id: '68c0acd8572e9d7af9a467b0', name: 'Iphone X - 64GB', price: '650000', imageId: 'product-18', category: 'electronics', rating: 4.8, reviewCount: 88 },
    { id: '68c0acd8572e9d7af9a467b1', name: 'Noise-Cancelling Wireless Earphones', price: '29000', imageId: 'product-19', category: 'electronics', rating: 4.7, reviewCount: 112 },
    { id: '68c0acd8572e9d7af9a467b3', name: 'Stylish Graphic Hoodie', price: '30000', imageId: 'product-20', category: 'clothing', rating: 4.9, reviewCount: 54 },
    { id: '68c0acd8572e9d7af9a467b5', name: 'Handcrafted Leather Bag', price: '22000', imageId: 'product-21', category: 'clothing', rating: 4.8, reviewCount: 31 },
    { id: '68c0acd8572e9d7af9a467b4', name: 'Classic Denim Jeans', price: '50000', imageId: 'product-22', category: 'clothing', rating: 4.5, reviewCount: 78 },
    { id: '68c67888fd3fbf45021701bc', name: 'Plot of Land 100x100ft - Kasanje', price: '35000000', imageId: 'product-23', category: 'other', rating: 4.9, reviewCount: 3 },
    { id: '68c67888fd3fbf45021701bd', name: "Men's Genuine Leather Shoes", price: '30000', imageId: 'product-24', category: 'clothing', rating: 4.7, reviewCount: 62 },
    { id: '68c67888fd3fbf45021701be', name: 'Vibrant Kitenge Print Dress', price: '90000', imageId: 'product-25', category: 'clothing', rating: 4.9, reviewCount: 48 },
    { id: '68c67888fd3fbf45021701bf', name: 'Budget Smartphone - Tecno Spark', price: '450000', imageId: 'product-26', category: 'electronics', rating: 4.5, reviewCount: 150 },
    { id: '68c67888fd3fbf45021701c0', name: 'Studio Quality Over-Ear Headphones', price: '220000', imageId: 'product-27', category: 'electronics', rating: 4.6, reviewCount: 45 },
    { id: '68c67888fd3fbf45021701c1', name: 'Healthy Boer Goat for Breeding', price: '650000', imageId: 'product-28', category: 'groceries', rating: 4.9, reviewCount: 12 },
    { id: '68c67888fd3fbf45021701c2', name: 'Home Theatre System with Subwoofer', price: '950000', imageId: 'product-29', category: 'electronics', rating: 4.7, reviewCount: 25 },
    { id: '68c67888fd3fbf45021701c3', name: 'Bag of Maize Flour (Kawuunga) - 25kg', price: '80000', imageId: 'product-30', category: 'groceries', rating: 4.8, reviewCount: 95 },
    { id: '68c67888fd3fbf45021701c4', name: "Ladies' Fashion Sandals", price: '65000', imageId: 'product-31', category: 'clothing', rating: 4.6, reviewCount: 55 },
    { id: '68c67888fd3fbf45021701c5', name: 'Complete Solar Power System for Home', price: '1200000', imageId: 'product-32', category: 'electronics', rating: 4.8, reviewCount: 38 },
    { id: '68c9ba76c241925284e45fb4', name: 'Coca-Cola Soda - 6 Pack (500ml)', price: '12000', imageId: 'product-33', category: 'groceries', rating: 4.9, reviewCount: 120 },
    { id: '68c9ba76c241925284e45fb5', name: 'Minute Maid Mango Juice - 1 Litre', price: '5500', imageId: 'product-34', category: 'groceries', rating: 4.8, reviewCount: 85 },
    { id: '68c9ba76c241925284e45fb6', name: 'Black Forest Birthday Cake - Medium', price: '80000', imageId: 'product-35', category: 'groceries', rating: 4.9, reviewCount: 45 },
    { id: '68c9ba76c241925284e45fb7', name: 'Rwenzori Mineral Water - 12 Pack (500ml)', price: '9900', imageId: 'product-36', category: 'groceries', rating: 4.9, reviewCount: 210 },
    { id: '68c9ba76c241925284e45fb8', name: 'Riham Oner Apple Juice 500ml Pack - 12Pcs', price: '21900', imageId: 'product-37', category: 'groceries', rating: 4.9, reviewCount: 75 },
    { id: '68c9ba76c241925284e45fb9', name: 'RockBoom Energy Drink - 4 Pack', price: '9900', imageId: 'product-38', category: 'groceries', rating: 4.7, reviewCount: 92 },
    { id: '68c9ba76c241925284e45fba', name: 'Assorted Biscuits Selection Box', price: '22000', imageId: 'product-39', category: 'groceries', rating: 4.6, reviewCount: 68 },
    { id: '68ce85ad730a7ca49e11128f', name: 'Djack Woofer Hifi Home Theater with Bluetooth, FM Radio AK -903L - Black AK -903L - Black', price: '113300', imageId: 'product-40', category: 'electronics', rating: 5, reviewCount: 20 },
    { id: '68ced1ffbe3fa3bfe6ec4b45', name: 'USED RENEWED Oppo Refurbished OPPO F7 6.2 "FHD+ 4GB +64GB Black1', price: '260000', imageId: 'product-41', category: 'electronics', rating: 5, reviewCount: 0 },
    { id: '68ced2f19191d804b9616e0f', name: 'Berrykey Mens Vintage Hawaii Beach Shirt Casual Graffiti Ink Shirts', price: '28000', imageId: 'product-8', category: 'clothing', rating: 5, reviewCount: 0 },
    { id: '68ced49fe78fcac7d2095478', name: 'Multiple Pockets Pants Cylinder Loose Broad Leg Waist Casual Male Trousers', price: '29000', imageId: 'product-7', category: 'clothing', rating: 5, reviewCount: 0 },
    { id: '68ced9e1862e0695e455d595', name: 'Riham Oner Mango Juice -12*500ml', price: '21900', imageId: 'product-6', category: 'groceries', rating: 5, reviewCount: 183 },
    { id: '68ceea1dfbe1b1ee29d8e91c', name: 'Computer Studies', price: '99000', imageId: 'product-5', category: 'services', rating: 5, reviewCount: 500 }
];


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

export default function MarketplaceSection() {
  const [activeCategory, setActiveCategory] = useState("All Products");
  const { user } = useAuth();

  const filteredProducts = products.filter(product => activeCategory === 'All Products' || product.category === activeCategory);

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
          <Input placeholder="Search products..." className="pl-10 w-full bg-white" />
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
        {filteredProducts.map(product => {
          const image = PlaceHolderImages.find(p => p.id === product.imageId);
          return (
            <ProductCard
              key={product.id}
              product={product}
              image={image}
            />
          );
        })}
      </div>
    </ContentWrapper>
  );
}

    