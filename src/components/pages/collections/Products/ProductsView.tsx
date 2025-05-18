import React from "react";
import ProductHeader from "./ProductHeader";
import CustomCard from "@/components/shared/cards/CustomCard";
import { mockPropsCard } from "@/mock/items";
const ProductsView = () => {
  return (
    <div className="flex-1">
      <div className="flex flex-col gap-4">
        <ProductHeader />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {mockPropsCard.map((item, index) => (
            <CustomCard
              item={item}
              index={index}
              labelEnabled={true}
              addToCartEnabled={false}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsView;
