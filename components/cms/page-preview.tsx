"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, Monitor, Tablet, Smartphone, Maximize2 } from "lucide-react"
import OptimizedImage from "@/components/optimized-image"
import type { CMSData } from "@/types/cms"

interface PagePreviewProps {
  pageType: string
  data: CMSData | null
  isVisible: boolean
  onClose: () => void
}

type DeviceSize = "mobile" | "tablet" | "desktop"

export default function PagePreview({ pageType, data, isVisible, onClose }: PagePreviewProps) {
  const [deviceSize, setDeviceSize] = useState<DeviceSize>("desktop")
  const [isFullscreen, setIsFullscreen] = useState(false)

  if (!isVisible || !data) return null

  const getDeviceClasses = () => {
    switch (deviceSize) {
      case "mobile":
        return "w-[375px] h-[667px]"
      case "tablet":
        return "w-[768px] h-[1024px]"
      case "desktop":
        return "w-full h-full"
      default:
        return "w-full h-full"
    }
  }

  const renderHomePage = () => (
    <div className="flex flex-col w-full bg-white">
      {/* Hero Section */}
      <section className="relative w-full h-[300px] md:h-[400px]">
        <OptimizedImage
          src={data.homeHero.backgroundImage || "/placeholder.svg"}
          alt="Naturskjønt landskap ved Bjørnestad"
          fill
          className="object-cover brightness-[0.85]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-white mb-2 drop-shadow-md">
              {data.homeHero.title}
            </h1>
            {data.homeHero.subtitle && (
              <p className="text-sm md:text-lg text-white mb-4 drop-shadow-md">{data.homeHero.subtitle}</p>
            )}
            <p className="text-xs md:text-base text-white mb-6 max-w-3xl mx-auto drop-shadow-md">
              {data.homeHero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              {data.homeHero.primaryButtonText && (
                <button className="px-4 py-2 bg-steel-500 text-white rounded text-sm">
                  {data.homeHero.primaryButtonText}
                </button>
              )}
              {data.homeHero.secondaryButtonText && (
                <button className="px-4 py-2 bg-white/90 text-steel-600 rounded text-sm border">
                  {data.homeHero.secondaryButtonText}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Om Karmsund ABR */}
      <section className="py-8 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-4">{data.aboutKarmsund.title}</h2>
              <div className="text-sm md:text-base text-slate-700 mb-4 whitespace-pre-line">
                {data.aboutKarmsund.content}
              </div>
              <button className="px-4 py-2 bg-steel-500 text-white rounded text-sm">Les mer om oss</button>
            </div>
            <div className="relative h-[200px] md:h-[300px] rounded-lg overflow-hidden border border-steel-200">
              <OptimizedImage
                src="https://i.ibb.co/8g5F0Qf8/488622915-1135529365253755-4122780821380544378-n.jpg"
                alt="Karmsund ABR Bjørnestad"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vårt tilbud */}
      <section className="py-8 px-4 bg-steel-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-center text-slate-800 mb-6">{data.ourOffer.title}</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-sm md:text-base text-slate-700 mb-4 text-center whitespace-pre-line">
              {data.ourOffer.content}
            </p>
            <div className="text-center mt-4">
              <button className="px-4 py-2 bg-steel-500 text-white rounded text-sm">Utforsk vårt tilbud</button>
            </div>
          </div>
        </div>
      </section>

      {/* Våre verdier */}
      <section className="py-8 px-4 bg-navy-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl md:text-2xl font-bold mb-4">{data.ourValues.title}</h2>
          <div className="text-sm md:text-base whitespace-pre-line">{data.ourValues.content}</div>
        </div>
      </section>

      {/* Bildegalleri */}
      <section className="py-8 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-center text-slate-800 mb-8">Inntrykk fra Bjørnestad</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
            {data.imageGallery.slice(0, 6).map((image, index) => (
              <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                <OptimizedImage src={image.url} alt={image.alt} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kontakt CTA */}
      <section className="py-8 px-4 bg-steel-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-4">{data.interestedCTA.title}</h2>
          <p className="text-sm md:text-base text-slate-700 mb-6 max-w-3xl mx-auto whitespace-pre-line">
            {data.interestedCTA.content}
          </p>
          <button className="px-6 py-3 bg-steel-500 text-white rounded text-sm">Kontakt oss</button>
        </div>
      </section>
    </div>
  )

  const renderContent = () => {
    switch (pageType) {
      case "home":
        return renderHomePage()
      default:
        return <div className="p-4">Preview ikke tilgjengelig for denne siden ennå.</div>
    }
  }

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 bg-white z-50 overflow-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h3 className="font-semibold">Forhåndsvisning - {pageType}</h3>
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setDeviceSize("mobile")}
                variant={deviceSize === "mobile" ? "default" : "outline"}
                size="sm"
              >
                <Smartphone className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => setDeviceSize("tablet")}
                variant={deviceSize === "tablet" ? "default" : "outline"}
                size="sm"
              >
                <Tablet className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => setDeviceSize("desktop")}
                variant={deviceSize === "desktop" ? "default" : "outline"}
                size="sm"
              >
                <Monitor className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Button onClick={() => setIsFullscreen(false)} variant="outline" size="sm">
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex justify-center p-4">
          <div className={`${getDeviceClasses()} border border-gray-300 rounded-lg overflow-hidden bg-white shadow-lg`}>
            {renderContent()}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden h-full flex flex-col">
      <div className="p-3 border-b border-gray-200 flex items-center justify-between bg-gray-50">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-sm">Forhåndsvisning</h3>
          <div className="flex items-center gap-1">
            <Button
              onClick={() => setDeviceSize("mobile")}
              variant={deviceSize === "mobile" ? "default" : "outline"}
              size="sm"
              className="h-6 w-6 p-0"
            >
              <Smartphone className="h-3 w-3" />
            </Button>
            <Button
              onClick={() => setDeviceSize("tablet")}
              variant={deviceSize === "tablet" ? "default" : "outline"}
              size="sm"
              className="h-6 w-6 p-0"
            >
              <Tablet className="h-3 w-3" />
            </Button>
            <Button
              onClick={() => setDeviceSize("desktop")}
              variant={deviceSize === "desktop" ? "default" : "outline"}
              size="sm"
              className="h-6 w-6 p-0"
            >
              <Monitor className="h-3 w-3" />
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button onClick={() => setIsFullscreen(true)} variant="outline" size="sm" className="h-6 w-6 p-0">
            <Maximize2 className="h-3 w-3" />
          </Button>
          <Button onClick={onClose} variant="outline" size="sm" className="h-6 w-6 p-0">
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-2">
        <div
          className={`${deviceSize !== "desktop" ? getDeviceClasses() : "w-full h-full"} mx-auto border border-gray-300 rounded overflow-hidden bg-white`}
        >
          <div className="transform scale-75 origin-top-left w-[133%] h-[133%]">{renderContent()}</div>
        </div>
      </div>
    </div>
  )
}
