
'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Heart, MessageCircle, Share2, Image as ImageIcon, Video, Smile } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/hooks/use-auth';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import CreditBanner from '../credit-banner';
import { formatDistanceToNow } from 'date-fns';

const feedItems = [
    {
        id: '68c0ab73ef92e596002d499d',
        author: 'Lisa Chen',
        avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
        timestamp: new Date('2025-09-09T22:34:27.971Z'),
        content: "Amazing turnout at yesterday's local business networking event! Met so many inspiring entrepreneurs in our community. Let's keep supporting each other! 💪",
        likes: 18,
        comments: 6,
        media: null,
    },
    {
        id: '68c0ab73ef92e596002d499c',
        author: 'Mike Rodriguez',
        avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
        timestamp: new Date('2025-09-09T22:34:27.971Z'),
        content: "Looking for recommendations for a reliable plumber in the neighborhood. Our bathroom sink has been leaking and I'd prefer to hire someone local. Thanks in advance! 🛠️",
        likes: 5,
        comments: 12,
        media: null,
    },
    {
        id: '68c0ab73ef92e596002d499b',
        author: 'Community Center',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
        timestamp: new Date('2025-09-09T22:34:27.971Z'),
        content: "📢 Announcement: Free coding workshop for kids ages 10-14 this Sunday at the community center. Limited spots available. Register by calling 555-1234 or sending us a message!",
        likes: 42,
        comments: 16,
        media: null,
    },
    {
        id: '68c0ab73ef92e596002d499a',
        author: 'Sarah Johnson',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
        timestamp: new Date('2025-09-09T22:34:27.971Z'),
        content: "Just finished setting up my new stand at the weekend market! Stop by for fresh organic produce from our family farm. We'll be there every Saturday from 8am-2pm. 🍓🥕",
        likes: 24,
        comments: 8,
        media: {
            type: 'image',
            url: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600',
        },
    },
    {
        id: '68c0adec44eada7dedc5c827',
        author: 'Peter Kiwanuka',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
        timestamp: new Date('2025-09-09T22:45:00.955Z'),
        content: "🏡 LAND FOR SALE in Buyege! Prime 50x100 plot with land title ready. Perfect location near the main road, close to schools and hospital. Asking price 45 million UGX negotiable. Serious buyers only. Contact me on 0756 890 123 or visit the plot on weekends. #LandForSale #Buyege",
        likes: 67,
        comments: 19,
        media: null,
    },
    {
        id: '68c0adec44eada7dedc5c826',
        author: 'Hassan Ssali',
        avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
        timestamp: new Date('2025-09-09T22:45:00.955Z'),
        content: "🏗️ JOB OPPORTUNITY: Looking for 5 hardworking men for construction work in Kasanje area. Daily pay 25,000 UGX. Must be available Monday to Friday, 7:00 AM - 5:00 PM. Experience preferred but training provided. Call Hassan on 0701 234 567. #JobsInKasanje",
        likes: 78,
        comments: 34,
        media: null,
    },
    {
        id: '68c0adec44eada7dedc5c82e',
        author: 'Emmanuel & Rose',
        avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
        timestamp: new Date('2025-09-09T22:45:00.955Z'),
        content: "💌 WEDDING INVITATION: You are cordially invited to the wedding ceremony of Emmanuel & Rose on December 30th, 2024, at St. Mary's Church Kasanje, 2:00 PM. Reception follows at Golden Tulip Hotel. Your presence will make our day special! #Wedding #KasanjeWedding 💖",
        likes: 128,
        comments: 89,
        media: null,
    },
    {
        id: '68c0adec44eada7dedc5c82a',
        author: 'Dr. Sarah Namukasa',
        avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
        timestamp: new Date('2025-09-09T22:45:00.955Z'),
        content: "👩‍⚕️ FREE MEDICAL CAMP this Sunday at Kasanje Health Center! Free checkups, blood pressure tests, malaria testing, and health consultations. Doctors from Mulago Hospital will be available 9:00 AM - 4:00 PM. Bring your family! Sponsored by Kasanje Community Development. 🏥",
        likes: 156,
        comments: 67,
        media: null,
    },
    {
        id: '68c0adec44eada7dedc5c82b',
        author: 'John Ssebunya',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
        timestamp: new Date('2025-09-09T22:45:00.955Z'),
        content: "🐄 COW FOR SALE! Healthy Friesian cow, good milk producer (15 liters per day). 3 years old, all vaccinations up to date. Selling due to relocation. Price 1.8 million UGX. Located in Buyege. Serious buyers call 0704 123 456. First come, first served! #CowForSale #Livestock",
        likes: 43,
        comments: 15,
        media: null,
    },
    {
        id: '68c0adec44eada7dedc5c830',
        author: 'Mary Nantongo',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
        timestamp: new Date('2025-09-09T22:45:00.955Z'),
        content: "📚 LOST: My son's school bag containing S2 books and homework. Lost somewhere between Kasanje and Buyege yesterday evening. Blue bag with 'St. Joseph College' written on it. Please call 0798 234 567 if found. Reward offered! 🎒 #Lost #SchoolBag",
        likes: 56,
        comments: 12,
        media: null,
    },
    {
        id: '68c0adec44eada7dedc5c829',
        author: 'Moses Lubega',
        avatarUrl: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=40&h=40&fit=crop&crop=face',
        timestamp: new Date('2025-09-09T22:45:00.955Z'),
        content: "🏍️ BODA BODA DRIVERS WANTED! New stage opening at Kasanje Trading Center. Looking for reliable riders with their own motorcycles. Good money, busy location. Stage fee 2,000 UGX per day. Contact Chairman Moses on 0772 345 678. Come with your documents! #BodaBodaJobs",
        likes: 89,
        comments: 42,
        media: null,
    },
    {
        id: '68c0adec44eada7dedc5c82d',
        author: 'Grace Namatovu',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
        timestamp: new Date('2025-09-09T22:45:00.955Z'),
        content: "🎓 PRIVATE TUITION AVAILABLE! Experienced teacher offering mathematics, English, and science lessons for Primary 4-7 and S1-S4 students. Home visits available in Kasanje and surrounding areas. 15,000 UGX per hour. Call Teacher Grace on 0775 678 901. Help your children excel! #PrivateTuition",
        likes: 67,
        comments: 23,
        media: null,
    },
    {
        id: '68c0adec44eada7dedc5c82f',
        author: 'Joyce Nalubega',
        avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
        timestamp: new Date('2025-09-09T22:45:00.955Z'),
        content: "🍲 ROLEX AND CHICKEN AVAILABLE! Fresh rolex (chapati with eggs) and grilled chicken every evening from 5:00 PM at Kasanje Trading Center. Best prices in town - Rolex 2,500 UGX, Chicken 8,000 UGX. Come hungry, leave satisfied! Mama Joyce's Food Stand. #FoodVendor #EveningSnacks",
        likes: 94,
        comments: 27,
        media: null,
    },
    {
        id: '68c0adec44eada7dedc5c825',
        author: 'Margaret Nakato',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
        timestamp: new Date('2025-09-09T22:45:00.955Z'),
        content: "😢 It is with heavy hearts that we announce the passing of our beloved Mzee Joseph Mukasa. The burial will be on Saturday at 2:00 PM in Kasanje. We need 5 strong men to help with preparations and digging. Please contact 0782 456 789 if you can assist. May his soul rest in peace. 🙏",
        likes: 45,
        comments: 23,
        media: null,
    },
    {
        id: '68c0adec44eada7dedc5c82c',
        author: 'Local Council Chairman',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
        timestamp: new Date('2025-09-09T22:45:00.955Z'),
        content: "⚠️ SECURITY ALERT: There have been reports of thieves in the Kasanje area targeting homes at night. Please ensure your gates are locked and report any suspicious activity to local authorities. Let's work together to keep our community safe. Contact LC1 Chairman on 0789 012 345. #CommunitySafety",
        likes: 201,
        comments: 58,
        media: null,
    },
    {
        id: '68c0adec44eada7dedc5c828',
        author: 'Karim Wasswa',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face',
        timestamp: new Date('2025-09-09T22:45:00.955Z'),
        content: "🛠️ PLUMBER SERVICES AVAILABLE! Experienced plumber available for all your water and drainage needs. Pipe repairs, toilet installations, water tank connections, and more. Quick service, fair prices. Call Karim on 0783 567 890. Available 7 days a week! #PlumberServices #Kasanje",
        likes: 32,
        comments: 8,
        media: null,
    },
    {
        id: '68c0afc75e7585b00f595831',
        author: 'Kawooya Raymond',
        avatarUrl: null,
        timestamp: new Date('2025-09-09T22:52:55.220Z'),
        content: "I love you alll",
        likes: 0,
        comments: 0,
        media: null,
    },
    {
        id: '68c9bb80af1140d4e275cb66',
        author: 'Ministry of Health Uganda',
        avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=40&h=40&fit=crop&crop=face',
        timestamp: new Date('2025-09-16T19:33:20.871Z'),
        content: "🏥 VACCINATION DRIVE: Free COVID-19 and flu vaccines available at Kasanje Health Center this weekend! Bring your vaccination cards. Walk-ins welcome from 8:00 AM to 4:00 PM. Let's stay healthy together! #VaccinationDrive #HealthFirst",
        likes: 89,
        comments: 34,
        media: {
            type: 'image',
            url: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=600',
        },
    },
    {
        id: '68c9bb80af1140d4e275cb67',
        author: 'Kasanje Kitchen',
        avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face',
        timestamp: new Date('2025-09-16T19:33:20.871Z'),
        content: "🍕 NEW RESTAURANT OPENING! Come try our delicious wood-fired pizzas and local fusion dishes at Kasanje Kitchen. Grand opening this Friday with 30% off all meals! Located next to the trading center. #NewRestaurant #FoodLovers",
        likes: 156,
        comments: 67,
        media: {
            type: 'image',
            url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600',
        },
    },
    {
        id: '68c9bb80af1140d4e275cb68',
        author: 'Kasanje Community Garden',
        avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
        timestamp: new Date('2025-09-16T19:33:20.871Z'),
        content: "🌱 VEGETABLE GARDEN SUCCESS! Look at our community garden harvest this season! Fresh tomatoes, onions, and leafy greens available for sale. Contact our garden committee for bulk orders. Proud of what we've achieved together! #CommunityGarden #FreshVegetables",
        likes: 203,
        comments: 45,
        media: {
            type: 'image',
            url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600',
        },
    },
    {
        id: '68c9bb80af1140d4e275cb69',
        author: "Patrick's Auto Care",
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
        timestamp: new Date('2025-09-16T19:33:20.871Z'),
        content: "🚗 CAR WASH & DETAILING SERVICES now available in Kasanje! Professional cleaning, waxing, and interior detailing. Affordable prices starting at 25,000 UGX. Call Patrick on 0778 123 456 to book your appointment. #CarWash #AutoCare",
        likes: 78,
        comments: 23,
        media: {
            type: 'image',
            url: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=600',
        },
    },
    {
        id: '68c9bb80af1140d4e275cb6a',
        author: 'Kasanje Education Committee',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
        timestamp: new Date('2025-09-16T19:33:20.871Z'),
        content: "📚 LITERACY PROGRAM UPDATE: Thanks to everyone who donated books! Our community library now has over 500 books for children and adults. Reading sessions every Saturday 2-4 PM. Special thanks to Kampala Book Club for the donation! #CommunityLibrary #Education",
        likes: 134,
        comments: 29,
        media: {
            type: 'image',
            url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600',
        },
    },
    {
        id: '68c9bb80af1140d4e275cb6b',
        author: 'Kasanje United FC',
        avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
        timestamp: new Date('2025-09-16T19:33:20.871Z'),
        content: "⚽ FOOTBALL MATCH RESULTS! Kasanje United 3 - 1 Buyege Stars! What an amazing match yesterday. Thanks to everyone who came to support. Next home game is Saturday against Wakiso Warriors. See you at the pitch! ⚽ #KasanjeUnited #LocalFootball",
        likes: 267,
        comments: 89,
        media: {
            type: 'image',
            url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600',
        },
    },
    {
        id: '68c9bb80af1140d4e275cb6c',
        author: 'Kasanje Weather Station',
        avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40&h=40&fit=crop&crop=face',
        timestamp: new Date('2025-09-16T19:33:20.871Z'),
        content: "🌧️ WEATHER ALERT: Heavy rains expected this week. Please take precautions - clear drainage channels around your homes, secure loose items, and avoid unnecessary travel during storms. Stay safe, Kasanje! #WeatherAlert #SafetyFirst",
        likes: 145,
        comments: 52,
        media: {
            type: 'image',
            url: 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=600',
        },
    },
    {
        id: '68c9bb80af1140d4e275cb6d',
        author: 'Kasanje Secondary School',
        avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
        timestamp: new Date('2025-09-16T19:33:20.871Z'),
        content: "🎓 GRADUATION CELEBRATION! Congratulations to all 25 students from Kasanje Secondary School who passed their O-Level exams with excellent grades! The community is proud of you. Special ceremony this Sunday at 3 PM. #ProudMoments #Education",
        likes: 189,
        comments: 74,
        media: {
            type: 'image',
            url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600',
        },
    },
    {
        id: '68c9bd0d0655b02890644d2c',
        author: 'KAWOOYA RAYMOND',
        avatarUrl: null,
        timestamp: new Date('2025-09-16T19:39:57.013Z'),
        content: "Please Everyone Use this platform to express everything you want in the community feel free to ask",
        likes: 0,
        comments: 0,
        media: {
            type: 'image',
            url: 'https://base44.app/api/apps/68c0aac44b28ad4b79f3b698/files/public/68c0aac44b28ad4b79f3b698/2b7376ca4_pexels-photobymau-photobymau-2154512590-33629176.jpg',
        },
    },
    {
        id: '68cdcf10687afe655dbb0ef3',
        author: 'KAWOOYA RAYMOND',
        avatarUrl: 'https://base44.app/api/apps/68c0aac44b28ad4b79f3b698/files/public/68c0aac44b28ad4b79f3b698/ec8c6453c_clothingF.jpg',
        timestamp: new Date('2025-09-19T21:45:52.832Z'),
        content: "Meet Mother, a dedicated and passionate individual running for Councilor! With her commitment to our community and vision for a brighter future, she deserves your support. Let's work together to make a difference! Vote Mother for Councilor! #VoteMother #Nup#OurPowerPeoplePower#CouncilorElection",
        likes: 0,
        comments: 0,
        media: {
            type: 'image',
            url: 'https://base44.app/api/apps/68c0aac44b28ad4b79f3b698/files/public/68c0aac44b28ad4b79f3b698/5931340c9_WhatsAppImage2025-09-20at124457AM.jpeg',
        },
    },
    {
        id: '68ce228b678e5c9774992a86',
        author: 'kasanjeclick',
        avatarUrl: 'https://base44.app/api/apps/68c0aac44b28ad4b79f3b698/files/public/68c0aac44b28ad4b79f3b698/d5bdaff6f_1000181169.jpg',
        timestamp: new Date('2025-09-20T03:42:03.926Z'),
        content: "Good morning everyone I want to create a community WhatsApp",
        likes: 0,
        comments: 0,
        media: null,
    },
    {
        id: '68cf2ce8a5a350341b22eedf',
        author: 'kasanjeclick',
        avatarUrl: 'https://base44.app/api/apps/68c0aac44b28ad4b79f3b698/files/public/68c0aac44b28ad4b79f3b698/d5bdaff6f_1000181169.jpg',
        timestamp: new Date('2025-09-20T22:38:32.411Z'),
        content: "Let's have a party today",
        likes: 0,
        comments: 0,
        media: {
            type: 'image',
            url: 'https://base44.app/api/apps/68c0aac44b28ad4b79f3b698/files/public/68c0aac44b28ad4b79f3b698/ef15f9222_FB_IMG_1758118463796.jpg',
        },
    },
    {
        id: '68cf69391a51780446d417aa',
        author: 'kasanjeclick',
        avatarUrl: 'https://base44.app/api/apps/68c0aac44b28ad4b79f3b698/files/public/68c0aac44b28ad4b79f3b698/d5bdaff6f_1000181169.jpg',
        timestamp: new Date('2025-09-21T02:55:53.100Z'),
        content: "Hello everyone",
        likes: 0,
        comments: 0,
        media: null,
    },
].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());


