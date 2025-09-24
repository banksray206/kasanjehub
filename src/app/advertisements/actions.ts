import { supabase } from '@/lib/supabase';

export async function fetchAdvertisements() {
  const { data, error } = await supabase
    .from('adverts') // Make sure your table is named 'adverts'
    .select('*')
    .order('created_date', { ascending: false });
  if (error) throw error;
  return data;
}