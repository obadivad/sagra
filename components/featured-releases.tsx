import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

interface FeaturedReleasesProps {
  releases: {
    id: string;
    title: string;
    slug: string;
    description: string;
    cover_url: string;
    release_date: string;
    spotify_url: string;
  }[];
}

export function FeaturedReleases({ releases }: FeaturedReleasesProps) {
  if (!releases || releases.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {releases.map((release) => (
        <div
          key={release.id}
          className="group relative overflow-hidden rounded-lg shadow-lg bg-white"
        >
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={release.cover_url || "/placeholder.svg?height=500&width=500"}
              alt={release.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button
                size="icon"
                className="h-12 w-12 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                asChild
              >
                <Link href={release.spotify_url || "#"}>
                  <Play className="h-6 w-6 ml-1" />
                  <span className="sr-only">Play</span>
                </Link>
              </Button>
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-bold text-lg mb-2">{release.title}</h3>
            <p className="text-sm text-gray-600 mb-3">
              {new Date(release.release_date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-sm text-gray-700 line-clamp-2 mb-4">
              {release.description}
            </p>
            <Button
              asChild
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Link href={`/releases/${release.slug}`}>View Details</Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
