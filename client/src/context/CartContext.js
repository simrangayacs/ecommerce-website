import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(product) {
    setCart((prev) => {
      const existing = prev.find((item) => item.product === product._id);

      if (existing) {
        return prev.map((item) =>
          item.product === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...prev,
        {
          product: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        },
      ];
    });
  }

  function removeFromCart(productId) {
    setCart((prev) => prev.filter((item) => item.product !== productId));
  }

  function updateQuantity(productId, quantity) {
    if (quantity < 1) return;
    setCart((prev) =>
      prev.map((item) =>
        item.product === productId ? { ...item, quantity } : item
      )
    );
  }

  function clearCart() {
    setCart([]);
  }

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
}