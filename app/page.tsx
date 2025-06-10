"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import ImageGallery from "@/components/image-gallery"
import OptimizedImage from "@/components/optimized-image"
import StructuredData from "@/components/structured-data"
import SEOHead from "@/components/seo-head"
import { useCMSData } from "@/hooks/use-cms-data"

export default function Home() {
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

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Karmsund ABR - avdeling Bjørnestad",
    url: "https://www.kabr.no",
    logo: "https://www.kabr.no/karmsund-abr-logo.png",
    description: "Et helhetlig omsorgstilbud for mennesker med rus og psykiske helseutfordringer",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Sirdalsveien 2444",
      addressLocality: "Tonstad",
      postalCode: "4440",
      addressCountry: "NO",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+47-924-21-020",
      contactType: "customer service",
      email: "Bjørnestad@kabr.no",
    },
    sameAs: ["https://www.facebook.com/karmsundabr", "https://www.linkedin.com/company/karmsund-abr"],
    foundingDate: "1995",
    areaServed: {
      "@type": "Country",
      name: "Norway",
    },
    serviceType: "Rusrehabilitering og psykisk helsehjelp",
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
    ],
  }

  return (
    <div className="flex flex-col w-full">
      <SEOHead
        title="Omsorgstilbud for rus og psykisk helse"
        description="Karmsund ABR avdeling Bjørnestad tilbyr et helhetlig omsorgstilbud for mennesker med rus og psykiske helseutfordringer i trygge omgivelser på Tonstad, Sirdal."
        keywords="rusrehabilitering, psykisk helse, omsorgstilbud, Bjørnestad, Karmsund ABR, Tonstad, Sirdal, ROP, LAR, rehabilitering"
        canonical="/"
        ogImage={data.homeHero.backgroundImage}
      />

      <StructuredData data={organizationData} />
      <StructuredData data={breadcrumbData} />

      {/* Hero Section */}
      <section className="relative w-full h-[70vh] min-h-[500px]">
        <OptimizedImage
          src={data.homeHero.backgroundImage || "/placeholder.svg"}
          alt="Naturskjønt landskap ved Bjørnestad - Karmsund ABR"
          fill
          priority
          className="object-cover brightness-[0.85]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-2 drop-shadow-md">
              {data.homeHero.title}
            </h1>
            {data.homeHero.subtitle && (
              <p className="text-xl md:text-2xl text-white mb-6 drop-shadow-md">{data.homeHero.subtitle}</p>
            )}
            <p className="text-lg md:text-xl lg:text-2xl text-white mb-8 max-w-3xl mx-auto drop-shadow-md">
              {data.homeHero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {data.homeHero.primaryButtonText && (
                <Button asChild size="lg" className="bg-steel-500 hover:bg-steel-600 text-white">
                  <Link href="/vart-tilbud">{data.homeHero.primaryButtonText}</Link>
                </Button>
              )}
              {data.homeHero.secondaryButtonText && (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="bg-white/90 hover:bg-white text-steel-600 border-steel-300"
                >
                  <Link href="/kontakt">{data.homeHero.secondaryButtonText}</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Kort om hvem vi er */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className={`grid ${data.aboutKarmsund.image ? "md:grid-cols-2" : "md:grid-cols-1"} gap-12 items-center`}>
            <div className={data.aboutKarmsund.image ? "" : "text-center"}>
              <h2 className="text-3xl font-bold text-slate-800 mb-6">{data.aboutKarmsund.title}</h2>
              <div className="text-lg text-slate-700 mb-6 whitespace-pre-line">{data.aboutKarmsund.content}</div>
              <Button asChild className="bg-steel-500 hover:bg-steel-600 text-white">
                <Link href="/om-oss">Les mer om oss</Link>
              </Button>
            </div>
            {data.aboutKarmsund.image && (
              <div className="relative h-[400px] rounded-lg overflow-hidden border border-steel-200">
                <OptimizedImage
                  src={data.aboutKarmsund.image}
                  alt={data.aboutKarmsund.imageAlt || "Karmsund ABR Bjørnestad - våre fasiliteter"}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Hva vi tilbyr */}
      <section className="py-16 px-4 md:px-8 bg-steel-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-8">{data.ourOffer.title}</h2>

          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-slate-700 mb-6 text-center whitespace-pre-line">{data.ourOffer.content}</p>
            <div className="text-center mt-6">
              <Button asChild className="bg-steel-500 hover:bg-steel-600 text-white">
                <Link href="/vart-tilbud">Utforsk vårt tilbud</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Verdibudskap */}
      <section className="py-16 px-4 md:px-8 bg-navy-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">{data.ourValues.title}</h2>
          <div className="text-lg whitespace-pre-line">{data.ourValues.content}</div>
        </div>
      </section>

      {/* Bildegalleri */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">Inntrykk fra Bjørnestad</h2>
          <ImageGallery images={data.imageGallery} />
        </div>
      </section>

      {/* Kontakt CTA */}
      <section className="py-16 px-4 md:px-8 bg-steel-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-6">{data.interestedCTA.title}</h2>
          <p className="text-lg text-slate-700 mb-8 max-w-3xl mx-auto whitespace-pre-line">
            {data.interestedCTA.content}
          </p>
          <Button asChild size="lg" className="bg-steel-500 hover:bg-steel-600 text-white">
            <Link href="/kontakt">Kontakt oss</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
