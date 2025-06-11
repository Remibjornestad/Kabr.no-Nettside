import { createClient } from "@/lib/supabase/client"
import { logActivity } from "@/lib/activity-logger"
import type { CMSData } from "@/types/cms"

// Check if Supabase environment variables are available
const hasSupabaseConfig = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

let supabase: any = null

if (hasSupabaseConfig) {
  supabase = createClient()
} else {
  console.warn("Supabase environment variables not configured. Using default data.")
}

export async function getCMSData(): Promise<CMSData> {
  // If Supabase is not configured, return default data immediately
  if (!hasSupabaseConfig || !supabase) {
    console.log("Using default CMS data (Supabase not configured)")
    return getDefaultCMSData()
  }

  try {
    // First, let's check if the table exists and has data
    const { data, error } = await supabase.from("cms_data").select("*").limit(1)

    if (error) {
      console.error("Error fetching CMS data:", error)
      return getDefaultCMSData()
    }

    // If we have data, determine the column structure
    if (data && data.length > 0) {
      const firstRow = data[0]

      // Check if we have a 'section' column or if all data is in a single row
      if ("section" in firstRow) {
        // Original approach - data is organized by sections
        const { data: sectionData, error: sectionError } = await supabase
          .from("cms_data")
          .select("section, data")
          .order("section")

        if (sectionError) {
          console.error("Error fetching CMS section data:", sectionError)
          return getDefaultCMSData()
        }

        if (!sectionData || sectionData.length === 0) {
          return getDefaultCMSData()
        }

        // Combine all sections into one object
        const combinedData: any = {}
        sectionData.forEach((item) => {
          Object.assign(combinedData, item.data)
        })

        // Merge with default data to ensure all properties exist
        return mergeWithDefaults(combinedData)
      } else if ("data" in firstRow) {
        // Alternative: all CMS data is in a single row
        return mergeWithDefaults(firstRow.data)
      } else {
        // Data might be stored directly in the row
        const defaultData = getDefaultCMSData()
        const combinedData = { ...defaultData }

        // Try to map fields from the row to our CMS structure
        Object.keys(defaultData).forEach((key) => {
          if (key in firstRow) {
            combinedData[key] = firstRow[key]
          }
        })

        return mergeWithDefaults(combinedData)
      }
    }

    return getDefaultCMSData()
  } catch (error) {
    console.error("Error in getCMSData:", error)
    return getDefaultCMSData()
  }
}

// Helper function to merge loaded data with defaults to ensure all properties exist
function mergeWithDefaults(loadedData: any): CMSData {
  const defaultData = getDefaultCMSData()

  // Deep merge function to ensure nested objects are properly merged
  function deepMerge(target: any, source: any): any {
    const result = { ...target }

    for (const key in source) {
      if (source[key] && typeof source[key] === "object" && !Array.isArray(source[key])) {
        result[key] = deepMerge(target[key] || {}, source[key])
      } else {
        result[key] = source[key]
      }
    }

    return result
  }

  return deepMerge(defaultData, loadedData || {}) as CMSData
}

