import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Personvernerklæring - Hvordan Karmsund ABR Behandler Dine Data",
  description:
    "Les om hvordan Karmsund ABR behandler personopplysninger på våre nettsider. GDPR-kompatibel personvernerklæring med informasjon om cookies og dine rettigheter.",
  keywords: "personvern Karmsund ABR, GDPR, personopplysninger, cookies policy, databehandling, personvernrettigheter",
  openGraph: {
    title: "Personvernerklæring - Karmsund ABR Bjørnestad",
    description: "Informasjon om hvordan vi behandler personopplysninger i henhold til GDPR",
    url: "https://www.kabr.no/personvern",
  },
}

export default function Personvern() {
  return (
    <div className="flex flex-col w-full">
      {/* Header Section */}
      <section className="bg-steel-100 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-slate-800">Personvernerklæring</h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">Innledning</h2>
            <p className="mb-6">
              Karmsund ABR - avdeling Bjørnestad er opptatt av å beskytte personvernet til alle som besøker vår
              nettside. Denne personvernerklæringen beskriver hvilken informasjon vi samler inn og hvordan vi behandler
              den.
            </p>

            <h2 className="text-2xl font-semibold text-slate-800 mb-4">Behandlingsansvarlig</h2>
            <p className="mb-6">
              Karmsund ABR er behandlingsansvarlig for personopplysninger som samles inn via våre nettsider. For
              spørsmål om personvern, kontakt oss på <span className="font-medium">gunn.marie@kabr.no</span>.
            </p>

            <h2 className="text-2xl font-semibold text-slate-800 mb-4">Hvilke opplysninger vi samler inn</h2>
            <p className="mb-6">Vi samler inn begrenset med informasjon om besøkende på våre nettsider:</p>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-2">
                <strong>Anonymisert statistikk:</strong> Vi benytter anonymisert statistikk for å forstå hvordan
                besøkende bruker nettstedet. Dette inkluderer informasjon som hvilke sider som besøkes og hvor lenge
                besøkende er på nettstedet.
              </li>
              <li className="mb-2">
                <strong>Cookies/informasjonskapsler:</strong> Vi bruker informasjonskapsler for å forbedre
                brukeropplevelsen på nettstedet. Disse lagrer ingen personidentifiserbare opplysninger.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold text-slate-800 mb-4">Formål med behandlingen</h2>
            <p className="mb-6">
              Vi bruker informasjonen utelukkende for å forbedre nettstedet vårt og for å gi en bedre brukeropplevelse.
            </p>

            <h2 className="text-2xl font-semibold text-slate-800 mb-4">Deling av informasjon</h2>
            <p className="mb-6">
              Vi deler ikke personopplysninger med tredjeparter, med mindre vi er pålagt å gjøre det i henhold til lov.
            </p>

            <h2 className="text-2xl font-semibold text-slate-800 mb-4">Lagring av informasjon</h2>
            <p className="mb-6">
              Den begrensede informasjonen vi samler lagres kun så lenge det er nødvendig for formålet, eller i den
              utstrekning det er påkrevd av lovgivningen.
            </p>

            <h2 className="text-2xl font-semibold text-slate-800 mb-4">Dine rettigheter</h2>
            <p className="mb-6">I henhold til personvernlovgivningen har du rett til å:</p>
            <ul className="list-disc pl-6 mb-6">
              <li className="mb-2">Be om innsyn i hvilke personopplysninger vi har om deg</li>
              <li className="mb-2">Be om retting eller sletting av dine personopplysninger</li>
              <li className="mb-2">Protestere mot visse former for behandling av personopplysninger</li>
              <li className="mb-2">Be om begrensninger i behandlingen av dine personopplysninger</li>
            </ul>

            <h2 className="text-2xl font-semibold text-slate-800 mb-4">Endringer i personvernerklæringen</h2>
            <p className="mb-6">
              Vi forbeholder oss retten til å endre denne personvernerklæringen. Eventuelle endringer vil bli publisert
              på denne siden. Større endringer vil bli kommunisert direkte til våre brukere.
            </p>

            <div className="border-t border-gray-200 pt-6 mt-6">
              <p className="text-sm text-gray-600">Sist oppdatert: Mai 2024</p>
              <p className="text-sm text-gray-600 mt-2">
                Har du spørsmål om vår personvernerklæring, vennligst{" "}
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
