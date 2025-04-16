"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Users, Music, Calendar, Mail, Settings, LogOut } from "lucide-react"
import { createClientSupabaseClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"

export function AdminSidebar() {
  const pathname = usePathname()
  const supabase = createClientSupabaseClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = "/"
  }

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: Home },
    { href: "/admin/artists", label: "Artists", icon: Users },
    { href: "/admin/releases", label: "Releases", icon: Music },
    { href: "/admin/events", label: "Events", icon: Calendar },
    { href: "/admin/newsletter", label: "Newsletter", icon: Mail },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="w-64 bg-zinc-900 border-r border-zinc-800 p-4 flex flex-col h-screen">
      <div className="text-xl font-bold mb-8 p-2">Admin Dashboard</div>
      <nav className="space-y-1 flex-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                isActive ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
              }`}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          )
        })}
      </nav>
      <Button
        variant="ghost"
        className="mt-auto w-full justify-start text-zinc-400 hover:text-white hover:bg-zinc-800/50"
        onClick={handleSignOut}
      >
        <LogOut className="h-5 w-5 mr-3" />
        Sign Out
      </Button>
    </div>
  )
}
