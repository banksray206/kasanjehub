import { supabase } from '@/lib/supabase';

export async function fetchLeaderboard() {
  const { data, error } = await supabase
    .from('profiles')
    .select('full_name, interactions_score, created_at, updated_at')
    .order('interactions_score', { ascending: false });
  if (error) throw error;
  return data;
}