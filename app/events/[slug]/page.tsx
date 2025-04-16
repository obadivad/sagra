import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, ArrowLeft } from "lucide-react";

interface EventDetailPageProps {
  params: {
    slug: string;
  };
}

export default async function EventDetailPage({
  params,
}: EventDetailPageProps) {
  const supabase = createServerSupabaseClient();

  // Fetch event data
  const { data: event } = await supabase
    .from("events")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (!event) {
    notFound();
  }

  // Format date
  const eventDate = new Date(event.event_date);
  const formattedDate = eventDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Format time
  const formattedTime = event.event_time
    ? event.event_time.replace(/:\d{2}$/, "")
    : "TBA";

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <SiteHeader />

      <main className="flex-1">
        <div className="container py-12">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="mb-8 text-primary hover:bg-primary/10"
          >
            <Link href="/events">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Events
            </Link>
          </Button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src={event.image_url || "/placeholder.svg?height=600&width=600"}
                alt={event.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="space-y-6">
              <div>
                {event.is_featured && (
                  <Badge className="bg-primary text-primary-foreground mb-3">
                    Featured
                  </Badge>
                )}
                <h1 className="text-4xl font-bold text-primary mb-2">
                  {event.title}
                </h1>
                <p className="text-lg text-foreground/80">
                  {event.lineup || "Lineup to be announced"}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 text-foreground">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-3 text-primary" />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-3 text-primary" />
                  <span>{formattedTime}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-3 text-primary" />
                  <span>
                    {event.venue}, {event.location}
                  </span>
                </div>
              </div>

              <div className="prose max-w-none">
                <p className="text-foreground/80">
                  {event.description || "No description available."}
                </p>
              </div>

              {event.ticket_url && (
                <div className="pt-4">
                  <Button
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                    size="lg"
                    asChild
                  >
                    <Link
                      href={event.ticket_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Purchase Tickets
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Additional event info could go here */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-primary mb-6">
              Additional Information
            </h2>
            <div className="prose max-w-none text-foreground/80">
              <p>
                All events are subject to our Terms and Conditions. Please
                arrive early to ensure entry. Age restrictions may apply.
              </p>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