export async function saveCMSSection(section: string, sectionData: any, oldData?: any): Promise<boolean> {
  if (!hasSupabaseConfig || !supabase) {
    console.warn("Cannot save CMS data: Supabase not configured")
    return false
  }

  try {
    const { data: user } = await supabase.auth.getUser()

    if (!user.user) {
      console.error("User not authenticated")
      return false
    }

    // First check if the table has a section column
    const { data: tableInfo, error: tableError } = await supabase.from("cms_data").select("*").limit(1)

    if (tableError) {
      console.error("Error checking table structure:", tableError)
      return false
    }

    let success = false

    if (tableInfo && tableInfo.length > 0 && "section" in tableInfo[0]) {
      // Table has section column, use original approach
      const { error } = await supabase.from("cms_data").upsert({
        section,
        data: sectionData,
        updated_by: user.user.id,
      })

      if (error) {
        console.error("Error saving CMS data:", error)
        return false
      }
      success = true
    } else {
      // Alternative: store all data in a single row or update specific fields
      // First check if we have any rows
      const { data: existingData, error: existingError } = await supabase.from("cms_data").select("*")

      if (existingError) {
        console.error("Error checking existing data:", existingError)
        return false
      }

      if (existingData && existingData.length > 0) {
        // Update the first row with the new section data
        const firstRow = existingData[0]
        const id = firstRow.id

        let updateData: any = {}

        if ("data" in firstRow) {
          // If we have a data column, update it with the merged data
          const currentData = firstRow.data || {}
          updateData = {
            data: { ...currentData, ...sectionData },
            updated_by: user.user.id,
          }
        } else {
          // Otherwise, try to update the section directly
          updateData = {
            [section]: sectionData,
            updated_by: user.user.id,
          }
        }

        const { error } = await supabase.from("cms_data").update(updateData).eq("id", id)

        if (error) {
          console.error("Error updating CMS data:", error)
          return false
        }
        success = true
      } else {
        // No rows exist, create a new one
        const insertData: any = { updated_by: user.user.id }

        // Try both approaches
        insertData.data = { [section]: sectionData }
        insertData[section] = sectionData

        const { error } = await supabase.from("cms_data").insert(insertData)

        if (error) {
          console.error("Error inserting CMS data:", error)
          return false
        }
        success = true
      }
    }

    // Log the activity
    if (success) {
      const sectionNames: Record<string, string> = {
        home: "Hjemside",
        offer: "Vårt tilbud",
        about: "Om oss",
        contact: "Kontakt",
      }

      await logActivity(
        oldData ? "update" : "create",
        section,
        `Oppdaterte ${sectionNames[section] || section}`,
        oldData,
        sectionData,
      )
    }

    return success
  } catch (error) {
    console.error("Error in saveCMSSection:", error)
    return false
  }
}

export async function saveCMSData(data: CMSData): Promise<boolean> {
  if (!hasSupabaseConfig || !supabase) {
    console.warn("Cannot save CMS data: Supabase not configured")
    return false
  }

  try {
    // Check table structure first
    const { data: tableInfo, error: tableError } = await supabase.from("cms_data").select("*").limit(1)

    if (tableError) {
      console.error("Error checking table structure:", tableError)
      return false
    }

    if (tableInfo && tableInfo.length > 0 && "section" in tableInfo[0]) {
      // Original approach - save by sections
      // Lagre hjemside-data
      const homeData = {
        homeHero: data.homeHero,
        aboutKarmsund: data.aboutKarmsund,
        ourOffer: data.ourOffer,
        ourValues: data.ourValues,
        imageGallery: data.imageGallery,
        interestedCTA: data.interestedCTA,
      }

      // Lagre vårt tilbud-data
      const offerData = {
        offerHero: data.offerHero,
        whatWeOffer: data.whatWeOffer,
        rehabilitationSections: data.rehabilitationSections,
        howWeWork: data.howWeWork,
        facilities: data.facilities,
        referralAndAdmission: data.referralAndAdmission,
      }

      // Lagre om oss-data
      const aboutData = {
        aboutHero: data.aboutHero,
        aboutKarmsundText: data.aboutKarmsundText,
        valuesAndMethods: data.valuesAndMethods,
        careAndCommunity: data.careAndCommunity,
        personalGroup: data.personalGroup,
        interdisciplinaryTeam: data.interdisciplinaryTeam,
      }

      // Lagre kontakt-data
      const contactData = {
        contactHero: data.contactHero,
        contactPeople: data.contactPeople,
        generalContactInfo: data.generalContactInfo,
        applicationAndInquiries: data.applicationAndInquiries,
      }

      const results = await Promise.all([
        saveCMSSection("home", homeData),
        saveCMSSection("offer", offerData),
        saveCMSSection("about", aboutData),
        saveCMSSection("contact", contactData),
      ])

      return results.every((result) => result === true)
    } else {
      // Alternative: save all data in a single row
      const { data: user } = await supabase.auth.getUser()

      if (!user.user) {
        console.error("User not authenticated")
        return false
      }

      if (tableInfo && tableInfo.length > 0) {
        // Update existing row
        const firstRow = tableInfo[0]
        const id = firstRow.id

        let updateData: any = { updated_by: user.user.id }

        if ("data" in firstRow) {
          // If we have a data column, use it
          updateData.data = data
        } else {
          // Otherwise, try to update directly
          updateData = { ...data, updated_by: user.user.id }
        }

        const { error } = await supabase.from("cms_data").update(updateData).eq("id", id)

        if (error) {
          console.error("Error updating CMS data:", error)
          return false
        }
      } else {
        // Insert new row
        const insertData: any = { updated_by: user.user.id }

        // Try both approaches
        insertData.data = data

        const { error } = await supabase.from("cms_data").insert(insertData)

        if (error) {
          console.error("Error inserting CMS data:", error)
          return false
        }
      }

      return true
    }
  } catch (error) {
    console.error("Error in saveCMSData:", error)
    return false
  }
}

