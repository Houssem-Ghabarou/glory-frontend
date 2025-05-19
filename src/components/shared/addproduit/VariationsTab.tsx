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
  errorMessage?: string | null;
}

export default function VariationsTab({
  selectedColors,
  setSelectedColors,
  variations,
  setVariations,
  prevTab,
  nextTab,
  errorMessage,
}: VariationsTabProps) {
  const hasValidVariations = Object.values(variations).some(
    (sizes) => Object.keys(sizes).length > 0
  );

  return (
    <div className="space-y-6 py-4">
      <h2 className="text-xl font-bold">Variations de produit</h2>

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

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
          disabled={selectedColors.length === 0 || !hasValidVariations}
        >
          Suivant
        </Button>
      </div>
    </div>
  );
}
