import { createBrowserClient } from "@supabase/ssr"
import type { Database } from "./types"

// Global singleton for browser-klient
let browserClient: ReturnType<typeof createBrowserClient<Database>> | undefined

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://dtuhdljrhszbxonsttrn.supabase.co"
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0dWhkbGpyaHN6YnhvbnN0dHJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxMzI1MDMsImV4cCI6MjA2NDcwODUwM30.4WpZKUdDcpeE_L0jpEVJKGvMx541LglutsMRxCDeiSw"

  // Server-side: returner alltid ny klient
  if (typeof window === "undefined") {
    return createBrowserClient<Database>(supabaseUrl, supabaseKey)
  }

  // Browser-side: bruk singleton
  if (!browserClient) {
    browserClient = createBrowserClient<Database>(supabaseUrl, supabaseKey)
  }

  return browserClient
}

// Eksporter singleton for direkte bruk
export const supabase = createClient()
