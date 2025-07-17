import Link from "next/link"
import Image from "next/image"
import { MapPin, Phone, Mail, Facebook } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-500 text-white">
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Left Column - Logo and Contact Info */}
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
                <span className="text-sm leading-tight">avdeling Bjørnestad</span>
              </div>
            </div>
            <p className="mb-6 text-sm">
              Et helhetlig omsorgstilbud for mennesker med rus og psykiske helseutfordringer.
            </p>

            <div className="space-y-3">
              <div>
                <p className="font-semibold mb-1">Besøksadresse:</p>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">Sirdalsveien 2741, 4440 Tonstad</span>
                </div>
              </div>

              <div>
                <p className="font-semibold mb-1">Post til oss:</p>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <div>Avd Bjørnestad</div>
                    <div>Postboks 44, 4441 Tonstad</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span className="text-sm">924 21 020</span>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span className="text-sm">Post@kabr.no</span>
              </div>

              <Link
                href="https://www.facebook.com/abrbjornestad"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-gray-300 transition-colors"
              >
                <Facebook className="h-4 w-4" />
                <span className="text-sm">Følg oss på Facebook</span>
              </Link>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-400">
              <p className="text-sm">
                <span className="font-semibold">Organisasjonsnummer:</span> 961 664 837
              </p>
            </div>
          </div>

          {/* Middle Column - Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Lenker</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm hover:text-gray-300 transition-colors">
                  Hjem
                </Link>
              </li>
              <li>
                <Link href="/vart-tilbud" className="text-sm hover:text-gray-300 transition-colors">
                  Vårt tilbud
                </Link>
              </li>
              <li>
                <Link href="/om-oss" className="text-sm hover:text-gray-300 transition-colors">
                  Om oss
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-sm hover:text-gray-300 transition-colors">
                  Kontakt oss
                </Link>
              </li>
            </ul>
          </div>

          {/* Right Column - About Bjørnestad */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Om Bjørnestad</h3>
            <div className="space-y-4 text-sm">
              <p>
                Bjørnestad vektlegger god omsorg og nestekjærlighet. Tilbudet er fundamentert i recoveryorientert
                metodikk og drives med tverrfaglig miljøterapautisk tilnærming.
              </p>
              <p>Målet er at den rusavhengige tar tilbake kontrollen i eget liv.</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-400 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <p className="text-sm">&copy; {currentYear} Karmsund ABR. Alle rettigheter forbeholdt.</p>
            <p className="text-xs text-gray-300">
              Nettside levert av{" "}
              <Link
                href="https://webki.no"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors underline"
              >
                WebKI.no
              </Link>
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-1 text-sm">
            <Link href="/personvern" className="hover:text-gray-300 transition-colors">
              Personvern
            </Link>
            <span className="text-gray-400">|</span>
            <Link href="/cookies" className="hover:text-gray-300 transition-colors">
              Cookies
            </Link>
            <span className="text-gray-400">|</span>
            <span className="text-gray-400">Admin</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
