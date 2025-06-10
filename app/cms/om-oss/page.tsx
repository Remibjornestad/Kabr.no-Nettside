"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react"
import TextEditor from "@/components/cms/text-editor"
import PersonEditor from "@/components/cms/person-editor"
import { getCMSData, saveCMSSection } from "@/lib/cms-data-supabase"
import type { CMSData } from "@/types/cms"
import ImageField from "@/components/cms/image-field"

export default function CMSOmOss() {
  const [data, setData] = useState<CMSData | null>(null)
  const [hasChanges, setHasChanges] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      const cmsData = await getCMSData()
      setData(cmsData)
    }
    loadData()
  }, [])

  const handleSave = async () => {
    if (!data) return

    setSaving(true)
    try {
      const aboutData = {
        aboutHero: data.aboutHero,
        aboutKarmsundText: data.aboutKarmsundText,
        valuesAndMethods: data.valuesAndMethods,
        careAndCommunity: data.careAndCommunity,
        personalGroup: data.personalGroup,
        interdisciplinaryTeam: data.interdisciplinaryTeam,
      }

      const success = await saveCMSSection("about", aboutData)
      if (success) {
        setHasChanges(false)
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
      setHasChanges(true)
    }
  }

  const updateValuesAndMethodsSection = (index: number, field: "title" | "content", value: string) => {
    if (data) {
      const newSections = [...data.valuesAndMethods.sections]
      newSections[index] = { ...newSections[index], [field]: value }
      updateData({
        valuesAndMethods: { ...data.valuesAndMethods, sections: newSections },
      })
    }
  }

  const addValuesAndMethodsSection = () => {
    if (data) {
      const newSection = { title: "Ny seksjon", content: "" }
      updateData({
        valuesAndMethods: {
          ...data.valuesAndMethods,
          sections: [...data.valuesAndMethods.sections, newSection],
        },
      })
    }
  }

  const removeValuesAndMethodsSection = (index: number) => {
    if (data && data.valuesAndMethods.sections.length > 1) {
      const newSections = data.valuesAndMethods.sections.filter((_, i) => i !== index)
      updateData({
        valuesAndMethods: { ...data.valuesAndMethods, sections: newSections },
      })
    }
  }

  if (!data) return <div>Laster...</div>

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button asChild variant="outline" size="sm">
              <Link href="/cms">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Tilbake til CMS
              </Link>
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Rediger om oss</h1>
          </div>
          <Button onClick={handleSave} disabled={!hasChanges || saving}>
            <Save className="h-4 w-4 mr-1" />
            {saving ? "Lagrer..." : "Lagre endringer"}
          </Button>
        </div>

        {/* Rest of the form sections remain the same but with updated save button */}
        <div className="space-y-8">
          {/* Hero Section */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Hero-seksjon</h2>
            <div className="space-y-4">
              <TextEditor
                title="Hovedtittel"
                value={data.aboutHero.title}
                onChange={(value) => updateData({ aboutHero: { ...data.aboutHero, title: value } })}
              />
              <TextEditor
                title="Beskrivelse"
                value={data.aboutHero.description}
                onChange={(value) => updateData({ aboutHero: { ...data.aboutHero, description: value } })}
                multiline
              />
              <ImageField
                label="Bakgrunnsbilde"
                value={data.aboutHero.backgroundImage}
                onChange={(value) => updateData({ aboutHero: { ...data.aboutHero, backgroundImage: value } })}
                placeholder="Last opp bakgrunnsbilde eller bruk URL"
              />
            </div>
          </section>

          {/* Om Karmsund ABR */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Om Karmsund ABR</h2>
            <div className="space-y-4">
              <TextEditor
                title="Tittel"
                value={data.aboutKarmsundText.title}
                onChange={(value) => updateData({ aboutKarmsundText: { ...data.aboutKarmsundText, title: value } })}
              />
              <ImageField
                label="Bilde"
                value={data.aboutKarmsundText.image || ""}
                onChange={(value) => updateData({ aboutKarmsundText: { ...data.aboutKarmsundText, image: value } })}
                placeholder="Last opp bilde eller bruk URL"
              />
              <TextEditor
                title="Bildetekst (alt-tekst)"
                value={data.aboutKarmsundText.imageAlt || ""}
                onChange={(value) => updateData({ aboutKarmsundText: { ...data.aboutKarmsundText, imageAlt: value } })}
                placeholder="Beskrivelse av bildet for tilgjengelighet"
              />
              <TextEditor
                title="Innhold"
                value={data.aboutKarmsundText.content}
                onChange={(value) => updateData({ aboutKarmsundText: { ...data.aboutKarmsundText, content: value } })}
                multiline
              />
            </div>
          </section>

          {/* Verdier og metode */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Verdier og metode</h2>
              <Button onClick={addValuesAndMethodsSection} size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Legg til seksjon
              </Button>
            </div>

            <div className="space-y-4">
              <TextEditor
                title="Hovedtittel"
                value={data.valuesAndMethods.title}
                onChange={(value) => updateData({ valuesAndMethods: { ...data.valuesAndMethods, title: value } })}
              />

              {data.valuesAndMethods.sections.map((section, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">Kort {index + 1}</h3>
                    {data.valuesAndMethods.sections.length > 1 && (
                      <Button onClick={() => removeValuesAndMethodsSection(index)} size="sm" variant="destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="space-y-3">
                    <TextEditor
                      title="Tittel"
                      value={section.title}
                      onChange={(value) => updateValuesAndMethodsSection(index, "title", value)}
                    />
                    <TextEditor
                      title="Innhold"
                      value={section.content}
                      onChange={(value) => updateValuesAndMethodsSection(index, "content", value)}
                      multiline
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Omsorg, fellesskap og stabilitet */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Omsorg, fellesskap og stabilitet</h2>
            <div className="space-y-4">
              <TextEditor
                title="Tittel"
                value={data.careAndCommunity.title}
                onChange={(value) => updateData({ careAndCommunity: { ...data.careAndCommunity, title: value } })}
              />
              <TextEditor
                title="Innhold"
                value={data.careAndCommunity.content}
                onChange={(value) => updateData({ careAndCommunity: { ...data.careAndCommunity, content: value } })}
                multiline
              />
            </div>
          </section>

          {/* Vår personalgruppe */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Vår personalgruppe</h2>
            <div className="space-y-4">
              <TextEditor
                title="Tittel"
                value={data.personalGroup.title}
                onChange={(value) => updateData({ personalGroup: { ...data.personalGroup, title: value } })}
              />
              <TextEditor
                title="Beskrivelse"
                value={data.personalGroup.description}
                onChange={(value) => updateData({ personalGroup: { ...data.personalGroup, description: value } })}
                multiline
              />

              <PersonEditor
                title="Nøkkelpersoner"
                people={data.personalGroup.people}
                onChange={(people) => updateData({ personalGroup: { ...data.personalGroup, people } })}
              />
            </div>
          </section>

          {/* Tverrfaglig team */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Tverrfaglig team</h2>
            <div className="space-y-4">
              <TextEditor
                title="Tittel"
                value={data.interdisciplinaryTeam.title}
                onChange={(value) =>
                  updateData({ interdisciplinaryTeam: { ...data.interdisciplinaryTeam, title: value } })
                }
              />
              <TextEditor
                title="Innhold"
                value={data.interdisciplinaryTeam.content}
                onChange={(value) =>
                  updateData({ interdisciplinaryTeam: { ...data.interdisciplinaryTeam, content: value } })
                }
                multiline
                placeholder="Bruk • for punktlister"
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
