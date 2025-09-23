import { supabase } from '@/lib/supabase';

export async function fetchPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false }); // Use your actual date column
  if (error) throw error;
  return data;
}