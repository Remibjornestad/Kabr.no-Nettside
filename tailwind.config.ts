import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // New professional color palette
        steel: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1", // Light steel blue - subtle accent
          400: "#94a3b8",
          500: "#64748b", // Main steel blue - primary color
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
        navy: {
          50: "#f0f5fa",
          100: "#e1eaf4",
          200: "#c3d5e9",
          300: "#a4c0de",
          400: "#85abd3",
          500: "#5783b3", // Navy blue - secondary color
          600: "#3b5f8a",
          700: "#2d4a6d",
          800: "#1e3450",
          900: "#101f33",
        },
        sage: {
          50: "#f6f7f6",
          100: "#e3e6e3",
          200: "#d0d5d0",
          300: "#b1b9b1", // Light sage - subtle accent
          400: "#919b91",
          500: "#717d71", // Sage - accent color
          600: "#5c655c",
          700: "#454d45",
          800: "#2e342e",
          900: "#171a17",
        },
        sand: {
          50: "#fbfaf6",
          100: "#f5f2e9",
          200: "#ebe5d2",
          300: "#e0d8bc", // Light sand - subtle accent
          400: "#d6cba5",
          500: "#c2b382", // Sand - accent color
          600: "#a89a64",
          700: "#8a7f52",
          800: "#5c543a",
          900: "#2e2a1d",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
