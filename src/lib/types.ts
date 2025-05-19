export interface Color {
  name: string;
  value: string;
}

export interface Variations {
  [color: string]: {
    [size: string]: number;
  };
}

export interface ProductFormData {
  name: string;
  collection: string;
  price: string;
  description: string;
  sale: string;
  category: string;
  variations: Variations;
  images: File[];
}

export interface PreviewImage {
  url: string; // URL pour affichage
  preview: string; // base64 ou url pour preview
  file?: File; // Le fichier uploadé, obligatoire pour envoyer au backend
}

export function buildFormData(
  data: ProductFormData,
  selectedColors: Color[]
): FormData {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("collection", data.collection);
  formData.append("price", isNaN(Number(data.price)) ? "0" : data.price);
  formData.append("description", data.description);
  formData.append("category", data.category);
  formData.append(
    "sale",
    isNaN(Number(data.sale)) || data.sale.trim() === "" ? "0" : data.sale
  );

  // Transform variations to backend-compatible format
  const flatVariations = [];
  for (const [color, sizes] of Object.entries(data.variations)) {
    const colorObj = selectedColors.find((c) => c.value === color);
    const colorName = colorObj?.name || "Unknown";
    flatVariations.push({
      color,
      name: colorName,
      sizes,
    });
  }
  formData.append("variations", JSON.stringify(flatVariations));

  // Add image files
  data.images.forEach((file) => {
    formData.append("images", file);
  });

  return formData;
}
