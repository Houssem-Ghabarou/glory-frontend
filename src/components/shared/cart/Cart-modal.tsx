"use client";

import { useState } from "react";
import { X, ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import cloth1 from "@/assets/images/cloth1.png";
import cloth2 from "@/assets/images/cloth2.png";
import cloth3 from "@/assets/images/cloth3.jpg";
type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export default function CartModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Wireless Headphones",
      price: 99.99,
      quantity: 1,
      image: cloth1.src,
    },
    {
      id: "2",
      name: "Smart Watch",
      price: 199.99,
      quantity: 1,
      image: cloth2.src,
    },
    {
      id: "3",
      name: "Bluetooth Speaker",
      price: 79.99,
      quantity: 2,
      image: cloth3.src,
    },
  ]);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
      {/* Cart Button */}
      <button
        onClick={toggleCart}
        className="fixed top-4 right-4 z-80 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
        aria-label="Open cart"
      >
        <ShoppingCart className="h-6 w-6 text-gray-700" />
        {cartItems.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {cartItems.length}
          </span>
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-transparent z-80 transition-opacity duration-300 cursor-pointer"
          onClick={toggleCart}
        />
      )}

      {/* Cart Modal */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-lg z-100 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-semibold">Your Cart</h2>
            <button
              onClick={toggleCart}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
              aria-label="Close cart"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <ShoppingCart className="h-12 w-12 mb-2" />
                <p>Your cart is empty</p>
              </div>
            ) : (
              <ul className="space-y-4">
                {cartItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center gap-4 p-2 border rounded-lg"
                  >
                    <div className="relative h-20 w-20 rounded-md overflow-hidden bg-gray-100">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                      <p className="font-medium">${item.price.toFixed(2)}</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1 text-gray-400 hover:text-rose-500 transition-colors duration-200"
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          <div className="border-t p-4 space-y-4">
            <div className="flex justify-between items-center font-semibold">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <button
              className="w-full py-3 px-4 bg-black hover:bg-gray-800 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={cartItems.length === 0}
              onClick={() => alert("Proceeding to shipping...")}
            >
              Proceed to Shipping
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
