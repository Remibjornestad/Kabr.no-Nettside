"use client"

import type React from "react"
import { useState, useEffect } from "react"
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
  const [blockTimeRemaining, setBlockTimeRemaining] = useState(0)

  // Sjekk for eksisterende blokkering ved oppstart
  useEffect(() => {
    const checkExistingBlock = () => {
      const blockData = localStorage.getItem("cms_login_block")
      if (blockData) {
        const { blockUntil, attempts } = JSON.parse(blockData)
        const now = Date.now()

        if (now < blockUntil) {
          setIsBlocked(true)
          setAttemptCount(attempts)
          setBlockTimeRemaining(Math.ceil((blockUntil - now) / 1000))
        } else {
          // Blokkering er utløpt, fjern fra localStorage
          localStorage.removeItem("cms_login_block")
        }
      }
    }

    checkExistingBlock()
  }, [])

  // Countdown timer for blokkering
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isBlocked && blockTimeRemaining > 0) {
      interval = setInterval(() => {
        setBlockTimeRemaining((prev) => {
          if (prev <= 1) {
            setIsBlocked(false)
            setAttemptCount(0)
            localStorage.removeItem("cms_login_block")
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isBlocked, blockTimeRemaining])

  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isBlocked) {
      const minutes = Math.floor(blockTimeRemaining / 60)
      const seconds = blockTimeRemaining % 60
      setError(`For mange forsøk. Vent ${minutes}:${seconds.toString().padStart(2, "0")} før du prøver igjen.`)
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const normalizedEmail = email.toLowerCase().trim()

      // Sjekk tillatte e-poster før innlogging
      const allowedEmails = process.env.NEXT_PUBLIC_CMS_ALLOWED_EMAILS?.split(",") || []
      if (allowedEmails.length > 0 && !allowedEmails.includes(normalizedEmail)) {
        handleFailedAttempt("Du har ikke tilgang til dette systemet.")
        return
      }

      // Logg inn med e-post og passord
      const { data, error } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password: password,
      })

      if (error) {
        console.error("Auth error:", error)
        handleFailedAttempt("Ugyldig e-post eller passord.")
      } else if (data.user) {
        // Suksess - fjern blokkering og redirect til CMS
        localStorage.removeItem("cms_login_block")
        setAttemptCount(0)
        router.push("/cms")
        router.refresh()
      }
    } catch (err) {
      console.error("Unexpected error:", err)
      handleFailedAttempt("En uventet feil oppstod. Prøv igjen.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleFailedAttempt = (errorMessage: string) => {
    const newAttemptCount = attemptCount + 1
    setAttemptCount(newAttemptCount)
    setError(errorMessage)

    if (newAttemptCount >= 5) {
      const blockUntil = Date.now() + 5 * 60 * 1000 // 5 minutter
      const blockData = {
        blockUntil,
        attempts: newAttemptCount,
      }

      localStorage.setItem("cms_login_block", JSON.stringify(blockData))
      setIsBlocked(true)
      setBlockTimeRemaining(5 * 60) // 5 minutter i sekunder
      setError("For mange feilede forsøk. Du er blokkert i 5 minutter.")
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

            {attemptCount > 0 && !isBlocked && (
              <div className="text-center text-xs text-steel-500">Forsøk: {attemptCount}/5</div>
            )}

            {isBlocked && blockTimeRemaining > 0 && (
              <div className="text-center">
                <div className="text-sm text-red-600 font-medium">Konto blokkert</div>
                <div className="text-xs text-red-500">
                  Tid igjen: {Math.floor(blockTimeRemaining / 60)}:
                  {(blockTimeRemaining % 60).toString().padStart(2, "0")}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
