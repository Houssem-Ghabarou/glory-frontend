import { getter } from "@/axios/api";
import { CollectionType } from "@/types/collectionType";
import DynamicSection from "./DynamicSection";
import { Product } from "@/types/models/product";

type Props = {
  section: CollectionType;
};

const DynamicSectionWrapper = async ({ section }: Props) => {
  const { propertyRefs = [] } = section;
  const formattedRefs = propertyRefs?.map((ref: any) => ref.id);

  let products: Product[] = [];

  if (propertyRefs?.length) {
    try {
      products = await getter<Product[]>("/products/products/by-references", {
        references: formattedRefs.join(","),
      });
    } catch (error) {
      console.error("Error fetching products by references:", error);
      products = []; // fallback to empty list
    }
  }

  if (products?.length === 0) {
    return null; // or some fallback UI
  }

  return <DynamicSection {...section} products={products} />;
};

export default DynamicSectionWrapper;
