import React from "react";
import { mockPropsCard } from "@/mock/items";
import DefaultImageSlider from "@/components/shared/sliders/defaultImageSlider";
import TitleStack from "@/components/shared/titles/TitleStack";

const words = ["NEW", "THIS WEEk"];
const NewThisWeek = () => {
  return (
    <div className="flex flex-col gap-8 w-full items-stretch">
      <div className="flex justify-between items-center">
        <div className="relative ">
          <TitleStack words={words} />
          {/* (50) in right top  */}
          <div className="absolute top-[20px] right-[-43px] text-[#000E8A] font-[800] text-[20px]">
            (50)
          </div>
        </div>
        {/* see all  */}
        <div className="hidden lg:flex justify-between items-center self-end ">
          <div className="w-full">
            <button className="text-secondary  font-[400] text-[16px] cursor-pointer ">
              See All
            </button>
          </div>
        </div>
      </div>

      <DefaultImageSlider data={mockPropsCard} />
    </div>
  );
};

export default NewThisWeek;
