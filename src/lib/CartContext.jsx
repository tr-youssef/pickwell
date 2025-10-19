import React, { createContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  // Initial points, can be set to any value or fetched from user profile
  const [points, setPoints] = useState(100);
  const [cart, setCart] = useState([]);


  const addToCart = (product) => {
    if (product.qty > 0 && points >= product.price) {
      setCart((prev) => {
        const existing = prev.find((item) => item.id === product.id);
        if (existing) {
          return prev.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        }
        return [...prev, { ...product, quantity: 1 }];
      });
      setPoints((prev) => prev - product.price);
    }
  };

  const removeFromCart = (id) => {
    setCart((prev) => {
      const item = prev.find((i) => i.id === id);
      if (!item) return prev;
      setPoints((pts) => pts + item.price * (item.quantity || 1));
      return prev.filter((i) => i.id !== id);
    });
  };

  return (
    <CartContext.Provider value={{ cart, points, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export { CartContext };
