import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EventCardProps {
  event: {
    id: string;
    slug: string;
    title: string;
    description: string;
    image_url: string;
    event_date: string;
    location: string;
    venue: string;
  };
}

export function EventCard({ event }: EventCardProps) {
  if (!event) {
    return null;
  }

  const eventDate = new Date(event.event_date);

  return (
    <Link href={`/events/${event.slug}`} className="block">
      <div className="event-card bg-white shadow-lg group">
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={event.image_url || "/placeholder.svg?height=300&width=500"}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h3 className="font-bold text-lg line-clamp-1">{event.title}</h3>
            <div className="flex items-center text-sm mt-1">
              <Calendar className="h-4 w-4 mr-1" />
              <span>
                {eventDate.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="text-sm text-gray-600 mb-3">
            <span className="font-medium">{event.venue}</span>, {event.location}
          </div>
          <p className="text-sm text-gray-700 line-clamp-2 mb-4">
            {event.description}
          </p>
          <Button
            size="sm"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Get Tickets
          </Button>
        </div>
      </div>
    </Link>
  );
}
