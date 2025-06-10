-- Enable RLS (Row Level Security)
ALTER TABLE IF EXISTS cms_data ENABLE ROW LEVEL SECURITY;

-- Create cms_data table
CREATE TABLE IF NOT EXISTS cms_data (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section VARCHAR(50) NOT NULL,
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_by UUID REFERENCES auth.users(id)
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_cms_data_section ON cms_data(section);

-- Create RLS policies
DROP POLICY IF EXISTS "Allow authenticated users to read cms_data" ON cms_data;
CREATE POLICY "Allow authenticated users to read cms_data" ON cms_data
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Allow authenticated users to update cms_data" ON cms_data;
CREATE POLICY "Allow authenticated users to update cms_data" ON cms_data
  FOR ALL TO authenticated USING (true);

-- Insert default data if not exists
INSERT INTO cms_data (section, data) VALUES 
('home', '{
  "homeHero": {
    "title": "Velkommen til Karmsund ABR",
    "subtitle": "avdeling Bjørnestad",
    "description": "Et trygt og helhetlig omsorgstilbud for deg som lever med rus og psykiske helseutfordringer",
    "backgroundImage": "https://i.ibb.co/dw6Zr26V/IMG-0005-2.jpg",
    "primaryButtonText": "Se vårt tilbud",
    "secondaryButtonText": "Kontakt oss"
  },
  "aboutKarmsund": {
    "title": "Om Karmsund ABR",
    "content": "Karmsund ABR er en privat stiftelse med ideelt formål. Siden 1990 har vi gitt mennesker med rusavhengighet et trygt og støttende tilbud, med fokus på omsorg og rehabilitering.\n\nVår avdeling Bjørnestad ligger i naturskjønne omgivelser på grensen mellom Agder og Rogaland, på Sirdal, Tonstad. Her møter du et team av dedikerte fagpersoner med lang erfaring innen rus og psykisk helse, som er her for å støtte deg på din vei."
  },
  "ourOffer": {
    "title": "Vårt tilbud",
    "content": "På Bjørnestad kan du få kort- eller langtidsopphold i trygge og rolige omgivelser. Vi fokuserer på individuell oppfølging der du står i sentrum. Vårt tverrfaglige team tilbyr omsorg, støtte til rusmestring, arbeidstrening og fysiske aktiviteter – alt tilpasset dine behov og mål."
  },
  "ourValues": {
    "title": "Våre verdier",
    "content": "Hos oss handler omsorg om mer enn støtte – det handler om håp, fellesskap og nye muligheter.\n\nPå Bjørnestad vektlegger vi omsorg, nestekjærlighet og din medvirkning i egen hverdag. Vi jobber med en recoveryorientert tilnærming der målet er at du gradvis tar tilbake kontrollen i ditt eget liv."
  },
  "imageGallery": [
    {"id": "1", "src": "/placeholder-image.png", "alt": "Bjørnestad bygning"},
    {"id": "2", "src": "/placeholder-image.png", "alt": "Aktiviteter i naturen"},
    {"id": "3", "src": "/placeholder-image.png", "alt": "Fellesområde"},
    {"id": "4", "src": "/placeholder-image.png", "alt": "Matsal"},
    {"id": "5", "src": "/placeholder-image.png", "alt": "Soverom"},
    {"id": "6", "src": "/placeholder-image.png", "alt": "Treningsrom"}
  ],
  "interestedCTA": {
    "title": "Er du interessert i vårt tilbud?",
    "content": "Ta kontakt med oss for en uforpliktende samtale om hvordan vi kan hjelpe deg eller noen du bryr deg om. Vi er her for å svare på spørsmål og veilede deg gjennom innsøkingsprosessen."
  }
}')
ON CONFLICT (section) DO NOTHING;

-- Create function to update timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_cms_data_updated_at ON cms_data;
CREATE TRIGGER update_cms_data_updated_at
    BEFORE UPDATE ON cms_data
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
