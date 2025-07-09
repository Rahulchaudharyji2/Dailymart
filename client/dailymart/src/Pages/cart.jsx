// src/pages/Cart.jsx
import React from 'react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">🛒 Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cartItems.map(item => (
            <div key={item.id} className="bg-white p-4 shadow rounded">
              <img src={item.image} alt={item.title} className="h-48 w-full object-contain mb-2" />
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-green-600 font-semibold">₹{item.price}</p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="mt-2 bg-red-500 text-white py-2 px-4 rounded"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
