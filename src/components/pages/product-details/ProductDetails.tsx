"use client";

import { useState } from "react";
import { classNames as cn } from "@/lib/tailwind/classNames";
import cloth1 from "@/assets/images/cloth1.png";
import cloth2 from "@/assets/images/cloth2.png";
import cloth3 from "@/assets/images/cloth3.jpg";
import cloth4 from "@/assets/images/cloth4.jpg";
import photodetails from "@/assets/images/photodetails.jpg";
import ImageGallery from "@/components/shared/sliders/GalleryImageSlider";
import { useIsMobile } from "@/hooks/useMobile";

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

const productImages = [
  photodetails.src,
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
  const isMobile = useIsMobile();
  const [selectedColor, setSelectedColor] = useState(productColors[0]);
  const [selectedSize, setSelectedSize] = useState("M");

  return (
    <div className="px-4 py-10 lg:px-12 xl:px-20 mx-auto">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 lg:min-h-[600px]">
        {/* Product Gallery Section */}
        <div className="w-full">
          <ImageGallery images={productImages} />
        </div>

        {/* Product Details Section - Fixed to stretch properly */}
        <div className="w-full flex flex-col h-full justify-between self-center">
          <div className="flex flex-col h-full justify-between space-y-6">
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
                        "relative h-10 w-10 flex items-center justify-center rounded-full",
                        selectedColor.name === color.name &&
                          "ring-2 ring-offset-2 ring-black"
                      )}
                      onClick={() => setSelectedColor(color)}
                      aria-label={`Color: ${color.name}`}
                    >
                      <span
                        className={cn("h-8 w-8 rounded-full", color.className)}
                      />
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
                        "flex items-center justify-center border py-2 text-sm font-medium rounded-md transition-colors",
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
            </div>

            {/* Add to Cart Button - Now at the bottom with margin-top auto */}
            <div className="mt-auto pt-6">
              <button className="w-full bg-black text-white py-3 px-4 font-medium rounded-md hover:bg-gray-900 transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
