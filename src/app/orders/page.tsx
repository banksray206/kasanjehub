'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/lib/supabase';
import { cancelOrder } from '@/app/products/actions';

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .then(({ data }) => setOrders(data || []));
    }
  }, [user]);

  const handleCancel = async (orderId: string) => {
    await cancelOrder(orderId);
    setOrders(orders => orders.map(o => o.id === orderId ? { ...o, status: 'cancelled' } : o));
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      <table className="w-full border">
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Created</th>
            <th>Expires</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.status}</td>
              <td>{order.created_at && new Date(order.created_at).toLocaleString()}</td>
              <td>{order.expires_at ? new Date(order.expires_at).toLocaleDateString() : '-'}</td>
              <td>
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