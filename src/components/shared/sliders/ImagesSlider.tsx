"use client";
import React, { useRef } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import styles from "./ImagesSlider.module.css";
import Image from "next/image";
interface ImagesSliderProps {
  images: string[];
}
const ImagesSlider = ({
  images,
}: ImagesSliderProps & {
  images: string[];
}) => {
  console.log(images, "images");
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    breakpoints: {
      "(min-width: 400px)": {
        slides: { perView: 2, spacing: 5 },
      },
      "(min-width: 1000px)": {
        slides: { perView: 3, spacing: 10 },
      },
    },
    slides: { perView: 1 },
  });

  const handlePrev = () => {
    slider.current?.prev();
  };

  const handleNext = () => {
    slider.current?.next();
  };

  return (
    <div>
      <div ref={sliderRef} className="keen-slider gap-2">
        {images.map((image, index) => (
          <div
            key={index}
            className={`keen-slider__slide ${styles.numberSlide} ${
              styles[`numberSlide${index + 1}`]
            }`}
          >
            <Image
              src={image}
              alt={`Image ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
      {/* <div className={styles.navigationButtons}>
        <button onClick={handlePrev} className={styles.navButton}>
          Prev
        </button>
        <button onClick={handleNext} className={styles.navButton}>
          Next
        </button>
      </div> */}
    </div>
  );
};

export default ImagesSlider;
