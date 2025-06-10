"use client"

import type React from "react"

import { useState, useRef } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Upload, ExternalLink, X } from "lucide-react"
import Image from "next/image"

interface ImageFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export default function ImageField({ label, value, onChange, placeholder, className }: ImageFieldProps) {
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [useUrl, setUseUrl] = useState(false)
  const [tempUrl, setTempUrl] = useState("")
  const [showPreview, setShowPreview] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  const handleFileUpload = async (file: File) => {
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Vennligst velg en bildefil")
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Bildet er for stort. Maksimal størrelse er 5MB.")
      return
    }

    setUploading(true)
    setUploadProgress(0)

    try {
      // Create unique filename
      const fileExt = file.name.split(".").pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `images/${fileName}`

      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90))
      }, 100)

      // Upload file to Supabase Storage
      const { data, error } = await supabase.storage.from("cms-images").upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      })

      clearInterval(progressInterval)

      if (error) {
        throw error
      }

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("cms-images").getPublicUrl(filePath)

      onChange(publicUrl)
      setUploadProgress(100)

      // Reset after a short delay
      setTimeout(() => {
        setUploadProgress(0)
        setUploading(false)
      }, 1000)
    } catch (error) {
      console.error("Error uploading image:", error)
      alert("Feil ved opplasting av bilde. Prøv igjen.")
      setUploading(false)
      setUploadProgress(0)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const handleUrlSubmit = () => {
    if (tempUrl.trim()) {
      onChange(tempUrl.trim())
      setTempUrl("")
      setUseUrl(false)
    }
  }

  const clearImage = () => {
    onChange("")
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">{label}</Label>
        <div className="flex items-center gap-2">
          {value && (
            <Button type="button" variant="outline" size="sm" onClick={() => setShowPreview(!showPreview)}>
              {showPreview ? "Skjul" : "Forhåndsvis"}
            </Button>
          )}
          <Button type="button" variant="outline" size="sm" onClick={() => setUseUrl(!useUrl)}>
            <ExternalLink className="h-4 w-4 mr-1" />
            {useUrl ? "Last opp" : "URL"}
          </Button>
          {value && (
            <Button type="button" variant="outline" size="sm" onClick={clearImage}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {useUrl ? (
        <div className="space-y-3">
          <div className="flex gap-2">
            <Input
              value={tempUrl}
              onChange={(e) => setTempUrl(e.target.value)}
              placeholder={placeholder || "https://example.com/image.jpg"}
              className="flex-1"
            />
            <Button onClick={handleUrlSubmit} disabled={!tempUrl.trim()}>
              Bruk URL
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {/* Current URL input for editing */}
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder || "Bilde URL eller last opp fil"}
            className="w-full"
          />

          {/* Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
              uploading ? "border-blue-300 bg-blue-50" : "border-gray-300 hover:border-gray-400"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {uploading ? (
              <div className="space-y-2">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto" />
                <p className="text-sm text-gray-600">Laster opp...</p>
                <Progress value={uploadProgress} className="w-full max-w-xs mx-auto" />
              </div>
            ) : (
              <div className="space-y-2">
                <Upload className="h-6 w-6 text-gray-400 mx-auto" />
                <p className="text-sm text-gray-600">
                  Dra og slipp et bilde her, eller{" "}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-blue-600 hover:underline"
                  >
                    velg fil
                  </button>
                </p>
                <p className="text-xs text-gray-500">PNG, JPG, GIF opp til 5MB</p>
              </div>
            )}
          </div>

          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
        </div>
      )}

      {/* Image Preview */}
      {value && showPreview && (
        <div className="space-y-2">
          <Label className="text-sm font-medium">Forhåndsvisning:</Label>
          <div className="relative h-32 w-full bg-gray-100 rounded overflow-hidden border">
            <Image
              src={value || "/placeholder.svg"}
              alt="Forhåndsvisning"
              fill
              className="object-cover"
              onError={() => {
                // Handle broken images
                console.log("Image failed to load:", value)
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
