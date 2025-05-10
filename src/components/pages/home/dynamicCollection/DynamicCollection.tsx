"use client";
import React, { useRef } from "react";
import { titleClass, subtitleClass } from "@/lib/tailwind/classNames";
import CustomButton from "@/components/shared/CustomButton/CustomButton";
import Swiper from "@/components/shared/Swiper/Swiper";
import ImagesSlider, {
  SliderRef,
} from "@/components/shared/sliders/ImagesSlider";
import { imagesize } from "@/lib/tailwind/classNames";
import cloth1 from "@/assets/images/cloth1.png";
import cloth2 from "@/assets/images/cloth2.png";

const DynamicCollection = () => {
  const sliderRef = useRef<SliderRef>(null);

  const mockPropsCard = [
    {
      id: 1,
      category: "Clothes",
      name: "Cloth 1",
      image: cloth1.src,
    },
    {
      id: 2,
      category: "T-Shirts",
      name: "Cloth 2",
      image: cloth2.src,
    },
  ];
  return (
    <div
      className={`flex flex-col lg:flex-row gap-8 w-full items-center justify-between ${imagesize}`}
    >
      {/* Left Section: Text and Button */}
      <div className="flex flex-col flex-1 self-start h-full justify-between min-w-[300px]">
        <div className="flex flex-col gap-2 flex-grow">
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
          <div className="w-full lg:max-w-[50%]">
            <CustomButton />
          </div>
          <Swiper
            onNext={() => sliderRef.current?.next()}
            onPrev={() => sliderRef.current?.prev()}
          />
        </div>
      </div>
      {/* Right Section: Image Slider */}
      <div className="flex-1 w-full h-full min-w-[300px]">
        <ImagesSlider ref={sliderRef} data={mockPropsCard} />
      </div>
    </div>
  );
};

export default DynamicCollection;
