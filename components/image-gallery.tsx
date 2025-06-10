"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import OptimizedImage from "@/components/optimized-image"
import type { ImageGalleryItem } from "@/types/cms"

interface ImageGalleryProps {
  images?: ImageGalleryItem[]
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Fallback til standard bilder hvis ingen bilder er oppgitt
  const defaultImages = [
    {
      id: "1",
      src: "/placeholder-image.png",
      alt: "Bjørnestad bygning",
    },
    {
      id: "2",
      src: "/placeholder-image.png",
      alt: "Aktiviteter i naturen",
    },
    {
      id: "3",
      src: "/placeholder-image.png",
      alt: "Fellesområde",
    },
    {
      id: "4",
      src: "/placeholder-image.png",
      alt: "Matsal",
    },
    {
      id: "5",
      src: "/placeholder-image.png",
      alt: "Soverom",
    },
    {
      id: "6",
      src: "/placeholder-image.png",
      alt: "Treningsrom",
    },
  ]

  const galleryImages = images && images.length > 0 ? images : defaultImages

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? galleryImages.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const nextSlide = () => {
    const isLastSlide = currentIndex === galleryImages.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex)
  }

  return (
    <div className="relative w-full h-[500px] group">
      <div className="relative h-full w-full rounded-lg overflow-hidden">
        <OptimizedImage
          src={galleryImages[currentIndex].src || "/placeholder.svg"}
          alt={galleryImages[currentIndex].alt}
          fill
          className="object-cover transition-all duration-500"
          sizes="(max-width: 768px) 100vw, 1200px"
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Left Arrow */}
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 hover:bg-white"
        onClick={prevSlide}
        aria-label="Forrige bilde"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      {/* Right Arrow */}
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 hover:bg-white"
        onClick={nextSlide}
        aria-label="Neste bilde"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {galleryImages.map((_, slideIndex) => (
          <button
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentIndex === slideIndex ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Gå til bilde ${slideIndex + 1}`}
          ></button>
        ))}
      </div>
    </div>
  )
}
