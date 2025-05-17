import { classNames as cn } from "@/lib/tailwind/classNames";

interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string;
  onSelect: (size: string) => void;
}

export default function SizeSelector({
  sizes,
  selectedSize,
  onSelect,
}: SizeSelectorProps) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-gray-900">Size</h2>
        <button className="text-sm font-medium text-gray-600 hover:text-gray-900">
          Size Guide
        </button>
      </div>
      <div className="mt-3 grid grid-cols-5 gap-3">
        {sizes.map((size) => (
          <button
            key={size}
            className={cn(
              "flex items-center justify-center border py-2 text-sm font-medium rounded-md transition-colors",
              selectedSize === size
                ? "border-black bg-black text-white"
                : "border-gray-300 bg-white text-gray-900 hover:bg-gray-50"
            )}
            onClick={() => onSelect(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
