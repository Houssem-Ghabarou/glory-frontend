"use client";

import { cn } from "@/lib/utils";

interface SizeSelectorProps {
  options: Array<{
    id: string;
    label: string;
  }>;
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
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {options.map((size) => {
        const isSelected = selectedSizes.includes(size.id);
        return (
          <button
            key={size.id}
            type="button"
            onClick={() => onChange(size.id)}
            className={cn(
              "min-w-12 h-12 flex items-center justify-center border border-gray-300 text-sm font-medium",
              isSelected
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-900 hover:bg-gray-50"
            )}
            aria-pressed={isSelected}
          >
            {size.label}
          </button>
        );
      })}
    </div>
  );
}
