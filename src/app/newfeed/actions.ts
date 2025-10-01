import { supabase } from '@/lib/supabase';

export async function fetchPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false  }); // Use your actual date column
  if (error) throw error;
  return data;
}

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