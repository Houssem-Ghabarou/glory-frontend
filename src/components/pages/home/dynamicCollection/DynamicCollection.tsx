import React from "react";
import { titleClass, subtitleClass } from "@/lib/tailwind/classNames";
import CustomButton from "@/components/shared/CustomButton/CustomButton";
import Image from "next/image";
import cloth1 from "@/assets/images/cloth1.png";
import cloth2 from "@/assets/images/cloth2.png";

import Swiper from "@/components/shared/Swiper/Swiper";
import ImagesSlider from "@/components/shared/sliders/ImagesSlider";
const DynamicCollection = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 w-full  items-center justify-between h-[400px]">
      <div className="flex flex-col w-full self-start h-full justify-between">
        <div className="flex flex-col gap-2 flex-grow">
          <div>
            <h1 className={`${titleClass}`}>NEW</h1>
            <h1 className={`${titleClass}`}>COLLECTION</h1>
          </div>
          <div>
            <h1 className={`${subtitleClass}`}>Summer</h1>
            <h1 className={`${subtitleClass}`}>2024</h1>
          </div>
        </div>
        <div className="hidden lg:flex justify-between items-center">
          <div className="w-[50%]">
            <CustomButton />
          </div>
          <Swiper />
        </div>
      </div>
      <div className="hidden lg:flex   items-center  justify-between h-full">
        <div className="flex  gap-4">
          <div className="hidden xl:inline relative lg:w-[400px] lg:h-[400px] border-[1px] border-[#D7D7D7]">
            <Image src={cloth1} alt="Cloth 1" fill className="object-cover " />
          </div>
          <div className="relative w-[400px] h-[400px] border-[1px] border-[#D7D7D7]">
            <Image src={cloth2} alt="Cloth 2" fill className="object-cover " />
          </div>
        </div>
      </div>
      <div className="lg:hidden flex flex-col gap-4 w-full h-full">
        <ImagesSlider images={[cloth1.src, cloth2.src]} />
      </div>
    </div>
  );
};

export default DynamicCollection;
