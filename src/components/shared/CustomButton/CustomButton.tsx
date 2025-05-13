"use client";
import React from "react";
import buttonGo from "@/assets/icons/buttongo.svg";
import Image from "next/image";

const CustomButton = () => {
  return (
    <div className="flex items-center justify-between gap-2 bg-[#D9D9D9] text-white px-4 py-1 rounded-[2px] w-full cursor-pointer">
      <span className="text-[16px] font-[500] font-[400] text-theme">
        GO TO SHOP
      </span>
      <button>
        <Image
          src={buttonGo}
          alt="Go"
          className="object-contain"
          height={40}
          width={40}
        />
      </button>
    </div>
  );
};

export default CustomButton;
