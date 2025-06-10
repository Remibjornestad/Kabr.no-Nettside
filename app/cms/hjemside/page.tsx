"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Save, Undo, Redo } from "lucide-react"
import TextEditor from "@/components/cms/text-editor"
import ImageField from "@/components/cms/image-field"
import ImageGalleryEditor from "@/components/cms/image-gallery-editor"
import { getCMSData, saveCMSSection } from "@/lib/cms-data-supabase"
import { useUndoRedo } from "@/hooks/use-undo-redo"
import type { CMSData } from "@/types/cms"

export default function CMSHjemside() {
  const [initialData, setInitialData] = useState<CMSData | null>(null)
  const [saving, setSaving] = useState(false)

  const {
    state: data,
    set: setData,
    reset: resetData,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useUndoRedo<CMSData | null>(null)

  useEffect(() => {
    const loadData = async () => {
      const cmsData = await getCMSData()
      setInitialData(cmsData)
      resetData(cmsData)
    }
    loadData()
  }, [resetData])

  const handleSave = async () => {
    if (!data || !initialData) return

    setSaving(true)
    try {
      const homeData = {
        homeHero: data.homeHero,
        aboutKarmsund: data.aboutKarmsund,
        ourOffer: data.ourOffer,
        ourValues: data.ourValues,
        imageGallery: data.imageGallery,
        interestedCTA: data.interestedCTA,
      }

      const oldHomeData = {
        homeHero: initialData.homeHero,
        aboutKarmsund: initialData.aboutKarmsund,
        ourOffer: initialData.ourOffer,
        ourValues: initialData.ourValues,
        imageGallery: initialData.imageGallery,
        interestedCTA: initialData.interestedCTA,
      }

      const success = await saveCMSSection("home", homeData, oldHomeData)
      if (success) {
        setInitialData(data)
        alert("Endringer lagret!")
      } else {
        alert("Feil ved lagring. Prøv igjen.")
      }
    } catch (error) {
      console.error("Save error:", error)
      alert("Feil ved lagring. Prøv igjen.")
    } finally {
      setSaving(false)
    }
  }

  const updateData = (updates: Partial<CMSData>) => {
    if (data) {
      setData({ ...data, ...updates })
    }
  }

  const hasChanges = data && initialData && JSON.stringify(data) !== JSON.stringify(initialData)

  if (!data) return <div className="p-8">Laster...</div>

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button asChild variant="outline" size="sm">
              <Link href="/cms">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Tilbake til CMS
              </Link>
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Rediger hjemside</h1>
          </div>

          <div className="flex items-center gap-2">
            {/* Undo/Redo buttons */}
            <Button onClick={undo} disabled={!canUndo} variant="outline" size="sm" title="Angre (Ctrl+Z)">
              <Undo className="h-4 w-4" />
            </Button>
            <Button onClick={redo} disabled={!canRedo} variant="outline" size="sm" title="Gjør om (Ctrl+Y)">
              <Redo className="h-4 w-4" />
            </Button>

            <Button onClick={handleSave} disabled={!hasChanges || saving}>
              <Save className="h-4 w-4 mr-1" />
              {saving ? "Lagrer..." : "Lagre endringer"}
            </Button>
          </div>
        </div>

        <div className="space-y-8">
          {/* Hero Section */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Hero-seksjon</h2>
            <div className="space-y-4">
              <TextEditor
                title="Hovedtittel"
                value={data.homeHero.title}
                onChange={(value) => updateData({ homeHero: { ...data.homeHero, title: value } })}
                placeholder="Velkommen til Karmsund ABR"
              />
              <TextEditor
                title="Undertittel"
                value={data.homeHero.subtitle}
                onChange={(value) => updateData({ homeHero: { ...data.homeHero, subtitle: value } })}
                placeholder="avdeling Bjørnestad"
              />
              <TextEditor
                title="Beskrivelse"
                value={data.homeHero.description}
                onChange={(value) => updateData({ homeHero: { ...data.homeHero, description: value } })}
                multiline
                placeholder="En kort beskrivelse av tilbudet"
              />

              <ImageField
                label="Bakgrunnsbilde"
                value={data.homeHero.backgroundImage}
                onChange={(value) => updateData({ homeHero: { ...data.homeHero, backgroundImage: value } })}
                placeholder="Last opp bakgrunnsbilde eller bruk URL"
              />

              <div className="grid grid-cols-2 gap-4">
                <TextEditor
                  title="Primær knapp tekst"
                  value={data.homeHero.primaryButtonText}
                  onChange={(value) => updateData({ homeHero: { ...data.homeHero, primaryButtonText: value } })}
                  placeholder="Se vårt tilbud"
                />
                <TextEditor
                  title="Sekundær knapp tekst"
                  value={data.homeHero.secondaryButtonText}
                  onChange={(value) => updateData({ homeHero: { ...data.homeHero, secondaryButtonText: value } })}
                  placeholder="Kontakt oss"
                />
              </div>
            </div>
          </section>

          {/* Om Karmsund ABR */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Om Karmsund ABR</h2>
            <div className="space-y-4">
              <TextEditor
                title="Tittel"
                value={data.aboutKarmsund.title}
                onChange={(value) => updateData({ aboutKarmsund: { ...data.aboutKarmsund, title: value } })}
              />
              <TextEditor
                title="Innhold"
                value={data.aboutKarmsund.content}
                onChange={(value) => updateData({ aboutKarmsund: { ...data.aboutKarmsund, content: value } })}
                multiline
              />
              <ImageField
                label="Bilde"
                value={data.aboutKarmsund.image || ""}
                onChange={(value) => updateData({ aboutKarmsund: { ...data.aboutKarmsund, image: value } })}
                placeholder="Last opp bilde eller bruk URL"
              />
              <TextEditor
                title="Bildetekst (alt-tekst)"
                value={data.aboutKarmsund.imageAlt || ""}
                onChange={(value) => updateData({ aboutKarmsund: { ...data.aboutKarmsund, imageAlt: value } })}
                placeholder="Beskrivelse av bildet for skjermlesere"
              />
            </div>
          </section>

          {/* Vårt tilbud */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Vårt tilbud</h2>
            <div className="space-y-4">
              <TextEditor
                title="Tittel"
                value={data.ourOffer.title}
                onChange={(value) => updateData({ ourOffer: { ...data.ourOffer, title: value } })}
              />
              <TextEditor
                title="Innhold"
                value={data.ourOffer.content}
                onChange={(value) => updateData({ ourOffer: { ...data.ourOffer, content: value } })}
                multiline
              />
            </div>
          </section>

          {/* Våre verdier */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Våre verdier</h2>
            <div className="space-y-4">
              <TextEditor
                title="Tittel"
                value={data.ourValues.title}
                onChange={(value) => updateData({ ourValues: { ...data.ourValues, title: value } })}
              />
              <TextEditor
                title="Innhold"
                value={data.ourValues.content}
                onChange={(value) => updateData({ ourValues: { ...data.ourValues, content: value } })}
                multiline
              />
            </div>
          </section>

          {/* Bildegalleri */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <ImageGalleryEditor
              title="Inntrykk fra Bjørnestad - Bildegalleri"
              images={data.imageGallery}
              onChange={(images) => updateData({ imageGallery: images })}
            />
          </section>

          {/* CTA */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Er du interessert i vårt tilbud?</h2>
            <div className="space-y-4">
              <TextEditor
                title="Tittel"
                value={data.interestedCTA.title}
                onChange={(value) => updateData({ interestedCTA: { ...data.interestedCTA, title: value } })}
              />
              <TextEditor
                title="Innhold"
                value={data.interestedCTA.content}
                onChange={(value) => updateData({ interestedCTA: { ...data.interestedCTA, content: value } })}
                multiline
              />
            </div>
          </section>
        </div>

        {hasChanges && (
          <div className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg">
            <p className="text-sm mb-2">Du har ulagrede endringer</p>
            <Button
              onClick={handleSave}
              size="sm"
              className="bg-white text-blue-600 hover:bg-gray-100"
              disabled={saving}
            >
              {saving ? "Lagrer..." : "Lagre nå"}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
