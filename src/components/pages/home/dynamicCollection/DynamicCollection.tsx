"use client";
import React, { useRef } from "react";
import { titleClass, subtitleClass } from "@/lib/tailwind/classNames";
import CustomButton from "@/components/shared/CustomButton/CustomButton";
import Swiper from "@/components/shared/Swiper/Swiper";
import ImagesSlider, {
  SliderRef,
} from "@/components/shared/sliders/ImagesSlider";
import { mockPropsCard } from "@/mock/items";
import TitleStack from "@/components/shared/titles/TitleStack";

const firstWords = ["NEW", "COLLECTION"];
const secondWords = ["SUMMER", "2024"];
const DynamicCollection = () => {
  const sliderRef = useRef<SliderRef>(null);

  return (
    <section className="flex flex-col lg:flex-row gap-8 w-full items-stretch">
      <h1 className="sr-only">
        Glory — Premium Urban Clothing for Bold Expression
      </h1>
      {/* Left Section: Text and Button */}
      <div className="flex flex-col flex-1 min-w-[300px] gap-4 justify-between">
        <div className="flex flex-col gap-2">
          <TitleStack words={firstWords} main={true} />
          <TitleStack words={secondWords} className={subtitleClass} />
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
    </section>
  );
};
export default DynamicCollection;
