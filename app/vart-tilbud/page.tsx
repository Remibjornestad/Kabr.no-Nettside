"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import SEOHead from "@/components/seo-head"
import Breadcrumbs from "@/components/breadcrumbs"
import StructuredData from "@/components/structured-data"
import { useCMSData } from "@/hooks/use-cms-data"

export default function VartTilbud() {
  const { data, loading, error } = useCMSData()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-steel-600 mx-auto mb-4"></div>
          <p>Laster innhold...</p>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || "Kunne ikke laste innhold"}</p>
          <button onClick={() => window.location.reload()} className="text-steel-600 underline">
            Prøv igjen
          </button>
        </div>
      </div>
    )
  }

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Hjem",
        item: "https://www.kabr.no",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Vårt tilbud",
        item: "https://www.kabr.no/vart-tilbud",
      },
    ],
  }

  const serviceData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Rusrehabilitering og psykisk helsehjelp",
    provider: {
      "@type": "Organization",
      name: "Karmsund ABR - avdeling Bjørnestad",
    },
    description: data.whatWeOffer.content,
    areaServed: {
      "@type": "Country",
      name: "Norway",
    },
    serviceType: "Healthcare",
  }

  return (
    <div className="flex flex-col w-full">
      <SEOHead
        title="Vårt tilbud - Rusrehabilitering og psykisk helse"
        description="Utforsk vårt helhetlige rehabiliteringstilbud for rus og psykiske helseutfordringer. Individuell oppfølging, aktiviteter og trygg bolig på Bjørnestad."
        keywords="rusrehabilitering, psykisk helse, rehabilitering, LAR, ROP, aktiviteter, individuell oppfølging, bolig, bjørnestad"
        canonical="/vart-tilbud"
        ogImage={data.offerHero.backgroundImage}
      />

      <StructuredData data={breadcrumbData} />
      <StructuredData data={serviceData} />

      <Breadcrumbs items={[{ label: "Vårt tilbud" }]} />

      {/* Hero Section */}
      <section className="relative w-full h-[40vh] min-h-[300px]">
        <Image
          src={data.offerHero.backgroundImage || "/placeholder.svg"}
          alt="Aktiviteter ved Bjørnestad - Karmsund ABR"
          fill
          priority
          className="object-cover brightness-[0.85]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-md">{data.offerHero.title}</h1>
            <p className="text-lg md:text-xl text-white max-w-3xl mx-auto drop-shadow-md whitespace-pre-line">
              {data.offerHero.description}
            </p>
          </div>
        </div>
      </section>

      {/* Innledning */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-800 mb-6">{data.whatWeOffer.title}</h2>
          <p className="text-lg text-slate-700 mb-8 whitespace-pre-line">{data.whatWeOffer.content}</p>
        </div>
      </section>

      {/* Rehabiliteringstilbud */}
      <section className="py-16 px-4 md:px-8 bg-steel-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-800 mb-10">Vårt rehabiliteringstilbud</h2>

          <div className="space-y-12">
            {data.rehabilitationSections.map((section, index) => (
              <article key={section.id} className="space-y-6 md:space-y-0">
                {/* Mobile layout: Title, text, image */}
                <div className="block md:hidden space-y-4">
                  <h3 className="text-2xl font-semibold">{section.title}</h3>
                  <div className="text-slate-700 whitespace-pre-line">{section.content}</div>
                  <div className="relative h-[250px] rounded-lg overflow-hidden shadow-md">
                    <Image
                      src={section.image || "/placeholder.svg"}
                      alt={section.imageAlt || `${section.title} - Karmsund ABR Bjørnestad`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Desktop layout: Alternating image positions */}
                <div className="hidden md:grid md:grid-cols-2 gap-8 items-center">
                  <div className={index % 2 === 1 ? "order-2" : ""}>
                    <h3 className="text-2xl font-semibold mb-4">{section.title}</h3>
                    <div className="text-slate-700 whitespace-pre-line">{section.content}</div>
                  </div>
                  <div
                    className={`relative h-[300px] rounded-lg overflow-hidden shadow-md ${index % 2 === 1 ? "order-1" : ""}`}
                  >
                    <Image
                      src={section.image || "/placeholder.svg"}
                      alt={section.imageAlt || `${section.title} - Karmsund ABR Bjørnestad`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Hvordan vi jobber */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-800 mb-10">{data.howWeWork.title}</h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {data.howWeWork.sections.map((section, index) => (
              <Card key={index} className="shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">{section.title}</h3>
                  <p className="text-slate-700 whitespace-pre-line">{section.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Fasiliteter */}
      <section className="py-16 px-4 md:px-8 bg-steel-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-800 mb-10">{data.facilities.title}</h2>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-slate-700 mb-4 whitespace-pre-line">{data.facilities.content}</p>
              <ul className="space-y-3 text-slate-700">
                {data.facilities.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-steel-600 mr-2">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-md">
              <Image
                src={data.facilities.image || "/placeholder.svg"}
                alt={data.facilities.imageAlt || "Fasiliteter ved Karmsund ABR Bjørnestad"}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Henvisning og inntak */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-800 mb-10">{data.referralAndAdmission.title}</h2>

          <div className="bg-steel-100 p-8 rounded-lg mb-8">
            <div className="text-slate-700 mb-4 whitespace-pre-line">{data.referralAndAdmission.content}</div>
          </div>

          <div className="text-center">
            <Button asChild size="lg" className="bg-steel-500 hover:bg-steel-600 text-white">
              <Link href="/kontakt">Kontakt oss for inntak</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Kontakt CTA */}
      <section className="py-16 px-4 md:px-8 bg-steel-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Interessert i vårt tilbud?</h2>
          <p className="text-lg mb-8">
            Ta kontakt med oss for mer informasjon eller for å avtale et besøk. Vi er her for å svare på dine spørsmål
            og hjelpe deg med innsøkingsprosessen.
          </p>
          <Button asChild size="lg" className="bg-white text-steel-600 hover:bg-gray-100">
            <Link href="/kontakt">Kontakt oss</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
