import React, { RefObject } from "react";
import {
  useKeenSlider,
  KeenSliderPlugin,
  KeenSliderInstance,
} from "keen-slider/react";
import Image from "next/image";
import Styles from "./GalleryImageSlider.module.css";

interface ImageGalleryProps {
  images: string[];
}

function ThumbnailPlugin(
  mainRef: RefObject<KeenSliderInstance | null>
): KeenSliderPlugin {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove(Styles.active);
      });
    }
    function addActive(idx: number) {
      slider.slides[idx].classList.add(Styles.active);
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener("click", () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx);
        });
      });
    }

    slider.on("created", () => {
      if (!mainRef.current) return;
      addActive(slider.track.details.rel);
      addClickEvents();
      mainRef.current.on("animationStarted", (main) => {
        removeActive();
        const next = main.animator.targetIdx || 0;
        addActive(main.track.absToRel(next));
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next));
      });
    });
  };
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
  });
  const [thumbnailRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      slides: {
        perView: Math.min(4, images.length),
        spacing: 10,
      },
    },
    [ThumbnailPlugin(instanceRef)]
  );

  return (
    <div className="flex flex-col gap-4">
      <div ref={sliderRef} className="keen-slider">
        {images.map((src, idx) => (
          <div
            key={idx}
            className={`keen-slider__slide max-h-[400px] h-[400px] w-[400px]`}
          >
            <Image
              src={src}
              alt={`Slide ${idx + 1}`}
              fill
              priority={idx === 0}
            />
          </div>
        ))}
      </div>

      <div ref={thumbnailRef} className={`keen-slider ${Styles.thumbnail}`}>
        {images.map((src, idx) => (
          <div
            key={idx}
            className={`keen-slider__slide ${Styles.thumbnailSlide} h-[100px] w-[100px]`}
          >
            <Image
              src={src}
              alt={`Thumbnail ${idx + 1}`}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
