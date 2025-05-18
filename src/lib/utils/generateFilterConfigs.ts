import { Product } from "@/types/models/product";

type FilterOption = {
  id: string;
  label: string;
  count?: number;
};

type FilterConfig =
  | {
      id: string;
      title: string;
      type: "checkbox" | "size";
      options: FilterOption[];
      defaultOpen: boolean;
    }
  | {
      id: string;
      title: string;
      type: "price";
      priceRange: {
        min: number;
        max: number;
        defaultValue: [number, number];
      };
      defaultOpen: boolean;
    };

export const generateFilterConfigs = (products: Product[]): FilterConfig[] => {
  const sizesMap = new Map<string, number>();
  const colorsMap = new Map<string, number>();
  let minPrice = Infinity;
  let maxPrice = -Infinity;

  let inStockCount = 0;
  let outOfStockCount = 0;

  for (const product of products) {
    if (product.price < minPrice) minPrice = product.price;
    if (product.price > maxPrice) maxPrice = product.price;

    for (const variation of product.variations || []) {
      // Sizes
      if (variation.size) {
        sizesMap.set(variation.size, (sizesMap.get(variation.size) || 0) + 1);
      }

      // Colors
      if (variation.color) {
        colorsMap.set(
          variation.color,
          (colorsMap.get(variation.color) || 0) + 1
        );
      }

      // Availability
      if (variation.stock && variation.stock > 0) {
        inStockCount++;
      } else {
        outOfStockCount++;
      }
    }
  }

  const sizeOptions = Array.from(sizesMap.entries()).map(([id]) => ({
    id,
    label: id,
  }));

  const colorOptions = Array.from(colorsMap.entries()).map(([id, count]) => ({
    id,
    label: id,
    count,
  }));

  const availabilityOptions = [
    { id: "in_stock", label: "In Stock", count: inStockCount },
    { id: "out_of_stock", label: "Out Of Stock", count: outOfStockCount },
  ];

  return [
    {
      id: "availability",
      title: "Availability",
      type: "checkbox",
      options: availabilityOptions,
      defaultOpen: true,
    },
    {
      id: "price",
      title: "Price Range",
      type: "price",
      priceRange: {
        min: Math.floor(minPrice),
        max: Math.ceil(maxPrice),
        defaultValue: [Math.floor(minPrice), Math.ceil(maxPrice)],
      },
      defaultOpen: true,
    },
    {
      id: "size",
      title: "Size",
      type: "size",
      options: sizeOptions,
      defaultOpen: true,
    },
    {
      id: "color",
      title: "Color",
      type: "checkbox",
      options: colorOptions,
      defaultOpen: false,
    },
  ];
};
