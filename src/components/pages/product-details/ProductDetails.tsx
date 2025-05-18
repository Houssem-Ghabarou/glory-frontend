"use client";

import { useState } from "react";
import { useIsMobile } from "@/hooks/useMobile";
import { classNames as cn } from "@/lib/tailwind/classNames";
import ImageGallery from "@/components/shared/sliders/GalleryImageSlider";
import ProductInfo from "./ProductInfo";
import cloth1 from "@/assets/images/cloth1.png";
import cloth2 from "@/assets/images/cloth2.png";
import cloth3 from "@/assets/images/cloth3.jpg";
import cloth4 from "@/assets/images/cloth4.jpg";
import photodetails from "@/assets/images/photodetails.jpg";
import { Product } from "@/types/models/product";

const productImages = [
  photodetails.src,
  cloth1.src,
  cloth2.src,
  cloth3.src,
  cloth4.src,
  cloth1.src,
  cloth1.src,
  cloth1.src,
  cloth1.src,
];
interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const isMobile = useIsMobile();

  const productImages = product?.images;

  return (
    <div className="px-4 py-10 lg:px-12 xl:px-20 mx-auto">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 lg:min-h-[600px]">
        <div className="w-full">
          <ImageGallery images={productImages} />
        </div>
        <ProductInfo product={product} />
      </div>
    </div>
  );
}
