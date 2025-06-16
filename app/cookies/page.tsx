import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cookie-policy - Informasjonskapsler på Karmsund ABR Nettside",
  description:
    "Informasjon om hvordan Karmsund ABR bruker cookies på våre nettsider. Lær om nødvendige, funksjonelle og statistikk-cookies, og hvordan du kan administrere dem.",
  keywords: "cookies Karmsund ABR, informasjonskapsler, cookie policy, nettside cookies, administrere cookies",
  openGraph: {
    title: "Cookie-policy - Karmsund ABR Bjørnestad",
    description: "Informasjon om hvordan vi bruker cookies på våre nettsider",
    url: "https://www.kabr.no/cookies",
  },
}

export default function Cookies() {
  return (
    <div className="flex flex-col w-full">
      {/* Header Section */}
      <section className="bg-steel-100 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-slate-800">Informasjon om cookies</h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">Hva er cookies?</h2>
            <p className="mb-6">
              Cookies (informasjonskapsler) er små tekstfiler som lagres på din enhet når du besøker et nettsted. De
              brukes for å huske innstillinger, forbedre brukeropplevelsen og gi grunnlag for statistikk.
            </p>

            <h2 className="text-2xl font-semibold text-slate-800 mb-4">Hvordan vi bruker cookies</h2>
            <p className="mb-6">På Karmsund ABR sine nettsider bruker vi cookies for følgende formål:</p>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-2">
                <strong>Nødvendige cookies:</strong> Disse er avgjørende for at nettstedet skal fungere korrekt og kan
                ikke deaktiveres.
              </li>
              <li className="mb-2">
                <strong>Funksjonelle cookies:</strong> Disse hjelper oss med å huske dine valg og preferanser for å gi
                deg en mer personlig opplevelse.
              </li>
              <li className="mb-2">
                <strong>Statistikk cookies:</strong> Vi samler anonymisert data om besøkende for å forstå hvordan
                nettstedet brukes og hvordan vi kan forbedre det.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold text-slate-800 mb-4">Administrering av cookies</h2>
            <p className="mb-6">
              De fleste nettlesere tillater deg å administrere cookies gjennom innstillingene. Du kan vanligvis:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-2">Se hvilke cookies som er lagret på din enhet</li>
              <li className="mb-2">Slette individuelle cookies eller alle cookies</li>
              <li className="mb-2">Blokkere cookies fra bestemte nettsteder eller alle nettsteder</li>
            </ul>
            <p className="mb-6">
              Vær oppmerksom på at blokkering av cookies kan påvirke funksjonaliteten på nettstedet.
            </p>

            <h2 className="text-2xl font-semibold text-slate-800 mb-4">Cookies vi bruker</h2>
            <p className="mb-6">Vi bruker et begrenset antall cookies på vår nettside. Disse inkluderer:</p>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-2">
                <strong>Sesjonscookies:</strong> Midlertidige cookies som slettes når du lukker nettleseren.
              </li>
              <li className="mb-2">
                <strong>Persistente cookies:</strong> Forblir på din enhet til de utløper eller til du sletter dem.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold text-slate-800 mb-4">Endringer i vår cookie-policy</h2>
            <p className="mb-6">
              Vi forbeholder oss retten til å endre denne cookie-policyen. Eventuelle endringer vil bli publisert på
              denne siden.
            </p>

            <div className="border-t border-gray-200 pt-6 mt-6">
              <p className="text-sm text-gray-600">Sist oppdatert: Mai 2024</p>
              <p className="text-sm text-gray-600 mt-2">
                Har du spørsmål om vår bruk av cookies, vennligst{" "}
                <Link href="/kontakt" className="text-steel-600 hover:underline">
                  kontakt oss
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
