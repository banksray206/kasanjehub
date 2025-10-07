'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/lib/supabase';
import { cancelOrder } from '@/app/products/actions';

function getCountdown(expiresAt: string) {
  const now = new Date();
  const expires = new Date(expiresAt);
  const diff = expires.getTime() - now.getTime();
  if (diff <= 0) return 'Expired';
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  return `${days}d ${hours}h ${minutes}m`;
}

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .then(({ data }) => setOrders(data || []));
    }
  }, [user]);

  const handleCancel = async (orderId: string) => {
    await cancelOrder(orderId);
    setOrders(orders => orders.map(o => o.id === orderId ? { ...o, status: 'cancelled' } : o));
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="py-2">Order ID</th>
            <th className="py-2">Status</th>
            <th className="py-2">Created</th>
            <th className="py-2">Expires In</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id} className="border-t">
              <td className="py-2">{order.id}</td>
              <td className="py-2">{order.status}</td>
              <td className="py-2">{order.created_at && new Date(order.created_at).toLocaleString()}</td>
              <td className="py-2">
                {order.status === 'confirmed' && order.expires_at
                  ? getCountdown(order.expires_at)
                  : '-'}
              </td>
              <td className="py-2">
                {order.status === 'pending' && (
                  <button onClick={() => handleCancel(order.id)} className="text-red-600">Cancel</button>
                )}
                {order.status === 'confirmed' && <span>Confirmed</span>}
                {order.status === 'cancelled' && <span>Cancelled</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}