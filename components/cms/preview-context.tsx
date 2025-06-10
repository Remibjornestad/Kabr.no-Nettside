"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { CMSData } from "@/types/cms"

interface PreviewContextType {
  previewData: CMSData | null
  setPreviewData: (data: CMSData | null) => void
  isPreviewVisible: boolean
  setPreviewVisible: (visible: boolean) => void
  previewPage: string
  setPreviewPage: (page: string) => void
}

const PreviewContext = createContext<PreviewContextType | undefined>(undefined)

export function PreviewProvider({ children }: { children: ReactNode }) {
  const [previewData, setPreviewData] = useState<CMSData | null>(null)
  const [isPreviewVisible, setPreviewVisible] = useState(false)
  const [previewPage, setPreviewPage] = useState("home")

  return (
    <PreviewContext.Provider
      value={{
        previewData,
        setPreviewData,
        isPreviewVisible,
        setPreviewVisible,
        previewPage,
        setPreviewPage,
      }}
    >
      {children}
    </PreviewContext.Provider>
  )
}

export function usePreview() {
  const context = useContext(PreviewContext)
  if (context === undefined) {
    throw new Error("usePreview must be used within a PreviewProvider")
  }
  return context
}
