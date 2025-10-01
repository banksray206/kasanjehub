'use client';

import { useState, useEffect } from 'react';
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
import { fetchLostItems } from '@/app/lost-found/actions';

function LostItemCard({ item }: { item: any }) {
  // image_urls is already an array
  let imageSrc: string | null = null;
  if (Array.isArray(item.image_urls) && item.image_urls.length > 0) {
    imageSrc = item.image_urls[0];
  }

  return (
    <Card className="bg-red-50 border-red-200">
      <CardContent className="p-4 space-y-3">
        <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-red-600 border-red-300">{item.type?.toUpperCase() || 'LOST'}</Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">{item.category}</Badge>
            <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">{item.status}</Badge>
        </div>
        <h3 className="text-xl font-bold font-headline">{item.title}</h3>
        <div className="flex flex-col sm:flex-row gap-4">
          {imageSrc && (
            <div className="sm:w-1/3">
              <Image src={imageSrc} alt={item.title} width={200} height={200} className="rounded-md object-cover" />
            </div>
          )}
          <div className="flex-1 space-y-2">
            <p className="text-sm text-gray-700">{item.description}</p>
            <div className="space-y-1 text-sm text-gray-600">
                <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-gray-500" /> {item.location}</p>
                {item.date_lost_found && <p className="flex items-center gap-2"><Calendar className="w-4 h-4 text-gray-500" /> Date: {item.date_lost_found}</p>}
                <p className="flex items-center gap-2 font-semibold text-green-700"><Gift className="w-4 h-4 text-green-600" /> Reward: {item.reward}</p>
            </div>
          </div>
        </div>
        <Card className="bg-white">
            <CardHeader className="p-3">
                <CardTitle className="text-base">Contact: {item.contact_name}</CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0 flex gap-2">
                <Button variant="outline" size="sm" className="w-full bg-gray-50">
                    <Phone className="mr-2" />
                    <span className="truncate">{item.contact_phone}</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-gray-50 overflow-hidden"
                  title={item.contact_email}
                >
                  <Mail className="mr-2" />
                  <span className="truncate max-w-[90px] md:max-w-[160px]">{item.contact_email}</span>
                </Button>
            </CardContent>
        </Card>
        <p className="text-xs text-gray-500 text-right">Posted {item.created_date}</p>
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
  const [lostItems, setLostItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState('all-types');
  const [statusFilter, setStatusFilter] = useState('active');
  const [timeFilter, setTimeFilter] = useState('all-time');
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadItems() {
      try {
        const data = await fetchLostItems();
        setLostItems(data || []);
      } catch {
        setLostItems([]);
      } finally {
        setLoading(false);
      }
    }
    loadItems();
  }, []);

  function filterItems(items: any[]) {
    let filtered = items;

    // Type filter
    if (typeFilter !== 'all-types') {
      filtered = filtered.filter(item => item.type === typeFilter);
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(item => item.status === statusFilter);
    }

    // Time filter
    if (timeFilter !== 'all-time') {
      const now = new Date();
      filtered = filtered.filter(item => {
        const created = new Date(item.created_date);
        if (timeFilter === 'last-24h') return (now.getTime() - created.getTime()) < 24 * 60 * 60 * 1000;
        if (timeFilter === 'last-7d') return (now.getTime() - created.getTime()) < 7 * 24 * 60 * 60 * 1000;
        if (timeFilter === 'last-30d') return (now.getTime() - created.getTime()) < 30 * 24 * 60 * 60 * 1000;
        return true;
      });
    }

    // Search filter
    if (search.trim()) {
      filtered = filtered.filter(item =>
        item.title?.toLowerCase().includes(search.toLowerCase()) ||
        item.description?.toLowerCase().includes(search.toLowerCase())
      );
    }

    return filtered;
  }

  const totalPosts = lostItems.length;
  const lostCount = lostItems.filter(item => item.type === 'lost').length;
  const foundCount = lostItems.filter(item => item.type === 'found').length;
  const reunitedCount = lostItems.filter(item => item.status === 'reunited').length;

  return (
    <ContentWrapper className="bg-gray-50/50">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold font-headline text-center">Lost &amp; Found</h2>
        <p className="mt-2 text-center text-muted-foreground mb-8 max-w-2xl mx-auto">Help reunite our community with their belongings</p>
      </div>

      <CreditBanner />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-blue-100">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-blue-800">{totalPosts}</p>
            <p className="text-sm font-medium text-blue-800">Total Posts</p>
          </CardContent>
        </Card>
        <Card className="bg-red-100">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-red-800">{lostCount}</p>
            <p className="text-sm font-medium text-red-800">Lost Items</p>
          </CardContent>
        </Card>
        <Card className="bg-green-100">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-green-800">{foundCount}</p>
            <p className="text-sm font-medium text-green-800">Found Items</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-100">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-gray-800">{reunitedCount}</p>
            <p className="text-sm font-medium text-gray-800">Reunited</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search lost & found items..."
            className="pl-10 w-full bg-white"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
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
        <Select defaultValue="all-types" onValueChange={setTypeFilter}>
          <SelectTrigger className="w-auto md:w-[180px] bg-white">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-types">All</SelectItem>
            <SelectItem value="lost">Lost</SelectItem>
            <SelectItem value="found">Found</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="active" onValueChange={setStatusFilter}>
          <SelectTrigger className="w-auto md:w-[180px] bg-white">
            <SelectValue placeholder="Active" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="reunited">Reunited</SelectItem>
            <SelectItem value="all">All</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all-time" onValueChange={setTimeFilter}>
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
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            {loading ? (
              <div>Loading...</div>
            ) : filterItems(lostItems).length === 0 ? (
              <div>No items have been reported yet.</div>
            ) : (
              filterItems(lostItems).map(item => <LostItemCard key={item.id} item={item} />)
            )}
          </div>
        </TabsContent>
        <TabsContent value="lost-items">
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            {loading ? (
              <div>Loading...</div>
            ) : filterItems(lostItems.filter(item => item.type === 'lost')).length === 0 ? (
              <div>No lost items found.</div>
            ) : (
              filterItems(lostItems.filter(item => item.type === 'lost')).map(item => <LostItemCard key={item.id} item={item} />)
            )}
          </div>
        </TabsContent>
        <TabsContent value="found-items">
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            {loading ? (
              <div>Loading...</div>
            ) : filterItems(lostItems.filter(item => item.type === 'found')).length === 0 ? (
              <div>No found items to display.</div>
            ) : (
              filterItems(lostItems.filter(item => item.type === 'found')).map(item => <LostItemCard key={item.id} item={item} />)
            )}
          </div>
        </TabsContent>
      </Tabs>
    </ContentWrapper>
  );
}
