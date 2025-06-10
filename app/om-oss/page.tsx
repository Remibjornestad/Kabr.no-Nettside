"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import OptimizedImage from "@/components/optimized-image"
import { useCMSData } from "@/hooks/use-cms-data"

export default function OmOss() {
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

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full h-[40vh] min-h-[300px]">
        <OptimizedImage
          src={data.aboutHero.backgroundImage || "/placeholder.svg"}
          alt="Teamet ved Bjørnestad"
          fill
          priority
          className="object-cover brightness-[0.85]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-md">{data.aboutHero.title}</h1>
            <p className="text-lg md:text-xl text-white max-w-3xl mx-auto drop-shadow-md whitespace-pre-line">
              {data.aboutHero.description}
            </p>
          </div>
        </div>
      </section>

      {/* Om Karmsund ABR */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-6">{data.aboutKarmsundText.title}</h2>
              <div className="text-lg text-slate-700 whitespace-pre-line">{data.aboutKarmsundText.content}</div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden border border-steel-200">
              <OptimizedImage
                src="https://i.ibb.co/DPPwGjKg/487043534-1132858625520829-4135336808992699070-n.jpg"
                alt="Karmsund ABR Bjørnestad"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Verdier og metode */}
      <section className="py-16 px-4 md:px-8 bg-steel-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-800 mb-10">{data.valuesAndMethods.title}</h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {data.valuesAndMethods.sections.map((section, index) => (
              <div key={index} className="bg-white p-6 border-t-4 border-steel-500">
                <h3 className="text-xl font-semibold mb-4">{section.title}</h3>
                <p className="text-slate-700 whitespace-pre-line">{section.content}</p>
              </div>
            ))}
          </div>

          <div className="bg-navy-500 text-white p-8 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">{data.careAndCommunity.title}</h3>
            <div className="whitespace-pre-line">{data.careAndCommunity.content}</div>
          </div>
        </div>
      </section>

      {/* Vår personalgruppe */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-800 mb-10">{data.personalGroup.title}</h2>

          <p className="text-lg text-slate-700 mb-8 whitespace-pre-line">{data.personalGroup.description}</p>

          <div className="grid md:grid-cols-3 gap-10 mb-12">
            {data.personalGroup.people.map((person) => (
              <div key={person.id} className="text-center">
                <div className="mx-auto overflow-hidden h-48 w-48 mb-4 border-2 border-steel-200">
                  <OptimizedImage
                    src={person.image || "/person-silhouette.png"}
                    alt={person.name}
                    width={192}
                    height={192}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="text-xl font-semibold text-slate-800">{person.name}</h3>
                <p className="text-steel-600">{person.title}</p>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 p-8 border-l-4 border-steel-500">
            <h3 className="text-xl font-semibold mb-4">{data.interdisciplinaryTeam.title}</h3>
            <div className="text-slate-700 whitespace-pre-line">{data.interdisciplinaryTeam.content}</div>
          </div>
        </div>
      </section>

      {/* Kontakt CTA */}
      <section className="py-16 px-4 md:px-8 bg-steel-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ønsker du å vite mer?</h2>
          <p className="text-lg mb-8">
            Ta kontakt med oss for en uforpliktende samtale om hvordan vi kan hjelpe deg eller noen du bryr deg om. Vi
            er her for å svare på dine spørsmål og fortelle mer om vårt tilbud.
          </p>
          <Button asChild size="lg" className="bg-white text-steel-600 hover:bg-gray-100">
            <Link href="/kontakt">Kontakt oss</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
