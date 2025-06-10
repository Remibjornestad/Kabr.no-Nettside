"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, FileText, Users, Phone } from "lucide-react"

export default function CMSHome() {
  return (
    <div className="p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Administrer innholdet på nettsiden</h2>
          <p className="text-gray-600">Velg hvilken side du vil redigere</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* Main content - nå full bredde */}
          <div>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Hjemside */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Home className="h-5 w-5 text-blue-600" />
                    Hjemside
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Rediger hero-seksjon, om Karmsund ABR, vårt tilbud, verdier og bildegalleri
                  </p>
                  <Button asChild className="w-full">
                    <Link href="/cms/hjemside">Rediger hjemside</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Vårt tilbud */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-green-600" />
                    Vårt tilbud
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Administrer innhold på "Vårt tilbud" siden - hero, rehabilitering, fasiliteter
                  </p>
                  <Button asChild className="w-full">
                    <Link href="/cms/vart-tilbud">Rediger vårt tilbud</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Om oss */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-purple-600" />
                    Om oss
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Rediger informasjon om organisasjonen, verdier, metoder og personalgruppe
                  </p>
                  <Button asChild className="w-full">
                    <Link href="/cms/om-oss">Rediger om oss</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Kontakt */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-orange-600" />
                    Kontakt
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Administrer kontaktpersoner, generell info og innsøkingsinformasjon
                  </p>
                  <Button asChild className="w-full">
                    <Link href="/cms/kontakt">Rediger kontakt</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
