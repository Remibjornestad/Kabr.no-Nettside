import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, ArrowLeft } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Ingen tilgang | CMS | Karmsund ABR",
  description: "Unauthorized access to Karmsund ABR CMS",
  robots: {
    index: false,
    follow: false,
  },
}

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-steel-50 to-sand-50 p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-steel-800">Ingen tilgang</CardTitle>
            <CardDescription className="text-steel-600">
              Du har ikke tillatelse til å få tilgang til dette området
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-steel-600 text-center">
              Kontakt administratoren hvis du mener du skal ha tilgang til dette systemet.
            </p>

            <div className="text-center">
              <Link href="/">
                <Button variant="outline" className="inline-flex items-center">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Tilbake til hovedsiden
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
