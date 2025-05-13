import React from "react";
import Image from "next/image";
import { imagesize } from "@/lib/tailwind/classNames";
import { Item } from "@/types/item";
import AddToCartIcon from "@/assets/icons/add-to-cart.svg";
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
  return (
    <div className="flex flex-col w-full h-full">
      {/* Image Container */}
      <div
        className={`relative w-full border border-[#D7D7D7] overflow-hidden cursor-pointer ${imagesize}`}
      >
        <Image
          src={item?.image}
          alt={`Item ${index + 1}`}
          width={500} // You can adjust this as needed
          height={500}
          quality={85}
          className="w-full h-full object-cover"
          sizes="(max-width: 768px) 100vw, 500px"
        />

        {addToCartEnabled && (
          <button className="cursor-pointer absolute bottom-0 left-1/2 transform -translate-x-1/2 button-bg-secondary p-2 shadow-md">
            <Image
              src={AddToCartIcon}
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
            <div className="text-[15px] font-normal text-theme">
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
