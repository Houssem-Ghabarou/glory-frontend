import useCart from "@/components/shared/cart/useCart";
import { CartItem } from "@/types/cart";
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
  const { addItem, removeItem, cartItems, totalPrice } = useCart();

  const variation = product.variations.find(
    //@ts-ignore
    (v) => v.color === selectedColor && v.sizes[selectedSize] > 0
  );

  //@ts-ignore
  const sizeStock = variation?.sizes[selectedSize] || 0;

  const handleAddToCart = () => {
    if (!variation || sizeStock <= 0) {
      alert("This variation is out of stock.");
      return;
    }

    const item: CartItem = {
      _id: product?._id,
      name: product?.name,
      color: selectedColor,
      size: selectedSize,
      price: product?.price,
      sale: product?.sale,
      image: product?.images[0],
      quantity: 1,
    };

    addItem(item);

    // Dispatch to cart context / Redux / localStorage here
  };

  return (
    <div className="mt-auto pt-6">
      <button
        onClick={handleAddToCart}
        disabled={!variation || sizeStock <= 0}
        className="w-full bg-black text-white py-3 px-4 font-medium rounded-md hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {variation && sizeStock > 0 ? "Add to Cart" : "Out of Stock"}
      </button>
    </div>
  );
}
