import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { COLOR_PRESETS, SIZES } from "../../../lib/constants";
import { Color, Variations } from "../../../lib/types";

interface ColorPickerSectionProps {
  selectedColors: Color[];
  setSelectedColors: React.Dispatch<React.SetStateAction<Color[]>>;
  variations: Variations;
  setVariations: React.Dispatch<React.SetStateAction<Variations>>;
}

export default function ColorPickerSection({
  selectedColors,
  setSelectedColors,
  variations,
  setVariations,
}: ColorPickerSectionProps) {
  const [color, setColor] = useState<string>("#aabbcc");
  const [colorName, setColorName] = useState<string>("");

  const handleAddColor = () => {
    if (!selectedColors.some((c) => c.value === color) && colorName.trim()) {
      const newColor: Color = {
        name: colorName.trim(),
        value: color,
      };

      setSelectedColors([...selectedColors, newColor]);

      const initialStock = SIZES.reduce((acc, size) => {
        acc[size] = 0;
        return acc;
      }, {} as { [size: string]: number });

      setVariations((prev) => ({
        ...prev,
        [color]: initialStock,
      }));

      setColorName("");
    }
  };

  const handleAddPresetColor = (presetColor: Color) => {
    if (!selectedColors.some((c) => c.value === presetColor.value)) {
      setSelectedColors([...selectedColors, presetColor]);

      const initialStock = SIZES.reduce((acc, size) => {
        acc[size] = 0;
        return acc;
      }, {} as { [size: string]: number });

      setVariations((prev) => ({
        ...prev,
        [presetColor.value]: initialStock,
      }));
    }
  };

  return (
    <div className="space-y-4">
      <div className="p-4 border rounded-lg bg-slate-50">
        <h3 className="font-medium mb-3">Couleurs prédéfinies</h3>
        <div className="flex flex-wrap gap-2">
          {COLOR_PRESETS.map((presetColor) => (
            <button
              key={presetColor.value}
              type="button"
              onClick={() => handleAddPresetColor(presetColor)}
              className="flex items-center gap-2 px-3 py-1.5 border rounded-full hover:bg-slate-100"
            >
              <div
                className="w-4 h-4 rounded-full border"
                style={{ backgroundColor: presetColor.value }}
              />
              <span className="text-sm">{presetColor.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 border rounded-lg">
        <h3 className="font-medium mb-3">Ajouter une couleur personnalisée</h3>
        <div className="grid md:grid-cols-[1fr_2fr] gap-4">
          <div>
            <HexColorPicker
              color={color}
              onChange={setColor}
              className="w-full"
            />
            <div className="mt-2 flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-full border"
                style={{ backgroundColor: color }}
              />
              <Input
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="font-mono text-sm"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="colorName">Nom de la couleur</Label>
              <Input
                id="colorName"
                value={colorName}
                onChange={(e) => setColorName(e.target.value)}
                placeholder="ex: Bleu océan"
              />
            </div>

            <Button
              type="button"
              onClick={handleAddColor}
              disabled={!colorName.trim()}
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Ajouter cette couleur
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
