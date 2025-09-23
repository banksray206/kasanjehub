'use client';

import { useState, useEffect } from 'react';
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
import { fetchPosts } from '@/app/newfeed/actions';

function CreatePostCard() {
  const [postContent, setPostContent] = useState('');
  const { user } = useAuth();

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
            <Button variant="ghost" size="icon" className="hover:bg-blue-100 hover:text-blue-600">
              <ImageIcon className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-green-100 hover:text-green-600">
              <Video className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-yellow-100 hover:text-yellow-600">
              <Smile className="h-6 w-6" />
            </Button>
          </div>
          <Button disabled={!postContent.trim()}>Post</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function NewfeedSection() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await fetchPosts();
        setPosts(data || []);
      } catch (err) {
        setPosts([]);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  return (
    <div className="space-y-6">
      <CreditBanner />
      <CreatePostCard />

      {loading ? (
        <div className="text-center text-muted-foreground">Loading posts...</div>
      ) : posts.length === 0 ? (
        <div className="text-center text-muted-foreground">No posts found.</div>
      ) : (
        posts.map((item) => {
          const timeAgo = formatDistanceToNow(new Date(item.created_date), { addSuffix: true });
          return (
            <Card key={item.id}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar>
                    {item.avatar_url && <AvatarImage src={item.avatar_url} alt={item.author || item.user_id} />}
                    <AvatarFallback>{(item.author || item.user_id || 'U')[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-grow">
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{item.author || item.user_id || 'Unknown'}</span>
                      <span className="text-sm text-muted-foreground">{timeAgo}</span>
                    </div>
                    <p className="mt-2 text-foreground/90 whitespace-pre-wrap">{item.content || item.description}</p>

                    {item.image_url && (
                      <div className="mt-4 rounded-lg overflow-hidden border">
                        <Image
                          src={item.image_url}
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
                        <span>{item.likes ?? 0}</span>
                      </button>
                      <button className="flex items-center gap-2 hover:text-primary transition-colors">
                        <MessageCircle className="h-5 w-5" />
                        <span>{item.comments ?? 0}</span>
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
        })
      )}
    </div>
  );
}

