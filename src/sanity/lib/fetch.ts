import "server-only";

import type { QueryParams } from "@sanity/client";
import { draftMode } from "next/headers";
import { client } from "@/sanity/lib/client";
import { envconf } from "@/lib/env/envconf";
const DEFAULT_PARAMS = {} as QueryParams;
const DEFAULT_TAGS = [] as string[];

const token = envconf.sanityToken;
export async function sanityFetch<QueryResponse>({
  query,
  params = DEFAULT_PARAMS,
  tags = DEFAULT_TAGS,
}: {
  query: string;
  params?: QueryParams;
  tags?: string[];
}): Promise<QueryResponse> {
  try {
    const isDraftMode = (await draftMode()).isEnabled;
    if (isDraftMode && !token) {
      throw new Error(
        "The `SANITY_API_READ_TOKEN` environment variable is required."
      );
    }
    const isDevelopment = process.env.NODE_ENV === "development";

    return await client
      .withConfig({ useCdn: false })
      .fetch<QueryResponse>(query, params, {
        cache: isDevelopment || isDraftMode ? "no-store" : "force-cache",
        ...(isDraftMode && {
          token: token,
          perspective: "previewDrafts",
        }),
        next: {
          ...(!isDraftMode && { cache: "no-store" }),
          ...(isDraftMode && { revalidate: 30 }),
          tags,
        },
      });
  } catch (error) {
    console.error("Error in sanityFetch:", error);
    throw error; // Re-throw the error after logging it
  }
}
