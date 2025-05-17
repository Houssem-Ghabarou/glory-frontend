// components/ColorPicker.js
"use client";
import { HexColorPicker } from "react-colorful";
import { useState } from "react";

interface ColorPickerProps {
  onAddColor: (color: string) => void;
}

export default function ColorPicker({ onAddColor }: ColorPickerProps) {
  const [color, setColor] = useState("#aabbcc");

  return (
    <div className="mb-4">
      <HexColorPicker color={color} onChange={setColor} />
      <button
        onClick={() => onAddColor(color)}
        className="mt-2 bg-black text-white px-4 py-2 rounded"
      >
        Add Color
      </button>
    </div>
  );
}
