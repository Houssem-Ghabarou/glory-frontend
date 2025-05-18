import { defineType, defineArrayMember } from "sanity";

export default defineType({
  name: "collectionSection",
  title: "Collection Section",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      description: "The main title of the collection section.",
    },
    {
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      description: "A short subtitle for additional context.",
    },
    {
      name: "thirdTitle",
      title: "Third Title",
      type: "string",
      description: "An optional third title for the collection section.",
    },
    {
      name: "fourthTitle",
      title: "Fourth Title",
      type: "string",
      description: "An optional fourth title for the collection section.",
    },
    {
      name: "isHeroSection",
      title: "Is Hero Section",
      type: "boolean",
      description: "Indicates if this is a hero section.",
      initialValue: false,
      hidden: ({ parent }) =>
        parent?.isCollectionSection === true || parent?.hasFilter === true,
    },
    {
      name: "hasFilter",
      title: "Has Filter",
      type: "boolean",
      description: "Indicates if this section has a filter. men women kids",
      initialValue: false,
      hidden: ({ parent }) => parent?.isHeroSection === true,
    },
    {
      name: "isCollectionSection",
      title: "Is Collection Section",
      type: "boolean",
      description: "Indicates if this is a collection section.",
      initialValue: false,
      hidden: ({ parent }) =>
        parent?.isHeroSection === true || parent?.hasFilter === true,
    },
    {
      name: "propertyRefs",
      title: "Clothing Properties",
      type: "array",
      description:
        "Add references to clothing properties with optional labels.",
      of: [
        defineArrayMember({
          type: "object",
          title: "Property Reference",
          fields: [
            {
              name: "id",
              title: "Property ID or Slug",
              type: "string",
              description: "The unique identifier or slug for the property.",
              validation: (Rule) =>
                Rule.required().error("Property ID is required."),
            },
            {
              name: "label",
              title: "Optional Label",
              type: "string",
              description: "An optional label to display for this property.",
            },
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "id",
            },
            prepare({ title, subtitle }) {
              return {
                title: title || "No Label",
                subtitle: `ID: ${subtitle}`,
              };
            },
          },
        }),
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Untitled Collection Section",
        subtitle: subtitle || "No Subtitle",
      };
    },
  },
});
