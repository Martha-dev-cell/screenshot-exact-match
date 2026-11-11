import { site } from "@/config/site";

/** Metadata halaman yang konsisten untuk setiap route. */
export function pageHead(title: string, description: string) {
  const fullTitle = title === site.portalName ? title : `${title} — ${site.portalName}`;
  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: description },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  };
}
