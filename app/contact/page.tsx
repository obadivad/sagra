import { SiteHeader } from "@/components/site-header"
import { ContactForm } from "@/components/contact-form"

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <SiteHeader />

      <main className="flex-1 py-12">
        <div className="container max-w-4xl">
          <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
          <p className="text-zinc-400 mb-8">
            Have a question or want to work with us? Fill out the form below and we'll get back to you as soon as
            possible.
          </p>

          <ContactForm />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
              <h3 className="font-semibold text-lg mb-3">General Inquiries</h3>
              <p className="text-zinc-400">info@pulserecords.com</p>
            </div>
            <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
              <h3 className="font-semibold text-lg mb-3">Demo Submissions</h3>
              <p className="text-zinc-400">demos@pulserecords.com</p>
            </div>
            <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
              <h3 className="font-semibold text-lg mb-3">Booking</h3>
              <p className="text-zinc-400">booking@pulserecords.com</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer would go here */}
    </div>
  )
}
