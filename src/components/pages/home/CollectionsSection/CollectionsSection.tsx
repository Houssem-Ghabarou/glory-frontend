import React from "react";
import { sanityFetch } from "@/sanity/lib/fetch";
import { collectionSectionQuery } from "@/sanity/lib/queries";
import Section from "./Section";
import { CollectionType } from "@/types/collectionType";

const CollectionsSection = async () => {
  const collectionsSections = await sanityFetch<CollectionType[]>({
    query: collectionSectionQuery,
    params: {},
  });

  return (
    <>
      {collectionsSections?.map((section) => (
        <Section
          _id={section._id}
          _createdAt={section._createdAt}
          key={section._id}
          title={section.title}
          subtitle={section.subtitle}
          propertyRefs={section.propertyRefs}
        />
      ))}
    </>
  );
};

export default CollectionsSection;
