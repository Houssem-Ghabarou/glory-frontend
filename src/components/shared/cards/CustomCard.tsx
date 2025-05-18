import type React from "react";
import Image from "next/image";
import { imagesize } from "@/lib/tailwind/classNames";
import type { Item } from "@/types/item";
import AddToCartIcon from "@/assets/icons/add-to-cart.svg";
import useCart from "../cart/useCart";
import slugify from "slugify";

// next router
import { redirect } from "next/navigation";
import { handleCardClick } from "@/lib/navigation/navigateToDetails";
interface CustomCardProps {
  item: Item;
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
  const { addItem, removeItem, cartItems, totalPrice } = useCart();

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

        {item?.onSale && (
          <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-medium py-1 px-2 m-2">
            SALE 20%
          </div>
        )}

        {/* Add to cart button with hover effect */}
        {addToCartEnabled && (
          <button
            className="cursor-pointer absolute bottom-0 left-1/2 transform -translate-x-1/2 button-bg-secondary p-2 shadow-md transition-all duration-300 group-hover:bottom-4 hover:scale-110"
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
          className={`flex flex-col gap-2 pt-4 ${
            labelEnabledPhone ? "lg:hidden" : ""
          }`}
        >
          <div className="text-[15px] font-medium text-primary-gray">
            {item?.category || "Category"}
          </div>
          <div className="flex justify-between items-center">
            <div className="text-[15px] font-normal text-theme group-hover:font-medium transition-all">
              {item?.name || "Item"}
            </div>
            <div className="text-[15px] font-[500] text-theme">
              {item?.price || "Price"}$
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomCard;
