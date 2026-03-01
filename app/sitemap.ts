import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${baseUrl}/` },
    { url: `${baseUrl}/find-teachers` },
    { url: `${baseUrl}/for-students` },
    { url: `${baseUrl}/for-teachers` },
    { url: `${baseUrl}/pricing` },
    { url: `${baseUrl}/faq` },
    { url: `${baseUrl}/about` },
  ];
}
