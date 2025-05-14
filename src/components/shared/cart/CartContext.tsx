"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Item } from "@/types/item";

type CartContextType = {
  cartItems: Item[];
  addItem: (item: Item) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  totalPrice: number;
  cartOpen: boolean;
  toggleCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<Item[]>([]);
  //cartOpen
  const [cartOpen, setCartOpen] = useState(false);

  const toggleCart = () => setCartOpen((prev) => !prev);

  const addItem = (item: Item) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item];
    });
  };

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCartItems([]);

  const totalPrice = cartItems.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItem,
        removeItem,
        clearCart,
        totalPrice,
        cartOpen,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
