"use client";

import { useState, useEffect } from "react";
import { X, Play, Pause, Volume2, VolumeX } from "lucide-react";
import { classNames as cn } from "@/lib/tailwind/classNames";
import cloth1 from "@/assets/images/cloth1.png";
interface PremiumModalProps {
  productName: string;
  productPrice: string;
  productDescription: string;
  videoThumbnail: string;
  onClose: () => void;
}

export function Video({
  productName = "Signature Linen Blazer",
  productPrice = "$249.99",
  productDescription = "Our premium linen blazer combines timeless elegance with modern comfort. Perfect for summer evenings or business casual settings.",
  videoThumbnail = "",
  onClose,
}: PremiumModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-22 flex items-center justify-center p-4 md:p-8">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="relative w-full max-w-5xl bg-white rounded-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/40 transition-colors"
        >
          <X className="h-6 w-6 text-white" />
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Video Section */}
          <div className="relative w-full md:w-2/3 bg-black">
            <div className="aspect-video relative">
              {/* Video placeholder - in a real app, use an actual video */}
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-br from-gray-900/20 to-black/60 flex items-center justify-center",
                  isPlaying
                    ? "opacity-0 hover:opacity-100 transition-opacity duration-300"
                    : "opacity-100"
                )}
              >
                <button
                  className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm border-white hover:bg-white/40 hover:scale-105 transition-all"
                  onClick={togglePlay}
                >
                  {isPlaying ? (
                    <Pause className="h-8 w-8 text-white" />
                  ) : (
                    <Play className="h-8 w-8 text-white ml-1" />
                  )}
                </button>
              </div>

              <img
                src={videoThumbnail || "/placeholder.svg"}
                alt="Product video thumbnail"
                className="w-full h-full object-cover"
              />

              {/* Video controls */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                <div className="text-white text-sm font-medium">
                  {isPlaying ? `Now Playing: ${productName}` : `${productName}`}
                </div>
                <button
                  className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm border-white hover:bg-white/40"
                  onClick={toggleMute}
                >
                  {isMuted ? (
                    <VolumeX className="h-4 w-4 text-white" />
                  ) : (
                    <Volume2 className="h-4 w-4 text-white" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Product Info Section */}
          <div className="w-full md:w-1/3 p-6 md:p-8 flex flex-col">
            <div className="flex-1">
              <span className="inline-block px-3 py-1 bg-black text-white text-xs font-medium rounded-full mb-4">
                NEW ARRIVAL
              </span>
              <h2 className="text-2xl font-bold mb-2">{productName}</h2>
              <p className="text-xl mb-4">{productPrice}</p>
              <p className="text-gray-600 mb-6">{productDescription}</p>

              <div className="mb-6">
                <h3 className="font-medium mb-2">Available Colors</h3>
                <div className="flex space-x-2">
                  <button className="w-8 h-8 rounded-full bg-stone-200 border-2 border-stone-300"></button>
                  <button className="w-8 h-8 rounded-full bg-stone-700 border-2 border-transparent"></button>
                  <button className="w-8 h-8 rounded-full bg-blue-700 border-2 border-transparent"></button>
                </div>
              </div>
            </div>

            <div className="mt-auto">
              <button className="w-full bg-black hover:bg-black/80 text-white py-6 rounded-md mb-3">
                Add to Cart
              </button>
              <button className="w-full border-black text-black hover:bg-black/5 py-6 rounded-md">
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
