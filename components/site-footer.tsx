import Image from "next/image";
import Link from "next/link";
import { SocialLinks } from "@/components/social-links";

export function SiteFooter() {
  return (
    <footer className="bg-white py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-8 w-8 overflow-hidden rounded-full bg-sunshine">
                <Image
                  src="/Sagra_logo_green.png"
                  alt="Sagra Music Logo"
                  fill
                  className="object-contain rounded-full"
                />
              </div>
              <span className="text-xl font-bold tracking-tighter">
                Sagra Music
              </span>
            </Link>
            <p className="text-sm text-gray-600">
              Producing joyful music and events since 2024.
            </p>
            <SocialLinks />
          </div>
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/artists"
                  className="hover:text-primary transition-colors"
                >
                  Artists
                </Link>
              </li>
              <li>
                <Link
                  href="/releases"
                  className="hover:text-primary transition-colors"
                >
                  Releases
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="hover:text-primary transition-colors"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary transition-colors"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-primary transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="hover:text-primary transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <address className="not-italic text-sm text-gray-600 space-y-2">
              <p>123 the vibe</p>
              <p>Paris, FR</p>
              <p>info@sagramusic.com</p>
              <p>+33 123 456 7890</p>
            </address>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} Sagra Music Records. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
