"use client";

import { CartItem } from "@/types/cart";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type CartContextType = {
  cartItems: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string, color: string, size: string) => void;
  clearCart: () => void;
  totalPrice: number;
  cartOpen: boolean;
  toggleCart: () => void;
  updateQuantity: (
    id: string,
    color: string,
    size: string,
    quantity: number
  ) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "myApp_cartItems"; // Change key as you want
const CART_OPEN_KEY = "myApp_cartOpen";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  // Initialize cartItems from localStorage or empty array
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return []; // SSR safe
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  const [cartOpen, setCartOpen] = useState(() => {
    if (typeof window === "undefined") return false;
    const storedOpen = localStorage.getItem(CART_OPEN_KEY);
    return storedOpen ? JSON.parse(storedOpen) : false;
  });

  // Save cartItems to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  // Save cartOpen to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(CART_OPEN_KEY, JSON.stringify(cartOpen));
  }, [cartOpen]);

  const toggleCart = () => setCartOpen((prev: boolean) => !prev);

  const addItem = (item: CartItem) => {
    setCartItems((prev) => {
      // Find existing item with same _id, color, and size
      const existing = prev.find(
        (i) =>
          i._id === item._id && i.color === item.color && i.size === item.size
      );

      if (existing) {
        return prev.map((i) =>
          i._id === item._id && i.color === item.color && i.size === item.size
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }

      return [...prev, item];
    });
  };

  const updateQuantity = (
    id: string,
    color: string,
    size: string,
    quantity: number
  ) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id && item.color === color && item.size === size
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  };

  const removeItem = (id: string, color: string, size: string) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(item._id === id && item.color === color && item.size === size)
      )
    );
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
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
