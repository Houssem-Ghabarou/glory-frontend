import { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { SIZES } from "../lib/constants";
import type { Color, Variations, FormData, PreviewImage } from "../lib/types";

export default function useProductForm() {
  const [selectedColors, setSelectedColors] = useState<Color[]>([]);
  const [variations, setVariations] = useState<Variations>({});
  const [previewImages, setPreviewImages] = useState<PreviewImage[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const form: UseFormReturn<FormData> = useForm<FormData>({
    defaultValues: {
      name: "",
      collection: "",
      price: "",
      description: "",
      category: "",
      featured: false,
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      // Limit to 5 images
      if (previewImages.length > 5) {
        toast({
          title: "Erreur",
          description: "Vous ne pouvez uploader que 5 images maximum.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Map variations to backend format
      const allVariations: { color: string; size: string; stock: number }[] =
        [];
      for (const colorObj of selectedColors) {
        const colorValue = colorObj.value;
        const colorName = colorObj.name; // Map to 'color' in backend

        for (const size of SIZES) {
          if (variations[colorValue]?.[size] > 0) {
            allVariations.push({
              color: colorName, // Use colorName as 'color' for backend
              size,
              stock: variations[colorValue][size] || 0,
            });
          }
        }
      }

      if (allVariations.length === 0) {
        toast({
          title: "Erreur",
          description: "Veuillez ajouter au moins une variation avec du stock.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value.toString());
      });
      formData.append("variations", JSON.stringify(allVariations));
      previewImages.forEach((file) => {
        formData.append("images", file);
      });

      const res = await fetch("http://localhost:5000/products/product", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.message || "Erreur lors de la création du produit"
        );
      }

      const savedProduct = await res.json();
      toast({
        title: "Succès",
        description: "Produit ajouté avec succès !",
      });

      form.reset();
      setSelectedColors([]);
      setVariations({});
      setPreviewImages([]);
    } catch (error: unknown) {
      toast({
        title: "Erreur",
        description:
          error instanceof Error
            ? error.message
            : "Une erreur est survenue lors de l'ajout du produit",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    selectedColors,
    setSelectedColors,
    variations,
    setVariations,
    previewImages,
    setPreviewImages,
    isSubmitting,
    handleSubmit: form.handleSubmit(onSubmit),
  };
}
