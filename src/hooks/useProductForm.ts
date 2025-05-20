import { useForm } from "react-hook-form";
import { useState } from "react";
import { ProductFormData, Color, PreviewImage, Variations } from "../lib/types";
import { buildFormData } from "../lib/types";
import { Product } from "@/types/models/product";

export default function useProductForm(
  product?: Product,
  isEdit = false,
  closeModal?: () => void
) {
  const form = useForm<ProductFormData>({
    defaultValues: {
      name: product?.name || "",
      collection: product?.collection || "",
      price: product?.price?.toString() || "",
      description: product?.description || "",
      category: product?.category || "",
      sale: product?.sale?.toString() || "0",
      gender: product?.gender || "",
    },
  });

  const [variations, setVariations] = useState<Variations>(() => {
    if (!product?.variations || !Array.isArray(product.variations)) {
      return {};
    }
    return product.variations.reduce((acc: Variations, v: any) => {
      const sizes =
        typeof v.sizes === "object" && v.sizes !== null ? v.sizes : {};
      acc[v.color] = sizes;
      return acc;
    }, {});
  });

  const [selectedColors, setSelectedColors] = useState<Color[]>(
    product?.variations?.map((v: any) => {
      const colorName =
        v.name || v.color.charAt(0).toUpperCase() + v.color.slice(1);
      return {
        name: colorName,
        value: v.color,
      };
    }) || []
  );

  const [previewImages, setPreviewImages] = useState<PreviewImage[]>(
    product?.images?.map((url: string) => ({
      url,
      preview: url,
    })) || []
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (values: ProductFormData) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      // Validate variations
      const hasValidVariations = Object.values(variations).some(
        (sizes) => Object.keys(sizes).length > 0
      );
      if (!hasValidVariations) {
        throw new Error(
          "At least one variation with sizes and stock is required"
        );
      }

      // Validate required fields
      if (!values.name || !values.collection || !values.price) {
        throw new Error("Name, collection, and price are required");
      }

      // Validate selectedColors
      if (selectedColors.length === 0) {
        throw new Error("At least one color must be selected");
      }

      // Ensure sizes values are numbers
      const validatedVariations = Object.fromEntries(
        Object.entries(variations).map(([color, sizes]) => [
          color,
          Object.fromEntries(
            Object.entries(sizes).map(([size, stock]) => [size, Number(stock)])
          ),
        ])
      );

      // Extract files from PreviewImage
      const imageFiles = previewImages
        .map((img) => img.file)
        .filter((file): file is File => file !== undefined);

      const formDataToSend = buildFormData(
        {
          name: values.name,
          collection: values.collection,
          price: values.price,
          description: values.description,
          category: values.category,
          sale: values.sale,
          gender: values.gender,
          variations: validatedVariations,
          images: imageFiles,
        },
        selectedColors
      );

      const API_BASE_URL = "http://localhost:5000/products/product";
      const url =
        isEdit && product?._id
          ? `${API_BASE_URL}/${product._id}`
          : API_BASE_URL;

      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        body: formDataToSend,
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Server error response:", errorData);
        throw new Error(
          errorData.message || "Échec de la soumission du produit"
        );
      }

      console.log("Produit enregistré avec succès !");
      // Close modal after successful submission
      if (closeModal) {
        closeModal();
      }
    } catch (error: any) {
      console.error("Erreur lors de la soumission:", {
        message: error.message,
        stack: error.stack,
      });
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = form.handleSubmit(onSubmit);

  return {
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
  };
}
