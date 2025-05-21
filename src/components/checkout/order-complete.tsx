"use client";

import { Order } from "@/types/models/order";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import useCart from "../shared/cart/useCart";
interface OrderCompleteProps {
  orderNumber: Order["orderNumber"];
}
export default function OrderComplete({ orderNumber }: OrderCompleteProps) {
  const { clearCart } = useCart();

  useEffect(() => {
    // Wait a few seconds before clearing the cart after order confirmation
    const timer = setTimeout(() => {
      clearCart();
    }, 1000); // 3 seconds delay

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="flex flex-col items-center justify-center py-8">
          <div className="rounded-full bg-green-100 p-3 mb-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold mb-2">
            Order Placed Successfully!
          </h1>
          <p className="text-gray-600 mb-6">
            Thank you for your order. We're processing it now.
          </p>

          <div className="bg-gray-50 rounded-lg p-6 w-full max-w-md mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Order Number:</span>
              <span className="font-semibold">{orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Order Date:</span>
              <span className="font-semibold">
                {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>

          <p className="text-gray-600 mb-2">
            We've sent a confirmation email to your inbox with all the details.
          </p>
          <p className="text-gray-600 mb-8">
            You'll receive another email when your order ships.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/collections"
              className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
