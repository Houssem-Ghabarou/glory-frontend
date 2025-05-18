import { groq } from "next-sanity";

export const collectionSectionQuery = groq`
  *[_type == "collectionSection"] {
    _id,
    _createdAt,
    title,
    subtitle,
    propertyRefs
  }
`;
