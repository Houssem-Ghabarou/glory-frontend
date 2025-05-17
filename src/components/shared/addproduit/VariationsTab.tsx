import { Button } from "@/components/ui/button";
import ColorPickerSection from "./ColorPickerSection";
import StockAccordion from "./StockAccordion";
import { Color, Variations } from "../../../lib/types";

interface VariationsTabProps {
  selectedColors: Color[];
  setSelectedColors: React.Dispatch<React.SetStateAction<Color[]>>;
  variations: Variations;
  setVariations: React.Dispatch<React.SetStateAction<Variations>>;
  prevTab: () => void;
  nextTab: () => void;
}

export default function VariationsTab({
  selectedColors,
  setSelectedColors,
  variations,
  setVariations,
  prevTab,
  nextTab,
}: VariationsTabProps) {
  return (
    <div className="space-y-6 py-4">
      <h2 className="text-xl font-bold">Variations de produit</h2>

      <ColorPickerSection
        selectedColors={selectedColors}
        setSelectedColors={setSelectedColors}
        variations={variations}
        setVariations={setVariations}
      />

      {selectedColors.length > 0 && (
        <StockAccordion
          selectedColors={selectedColors}
          variations={variations}
          setVariations={setVariations}
          setSelectedColors={setSelectedColors}
        />
      )}

      <div className="flex justify-between">
        <Button
          type="button"
          className="hover:bg-black hover:text-white"
          onClick={prevTab}
        >
          Précédent
        </Button>
        <Button
          type="button"
          className="hover:bg-black hover:text-white"
          onClick={nextTab}
        >
          Suivant
        </Button>
      </div>
    </div>
  );
}
