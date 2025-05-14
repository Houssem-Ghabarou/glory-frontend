"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronUp, ChevronDown } from "lucide-react";
import { classNames as cn } from "@/lib/tailwind/classNames";
import cloth1 from "@/assets/images/cloth1.png";
import cloth2 from "@/assets/images/cloth2.png";
import cloth3 from "@/assets/images/cloth3.jpg";
import cloth4 from "@/assets/images/cloth4.jpg";

const productColors = [
  { name: "Black", value: "#000000", className: "bg-black" },
  {
    name: "White",
    value: "#FFFFFF",
    className: "bg-white border border-gray-200",
  },
  { name: "Mint", value: "#A3E4D7", className: "bg-[#A3E4D7]" },
  { name: "Lavender", value: "#D2B4DE", className: "bg-[#D2B4DE]" },
];

const productSizes = ["S", "M", "L", "XL", "XXL"];

// Using actual image imports
const productImages = [
  cloth1.src,
  cloth2.src,
  cloth3.src,
  cloth4.src,
  cloth1.src,
  cloth1.src,
  cloth1.src,
  cloth1.src,
];

export default function ProductDetail() {
  const [selectedColor, setSelectedColor] = useState(productColors[0]);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedImage, setSelectedImage] = useState(0);
  const [showMagnifier, setShowMagnifier] = useState(false);

  // For thumbnail scrolling
  const thumbnailsRef = useRef<HTMLDivElement>(null);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(true);

  // Check if scrolling is possible
  const checkScrollability = () => {
    const container = thumbnailsRef.current;
    if (!container) return;

    setCanScrollUp(container.scrollTop > 0);
    setCanScrollDown(
      container.scrollTop < container.scrollHeight - container.clientHeight
    );
  };

  // Initialize scroll state
  useEffect(() => {
    checkScrollability();
    // Add resize listener
    window.addEventListener("resize", checkScrollability);
    return () => window.removeEventListener("resize", checkScrollability);
  }, []);

  // Scroll functions
  const scrollUp = () => {
    if (!thumbnailsRef.current) return;
    thumbnailsRef.current.scrollBy({ top: -100, behavior: "smooth" });
    setTimeout(checkScrollability, 300);
  };

  const scrollDown = () => {
    if (!thumbnailsRef.current) return;
    thumbnailsRef.current.scrollBy({ top: 100, behavior: "smooth" });
    setTimeout(checkScrollability, 300);
  };

  return (
    <div className="px-4 py-20 md:px-8 lg:px-12 xl:px-20 h-full max-w-7xl mx-auto">
      <div className="h-full">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          {/* Product Gallery Section */}
          <div className="flex flex-col-reverse md:flex-row-reverse gap-4 md:gap-6 w-full md:w-3/5">
            {/* Main Product Image - Fixed size container */}
            <div className="relative w-full aspect-square bg-gray-50">
              <Image
                src={productImages[selectedImage] || "/placeholder.svg"}
                alt={`Product Image ${selectedImage + 1}`}
                width={600}
                height={600}
                priority
                className="w-full h-full object-contain"
                onMouseEnter={() => setShowMagnifier(true)}
                onMouseLeave={() => setShowMagnifier(false)}
              />
            </div>

            {/* Vertical Thumbnails - Now on the right */}
            <div className="relative flex md:flex-col items-center">
              {/* Scroll Up Button */}
              <button
                onClick={scrollUp}
                disabled={!canScrollUp}
                className={cn(
                  "hidden md:flex absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full z-10 justify-center items-center w-8 h-8 bg-white shadow-md transition-opacity",
                  canScrollUp
                    ? "opacity-100 hover:bg-gray-100"
                    : "opacity-0 cursor-default"
                )}
                aria-label="Scroll up"
              >
                <ChevronUp className="w-5 h-5" />
              </button>

              {/* Thumbnails Container */}
              <div
                ref={thumbnailsRef}
                className="flex md:flex-col gap-3 overflow-x-auto md:overflow-x-hidden md:overflow-y-auto md:max-h-[600px] md:py-2 scrollbar-hide"
                onScroll={checkScrollability}
              >
                {productImages.map((image, index) => (
                  <div
                    key={index}
                    className={cn(
                      "relative flex-shrink-0 cursor-pointer transition-all duration-200 border-2 overflow-hidden",
                      selectedImage === index
                        ? "border-black"
                        : "border-transparent hover:border-gray-300"
                    )}
                    onClick={() => setSelectedImage(index)}
                  >
                    {/* Fixed size thumbnail */}
                    <div className="w-20 h-20 md:w-24 md:h-24">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Product thumbnail ${index + 1}`}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Scroll Down Button */}
              <button
                onClick={scrollDown}
                disabled={!canScrollDown}
                className={cn(
                  "hidden md:flex absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full z-10 justify-center items-center w-8 h-8 bg-white shadow-md transition-opacity",
                  canScrollDown
                    ? "opacity-100 hover:bg-gray-100"
                    : "opacity-0 cursor-default"
                )}
                aria-label="Scroll down"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="w-full md:w-2/5">
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  Premium Cotton T-Shirt
                </h1>
                <p className="mt-2 text-xl text-gray-900">$49.99</p>
                <div className="mt-2 flex items-center">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="h-5 w-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="ml-2 text-sm text-gray-500">42 reviews</p>
                </div>
              </div>

              <div>
                <h2 className="text-sm font-medium text-gray-900">
                  Description
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                  Our premium cotton t-shirt offers unmatched comfort with a
                  modern fit. Made from 100% organic cotton, it's both
                  sustainable and durable for everyday wear.
                </p>
              </div>

              {/* Color Selection */}
              <div>
                <h2 className="text-sm font-medium text-gray-900">Color</h2>
                <div className="mt-3 flex space-x-4">
                  {productColors.map((color) => (
                    <button
                      key={color.name}
                      className={cn(
                        "relative h-10 w-10 flex items-center justify-center",
                        selectedColor.name === color.name &&
                          "ring-2 ring-offset-2 ring-black"
                      )}
                      onClick={() => setSelectedColor(color)}
                      aria-label={`Color: ${color.name}`}
                    >
                      <span className={cn("h-8 w-8", color.className)} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-medium text-gray-900">Size</h2>
                  <button className="text-sm font-medium text-gray-600 hover:text-gray-900">
                    Size Guide
                  </button>
                </div>
                <div className="mt-3 grid grid-cols-5 gap-3">
                  {productSizes.map((size) => (
                    <button
                      key={size}
                      className={cn(
                        "flex items-center justify-center border py-2 text-sm font-medium transition-colors",
                        selectedSize === size
                          ? "border-black bg-black text-white"
                          : "border-gray-300 bg-white text-gray-900 hover:bg-gray-50"
                      )}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to Cart Button */}
              <button className="w-full bg-black text-white py-3 px-4 font-medium hover:bg-gray-900 transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
