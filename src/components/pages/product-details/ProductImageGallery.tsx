"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronUp, ChevronDown, ZoomIn } from "lucide-react";
import { classNames as cn } from "@/lib/tailwind/classNames";
interface ProductImageGalleryProps {
  images: string[];
  alt?: string;
}

export default function ProductImageGallery({
  images,
  alt = "Product image",
}: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  const mainImageRef = useRef<HTMLDivElement>(null);
  const thumbnailsRef = useRef<HTMLDivElement>(null);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(true);

  const checkScrollability = () => {
    const container = thumbnailsRef.current;
    if (!container) return;

    setCanScrollUp(container.scrollTop > 0);
    setCanScrollDown(
      container.scrollTop < container.scrollHeight - container.clientHeight
    );
  };

  useEffect(() => {
    checkScrollability();
    window.addEventListener("resize", checkScrollability);
    return () => window.removeEventListener("resize", checkScrollability);
  }, []);

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

  if (images.length === 0) {
    return (
      <div className="w-full h-[600px] bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4 lg:gap-6 w-full">
      {/* Vertical Thumbnails */}
      <div className="relative w-full lg:w-1/4 flex justify-center lg:justify-start ">
        {/* Scroll Up Button */}
        <button
          onClick={scrollUp}
          disabled={!canScrollUp}
          className={cn(
            "hidden lg:flex absolute -top-10 left-1/2 -translate-x-1/2 z-10 justify-center items-center w-8 h-8 bg-white shadow-md rounded-full transition-all",
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
          className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-x-hidden lg:overflow-y-auto lg:max-h-[600px] py-2 scrollbar-hide"
          onScroll={checkScrollability}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className={cn(
                "relative flex-shrink-0 cursor-pointer transition-all duration-200 border-2 rounded-md overflow-hidden",
                selectedImage === index
                  ? "border-black"
                  : "border-transparent hover:border-gray-300"
              )}
              onClick={() => setSelectedImage(index)}
            >
              <div className="w-24 h-32 md:w-28 md:h-36">
                <Image
                  src={image || "/placeholder.svg?height=144&width=108"}
                  alt={`${alt} thumbnail ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 96px, 112px"
                  className="object-cover transition-opacity hover:opacity-90"
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
            "hidden lg:flex absolute -bottom-10 left-1/2 -translate-x-1/2 z-10 justify-center items-center w-8 h-8 bg-white shadow-md rounded-full transition-all",
            canScrollDown
              ? "opacity-100 hover:bg-gray-100"
              : "opacity-0 cursor-default"
          )}
          aria-label="Scroll down"
        >
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>
      {/* Main Product Image with Zoom */}
      <div className="relative w-full lg:w-3/4 h-[500px] md:h-[600px] bg-gray-50 overflow-hidden rounded-lg">
        <div ref={mainImageRef} className="relative w-full h-full ">
          <Image
            src={
              images[selectedImage] || "/placeholder.svg?height=600&width=450"
            }
            alt={`${alt} ${selectedImage + 1}`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 75vw"
            className="object-contain transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  );
}
