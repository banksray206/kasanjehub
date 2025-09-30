import { supabase } from '@/lib/supabase';

export async function fetchProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_dt', { ascending: false });
  if (error) throw error;
  return data;
}

