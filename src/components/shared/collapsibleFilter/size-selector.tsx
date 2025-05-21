"use client";

import { cn } from "@/lib/utils";

interface RawOption {
  id: Record<string, number>;
  label: Record<string, number>;
}

interface SizeSelectorProps {
  options: RawOption[];
  selectedSizes: string[];
  onChange: (sizeId: string) => void;
  className?: string;
}

export function SizeSelector({
  options,
  selectedSizes,
  onChange,
  className,
}: SizeSelectorProps) {
  // Extract and flatten available sizes
  const availableSizes = Object.entries(
    options.reduce(
      (acc, curr) => {
        for (const size in curr.id) {
          if (curr.id[size] > 0) acc[size] = true;
        }
        return acc;
      },
      {} as Record<string, boolean>
    )
  ).map(([size]) => size);

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {availableSizes.map((size) => {
        const isSelected = selectedSizes.includes(size);
        return (
          <button
            key={size}
            type="button"
            onClick={() => onChange(size)}
            className={cn(
              "min-w-12 h-12 flex items-center justify-center border border-gray-300 text-sm font-medium",
              isSelected
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-900 hover:bg-gray-50"
            )}
            aria-pressed={isSelected}
          >
            {size}
          </button>
        );
      })}
    </div>
  );
}
