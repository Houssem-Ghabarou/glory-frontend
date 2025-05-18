import React from "react";
import DynamicSection from "./DynamicSection";
import { heroSectionQuery } from "@/sanity/lib/queries";
import { CollectionType } from "@/types/collectionType";
import { sanityFetch } from "@/sanity/lib/fetch";
import DynamicSectionWrapper from "./DynamicSectionWrapper";

const DynamicCollection = async () => {
  const heroSection = await sanityFetch<CollectionType[]>({
    query: heroSectionQuery,
    params: {},
  });
  return (
    <div className="flex flex-col gap-8 w-full items-stretch">
      {heroSection?.map((section) => {
        const propertyRefs = section.propertyRefs || [];
        const formattedRefs = propertyRefs?.map((ref: any) => ref?.id);
        if (formattedRefs?.length === 0) {
          return null;
        } else {
          return <DynamicSectionWrapper key={section._id} section={section} />;
        }
      })}
    </div>
  );
};

export default DynamicCollection;
