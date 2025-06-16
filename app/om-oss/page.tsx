import Link from "next/link"
import { Button } from "@/components/ui/button"
import OptimizedImage from "@/components/optimized-image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Om Karmsund ABR - 30+ År med Rusrehabilitering i Sirdal",
  description:
    "Siden 1991 har vi hjulpet mennesker med rusavhengighet. Møt vårt erfarne team av sykepleiere, sosionomer og miljøterapeuter på Bjørnestad, Tonstad.",
  keywords:
    "Karmsund ABR historie, erfaring rusrehabilitering, tverrfaglig team, Bjørnestad personale, Gunn Marie Matnisdal, stiftelse 1991",
  openGraph: {
    title: "Om Karmsund ABR - 30+ År med Rusrehabilitering i Sirdal",
    description: "Siden 1991 har vi hjulpet mennesker med rusavhengighet. Møt vårt erfarne team på Bjørnestad.",
    url: "https://www.kabr.no/om-oss",
  },
}

export default function OmOss() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full h-[40vh] min-h-[300px]">
        <OptimizedImage
          src="https://i.ibb.co/mVkbGckH/487481052-1133344698805555-7125103448861760246-n.jpg"
          alt="Teamet ved Bjørnestad"
          fill
          priority
          className="object-cover brightness-[0.85]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-md">Om oss</h1>
            <p className="text-lg md:text-xl text-white max-w-3xl mx-auto drop-shadow-md">
              Bli kjent med Karmsund ABR, vår historie, våre verdier og vårt dedikerte team
            </p>
          </div>
        </div>
      </section>

      {/* Om Karmsund ABR */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-6">Om Karmsund ABR</h2>
              <p className="text-lg text-slate-700 mb-4">
                Karmsund ABR er en privat stiftelse med ideelt formål. Siden 1991 har vi gitt mennesker med
                rusavhengighet et trygt og støttende tilbud, først som både TSB-enhet og egne omsorgsinstitusjoner.
                TSB-avdelingen ble avsluttet etter anbudskonkurranser vi ikke nådde opp til i 2021.
              </p>
              <p className="text-lg text-slate-700 mb-4">
                Bjørnestad ligger nå på grensen mellom Agder og Rogaland, i naturskjønne omgivelser på Sirdal, Tonstad.
              </p>
              <p className="text-lg text-slate-700">
                Hos oss møter du et team av dedikerte fagpersoner med lang erfaring innen rus og psykisk helse. Vi
                tilbyr omsorgstiltak og tilrettelagte plasser fortløpende etter avtale med kommunene.
              </p>
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
          <h2 className="text-3xl font-bold text-slate-800 mb-10">Verdier og metode</h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-6 border-t-4 border-steel-500">
              <h3 className="text-xl font-semibold mb-4">Vårt menneskesyn</h3>
              <p className="text-slate-700 mb-4">
                Vår tilnærming er forankret i Karmsund ABR sitt livssynsnøytrale menneskesyn, med fokus på respekt,
                menneskeverd og empati.
              </p>
              <p className="text-slate-700">
                Vi forstår at årsakene til rusavhengighet er komplekse, omfattende og sammensatte. Noen har opplevd en
                problematisk oppvekst eller vanskelige familieforhold som kan være direkte eller medvirkende årsak til
                rusavhengighet. Men vi vet også at dette langt fra er hele sannheten i dagens samfunn. Rusbruk og
                avhengighet kan ramme alle, uavhengig av bakgrunn.
              </p>
            </div>

            <div className="bg-white p-6 border-t-4 border-steel-500">
              <h3 className="text-xl font-semibold mb-4">Vår tilnærming</h3>
              <p className="text-slate-700 mb-4">
                Vår metode bygger blant annet på prinsipper fra Motiverende samtale og Endringsfokusert rådgivning. Vi
                legger stor vekt på å bygge gode relasjoner, styrke din motivasjon, og fokusere på løsnings- og
                endringsarbeid – alt med dyp respekt for deg som individ.
              </p>
              <p className="text-slate-700">
                Vi tar utgangspunkt i din unike livssituasjon, dine behov, ressurser og målsettinger. På Bjørnestad
                vektlegger vi god omsorg og nestekjærlighet. Tilbudet vårt er fundamentert i recoveryorientert metodikk
                og drives med tverrfaglig miljøterapeutisk tilnærming.
              </p>
            </div>
          </div>

          <div className="bg-navy-500 text-white p-8 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Omsorg, fellesskap og stabilitet</h3>
            <p className="mb-4">
              Vårt viktigste verktøy er å gi omsorg på en god måte. Hos oss får alle samme tillit og mulighet til å
              skape nye relasjoner og oppleve samhold. Bjørnestad skal være et sted hvor du gjennom fellesskap kan se
              nye muligheter og finne motivasjon for personlig utvikling.
            </p>
            <p>
              Her får du mulighet til ro, tid til å bygge deg opp både psykisk og fysisk. Vårt mål er at du gradvis skal
              ta tilbake kontrollen i ditt eget liv.
            </p>
          </div>
        </div>
      </section>

      {/* Vår personalgruppe */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-800 mb-10">Vår personalgruppe</h2>

          <p className="text-lg text-slate-700 mb-12">
            På Bjørnestad møter du en tverrfaglig sammensatt personalgruppe. Sammen med øvrig personale danner vi et
            team som samarbeider rundt deg og dine behov. Vi verdsetter også medarbeidere med verdifull egenerfaring som
            kan gi en unik forståelse og innsikt.
          </p>

          <div className="grid md:grid-cols-2 gap-12 max-w-3xl mx-auto mb-12">
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
              <p className="text-steel-600 mb-4">Daglig leder</p>
              <div className="space-y-2">
                <p className="text-slate-700">Tlf: 971 48 305</p>
                <p className="text-slate-700">E-post: gunn.marie@kabr.no</p>
              </div>
            </div>

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
              <p className="text-steel-600 mb-4"></p>
              <div className="space-y-2">
                <p className="text-slate-700">Tlf: 924 21 020</p>
                <p className="text-slate-700">E-post: post@kabr.no</p>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-steel-500 pl-6">
            <h3 className="text-2xl font-semibold text-slate-800 mb-4">Tverrfaglig team</h3>
            <p className="text-slate-700 mb-4">Vårt team består av:</p>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-steel-500 rounded-full mr-3"></span>
                Sykepleiere
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-steel-500 rounded-full mr-3"></span>
                Sosionomer
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-steel-500 rounded-full mr-3"></span>
                Miljøterapeuter
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-steel-500 rounded-full mr-3"></span>
                Personale med egenerfaring
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-steel-500 rounded-full mr-3"></span>
                Lege i turnus
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-steel-500 rounded-full mr-3"></span>
                Kokk
              </li>
            </ul>
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
