import slugify from "slugify";
import { Product } from "@/types/models/product";
// Function to handle card click
export const handleCardClick = (
  item: Product,
  redirect: (url: string) => void
) => {
  const slug = slugify(`${item?.name || "Item"}-${item?._id || "0"}`, {
    lower: true,
    strict: true,
  });
  redirect(`/product-details/${slug}`);
};
