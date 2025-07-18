"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import OptimizedImage from "@/components/optimized-image"
import StructuredData from "@/components/structured-data"
import { useState } from "react"

// Bildene for "Inntrykk fra Bjørnestad" galleriet
const impressionImages = [
  {
    src: "/images/services/mindfulness-yoga.webp",
    alt: "Yoga og mindfulness ved havet",
  },
  {
    src: "/images/activities/cross-country-skiing.webp",
    alt: "Langrenn i vinterlandskapet",
  },
  {
    src: "/images/activities/mountain-carts-group.webp",
    alt: "Fjellkjøring med mountain carts",
  },
  {
    src: "/images/activities/kayaking.webp",
    alt: "Kajakk på lokale innsjøer",
  },
  {
    src: "/images/activities/alpine-skiing.webp",
    alt: "Alpint med utsikt over fjord",
  },
  {
    src: "/images/facilities/common-area.webp",
    alt: "Koselig fellesområde med peis",
  },
  {
    src: "/images/activities/winter-landscape.webp",
    alt: "Vinterlandskap rundt Bjørnestad",
  },
]

// Bildegalleri-komponent for forsiden
function HomeImageGallery() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % impressionImages.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + impressionImages.length) % impressionImages.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <div className="relative w-full h-[500px] md:h-[600px] group">
      <div className="relative h-full w-full rounded-lg overflow-hidden">
        <OptimizedImage
          src={impressionImages[currentIndex].src}
          alt={impressionImages[currentIndex].alt}
          fill
          className="object-cover transition-all duration-500"
          sizes="(max-width: 768px) 100vw, 1200px"
          priority={currentIndex === 0}
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-colors"
        aria-label="Forrige bilde"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-colors"
        aria-label="Neste bilde"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {impressionImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${currentIndex === index ? "bg-white" : "bg-white/50"}`}
            aria-label={`Gå til bilde ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default function ClientPage() {
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
  }

  return (
    <div className="flex flex-col w-full">
      <StructuredData data={organizationData} />

      {/* Hero Section */}
      <section className="relative w-full h-[80vh] min-h-[600px]">
        <OptimizedImage
          src="/images/hero/main-building.webp"
          alt="Bjørnestad bygning i naturskjønne omgivelser"
          fill
          priority
          className="object-cover object-[center_40%] brightness-[0.85]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-2 drop-shadow-md">
              Velkommen til Karmsund ABR
            </h1>
            <p className="text-xl md:text-2xl text-white mb-6 drop-shadow-md">avdeling Bjørnestad</p>
            <p className="text-lg md:text-xl lg:text-2xl text-white mb-8 max-w-3xl mx-auto drop-shadow-md">
              Et trygt og helhetlig omsorgstilbud for deg som lever med rus og psykiske helseutfordringer
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-steel-500 hover:bg-steel-600 text-white">
                <Link href="/vart-tilbud">Se vårt tilbud</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-white/90 hover:bg-white text-steel-600 border-steel-300"
              >
                <Link href="/kontakt">Kontakt oss</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Kort om hvem vi er */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-6">Om Karmsund ABR</h2>
              <p className="text-lg text-slate-700 mb-4">
                Karmsund ABR er en privat stiftelse med ideelt formål. Siden 1991 har vi gitt mennesker med
                rusavhengighet et trygt og støttende tilbud, med fokus på omsorg og rehabilitering. Vår avdeling
                Bjørnestad ligger i naturskjønne omgivelser på grensen mellom Agder og Rogaland, på Sirdal, Tonstad. Her
                møter du et team av dedikerte fagpersoner med lang erfaring innen rus og psykisk helse, som er her for å
                støtte deg på din vei.
              </p>
              <p className="text-lg text-slate-700 mb-6"></p>
              <Button asChild className="bg-steel-500 hover:bg-steel-600 text-white">
                <Link href="/om-oss">Les mer om oss</Link>
              </Button>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden border border-steel-200">
              <OptimizedImage
                src="/images/about/team-photo.webp"
                alt="Karmsund ABR Bjørnestad"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Hva vi tilbyr */}
      <section className="py-16 px-4 md:px-8 bg-steel-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-8">Vårt tilbud</h2>

          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-slate-700 mb-6 text-center">
              På Bjørnestad kan du få kort- eller langtidsopphold i trygge og rolige omgivelser. Vi fokuserer på
              individuell oppfølging der du står i sentrum. Vårt tverrfaglige team tilbyr omsorg, støtte til
              rusmestring, arbeidstrening og fysiske aktiviteter – alt tilpasset dine behov og mål.
            </p>
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
          <h2 className="text-3xl font-bold mb-6">Omsorg, trygghet og mestring</h2>
          <blockquote className="text-2xl italic font-light mb-4">
            Hos oss handler omsorg om mer enn støtte – det handler om håp, fellesskap og nye muligheter.
          </blockquote>
          <p className="text-lg mb-4">
            På Bjørnestad vektlegger vi omsorg, nestekjærlighet og din medvirkning i egen hverdag. Vi jobber med en
            recoveryorientert tilnærming der målet er at du gradvis tar tilbake kontrollen i ditt eget liv.
          </p>
        </div>
      </section>

      {/* Bildegalleri */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">Inntrykk fra Bjørnestad</h2>
          <HomeImageGallery />
        </div>
      </section>

      {/* Kontakt CTA */}
      <section className="py-16 px-4 md:px-8 bg-steel-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-6">Er du interessert i vårt tilbud?</h2>
          <p className="text-lg text-slate-700 mb-8 max-w-3xl mx-auto">
            Ta kontakt med oss for en uforpliktende samtale om hvordan vi kan hjelpe deg eller noen du bryr deg om. Vi
            er her for å svare på spørsmål og veilede deg gjennom innsøkingsprosessen.
          </p>
          <Button asChild size="lg" className="bg-steel-500 hover:bg-steel-600 text-white">
            <Link href="/kontakt">Kontakt oss</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
