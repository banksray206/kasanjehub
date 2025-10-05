
'use client';

import Image from 'next/image';
import { ContentWrapper } from '@/components/content-wrapper';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Edit, ShoppingBag, Newspaper, Search, Star } from 'lucide-react';
import { ProductCard, Product } from '@/components/product-card';
import { useAuth } from '@/hooks/use-auth';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';

const userProducts: Product[] = [
  { id: '1', name: 'Primary class computer classes', price: 99000, imageId: 'product-5', category: 'Services', rating: 5, reviewCount: 500 },
  { id: '2', name: 'Berrykey Mens Vintage Hawaii', price: 28000, imageId: 'product-8', category: 'Clothing', rating: 5, reviewCount: 0 },
];

export default function ProfileSection() {
    const { user, loading } = useAuth();
    const avatar = PlaceHolderImages.find(p => p.id === 'avatar-1');

    if (loading) {
        return (
            <ContentWrapper>
                <Card>
                    <Skeleton className="h-40 md:h-56 w-full" />
                    <CardContent className="relative px-4 sm:px-6 pt-0">
                        <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-16 sm:-mt-20">
                             <Skeleton className="h-32 w-32 rounded-full border-4 border-white" />
                             <div className="sm:ml-6 mt-4 sm:mt-0 flex-grow space-y-2">
                                <Skeleton className="h-8 w-48" />
                                <Skeleton className="h-4 w-32" />
                             </div>
                             <Skeleton className="h-10 w-32" />
                        </div>
                         <div className="mt-6 space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-2/3" />
                        </div>
                    </CardContent>
                </Card>
            </ContentWrapper>
        )
    }

    if (!user) {
        return (
            <ContentWrapper>
                <Card className="text-center p-12">
                    <CardTitle>Please log in</CardTitle>
                    <CardDescription className="mt-2">You need to be logged in to view your profile.</CardDescription>
                    <Button asChild className="mt-4">
                        <Link href="/login">Login</Link>
                    </Button>
                </Card>
            </ContentWrapper>
        )
    }
    
    const stats = [
        { label: 'Items Sold', value: '0' },
        { label: 'Posts', value: '0' },
        { label: 'Points', value: '0' },
    ]

    return (
        <ContentWrapper className="bg-gray-50/50">
            <Card className="overflow-hidden">
                <div className="relative h-40 md:h-56 bg-gradient-to-r from-green-400 to-blue-500">
                    <Image
                        src="https://picsum.photos/seed/profile-bg/1200/400"
                        alt="Profile banner"
                        data-ai-hint="abstract background"
                        fill
                        className="object-cover"
                    />
                     <div className="absolute inset-0 bg-black/30" />
                </div>
                <CardContent className="relative px-4 sm:px-6 pt-0">
                    <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-16 sm:-mt-20">
                        <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                            {avatar && <AvatarImage src={avatar.imageUrl} alt={user.email || 'User'} data-ai-hint="person portrait" />}
                            <AvatarFallback><User className="w-16 h-16" /></AvatarFallback>
                        </Avatar>
                        <div className="sm:ml-6 mt-4 sm:mt-0 text-center sm:text-left flex-grow">
                            <h2 className="text-2xl md:text-3xl font-bold font-headline">{user.email}</h2>
                            <p className="text-sm text-muted-foreground">Joined {user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : ''}</p>
                        </div>
                        <Button variant="outline" className="mt-4 sm:mt-0 bg-white">
                            <Edit className="mr-2 h-4 w-4" /> Edit Profile
                        </Button>
                    </div>

                    <div className="mt-6">
                        <p className="text-foreground/80">This is your bio. You can edit it by clicking the button above.</p>
                    </div>

                    <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                        {stats.map(stat => (
                            <div key={stat.label} className="p-3 bg-gray-100 rounded-lg">
                                <p className="text-2xl font-bold text-primary">{stat.value}</p>
                                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8">
                        <Tabs defaultValue="products">
                            <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex mb-4">
                                <TabsTrigger value="products"><ShoppingBag className="mr-2 h-4 w-4"/> My Products</TabsTrigger>
                                <TabsTrigger value="feed"><Newspaper className="mr-2 h-4 w-4"/> My Feed Posts</TabsTrigger>
                                <TabsTrigger value="lost-found"><Search className="mr-2 h-4 w-4"/> Lost &amp; Found</TabsTrigger>
                            </TabsList>
                            <TabsContent value="products">
                                <Card>
                                    <CardContent className="p-12 text-center text-muted-foreground">
                                        <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
                                        <p>You haven't listed any products yet.</p>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="feed">
                                <Card>
                                    <CardContent className="p-12 text-center text-muted-foreground">
                                        <Newspaper className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
                                        <p>You haven't posted anything to the feed yet.</p>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="lost-found">
                                <Card>
                                    <CardContent className="p-12 text-center text-muted-foreground">
                                        <Search className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
                                        <p>No lost or found items reported by you.</p>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </CardContent>
            </Card>
        </ContentWrapper>
    );
}
