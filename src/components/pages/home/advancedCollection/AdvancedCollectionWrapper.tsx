import { getter } from "@/axios/api";
import { CollectionType } from "@/types/collectionType";
import { Item } from "@/types/item";
import AdvancedSection from "./AdvancedSection";

type Props = {
  section: CollectionType;
};

const AdvanceCollectionWrapper = async ({ section }: Props) => {
  const { propertyRefs = [] } = section;
  const formattedRefs = propertyRefs?.map((ref: any) => ref.id);

  let products: Item[] = [];

  if (propertyRefs?.length) {
    try {
      products = await getter<Item[]>("/products/products/by-references", {
        references: formattedRefs.join(","),
      });
    } catch (error) {
      console.error("Failed to fetch products:", error);
      products = []; // fallback to empty array
    }
  }

  if (products?.length === 0) {
    return null; // or some fallback UI
  }

  return <AdvancedSection {...section} products={products} />;
};

export default AdvanceCollectionWrapper;
