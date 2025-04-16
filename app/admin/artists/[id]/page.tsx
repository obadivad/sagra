import { notFound } from "next/navigation"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { ArtistForm } from "@/components/admin/artists/artist-form"

interface ArtistEditPageProps {
  params: {
    id: string
  }
}

export default async function ArtistEditPage({ params }: ArtistEditPageProps) {
  const supabase = createServerSupabaseClient()

  const { data: artist } = await supabase.from("artists").select("*").eq("id", params.id).single()

  if (!artist) {
    notFound()
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Edit Artist: {artist.name}</h1>
      <ArtistForm artist={artist} />
    </div>
  )
}
