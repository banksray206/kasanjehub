import { supabase } from '@/lib/supabase';

export async function fetchUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles') // or 'users', depending on your table name
    .select('*')
    .eq('id', userId) // or .eq('user_id', userId) if your PK is user_id
    .single();
  if (error) throw error;
  return data;
}