function CreatePostCard() {
  const [postContent, setPostContent] = useState('');
  const { user } = useAuth();
  
  const avatar = user ? PlaceHolderImages.find(p => p.id === 'avatar-1') : null;

  if (!user) {
    return (
        <Card>
            <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">
                    Please{' '}
                    <Link href="/login" className="font-semibold text-primary hover:underline">
                        log in
                    </Link>
                    {' '}to create a post.
                </p>
            </CardContent>
        </Card>
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="cursor-pointer hover:bg-muted">
          <CardContent className="p-4">
            <div className="flex gap-4 items-center">
              <Avatar>
                {avatar && <AvatarImage src={avatar.imageUrl} alt="Your avatar" data-ai-hint="person portrait" />}
                <AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-grow text-muted-foreground">
                What's on your mind?
              </div>
              <Button>Post</Button>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
        </DialogHeader>
        <div className="flex gap-4">
          <Avatar>
            <AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <Textarea 
            placeholder="What's on your mind?"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            className="flex-grow bg-muted border-none focus-visible:ring-1 focus-visible:ring-ring"
            rows={5}
          />
        </div>
        <div className="mt-4 flex justify-between items-center">
            <div className="flex gap-2 text-muted-foreground">
                <Button variant="ghost" size="icon" className="hover:bg-blue-100 hover:text-blue-600">
                    <ImageIcon className="h-6 w-6"/>
                </Button>
                 <Button variant="ghost" size="icon" className="hover:bg-green-100 hover:text-green-600">
                    <Video className="h-6 w-6"/>
                </Button>
                 <Button variant="ghost" size="icon" className="hover:bg-yellow-100 hover:text-yellow-600">
                    <Smile className="h-6 w-6"/>
                </Button>
            </div>
            <Button disabled={!postContent.trim()}>Post</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}


export default function NewfeedSection() {
  return (
    <div className="space-y-6">
      <CreditBanner />
      <CreatePostCard />

      {feedItems.map((item) => {
        const timeAgo = formatDistanceToNow(new Date(item.timestamp), { addSuffix: true });
        
        return (
          <Card key={item.id}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar>
                  {item.avatarUrl && <AvatarImage src={item.avatarUrl} alt={item.author} />}
                  <AvatarFallback>{item.author.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{item.author}</span>
                    <span className="text-sm text-muted-foreground">{timeAgo}</span>
                  </div>
                  <p className="mt-2 text-foreground/90 whitespace-pre-wrap">{item.content}</p>

                  {item.media && (
                    <div className="mt-4 rounded-lg overflow-hidden border">
                      {item.media.type === 'image' && item.media.url && (
                        <Image
                            src={item.media.url}
                            alt="Feed item media"
                            width={800}
                            height={450}
                            className="object-cover w-full"
                        />
                      )}
                      {item.media.type === 'video' && item.media.url &&(
                        <video controls className="w-full">
                            <source src={item.media.url} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                      )}
                    </div>
                  )}

                  <div className="flex items-center gap-6 mt-4 text-muted-foreground">
                    <button className="flex items-center gap-2 hover:text-primary transition-colors">
                      <Heart className="h-5 w-5" />
                      <span>{item.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-primary transition-colors">
                      <MessageCircle className="h-5 w-5" />
                      <span>{item.comments}</span>
                    </button>
                    <button className="flex items-center gap-2 hover:text-primary transition-colors">
                      <Share2 className="h-5 w-5" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

    