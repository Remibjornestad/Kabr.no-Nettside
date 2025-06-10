import type React from "react"
import type { Metadata } from "next"
import AuthProvider from "@/components/auth/auth-provider"
import CMSClient from "./CMSClient"
import { PreviewProvider } from "@/components/cms/preview-context"

export const metadata: Metadata = {
  title: "CMS | Karmsund ABR",
  description: "Content Management System for Karmsund ABR website",
  robots: {
    index: false,
    follow: false,
  },
}

export default function CMSLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <PreviewProvider>
        <CMSClient>{children}</CMSClient>
      </PreviewProvider>
    </AuthProvider>
  )
}
