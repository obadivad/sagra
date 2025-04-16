import Link from "next/link"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { ArtistList } from "@/components/admin/artists/artist-list"

export default async function ArtistsAdminPage() {
  const supabase = createServerSupabaseClient()

  const { data: artists } = await supabase.from("artists").select("*").order("name")

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Artists</h1>
        <Button asChild>
          <Link href="/admin/artists/new">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Artist
          </Link>
        </Button>
      </div>

      <ArtistList artists={artists || []} />
    </div>
  )
}
