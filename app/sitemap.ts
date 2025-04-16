import { MetadataRoute } from "next";

// TODO: Import functions to fetch dynamic routes (e.g., releases, artists)
// import { getAllReleases, getAllArtists } from '@/lib/data'; // Example import

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://sagra-xi.vercel.app";

  // === Add Static Routes ===
  // Start with the homepage
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly", // Adjust frequency as needed
      priority: 1, // Homepage typically has highest priority
    },
    // TODO: Add other static pages manually
    // Example:
    // {
    //   url: `${baseUrl}/about`,
    //   lastModified: new Date(),
    //   changeFrequency: 'yearly',
    //   priority: 0.8,
    // },
  ];

  // === Add Dynamic Routes ===
  // TODO: Fetch and map your dynamic content (e.g., releases)
  // const releases = await getAllReleases(); // Fetch your dynamic content
  // const releaseRoutes = releases.map((release) => ({
  //   url: `${baseUrl}/releases/${release.slug}`,
  //   lastModified: release.updatedAt || new Date(),
  //   changeFrequency: 'weekly', // Adjust frequency
  //   priority: 0.7, // Adjust priority
  // }));

  // TODO: Fetch and map other dynamic content (e.g., artists)
  // const artists = await getAllArtists();
  // const artistRoutes = artists.map((artist) => ({
  //   url: `${baseUrl}/artists/${artist.slug}`,
  //   lastModified: artist.updatedAt || new Date(),
  //   changeFrequency: 'monthly',
  //   priority: 0.6,
  // }));

  // === Combine and Return ===
  return [
    ...staticRoutes,
    // ...releaseRoutes, // Uncomment when ready
    // ...artistRoutes,  // Uncomment when ready
    // Add other dynamic route arrays here
  ];
}
