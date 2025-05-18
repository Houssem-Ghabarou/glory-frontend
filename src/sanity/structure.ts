import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("GLORY CMS")
    .items([
      S.documentTypeListItem("collectionSection").title("collectionSection"),

      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !["collectionSection"].includes(item.getId()!)
      ),
    ]);
