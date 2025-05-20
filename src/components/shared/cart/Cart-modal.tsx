"use client";

import { X, ShoppingCart, Trash2, Plus, Minus, RefreshCw } from "lucide-react";
import Image from "next/image";
import useCart from "./useCart";
import type { CartItem } from "@/types/cart";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CartModal() {
  const {
    cartItems,
    removeItem,
    updateQuantity,
    totalPrice,
    toggleCart,
    cartOpen,
  } = useCart();
  const router = useRouter();
  // Track hydration
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  // Reset item quantity to 1
  const resetQuantity = (
    itemId: string,
    itemColor: string,
    itemSize: string
  ) => {
    updateQuantity(itemId, itemColor, itemSize, 1);
  };

  if (!hydrated) {
    // Render nothing or fallback on server and before hydration
    return null;
  }

  return (
    <>
      {/* Overlay */}
      {cartOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300 cursor-pointer"
          onClick={toggleCart}
        />
      )}
      {/* Cart Modal */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Your Cart
            </h2>
            <button
              onClick={toggleCart}
              className="p-1.5 rounded-full hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
              aria-label="Close cart"
            >
              <X className="h-5 w-5 text-gray-500" />
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
                {cartItems.map((item: CartItem) => {
                  return (
                    <li
                      key={`${item._id}-${item.color}-${Math.random().toString(36).substr(2, 9)}`}
                      className="flex flex-col p-3 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative h-20 w-20 rounded-md overflow-hidden bg-gray-100">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                          {item.sale > 0 && item.sale < item.price && (
                            <div className="absolute top-0 right-0 bg-rose-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-bl">
                              Sale
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 truncate">
                            {item.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <div
                              className="h-4 w-4 rounded-full border"
                              style={{ backgroundColor: item.color }}
                              aria-label={`Color: ${item.color}`}
                            />
                            <span className="text-xs text-gray-500 capitalize">
                              {item.color}
                            </span>
                            {item.size && (
                              <span className="text-xs text-gray-500 border px-1.5 rounded">
                                {item.size}
                              </span>
                            )}
                          </div>
                          <div className="mt-1 flex items-center gap-2">
                            {item.sale > 0 && item.sale < item.price ? (
                              <>
                                <span className="font-medium text-rose-600">
                                  ${Number(item.sale).toFixed(2)}
                                </span>
                                <span className="text-sm text-gray-500 line-through">
                                  ${Number(item.price).toFixed(2)}
                                </span>
                              </>
                            ) : (
                              <span className="font-medium">
                                ${Number(item.price).toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            removeItem(item._id, item.color, item.size)
                          }
                          className="p-1 text-gray-400 hover:text-rose-500 transition-colors duration-200"
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-3 pt-2 border-t">
                        <div className="flex items-center">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item._id,
                                item.color,
                                item.size,
                                Math.max(1, item.quantity - 1)
                              )
                            }
                            className="p-1 rounded-l-md border border-r-0 bg-gray-50 hover:bg-gray-100 transition-colors"
                            aria-label="Decrease quantity"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <div className="w-10 h-8 flex items-center justify-center border-y">
                            {item.quantity}
                          </div>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item._id,
                                item.color,
                                item.size,
                                item.quantity + 1
                              )
                            }
                            className="p-1 rounded-r-md border border-l-0 bg-gray-50 hover:bg-gray-100 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <button
                          onClick={() =>
                            resetQuantity(item._id, item.color, item.size)
                          }
                          className="text-xs text-gray-500 flex items-center gap-1 hover:text-gray-700 transition-colors"
                          aria-label="Reset quantity"
                        >
                          <RefreshCw className="h-3 w-3" />
                          Reset
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Footer */}
          <div className="border-t p-4 space-y-4 bg-gray-50">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center font-semibold">
              <span>Total</span>
              <span className="text-lg">${totalPrice.toFixed(2)}</span>
            </div>
            <button
              className="w-full py-3 px-4 bg-black hover:bg-gray-800 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              disabled={cartItems.length === 0}
              onClick={() => router.push("/checkout")}
            >
              <ShoppingCart className="h-4 w-4" />
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
