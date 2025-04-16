"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface MusicEmbedProps {
  title: string
  embedUrl: string
}

export function MusicEmbed({ title, embedUrl }: MusicEmbedProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <Card className="overflow-hidden bg-white shadow-md">
      <CardContent className="p-0">
        <div className="p-4 border-b">
          <h3 className="font-semibold">{title}</h3>
        </div>
        <div className="relative aspect-video w-full">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <Skeleton className="h-full w-full" />
            </div>
          )}
          <iframe
            src={embedUrl}
            width="100%"
            height="100%"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="border-0"
            onLoad={() => setIsLoading(false)}
          ></iframe>
        </div>
      </CardContent>
    </Card>
  )
}
