import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://sagra-xi.vercel.app";

  return {
    rules: [
      {
        userAgent: "*", // Applies to all bots
        allow: "/", // Allow crawling of all public content
        // Example: Disallow crawling specific admin or private sections
        // disallow: ['/admin/', '/private/'],
      },
      // You could add more specific rules for other bots if needed
      // Example: Allow Googlebot but disallow a specific subdirectory
      // {
      //   userAgent: 'Googlebot',
      //   allow: ['/'],
      //   disallow: '/temp/',
      // },
    ],
    // Point crawlers to your sitemap
    sitemap: `${baseUrl}/sitemap.xml`,
    // You can also specify a host if needed, though often redundant with sitemap
    // host: baseUrl,
  };
}
