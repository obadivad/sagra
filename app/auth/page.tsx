import { AuthForm } from "@/components/auth/auth-form"

export default function AuthPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-8">Account Access</h1>
          <AuthForm />
        </div>
      </main>
    </div>
  )
}
