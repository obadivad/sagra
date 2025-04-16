"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6 text-primary" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="bg-turquoise border-l-turquoise-dark/20 pr-0">
        <div className="flex flex-col space-y-4 py-4">
          <div className="flex items-center justify-between px-4">
            <span className="text-lg font-bold text-primary">PULSE RECORDS</span>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <X className="h-6 w-6 text-primary" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>
          <div className="px-4 py-2">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="text-primary hover:text-primary-foreground hover:bg-primary/20 px-4 py-2 rounded-md transition-colors"
              >
                Home
              </Link>
              <Link
                href="/artists"
                onClick={() => setOpen(false)}
                className="text-primary hover:text-primary-foreground hover:bg-primary/20 px-4 py-2 rounded-md transition-colors"
              >
                Artists
              </Link>
              <Link
                href="/releases"
                onClick={() => setOpen(false)}
                className="text-primary hover:text-primary-foreground hover:bg-primary/20 px-4 py-2 rounded-md transition-colors"
              >
                Releases
              </Link>
              <Link
                href="/events"
                onClick={() => setOpen(false)}
                className="text-primary hover:text-primary-foreground hover:bg-primary/20 px-4 py-2 rounded-md transition-colors"
              >
                Events
              </Link>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="text-primary hover:text-primary-foreground hover:bg-primary/20 px-4 py-2 rounded-md transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
