"use client";
import React, { useImperativeHandle, forwardRef } from "react";
import { useKeenSlider } from "keen-slider/react";
import styles from "./ImagesSlider.module.css";
import { imagesize } from "@/lib/tailwind/classNames";
import { Item } from "@/types/item";
import CustomCard from "../cards/CustomCard";

interface ImagesSliderProps {
  data: Item[];
}

export interface SliderRef {
  next: () => void;
  prev: () => void;
}

const ImagesSlider = forwardRef<SliderRef, ImagesSliderProps>(
  ({ data }, ref) => {
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
      breakpoints: {
        "(min-width: 300px)": {
          slides: { perView: 2, spacing: 10 },
        },
        "(min-width: 1000px)": {
          slides: { perView: 1, spacing: 10 },
        },
        "(min-width: 1400px)": {
          slides: { perView: 2, spacing: 10 },
        },
      },
      slides: { perView: 1, spacing: 10 },
    });

    // Expose next and prev methods to parent via ref
    useImperativeHandle(ref, () => ({
      next: () => instanceRef.current?.next(),
      prev: () => instanceRef.current?.prev(),
    }));

    return (
      <div className="w-full h-full ">
        <div ref={sliderRef} className={`keen-slider lg:gap-4 ${imagesize}`}>
          {data?.map((item, index) => (
            <div
              key={index}
              className={`keen-slider__slide ${styles.numberSlide} flex flex-col gap-2`}
            >
              <CustomCard item={item} index={index} />
            </div>
          ))}
        </div>
      </div>
    );
  }
);

ImagesSlider.displayName = "ImagesSlider";

export default ImagesSlider;
