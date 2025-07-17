import ClientPage from "./ClientPage"
import { generateSEO } from "@/lib/seo-utils"
import type { Metadata } from "next"

export const metadata: Metadata = generateSEO({
  title: "Karmsund ABR - Rusrehabilitering og omsorg",
  description:
    "Profesjonell rusrehabilitering og psykisk helse på Bjørnestad, Tonstad. LAR-oppfølging, miljøterapi og individuell omsorg siden 1991.",
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
