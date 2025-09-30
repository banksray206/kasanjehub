'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, MessageCircle, Share2, Image as ImageIcon, Video, Smile } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/hooks/use-auth';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import CreditBanner from '../credit-banner';
import { formatDistanceToNow } from 'date-fns';
import { createPost } from '@/app/newfeed/actions'; // Add this import
import { supabase } from '@/lib/supabase';

type Post = {
  id: string;
  content?: string;
  description?: string;
  image_url?: string;
  created_date?: string;
  author?: string;
  user_id?: string;
  avatar_url?: string;
  likes?: number;
  comments?: number;
};

type Advertisement = {
  id: string;
  title: string;
  description?: string;
  image_url?: string;
  created_date?: string;
};

interface NewfeedSectionProps {
  initialPosts: Post[];
  initialAds: Advertisement[];
}

function CreatePostCard() {
  const [postContent, setPostContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<'image' | 'video' | 'sticker' | null>(null);
  const { user } = useAuth();

  // Add this state to trigger feed refresh if needed
  // const [_, setRefresh] = useState(0);

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
    );
  }

  // Add this handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video' | 'sticker') => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setFileType(type);
    }
  };

  const handleSubmit = async () => {
    if (!postContent.trim() && !file) return;
    setLoading(true);
    let image_url, video_url, sticker_url;

    try {
      // Upload file if present
      if (file && user) {
        const ext = file.name.split('.').pop();
        const filePath = `${user.id}/${Date.now()}.${ext}`;
        const { data, error } = await supabase.storage
          .from('post-media')
          .upload(filePath, file);

        if (error) throw error;

        const { data: publicUrlData } = supabase.storage
          .from('post-media')
          .getPublicUrl(filePath);

        if (fileType === 'image') image_url = publicUrlData.publicUrl;
        if (fileType === 'video') video_url = publicUrlData.publicUrl;
        if (fileType === 'sticker') sticker_url = publicUrlData.publicUrl;
      }

      await createPost({
        content: postContent,
        user_id: user.id,
        author: user.email || 'Anonymous',
        image_url,
        video_url,
        sticker_url,
      });
      setPostContent('');
      setFile(null);
      setFileType(null);
      // Optionally trigger a feed refresh here
      // setRefresh(r => r + 1);
    } catch (err) {
      alert('Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="cursor-pointer hover:bg-muted">
          <CardContent className="p-4">
            <div className="flex gap-4 items-center">
              <Avatar>
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
            {/* Image upload */}
            <Button asChild variant="ghost" size="icon" className="hover:bg-blue-100 hover:text-blue-600">
              <label>
                <ImageIcon className="h-6 w-6" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={e => handleFileChange(e, 'image')}
                />
              </label>
            </Button>
            {/* Video upload */}
            <Button asChild variant="ghost" size="icon" className="hover:bg-green-100 hover:text-green-600">
              <label>
                <Video className="h-6 w-6" />
                <input
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={e => handleFileChange(e, 'video')}
                />
              </label>
            </Button>
            {/* Sticker upload (could be image/gif) */}
            <Button asChild variant="ghost" size="icon" className="hover:bg-yellow-100 hover:text-yellow-600">
              <label>
                <Smile className="h-6 w-6" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={e => handleFileChange(e, 'sticker')}
                />
              </label>
            </Button>
            {file && (
              <span className="text-xs text-green-700 ml-2">{file.name}</span>
            )}
          </div>
          <Button disabled={(!postContent.trim() && !file) || loading} onClick={handleSubmit}>
            {loading ? 'Posting...' : 'Post'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Helper to mix ads into posts
function insertAdsRandomly<T, A>(items: T[], ads: A[], adFrequency = 5): (T | { ad: A })[] {
  const result: (T | { ad: A })[] = [];
  let adIndex = 0;
  for (let i = 0; i < items.length; i++) {
    result.push(items[i]);
    if ((i + 1) % adFrequency === 0 && adIndex < ads.length) {
      result.push({ ad: ads[adIndex++] });
    }
  }
  while (adIndex < ads.length) {
    result.push({ ad: ads[adIndex++] });
  }
  return result;
}

// Advertisement card (distinct style)
function AdvertisementCard({ ad }: { ad: Advertisement & { message?: string } }) {
  return (
    <div className="flex border-2 border-yellow-400 bg-yellow-50 rounded-lg p-4 mb-6 shadow-lg items-center gap-4">
      <div className="flex-shrink-0">
        {ad.image_url ? (
          <img
            src={ad.image_url}
            alt={ad.title}
            width={80}
            height={80}
            className="rounded-lg object-cover border border-yellow-300"
          />
        ) : (
          <div className="w-20 h-20 rounded-lg bg-yellow-100 flex items-center justify-center text-yellow-400 text-3xl font-bold border border-yellow-200">
            AD
          </div>
        )}
      </div>
      <div className="flex flex-col flex-grow">
        <span className="uppercase text-xs font-bold text-yellow-700 tracking-widest mb-1">
          Sponsored
        </span>
        <h3 className="font-semibold text-lg text-yellow-900 mb-1">{ad.title}</h3>
        <p className="text-yellow-800 text-sm mb-1">{ad.description}</p>
        {ad.message && (
          <div className="text-sm text-yellow-900 font-semibold mb-1">{ad.message}</div>
        )}
        <div className="text-xs text-yellow-700 mt-1">
          {ad.created_date ? `Posted: ${ad.created_date}` : 'Sponsored'}
        </div>
      </div>
    </div>
  );
}

// Post card
function PostCard({ post }: { post: Post }) {
  const timeAgo = post.created_date
    ? formatDistanceToNow(new Date(post.created_date), { addSuffix: true })
    : '';
  return (
    <div className="border rounded-lg p-6 mb-6 bg-white shadow">
      <div className="flex items-start gap-4">
        <Avatar>
          {post.avatar_url && <AvatarImage src={post.avatar_url} alt={post.author || post.user_id || 'U'} />}
          <AvatarFallback>{(post.author || post.user_id || 'U')[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-grow">
          <div className="flex items-center gap-2">
            <span className="font-bold">{post.author || post.user_id || 'Unknown'}</span>
            <span className="text-sm text-muted-foreground">{timeAgo}</span>
          </div>
          <p className="mt-2 text-foreground/90 whitespace-pre-wrap">{post.content || post.description}</p>
          {post.image_url && (
            <div className="mt-4 rounded-lg overflow-hidden border">
              <Image
                src={post.image_url}
                alt="Feed item media"
                width={800}
                height={450}
                className="object-cover w-full"
              />
            </div>
          )}
          <div className="flex items-center gap-6 mt-4 text-muted-foreground">
            <button className="flex items-center gap-2 hover:text-primary transition-colors">
              <Heart className="h-5 w-5" />
              <span>{post.likes ?? 0}</span>
            </button>
            <button className="flex items-center gap-2 hover:text-primary transition-colors">
              <MessageCircle className="h-5 w-5" />
              <span>{post.comments ?? 0}</span>
            </button>
            <button className="flex items-center gap-2 hover:text-primary transition-colors">
              <Share2 className="h-5 w-5" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NewfeedSection({ initialPosts, initialAds }: NewfeedSectionProps) {
  const mixedFeed = insertAdsRandomly(initialPosts, initialAds, 5);

  return (
    <div className="space-y-6">
      <CreditBanner />
      <CreatePostCard />
      {mixedFeed.map((item, idx) =>
        'ad' in item ? (
          <AdvertisementCard key={`ad-${item.ad.id}`} ad={item.ad} />
        ) : (
          <PostCard key={item.id} post={item} />
        )
      )}
    </div>
  );
}

