interface ColorSelectorProps {
  colors: string[];
  selectedColor: string;
  onSelect: (color: string) => void;
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
            key={color}
            className={`relative h-10 w-10 flex items-center justify-center rounded-full ${
              selectedColor === color ? "ring-2 ring-offset-2 ring-black" : ""
            }`}
            onClick={() => onSelect(color)}
            aria-label={`Color: ${color}`}
            title={color}
          >
            <span
              className="h-8 w-8 rounded-full border"
              style={{ backgroundColor: color }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
