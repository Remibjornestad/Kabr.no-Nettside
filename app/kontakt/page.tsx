"use client"

import { MapPin, Phone, Mail, User, Clock, Calendar } from "lucide-react"
import OptimizedImage from "@/components/optimized-image"
import { useCMSData } from "@/hooks/use-cms-data"

export default function Kontakt() {
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
          src={data.contactHero.backgroundImage || "/placeholder.svg"}
          alt="Kontakt Bjørnestad"
          fill
          priority
          className="object-cover brightness-[0.85]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-md">{data.contactHero.title}</h1>
            <p className="text-lg md:text-xl text-white max-w-3xl mx-auto drop-shadow-md whitespace-pre-line">
              {data.contactHero.description}
            </p>
          </div>
        </div>
      </section>

      {/* Hovedkontaktinformasjon */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">Kontaktinformasjon</h2>
            <p className="text-lg text-slate-700 max-w-3xl mx-auto">
              Ta gjerne kontakt med oss for mer informasjon om vårt tilbud eller for å avtale et besøk. Vi er
              tilgjengelige for å svare på dine spørsmål og hjelpe deg med innsøkingsprosessen.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 mb-16">
            {data.contactPeople.map((person) => (
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
                <p className="text-steel-600 font-medium mb-4">{person.title}</p>
                <div className="space-y-2">
                  {person.phone && (
                    <div className="flex items-center justify-center">
                      <Phone className="h-5 w-5 text-steel-500 mr-2" />
                      <p className="text-slate-700">{person.phone}</p>
                    </div>
                  )}
                  {person.email && (
                    <div className="flex items-center justify-center">
                      <Mail className="h-5 w-5 text-steel-500 mr-2" />
                      <p className="text-slate-700">{person.email}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold mb-6 pb-2 border-b border-steel-200">Generell informasjon</h3>

              <div className="space-y-6 mb-10">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-steel-600 mr-4 mt-1" />
                  <div>
                    <h4 className="text-lg font-semibold">Besøksadresse</h4>
                    <p className="text-slate-700">{data.generalContactInfo.address}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="h-6 w-6 text-steel-600 mr-4 mt-1" />
                  <div>
                    <h4 className="text-lg font-semibold">Åpningstider</h4>
                    <div className="text-slate-700 whitespace-pre-line">{data.generalContactInfo.openingHours}</div>
                  </div>
                </div>

                <div className="flex items-start">
                  <Calendar className="h-6 w-6 text-steel-600 mr-4 mt-1" />
                  <div>
                    <h4 className="text-lg font-semibold">Besøkstider</h4>
                    <div className="text-slate-700 whitespace-pre-line">{data.generalContactInfo.visitingHours}</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-2">Organisasjonsinformasjon</h4>
                <p className="mb-1">
                  <strong>Organisasjonsnummer:</strong> {data.generalContactInfo.organizationNumber}
                </p>
                <p>
                  <strong>Stiftelsesår:</strong> {data.generalContactInfo.foundedYear}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6 pb-2 border-b border-steel-200">Finn veien til oss</h3>
              <div className="relative h-[300px] rounded-lg overflow-hidden mb-4 border border-steel-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2056.1234567890123!2d6.7123456789012!3d58.9123456789012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTjCsDU0JzQ0LjQiTiA2wrA0Mic0NC40IkU!5e0!3m2!1sno!2sno!4v1620123456789!5m2!1sno!2sno"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Kart til Karmsund ABR Bjørnestad"
                ></iframe>
              </div>
              <p className="text-slate-700">
                Bjørnestad ligger på grensen mellom Agder og Rogaland, i naturskjønne omgivelser på Sirdal, Tonstad. Fra
                E39 følg skilting mot Tonstad. Når du kommer til Tonstad, følg Sirdalsveien ca. 5 km til du ser skilting
                til Bjørnestad på høyre side.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Innsøking og henvendelser */}
      <section className="py-16 px-4 md:px-8 bg-steel-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-10">{data.applicationAndInquiries.title}</h2>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            {data.applicationAndInquiries.sections.map((section, index) => (
              <div key={index} className="bg-white p-6 border-t-4 border-steel-500">
                <div className="flex items-center mb-4">
                  <User className="h-6 w-6 text-steel-600 mr-3" />
                  <h3 className="text-xl font-semibold">{section.title}</h3>
                </div>
                <div className="text-slate-700 whitespace-pre-line">{section.content}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
