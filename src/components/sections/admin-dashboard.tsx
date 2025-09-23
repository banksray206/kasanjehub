
'use client';

import * as React from 'react';
import {
  ChevronsLeft,
  ChevronsRight,
  LayoutDashboard,
  Users,
  Package,
  FileText,
  ShoppingCart,
  MessageSquare,
  Search,
  Bell,
  Volume2,
  BarChart2,
  Globe,
  Shield,
  PlusCircle,
  MoreHorizontal,
  Trash2,
  Edit,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '../ui/badge';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const products = [
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

const messages = [
  { sender: 'Nalwoga Sarah', receiver: 'KAWOOYA RAYMOND', content: 'Hey, are you available to chat?', is_read: false, conversation_id: '1', time: '10:25 AM' },
  { sender: 'KAWOOYA RAYMOND', receiver: 'Nalwoga Sarah', content: 'Hi Sarah, yes I am. What\'s up?', is_read: true, conversation_id: '1', time: '10:26 AM' },
  { sender: 'Nalwoga Sarah', receiver: 'KAWOOYA RAYMOND', content: 'I saw your listing for the computer classes. I\'m interested!', is_read: false, conversation_id: '1', time: '10:28 AM' },
  { sender: 'Nalwoga Sarah', receiver: 'KAWOOYA RAYMOND', content: 'Could you tell me more about the schedule?', is_read: false, conversation_id: '1', time: '10:28 AM' },
  { sender: 'KAWOOYA RAYMOND', receiver: 'Nalwoga Sarah', content: 'Of course. We have classes on weekdays from 4 PM to 6 PM, and on weekends from 10 AM to 1 PM.', is_read: true, conversation_id: '1', time: '10:29 AM' },
  { sender: 'Nalwoga Sarah', receiver: 'KAWOOYA RAYMOND', content: 'Okay, I will check it out.', is_read: false, conversation_id: '1', time: '10:30 AM' },
  { sender: 'Ssebugwawo Peter', receiver: 'KAWOOYA RAYMOND', content: 'Meeting confirmed for 2 PM tomorrow.', is_read: true, conversation_id: '2', time: 'Yesterday' },
  { sender: 'KAWOOYA RAYMOND', receiver: 'Ssebugwawo Peter', content: 'Sounds good. See you then!', is_read: true, conversation_id: '2', time: 'Yesterday' },
];


const dataModels = [
  'Product',
  'Post',
  'CartItem',
  'Order',
  'Comment',
  'LostFound',
  'Notification',
  'Advertisement',
  'Message',
];

const modelConfig: Record<string, { columns: string[], data: any[] }> = {
    Product: {
        columns: ['Image', 'Name', 'Category', 'Price', 'Rating', 'Actions'],
        data: products,
    },
    Message: {
        columns: ['Sender', 'Receiver', 'Content', 'Status', 'Time', 'Actions'],
        data: messages,
    }
}

const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-gray-500">No records found</p>
        <Button variant="outline" className="mt-4">
            <PlusCircle className="mr-2 h-4 w-4" /> Add your first record
        </Button>
    </div>
);

export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const [selectedModel, setSelectedModel] = React.useState('Product');
  
  const currentConfig = modelConfig[selectedModel];
  const data = currentConfig?.data || [];
  const columns = currentConfig?.columns || [];

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <aside
        className={`bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-all duration-300 ${
          isSidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          {isSidebarOpen && <h1 className="text-xl font-bold">Dashboard</h1>}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <ChevronsLeft /> : <ChevronsRight />}
          </Button>
        </div>
        <nav className="flex-grow p-2 space-y-1">
          <a
            href="#"
            className="flex items-center px-4 py-2 text-gray-700 bg-gray-200 dark:text-gray-200 dark:bg-gray-700 rounded-md"
          >
            <LayoutDashboard className="mr-3" />
            {isSidebarOpen && <span>Overview</span>}
          </a>
          <a
            href="#"
            className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
          >
            <Users className="mr-3" />
            {isSidebarOpen && <span>Users</span>}
          </a>
          <div className="pt-2">
            <h2
              className={`px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider ${
                !isSidebarOpen && 'text-center'
              }`}
            >
              {isSidebarOpen ? 'Data' : 'Data'}
            </h2>
            <div className="mt-1 space-y-1">
              {dataModels.map((model) => (
                <a
                  key={model}
                  href="#"
                  onClick={() => setSelectedModel(model)}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                    selectedModel === model
                      ? 'text-blue-600 bg-blue-100 dark:text-blue-300 dark:bg-blue-900/50'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {React.createElement(
                    {
                      Product: Package,
                      Post: FileText,
                      CartItem: ShoppingCart,
                      Order: ShoppingCart,
                      Comment: MessageSquare,
                      LostFound: Search,
                      Notification: Bell,
                      Advertisement: Volume2,
                      Message: MessageSquare,
                    }[model] || Package,
                    { className: 'mr-3 flex-shrink-0' }
                  )}
                  {isSidebarOpen && <span>{model}</span>}
                </a>
              ))}
            </div>
          </div>
           <div className="pt-2">
            <h2
              className={`px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider ${
                !isSidebarOpen && 'text-center'
              }`}
            >
              {isSidebarOpen ? 'Tools' : ''}
            </h2>
             <a
            href="#"
            className="flex items-center px-4 py-2 mt-1 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
          >
            <BarChart2 className="mr-3" />
            {isSidebarOpen && <span>Analytics</span>}
          </a>
          <a
            href="#"
            className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
          >
            <Globe className="mr-3" />
            {isSidebarOpen && <span>Domains</span>}
          </a>
           <a
            href="#"
            className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
          >
            <Shield className="mr-3" />
            {isSidebarOpen && <span>Security</span>}
          </a>
           </div>
        </nav>
      </aside>
      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">{selectedModel}</h1>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Add
            </Button>
          </div>
        </div>
        <Card>
          <CardHeader>
             <CardTitle>Manage {selectedModel}s</CardTitle>
             <CardDescription>
              A list of all the {selectedModel.toLowerCase()}s in your application.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {data.length > 0 ? (
                 <Table>
                    <TableHeader>
                        <TableRow>
                            {columns.map((col) => <TableHead key={col}>{col}</TableHead>)}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {selectedModel === 'Product' && data.map((product) => {
                            const image = PlaceHolderImages.find(p => p.id === product.imageId);
                            return (
                                <TableRow key={product.id}>
                                    <TableCell>
                                        {image ? (
                                             <Image src={image.imageUrl} alt={product.name} width={40} height={40} className="rounded-md object-cover" />
                                        ) : <div className="w-10 h-10 bg-muted rounded-md"/>}
                                    </TableCell>
                                    <TableCell className="font-medium">{product.name}</TableCell>
                                    <TableCell>
                                        <Badge variant="secondary">{product.category}</Badge>
                                    </TableCell>
                                    <TableCell>UGX {product.price}</TableCell>
                                    <TableCell>{product.rating} ({product.reviewCount})</TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="icon"><Edit className="h-4 w-4"/></Button>
                                            <Button variant="destructive" size="icon"><Trash2 className="h-4 w-4"/></Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                         {selectedModel === 'Message' && data.map((msg, index) => (
                            <TableRow key={index}>
                                <TableCell>{msg.sender}</TableCell>
                                <TableCell>{msg.receiver}</TableCell>
                                <TableCell className="max-w-xs truncate">{msg.content}</TableCell>
                                <TableCell>
                                    <Badge variant={msg.is_read ? 'default': 'secondary'} className={msg.is_read ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                                        {msg.is_read ? 'Read' : 'Unread'}
                                    </Badge>
                                </TableCell>
                                <TableCell>{msg.time}</TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="icon"><Edit className="h-4 w-4"/></Button>
                                        <Button variant="destructive" size="icon"><Trash2 className="h-4 w-4"/></Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                 </Table>
            ) : <EmptyState />}
            {selectedModel !== 'Product' && selectedModel !== 'Message' && <EmptyState />}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
