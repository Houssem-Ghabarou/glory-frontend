// components/sections/DynamicSection.tsx
"use client";
import React, { useRef } from "react";
import { titleClass, subtitleClass } from "@/lib/tailwind/classNames";
import CustomButton from "@/components/shared/CustomButton/CustomButton";
import Swiper from "@/components/shared/Swiper/Swiper";
import ImagesSlider, {
  SliderRef,
} from "@/components/shared/sliders/ImagesSlider";
import TitleStack from "@/components/shared/titles/TitleStack";
import { CollectionType } from "@/types/collectionType";
import { Product } from "@/types/models/product";
type Props = CollectionType & {
  products: Product[];
};

const DynamicSection = ({
  title,
  subtitle,
  thirdTitle,
  fourthTitle,
  propertyRefs,
  products,
}: Props) => {
  const sliderRef = useRef<SliderRef>(null);

  const firstWords = [];
  if (title) firstWords.push(title);
  if (subtitle) firstWords.push(subtitle);
  const secondWords = [];
  if (thirdTitle) secondWords.push(thirdTitle);
  if (fourthTitle) secondWords.push(fourthTitle);

  return (
    <section className="flex flex-col lg:flex-row gap-8 w-full items-stretch">
      <h1 className="sr-only">
        Glory — Premium Urban Clothing for Bold Expression
      </h1>
      <div className="flex flex-col flex-1 min-w-[300px] gap-4 justify-between">
        <div className="flex flex-col gap-2">
          <TitleStack words={firstWords} main />
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
      <div className="flex-1 w-full min-w-[300px]">
        <ImagesSlider ref={sliderRef} data={products} />
      </div>
    </section>
  );
};

export default DynamicSection;
