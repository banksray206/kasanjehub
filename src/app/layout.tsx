
import type { Metadata } from 'next';
import './globals.css';
// Ensure the cn utility is correctly imported and implemented
// If you do not have a cn function, you can use a simple implementation like:
export function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from '@/hooks/use-auth';
import { CartProvider } from '@/hooks/use-cart';
// Adjust the import path and/or filename as needed, for example:
import BottomNav from '@/components/layout/bottom-nav';
// or if the file is bottom-nav.tsx, ensure the file exists at the specified path

export const metadata: Metadata = {
  title: 'Kasanjeshop',
  description: 'Kasanje Shop is a community app for kasanje community for delivering service like store , community news and chatting and findinf lost items in the community',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <AuthProvider>
          <CartProvider>
            <div className="pb-20 md:pb-0">
              {children}
            </div>
            <BottomNav />
            <Toaster />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
