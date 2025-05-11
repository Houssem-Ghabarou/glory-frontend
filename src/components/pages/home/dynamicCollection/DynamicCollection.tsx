"use client";
import React, { useRef } from "react";
import { titleClass, subtitleClass } from "@/lib/tailwind/classNames";
import CustomButton from "@/components/shared/CustomButton/CustomButton";
import Swiper from "@/components/shared/Swiper/Swiper";
import ImagesSlider, {
  SliderRef,
} from "@/components/shared/sliders/ImagesSlider";
import { imagesize } from "@/lib/tailwind/classNames";
import { mockPropsCard } from "@/mock/items";

const DynamicCollection = () => {
  const sliderRef = useRef<SliderRef>(null);

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full items-stretch">
      {/* Left Section: Text and Button */}
      <div className="flex flex-col flex-1 min-w-[300px] gap-4 justify-between">
        <div className="flex flex-col gap-2">
          <div>
            <h1 className={titleClass}>NEW</h1>
            <h1 className={titleClass}>COLLECTION</h1>
          </div>
          <div>
            <h1 className={subtitleClass}>Summer</h1>
            <h1 className={subtitleClass}>2024</h1>
          </div>
        </div>
        <div className="hidden lg:flex justify-between items-center">
          <div className="w-full max-w-[50%]">
            <CustomButton />
          </div>
          <Swiper
            onNext={() => sliderRef.current?.next()}
            onPrev={() => sliderRef.current?.prev()}
          />
        </div>
      </div>
      {/* Right Section: Image Slider */}
      <div className="flex-1 w-full min-w-[300px]">
        <ImagesSlider ref={sliderRef} data={mockPropsCard} />
      </div>
    </div>
  );
};
export default DynamicCollection;
