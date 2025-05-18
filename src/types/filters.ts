// Define types for our filter system
export type FilterType = "checkbox" | "price" | "size" | "rating";

export type FilterOption = {
  id: string;
  label: string;
  count?: number;
  checked?: boolean;
};

export type PriceRange = {
  min: number;
  max: number;
  defaultValue?: [number, number];
};

export type FilterState = {
  [filterId: string]: {
    type: FilterType;
    values: string[] | [number, number] | null;
  };
};

export type FilterConfig = {
  id: string;
  title: string;
  type: FilterType;
  options?: FilterOption[];
  priceRange?: PriceRange;
  defaultOpen?: boolean;
};
