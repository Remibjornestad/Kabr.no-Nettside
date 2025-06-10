import Link from "next/link"
import Image from "next/image"
import { MapPin, Phone, Mail } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-steel-500 text-white">
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/karmsund-abr-logo.png"
                alt="Karmsund ABR logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-tight">Karmsund ABR</span>
                <span className="text-xs leading-tight">avdeling Bjørnestad</span>
              </div>
            </div>
            <p className="mb-4">Et helhetlig omsorgstilbud for mennesker med rus og psykiske helseutfordringer.</p>
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-5 w-5 text-sand-300" />
              <span>Sirdalsveien 2241, 4440 Tonstad</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Phone className="h-5 w-5 text-sand-300" />
              <span>924 21 020</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-sand-300" />
              <span>Bjørnestad@kabr.no</span>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Lenker</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-sand-300 transition-colors">
                  Hjem
                </Link>
              </li>
              <li>
                <Link href="/vart-tilbud" className="hover:text-sand-300 transition-colors">
                  Vårt tilbud
                </Link>
              </li>
              <li>
                <Link href="/om-oss" className="hover:text-sand-300 transition-colors">
                  Om oss
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="hover:text-sand-300 transition-colors">
                  Kontakt oss
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Om Bjørnestad</h3>
            <p className="mb-4">
              Bjørnestad vektlegger god omsorg og nestekjærlighet. Tilbudet er fundamentert i recoveryorientert metodikk
              og drives med tverrfaglig miljøterapautisk tilnærming.
            </p>
            <p>Målet er at den rusavhengige tar tilbake kontrollen i eget liv.</p>
          </div>
        </div>

        <div className="border-t border-steel-400 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {currentYear} Karmsund ABR. Alle rettigheter forbeholdt.</p>
          <div className="mt-4 md:mt-0">
            <Link href="/personvern" className="hover:text-sand-300 transition-colors">
              Personvern
            </Link>
            <span className="mx-2">|</span>
            <Link href="/cookies" className="hover:text-sand-300 transition-colors">
              Cookies
            </Link>
            <span className="mx-2">|</span>
            <Link
              href="/cms"
              className="text-steel-400 hover:text-sand-300 transition-colors text-xs"
              aria-label="Administrator"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
