import React from "react";
import ProductHeader from "./ProductHeader";
import CustomCard from "@/components/shared/cards/CustomCard";
import { Product } from "@/types/models/product";

interface ProductsViewProps {
  products: Product[];
  handleSearch: (searchTerm: string) => void;
}
const ProductsView = ({ products, handleSearch }: ProductsViewProps) => {
  return (
    <div className="flex-1">
      <div className="flex flex-col gap-4">
        <ProductHeader handleSearch={handleSearch} products={products} />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {products?.map((item, index) => (
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
