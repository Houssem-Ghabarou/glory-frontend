import React from "react";
import Image from "next/image";
import cloth1 from "@/assets/images/cloth1.png";
import cloth2 from "@/assets/images/cloth2.png";
import cloth3 from "@/assets/images/cloth3.jpg";
import cloth4 from "@/assets/images/cloth4.jpg";
import DefaultImageSlider from "@/components/shared/sliders/defaultImageSlider";
import { mockPropsCard } from "@/mock/items";

const images = [
  { src: cloth1, alt: "Cloth 1", className: "mt-[-70px]" },
  { src: cloth2, alt: "Cloth 2", className: "" },
  { src: cloth3, alt: "Cloth 3", className: "mt-[-70px]" },
  { src: cloth4, alt: "Cloth 4", className: "" },
];

const Approach = () => {
  return (
    <section className="flex flex-col items-center justify-center w-full h-full gap-6 lg:gap-40 py-4">
      {/* Text Section */}
      <div className="text-center flex flex-col items-center gap-4 w-full">
        <h3 className="text-[25px] lg:text-[48px] font-light">
          OUR APPROACH TO FASHION DESIGN
        </h3>
        <p className="lg:w-[40%] font-light text-[16px] leading-relaxed text-gray-700">
          At Elegant Vogue, we blend creativity with craftsmanship to create
          fashion that transcends trends and stands the test of time. Each
          design is meticulously crafted, ensuring the highest quality and
          exquisite finish.
        </p>
      </div>

      {/* Desktop Images */}
      <div className="hidden lg:flex gap-4 w-full justify-center">
        {images.map((image, idx) => (
          <div key={idx} className="w-[500px] h-[500px]">
            <Image
              src={image.src}
              alt={image.alt}
              className={`object-cover w-full h-full ${image.className}`}
              width={500}
              height={500}
              priority
            />
          </div>
        ))}
      </div>

      {/* Mobile Slider */}
      <div className="lg:hidden w-full">
        <DefaultImageSlider
          data={mockPropsCard}
          addToCartEnabled={false}
          labelEnabled={false}
          labelEnabledPhone={false}
        />
      </div>
    </section>
  );
};

export default Approach;
