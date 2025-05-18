import React from "react";
import { sanityFetch } from "@/sanity/lib/fetch";
import { collectionSectionQuery } from "@/sanity/lib/queries";
import { CollectionType } from "@/types/collectionType";
import CollectionWrapper from "./CollectionWrapper";

const CollectionsSection = async () => {
  const collectionsSections = await sanityFetch<CollectionType[]>({
    query: collectionSectionQuery,
    params: {},
  });

  return (
    <div className="flex flex-col gap-8 w-full items-stretch">
      {collectionsSections?.map((section) => {
        const propertyRefs = section?.propertyRefs || [];
        const formattedRefs = propertyRefs?.map((ref: any) => ref?.id);
        if (formattedRefs?.length === 0) {
          return null;
        } else {
          return <CollectionWrapper key={section._id} section={section} />;
        }
      })}
    </div>
  );
};

export default CollectionsSection;
