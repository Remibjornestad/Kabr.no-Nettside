import type { Metadata } from "next"
import { siteConfig } from "./seo-config"

interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: "website" | "article"
  publishedTime?: string
  modifiedTime?: string
  section?: string
  noIndex?: boolean
}

export function generateSEO({
  title,
  description = siteConfig.description,
  keywords = [],
  image = siteConfig.ogImage,
  url = siteConfig.url,
  type = "website",
  publishedTime,
  modifiedTime,
  section,
  noIndex = false,
}: SEOProps = {}): Metadata {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name
  const allKeywords = [...siteConfig.keywords, ...keywords].join(", ")

  return {
    title: fullTitle,
    description,
    keywords: allKeywords,
    authors: [{ name: siteConfig.author }],
    creator: siteConfig.creator,
    publisher: siteConfig.publisher,
    robots: noIndex ? "noindex,nofollow" : "index,follow",
    openGraph: {
      type,
      locale: siteConfig.locale,
      url,
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title || siteConfig.name,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(section && { section }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
  }
}

// Generer breadcrumb schema
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

// Generer FAQ schema
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

// Generer service schema
export function generateServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    "@id": "https://www.kabr.no/#service",
    name: "Karmsund ABR - avdeling Bjørnestad",
    description: "Rehabiliteringstilbud for rus og psykiske helseutfordringer",
    url: "https://www.kabr.no/vart-tilbud",
    medicalSpecialty: ["Addiction Medicine", "Psychiatry", "Mental Health"],
    availableService: [
      {
        "@type": "MedicalTherapy",
        name: "Rusrehabilitering",
        description: "Helhetlig behandling av rusavhengighet",
      },
      {
        "@type": "MedicalTherapy",
        name: "LAR-oppfølging",
        description: "Legemiddelassistert rehabilitering",
      },
      {
        "@type": "MedicalTherapy",
        name: "Miljøterapi",
        description: "Tverrfaglig miljøterapeutisk tilnærming",
      },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Sirdalsveien 2444",
      addressLocality: "Tonstad",
      postalCode: "4440",
      addressCountry: "NO",
    },
  }
}
