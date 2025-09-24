import { supabase } from '@/lib/supabase';

export async function fetchLostItems() {
  const { data, error } = await supabase
    .from('lost_found') // Use your actual table name
    .select('*')
    .order('created_date', { ascending: false }); // Use your actual date column
  if (error) throw error;
  return data;
}