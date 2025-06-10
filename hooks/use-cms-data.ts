"use client"

import { useState, useEffect } from "react"
import { getCMSData, subscribeToCMSChanges } from "@/lib/cms-data-supabase"
import type { CMSData } from "@/types/cms"

export function useCMSData() {
  const [data, setData] = useState<CMSData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let unsubscribe: (() => void) | undefined

    const loadData = async () => {
      try {
        setLoading(true)
        const cmsData = await getCMSData()
        setData(cmsData)
        setError(null)

        // Subscribe to real-time changes
        unsubscribe = await subscribeToCMSChanges((newData) => {
          setData(newData)
        })
      } catch (err) {
        setError("Kunne ikke laste CMS data")
        console.error("Error loading CMS data:", err)
      } finally {
        setLoading(false)
      }
    }

    loadData()

    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [])

  return { data, loading, error }
}
