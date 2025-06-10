import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ScrollToTop from "@/components/scroll-to-top"
import AuthProvider from "@/components/auth/auth-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Karmsund ABR - Bjørnestad | Omsorgstilbud for rus og psykisk helse",
  description:
    "Karmsund ABR avdeling Bjørnestad tilbyr et helhetlig omsorgstilbud for mennesker med rus og psykiske helseutfordringer i trygge omgivelser på Tonstad, Sirdal.",
  keywords: "rusrehabilitering, psykisk helse, omsorgstilbud, Bjørnestad, Karmsund ABR, Tonstad, Sirdal, ROP, LAR",
  authors: [{ name: "Karmsund ABR" }],
  creator: "Karmsund ABR",
  publisher: "Karmsund ABR",
  openGraph: {
    type: "website",
    locale: "nb_NO",
    url: "https://www.kabr.no/",
    title: "Karmsund ABR - Bjørnestad | Omsorgstilbud for rus og psykisk helse",
    description:
      "Et trygt og helhetlig omsorgstilbud for mennesker med rus og psykiske helseutfordringer i naturskjønne omgivelser på Sirdal, Tonstad.",
    siteName: "Karmsund ABR - Bjørnestad",
    images: [
      {
        url: "https://i.ibb.co/dw6Zr26V/IMG-0005-2.jpg",
        width: 1200,
        height: 630,
        alt: "Karmsund ABR - Bjørnestad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Karmsund ABR - Bjørnestad | Omsorgstilbud for rus og psykisk helse",
    description:
      "Et trygt og helhetlig omsorgstilbud for mennesker med rus og psykiske helseutfordringer i naturskjønne omgivelser på Sirdal, Tonstad.",
    images: ["https://i.ibb.co/dw6Zr26V/IMG-0005-2.jpg"],
  },
  alternates: {
    canonical: "https://www.kabr.no",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.dev'
}

// Disse bildene vil bli forhåndslastet
export const preloadImages = [
  "https://i.ibb.co/dw6Zr26V/IMG-0005-2.jpg",
  "https://i.ibb.co/8g5F0Qf8/488622915-1135529365253755-4122780821380544378-n.jpg",
  "/karmsund-abr-logo.png",
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="no" suppressHydrationWarning>
      <head>
        {/* Forhåndslast kritiske bilder */}
        {preloadImages.map((src, index) => (
          <link key={index} rel="preload" href={src} as="image" />
        ))}
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <div className="flex min-h-screen flex-col">
              <ScrollToTop />
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
