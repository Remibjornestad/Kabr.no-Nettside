import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ScrollToTop from "@/components/scroll-to-top"
import StructuredData from "@/components/seo/structured-data"
import { organizationSchema, websiteSchema } from "@/lib/seo-config"
import { generateSEO } from "@/lib/seo-utils"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

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
  ],
  url: "https://www.kabr.no",
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#64748b" },
    { media: "(prefers-color-scheme: dark)", color: "#1e293b" },
  ],
}

// Kritiske bilder som skal forhåndslastes
const preloadImages = ["/images/hero/main-building.webp", "/karmsund-abr-logo.png", "/og-image.jpg"]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="nb" suppressHydrationWarning>
      <head>
        {/* Google Search Console Verification - REPLACE WITH YOUR ACTUAL CODE */}
        <meta name="google-site-verification" content="REPLACE_WITH_YOUR_VERIFICATION_CODE" />

        {/* DNS Prefetch for eksterne ressurser */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />

        {/* Preconnect for kritiske ressurser */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Forhåndslast kritiske bilder */}
        {preloadImages.map((src, index) => (
          <link key={index} rel="preload" href={src} as="image" type="image/webp" />
        ))}

        {/* Favicon og ikoner */}
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />

        {/* Manifest for PWA */}
        <link rel="manifest" href="/manifest.json" />

        {/* Strukturerte data */}
        <StructuredData data={[organizationSchema, websiteSchema]} />

        {/* Geo-tagging */}
        <meta name="geo.region" content="NO-42" />
        <meta name="geo.placename" content="Tonstad, Sirdal" />
        <meta name="geo.position" content="58.6833;6.6833" />
        <meta name="ICBM" content="58.6833, 6.6833" />

        {/* Språk og lokalisering */}
        <meta httpEquiv="content-language" content="nb-NO" />
        <link rel="alternate" hrefLang="nb" href="https://www.kabr.no" />
        <link rel="alternate" hrefLang="x-default" href="https://www.kabr.no" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <ScrollToTop />
            <Header />
            <main className="flex-1" role="main">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