export async function subscribeToCMSChanges(callback: (data: CMSData) => void) {
  if (!hasSupabaseConfig || !supabase) {
    console.warn("Cannot subscribe to CMS changes: Supabase not configured")
    return () => {} // Return empty unsubscribe function
  }

  const channel = supabase
    .channel("cms_data_changes")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "cms_data",
      },
      async () => {
        const newData = await getCMSData()
        callback(newData)
      },
    )
    .subscribe()

  return () => {
    supabase.removeChannel(channel)
  }
}

function getDefaultCMSData(): CMSData {
  return {
    homeHero: {
      title: "Velkommen til Karmsund ABR",
      subtitle: "avdeling Bjørnestad",
      description: "Et trygt og helhetlig omsorgstilbud for deg som lever med rus og psykiske helseutfordringer",
      backgroundImage: "https://i.ibb.co/dw6Zr26V/IMG-0005-2.jpg",
      primaryButtonText: "Se vårt tilbud",
      secondaryButtonText: "Kontakt oss",
    },
    aboutKarmsund: {
      title: "Om Karmsund ABR",
      content:
        "Karmsund ABR er en privat stiftelse med ideelt formål. Siden 1990 har vi gitt mennesker med rusavhengighet et trygt og støttende tilbud, med fokus på omsorg og rehabilitering.\n\nVår avdeling Bjørnestad ligger i naturskjønne omgivelser på grensen mellom Agder og Rogaland, på Sirdal, Tonstad. Her møter du et team av dedikerte fagpersoner med lang erfaring innen rus og psykisk helse, som er her for å støtte deg på din vei.",
      image: "https://i.ibb.co/8g5F0Qf8/488622915-1135529365253755-4122780821380544378-n.jpg",
      imageAlt: "Karmsund ABR Bjørnestad - våre fasiliteter",
    },
    ourOffer: {
      title: "Vårt tilbud",
      content:
        "På Bjørnestad kan du få kort- eller langtidsopphold i trygge og rolige omgivelser. Vi fokuserer på individuell oppfølging der du står i sentrum. Vårt tverrfaglige team tilbyr omsorg, støtte til rusmestring, arbeidstrening og fysiske aktiviteter – alt tilpasset dine behov og mål.",
    },
    ourValues: {
      title: "Våre verdier",
      content:
        "Hos oss handler omsorg om mer enn støtte – det handler om håp, fellesskap og nye muligheter.\n\nPå Bjørnestad vektlegger vi omsorg, nestekjærlighet og din medvirkning i egen hverdag. Vi jobber med en recoveryorientert tilnærming der målet er at du gradvis tar tilbake kontrollen i ditt eget liv.",
    },
    imageGallery: [
      { id: "1", src: "/placeholder-image.png", alt: "Bjørnestad bygning" },
      { id: "2", src: "/placeholder-image.png", alt: "Aktiviteter i naturen" },
      { id: "3", src: "/placeholder-image.png", alt: "Fellesområde" },
      { id: "4", src: "/placeholder-image.png", alt: "Matsal" },
      { id: "5", src: "/placeholder-image.png", alt: "Soverom" },
      { id: "6", src: "/placeholder-image.png", alt: "Treningsrom" },
    ],
    interestedCTA: {
      title: "Er du interessert i vårt tilbud?",
      content:
        "Ta kontakt med oss for en uforpliktende samtale om hvordan vi kan hjelpe deg eller noen du bryr deg om. Vi er her for å svare på spørsmål og veilede deg gjennom innsøkingsprosessen.",
    },
    offerHero: {
      title: "Vårt tilbud",
      subtitle: "",
      description: "Et helhetlig rehabiliteringstilbud for deg som lever med rus og psykiske helseutfordringer",
      backgroundImage: "https://i.ibb.co/Pyd6Ny4/481780360-1118525113620847-2742735912719317564-n.jpg",
      primaryButtonText: "",
      secondaryButtonText: "",
    },
    whatWeOffer: {
      title: "Hva vi tilbyr",
      content:
        "På Karmsund ABR - avdeling Bjørnestad kan du få tilbud om kort- eller langtidsopphold hvis du lever med rus og psykiske helseutfordringer (ROP). Vårt tilbud omfatter også støtte til deg som har behov for oppfølging knyttet til opiatavhengighet (LAR), benzodiazepin-avhengighet og ADHD-relaterte utfordringer. Vi tar også imot personer på §12-soning via kriminalomsorgen.",
    },
    rehabilitationSections: [
      {
        id: "1",
        title: "Rusmestring og psykisk helse",
        content:
          "Vi har egen turnuslege på institusjonen som bidrar til å ivareta din helse. Din psykiske helse følges opp gjennom veiledning fra vår lege og støtte via vårt helsekontor. Ved behov hjelper vi deg også med å få nødvendig oppfølging utenfor institusjonen.\n\nVi bruker mye ressurser på å støtte deg med psykiske helseutfordringer som ADHD, traumer, angst og depresjon. Vi forstår at mange som kommer til oss har sammensatte utfordringer som krever helhetlig oppfølging og omsorg.",
        image: "https://i.ibb.co/tpFNLLV4/473568040-1073081298165229-7667707034353526907-n.jpg",
        imageAlt: "Medisinsk oppfølging",
      },
      {
        id: "2",
        title: "Fysisk aktivitet og friluft",
        content:
          "Det er velkjent at både fysisk og psykisk helse forbedres gjennom fysisk aktivitet. På Bjørnestad har vi derfor høyt fokus på å tilby varierte aktiviteter. Vi oppmuntrer deg til å delta på fellestreninger i treningsrommet, gåturer, klatring i nærområdet eller svømming i svømmehallen på Tonstad.\n\nDu vil få mulighet til å delta på fotturer til ulike fjell og høydetopper i kommunen. I vintersesongen kan du benytte flere langrennsarenaer i nærheten, og vi har en slalombakke som nærmeste nabo.",
        image: "https://i.ibb.co/RT8wKNBC/474080076-1076832084456817-4525319748951604265-n.jpg",
        imageAlt: "Fysisk aktivitet",
      },
    ],
    howWeWork: {
      title: "Hvordan vi jobber",
      weeklySchedule: {
        title: "Fast ukeplan",
        content:
          "Vi har fast ukeplan på avdelingen med oppsatte tider på morgenmøte/frokost, lunch, handleturer hver tirsdag, torsdag og lørdager, middag og aktiviteter. Faste medisintider gjennom dagen. Denne henges opp i fellesareal ved vaktrom.\n\nDenne strukturen gir forutsigbarhet og trygghet i hverdagen, samtidig som den hjelper med å etablere gode rutiner.",
      },
      sections: [
        {
          title: "Individuelle planer og mål",
          content:
            "Sammen med deg setter vi opp målsettinger og tiltak for oppholdet ditt, basert på henvisende instans sitt vedtak. Planen tar utgangspunkt i dine aktuelle behov og utfordringer. Tiltakene rettes mot ulike områder i livet ditt for å gi en helhetlig støtte.",
        },
        {
          title: "Brukermedvirkning",
          content:
            "Vi tar utgangspunkt i din livssituasjon, dine behov, ressurser og målsettinger. Din medvirkning og en tydelig tiltaksplan er sentralt i arbeidet med ADL-ferdigheter, aktiviteter, arbeidstrening og nettverksbygging.",
        },
      ],
    },
    facilities: {
      title: "Fasiliteter",
      content: "På Bjørnestad tilbyr vi moderne og komfortable fasiliteter:",
      image: "https://i.ibb.co/6cgzsfRS/IMG-0008-1.jpg",
      imageAlt: "Fasiliteter ved Bjørnestad",
      features: [
        "Nybygg: 10 egne rom, felles stue/kjøkken, aktivitetsrom, billiard, bordtennis og vaktrom.",
        "Gamle bygg: 8 egne rom, felles stue, toaletter/dusj, matsal og vaktrom.",
        "Treningsrom: Moderne treningsrom med utstyr for både styrke- og kondisjonstrening.",
        "Hytter: 3 hytter som tidligere har blitt benyttet til personer med husdyr (ikke lenger i bruk for dette formålet pga. allergihensyn).",
        "Fellesområder: Koselige oppholdsrom, TV-stue og uteområder for sosialt samvær.",
      ],
    },
    referralAndAdmission: {
      title: "Henvisning og inntak",
      content:
        "Vårt tilbud er tilpasset deg som lever med rusavhengighet, psykiske helseutfordringer eller som har behov for oppfølging knyttet til opiat- og benzodiazepinavhengighet, samt ADHD-relaterte utfordringer. Vi tilbyr et trygt miljø for alle som ønsker å endre sin livssituasjon.\n\nVi har lang erfaring med å støtte personer på §12-soning via kriminalomsorgen, og vi tilpasser tilbudet etter dine individuelle behov. Vårt tilbud passer for deg som ønsker en stabil og strukturert hverdag med fokus på både fysisk og psykisk helse.\n\nVentetider: Vi har som regel ledig kapasitet. Ta kontakt med oss for en uforpliktende samtale!",
    },
    aboutHero: {
      title: "Om oss",
      subtitle: "",
      description: "Bli kjent med Karmsund ABR, vår historie, våre verdier og vårt dedikerte team",
      backgroundImage: "https://i.ibb.co/mVkbGckH/487481052-1133344698805555-7125103448861760246-n.jpg",
      primaryButtonText: "",
      secondaryButtonText: "",
    },
    aboutKarmsundText: {
      title: "Om Karmsund ABR",
      content:
        "Karmsund ABR er en privat stiftelse med ideelt formål. Siden 1990 har vi gitt mennesker med rusavhengighet et trygt og støttende tilbud, først som både TSB-enhet og egne omsorgsinstitusjoner.\n\nTSB-avdelingen ble avsluttet etter anbudskonkurranser vi ikke nådde opp til i 2021. Vår avdeling Bjørnestad ligger nå på grensen mellom Agder og Rogaland, i naturskjønne omgivelser på Sirdal, Tonstad.\n\nHos oss møter du et team av dedikerte fagpersoner med lang erfaring innen rus og psykisk helse. Vi tilbyr omsorgstiltak og tilrettelagte plasser fortløpende etter avtale med kommunene.",
    },
    valuesAndMethods: {
      title: "Verdier og metode",
      sections: [
        {
          title: "Vårt menneskesyn",
          content:
            "Vår tilnærming er forankret i Karmsund ABR sitt livssynsnøytrale menneskesyn, med fokus på respekt, menneskeverd og empati.\n\nVi forstår at årsakene til rusavhengighet er komplekse, omfattende og sammensatte. Noen har opplevd en problematisk oppvekst eller vanskelige familieforhold som kan være direkte eller medvirkende årsak til rusavhengighet. Men vi vet også at dette langt fra er hele sannheten i dagens samfunn. Rusbruk og avhengighet kan ramme alle, uavhengig av bakgrunn.",
        },
        {
          title: "Vår tilnærming",
          content:
            "Vår metode bygger blant annet på prinsipper fra Motiverende samtale og Endringsfokusert rådgivning. Vi legger stor vekt på å bygge gode relasjoner, styrke din motivasjon, og fokusere på løsnings- og endringsarbeid – alt med dyp respekt for deg som individ.\n\nVi tar utgangspunkt i din unike livssituasjon, dine behov, ressurser og målsettinger. På Bjørnestad vektlegger vi god omsorg og nestekjærlighet. Tilbudet vårt er fundamentert i recoveryorientert metodikk og drives med tverrfaglig miljøterapeutisk tilnærming.",
        },
      ],
    },
    careAndCommunity: {
      title: "Omsorg, fellesskap og stabilitet",
      content:
        "Vårt viktigste verktøy er å gi omsorg på en god måte. Hos oss får alle samme tillit og mulighet til å skape nye relasjoner og oppleve samhold. Bjørnestad skal være et sted hvor du gjennom fellesskap kan se nye muligheter og finne motivasjon for personlig utvikling.\n\nHer får du mulighet til ro, tid til å bygge deg opp både psykisk og fysisk. Vårt mål er at du gradvis skal ta tilbake kontrollen i ditt eget liv.",
    },
    personalGroup: {
      title: "Vår personalgruppe",
      description:
        "På Bjørnestad møter du en tverrfaglig sammensatt personalgruppe. Sammen med øvrig personale danner vi et team som samarbeider rundt deg og dine behov. Vi verdsetter også medarbeidere med verdifull egenerfaring som kan gi en unik forståelse og innsikt.",
      people: [
        {
          id: "1",
          name: "Gunn Marie Matnisdal",
          title: "Daglig leder",
          phone: "911 48 104",
          email: "gunn.marie@kabr.no",
          image: "/person-silhouette.png",
        },
        {
          id: "2",
          name: "May Gunn",
          title: "Teamleder",
          phone: "XXX XX XXX",
          email: "may.gunn@kabr.no",
          image: "/person-silhouette.png",
        },
        {
          id: "3",
          name: "Torbjørn",
          title: "Teamleder",
          phone: "XXX XX XXX",
          email: "torbjorn@kabr.no",
          image: "/person-silhouette.png",
        },
      ],
    },
    interdisciplinaryTeam: {
      title: "Tverrfaglig team",
      content:
        "Vårt team består av:\n• Sykepleiere\n• Vernepleiere\n• Sosionomer\n• Miljøterapeuter\n• Personale med egenerfaring\n• Lege i turnus\n• Kokk",
    },
    contactHero: {
      title: "Kontakt oss",
      subtitle: "",
      description: "Vi er her for å hjelpe deg med spørsmål om vårt tilbud",
      backgroundImage: "https://i.ibb.co/mVkbGckH/487481052-1133344698805555-7125103448861760246-n.jpg",
      primaryButtonText: "",
      secondaryButtonText: "",
    },
    contactPeople: [
      {
        id: "1",
        name: "Gunn Marie Matnisdal",
        title: "Daglig leder",
        phone: "911 48 104",
        email: "gunn.marie@kabr.no",
        image: "/person-silhouette.png",
      },
      {
        id: "2",
        name: "May Gunn",
        title: "Inntakskoordinator",
        phone: "XXX XX XXX",
        email: "may.gunn@kabr.no",
        image: "/person-silhouette.png",
      },
      {
        id: "3",
        name: "Torbjørn",
        title: "Inntakskoordinator",
        phone: "XXX XX XXX",
        email: "torbjorn@kabr.no",
        image: "/person-silhouette.png",
      },
    ],
    generalContactInfo: {
      address: "Sirdalsveien 2444, 4440 Tonstad",
      openingHours: "Mandag - Fredag: 08:00 - 16:00\nBemanning 24/7 for beboere",
      visitingHours: "Etter avtale\nRing i forkant for å avtale tid",
      organizationNumber: "xx xx xx xxxxx",
      foundedYear: "1990",
    },
    applicationAndInquiries: {
      title: "Innsøking og henvendelser",
      sections: [
        {
          title: "For kommuner og henvisende instanser",
          content:
            "Vi tar imot henvisninger fra kommuner, NAV, fastleger og andre instanser. Ta kontakt med våre inntakskoordinatorer for å diskutere muligheter og tilbud.\n\nVentetider: Vi har som regel ledig kapasitet og kan ta imot nye beboere på kort varsel.\n\nDokumentasjon: Ved henvisning trenger vi relevant informasjon om brukerens behov, medisinsk historie og eventuelle spesielle hensyn.",
        },
        {
          title: "For privatpersoner",
          content:
            "Hvis du eller en av dine nærmeste trenger hjelp, kan du ta direkte kontakt med oss for en uforpliktende samtale. Vi kan veilede deg om hvordan du går frem for å søke opphold hos oss.\n\nOpphold ved Bjørnestad dekkes normalt av kommunen, og vi kan hjelpe deg med å komme i kontakt med riktig instans i din kommune.\n\nRing gjerne vår daglige leder eller en av våre inntakskoordinatorer for en fortrolig samtale.",
        },
      ],
    },
  }
}
