"use client"

import type React from "react"

import { useState } from "react"
import { createClientSupabaseClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const supabase = createClientSupabaseClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      // Check if email already exists
      const { data: existingSubscriber } = await supabase
        .from("newsletter_subscribers")
        .select("id")
        .eq("email", email)
        .maybeSingle()

      if (existingSubscriber) {
        setSuccess("You are already subscribed to our newsletter!")
      } else {
        const { error: insertError } = await supabase.from("newsletter_subscribers").insert({ email })

        if (insertError) throw insertError

        setSuccess("Thank you for subscribing to our newsletter!")
        setEmail("")
      }
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="bg-green-900/20 border-green-800 text-green-400">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <Input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 bg-zinc-800 border-zinc-700"
          required
        />
        <Button type="submit" disabled={isLoading} className="bg-white text-black hover:bg-zinc-200">
          {isLoading ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>
    </div>
  )
}
