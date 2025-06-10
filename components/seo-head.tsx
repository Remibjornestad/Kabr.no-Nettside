import Head from "next/head"

interface SEOProps {
  title: string
  description: string
  canonical?: string
  ogImage?: string
  ogType?: string
  keywords?: string
  noindex?: boolean
}

export default function SEOHead({
  title,
  description,
  canonical,
  ogImage = "https://i.ibb.co/dw6Zr26V/IMG-0005-2.jpg",
  ogType = "website",
  keywords,
  noindex = false,
}: SEOProps) {
  const fullTitle = `${title} | Karmsund ABR - Bjørnestad`
  const baseUrl = "https://www.kabr.no"
  const fullCanonical = canonical ? `${baseUrl}${canonical}` : baseUrl

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonical} />

      {/* Robots */}
      {noindex ? <meta name="robots" content="noindex, nofollow" /> : <meta name="robots" content="index, follow" />}

      {/* OpenGraph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Karmsund ABR - Bjørnestad" />
      <meta property="og:locale" content="nb_NO" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Additional SEO */}
      <meta name="author" content="Karmsund ABR" />
      <meta name="language" content="Norwegian" />
      <meta name="geo.region" content="NO-42" />
      <meta name="geo.placename" content="Tonstad, Sirdal" />
      <meta name="geo.position" content="58.6486526;6.5466037" />
      <meta name="ICBM" content="58.6486526, 6.5466037" />
    </Head>
  )
}
