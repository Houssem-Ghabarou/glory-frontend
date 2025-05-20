"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CheckCircle,
  Package,
  Truck,
  Calendar,
  ArrowLeft,
  MapPin,
} from "lucide-react";

export default function OrderConfirmationPage() {
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    // Generate a random order number
    const randomOrderNumber = Math.floor(
      10000000 + Math.random() * 90000000
    ).toString();
    setOrderNumber(randomOrderNumber);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold mb-2">
                Thank You For Your Order!
              </h1>
              <p className="text-gray-600">
                Your order has been received and is now being processed.
              </p>
            </div>

            <div className="border rounded-lg p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-sm font-medium text-gray-500 mb-1">
                    Order Number
                  </h2>
                  <p className="text-lg font-semibold">{orderNumber}</p>
                </div>
                <div>
                  <h2 className="text-sm font-medium text-gray-500 mb-1">
                    Order Date
                  </h2>
                  <p className="text-lg font-semibold">
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <h2 className="text-sm font-medium text-gray-500 mb-1">
                    Payment Method
                  </h2>
                  <p className="text-lg font-semibold">Cash on Delivery</p>
                </div>
                <div>
                  <h2 className="text-sm font-medium text-gray-500 mb-1">
                    Shipping Method
                  </h2>
                  <p className="text-lg font-semibold">Standard Delivery</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">Order Timeline</h2>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>

                <div className="relative flex items-start mb-6">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-black text-white flex items-center justify-center z-10">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <div className="ml-4 pt-1">
                    <h3 className="font-medium">Order Confirmed</h3>
                    <p className="text-sm text-gray-500">
                      {new Date().toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="relative flex items-start mb-6">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center z-10">
                    <Package className="h-5 w-5" />
                  </div>
                  <div className="ml-4 pt-1">
                    <h3 className="font-medium text-gray-500">
                      Processing Order
                    </h3>
                    <p className="text-sm text-gray-500">
                      Your order is being prepared
                    </p>
                  </div>
                </div>

                <div className="relative flex items-start mb-6">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center z-10">
                    <Truck className="h-5 w-5" />
                  </div>
                  <div className="ml-4 pt-1">
                    <h3 className="font-medium text-gray-500">Shipping</h3>
                    <p className="text-sm text-gray-500">
                      Your order will be on its way soon
                    </p>
                  </div>
                </div>

                <div className="relative flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center z-10">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div className="ml-4 pt-1">
                    <h3 className="font-medium text-gray-500">
                      Estimated Delivery
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date(
                        Date.now() + 5 * 24 * 60 * 60 * 1000
                      ).toLocaleDateString()}{" "}
                      -
                      {new Date(
                        Date.now() + 7 * 24 * 60 * 60 * 1000
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
              <div className="bg-gray-50 rounded-lg p-4 flex items-start">
                <MapPin className="h-5 w-5 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                <div>
                  <p className="font-medium">John Doe</p>
                  <p className="text-gray-600">123 Main Street, Apt 4B</p>
                  <p className="text-gray-600">Tunis, Tunisia 1002</p>
                  <p className="text-gray-600">Phone: +216 22 123 456</p>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <Link
                href="/"
                className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Continue Shopping
              </Link>

              <Link
                href="/account/orders"
                className="px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200"
              >
                View All Orders
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
