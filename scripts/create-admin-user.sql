-- Opprett admin-bruker i Supabase Auth
-- Kjør dette i Supabase SQL Editor

-- Først, sett inn brukeren i auth.users tabellen
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@kabr.no', -- Endre til din e-post
  crypt('AdminPassord123!', gen_salt('bf')), -- Endre til ditt passord
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);

-- Deretter, sett inn identiteten
INSERT INTO auth.identities (
  id,
  user_id,
  identity_data,
  provider,
  last_sign_in_at,
  created_at,
  updated_at
) VALUES (
  gen_random_uuid(),
  (SELECT id FROM auth.users WHERE email = 'admin@kabr.no'),
  format('{"sub":"%s","email":"%s"}', (SELECT id FROM auth.users WHERE email = 'admin@kabr.no'), 'admin@kabr.no')::jsonb,
  'email',
  NOW(),
  NOW(),
  NOW()
);
