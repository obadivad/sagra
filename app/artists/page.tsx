import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { ArtistCard } from "@/components/artist-card";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default async function ArtistsPage() {
  const supabase = createServerSupabaseClient();

  // Fetch all artists
  const { data: artists } = await supabase
    .from("artists")
    .select("*")
    .order("name");

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
            <h1 className="text-3xl font-bold">Our Artists</h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {artists && artists.length > 0 ? (
              artists.map((artist) => (
                <ArtistCard key={artist.id} artist={artist} />
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-zinc-400">
                No artists found. Check back soon for updates!
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
