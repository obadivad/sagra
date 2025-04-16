import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { EventCard } from "@/components/event-card";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default async function EventsPage() {
  const supabase = createServerSupabaseClient();

  // Fetch all upcoming events
  const { data: events } = await supabase
    .from("events")
    .select("*")
    .gte("event_date", new Date().toISOString())
    .order("event_date");

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
            <h1 className="text-3xl font-bold">Upcoming Events</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events && events.length > 0 ? (
              events.map((event) => <EventCard key={event.id} event={event} />)
            ) : (
              <div className="col-span-full text-center py-12 text-zinc-400">
                No upcoming events. Check back soon for announcements!
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
