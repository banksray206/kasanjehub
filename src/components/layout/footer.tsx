
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Send, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const quickLinks = [
  { href: '/', label: 'Marketplace' },
  { href: '/newfeed', label: 'Newsfeed' },
  { href: '/lost-found', label: 'Lost & Found' },
  { href: '/messages', label: 'Messages' },
];

const communityLinks = [
    { href: '/leaderboard', label: 'Leaderboard' },
    { href: '/profile', label: 'My Profile' },
    { href: '/admin', label: 'Admin' },
    { href: '#', label: 'Help Center' },
    { href: '#', label: 'Guidelines' },
];

const legalLinks = [
    { href: '#', label: 'Privacy Policy' },
    { href: '#', label: 'Terms of Service' },
    { href: '#', label: 'Cookie Policy' },
]

const socialLinks = [
  { href: '#', icon: Facebook, name: 'Facebook' },
  { href: '#', icon: Twitter, name: 'Twitter' },
  { href: '#', icon: Instagram, name: 'Instagram' },
  { href: '#', icon: Linkedin, name: 'LinkedIn' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Branding & Newsletter */}
            <div className="lg:col-span-1 space-y-4">
                 <div className="flex items-center gap-2 text-2xl font-bold font-headline text-primary">
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
                </div>
                <p className="text-sm text-muted-foreground">Your trusted community marketplace.</p>
                <div className="space-y-2">
                    <h3 className="font-semibold">Stay Updated</h3>
                    <div className="relative">
                        <Input placeholder="Enter your email" className="pr-12 bg-white"/>
                        <Button size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8">
                            <Send className="h-4 w-4"/>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Links Columns */}
            <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
                <div>
                    <h3 className="font-semibold mb-4 text-gray-800 dark:text-gray-200">Quick Links</h3>
                    <nav className="flex flex-col gap-3">
                        {quickLinks.map((link) => (
                            <Link key={link.label} href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>
                 <div>
                    <h3 className="font-semibold mb-4 text-gray-800 dark:text-gray-200">Community</h3>
                    <nav className="flex flex-col gap-3">
                        {communityLinks.map((link) => (
                            <Link key={link.label} href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>
                 <div>
                    <h3 className="font-semibold mb-4 text-gray-800 dark:text-gray-200">Legal</h3>
                    <nav className="flex flex-col gap-3">
                        {legalLinks.map((link) => (
                            <Link key={link.label} href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">&copy; {new Date().getFullYear()} Kasanje. All rights reserved.</p>
          <div className="flex gap-4">
            {socialLinks.map((link) => (
              <Link key={link.name} href={link.href} className="text-gray-500 hover:text-primary dark:hover:text-white">
                <link.icon className="w-5 h-5" />
                <span className="sr-only">{link.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
