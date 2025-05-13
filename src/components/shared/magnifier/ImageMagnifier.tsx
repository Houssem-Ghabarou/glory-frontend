"use client";

import type React from "react";

import { useState, useRef } from "react";
import Image from "next/image";

interface ImageMagnifierProps {
  src: string;
  width: number;
  height: number;
  magnifierSize: number;
  zoomLevel: number;
  showMagnifier: boolean;
}

export default function ImageMagnifier({
  src,
  width,
  height,
  magnifierSize = 150,
  zoomLevel = 2,
  showMagnifier = false,
}: ImageMagnifierProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const imgRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return;

    // Get the position of the image element
    const { left, top, width, height } = imgRef.current.getBoundingClientRect();

    // Calculate cursor position on the image
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    // Ensure the magnifier stays within bounds
    setPosition({
      x: Math.min(Math.max(x, 0), 100),
      y: Math.min(Math.max(y, 0), 100),
    });
  };

  return (
    <div
      ref={imgRef}
      className="relative w-full h-full cursor-zoom-in"
      onMouseMove={handleMouseMove}
    >
      <Image
        src={src || "/placeholder.svg"}
        alt="Product image"
        width={width}
        height={height}
        className="w-full h-full object-cover"
        priority
      />

      {showMagnifier && (
        <div
          className="absolute pointer-events-none border border-gray-200 shadow-lg overflow-hidden bg-white"
          style={{
            width: `${magnifierSize}px`,
            height: `${magnifierSize}px`,
            // Position the magnifier near the cursor but offset to not cover it
            left: `calc(${position.x}% - ${magnifierSize / 2}px)`,
            top: `calc(${position.y}% - ${magnifierSize / 2}px)`,
          }}
        >
          <div
            style={{
              width: `${width * zoomLevel}px`,
              height: `${height * zoomLevel}px`,
              backgroundImage: `url(${src})`,
              backgroundPosition: `${-position.x * zoomLevel + 50}% ${
                -position.y * zoomLevel + 50
              }%`,
              backgroundSize: `${zoomLevel * 100}%`,
              backgroundRepeat: "no-repeat",
            }}
            className="w-full h-full"
          />
        </div>
      )}
    </div>
  );
}
