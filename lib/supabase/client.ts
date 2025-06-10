import { createBrowserClient } from "@supabase/ssr"
import type { Database } from "./types"

// Global singleton for browser-klient
let browserClient: ReturnType<typeof createBrowserClient<Database>> | undefined

export function createClient() {
  // Server-side: returner alltid ny klient
  if (typeof window === "undefined") {
    return createBrowserClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )
  }

  // Browser-side: bruk singleton
  if (!browserClient) {
    browserClient = createBrowserClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )
  }

  return browserClient
}

// Eksporter singleton for direkte bruk
export const supabase = createClient()
