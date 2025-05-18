"use client";
import React, { useState } from "react";
import { mockPropsCard } from "@/mock/items";
import TitleStack from "@/components/shared/titles/TitleStack";
import CustomCard from "@/components/shared/cards/CustomCard";
import ArrowDown from "@/assets/icons/arrow-down.svg";
import Image from "next/image";
import DefaultImageSlider from "@/components/shared/sliders/defaultImageSlider";
import { CollectionType } from "@/types/collectionType";
import { Item as ProductType } from "@/types/item";
import { useRouter } from "next/navigation";
type Props = CollectionType & {
  products: ProductType[];
};

const AdvancedSection = (props: Props) => {
  const {
    title,
    subtitle,
    thirdTitle,
    _createdAt,
    _id,
    propertyRefs,
    products,
  } = props;
  const router = useRouter();

  const [visibleCount, setVisibleCount] = useState(4);
  const hasMore = visibleCount < products.length;

  const handleLoadMore = () => {
    setVisibleCount(products.length); // or load by chunks
  };

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
        </div>
        <div className="hidden lg:flex justify-between items-center self-end ">
          <div className="w-full">
            <button
              className="text-secondary font-[400] text-[16px] cursor-pointer "
              onClick={handleSeeAll}
            >
              See All
            </button>
          </div>
        </div>
      </div>
      {/*  all men ,women kids */}
      <div className="flex gap-8 items-center ">
        <div className="cursor-pointer">(ALL)</div>
        <div className="text-secondary-gray cursor-pointer">Men</div>
        <div className="text-secondary-gray cursor-pointer">Women</div>
        <div className="text-secondary-gray cursor-pointer">Kids</div>
      </div>

      <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.slice(0, visibleCount).map((item, index) => (
          <CustomCard
            item={item}
            index={index}
            labelEnabled={true}
            addToCartEnabled={true}
            key={index}
          />
        ))}
      </div>

      {hasMore && (
        <div className="hidden lg:flex justify-center mt-4">
          <button
            onClick={handleLoadMore}
            className=" flex flex-col items-center cursor-pointer"
          >
            <div className="text-secondary-gray ">Load More</div>
            <Image
              src={ArrowDown}
              alt="Load More"
              width={24}
              height={24}
              className="mt-2 cursor-pointer"
            />
          </button>
        </div>
      )}
      <div className="lg:hidden w-full">
        <DefaultImageSlider
          data={products}
          addToCartEnabled={true}
          labelEnabled={true}
          labelEnabledPhone={true}
        />
      </div>
    </section>
  );
};

export default AdvancedSection;
