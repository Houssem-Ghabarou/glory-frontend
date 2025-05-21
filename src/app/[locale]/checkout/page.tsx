"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import useCart from "@/components/shared/cart/useCart";
import ShippingForm from "@/components/checkout/shipping-form";
import OrderReview from "@/components/checkout/order-review";
import OrderComplete from "@/components/checkout/order-complete";
import { placeOrder } from "@/lib/api/placeOrder";
import { Order } from "@/types/models/order";
import toast from "react-hot-toast";
import { error } from "console";

// Checkout form data type
// Calculate shipping and total
const shippingCost = 5.0;
export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address1: string;
  address2: string;
  governorate: string;
  zipCode: string;
  agreeToTerms: boolean;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, totalPrice, clearCart } = useCart();
  const [formStep, setFormStep] = useState(1);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [orderNumber, setOrderNumber] = useState("");

  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    governorate: "",
    zipCode: "",
    agreeToTerms: false,
  });

  // Handle hydration
  useEffect(() => {
    setIsHydrated(true);

    // Add a small delay to ensure cart is loaded
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Handle form data updates from child components
  const updateFormData = (data: Partial<CheckoutFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  // Navigation between steps
  const goToNextStep = () => {
    setFormStep((prev) => prev + 1);
    window.scrollTo(0, 0);
  };

  const goToPreviousStep = () => {
    setFormStep((prev) => prev - 1);
    window.scrollTo(0, 0);
  };

  const submitOrder = () => {
    startTransition(() => {
      placeOrder({
        items: cartItems,
        customerInfo: formData,
      }).then((res) => {
        console.log("res", res);
        if (res.success) {
          const data = res.data as Order;
          setOrderNumber(data?.orderNumber);

          goToNextStep();
          // router.push(`/order-confirmation?orderNumber=${data?.orderNumber}`); // or `/order-confirmation?orderId=${res.data.id}`
        } else {
          toast.error(
            res.message || "An error occurred while placing the order"
          );
        }
      });
    });
  };

  const orderTotal = totalPrice + shippingCost;

  // Loading state
  if (!isHydrated || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-sm max-w-md w-full text-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="rounded-full bg-gray-200 h-16 w-16 flex items-center justify-center mb-4">
              <ShoppingBag className="h-8 w-8 text-gray-400" />
            </div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  // Redirect if cart is empty
  if (cartItems.length === 0 && formStep !== 3) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-md mx-auto p-6 rounded-lg border shadow-sm">
          <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-gray-400" />
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">
            Add some items to your cart before proceeding to checkout
          </p>
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress bar */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  formStep >= 1 ? "bg-black text-white" : "bg-gray-200"
                }`}
              >
                1
              </div>
              <div className="ml-2 text-sm font-medium">Shipping</div>
            </div>
            <div className="w-16 h-1 bg-gray-200 mx-2">
              <div
                className={`h-full ${formStep >= 2 ? "bg-black" : "bg-gray-200"}`}
                style={{ width: formStep >= 2 ? "100%" : "0%" }}
              ></div>
            </div>
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  formStep >= 2 ? "bg-black text-white" : "bg-gray-200"
                }`}
              >
                2
              </div>
              <div className="ml-2 text-sm font-medium">Review</div>
            </div>
            <div className="w-16 h-1 bg-gray-200 mx-2">
              <div
                className={`h-full ${formStep >= 3 ? "bg-black" : "bg-gray-200"}`}
                style={{ width: formStep >= 3 ? "100%" : "0%" }}
              ></div>
            </div>
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  formStep >= 3 ? "bg-black text-white" : "bg-gray-200"
                }`}
              >
                3
              </div>
              <div className="ml-2 text-sm font-medium">Complete</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {formStep === 1 && (
            <ShippingForm
              formData={formData}
              updateFormData={updateFormData}
              onContinue={goToNextStep}
              cartItems={cartItems}
              totalPrice={totalPrice}
              shippingCost={shippingCost}
              orderTotal={orderTotal}
            />
          )}

          {formStep === 2 && (
            <OrderReview
              formData={formData}
              cartItems={cartItems}
              totalPrice={totalPrice}
              shippingCost={shippingCost}
              orderTotal={orderTotal}
              onBack={goToPreviousStep}
              onSubmit={submitOrder}
            />
          )}

          {formStep === 3 && <OrderComplete orderNumber={orderNumber} />}
        </div>
      </div>
    </div>
  );
}
