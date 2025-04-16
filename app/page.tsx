import Image from "next/image";
import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FeaturedReleases } from "@/components/featured-releases";
import { ArtistCard } from "@/components/artist-card";
import { EventCard } from "@/components/event-card";
import { MusicEmbed } from "@/components/music-embed";
import { SoundCloudEmbed } from "@/components/soundcloud-embed";
import { Newsletter } from "@/components/newsletter";

export default async function Home() {
  const supabase = createServerSupabaseClient();

  // Fetch featured releases
  const { data: featuredReleases = [] } = await supabase
    .from("releases")
    .select("*")
    .eq("is_featured", true)
    .order("release_date", { ascending: false })
    .limit(3);

  // Fetch artists
  const { data: artists = [] } = await supabase
    .from("artists")
    .select("*")
    .limit(4);

  // Fetch upcoming events
  const { data: events = [] } = await supabase
    .from("events")
    .select("*")
    .gte("event_date", new Date().toISOString())
    .order("event_date")
    .limit(3);

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-turquoise mix-blend-multiply opacity-90"></div>
            <div className="absolute inset-0 bg-[url('/hero_background.png')] bg-cover bg-center opacity-20"></div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-20 left-10 disco-ball animate-float"></div>
          <div
            className="absolute bottom-20 right-10 disco-ball animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
          <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-sunshine rounded-full opacity-40 animate-pulse"></div>

          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 text-primary">
                Producing joyful music and events since 2024.
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-foreground">
                Discover the freshest electronic music from our roster of
                innovative artists and join us for the next event.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Link href="/releases">Explore the latest releases</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10"
                >
                  <Link href="/events">Upcoming Events</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Wavy divider */}
        <div className="wavy-divider bg-turquoise">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>

        {/* Featured Releases */}
        <section className="py-16 bg-white">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-[#FC7240]">
              Featured Releases
            </h2>
            {featuredReleases && featuredReleases.length > 0 ? (
              <FeaturedReleases releases={featuredReleases} />
            ) : (
              <p className="text-center text-gray-500">
                No featured releases available.
              </p>
            )}
          </div>
        </section>

        {/* Artists */}
        <section className="py-16 bg-mint-light">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-[#FC7240]">
              Our Artists
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {artists && artists.length > 0 ? (
                artists.map((artist) => (
                  <ArtistCard key={artist.id} artist={artist} />
                ))
              ) : (
                <p className="text-center text-gray-500 col-span-full">
                  No artists available.
                </p>
              )}
            </div>
            <div className="text-center mt-12">
              <Button
                asChild
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Link href="/artists">View All Artists</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Events */}
        <section className="py-16 bg-white">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-[#FC7240]">
              Upcoming Events
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {events && events.length > 0 ? (
                events.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))
              ) : (
                <p className="text-center text-gray-500 col-span-full">
                  No upcoming events.
                </p>
              )}
            </div>
            <div className="text-center mt-12">
              <Button
                asChild
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Link href="/events">View All Events</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Music Embed */}
        <section className="py-16 bg-sunshine-light">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-[#FC7240]">
              Listen to our latest releases
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <MusicEmbed
                title="Sagra Music Playlist"
                embedUrl="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M"
              />
              <SoundCloudEmbed />
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 bg-turquoise">
          <div className="container">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-[#FC7240]">
                Stay Updated
              </h2>
              <p className="text-center mb-8 text-foreground">
                Subscribe to our newsletter for the latest releases, events, and
                exclusive content.
              </p>
              <Newsletter />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}
