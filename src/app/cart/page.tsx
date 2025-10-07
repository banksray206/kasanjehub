'use client';


import CartSummary from '@/components/sections/cart-summary';

export default function CartPage() {
  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <CartSummary />
    </div>
  );
}
