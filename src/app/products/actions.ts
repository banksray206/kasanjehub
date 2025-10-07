import { supabase } from '@/lib/supabase';

export async function fetchProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_dt', { ascending: false });
  if (error) throw error;
  return data;
}

export async function placeOrder(userId: string, items: any[]) {
  const { data, error } = await supabase
    .from('orders')
    .insert([
      {
        user_id: userId,
        items: items.map(item => ({
          product_id: item.id,
          quantity: item.quantity || 1,
        })),
        status: 'pending',
        created_at: new Date().toISOString(),
      }
    ]);
  if (error) throw error;
  return data;
}

export async function cancelOrder(orderId: string) {
  const { data, error } = await supabase
    .from('orders')
    .update({ status: 'cancelled' })
    .eq('id', orderId)
    .select()
    .single();
  if (error) throw error;
  return data;
}

