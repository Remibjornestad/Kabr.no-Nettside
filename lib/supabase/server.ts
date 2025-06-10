import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import type { Database } from "./types"

export const createServerClient = async () => {
  const cookieStore = await cookies()

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://dtuhdljrhszbxonsttrn.supabase.co"
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0dWhkbGpyaHN6YnhvbnN0dHJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxMzI1MDMsImV4cCI6MjA2NDcwODUwM30.4WpZKUdDcpeE_L0jpEVJKGvMx541LglutsMRxCDeiSw"

  return createServerComponentClient<Database>({ cookies: () => cookieStore })
}
