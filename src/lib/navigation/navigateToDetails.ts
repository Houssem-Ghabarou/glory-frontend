import slugify from "slugify";
import { Item } from "@/types/item";
// Function to handle card click
export const handleCardClick = (
  item: Item,
  redirect: (url: string) => void
) => {
  const slug = slugify(`${item?.name || "Item"}-${item?._id || "0"}`, {
    lower: true,
    strict: true,
  });
  redirect(`/product-details/${slug}`);
};
