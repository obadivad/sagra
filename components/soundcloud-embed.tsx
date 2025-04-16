"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface SoundCloudEmbedProps {
  title?: string;
  trackId?: string;
  color?: string;
  visual?: boolean;
}

export function SoundCloudEmbed({
  title = "The Heat - Farida Bady",
  trackId = "1868613576",
  color = "ff21b5",
  visual = true,
}: SoundCloudEmbedProps) {
  const [isLoading, setIsLoading] = useState(true);
  const trackWebUrl = "https://soundcloud.com/faridabadymusic/the-heat";
  const embedUrl = `https://w.soundcloud.com/player/?url=${encodeURIComponent(
    trackWebUrl
  )}&color=%23${color}&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=${visual}`;

  return (
    <Card className="overflow-hidden bg-white shadow-md">
      <CardContent className="p-0">
        <div className="p-4 border-b">
          <h3 className="font-semibold">{title}</h3>
        </div>
        <div className="relative w-full">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <Skeleton className="h-full w-full" />
            </div>
          )}
          <iframe
            width="100%"
            height={visual ? "300" : "166"}
            allow="autoplay"
            frameBorder="no"
            scrolling="no"
            src={embedUrl}
            className="border-0"
            onLoad={() => setIsLoading(false)}
          ></iframe>
        </div>
      </CardContent>
    </Card>
  );
}
