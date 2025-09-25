
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Store, Newspaper, MapPin, Medal, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Market', icon: Store },
  { href: '/newfeed', label: 'Newsfeed', icon: Newspaper },
  { href: '/lost-found', label: 'Lost/Found', icon: MapPin },
  { href: '/leaderboard', label: 'Leaders', icon: Medal },
  { href: '/messages', label: 'Messages', icon: MessageSquare },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t">
      <div className="grid h-16 grid-cols-5">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 text-xs font-medium transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
              )}
            >
              <link.icon className="h-6 w-6" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
