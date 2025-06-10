"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/karmsund-abr-logo.png"
              alt="Karmsund ABR logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="flex flex-col">
              <span className="text-lg font-bold text-steel-600 leading-tight">Karmsund ABR</span>
              <span className="text-xs text-steel-500 leading-tight">avdeling Bjørnestad</span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors hover:text-steel-600 ${isActive("/") ? "text-steel-600" : "text-gray-700"}`}
          >
            Hjem
          </Link>
          <Link
            href="/vart-tilbud"
            className={`text-sm font-medium transition-colors hover:text-steel-600 ${isActive("/vart-tilbud") ? "text-steel-600" : "text-gray-700"}`}
          >
            Vårt tilbud
          </Link>
          <Link
            href="/om-oss"
            className={`text-sm font-medium transition-colors hover:text-steel-600 ${isActive("/om-oss") ? "text-steel-600" : "text-gray-700"}`}
          >
            Om oss
          </Link>
          <Button asChild size="sm" className="bg-steel-500 hover:bg-steel-600 text-white">
            <Link href="/kontakt">Kontakt oss</Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Lukk meny" : "Åpne meny"}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 z-50 bg-white border-b shadow-lg">
          <div className="container py-4 space-y-4">
            <Link
              href="/"
              className={`block py-2 text-sm font-medium transition-colors hover:text-steel-600 ${isActive("/") ? "text-steel-600" : "text-gray-700"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Hjem
            </Link>
            <Link
              href="/vart-tilbud"
              className={`block py-2 text-sm font-medium transition-colors hover:text-steel-600 ${isActive("/vart-tilbud") ? "text-steel-600" : "text-gray-700"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Vårt tilbud
            </Link>
            <Link
              href="/om-oss"
              className={`block py-2 text-sm font-medium transition-colors hover:text-steel-600 ${isActive("/om-oss") ? "text-steel-600" : "text-gray-700"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Om oss
            </Link>
            <Button asChild size="sm" className="w-full bg-steel-500 hover:bg-steel-600 text-white">
              <Link href="/kontakt" onClick={() => setIsMenuOpen(false)}>
                Kontakt oss
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
