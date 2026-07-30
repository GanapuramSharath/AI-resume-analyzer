import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },

    sitemap: "https://sharathairesume.duckdns.org/sitemap.xml",

    host: "https://sharathairesume.duckdns.org",
  };
}
