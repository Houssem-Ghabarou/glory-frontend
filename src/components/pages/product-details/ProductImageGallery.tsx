"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronUp, ChevronDown } from "lucide-react";
import { classNames as cn } from "@/lib/tailwind/classNames";

interface ProductImageGalleryProps {
  images: string[];
}

export default function ProductImageGallery({
  images,
}: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showMagnifier, setShowMagnifier] = useState(false);

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

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4 lg:gap-6 w-full">
      {/* Main Product Image */}
      <div className="relative w-full lg:w-3/4 aspect-square bg-gray-50">
        <Image
          src={images[selectedImage] || "/placeholder.svg"}
          alt={`Product Image ${selectedImage + 1}`}
          fill
          priority
          className="object-contain"
          onMouseEnter={() => setShowMagnifier(true)}
          onMouseLeave={() => setShowMagnifier(false)}
        />
      </div>

      {/* Vertical Thumbnails */}
      <div className="relative w-full lg:w-1/4 flex justify-center lg:justify-start">
        {/* Scroll Up Button */}
        <button
          onClick={scrollUp}
          disabled={!canScrollUp}
          className={cn(
            "hidden lg:flex absolute -top-10 left-1/2 -translate-x-1/2 z-10 justify-center items-center w-8 h-8 bg-white shadow-md rounded-full transition-opacity",
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
              <div className="w-20 h-20">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`Product thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
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
            "hidden lg:flex absolute -bottom-10 left-1/2 -translate-x-1/2 z-10 justify-center items-center w-8 h-8 bg-white shadow-md rounded-full transition-opacity",
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
  );
}
