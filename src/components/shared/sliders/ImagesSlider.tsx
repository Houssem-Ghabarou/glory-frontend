"use client";
import React, { useImperativeHandle, forwardRef } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import styles from "./ImagesSlider.module.css";
import Image from "next/image";
import { imagesize } from "@/lib/tailwind/classNames";
import { Item } from "@/types/item";

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
        "(min-width: 400px)": {
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
      <div className="w-full h-full">
        <div ref={sliderRef} className={`keen-slider lg:gap-4 ${imagesize}`}>
          {data?.map((item, index) => (
            <div
              key={index}
              className={`keen-slider__slide ${styles.numberSlide} flex flex-col gap-2`}
            >
              {/* Image Container */}
              <div
                className={`${imagesize} relative`}
                style={{
                  borderColor: "#D7D7D7",
                  borderWidth: "1px",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={item?.image}
                  alt={`Item ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
              {/* Text Content */}
              <div className="flex  lg:hidden flex-col gap-2 p-4">
                <h1 className="text-[16px] font-[500] text-theme">
                  {item?.category || "Category"}
                </h1>
                <h1 className="text-[16px] font-[400] text-theme">
                  {item?.name || "Item"}
                </h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

ImagesSlider.displayName = "ImagesSlider";

export default ImagesSlider;
