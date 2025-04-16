import Image from "next/image";
import Link from "next/link";

interface ArtistCardProps {
  artist: {
    id: string;
    name: string;
    slug: string;
    bio: string;
    genre: string;
    image_url: string;
  };
}

export function ArtistCard({ artist }: ArtistCardProps) {
  if (!artist) {
    return null;
  }

  return (
    <Link href={`/artists/${artist.slug}`}>
      <div className="artist-card group">
        <div className="relative aspect-square overflow-hidden rounded-lg">
          <Image
            src={artist.image_url || "/placeholder.svg?height=400&width=400"}
            alt={artist.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-80"></div>

          {/* Decorative elements */}
          <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-sunshine opacity-70 group-hover:opacity-100 transition-opacity"></div>

          <div className="absolute inset-0 flex flex-col justify-end p-4 content">
            <h3 className="font-bold text-lg text-white">{artist.name}</h3>
            <p className="text-sm text-white/80">{artist.genre}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
