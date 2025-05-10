"use client";
import React from "react";
import buttonGo from "@/assets/icons/buttongo.svg";
import Image from "next/image";

const CustomButton = () => {
  return (
    <button className="flex items-center justify-between gap-2 bg-[#D9D9D9] text-white px-4 py-1 rounded-[2px] w-full cursor-pointer">
      <span className="text-[16px] font-[500] font-[400] text-theme">
        GO TO SHOP
      </span>
      <div className="relative w-8 h-8">
        <Image src={buttonGo} alt="Go" fill className="object-contain" />
      </div>
    </button>
  );
};

export default CustomButton;
