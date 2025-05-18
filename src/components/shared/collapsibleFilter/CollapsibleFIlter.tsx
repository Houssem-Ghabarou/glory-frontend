"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { PriceRangeSlider } from "./price-range-slider";
import { SizeSelector } from "./size-selector";
import type { FilterOption, FilterType, PriceRange } from "@/types/filters";

interface CollapsibleFilterProps {
  id: string;
  title: string;
  type: FilterType;
  options?: FilterOption[];
  priceRange?: PriceRange;
  defaultOpen?: boolean;
  selectedOptions?: string[];
  priceValue?: [number, number];
  onCheckboxChange?: (
    filterId: string,
    optionId: string,
    checked: boolean
  ) => void;
  onSizeChange?: (filterId: string, sizeId: string) => void;
  onPriceChange?: (filterId: string, range: [number, number]) => void;
  className?: string;
}

export function CollapsibleFilter({
  id,
  title,
  type = "checkbox",
  options = [],
  priceRange,
  defaultOpen = false,
  selectedOptions = [],
  priceValue,
  onCheckboxChange,
  onSizeChange,
  onPriceChange,
  className,
}: CollapsibleFilterProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (optionId: string) => {
    const isSelected = selectedOptions.includes(optionId);

    if (onCheckboxChange) {
      onCheckboxChange(id, optionId, !isSelected);
    }
  };

  const handleSizeChange = (sizeId: string) => {
    if (onSizeChange) {
      onSizeChange(id, sizeId);
    }
  };

  const handlePriceChange = (range: [number, number]) => {
    if (onPriceChange) {
      onPriceChange(id, range);
    }
  };

  return (
    <div
      className={cn(
        "border-b  border-dashed  border-[#C9C9C9] pb-4 ",
        className
      )}
    >
      <button
        onClick={handleToggle}
        className="w-full flex items-center justify-between font-medium text-lg py-2 cursor-pointer"
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5" />
        ) : (
          <ChevronDown className="h-5 w-5" />
        )}
      </button>

      {isOpen && (
        <div className="mt-3">
          {type === "checkbox" && (
            <div className="space-y-2">
              {options.map((option) => (
                <label
                  key={option.id}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded border-gray-300 text-gray-900 focus:ring-gray-500"
                    checked={selectedOptions.includes(option.id)}
                    onChange={() => handleCheckboxChange(option.id)}
                  />
                  <span className="flex-1">{option.label}</span>
                  {option.count !== undefined && (
                    <span className="secondary-color font-medium">
                      ({option.count})
                    </span>
                  )}
                </label>
              ))}
            </div>
          )}

          {type === "size" && (
            <SizeSelector
              options={options.map(({ id, label }) => ({ id, label }))}
              selectedSizes={selectedOptions}
              onChange={handleSizeChange}
              className="mt-2"
            />
          )}

          {type === "price" && priceRange && priceValue && (
            <PriceRangeSlider
              min={priceRange.min}
              max={priceRange.max}
              value={priceValue}
              onChange={handlePriceChange}
              className="mt-2"
            />
          )}
        </div>
      )}
    </div>
  );
}
