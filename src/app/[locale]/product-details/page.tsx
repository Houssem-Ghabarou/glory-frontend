import React from "react";
import { pagesMargin } from "@/lib/tailwind/classNames";
import ProductDetail from "@/components/pages/product-details/ProductDetails";
const page = () => {
  return (
    <div className={`min-h-screen ${pagesMargin}`}>
      <ProductDetail />
    </div>
  );
};

export default page;
