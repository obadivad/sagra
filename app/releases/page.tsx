import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Badge } from "@/components/ui/badge";

export default async function ReleasesPage() {
  const supabase = createServerSupabaseClient();

  // Fetch all releases
  const { data: releases } = await supabase
    .from("releases")
    .select("*, artists!artist_releases(name), spotify_url, soundcloud_url")
    .order("release_date", { ascending: false });

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <SiteHeader />

      <main className="flex-1 py-12">
        <div className="container">
          <div className="flex items-center mb-8">
            <Button variant="ghost" size="sm" asChild className="mr-4">
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">Our Releases</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {releases && releases.length > 0 ? (
              releases.map((release) => (
                <Link
                  key={release.id}
                  href={`/releases/${release.slug}`}
                  className="group block bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800"
                >
                  <div className="relative aspect-square">
                    <Image
                      src={
                        release.cover_url ||
                        "/placeholder.svg?height=400&width=400"
                      }
                      alt={release.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {release.is_featured && (
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-white text-black">Featured</Badge>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{release.title}</h3>
                    <p className="text-sm text-zinc-400">
                      {new Date(release.release_date).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </p>
                    {release.artists && release.artists.length > 0 && (
                      <p className="text-sm text-zinc-500 mt-1">
                        {release.artists
                          .map((artist: any) => artist.name)
                          .join(", ")}
                      </p>
                    )}
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-zinc-400">
                No releases found. Check back soon for new music!
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}
