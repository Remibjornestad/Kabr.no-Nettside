import ClientPage from "./ClientPage"
import { generateSEO } from "@/lib/seo-utils"
import type { Metadata } from "next"

export const metadata: Metadata = generateSEO({
  title: "Karmsund ABR - Bjørnestad | Omsorgstilbud for rus og psykisk helse",
  description:
    "Karmsund ABR avdeling Bjørnestad tilbyr et helhetlig omsorgstilbud for mennesker med rus og psykiske helseutfordringer i trygge omgivelser på Tonstad, Sirdal.",
  keywords: [
    "rusrehabilitering",
    "psykisk helse",
    "omsorgstilbud",
    "Bjørnestad",
    "Karmsund ABR",
    "Tonstad",
    "Sirdal",
    "ROP",
    "LAR",
    "miljøterapi",
    "recoveryorientert",
  ],
  url: "https://www.kabr.no",
})

export default function Home() {
  return <ClientPage />
}
