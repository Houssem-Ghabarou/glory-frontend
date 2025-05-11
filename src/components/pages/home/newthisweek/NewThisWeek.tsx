import React from "react";
import { mockPropsCard } from "@/mock/items";
import DefaultImageSlider from "@/components/shared/sliders/defaultImageSlider";
import { titleClass } from "@/lib/tailwind/classNames";
const NewThisWeek = () => {
  return (
    <div className="flex flex-col gap-8 w-full items-stretch">
      <div className="flex justify-between items-center">
        <div>
          <h1 className={titleClass}>NEW</h1>
          <h1 className={titleClass}>THIS WEEK</h1>
        </div>
        {/* see all  */}
        <div className="hidden lg:flex justify-between items-center self-end ">
          <div className="w-full">
            <button className="text-secondary  font-[400] text-[16px]">
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
