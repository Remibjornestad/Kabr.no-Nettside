// Sentral SEO-konfigurasjon for hele nettsiden
export const siteConfig = {
  name: "Karmsund ABR - Bjørnestad",
  description:
    "Et helhetlig omsorgstilbud for mennesker med rus og psykiske helseutfordringer i trygge omgivelser på Tonstad, Sirdal.",
  url: "https://www.kabr.no",
  ogImage: "https://www.kabr.no/og-image.jpg",
  links: {
    facebook: "https://www.facebook.com/abrbjornestad",
  },
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
    "rusavhengighet",
    "rehabilitering",
    "miljøterapi",
  ],
  author: "Karmsund ABR",
  creator: "Karmsund ABR",
  publisher: "Karmsund ABR",
  locale: "nb_NO",
  type: "website",
}

// Organisasjonsdata for strukturert data
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.kabr.no/#organization",
  name: "Karmsund ABR - avdeling Bjørnestad",
  alternateName: "Bjørnestad",
  url: "https://www.kabr.no",
  logo: {
    "@type": "ImageObject",
    url: "https://www.kabr.no/karmsund-abr-logo.png",
    width: 200,
    height: 200,
  },
  image: "https://www.kabr.no/og-image.jpg",
  description: siteConfig.description,
  foundingDate: "1991",
  legalName: "Karmsund ABR",
  organizationIdentifier: "961 664 837",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Sirdalsveien 2444",
    addressLocality: "Tonstad",
    addressRegion: "Agder",
    postalCode: "4440",
    addressCountry: "NO",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+47-924-21-020",
      contactType: "customer service",
      email: "post@kabr.no",
      availableLanguage: "Norwegian",
    },
    {
      "@type": "ContactPoint",
      telephone: "+47-971-48-305",
      contactType: "administration",
      email: "gunn.marie@kabr.no",
      availableLanguage: "Norwegian",
    },
  ],
  sameAs: ["https://www.facebook.com/abrbjornestad"],
  areaServed: {
    "@type": "Country",
    name: "Norway",
  },
  serviceType: ["Rusrehabilitering", "Psykisk helse", "Omsorgstilbud", "LAR-oppfølging", "Miljøterapi"],
}

// Website schema
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.kabr.no/#website",
  url: "https://www.kabr.no",
  name: siteConfig.name,
  description: siteConfig.description,
  publisher: {
    "@id": "https://www.kabr.no/#organization",
  },
  inLanguage: "nb-NO",
}
