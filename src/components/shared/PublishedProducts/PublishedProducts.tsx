"use client";

import Image from "next/image";
import { Product } from "@/types/models/product";

interface PublishedProductsProps {
  products: Product[];
}

const PublishedProducts: React.FC<PublishedProductsProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {products.map((product) => {
        const hasSale = product.sale && product.sale !== 0;
        const discountPercent = hasSale
          ? Math.round(100 - (product.sale / product.price) * 100)
          : 0;

        return (
          <div
            key={product._id}
            className="p-4 flex flex-col bg-white shadow-sm hover:shadow transition-shadow"
          >
            {/* Image container */}
            <div className="relative w-full h-40 bg-gray-100 mb-4 flex items-center justify-center overflow-hidden rounded">
              {/* Badge dans l'image */}
              {hasSale && (
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded font-semibold z-10">
                  -{discountPercent}%
                </div>
              )}

              {product?.images?.[0] && (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  className="rounded-lg object-cover"
                  width={150}
                  height={150}
                />
              )}
            </div>

            {/* Détails produit */}
            <div className="flex flex-col px-4 items-start gap-1">
              {/* Nom */}
              <p className="text-sm font-semibold">{product.name}</p>

              {/* Prix */}
              {hasSale ? (
                <div className="flex flex-col items-start ">
                  <span className="line-through text-gray-500 text-sm">
                    {product.price.toFixed(2)}$
                  </span>
                  <span className="text-red-600 font-bold text-base">
                    {product.sale.toFixed(2)}$
                  </span>
                </div>
              ) : (
                <span className="text-black font-semibold text-base">
                  {product.price.toFixed(2)}$
                </span>
              )}
            </div>

            {/* Bouton aligné à droite */}
            <button className="mt-auto self-end px-4 py-1 bg-black text-white text-sm rounded">
              Publier
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default PublishedProducts;
