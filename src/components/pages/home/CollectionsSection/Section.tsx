"use client";
import DefaultImageSlider from "@/components/shared/sliders/defaultImageSlider";
import TitleStack from "@/components/shared/titles/TitleStack";
import { mockPropsCard } from "@/mock/items";
import React from "react";
import { CollectionType } from "@/types/collectionType";

import { Product } from "@/types/models/product";
import { useRouter } from "next/navigation";

type Props = CollectionType & {
  products: Product[];
};
const Section = (props: Props) => {
  const {
    title,
    subtitle,
    propertyRefs,
    _createdAt,
    _id,
    thirdTitle,
    products,
  } = props;

  const router = useRouter();
  const words = [];
  if (title) words.push(title);
  if (subtitle) words.push(subtitle);
  if (thirdTitle) words.push(thirdTitle);

  const productsLength = propertyRefs?.length || 0;
  const handleSeeAll = () => {
    router.push("/collections");
  };
  return (
    <section className="flex flex-col gap-8 w-full items-stretch">
      <div className="flex justify-between items-center">
        <div className="relative ">
          <TitleStack words={words} />
          {/* (50) in right top  */}
          <div className="absolute top-[20px] right-[-43px] text-[#000E8A] font-[800] text-[20px]">
            ({productsLength})
          </div>
        </div>
        {/* see all  */}
        <div className="flex justify-between items-center self-end ">
          <div className="w-full">
            <button
              className="text-secondary  font-[400] text-[16px] cursor-pointer "
              onClick={handleSeeAll}
            >
              See All
            </button>
          </div>
        </div>
      </div>

      <DefaultImageSlider
        data={products}
        addToCartEnabled={true}
        labelEnabled={true}
        labelEnabledPhone={true}
      />
    </section>
  );
};

export default Section;
