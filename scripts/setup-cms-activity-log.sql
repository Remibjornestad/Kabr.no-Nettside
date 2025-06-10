-- Create activity log table for tracking CMS changes
CREATE TABLE IF NOT EXISTS cms_activity_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  action VARCHAR(50) NOT NULL,
  section VARCHAR(50) NOT NULL,
  description TEXT,
  old_data JSONB,
  new_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE IF EXISTS cms_activity_log ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
DROP POLICY IF EXISTS "Allow authenticated users to read activity log" ON cms_activity_log;
CREATE POLICY "Allow authenticated users to read activity log" ON cms_activity_log
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Allow authenticated users to insert activity log" ON cms_activity_log;
CREATE POLICY "Allow authenticated users to insert activity log" ON cms_activity_log
  FOR INSERT TO authenticated WITH CHECK (true);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_cms_activity_log_created_at ON cms_activity_log(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_cms_activity_log_section ON cms_activity_log(section);
CREATE INDEX IF NOT EXISTS idx_cms_activity_log_user_id ON cms_activity_log(user_id);

-- Create storage bucket for CMS images if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('cms-images', 'cms-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies
DROP POLICY IF EXISTS "Allow authenticated users to upload images" ON storage.objects;
CREATE POLICY "Allow authenticated users to upload images" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'cms-images');

DROP POLICY IF EXISTS "Allow public to view images" ON storage.objects;
CREATE POLICY "Allow public to view images" ON storage.objects
  FOR SELECT USING (bucket_id = 'cms-images');

DROP POLICY IF EXISTS "Allow authenticated users to delete images" ON storage.objects;
CREATE POLICY "Allow authenticated users to delete images" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'cms-images');
