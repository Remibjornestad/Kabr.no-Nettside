"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Save } from "lucide-react"
import TextEditor from "@/components/cms/text-editor"
import PersonEditor from "@/components/cms/person-editor"
import { getCMSData, saveCMSSection } from "@/lib/cms-data-supabase"
import type { CMSData } from "@/types/cms"
import ImageField from "@/components/cms/image-field"

export default function CMSKontakt() {
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
      const contactData = {
        contactHero: data.contactHero,
        contactPeople: data.contactPeople,
        generalContactInfo: data.generalContactInfo,
        applicationAndInquiries: data.applicationAndInquiries,
      }

      const success = await saveCMSSection("contact", contactData)
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
            <h1 className="text-2xl font-bold text-gray-900">Rediger kontakt</h1>
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
                value={data.contactHero.title}
                onChange={(value) => updateData({ contactHero: { ...data.contactHero, title: value } })}
              />
              <TextEditor
                title="Beskrivelse"
                value={data.contactHero.description}
                onChange={(value) => updateData({ contactHero: { ...data.contactHero, description: value } })}
                multiline
              />
              <ImageField
                label="Bakgrunnsbilde"
                value={data.contactHero.backgroundImage}
                onChange={(value) => updateData({ contactHero: { ...data.contactHero, backgroundImage: value } })}
                placeholder="Last opp bakgrunnsbilde eller bruk URL"
              />
            </div>
          </section>

          {/* Kontaktpersoner */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <PersonEditor
              title="Kontaktpersoner"
              people={data.contactPeople}
              onChange={(people) => updateData({ contactPeople: people })}
            />
          </section>

          {/* Generell kontaktinformasjon */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Generell kontaktinformasjon</h2>
            <div className="space-y-4">
              <TextEditor
                title="Adresse"
                value={data.generalContactInfo.address}
                onChange={(value) =>
                  updateData({
                    generalContactInfo: { ...data.generalContactInfo, address: value },
                  })
                }
              />
              <TextEditor
                title="Åpningstider"
                value={data.generalContactInfo.openingHours}
                onChange={(value) =>
                  updateData({
                    generalContactInfo: { ...data.generalContactInfo, openingHours: value },
                  })
                }
                multiline
              />
              <TextEditor
                title="Besøkstider"
                value={data.generalContactInfo.visitingHours}
                onChange={(value) =>
                  updateData({
                    generalContactInfo: { ...data.generalContactInfo, visitingHours: value },
                  })
                }
                multiline
              />
              <div className="grid grid-cols-2 gap-4">
                <TextEditor
                  title="Organisasjonsnummer"
                  value={data.generalContactInfo.organizationNumber}
                  onChange={(value) =>
                    updateData({
                      generalContactInfo: { ...data.generalContactInfo, organizationNumber: value },
                    })
                  }
                />
                <TextEditor
                  title="Stiftelsesår"
                  value={data.generalContactInfo.foundedYear}
                  onChange={(value) =>
                    updateData({
                      generalContactInfo: { ...data.generalContactInfo, foundedYear: value },
                    })
                  }
                />
              </div>
            </div>
          </section>

          {/* Innsøking og henvendelser */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Innsøking og henvendelser</h2>
            <div className="space-y-4">
              <TextEditor
                title="Hovedtittel"
                value={data.applicationAndInquiries.title}
                onChange={(value) =>
                  updateData({
                    applicationAndInquiries: { ...data.applicationAndInquiries, title: value },
                  })
                }
              />
              {data.applicationAndInquiries.sections.map((section, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium mb-3">Seksjon {index + 1}</h3>
                  <div className="space-y-3">
                    <TextEditor
                      title="Tittel"
                      value={section.title}
                      onChange={(value) => {
                        const newSections = [...data.applicationAndInquiries.sections]
                        newSections[index] = { ...newSections[index], title: value }
                        updateData({
                          applicationAndInquiries: { ...data.applicationAndInquiries, sections: newSections },
                        })
                      }}
                    />
                    <TextEditor
                      title="Innhold"
                      value={section.content}
                      onChange={(value) => {
                        const newSections = [...data.applicationAndInquiries.sections]
                        newSections[index] = { ...newSections[index], content: value }
                        updateData({
                          applicationAndInquiries: { ...data.applicationAndInquiries, sections: newSections },
                        })
                      }}
                      multiline
                    />
                  </div>
                </div>
              ))}
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
