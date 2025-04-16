import type { Metadata } from "next";
import "./globals.css";
import { PostHogProvider } from "./providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://sagra-xi.vercel.app"),
  title: {
    default: "Sagra Music - Joyful electronic Record Label",
    template: `%s | Sagra Music`,
  },
  description:
    "Discover Sagra Music, a record label dedicated to releasing joyful electronic music. Explore our artists, releases, and latest news.",
  keywords: [
    "electronic music",
    "record label",
    "joyful music",
    "house music",
    "techno",
    "electronic artists",
    "Sagra Music",
  ],
  authors: [{ name: "David Duarte" }],
  openGraph: {
    title: "Sagra Music - Joyful electronic Record Label",
    description:
      "Discover Sagra Music, a record label dedicated to releasing joyful electronic music.",
    url: "https://sagra-xi.vercel.app",
    siteName: "Sagra Music",
    images: [
      {
        url: "https://sagra-xi.vercel.app/metaSEO.png",
        width: 1200,
        height: 630,
        alt: "Sagra Music Logo and DJ setup illustration",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sagra Music - Joyful electronic Record Label",
    description:
      "Discover Sagra Music, a record label dedicated to releasing joyful electronic music.",
    images: ["https://sagra-xi.vercel.app/metaSEO.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <PostHogProvider>
        <body suppressHydrationWarning>{children}</body>
      </PostHogProvider>
    </html>
  );
}
