import { MapPin, Phone, Mail, User, Clock, Calendar } from "lucide-react"
import OptimizedImage from "@/components/optimized-image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Kontakt Karmsund ABR - Ring 924 21 020 for Inntak og Info",
  description:
    "Kontakt oss for inntak og informasjon. Tlf: 924 21 020 (inntak) eller 971 48 305 (daglig leder). Besøksadresse: Sirdalsveien 2444, Tonstad. Ledig kapasitet.",
  keywords:
    "kontakt Karmsund ABR, inntak rusrehabilitering, telefon 924 21 020, Bjørnestad adresse, Tonstad, henvisning",
  openGraph: {
    title: "Kontakt Karmsund ABR - Ring 924 21 020 for Inntak",
    description: "Kontakt oss for inntak og informasjon. Ledig kapasitet for rusrehabilitering på Bjørnestad.",
    url: "https://www.kabr.no/kontakt",
  },
}

export default function Kontakt() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full h-[40vh] min-h-[300px]">
        <OptimizedImage
          src="https://i.ibb.co/mVkbGckH/487481052-1133344698805555-7125103448861760246-n.jpg"
          alt="Kontakt Bjørnestad"
          fill
          priority
          className="object-cover brightness-[0.85]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-md">Kontakt oss</h1>
            <p className="text-lg md:text-xl text-white max-w-3xl mx-auto drop-shadow-md">
              Vi er her for å hjelpe deg med spørsmål om vårt tilbud
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

          <div className="grid md:grid-cols-2 gap-12 mb-16 max-w-4xl mx-auto">
            {/* Daglig leder */}
            <div className="text-center">
              <div className="mx-auto overflow-hidden h-48 w-48 mb-4 border-2 border-steel-200">
                <OptimizedImage
                  src="/person-silhouette.png"
                  alt="Gunn Marie Matnisdal"
                  width={192}
                  height={192}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="text-xl font-semibold text-slate-800">Gunn Marie Matnisdal</h3>
              <p className="text-steel-600 font-medium mb-4">Daglig leder</p>
              <div className="space-y-2">
                <div className="flex items-center justify-center">
                  <Phone className="h-5 w-5 text-steel-500 mr-2" />
                  <p className="text-slate-700">971 48 305</p>
                </div>
                <div className="flex items-center justify-center">
                  <Mail className="h-5 w-5 text-steel-500 mr-2" />
                  <p className="text-slate-700">gunn.marie@kabr.no</p>
                </div>
              </div>
            </div>

            {/* Inntakskoordinator */}
            <div className="text-center">
              <div className="mx-auto overflow-hidden h-48 w-48 mb-4 border-2 border-steel-200">
                <OptimizedImage
                  src="/person-silhouette.png"
                  alt="Inntakskoordinator"
                  width={192}
                  height={192}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="text-xl font-semibold text-slate-800">Inntakskoordinator</h3>
              <p className="text-steel-600 font-medium mb-4"></p>
              <div className="space-y-2">
                <div className="flex items-center justify-center">
                  <Phone className="h-5 w-5 text-steel-500 mr-2" />
                  <p className="text-slate-700">924 21 020</p>
                </div>
                <div className="flex items-center justify-center">
                  <Mail className="h-5 w-5 text-steel-500 mr-2" />
                  <p className="text-slate-700">post@kabr.no</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold mb-6 pb-2 border-b border-steel-200">Generell informasjon</h3>

              <div className="space-y-6 mb-10">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-steel-600 mr-4 mt-1" />
                  <div>
                    <h4 className="text-lg font-semibold">Besøksadresse</h4>
                    <p className="text-slate-700">
                      Sirdalsveien 2444, 4440 Tonstad - All post sendes til: Postboks 44, 4441 Tonstad
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="h-6 w-6 text-steel-600 mr-4 mt-1" />
                  <div>
                    <h4 className="text-lg font-semibold">Åpningstider</h4>
                    <p className="text-slate-700">Mandag - Fredag: 08:00 - 16:00</p>
                    <p className="text-slate-700"></p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Calendar className="h-6 w-6 text-steel-600 mr-4 mt-1" />
                  <div>
                    <h4 className="text-lg font-semibold">Besøkstider</h4>
                    <p className="text-slate-700">Etter avtale</p>
                    <p className="text-slate-700">Ring i forkant for å avtale tid</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-2">Organisasjonsinformasjon</h4>
                <p className="mb-1">
                  <strong>Organisasjonsnummer:</strong> 961 664 837
                </p>
                <p>
                  <strong>Stiftelsesår:</strong> 1991
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6 pb-2 border-b border-steel-200">Finn veien til oss</h3>
              <div className="relative h-[300px] rounded-lg overflow-hidden mb-4 border border-steel-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2075.8412406788384!2d6.5466036999999995!3d58.648652600000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x463993ef25cc9de1%3A0xbb33232d98e04922!2sABR%20Bj%C3%B8rnestad!5e0!3m2!1sno!2sno!4v1750070620747!5m2!1sno!2sno"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Kart til ABR Bjørnestad"
                ></iframe>
              </div>
              <p className="text-slate-700"></p>
            </div>
          </div>
        </div>
      </section>

      {/* Innsøking og henvendelser */}
      <section className="py-16 px-4 md:px-8 bg-steel-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-10">Innsøking og henvendelser</h2>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div className="bg-white p-6 border-t-4 border-steel-500">
              <div className="flex items-center mb-4">
                <User className="h-6 w-6 text-steel-600 mr-3" />
                <h3 className="text-xl font-semibold">For kommuner og henvisende instanser</h3>
              </div>
              <p className="text-slate-700 mb-4">
                Vi tar imot henvisninger fra kommuner, NAV, fastleger og andre instanser. Ta kontakt med våre
                inntakskoordinatorer for å diskutere muligheter og tilbud.
              </p>
              <p className="text-slate-700 mb-4">
                <strong>Ventetider:</strong> Vi har som regel ledig kapasitet og kan ta imot nye beboere på kort varsel.
              </p>
              <p className="text-slate-700">
                <strong>Dokumentasjon:</strong> Ved henvisning trenger vi relevant informasjon om brukerens behov,
                medisinsk historie og eventuelle spesielle hensyn.
              </p>
            </div>

            <div className="bg-white p-6 border-t-4 border-steel-500">
              <div className="flex items-center mb-4">
                <User className="h-6 w-6 text-steel-600 mr-3" />
                <h3 className="text-xl font-semibold">For privatpersoner</h3>
              </div>
              <p className="text-slate-700 mb-4">
                Hvis du eller en av dine nærmeste trenger hjelp, kan du ta direkte kontakt med oss for en uforpliktende
                samtale. Vi kan veilede deg om hvordan du går frem for å søke opphold hos oss.
              </p>
              <p className="text-slate-700 mb-4">
                Opphold ved Bjørnestad dekkes normalt av kommunen, og vi kan hjelpe deg med å komme i kontakt med riktig
                instans i din kommune.
              </p>
              <p className="text-slate-700">
                Ring gjerne vår daglige leder eller en av våre inntakskoordinatorer for en fortrolig samtale.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
