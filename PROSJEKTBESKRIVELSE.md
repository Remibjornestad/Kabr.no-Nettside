# Prosjektbeskrivelse: Karmsund ABR - Bjørnestad Nettside

## Oversikt

Dette dokumentet beskriver den komplette nettsiden som er utviklet for Karmsund ABR - avdeling Bjørnestad. Nettsiden er bygget med moderne teknologi og inkluderer et avansert innholdshåndteringssystem (CMS) som gjør det enkelt å oppdatere innhold uten teknisk kunnskap.

## Teknisk Plattform

### Frontend
- **Next.js 14** - Moderne React-rammeverk med server-side rendering
- **TypeScript** - Type-sikker JavaScript for bedre kodekvalitet
- **Tailwind CSS** - Moderne CSS-rammeverk for responsivt design
- **Shadcn/ui** - Profesjonelle UI-komponenter
- **Lucide React** - Moderne ikoner

### Backend & Database
- **Supabase** - Komplett backend-løsning med:
  - PostgreSQL database
  - Autentisering og autorisasjon
  - Fillagring for bilder
  - Real-time oppdateringer

### Hosting & Deployment
- **Vercel** - Profesjonell hosting med automatisk deployment
- **Custom domene** - kabr.no
- **SSL-sertifikat** - Sikker HTTPS-tilkobling
- **CDN** - Rask lasting globalt

## Nettsidestruktur

### Offentlige Sider

#### 1. Hjemmeside (/)
- **Hero-seksjon** med hovedbudskap og call-to-action knapper
- **Om Karmsund ABR** - Kort introduksjon til organisasjonen
- **Vårt tilbud** - Oversikt over tjenester
- **Våre verdier** - Organisasjonens verdier og filosofi
- **Bildegalleri** - Inntrykk fra Bjørnestad med interaktiv karusell
- **Kontakt-oppfordring** - Oppfordring til å ta kontakt

#### 2. Vårt Tilbud (/vart-tilbud)
- **Hero-seksjon** med fokus på tilbudet
- **Hva vi tilbyr** - Detaljert beskrivelse av tjenester
- **Rehabiliteringstilbud** - Spesifikke programmer og tiltak
- **Hvordan vi jobber** - Metodikk og tilnærming
- **Fasiliteter** - Beskrivelse av bygninger og utstyr
- **Henvisning og inntak** - Praktisk informasjon for søkere

#### 3. Om Oss (/om-oss)
- **Hero-seksjon** med teamfokus
- **Om Karmsund ABR** - Organisasjonens historie og formål
- **Verdier og metode** - Detaljert beskrivelse av tilnærming
- **Omsorg, fellesskap og stabilitet** - Kjerneverdier
- **Vår personalgruppe** - Presentasjon av nøkkelpersoner
- **Tverrfaglig team** - Oversikt over fagkompetanse

#### 4. Kontakt (/kontakt)
- **Hero-seksjon** med kontaktfokus
- **Kontaktpersoner** - Bilder og kontaktinfo for nøkkelpersoner
- **Generell kontaktinformasjon** - Adresse, åpningstider, organisasjonsinfo
- **Kart** - Interaktivt Google Maps for veibeskrivelse
- **Innsøking og henvendelser** - Veiledning for ulike brukergrupper

#### 5. Juridiske Sider
- **Personvernerklæring** (/personvern) - GDPR-kompatibel personvernpolicy
- **Cookie-informasjon** (/cookies) - Informasjon om bruk av cookies

### Administrativt System (CMS)

#### Sikkerhet og Tilgang
- **Sikker innlogging** med e-post og passord
- **Brute force-beskyttelse** - Begrenser innloggingsforsøk
- **E-post whitelist** - Kun forhåndsgodkjente e-poster får tilgang
- **Automatisk utlogging** ved inaktivitet
- **Mobilblokkering** - CMS kun tilgjengelig på desktop for optimal brukeropplevelse

