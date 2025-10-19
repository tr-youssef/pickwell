
import React from "react";
import { useCart } from "../lib/useCart";
import { useNavigate } from "react-router-dom";

export default function CheckoutTable() {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow p-6 mt-8">
      <h2 className="text-xl font-bold mb-4">Checkout</h2>
      <table className="w-full border-collapse mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Picture</th>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Points</th>
            <th className="p-2 text-left">Remove</th>
          </tr>
        </thead>
        <tbody>
          {cart.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center py-4 text-gray-400">No items in cart</td>
            </tr>
          ) : (
            cart.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="p-2">
                  <img src={item.image} alt={item.name} className="h-10 w-10 object-contain rounded" />
                </td>
                <td className="p-2">{item.name}</td>
                <td className="p-2">{Number(item.price).toFixed(2)} pts</td>
                <td className="p-2">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <button
        className="w-full bg-green-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-green-700 transition"
        disabled={cart.length === 0}
        onClick={() => navigate('/pickup')}
      >
        Proceed to Pickup Location
      </button>
    </div>
  );
}
