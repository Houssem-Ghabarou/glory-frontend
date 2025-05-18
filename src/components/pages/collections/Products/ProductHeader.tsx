"use client";
import SearchInput from "@/components/shared/SearchInput";
import React from "react";
import CategoryNavigation from "./CategoryNavigation";

const ProductHeader = () => {
  const handleCategoryClick = (category: string) => {
    console.log(`Category clicked: ${category}`);
    // You can add your category handling logic here
  };
  return (
    <div className="flex flex-col xl:flex-row gap-3 items-center">
      <div className=" w-full xl:w-[40%]">
        <SearchInput />
      </div>
      {/*  */}
      <div className=" xl:w-[60%]">
        <CategoryNavigation onCategoryClick={handleCategoryClick} />
      </div>
    </div>
  );
};

export default ProductHeader;