#### CMS-Dashboard (/cms)
- **Oversiktsside** med tilgang til alle redigerbare seksjoner
- **Intuitive kort** for hver side som kan redigeres
- **Direkte navigasjon** til spesifikke redigeringssider

#### Redigeringsfunksjoner

##### Hjemside-redigering (/cms/hjemside)
- **Hero-seksjon redigering**:
  - Hovedtittel og undertittel
  - Beskrivelsestekst
  - Bakgrunnsbilde (opplasting eller URL)
  - Knappetekster
- **Om Karmsund ABR-seksjon**
- **Vårt tilbud-seksjon**
- **Våre verdier-seksjon**
- **Bildegalleri-administrasjon**:
  - Legg til/fjern bilder
  - Endre rekkefølge
  - Redigere alt-tekst
- **Kontakt CTA-seksjon**

##### Vårt Tilbud-redigering (/cms/vart-tilbud)
- **Hero-seksjon** med bakgrunnsbilde
- **Hva vi tilbyr-seksjon**
- **Rehabiliteringstilbud**:
  - Legg til/fjern seksjoner
  - Bilder og beskrivelser
  - Fleksibel rekkefølge
- **Hvordan vi jobber**:
  - Dynamiske kort med tittel og innhold
- **Fasiliteter**:
  - Hovedbilde og beskrivelse
  - Liste over fasiliteter (kan legges til/fjernes)
- **Henvisning og inntak-informasjon**

##### Om Oss-redigering (/cms/om-oss)
- **Hero-seksjon**
- **Om Karmsund ABR-tekst**
- **Verdier og metode**:
  - Fleksible seksjoner som kan legges til/fjernes
- **Omsorg og fellesskap-seksjon**
- **Personalgruppe**:
  - Legg til/fjern personer
  - Profilbilder, navn, tittel, kontaktinfo
- **Tverrfaglig team-beskrivelse**

##### Kontakt-redigering (/cms/kontakt)
- **Hero-seksjon**
- **Kontaktpersoner**:
  - Komplett personadministrasjon
  - Profilbilder, kontaktdetaljer
- **Generell kontaktinformasjon**:
  - Adresse, åpningstider, organisasjonsdata
- **Innsøking og henvendelser**:
  - Separate seksjoner for ulike målgrupper

#### Avanserte CMS-funksjoner

##### Bildehåndtering
- **Drag & drop opplasting** direkte i nettleseren
- **Automatisk komprimering** for optimal ytelse
- **Sikker lagring** i Supabase Storage
- **URL-støtte** for eksterne bilder
- **Forhåndsvisning** før publisering
- **Alt-tekst redigering** for tilgjengelighet

##### Tekstredigering
- **WYSIWYG-lignende opplevelse** med live forhåndsvisning
- **Støtte for linjeskift** og formatering
- **Automatisk lagring** av endringer
- **Undo/Redo-funksjonalitet** (Ctrl+Z/Ctrl+Y)

##### Forhåndsvisning
- **Live forhåndsvisning** av endringer
- **Responsiv forhåndsvisning** (mobil, tablet, desktop)
- **Fullskjerm-modus** for detaljert gjennomgang
- **Side-ved-side redigering** og forhåndsvisning

##### Aktivitetslogg
- **Komplett endringshistorikk** med tidsstempler
- **Brukeridentifikasjon** for alle endringer
- **Detaljerte beskrivelser** av hva som ble endret
- **Filtrering** etter seksjon og bruker

## Tekniske Funksjoner

### Ytelse og Optimalisering
- **Server-side rendering** for rask innlasting
- **Automatisk bildeoptimalisering** med Next.js Image
- **Lazy loading** av bilder og innhold
- **CDN-distribusjon** via Vercel
- **Komprimerte assets** for minimal båndbreddebruk

### SEO og Tilgjengelighet
- **Semantisk HTML** for bedre SEO
- **Meta-tags** optimalisert for søkemotorer
- **Open Graph-tags** for sosiale medier
- **Strukturerte data** (JSON-LD) for rike søkeresultater
- **Alt-tekst** på alle bilder
- **Keyboard navigation** støtte
- **Screen reader-vennlig** markup

