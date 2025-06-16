import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { generateSEO, generateServiceSchema } from "@/lib/seo-utils"
import StructuredData from "@/components/seo/structured-data"
import Breadcrumbs from "@/components/seo/breadcrumbs"
import type { Metadata } from "next"
import ImageGallery from "@/components/image-gallery"

export const metadata: Metadata = generateSEO({
  title: "Vårt tilbud - Rusrehabilitering og psykisk helse",
  description:
    "Karmsund ABR avdeling Bjørnestad tilbyr et helhetlig omsorgstilbud for mennesker med rus og psykiske helseutfordringer, inkludert LAR og ADHD-relaterte utfordringer.",
  keywords: [
    "rusrehabilitering",
    "psykisk helse",
    "LAR",
    "ADHD",
    "omsorgstilbud",
    "miljøterapi",
    "recoveryorientert",
    "tverrfaglig",
  ],
  url: "https://www.kabr.no/vart-tilbud",
})

const breadcrumbItems = [{ name: "Vårt tilbud", url: "/vart-tilbud", current: true }]

export default function VartTilbud() {
  const serviceSchema = generateServiceSchema()

  return (
    <div className="flex flex-col w-full">
      <StructuredData data={serviceSchema} />
      <Breadcrumbs items={breadcrumbItems} />

      {/* Hero Section */}
      <section className="relative w-full h-[40vh] min-h-[300px]">
        <Image
          src="/images/hero/mountain-carts.webp"
          alt="Utendørsaktiviteter ved Bjørnestad - fjellkjøring"
          fill
          priority
          className="object-cover brightness-[0.85]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-md">Vårt tilbud</h1>
            <p className="text-lg md:text-xl text-white max-w-3xl mx-auto drop-shadow-md">
              Et helhetlig rehabiliteringstilbud for deg som lever med rus og psykiske helseutfordringer
            </p>
          </div>
        </div>
      </section>

      {/* Innledning */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-800 mb-6">Hva vi tilbyr</h2>
          <p className="text-lg text-slate-700 mb-8">
            På Karmsund ABR - avdeling Bjørnestad kan du få tilbud om kort- eller langtidsopphold hvis du lever med rus
            og psykiske helseutfordringer (ROP). Vårt tilbud omfatter også støtte til deg som har behov for oppfølging
            knyttet til opiatavhengighet (LAR), benzodiazepin-avhengighet og ADHD-relaterte utfordringer. Vi tar også
            imot personer på §12-soning via kriminalomsorgen.
          </p>
        </div>
      </section>

      {/* Rehabiliteringstilbud */}
      <section className="py-16 px-4 md:px-8 bg-steel-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-800 mb-10">Vårt rehabiliteringstilbud</h2>

          <div className="space-y-12">
            <article className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Rusmestring og psykisk helse</h3>
                <p className="text-slate-700 mb-4">
                  Vi har egen turnuslege som følger opp din fysiske og psykiske helse i samarbeid med vårt helsekontor.
                  Du får veiledning og støtte tilpasset dine behov, og vi hjelper deg med videre oppfølging utenfor
                  institusjonen ved behov. Vi tilbyr også akupunktur til de som ønsker dette.
                </p>
              </div>
              <div className="relative h-[300px] rounded-lg overflow-hidden shadow-md">
                <Image
                  src="/images/services/mindfulness-yoga.webp"
                  alt="Mindfulness og mental helse - yoga ved havet"
                  fill
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            </article>

            <article className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1 relative h-[300px] rounded-lg overflow-hidden shadow-md">
                <Image
                  src="/images/services/gym-equipment.webp"
                  alt="Treningsrom med moderne utstyr"
                  fill
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <div className="order-1 md:order-2">
                <h3 className="text-2xl font-semibold mb-4">Fysisk aktivitet og friluft</h3>
                <p className="text-slate-700 mb-4">
                  Fysisk aktivitet er viktig for både kropp og sinn. På Bjørnestad tilbyr vi fellestrening, gåturer,
                  klatring, svømming, fjellturer og eget treningsrom til disposisjon. Om vinteren har vi langrennsløyper
                  og slalombakke like i nærheten.
                </p>
              </div>
            </article>

            <article className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Arbeidstrening og ADL</h3>
                <p className="text-slate-700 mb-4">
                  Vi tilbyr arbeidstrening og praktiske aktiviteter som gir struktur og mestring i hverdagen. Du får
                  delta i meningsfulle oppgaver som snekring og andre prosjekter, med faste dager satt av til praktisk
                  arbeid og ferdighetsutvikling. Alle beboere får ukentlige arbeidsoppgaver som rullerer fast for best
                  mulig variasjon.
                </p>
              </div>
              <div className="relative h-[300px] rounded-lg overflow-hidden shadow-md">
                <Image
                  src="/images/services/woodworking.webp"
                  alt="Snekring og håndverk - trekiste"
                  fill
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            </article>

            <article className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1 relative h-[300px] rounded-lg overflow-hidden shadow-md">
                <Image
                  src="/images/services/buffet-food.webp"
                  alt="Buffetbord med variert og sunn mat"
                  fill
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <div className="order-1 md:order-2">
                <h3 className="text-2xl font-semibold mb-4">Måltider og kosthold</h3>
                <p className="text-slate-700 mb-4">
                  På Bjørnestad får du sunne og varierte måltider laget av vår egen kokk. Vi serverer frokost kl. 09.00
                  med morgenmøte, lunsj kl. 12.00 og middag kl. 15.30. I helgene koser vi oss gjerne med favoritter som
                  taco og pizza.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Fasiliteter */}
      <section className="py-16 px-4 md:px-8 bg-steel-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-800 mb-10">Fasiliteter</h2>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-slate-700 mb-4">På Bjørnestad tilbyr vi moderne og komfortable fasiliteter:</p>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start">
                  <span className="text-steel-600 mr-2">•</span>
                  <span>
                    <strong>Nybygg:</strong> 10 egne rom, felles stue/kjøkken, aktivitetsrom, billiard, bordtennis og
                    vaktrom.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-steel-600 mr-2">•</span>
                  <span>
                    <strong>Gamle bygg:</strong> 8 egne rom, felles stue, toaletter/dusj, matsal og vaktrom.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-steel-600 mr-2">•</span>
                  <span>
                    <strong>Treningsrom:</strong> Moderne treningsrom med utstyr for både styrke- og kondisjonstrening.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-steel-600 mr-2">•</span>
                  <span>
                    <strong>Hytter:</strong> Vi har også 3 egne hytter som kan benyttes.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-steel-600 mr-2">•</span>
                  <span>
                    <strong>Fellesområder:</strong> Koselige oppholdsrom, TV-stue og uteområder for sosialt samvær.
                  </span>
                </li>
              </ul>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-md">
              <ImageGallery />
            </div>
          </div>
        </div>
      </section>

      {/* Hvordan vi jobber */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-800 mb-10">Hvordan vi jobber</h2>

          <p className="text-lg text-slate-700 mb-8">
            Vi har 3 vaktlag med 3 personer som rullerer hver 14 dag (medleverturnusr). Det betyr at du alltid har en
            fast kontaktperson gjennom oppholdet ditt. I tillegg har vi en administrasjon bestående av daglig leder og
            annen administrativt personell.
          </p>

          <div className="bg-steel-100 p-8 rounded-lg mb-12">
            <h3 className="text-2xl font-semibold text-slate-800 mb-6">Fast ukeplan</h3>
            <p className="text-slate-700 mb-4">
              Vi har fast ukeplan på avdelingen med oppsatte tider på morgenmøte/frokost, lunch, handleturer hver
              tirsdag, torsdag og lørdager, middag og aktiviteter. Faste medisintider gjennom dagen. Denne henges opp i
              fellesareal ved vaktrom.
            </p>
            <p className="text-slate-700">
              Denne strukturen gir forutsigbarhet og trygghet i hverdagen, samtidig som den hjelper med å etablere gode
              rutiner.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-slate-800 mb-4">Individuelle planer og mål</h3>
              <p className="text-slate-700">
                Sammen med deg setter vi opp målsettinger og tiltak for oppholdet ditt, basert på henvisende instans
                sitt vedtak. Planen tar utgangspunkt i dine aktuelle behov og utfordringer. Tiltakene rettes mot ulike
                områder i livet ditt for å gi en helhetlig støtte.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-slate-800 mb-4">Brukermedvirkning</h3>
              <p className="text-slate-700">
                Vi tar utgangspunkt i din livssituasjon, dine behov, ressurser og målsettinger. Din medvirkning og en
                tydelig tiltaksplan er sentralt i arbeidet med ADL-ferdigheter, aktiviteter, arbeidstrening og
                nettverksbygging.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Utdanningsmuligheter */}
      <section className="py-16 px-4 md:px-8 bg-steel-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-800 mb-10">Utdanningsmuligheter</h2>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-slate-800 mb-6">Samarbeid med Hauge videregående skole</h3>
            <p className="text-slate-700 mb-4">
              Stiftelsen har samarbeidet med Hauge videregående skole i Haugesund området i mange år. Noen av våre
              beboere har søkt seg inn der og fått tilrettelagt skole og videreutdanning. Skolen tar inn personer som
              trenger tilrettelagt opplæring og gir muligheter for å fullføre videregående utdanning.
            </p>
            <p className="text-slate-700 mb-6">
              Dette samarbeidet gir våre beboere mulighet til å bygge videre på sin utdanning og skape et godt grunnlag
              for fremtiden. Utdanning kan være en viktig del av rehabiliteringsprosessen og bidra til økt selvtillit og
              nye karrieremuligheter.
            </p>
            <Button asChild className="bg-steel-500 hover:bg-steel-600 text-white">
              <Link
                href="https://hauge-vgs.no/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                Besøk Hauge videregående skole
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Henvisning og inntak */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-800 mb-10">Henvisning og inntak</h2>

          <div className="bg-steel-100 p-8 rounded-lg mb-8">
            <h3 className="text-xl font-semibold mb-4">Hvem kan søke?</h3>
            <p className="text-slate-700 mb-4">
              Vårt tilbud er tilpasset deg som lever med rusavhengighet, psykiske helseutfordringer eller som har behov
              for oppfølging knyttet til opiat- og benzodiazepinavhengighet, samt ADHD-relaterte utfordringer. Vi tilbyr
              et trygt miljø for alle som ønsker å endre sin livssituasjon.
            </p>
            <p className="text-slate-700 mb-4">
              Vi har lang erfaring med å støtte personer på §12-soning via kriminalomsorgen, og vi tilpasser tilbudet
              etter dine individuelle behov. Vårt tilbud passer for deg som ønsker en stabil og strukturert hverdag med
              fokus på både fysisk og psykisk helse.
            </p>
            <p className="text-slate-700 mb-4">
              <strong>Ventetider:</strong> Vi har som regel ledig kapasitet. Ta kontakt med oss for en uforpliktende
              samtale!
            </p>
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
