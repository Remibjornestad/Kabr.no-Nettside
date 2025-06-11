"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react"
import TextEditor from "@/components/cms/text-editor"
import { getCMSData, saveCMSSection } from "@/lib/cms-data-supabase"
import type { CMSData, RehabilitationSection } from "@/types/cms"
import ImageField from "@/components/cms/image-field"

export default function CMSVartTilbud() {
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
      const offerData = {
        offerHero: data.offerHero,
        whatWeOffer: data.whatWeOffer,
        rehabilitationSections: data.rehabilitationSections,
        howWeWork: data.howWeWork,
        facilities: data.facilities,
        referralAndAdmission: data.referralAndAdmission,
      }

      const success = await saveCMSSection("offer", offerData)
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

  const updateRehabilitationSection = (index: number, updates: Partial<RehabilitationSection>) => {
    if (data) {
      const newSections = [...data.rehabilitationSections]
      newSections[index] = { ...newSections[index], ...updates }
      updateData({ rehabilitationSections: newSections })
    }
  }

  const addRehabilitationSection = () => {
    if (data) {
      const newSection: RehabilitationSection = {
        id: Date.now().toString(),
        title: "Ny seksjon",
        content: "",
        image: "/placeholder-image.png",
        imageAlt: "Beskrivelse av bilde",
      }
      updateData({ rehabilitationSections: [...data.rehabilitationSections, newSection] })
    }
  }

  const removeRehabilitationSection = (index: number) => {
    if (data && data.rehabilitationSections.length > 1) {
      const newSections = data.rehabilitationSections.filter((_, i) => i !== index)
      updateData({ rehabilitationSections: newSections })
    }
  }

  const updateHowWeWorkSection = (index: number, field: "title" | "content", value: string) => {
    if (data) {
      const newSections = [...data.howWeWork.sections]
      newSections[index] = { ...newSections[index], [field]: value }
      updateData({
        howWeWork: { ...data.howWeWork, sections: newSections },
      })
    }
  }

  const addHowWeWorkSection = () => {
    if (data) {
      const newSection = { title: "Ny seksjon", content: "" }
      updateData({
        howWeWork: {
          ...data.howWeWork,
          sections: [...data.howWeWork.sections, newSection],
        },
      })
    }
  }

  const removeHowWeWorkSection = (index: number) => {
    if (data && data.howWeWork.sections.length > 1) {
      const newSections = data.howWeWork.sections.filter((_, i) => i !== index)
      updateData({
        howWeWork: { ...data.howWeWork, sections: newSections },
      })
    }
  }

  const updateFacilityFeature = (index: number, value: string) => {
    if (data) {
      const newFeatures = [...data.facilities.features]
      newFeatures[index] = value
      updateData({
        facilities: { ...data.facilities, features: newFeatures },
      })
    }
  }

  const addFacilityFeature = () => {
    if (data) {
      updateData({
        facilities: {
          ...data.facilities,
          features: [...data.facilities.features, "Ny funksjon"],
        },
      })
    }
  }

  const removeFacilityFeature = (index: number) => {
    if (data && data.facilities.features.length > 1) {
      const newFeatures = data.facilities.features.filter((_, i) => i !== index)
      updateData({
        facilities: { ...data.facilities, features: newFeatures },
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
            <h1 className="text-2xl font-bold text-gray-900">Rediger vårt tilbud</h1>
          </div>
          <Button onClick={handleSave} disabled={!hasChanges || saving}>
            <Save className="h-4 w-4 mr-1" />
            {saving ? "Lagrer..." : "Lagre endringer"}
          </Button>
        </div>

        <div className="space-y-8">
          {/* Hero Section */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Hero-seksjon</h2>
            <div className="space-y-4">
              <TextEditor
                title="Hovedtittel"
                value={data.offerHero.title}
                onChange={(value) => updateData({ offerHero: { ...data.offerHero, title: value } })}
              />
              <TextEditor
                title="Beskrivelse"
                value={data.offerHero.description}
                onChange={(value) => updateData({ offerHero: { ...data.offerHero, description: value } })}
                multiline
              />
              <ImageField
                label="Bakgrunnsbilde"
                value={data.offerHero.backgroundImage}
                onChange={(value) => updateData({ offerHero: { ...data.offerHero, backgroundImage: value } })}
                placeholder="Last opp bakgrunnsbilde eller bruk URL"
              />
            </div>
          </section>

          {/* Hva vi tilbyr */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Hva vi tilbyr</h2>
            <div className="space-y-4">
              <TextEditor
                title="Tittel"
                value={data.whatWeOffer.title}
                onChange={(value) => updateData({ whatWeOffer: { ...data.whatWeOffer, title: value } })}
              />
              <TextEditor
                title="Innhold"
                value={data.whatWeOffer.content}
                onChange={(value) => updateData({ whatWeOffer: { ...data.whatWeOffer, content: value } })}
                multiline
              />
            </div>
          </section>

          {/* Vårt rehabiliteringstilbud */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Vårt rehabiliteringstilbud</h2>
              <Button onClick={addRehabilitationSection} size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Legg til seksjon
              </Button>
            </div>

            <div className="space-y-6">
              {data.rehabilitationSections.map((section, index) => (
                <div key={section.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">Seksjon {index + 1}</h3>
                    {data.rehabilitationSections.length > 1 && (
                      <Button onClick={() => removeRehabilitationSection(index)} size="sm" variant="destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="space-y-4">
                    <TextEditor
                      title="Tittel"
                      value={section.title}
                      onChange={(value) => updateRehabilitationSection(index, { title: value })}
                    />
                    <TextEditor
                      title="Innhold"
                      value={section.content}
                      onChange={(value) => updateRehabilitationSection(index, { content: value })}
                      multiline
                    />
                    <ImageField
                      label="Bilde"
                      value={section.image}
                      onChange={(value) => updateRehabilitationSection(index, { image: value })}
                      placeholder="Last opp bilde eller bruk URL"
                    />
                    <TextEditor
                      title="Bilde alt-tekst"
                      value={section.imageAlt}
                      onChange={(value) => updateRehabilitationSection(index, { imageAlt: value })}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Hvordan vi jobber */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Hvordan vi jobber</h2>
              <Button onClick={addHowWeWorkSection} size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Legg til seksjon
              </Button>
            </div>

            <div className="space-y-4">
              <TextEditor
                title="Hovedtittel"
                value={data.howWeWork.title}
                onChange={(value) => updateData({ howWeWork: { ...data.howWeWork, title: value } })}
              />

              {/* Ukeplan seksjon - med fallback for eldre data */}
              <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                <h3 className="font-medium mb-3">Fast ukeplan</h3>
                <div className="space-y-3">
                  <TextEditor
                    title="Tittel"
                    value={data.howWeWork.weeklySchedule?.title || "Fast ukeplan"}
                    onChange={(value) =>
                      updateData({
                        howWeWork: {
                          ...data.howWeWork,
                          weeklySchedule: {
                            ...data.howWeWork.weeklySchedule,
                            title: value,
                            content: data.howWeWork.weeklySchedule?.content || "",
                          },
                        },
                      })
                    }
                  />
                  <TextEditor
                    title="Innhold"
                    value={
                      data.howWeWork.weeklySchedule?.content ||
                      "Vi har fast ukeplan på avdelingen med oppsatte tider på morgenmøte/frokost, lunch, handleturer hver tirsdag, torsdag og lørdager, middag og aktiviteter. Faste medisintider gjennom dagen. Denne henges opp i fellesareal ved vaktrom.\n\nDenne strukturen gir forutsigbarhet og trygghet i hverdagen, samtidig som den hjelper med å etablere gode rutiner."
                    }
                    onChange={(value) =>
                      updateData({
                        howWeWork: {
                          ...data.howWeWork,
                          weeklySchedule: {
                            title: data.howWeWork.weeklySchedule?.title || "Fast ukeplan",
                            content: value,
                          },
                        },
                      })
                    }
                    multiline
                  />
                </div>
              </div>

              {data.howWeWork.sections.map((section, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">Kort {index + 1}</h3>
                    {data.howWeWork.sections.length > 1 && (
                      <Button onClick={() => removeHowWeWorkSection(index)} size="sm" variant="destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="space-y-3">
                    <TextEditor
                      title="Tittel"
                      value={section.title}
                      onChange={(value) => updateHowWeWorkSection(index, "title", value)}
                    />
                    <TextEditor
                      title="Innhold"
                      value={section.content}
                      onChange={(value) => updateHowWeWorkSection(index, "content", value)}
                      multiline
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Fasiliteter */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Fasiliteter</h2>
            <div className="space-y-4">
              <TextEditor
                title="Tittel"
                value={data.facilities.title}
                onChange={(value) => updateData({ facilities: { ...data.facilities, title: value } })}
              />
              <TextEditor
                title="Innledning"
                value={data.facilities.content}
                onChange={(value) => updateData({ facilities: { ...data.facilities, content: value } })}
                multiline
              />

              <ImageField
                label="Bilde"
                value={data.facilities.image}
                onChange={(value) => updateData({ facilities: { ...data.facilities, image: value } })}
                placeholder="Last opp bilde eller bruk URL"
              />
              <TextEditor
                title="Bilde alt-tekst"
                value={data.facilities.imageAlt}
                onChange={(value) => updateData({ facilities: { ...data.facilities, imageAlt: value } })}
              />

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">Fasiliteter liste</h3>
                  <Button onClick={addFacilityFeature} size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    Legg til
                  </Button>
                </div>

                <div className="space-y-2">
                  {data.facilities.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="flex-1">
                        <TextEditor
                          title={`Punkt ${index + 1}`}
                          value={feature}
                          onChange={(value) => updateFacilityFeature(index, value)}
                        />
                      </div>
                      {data.facilities.features.length > 1 && (
                        <Button onClick={() => removeFacilityFeature(index)} size="sm" variant="destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Henvisning og inntak */}
          <section className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Henvisning og inntak</h2>
            <div className="space-y-4">
              <TextEditor
                title="Tittel"
                value={data.referralAndAdmission.title}
                onChange={(value) =>
                  updateData({ referralAndAdmission: { ...data.referralAndAdmission, title: value } })
                }
              />
              <TextEditor
                title="Innhold"
                value={data.referralAndAdmission.content}
                onChange={(value) =>
                  updateData({ referralAndAdmission: { ...data.referralAndAdmission, content: value } })
                }
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