### Sikkerhet
- **HTTPS-kryptering** på all kommunikasjon
- **CSRF-beskyttelse** på alle skjemaer
- **SQL injection-beskyttelse** via Supabase
- **XSS-beskyttelse** via React
- **Sikker autentisering** med Supabase Auth
- **Row Level Security** på database-nivå

### Responsivt Design
- **Mobilvennlig design** som fungerer på alle enheter
- **Touch-optimaliserte** interaksjoner
- **Fleksible layouts** som tilpasser seg skjermstørrelse
- **Optimaliserte bilder** for ulike oppløsninger

## Integrasjoner

### Google Maps
- **Interaktivt kart** på kontaktsiden
- **Veibeskrivelse** til Bjørnestad
- **Responsiv kartvisning**

### E-post og Telefon
- **Klikkbare telefonnumre** for direkte oppringning
- **Klikkbare e-postadresser** for direkte e-post
- **Automatisk formatering** av kontaktinformasjon

## Vedlikehold og Support

### Automatiske Backups
- **Daglige database-backups** via Supabase
- **Versjonskontroll** av all kode via Git
- **Aktivitetslogg** for å spore alle endringer

### Overvåking
- **Oppetidsovervåking** via Vercel
- **Ytelsesovervåking** med Core Web Vitals
- **Feilrapportering** og logging

### Oppdateringer
- **Automatiske sikkerhetspatcher** via Vercel
- **Dependency-oppdateringer** overvåkes kontinuerlig
- **Feature-oppdateringer** kan implementeres etter behov

## Brukerveiledning

### For Administratorer
- **Innlogging**: Gå til kabr.no/cms og logg inn med godkjent e-post
- **Redigering**: Velg ønsket seksjon fra dashboard
- **Lagring**: Endringer lagres automatisk når du klikker "Lagre"
- **Forhåndsvisning**: Bruk forhåndsvisningsknappen for å se endringer
- **Bilder**: Dra og slipp bilder direkte i redigeringsfeltet

### Beste Praksis
- **Regelmessige oppdateringer** holder innholdet relevant
- **Bildekvalitet** - bruk høykvalitetsbilder for best resultat
- **Alt-tekst** - beskriv alltid bilder for tilgjengelighet
- **Konsistent tone** - hold samme språkstil gjennom hele nettsiden

## Fremtidige Muligheter

### Potensielle Utvidelser
- **Nyhetsseksjon** for oppdateringer og arrangementer
- **Søkefunksjonalitet** for å finne spesifikt innhold
- **Flerspråklig støtte** for engelsk eller andre språk
- **Kontaktskjema** med automatisk e-postbehandling
- **Sosiale medier-integrasjon** for deling av innhold
- **Analytics dashboard** for besøksstatistikk

### Skalerbarhet
- Systemet er bygget for å håndtere økt trafikk
- Database kan enkelt skaleres ved behov
- Nye funksjoner kan legges til uten å påvirke eksisterende funksjonalitet

## Teknisk Support

### Kontaktinformasjon
For teknisk support eller spørsmål om nettsiden, kontakt utviklingsteamet via de oppgitte kanalene.

### Dokumentasjon
- Komplett teknisk dokumentasjon er tilgjengelig for utviklere
- Brukermanualer er tilgjengelige for administratorer
- Video-tutorials kan lages ved behov

## Konklusjon

Nettsiden for Karmsund ABR - Bjørnestad representerer en moderne, sikker og brukervennlig løsning som effektivt kommuniserer organisasjonens verdier og tjenester. Det integrerte CMS-systemet gir full kontroll over innholdet, mens den tekniske arkitekturen sikrer pålitelighet, sikkerhet og fremtidig skalerbarhet.

Løsningen er designet for å vokse med organisasjonen og kan enkelt utvides med nye funksjoner etter behov. Den profesjonelle presentasjonen og den intuitive administrasjonsløsningen gjør dette til en komplett digital plattform for Karmsund ABR - Bjørnestad.
