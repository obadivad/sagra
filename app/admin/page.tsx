import { createServerSupabaseClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Music, Calendar, Mail } from "lucide-react"

export default async function AdminDashboard() {
  const supabase = createServerSupabaseClient()

  // Fetch counts for dashboard
  const [{ count: artistCount }, { count: releaseCount }, { count: eventCount }, { count: subscriberCount }] =
    await Promise.all([
      supabase.from("artists").select("*", { count: "exact", head: true }),
      supabase.from("releases").select("*", { count: "exact", head: true }),
      supabase.from("events").select("*", { count: "exact", head: true }),
      supabase.from("newsletter_subscribers").select("*", { count: "exact", head: true }),
    ])

  const stats = [
    { title: "Artists", value: artistCount || 0, icon: Users, color: "bg-pink-500" },
    { title: "Releases", value: releaseCount || 0, icon: Music, color: "bg-blue-500" },
    { title: "Events", value: eventCount || 0, icon: Calendar, color: "bg-amber-500" },
    { title: "Subscribers", value: subscriberCount || 0, icon: Mail, color: "bg-emerald-500" },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon

          return (
            <Card key={stat.title} className="bg-zinc-900 border-zinc-800">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={`p-2 rounded-full ${stat.color}`}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-zinc-400">No recent activity to display.</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-zinc-400">No upcoming events to display.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
