"use client";

import Image from "next/image";
import { Product } from "@/types/models/product";
import { handleCardClick } from "../../../lib/navigation/navigateToDetails";
import { redirect } from "next/navigation";
import { useState } from "react";
import AddProduit from "../addproduit/AddProduit";
import { X } from "lucide-react";

interface PublishedProductsProps {
  products: Product[];
}

const PublishedProducts: React.FC<PublishedProductsProps> = ({ products }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {products.map((product) => {
        const hasSale = typeof product.sale === "number" && product.sale > 0;
        const discountPercent = hasSale
          ? Math.round(100 - (product.sale / product.price) * 100)
          : 0;

        return (
          <div
            key={product._id}
            className="p-4 flex flex-col bg-white shadow-sm hover:shadow transition-shadow cursor-pointer"
          >
            {/* Image container */}
            <div className="relative w-full h-40 bg-gray-100 mb-4 flex items-center justify-center overflow-hidden rounded">
              {hasSale && discountPercent > 0 && (
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded font-semibold z-10">
                  -{discountPercent}%
                </div>
              )}

              {product?.images?.[0] && (
                <Image
                  onClick={() => handleCardClick(product, redirect)}
                  src={product.images[0]}
                  alt={product.name}
                  className="rounded-lg object-cover"
                  width={150}
                  height={150}
                />
              )}
            </div>
            {/* Product details */}
            <div className="flex flex-col px-4 items-start gap-1">
              <p className="text-sm font-semibold">{product.name}</p>
              <p className="text-xs text-gray-500">{product.reference}</p>

              {hasSale ? (
                <div className="flex flex-col items-start">
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
            {/* Edit button */}
            <button
              className="mt-auto self-end px-4 py-1 bg-black text-white text-sm rounded cursor-pointer"
              onClick={() => openModal(product)}
            >
              Editer
            </button>
          </div>
        );
      })}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 text-gray-600 hover:text-gray-800"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="p-6">
              <AddProduit
                product={selectedProduct}
                isEdit={true}
                closeModal={closeModal}
              />{" "}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PublishedProducts;
