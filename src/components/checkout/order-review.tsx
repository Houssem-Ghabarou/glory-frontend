"use client";

import {
  ArrowLeft,
  ChevronRight,
  CreditCard,
  MapPin,
  Package,
  Truck,
} from "lucide-react";
import Image from "next/image";
import type { CheckoutFormData } from "@/app/[locale]/checkout/page";
import type { CartItem } from "@/types/cart";

interface OrderReviewProps {
  formData: CheckoutFormData;
  cartItems: CartItem[];
  totalPrice: number;
  shippingCost: number;
  orderTotal: number;
  onBack: () => void;
  onSubmit: () => void;
}

export default function OrderReview({
  formData,
  cartItems,
  totalPrice,
  shippingCost,
  orderTotal,
  onBack,
  onSubmit,
}: OrderReviewProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Main content */}
      <div className="flex-1">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold mb-6">Review Your Order</h1>

          {/* Shipping Information Summary */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold flex items-center">
                <Truck className="mr-2 h-5 w-5" />
                Shipping Information
              </h2>
              <button
                onClick={onBack}
                className="text-sm text-gray-600 hover:text-black flex items-center"
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                Edit
              </button>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">
                    {formData.firstName} {formData.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Contact</p>
                  <p className="font-medium">{formData.email}</p>
                  <p className="font-medium">{formData.phone}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium">{formData.address1}</p>
                {formData.address2 && (
                  <p className="font-medium">{formData.address2}</p>
                )}
                <p className="font-medium">
                  {formData.governorate}, Tunisia {formData.zipCode}
                </p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Package className="mr-2 h-5 w-5" />
              Order Summary
            </h2>

            <div className="border rounded-lg overflow-hidden">
              <div className="divide-y">
                {cartItems.map((item: CartItem) => (
                  <div
                    key={`${item._id}-${item.color}-${item.size}`}
                    className="flex items-center p-4"
                  >
                    <div className="relative h-16 w-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <div className="flex items-center mt-1">
                        <div
                          className="h-3 w-3 rounded-full border mr-1"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-xs text-gray-500 capitalize">
                          {item.color}
                        </span>
                        {item.size && (
                          <span className="text-xs text-gray-500 border px-1 rounded ml-2">
                            {item.size}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {item.sale > 0 && item.sale < item.price
                          ? `$${Number(item.sale).toFixed(2)}`
                          : `$${Number(item.price).toFixed(2)}`}
                      </p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <CreditCard className="mr-2 h-5 w-5" />
              Payment Summary
            </h2>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>${shippingCost.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span className="text-lg">${orderTotal.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Including VAT</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={onBack}
              className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back
            </button>
            <button
              onClick={onSubmit}
              className="px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200 flex items-center"
            >
              Place Order
              <ChevronRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Order Summary Sidebar */}
      <div className="lg:w-80">
        <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
          <h2 className="text-lg font-semibold mb-4">Delivery Address</h2>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <MapPin className="h-5 w-5 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <p className="font-medium">
                  {formData.firstName} {formData.lastName}
                </p>
                <p className="text-gray-600">{formData.address1}</p>
                {formData.address2 && (
                  <p className="text-gray-600">{formData.address2}</p>
                )}
                <p className="text-gray-600">
                  {formData.governorate}, Tunisia {formData.zipCode}
                </p>
                <p className="text-gray-600">Phone: {formData.phone}</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Shipping</span>
              <span>${shippingCost.toFixed(2)}</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${orderTotal.toFixed(2)}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Including VAT</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
