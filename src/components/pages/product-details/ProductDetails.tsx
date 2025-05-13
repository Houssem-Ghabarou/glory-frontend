"use client";

import { useState } from "react";
import Image from "next/image";
import cloth1 from "@/assets/images/cloth1.png";
import cloth2 from "@/assets/images/cloth2.png";
import cloth3 from "@/assets/images/cloth3.jpg";
import cloth4 from "@/assets/images/cloth4.jpg";

const productColors = [
  { name: "Black", value: "#000000", className: "bg-black" },
  { name: "White", value: "#FFFFFF", className: "bg-white" },
  { name: "Mint", value: "#A3E4D7", className: "bg-[#A3E4D7]" },
  { name: "Lavender", value: "#D2B4DE", className: "bg-[#D2B4DE]" },
];

const productSizes = ["S", "M", "L", "XL", "XXL"];

const productImages = [
  //assets
  cloth1.src,
  cloth2.src,
  cloth3.src,
  cloth4.src,
];

export default function ProductDetail() {
  const [selectedColor, setSelectedColor] = useState(productColors[0]);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedImage, setSelectedImage] = useState(0);
  const [showMagnifier, setShowMagnifier] = useState(false);

  return (
    <div className="px-35 py-20">
      <div>
        <div className="flex gap-10">
          <div className="flex  gap-5">
            <div className="w-[640px] h-[640px] overflow-hidden">
              <Image
                src={productImages[selectedImage]}
                alt={`Product Image ${selectedImage + 1}`}
                width={640}
                height={640}
                quality={100}
                className="w-full h-full object-cover"
                onMouseEnter={() => setShowMagnifier(true)}
                onMouseLeave={() => setShowMagnifier(false)}
              />
            </div>

            <div className="flex flex-col gap-4">
              {productImages.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`Product Image ${index + 1}`}
                  width={100}
                  height={100}
                  className="cursor-pointer"
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div>details</div>
    </div>
  );
}
