"use client"

import type React from "react"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [attemptCount, setAttemptCount] = useState(0)
  const [isBlocked, setIsBlocked] = useState(false)

  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isBlocked) {
      setError("For mange forsøk. Vent 5 minutter før du prøver igjen.")
      return
    }

    if (attemptCount >= 5) {
      setIsBlocked(true)
      setError("For mange forsøk. Vent 5 minutter før du prøver igjen.")
      setTimeout(
        () => {
          setIsBlocked(false)
          setAttemptCount(0)
        },
        5 * 60 * 1000,
      ) // 5 minutter
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const normalizedEmail = email.toLowerCase().trim()

      // Sjekk tillatte e-poster før innlogging
      const allowedEmails = (process.env.NEXT_PUBLIC_CMS_ALLOWED_EMAILS || "remi@prosjektai.no").split(",")
      if (allowedEmails.length > 0 && !allowedEmails.includes(normalizedEmail)) {
        setError("Du har ikke tilgang til dette systemet.")
        setAttemptCount((prev) => prev + 1)
        return
      }

      // Logg inn med e-post og passord
      const { data, error } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password: password,
      })

      if (error) {
        console.error("Auth error:", error)
        setError("Ugyldig e-post eller passord.")
        setAttemptCount((prev) => prev + 1)
      } else if (data.user) {
        // Suksess - redirect til CMS
        router.push("/cms")
        router.refresh()
      }
    } catch (err) {
      console.error("Unexpected error:", err)
      setError("En uventet feil oppstod. Prøv igjen.")
      setAttemptCount((prev) => prev + 1)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-steel-50 to-sand-50 p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <div className="flex items-center justify-center mb-4">
              <img src="/karmsund-abr-logo.png" alt="Karmsund ABR Logo" className="h-12 w-auto" />
            </div>
            <CardTitle className="text-2xl font-bold text-steel-800">Administrator</CardTitle>
            <CardDescription className="text-steel-600">Logg inn for å administrere nettstedet</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert className="border-red-200 bg-red-50">
                <AlertDescription className="text-red-800">{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-steel-700">
                  E-postadresse
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="din@epost.no"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading || isBlocked}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-steel-700">
                  Passord
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Skriv inn passord"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading || isBlocked}
                    className="w-full pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-steel-400 hover:text-steel-600"
                    disabled={isLoading || isBlocked}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-steel-600 hover:bg-steel-700"
                disabled={isLoading || isBlocked || !email.trim() || !password.trim()}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logger inn...
                  </>
                ) : (
                  <>
                    <Lock className="mr-2 h-4 w-4" />
                    Logg inn
                  </>
                )}
              </Button>
            </form>

            <div className="text-center pt-4">
              <Link
                href="/"
                className="inline-flex items-center text-sm text-steel-600 hover:text-steel-800 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Tilbake til hovedsiden
              </Link>
            </div>

            {attemptCount > 0 && <div className="text-center text-xs text-steel-500">Forsøk: {attemptCount}/5</div>}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
