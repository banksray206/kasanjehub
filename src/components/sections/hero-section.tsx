import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';

export default function HeroSection() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');
  
  return (
    <section className="relative h-[70vh] md:h-[85vh] w-full flex items-center justify-center text-white animate-fade-in">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          data-ai-hint={heroImage.imageHint}
          fill
          className="object-cover"
          priority
        />
      )}
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 text-center p-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-headline tracking-tight">New Arrival</h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto font-body">Up to 30% Off</p>
        <Button size="lg" asChild className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg">
          <Link href="#">Shop Now</Link>
        </Button>
      </div>
    </section>
  );
}
