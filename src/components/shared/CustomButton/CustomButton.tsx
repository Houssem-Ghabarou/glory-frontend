"use client";
import React from "react";
import buttonGo from "@/assets/icons/buttongo.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CustomButton = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/collections");
  };
  return (
    <button
      className="flex items-center justify-between gap-2 bg-[#D9D9D9] text-white px-4 py-1 rounded-[2px] w-full cursor-pointer "
      onClick={handleClick}
    >
      <span className="text-[16px] font-[500]  text-theme">GO TO SHOP</span>
      <div>
        <Image
          src={buttonGo}
          alt="Go"
          className="object-contain"
          height={40}
          width={40}
        />
      </div>
    </button>
  );
};

export default CustomButton;
