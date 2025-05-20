import { filterSectionQuery } from "@/sanity/lib/queries";
import { CollectionType } from "@/types/collectionType";
import { sanityFetch } from "@/sanity/lib/fetch";
import AdvanceCollectionWrapper from "./AdvancedCollectionWrapper";

const AdvancedCollection = async () => {
  const filtredSections = await sanityFetch<CollectionType[]>({
    query: filterSectionQuery,
    params: {},
  });
  return (
    <div className="flex flex-col gap-8 w-full items-stretch">
      {filtredSections?.map((section) => {
        const propertyRefs = section?.propertyRefs || [];
        const formattedRefs = propertyRefs?.map((ref: any) => ref?.id);
        if (formattedRefs?.length === 0) {
          return null;
        } else {
          return (
            <AdvanceCollectionWrapper key={section._id} section={section} />
          );
        }
      })}
    </div>
  );
};

export default AdvancedCollection;
