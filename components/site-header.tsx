import Link from "next/link";
import Image from "next/image";
import { UserNav } from "@/components/user-nav";
import { MobileNav } from "@/components/mobile-nav";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-turquoise border-turquoise-dark/20 backdrop-blur supports-[backdrop-filter]:bg-turquoise/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-8 w-8 overflow-hidden rounded-full bg-sunshine animate-pulse">
            <Image
              src="/sagra_logo_orange.png?height=32&width=32"
              alt="Sagra"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-xl font-bold tracking-tighter text-primary">
            SAGRA
          </span>
        </Link>
        <nav className="mx-6 flex items-center space-x-4 lg:space-x-6 hidden md:block">
          <Button
            asChild
            variant="ghost"
            className="text-primary hover:text-primary-foreground hover:bg-primary/20"
          >
            <Link href="/">Home</Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            className="text-primary hover:text-primary-foreground hover:bg-primary/20"
          >
            <Link href="/artists">Artists</Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            className="text-primary hover:text-primary-foreground hover:bg-primary/20"
          >
            <Link href="/releases">Releases</Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            className="text-primary hover:text-primary-foreground hover:bg-primary/20"
          >
            <Link href="/events">Events</Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            className="text-primary hover:text-primary-foreground hover:bg-primary/20"
          >
            <Link href="/contact">Contact</Link>
          </Button>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <UserNav />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
