import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.lolek.plumbing";

  return [
    {
      url: base,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: base,
          pl: `${base}/pl`,
        },
      },
    },
    {
      url: `${base}/pl`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: base,
          pl: `${base}/pl`,
        },
      },
    },
  ];
}
