"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Store, Newspaper, MapPin, Medal, User, LogIn, LogOut, MessageSquare, Shield, ShoppingCart, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from '../ui/avatar';
import { useCart } from '@/hooks/use-cart';

const navLinks = [
  { href: '/', label: 'Marketplace', icon: Store },
  { href: '/newfeed', label: 'Newsfeed', icon: Newspaper },
  { href: '/lost-found', label: 'Lost & Found', icon: MapPin },
  { href: '/leaderboard', label: 'Leaderboard', icon: Medal },
  { href: '/messages', label: 'Messages', icon: MessageSquare },
  { href: '/orders', label: 'My Orders', icon: ShoppingBag },
];

export default function Header() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const adminEmails = ['kawooyaraymond40@gmail.com', 'banksray206@gmail.com'];
  const isAdmin = user && user.email && adminEmails.includes(user.email);
  const { cart } = useCart();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({ title: 'Logged Out', description: 'You have been successfully logged out.' });
      router.push('/login');
    } catch (error) {
      toast({ variant: 'destructive', title: 'Logout Failed', description: 'Something went wrong.' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold font-headline text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-7 w-7 text-accent"
          >
            <path d="M4 21V10.08a2 2 0 0 1 .63-1.42l7.43-8.11a2 2 0 0 1 2.86 0l7.43 8.11a2 2 0 0 1 .63 1.42V21" />
            <path d="M9 21v-6.09a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2V21" />
          </svg>
          <span className="text-green-600">Kasanje</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} className="flex items-center gap-2 text-foreground/80 transition-colors hover:text-foreground">
              <link.icon className="h-5 w-5" />
              {link.label}
            </Link>
          ))}
            {isAdmin && (
             <Link href="/admin" className="flex items-center gap-2 text-foreground/80 transition-colors hover:text-foreground">
                <Shield className="h-5 w-5" />
                Admin
              </Link>
            )}
        </nav>
        <div className="flex items-center gap-2">
          {!loading && (
            <>
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                           <AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
                        </Avatar>
                     </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">My Account</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                       <Link href="/profile"><User className="mr-2 h-4 w-4" />Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button asChild>
                  <Link href="/login">
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </Link>
                </Button>
              )}
              <Link href="/cart" className="relative flex items-center gap-2 text-foreground/80 transition-colors hover:text-foreground">
                <ShoppingCart className="h-5 w-5" />
                Cart
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                    {cart.length}
                  </span>
                )}
              </Link>
              <Link
                href="/orders"
                className="relative flex items-center gap-2 text-foreground/80 transition-colors hover:text-foreground md:hidden"
              >
                <ShoppingBag className="h-5 w-5" />
                Orders
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
