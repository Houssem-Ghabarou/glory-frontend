import { Product } from "@/types/models/product";

interface AddToCartButtonProps {
  product: Product;
  selectedColor: string;
  selectedSize: string;
}

export default function AddToCartButton({
  product,
  selectedColor,
  selectedSize,
}: AddToCartButtonProps) {
  const variation = product.variations.find(
    (v) => v.color === selectedColor && v.size === selectedSize
  );

  const handleAddToCart = () => {
    if (!variation || variation.stock <= 0) {
      alert("This variation is out of stock.");
      return;
    }

    const item = {
      productId: product._id,
      name: product.name,
      color: selectedColor,
      size: selectedSize,
      price: product.price,
      image: product.images[0],
      quantity: 1,
    };

    console.log("Add to cart:", item);
    // Dispatch to cart context / Redux / localStorage here
  };

  return (
    <div className="mt-auto pt-6">
      <button
        onClick={handleAddToCart}
        disabled={!variation || variation.stock <= 0}
        className="w-full bg-black text-white py-3 px-4 font-medium rounded-md hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {variation && variation.stock > 0 ? "Add to Cart" : "Out of Stock"}
      </button>
    </div>
  );
}
