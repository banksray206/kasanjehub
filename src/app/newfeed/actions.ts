import { supabase } from '@/lib/supabase';

// Fetch posts and mer1q``qq`11ge with profile info
export async function fetchPostsWithProfiles() {
  // Fetch posts
  const { data: posts, error: postsError } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });
  if (postsError) throw postsError;

  // Fetch profiles
  const { data: profiles, error: profilesError } = await supabase
    .from('profile')
    .select('id, full_name, avatar_url');
  if (profilesError) throw profilesError;

  // Merge profile info into posts
  const postsWithProfiles = posts.map(post => {
    const profile = profiles.find(p => p.id === post.user_id);
    return {
      ...post,
      full_name: profile?.full_name || '',
      avatar_url: profile?.avatar_url || '',
    };
  });

  return postsWithProfiles;
}

// Create post (unchanged)
export async function createPost({
  content,
  user_id,
  author,
  image_url,
  video_url,
  sticker_url,
}: {
  content: string;
  user_id: string;
  author: string;
  image_url?: string;
  video_url?: string;
  sticker_url?: string;
}) {
  const { data, error } = await supabase
    .from('posts')
    .insert([{ content, user_id, author, image_url, video_url, sticker_url }])
    .select()
    .single();
  if (error) throw error;
  return data;
}