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
    const variation = product.variations.find((v) => v.color === selectedColor);
    if (!variation) return [];
    return Object.entries(variation.sizes)
      .filter(([_, quantity]) => Number(quantity) > 0)
      .map(([size]) => size);
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
              {product.sale ? (
                <span>${product.sale.toFixed(2)}</span>
              ) : (
                <span>${product.price.toFixed(2)}</span>
              )}
            </p>
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

              const variation = product.variations.find(
                (v) => v.color === color
              );
              if (variation) {
                const availableSize = Object.entries(variation.sizes).find(
                  ([_, quantity]) => Number(quantity) > 0
                );
                setSelectedSize(availableSize?.[0] || "");
              } else {
                setSelectedSize("");
              }
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
