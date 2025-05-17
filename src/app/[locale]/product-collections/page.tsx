import React from "react";
import { pagesMargin } from "@/lib/tailwind/classNames";
import ProductCollections from "@/components/pages/product-collections/ProductCollections";
const page = () => {
  return (
    <div className={`${pagesMargin} min-h-screen`}>
      <ProductCollections />
    </div>
  );
};

export default page;
