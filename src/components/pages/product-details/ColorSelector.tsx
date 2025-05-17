import { classNames as cn } from "@/lib/tailwind/classNames";

interface Color {
  name: string;
  className: string;
  value: string; // Add this line
}

interface ColorSelectorProps {
  colors: Color[];
  selectedColor: Color;
  onSelect: (color: Color) => void;
}

export default function ColorSelector({
  colors,
  selectedColor,
  onSelect,
}: ColorSelectorProps) {
  return (
    <div>
      <h2 className="text-sm font-medium text-gray-900">Color</h2>
      <div className="mt-3 flex space-x-4">
        {colors.map((color) => (
          <button
            key={color.name}
            className={cn(
              "relative h-10 w-10 flex items-center justify-center rounded-full",
              selectedColor.name === color.name &&
                "ring-2 ring-offset-2 ring-black"
            )}
            onClick={() => onSelect(color)}
            aria-label={`Color: ${color.name}`}
          >
            <span className={cn("h-8 w-8 rounded-full", color.className)} />
          </button>
        ))}
      </div>
    </div>
  );
}
