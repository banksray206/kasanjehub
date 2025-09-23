
'use client';

import { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { X, Megaphone, ShoppingCart } from 'lucide-react';

export default function CreditBanner() {
  const [showCreditBanners, setShowCreditBanners] = useState(true);

  if (!showCreditBanners) {
    return null;
  }

  return (
    <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-6 relative">
       <button onClick={() => setShowCreditBanners(false)} className="absolute -top-2 -right-2 text-muted-foreground/80 hover:text-foreground bg-background/50 rounded-full p-1 z-10">
        <X className="h-5 w-5" />
      </button>
      <Alert className="bg-gradient-to-r from-blue-500 to-teal-400 text-white border-0">
        <div className="flex flex-col h-full">
            <Megaphone className="h-6 w-6 mb-2" />
            <AlertTitle className="font-bold text-md">Advertise Your Business</AlertTitle>
            <AlertDescription className="text-white/90 text-sm flex-grow">
                Reach thousands of local customers by advertising on Kasanje.
            </AlertDescription>
            <Button variant="outline" className="mt-4 bg-white/20 border-white/50 hover:bg-white/30 text-white whitespace-nowrap self-start">Learn More</Button>
        </div>
      </Alert>
      <Alert className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
         <div className="flex flex-col h-full">
            <ShoppingCart className="h-6 w-6 mb-2" />
            <AlertTitle className="font-bold text-md">Want to post more?</AlertTitle>
            <AlertDescription className="text-white/90 text-sm flex-grow">
                You have one free post. To post more, buy credits via WhatsApp on 0708390617.
            </AlertDescription>
            <Button variant="outline" className="mt-4 bg-white/20 border-white/50 hover:bg-white/30 text-white whitespace-nowrap self-start">Contact Us</Button>
        </div>
      </Alert>
    </div>
  );
}
