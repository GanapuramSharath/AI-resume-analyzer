import type { MetadataRoute } from "next";

const BASE_URL = "https://sharathairesume.duckdns.org";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
