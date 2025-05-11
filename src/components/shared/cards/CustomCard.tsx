import React from "react";
import Image from "next/image";
import { imagesize } from "@/lib/tailwind/classNames";
import { Item } from "@/types/item";

interface CustomCardProps {
  item: Item;
  index: number;
}

const CustomCard: React.FC<CustomCardProps> = ({ item, index }) => {
  return (
    <div className="flex flex-col w-full h-full">
      {/* Image Container */}
      <div
        className={`relative w-full h-[300px] ${imagesize}`}
        style={{
          borderColor: "#D7D7D7",
          borderWidth: "1px",
          overflow: "hidden",
        }}
      >
        <Image
          src={item?.image}
          alt={`Item ${index + 1}`}
          fill
          className="object-cover"
        />
      </div>
      {/* Text Content */}
      <div className="flex flex-col gap-2 p-4">
        <h1 className="text-[16px] font-[500] text-theme">
          {item?.category || "Category"}
        </h1>
        <h1 className="text-[16px] font-[400] text-theme">
          {item?.name || "Item"}
        </h1>
      </div>
    </div>
  );
};

export default CustomCard;
