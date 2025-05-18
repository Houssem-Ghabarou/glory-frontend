import { useMemo, useState } from "react";
import ColorSelector from "./ColorSelector";
import SizeSelector from "./SizeSelector";
import AddToCartButton from "./AddToCartButton";
import { Product } from "@/types/models/product";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const uniqueColors = useMemo(() => {
    return Array.from(new Set(product.variations.map((v) => v.color)));
  }, [product]);

  const [selectedColor, setSelectedColor] = useState(uniqueColors[0]);

  const availableSizes = useMemo(() => {
    return product.variations
      .filter((v) => v.color === selectedColor)
      .map((v) => v.size);
  }, [product, selectedColor]);

  const [selectedSize, setSelectedSize] = useState(availableSizes[0]);

  return (
    <div className="w-full flex flex-col h-full justify-between self-center">
      <div className="flex flex-col h-full justify-between space-y-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {product.name}
            </h1>
            <p className="mt-2 text-xl text-gray-900">
              ${product.price.toFixed(2)}
            </p>
            <div className="mt-2 flex items-center">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="h-5 w-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              {/* <p className="ml-2 text-sm text-gray-500">42 reviews</p> */}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-medium text-gray-900">Description</h2>
            <p className="mt-2 text-sm text-gray-500">
              {product.description || "No description available."}
            </p>
          </div>

          <ColorSelector
            colors={uniqueColors}
            selectedColor={selectedColor}
            onSelect={(color) => {
              setSelectedColor(color);
              const sizes = product.variations
                .filter((v) => v.color === color)
                .map((v) => v.size);
              setSelectedSize(sizes[0] || "");
            }}
          />

          <SizeSelector
            sizes={availableSizes}
            selectedSize={selectedSize}
            onSelect={setSelectedSize}
          />
        </div>

        <AddToCartButton
          product={product}
          key={product._id}
          selectedColor={selectedColor}
          selectedSize={selectedSize}
        />
      </div>
    </div>
  );
}
