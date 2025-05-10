"use client";
import Image from "next/image";
import React from "react";
import arrowRight from "@/assets/icons/arrowright.svg";
import arrowLeft from "@/assets/icons/arrowleft.svg";

interface SwiperProps {
  onNext: () => void;
  onPrev: () => void;
}

const Swiper = ({ onNext, onPrev }: SwiperProps) => {
  return (
    <div className="flex gap-2 items-center">
      <button
        onClick={onPrev}
        className="w-12 h-12 border border-[#A3A3A3] flex items-center justify-center cursor-pointer"
      >
        <Image
          src={arrowLeft}
          alt="Arrow Left"
          width={8}
          height={8}
          className="object-contain"
        />
      </button>
      <button
        onClick={onNext}
        className="w-12 h-12 border border-[#A3A3A3] flex items-center justify-center cursor-pointer"
      >
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
