"use client";

import React from "react";
import SearchIcon from "@/assets/icons/searchIcon.svg";
import Image from "next/image";
const SearchInput = () => {
  return (
    <div className="w-full relative flex items-center border border-[#D9D9D9] rounded-[2px] rounded bg-[#D9D9D9] focus-within:ring-[1px] focus-within:ring-black-500">
      <button className="px-4">
        <Image
          src={SearchIcon}
          alt="Search"
          width={24}
          height={24}
          className="h-6 w-6 cursor-pointer"
        />
      </button>
      <input
        type="text"
        placeholder="Search"
        className="w-full py-4 px-2 bg-transparent focus:outline-none text-right  placeholder:text-primary-gray "
      />
    </div>
  );
};

export default SearchInput;
