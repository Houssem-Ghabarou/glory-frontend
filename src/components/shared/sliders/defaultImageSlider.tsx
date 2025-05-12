"use client";
import React, { useRef } from "react";
import { useKeenSlider } from "keen-slider/react";
import styles from "./ImagesSlider.module.css";
import { imagesize } from "@/lib/tailwind/classNames";
import { Item } from "@/types/item";
import CustomCard from "../cards/CustomCard";
import Swiper from "../Swiper/Swiper";

interface ImagesSliderProps {
  data: Item[];
  labelEnabled?: boolean;
  labelEnabledPhone?: boolean;
  addToCartEnabled?: boolean;
}
const animation = { duration: 5000, easing: (t: number) => t };

const DefaultImageSlider: React.FC<ImagesSliderProps> = ({
  data,
  labelEnabled = true,
  labelEnabledPhone = true,
  addToCartEnabled = true,
}) => {
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    breakpoints: {
      "(min-width: 300px)": {
        slides: { perView: 2, spacing: 10 },
      },
      "(min-width: 400px)": {
        slides: { perView: 2, spacing: 5 },
      },
      "(min-width: 600px)": {
        slides: { perView: 3, spacing: 10 },
      },
      "(min-width: 1000px)": {
        slides: { perView: 4, spacing: 10 },
      },
      "(min-width: 1300px)": {
        slides: { perView: 5, spacing: 10 },
      },
    },
    slides: { perView: 1 },
  });

  const next = () => {
    instanceRef.current?.next();
  };

  const prev = () => {
    instanceRef.current?.prev();
  };

  return (
    <div className="w-full h-full flex flex-col items-center gap-8">
      <div ref={sliderRef} className={`keen-slider lg:gap-4 ${imagesize}`}>
        {data?.map((item, index) => (
          <div
            key={index}
            className={`keen-slider__slide ${styles.numberSlide} flex flex-col gap-2`}
          >
            <CustomCard
              item={item}
              index={index}
              labelEnabled={labelEnabled}
              addToCartEnabled={addToCartEnabled}
              labelEnabledPhone={labelEnabledPhone}
            />
          </div>
        ))}
      </div>
      <Swiper onNext={next} onPrev={prev} />
    </div>
  );
};

export default DefaultImageSlider;
