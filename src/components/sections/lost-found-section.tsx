

'use client';

import { useState } from 'react';
import { ContentWrapper } from '@/components/content-wrapper';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { X, Search, Plus, Filter, Package, PackageOpen, Info, MapPin, Gift, Calendar, Phone, Mail } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useAuth } from '@/hooks/use-auth';
import Link from 'next/link';
import CreditBanner from '../credit-banner';

const stats = [
    { label: 'Total Posts', value: 5, color: 'bg-blue-100', textColor: 'text-blue-800' },
    { label: 'Lost Items', value: 3, color: 'bg-red-100', textColor: 'text-red-800' },
    { label: 'Found Items', value: 2, color: 'bg-green-100', textColor: 'text-green-800' },
    { label: 'Reunited', value: 0, color: 'bg-gray-100', textColor: 'text-gray-800' }
]

const lostItems = [
    {
        id: '1',
        name: 'samsung note 8',
        description: 'blue long with hard green cover',
        category: 'electronics',
        status: 'active',
        location: 'up[erside of kasanje',
        reward: 'UGX 110,000',
        contact: 'KAWOOYA RAYMOND',
        postedDate: '9/20/2025',
        imageId: 'lost-item-1',
    },
    {
        id: '2',
        name: 'Lost iPhone 12 Pro - Blue',
        description: 'Lost my iPhone 12 Pro (Blue color) with a clear case that has stickers on it. Last seen near Kasanje Trading Center around 3 PM yesterday. Has important family photos. Please help!',
        category: 'electronics',
        status: 'active',
        location: 'Kasanje Trading Center',
        date: '1/15/2024',
        reward: 'UGX 100,000',
        contact: 'Sarah Nalwoga',
        postedDate: '9/19/2025',
        imageId: 'lost-item-2',
    }
]

function LostItemCard({ item }: { item: typeof lostItems[0] }) {
  const image = PlaceHolderImages.find(p => p.id === item.imageId);
  return (
    <Card className="bg-red-50 border-red-200">
      <CardContent className="p-4 space-y-3">
        <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-red-600 border-red-300">LOST</Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">{item.category}</Badge>
            <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">{item.status}</Badge>
        </div>
        <h3 className="text-xl font-bold font-headline">{item.name}</h3>
        <div className="flex flex-col sm:flex-row gap-4">
          {image && (
            <div className="sm:w-1/3">
              <Image src={image.imageUrl} alt={item.name} width={200} height={200} className="rounded-md object-cover" data-ai-hint={image.imageHint} />
            </div>
          )}
          <div className="flex-1 space-y-2">
            <p className="text-sm text-gray-700">{item.description}</p>
            <div className="space-y-1 text-sm text-gray-600">
                <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-gray-500" /> {item.location}</p>
                {item.date && <p className="flex items-center gap-2"><Calendar className="w-4 h-4 text-gray-500" /> Date: {item.date}</p>}
                <p className="flex items-center gap-2 font-semibold text-green-700"><Gift className="w-4 h-4 text-green-600" /> Reward: {item.reward}</p>
            </div>
          </div>
        </div>
        <Card className="bg-white">
            <CardHeader className="p-3">
                <CardTitle className="text-base">Contact: {item.contact}</CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0 flex gap-2">
                <Button variant="outline" size="sm" className="w-full bg-gray-50"><Phone className="mr-2"/> Call</Button>
                <Button variant="outline" size="sm" className="w-full bg-gray-50"><Mail className="mr-2"/> Email</Button>
            </CardContent>
        </Card>
        <p className="text-xs text-gray-500 text-right">Posted {item.postedDate}</p>
      </CardContent>
    </Card>
  )
}

