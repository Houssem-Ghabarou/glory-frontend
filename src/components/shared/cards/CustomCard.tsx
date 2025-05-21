"use client";

import type React from "react";
import Image from "next/image";
import { imagesize } from "@/lib/tailwind/classNames";
import AddToCartIcon from "@/assets/icons/add-to-cart.svg";
import useCart from "../cart/useCart";

// next router
import { redirect } from "next/navigation";
import { handleCardClick } from "@/lib/navigation/navigateToDetails";
import type { Product } from "@/types/models/product";
interface CustomCardProps {
  item: Product;
  index: number;
  labelEnabled: boolean;
  labelEnabledPhone?: boolean;
  addToCartEnabled?: boolean;
}

const CustomCard: React.FC<CustomCardProps> = ({
  item,
  index,
  labelEnabled,
  labelEnabledPhone,
  addToCartEnabled,
}) => {
  console.log(item, "item");
  const { addItem, removeItem, cartItems, totalPrice } = useCart();

  // Static color options for demonstration
  const availableColors = [
    { name: "Black", hex: "#000000" },
    { name: "White", hex: "#FFFFFF" },
    { name: "Red", hex: "#FF3B30" },
    { name: "Blue", hex: "#007AFF" },
  ];

  return (
    <div className="flex flex-col w-full h-full group">
      {/* Image Container */}
      <div
        className={`relative w-full border border-[#D7D7D7] overflow-hidden cursor-pointer ${imagesize}`}
      >
        {/* Image with zoom effect */}
        <Image
          onClick={() => {
            handleCardClick(item, redirect);
          }}
          src={item?.images?.[0] || "/placeholder.svg"}
          alt={`Item ${index + 1}`}
          width={500}
          height={500}
          quality={85}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 500px"
        />

        {/* Conditional badge for new arrivals or sale items */}
        {item?.isNew && (
          <div className="absolute top-0 left-0 bg-secondary  text-white text-xs font-medium py-1 px-2 m-2">
            NEW
          </div>
        )}

        {item?.sale && (
          <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-medium py-1 px-2 m-2">
            {/* it s the price  */}-
            {Math.round(((item?.price - item?.sale) / item?.price) * 100)}%
          </div>
        )}

        {/* Color options */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex items-center justify-center gap-1.5 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full transition-opacity duration-300 opacity-0 group-hover:opacity-100">
          {availableColors.map((color, colorIndex) => (
            <div
              key={colorIndex}
              className="relative group/color"
              aria-label={`${color.name} color option`}
            >
              <div
                className="w-4 h-4 rounded-full cursor-pointer transition-transform hover:scale-125 border border-gray-200"
                style={{ backgroundColor: color.hex }}
              />
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 text-xs font-medium bg-black text-white px-1.5 py-0.5 rounded opacity-0 group-hover/color:opacity-100 whitespace-nowrap pointer-events-none">
                {color.name}
              </span>
            </div>
          ))}
        </div>

        {/* Add to cart button with hover effect */}
        {addToCartEnabled && (
          <button
            className="cursor-pointer absolute bottom-0 left-1/2 transform -translate-x-1/2 button-bg-secondary p-2 shadow-md transition-all duration-300 group-hover:bottom-12 hover:scale-110"
            onClick={() => {
              addItem(item);
            }}
          >
            <Image
              src={AddToCartIcon || "/placeholder.svg"}
              alt="Add to Cart"
              width={24}
              height={24}
            />
          </button>
        )}
      </div>

      {/* Text Content */}
      {labelEnabled && (
        <div
          className={`flex flex-col gap-2 pt-4 ${labelEnabledPhone ? "lg:hidden" : ""}`}
        >
          <div className="text-[15px] font-medium text-primary-gray">
            {item?.category || "Category"}
          </div>
          <div className="flex justify-between items-center">
            <div className="text-[15px] font-normal text-theme group-hover:font-medium transition-all">
              {item?.name || "Item"}
            </div>
            <div className="text-[15px] font-[500] text-theme">
              {item?.sale ? `${item?.sale}$` : `${item?.price || "Price"}$`}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomCard;
