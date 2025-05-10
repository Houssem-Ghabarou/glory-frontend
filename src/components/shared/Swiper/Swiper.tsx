"use client";
import Image from "next/image";
import React from "react";
import arrowRight from "@/assets/icons/arrowright.svg";
import arrowLeft from "@/assets/icons/arrowleft.svg";
const Swiper = () => {
  return (
    <div className="flex gap-2 items-center">
      <button className="w-12 h-12 border border-[#A3A3A3] flex items-center justify-center cursor-pointer">
        <Image
          src={arrowLeft}
          alt="Arrow Left"
          width={8}
          height={8}
          className="object-contain"
        />
      </button>
      <button className="w-12 h-12 border border-[#A3A3A3] flex items-center justify-center cursor-pointer  ">
        <Image
          src={arrowRight}
          alt="Arrow Right"
          width={8}
          height={8}
          className="object-contain"
        />
      </button>
    </div>
  );
};

export default Swiper;
