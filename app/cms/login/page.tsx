import type { Metadata } from "next"
import LoginForm from "@/components/auth/login-form"

export const metadata: Metadata = {
  title: "Logg inn | CMS | Karmsund ABR",
  description: "Administrator login for Karmsund ABR CMS",
  robots: {
    index: false,
    follow: false,
  },
}

export default function LoginPage() {
  return <LoginForm />
}
