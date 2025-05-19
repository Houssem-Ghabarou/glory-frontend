import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BasicInfoTab from "./BasicInfoTab";
import VariationsTab from "./VariationsTab";
import ImagesTab from "./ImagesTab";
import useProductForm from "../../../hooks/useProductForm";
import {
  Color,
  Variations,
  ProductFormData,
  PreviewImage,
} from "../../../lib/types";
import { UseFormReturn } from "react-hook-form";
import { Product } from "@/types/models/product";

interface AddProductProps {
  product?: Product;
  isEdit: boolean;
}

export default function AddProduct({ product, isEdit }: AddProductProps) {
  const [activeTab, setActiveTab] = useState<"basic" | "variations" | "images">(
    "basic"
  );
  const {
    form,
    variations,
    selectedColors,
    previewImages,
    isSubmitting,
    errorMessage,
    handleSubmit,
    setSelectedColors,
    setVariations,
    setPreviewImages,
  }: {
    form: UseFormReturn<ProductFormData>;
    variations: Variations;
    selectedColors: Color[];
    previewImages: PreviewImage[];
    isSubmitting: boolean;
    errorMessage: string | null;
    handleSubmit: (e: React.FormEvent) => void;
    setSelectedColors: React.Dispatch<React.SetStateAction<Color[]>>;
    setVariations: React.Dispatch<React.SetStateAction<Variations>>;
    setPreviewImages: React.Dispatch<React.SetStateAction<PreviewImage[]>>;
  } = useProductForm(product, isEdit);

  const nextTab = () => {
    if (activeTab === "basic") setActiveTab("variations");
    else if (activeTab === "variations") setActiveTab("images");
  };

  const prevTab = () => {
    if (activeTab === "images") setActiveTab("variations");
    else if (activeTab === "variations") setActiveTab("basic");
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Card>
        <CardContent className="pt-6">
          {errorMessage && activeTab === "basic" && (
            <p className="text-red-500 mb-4">{errorMessage}</p>
          )}
          <form onSubmit={handleSubmit}>
            <Tabs
              value={activeTab}
              onValueChange={(value) =>
                setActiveTab(value as "basic" | "variations" | "images")
              }
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Informations</TabsTrigger>
                <TabsTrigger value="variations">Variations</TabsTrigger>
                <TabsTrigger value="images">Images</TabsTrigger>
              </TabsList>

              {activeTab === "basic" && (
                <BasicInfoTab form={form} nextTab={nextTab} />
              )}

              {activeTab === "variations" && (
                <VariationsTab
                  selectedColors={selectedColors}
                  setSelectedColors={setSelectedColors}
                  variations={variations}
                  setVariations={setVariations}
                  prevTab={prevTab}
                  nextTab={nextTab}
                  errorMessage={errorMessage}
                />
              )}

              {activeTab === "images" && (
                <ImagesTab
                  previewImages={previewImages}
                  setPreviewImages={setPreviewImages}
                  prevTab={prevTab}
                  isSubmitting={isSubmitting}
                  isEdit={isEdit}
                  errorMessage={errorMessage} // Pass errorMessage
                />
              )}
            </Tabs>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
