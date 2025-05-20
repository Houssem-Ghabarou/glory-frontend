import React, { RefObject } from "react";
import {
  useKeenSlider,
  KeenSliderPlugin,
  KeenSliderInstance,
} from "keen-slider/react";
import Image from "next/image";
import Styles from "./GalleryImageSlider.module.css";
//@ts-ignore
import ReactImageGallery from "react-image-gallery";
import cloth1 from "@/assets/images/cloth1.png";
import "react-image-gallery/styles/css/image-gallery.css";

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

const transformImage = (image: string) => {
  return {
    original: image,
    thumbnail: image,
    // description: "Image description",
  };
};
export default function ImageGallery({ images }: ImageGalleryProps) {
  const productDetailItem = {
    images: images.map((image) => transformImage(image)),
  };

  return (
    <ReactImageGallery
      showBullets={true}
      showFullscreenButton={true}
      showPlayButton={false}
      originalWidth={500}
      originalHeight={500}
      items={productDetailItem?.images}

      // thumbnailPosition="left"
    />
  );
}
