export interface HeroSection {
  title: string
  subtitle: string
  description: string
  backgroundImage: string
  primaryButtonText: string
  secondaryButtonText: string
}

export interface TextSection {
  title: string
  content: string
}

export interface ImageGalleryItem {
  id: string
  src: string
  alt: string
}

export interface PersonInfo {
  id: string
  name: string
  title: string
  phone: string
  email: string
  image: string
}

export interface RehabilitationSection {
  id: string
  title: string
  content: string
  image: string
  imageAlt: string
}

export interface CMSData {
  // Hjemside
  homeHero: HeroSection
  aboutKarmsund: TextSection
  ourOffer: TextSection
  ourValues: TextSection
  imageGallery: ImageGalleryItem[]
  interestedCTA: TextSection

  // Vårt tilbud side
  offerHero: HeroSection
  whatWeOffer: TextSection
  rehabilitationSections: RehabilitationSection[]
  howWeWork: {
    title: string
    sections: TextSection[]
  }
  facilities: {
    title: string
    content: string
    image: string
    imageAlt: string
    features: string[]
  }
  referralAndAdmission: TextSection

  // Om oss side
  aboutHero: HeroSection
  aboutKarmsundText: TextSection
  valuesAndMethods: {
    title: string
    sections: TextSection[]
  }
  careAndCommunity: TextSection
  personalGroup: {
    title: string
    description: string
    people: PersonInfo[]
  }
  interdisciplinaryTeam: TextSection

  // Kontakt side
  contactHero: HeroSection
  contactPeople: PersonInfo[]
  generalContactInfo: {
    address: string
    openingHours: string
    visitingHours: string
    organizationNumber: string
    foundedYear: string
  }
  applicationAndInquiries: {
    title: string
    sections: TextSection[]
  }
}
