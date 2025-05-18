import { Product } from "@/types/models/product";
import { FilterState } from "@/types/filters"; // assuming this is your main FilterState type

function filterProducts(
  products: Product[],
  filterState: FilterState
): Product[] {
  return products.filter((product) => {
    // 1. Filter by Availability
    if (
      filterState.availability &&
      filterState.availability.values !== null &&
      filterState.availability.values.length > 0
    ) {
      const availabilityValues = filterState.availability.values as string[]; // ['in_stock', 'out_of_stock']

      const hasInStock = product.variations.some((v) => v.stock > 0);
      const hasOutOfStock = product.variations.some((v) => v.stock === 0);

      if (
        (availabilityValues.includes("in_stock") && hasInStock) ||
        (availabilityValues.includes("out_of_stock") && hasOutOfStock)
      ) {
        // passes availability filter
      } else {
        return false;
      }
    }

    // 2. Filter by Price Range
    if (
      filterState.price &&
      filterState.price.values !== null &&
      filterState.price.values.length === 2
    ) {
      const [minPrice, maxPrice] = filterState.price.values as [number, number];
      if (product.price < minPrice || product.price > maxPrice) {
        return false;
      }
    }

    // 3. Filter by Size
    if (
      filterState.size &&
      filterState.size.values !== null &&
      filterState.size.values.length > 0
    ) {
      const selectedSizes = filterState.size.values as string[];
      const hasSize = product.variations.some((v) =>
        selectedSizes.includes(v.size)
      );
      if (!hasSize) return false;
    }

    // 4. Filter by Color
    if (
      filterState.color &&
      filterState.color.values !== null &&
      filterState.color.values.length > 0
    ) {
      const selectedColors = filterState.color.values as string[];
      const hasColor = product.variations.some((v) =>
        selectedColors.includes(v.color)
      );
      if (!hasColor) return false;
    }

    return true;
  });
}

export default filterProducts;
