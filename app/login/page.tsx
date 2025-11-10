"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuthStore } from "@/context/auth-store"
import { useMe } from "@/services/hooks"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { login } = useAuthStore()
  const router = useRouter()
  useMe()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await login(email, password)
      router.replace("/dashboard")
    } catch (e) {
      alert("Login failed. Please check your credentials.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-gray-100">
      <Navbar />
      <main className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-md bg-[#111111]/80 backdrop-blur-xl border border-white/10 shadow-lg rounded-2xl p-8">
          <h1 className="text-3xl font-semibold text-center mb-2 text-white tracking-tight">
            Welcome Back
          </h1>
          <p className="text-center text-sm text-gray-400 mb-8">
            Sign in to continue your journey 🖤
          </p>

          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label className="text-sm text-gray-400 font-medium">Email</label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 bg-[#1a1a1a] border border-white/10 focus:border-white/30 text-gray-100 placeholder-gray-500 rounded-md"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400 font-medium">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 bg-[#1a1a1a] border border-white/10 focus:border-white/30 text-gray-100 placeholder-gray-500 rounded-md"
              />
            </div>

            <Button
              className="w-full bg-white text-black hover:bg-gray-200 transition-all font-semibold py-2 rounded-md shadow-sm"
              disabled={loading}
              type="submit"
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <div className="text-center text-sm text-gray-500 mt-6">
            Don’t have an account?{" "}
            <a
              href="/signup"
              className="text-white hover:underline transition-colors font-medium"
            >
              Sign up
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
