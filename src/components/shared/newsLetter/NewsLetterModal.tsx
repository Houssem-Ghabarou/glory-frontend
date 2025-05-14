"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/Input";
import Image from "next/image";
import Cloth1 from "@/assets/images/cloth1.png";
export default function NewsletterModal() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Check if user has already closed the modal
    const hasClosedModal = localStorage.getItem("newsletter-modal-closed");

    if (!hasClosedModal) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000); // Show after 3 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsExiting(true);
    // Store in localStorage that user has closed the modal
    localStorage.setItem("newsletter-modal-closed", "true");

    setTimeout(() => {
      setIsVisible(false);
      setIsExiting(false);
    }, 500); // Match the exit animation duration
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the email to your API
    console.log("Subscribing email:", email);
    setIsSubmitted(true);

    // Close modal after showing success message
    setTimeout(() => {
      handleClose();
    }, 2000);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div
        className={`relative w-full max-w-[800px]  mx-4 overflow-hidden bg-white shadow-2xl ${
          isExiting ? "animate-modal-exit" : "animate-modal-enter"
        }`}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1 rounded-full bg-white/80 hover:bg-white transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-gray-800" />
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="relative w-full md:w-1/2 h-48 md:h-auto overflow-hidden">
            <Image
              src={Cloth1.src}
              alt="Fashion"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>

          {/* Content Section */}
          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
            {!isSubmitted ? (
              <>
                <h2 className="text-2xl font-light tracking-tight mb-1">
                  JOIN OUR WORLD
                </h2>
                <p className="text-sm text-gray-600 mb-6">
                  Subscribe to our newsletter and get 10% off your first
                  purchase
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Input
                      type="email"
                      placeholder="Your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="border-b border-gray-300 focus:border-black rounded-none px-0 h-10"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-black hover:bg-gray-800 text-white rounded-none"
                  >
                    SUBSCRIBE
                  </button>

                  <p className="text-xs text-gray-500 text-center pt-2">
                    By subscribing, you agree to our Privacy Policy and consent
                    to receive updates.
                  </p>
                </form>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="mb-4 text-green-600">
                  <svg
                    className="w-16 h-16 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">
                  Thank you for subscribing!
                </h3>
                <p className="text-gray-600">
                  We've sent a confirmation to your email.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
