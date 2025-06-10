"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Download, Upload, RotateCcw, AlertTriangle } from "lucide-react"
import { getCMSData, saveCMSData, defaultCMSData } from "@/lib/cms-data"

export default function CMSInnstillinger() {
  const [exportData, setExportData] = useState("")
  const [importData, setImportData] = useState("")
  const [showResetConfirm, setShowResetConfirm] = useState(false)

  const handleExport = () => {
    const data = getCMSData()
    const jsonString = JSON.stringify(data, null, 2)
    setExportData(jsonString)

    // Last ned som fil
    const blob = new Blob([jsonString], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `karmsund-cms-backup-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleImport = () => {
    try {
      const data = JSON.parse(importData)
      saveCMSData(data)
      alert("Data importert successfully!")
      setImportData("")
    } catch (error) {
      alert("Ugyldig JSON format. Vennligst sjekk dataene og prøv igjen.")
    }
  }

  const handleReset = () => {
    if (showResetConfirm) {
      saveCMSData(defaultCMSData)
      alert("Alle data er tilbakestilt til standardverdier!")
      setShowResetConfirm(false)
    } else {
      setShowResetConfirm(true)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(exportData)
    alert("Data kopiert til utklippstavle!")
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button asChild variant="outline" size="sm">
            <Link href="/cms">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Tilbake til CMS
            </Link>
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Innstillinger</h1>
        </div>

        <div className="grid gap-6">
          {/* Eksporter data */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5 text-blue-600" />
                Eksporter data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Last ned en sikkerhetskopi av alt innhold på nettsiden. Dette kan brukes som backup eller for å overføre
                innhold til en annen installasjon.
              </p>
              <div className="space-y-4">
                <Button onClick={handleExport}>
                  <Download className="h-4 w-4 mr-2" />
                  Eksporter og last ned
                </Button>

                {exportData && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium">Eksporterte data:</label>
                      <Button onClick={copyToClipboard} size="sm" variant="outline">
                        Kopier til utklippstavle
                      </Button>
                    </div>
                    <Textarea value={exportData} readOnly rows={8} className="font-mono text-xs" />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Importer data */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-green-600" />
                Importer data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Gjenopprett innhold fra en sikkerhetskopi. Dette vil overskrive alt eksisterende innhold.
              </p>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Lim inn JSON-data fra backup:</label>
                  <Textarea
                    value={importData}
                    onChange={(e) => setImportData(e.target.value)}
                    placeholder="Lim inn JSON-data her..."
                    rows={8}
                    className="font-mono text-xs"
                  />
                </div>
                <Button
                  onClick={handleImport}
                  disabled={!importData.trim()}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Importer data
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tilbakestill til standard */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RotateCcw className="h-5 w-5 text-orange-600" />
                Tilbakestill til standard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-3 p-4 bg-orange-50 border border-orange-200 rounded-lg mb-4">
                <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
                <div>
                  <p className="font-medium text-orange-800">Advarsel!</p>
                  <p className="text-orange-700 text-sm">
                    Dette vil slette alle dine endringer og gjenopprette standardinnholdet. Denne handlingen kan ikke
                    angres.
                  </p>
                </div>
              </div>

              <p className="text-gray-600 mb-4">
                Tilbakestill alt innhold til de opprinnelige standardverdiene. Bruk dette hvis du vil starte på nytt
                eller hvis noe har gått galt.
              </p>

              {showResetConfirm ? (
                <div className="space-y-3">
                  <p className="text-red-600 font-medium">Er du sikker på at du vil tilbakestille alt innhold?</p>
                  <div className="flex gap-2">
                    <Button onClick={handleReset} variant="destructive">
                      Ja, tilbakestill alt
                    </Button>
                    <Button onClick={() => setShowResetConfirm(false)} variant="outline">
                      Avbryt
                    </Button>
                  </div>
                </div>
              ) : (
                <Button onClick={handleReset} variant="destructive">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Tilbakestill til standard
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Informasjon */}
          <Card>
            <CardHeader>
              <CardTitle>Informasjon om datalagring</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-gray-600">
                <p>
                  <strong>Hvor lagres dataene?</strong> All innhold lagres lokalt i nettleserens localStorage. Dette
                  betyr at dataene kun er tilgjengelige på denne enheten og i denne nettleseren.
                </p>
                <p>
                  <strong>Backup:</strong> Vi anbefaler å eksportere dataene regelmessig som sikkerhetskopi. Dataene kan
                  gå tapt hvis nettleserens cache slettes eller hvis du bytter enhet.
                </p>
                <p>
                  <strong>Deling:</strong> For å dele innhold mellom flere enheter eller brukere, eksporter dataene fra
                  en enhet og importer dem på den andre.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
