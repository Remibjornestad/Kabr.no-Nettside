-- Create cms_data table with a simpler structure
CREATE TABLE IF NOT EXISTS cms_data (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_by UUID REFERENCES auth.users(id)
);

-- Enable RLS (Row Level Security)
ALTER TABLE IF EXISTS cms_data ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
DROP POLICY IF EXISTS "Allow authenticated users to read cms_data" ON cms_data;
CREATE POLICY "Allow authenticated users to read cms_data" ON cms_data
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Allow authenticated users to update cms_data" ON cms_data;
CREATE POLICY "Allow authenticated users to update cms_data" ON cms_data
  FOR ALL TO authenticated USING (true);

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

-- Insert default data if not exists
INSERT INTO cms_data (data)
SELECT '{"homeHero":{"title":"Velkommen til Karmsund ABR","subtitle":"avdeling Bjørnestad","description":"Et trygt og helhetlig omsorgstilbud for deg som lever med rus og psykiske helseutfordringer","backgroundImage":"https://i.ibb.co/dw6Zr26V/IMG-0005-2.jpg","primaryButtonText":"Se vårt tilbud","secondaryButtonText":"Kontakt oss"},"aboutKarmsund":{"title":"Om Karmsund ABR","content":"Karmsund ABR er en privat stiftelse med ideelt formål. Siden 1990 har vi gitt mennesker med rusavhengighet et trygt og støttende tilbud, med fokus på omsorg og rehabilitering.\n\nVår avdeling Bjørnestad ligger i naturskjønne omgivelser på grensen mellom Agder og Rogaland, på Sirdal, Tonstad. Her møter du et team av dedikerte fagpersoner med lang erfaring innen rus og psykisk helse, som er her for å støtte deg på din vei."}}'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM cms_data);
