import Head from "next/head"

interface MetaTagsProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: string
  locale?: string
  siteName?: string
}

export default function MetaTags({
  title = "Karmsund ABR - Bjørnestad",
  description = "Et helhetlig omsorgstilbud for mennesker med rus og psykiske helseutfordringer",
  keywords = "rusrehabilitering, psykisk helse, omsorgstilbud",
  image = "https://www.kabr.no/og-image.jpg",
  url = "https://www.kabr.no",
  type = "website",
  locale = "nb_NO",
  siteName = "Karmsund ABR - Bjørnestad",
}: MetaTagsProps) {
  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Karmsund ABR" />
      <meta name="robots" content="index,follow" />
      <meta name="language" content="Norwegian" />
      <meta name="revisit-after" content="7 days" />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={locale} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Geo Tags */}
      <meta name="geo.region" content="NO-42" />
      <meta name="geo.placename" content="Tonstad, Sirdal" />
      <meta name="geo.position" content="58.6833;6.6833" />
      <meta name="ICBM" content="58.6833, 6.6833" />
    </Head>
  )
}