function ReportItemDialog({ children }: { children: React.ReactNode }) {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                    <DialogTitle>Report an Item</DialogTitle>
                    <CardDescription>Fill in the details of the lost or found item.</CardDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="item-name" className="text-right">Item Name</Label>
                        <Input id="item-name" placeholder="e.g., iPhone 12 Pro" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">Description</Label>
                        <Textarea id="description" placeholder="Provide a detailed description" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="location" className="text-right">Location</Label>
                        <Input id="location" placeholder="Last seen location" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="reward" className="text-right">Reward (UGX)</Label>
                        <Input id="reward" placeholder="Optional" type="number" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="status" className="text-right">Status</Label>
                        <Select>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="lost">Lost</SelectItem>
                                <SelectItem value="found">Found</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="image" className="text-right">Image</Label>
                        <Input id="image" type="file" className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Submit Report</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default function LostFoundSection() {
    const { user } = useAuth();

  return (
    <ContentWrapper className="bg-gray-50/50">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold font-headline text-center">Lost &amp; Found</h2>
        <p className="mt-2 text-center text-muted-foreground mb-8 max-w-2xl mx-auto">Help reunite our community with their belongings</p>
      </div>

      <CreditBanner />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map(stat => (
          <Card key={stat.label} className={`${stat.color}`}>
            <CardContent className="p-4 text-center">
              <p className={`text-3xl font-bold ${stat.textColor}`}>{stat.value}</p>
              <p className={`text-sm font-medium ${stat.textColor}`}>{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search lost &amp; found items..." className="pl-10 w-full bg-white" />
        </div>
        {user && (
            <ReportItemDialog>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="mr-2 h-4 w-4" />
                Report Item
                </Button>
            </ReportItemDialog>
        )}
      </div>

       {!user && (
            <Alert className="mb-8 bg-yellow-100 border-yellow-200 text-yellow-800">
                <Info className="h-5 w-5 text-yellow-700" />
                <AlertDescription>
                    Please{' '}
                    <Link href="/login" className="font-semibold hover:underline">
                        log in
                    </Link>
                    {' '}to report lost or found items.
                </AlertDescription>
            </Alert>
       )}

      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Filter className="h-5 w-5" />
            <span>Filters:</span>
        </div>
        <Select defaultValue="all-types">
            <SelectTrigger className="w-auto md:w-[180px] bg-white">
                <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all-types">All</SelectItem>
                <SelectItem value="lost">Lost</SelectItem>
                <SelectItem value="found">Found</SelectItem>
            </SelectContent>
        </Select>
        <Select defaultValue="active">
            <SelectTrigger className="w-auto md:w-[180px] bg-white">
                <SelectValue placeholder="Active" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="reunited">Reunited</SelectItem>
            </SelectContent>
        </Select>
        <Select defaultValue="all-time">
            <SelectTrigger className="w-auto md:w-[180px] bg-white">
                <SelectValue placeholder="All Time" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all-time">All Time</SelectItem>
                <SelectItem value="last-24h">Last 24 hours</SelectItem>
                <SelectItem value="last-7d">Last 7 days</SelectItem>
                <SelectItem value="last-30d">Last 30 days</SelectItem>
            </SelectContent>
        </Select>
      </div>
      
      <Tabs defaultValue="lost-items">
        <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
          <TabsTrigger value="all-items">All Items</TabsTrigger>
          <TabsTrigger value="lost-items">Lost Items</TabsTrigger>
          <TabsTrigger value="found-items">Found Items</TabsTrigger>
        </TabsList>
        <TabsContent value="all-items">
            <Card className="mt-4">
                <CardContent className="p-12 text-center text-muted-foreground">
                    <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
                    <p>No items have been reported yet.</p>
                </CardContent>
            </Card>
        </TabsContent>
         <TabsContent value="lost-items">
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                {lostItems.map((item) => <LostItemCard key={item.id} item={item} />)}
            </div>
        </TabsContent>
         <TabsContent value="found-items">
            <Card className="mt-4">
                <CardContent className="p-12 text-center text-muted-foreground">
                    <PackageOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
                    <p>No found items to display.</p>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>

    </ContentWrapper>
  );
}
