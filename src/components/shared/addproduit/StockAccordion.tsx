  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import { Trash2 } from "lucide-react";
  import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  import { SIZES } from "../../../lib/constants";
  import { Color, Variations } from "../../../lib/types";

  interface StockAccordionProps {
    selectedColors: Color[];
    variations: Variations;
    setVariations: React.Dispatch<React.SetStateAction<Variations>>;
    setSelectedColors: React.Dispatch<React.SetStateAction<Color[]>>;
  }

  export default function StockAccordion({
    selectedColors,
    variations,
    setVariations,
    setSelectedColors,
  }: StockAccordionProps) {
    const removeColor = (colorToRemove: Color) => {
      setSelectedColors(
        selectedColors.filter((c) => c.value !== colorToRemove.value)
      );
      setVariations((prev) => {
        const newVariations = { ...prev };
        delete newVariations[colorToRemove.value];
        return newVariations;
      });
    };

    const updateStock = (colorValue: string, size: string, value: string) => {
      setVariations((prev) => ({
        ...prev,
        [colorValue]: {
          ...prev[colorValue],
          [size]: Number.parseInt(value) || 0,
        },
      }));
    };

    return (
      <div className="space-y-3">
        <h3 className="font-medium">Couleurs et stocks</h3>

        <Accordion type="multiple" className="w-full">
          {selectedColors.map((colorObj, index) => (
            <AccordionItem key={index} value={`color-${index}`}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-2">
                  <div
                    className="w-5 h-5 rounded-full border"
                    style={{ backgroundColor: colorObj.value }}
                  />
                  <span>{colorObj.name}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="p-3">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium">Stock par taille</h4>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeColor(colorObj)}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Supprimer
                    </Button>
                  </div>

                  <div className="grid grid-cols-5 gap-2">
                    {SIZES.map((size) => (
                      <div key={size} className="flex flex-col items-center">
                        <Label className="text-sm mb-1">{size}</Label>
                        <Input
                          type="number"
                          min={0}
                          value={variations[colorObj.value]?.[size] || 0}
                          onChange={(e) =>
                            updateStock(colorObj.value, size, e.target.value)
                          }
                          className="w-16 text-center"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    );
  }
