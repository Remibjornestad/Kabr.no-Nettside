"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Monitor, Smartphone } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"
import LoginForm from "@/components/auth/login-form"
import { LogOut } from "lucide-react"

function MobileBlocker() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md mx-auto text-center">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <Monitor className="h-8 w-8 text-orange-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Kun tilgjengelig på desktop</h1>
            <p className="text-gray-600 mb-6">
              Redigeringsverktøyet for Karmsund ABR er kun tilgjengelig på desktop-enheter for optimal brukeropplevelse.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3 p-4 bg-gray-50 rounded-lg">
              <Smartphone className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-600">Mobil/Tablet - Ikke støttet</span>
            </div>

            <div className="flex items-center justify-center gap-3 p-4 bg-green-50 rounded-lg">
              <Monitor className="h-5 w-5 text-green-600" />
              <span className="text-sm text-green-700">Desktop - Anbefalt</span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">
              Vennligst åpne redigeringsverktøyet på en desktop-enhet eller øk vindusstørrelsen.
            </p>
            <Button asChild className="w-full">
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Gå tilbake til nettsiden
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkIsMobile = () => {
      // Sjekk både skjermbredde og user agent for å fange opp mobile enheter
      const screenWidth = window.innerWidth
      const userAgent = navigator.userAgent.toLowerCase()

      const isMobileScreen = screenWidth < 1024 // Under 1024px regnes som mobil/tablet
      const isMobileUserAgent = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)

      setIsMobile(isMobileScreen || isMobileUserAgent)
      setIsLoading(false)
    }

    // Sjekk ved første lasting
    checkIsMobile()

    // Lytt til vindusendringer
    window.addEventListener("resize", checkIsMobile)

    return () => window.removeEventListener("resize", checkIsMobile)
  }, [])

  return { isMobile, isLoading }
}

function CMSContent({ children }: { children: React.ReactNode }) {
  const { user, loading, signOut } = useAuth()
  const { isMobile, isLoading: mobileCheckLoading } = useIsMobile()

  if (loading || mobileCheckLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-steel-600 mx-auto mb-4"></div>
          <p>Laster...</p>
        </div>
      </div>
    )
  }

  // Vis mobile blocker hvis brukeren er på mobil/tablet
  if (isMobile) {
    return <MobileBlocker />
  }

  if (!user) {
    return <LoginForm />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* CMS Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-gray-900">Karmsund ABR</h1>
            <span className="text-sm text-gray-500">Redigeringsverktøy</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Logget inn som: {user.email}</span>
            <Button asChild variant="outline">
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Gå tilbake til nettside
              </Link>
            </Button>
            <Button onClick={signOut} variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Logg ut
            </Button>
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}

export default function CMSClient({
  children,
}: {
  children: React.ReactNode
}) {
  return <CMSContent>{children}</CMSContent>
}
