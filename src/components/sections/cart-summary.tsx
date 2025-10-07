'use client';

import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function CartSummary() {
  const { cart, removeFromCart, clearCart } = useCart();
  const router = useRouter();

  if (cart.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="bg-white rounded shadow p-4">
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="py-2">Product</th>
            <th className="py-2">Price</th>
            <th className="py-2">Quantity</th>
            <th className="py-2"></th>
          </tr>
        </thead>
        <tbody>
          {cart.map(item => (
            <tr key={item.id} className="border-t">
              <td className="py-2 flex items-center gap-3">
                {item.image_url && (
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-12 h-12 object-cover rounded"
                  />
                )}
                <span>{item.title}</span>
              </td>
              <td className="py-2 pr-6">{item.price}</td>
              <td className="py-2 pr-6">{item.quantity}</td>
              <td className="py-2">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end mt-4 text-lg font-semibold">
        Total: {total}
      </div>
      <div className="flex justify-between items-center mt-4">
        <Button variant="secondary" onClick={clearCart}>
          Clear Cart
        </Button>
        <Button className="ml-4" onClick={() => router.push('/orders')}>
          Checkout
        </Button>
      </div>
    </div>
  );
}