"use client";
import * as Slider from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

interface PriceRangeSliderProps {
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onChange?: (values: [number, number]) => void;
  className?: string;
}

export function PriceRangeSlider({
  min,
  max,
  step = 1,
  value,
  onChange,
  className,
}: PriceRangeSliderProps) {
  const handleValueChange = (newValues: number[]) => {
    const range: [number, number] = [newValues[0], newValues[1]];
    if (onChange) {
      onChange(range);
    }
  };

  return (
    <div className={cn("space-y-5", className)}>
      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-5"
        value={value}
        min={min}
        max={max}
        step={step}
        onValueChange={handleValueChange}
      >
        <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
          <Slider.Range className="absolute bg-[#000E8A] rounded-full h-full" />
        </Slider.Track>
        <Slider.Thumb
          className="block w-5 h-5 bg-white border-2 border-[#000E8A] rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#000E8A] focus:ring-offset-2"
          aria-label="Min price"
        />
        <Slider.Thumb
          className="block w-5 h-5 bg-white border-2 border-[#000E8A] rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#000E8A] focus:ring-offset-2"
          aria-label="Max price"
        />
      </Slider.Root>

      <div className="flex items-center justify-between">
        <div className="border border-gray-300 rounded px-3 py-1.5">
          <span className="text-sm text-gray-500">$</span>
          <span className="font-medium">{value[0]}</span>
        </div>
        <div className="text-gray-400">—</div>
        <div className="border border-gray-300 rounded px-3 py-1.5">
          <span className="text-sm text-gray-500">$</span>
          <span className="font-medium">{value[1]}</span>
        </div>
      </div>
    </div>
  );
}
