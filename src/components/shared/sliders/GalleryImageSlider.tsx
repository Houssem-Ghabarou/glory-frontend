import * as React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Styles from "./GalleryImageSlider.module.css";

export default function VerticalSlider() {
  const [ref] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      origin: "center",
      perView: 2,
      spacing: 10,
    },
    vertical: true,
  });
  return (
    <div ref={ref} className="keen-slider h-full">
      <div className={`keen-slider__slide ${Styles.numberSlide1}`}>1</div>
      <div className={`keen-slider__slide ${Styles.numberSlide2}`}>2</div>
      <div className={`keen-slider__slide ${Styles.numberSlide3}`}>3</div>
      <div className={`keen-slider__slide ${Styles.numberSlide4}`}>4</div>
      <div className={`keen-slider__slide ${Styles.numberSlide5}`}>5</div>
      <div className={`keen-slider__slide ${Styles.numberSlide6}`}>6</div>
    </div>
  );
}
