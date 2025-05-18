export interface CollectionType {
  _id: string;
  _createdAt: string;
  title: string;
  subtitle?: string;
  thirdTitle?: string;
  propertyRefs: string[];
  isHeroSection?: boolean;
  hasFilter?: boolean;
  isCollectionSection?: boolean;
  fourthTitle?: string;
  // Add any other properties you expect in the collection section
  // For example, if you have a description or an image, you can add them here
  // description?: string;
  // image?: string;
}
