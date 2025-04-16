import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { SocialLinks } from "@/components/social-links";
import { Instagram, Music, CloudIcon as SoundCloud } from "lucide-react";

interface ArtistDetailPageProps {
  params: {
    slug: string;
  };
}

export default async function ArtistDetailPage({
  params,
}: ArtistDetailPageProps) {
  const supabase = createServerSupabaseClient();

  // Fetch artist data
  const { data: artist } = await supabase
    .from("artists")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (!artist) {
    notFound();
  }

  // Fetch artist's releases with two-step query
  // Step 1: Get release IDs for this artist
  const { data: artistReleases } = await supabase
    .from("artist_releases")
    .select("release_id")
    .eq("artist_id", artist.id);

  // Step 2: Get actual releases if there are any
  let releases = [];
  if (artistReleases && artistReleases.length > 0) {
    const releaseIds = artistReleases.map((item) => item.release_id);
    const { data: releasesData } = await supabase
      .from("releases")
      .select("*")
      .in("id", releaseIds)
      .order("release_date", { ascending: false });

    releases = releasesData || [];
  }

  // Fetch artist's upcoming events with two-step query
  // Step 1: Get event IDs for this artist
  const { data: artistEvents } = await supabase
    .from("event_artists")
    .select("event_id")
    .eq("artist_id", artist.id);

  // Step 2: Get actual events if there are any
  let events = [];
  if (artistEvents && artistEvents.length > 0) {
    const eventIds = artistEvents.map((item) => item.event_id);
    const { data: eventsData } = await supabase
      .from("events")
      .select("*")
      .in("id", eventIds)
      .gte("event_date", new Date().toISOString())
      .order("event_date");

    events = eventsData || [];
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <SiteHeader />

      <main className="flex-1">
        {/* Artist Hero */}
        <section className="relative h-[50vh] flex items-center">
          <div className="absolute inset-0 z-0">
            <Image
              src={artist.image_url || "/placeholder.svg?height=800&width=1600"}
              alt={artist.name}
              fill
              className="object-cover opacity-50"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
          </div>
          <div className="container relative z-10">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
              {artist.name}
            </h1>
            <p className="text-xl text-zinc-400 mt-4 max-w-2xl">
              {artist.genre}
            </p>
          </div>
        </section>

        {/* Artist Bio */}
        <section className="py-16 bg-zinc-900">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="md:col-span-2">
                <h2 className="text-3xl font-bold mb-6">Biography</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-zinc-300 leading-relaxed">
                    {artist.bio || "No biography available."}
                  </p>
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-6">Connect</h2>
                <div className="space-y-4">
                  {artist.spotify_url && (
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full border-zinc-700 hover:bg-zinc-800"
                      asChild
                    >
                      <Link
                        href={artist.spotify_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Music className="mr-2 h-5 w-5" />
                        Spotify
                      </Link>
                    </Button>
                  )}
                  {artist.soundcloud_url && (
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full border-zinc-700 hover:bg-zinc-800"
                      asChild
                    >
                      <Link
                        href={artist.soundcloud_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <SoundCloud className="mr-2 h-5 w-5" />
                        SoundCloud
                      </Link>
                    </Button>
                  )}
                  {artist.instagram_url && (
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full border-zinc-700 hover:bg-zinc-800"
                      asChild
                    >
                      <Link
                        href={artist.instagram_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Instagram className="mr-2 h-5 w-5" />
                        Instagram
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Releases */}
        {releases.length > 0 && (
          <section className="py-16 bg-black">
            <div className="container">
              <h2 className="text-3xl font-bold mb-8">Releases</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {releases.map((release) => (
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
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Upcoming Events */}
        {events.length > 0 && (
          <section className="py-16 bg-zinc-900">
            <div className="container">
              <h2 className="text-3xl font-bold mb-8">Upcoming Events</h2>
              <div className="space-y-6">
                {events.map((event) => (
                  <Link
                    key={event.id}
                    href={`/events/${event.slug}`}
                    className="block bg-zinc-800 rounded-lg overflow-hidden border border-zinc-700 hover:border-zinc-600 transition-colors"
                  >
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <h3 className="font-semibold text-xl">
                            {event.title}
                          </h3>
                          <p className="text-zinc-400">
                            {new Date(event.event_date).toLocaleDateString(
                              "en-US",
                              {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                            {" at "}
                            {new Date(event.event_date).toLocaleTimeString(
                              "en-US",
                              {
                                hour: "numeric",
                                minute: "2-digit",
                              }
                            )}
                          </p>
                          <p className="text-zinc-400">
                            {event.venue}, {event.location}
                          </p>
                        </div>
                        <Button className="bg-white text-black hover:bg-zinc-200 self-start">
                          Get Tickets
                        </Button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 bg-black py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="relative h-8 w-8">
                  <Image
                    src="/placeholder.svg?height=32&width=32"
                    alt="Pulse Records Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-xl font-bold tracking-tighter">
                  PULSE RECORDS
                </span>
              </Link>
              <p className="text-sm text-zinc-400">
                Defining the sound of tomorrow since 2015.
              </p>
              <SocialLinks />
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/artists"
                    className="hover:text-white transition-colors"
                  >
                    Artists
                  </Link>
                </li>
                <li>
                  <Link
                    href="/releases"
                    className="hover:text-white transition-colors"
                  >
                    Releases
                  </Link>
                </li>
                <li>
                  <Link
                    href="/events"
                    className="hover:text-white transition-colors"
                  >
                    Events
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:text-white transition-colors"
                  >
                    About
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-white transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookies"
                    className="hover:text-white transition-colors"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <address className="not-italic text-sm text-zinc-400 space-y-2">
                <p>123 Beat Street</p>
                <p>London, UK</p>
                <p>info@pulserecords.com</p>
                <p>+44 123 456 7890</p>
              </address>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-zinc-800 text-center text-sm text-zinc-500">
            <p>
              © {new Date().getFullYear()} Pulse Records. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
