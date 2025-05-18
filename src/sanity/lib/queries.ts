import { groq } from "next-sanity";

export const collectionSectionQuery = groq`
    *[_type == "collectionSection" && isCollectionSection == true] {
        _id,
        _createdAt,
        title,
        subtitle,
        propertyRefs,
        thirdTitle,
        hasFilter,
        isHeroSection,
        fourthTitle

    }
`;

//get isHeroSection ones
export const heroSectionQuery = groq`
    *[_type == "collectionSection" && isHeroSection == true] {
        _id,
        _createdAt,
        title,
        subtitle,
        propertyRefs,
        thirdTitle,
        hasFilter,
        isHeroSection,
        fourthTitle
    }
`;
//get filter ones
export const filterSectionQuery = groq`
    *[_type == "collectionSection" && hasFilter == true] {
        _id,
        _createdAt,
        title,
        subtitle,
        propertyRefs,
        thirdTitle,
        hasFilter,
        isHeroSection,
        fourthTitle
    }
`;
