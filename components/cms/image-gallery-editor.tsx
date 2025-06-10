"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Trash2, Plus, GripVertical, ArrowUp, ArrowDown, Edit } from "lucide-react"
import Image from "next/image"
import ImageField from "./image-field"
import type { ImageGalleryItem } from "@/types/cms"

interface ImageGalleryEditorProps {
  title: string
  images: ImageGalleryItem[]
  onChange: (images: ImageGalleryItem[]) => void
}

export default function ImageGalleryEditor({ title, images, onChange }: ImageGalleryEditorProps) {
  const [editingId, setEditingId] = useState<string | null>(null)

  const handleEdit = (id: string) => {
    setEditingId(editingId === id ? null : id)
  }

  const handleImageChange = (index: number, field: keyof ImageGalleryItem, value: string) => {
    const newImages = [...images]
    newImages[index] = { ...newImages[index], [field]: value }
    onChange(newImages)
  }

  const handleDelete = (index: number) => {
    if (images.length > 1) {
      const newImages = images.filter((_, i) => i !== index)
      onChange(newImages)
    }
  }

  const handleAdd = () => {
    const newImage: ImageGalleryItem = {
      id: Date.now().toString(),
      src: "",
      alt: "Nytt bilde",
    }
    onChange([...images, newImage])
    setEditingId(newImage.id)
  }

  const moveImage = (fromIndex: number, toIndex: number) => {
    const newImages = [...images]
    const [movedImage] = newImages.splice(fromIndex, 1)
    newImages.splice(toIndex, 0, movedImage)
    onChange(newImages)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <Button onClick={handleAdd} size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Legg til bilde
        </Button>
      </div>

      <div className="grid gap-4">
        {images.map((image, index) => (
          <Card key={image.id} className={editingId === image.id ? "border-blue-200 bg-blue-50" : ""}>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                {/* Drag handle */}
                <div className="flex flex-col items-center gap-1 pt-2">
                  <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
                  <span className="text-xs text-gray-500">#{index + 1}</span>
                </div>

                {/* Image preview */}
                <div className="relative h-20 w-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    onError={() => {
                      console.log("Image failed to load:", image.src)
                    }}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {editingId === image.id ? (
                    <div className="space-y-4">
                      <ImageField
                        label="Bilde"
                        value={image.src}
                        onChange={(value) => handleImageChange(index, "src", value)}
                        placeholder="Last opp bilde eller bruk URL"
                      />

                      <div>
                        <Label>Alt-tekst (beskrivelse)</Label>
                        <Input
                          value={image.alt}
                          onChange={(e) => handleImageChange(index, "alt", e.target.value)}
                          placeholder="Beskrivelse av bildet"
                          className="mt-1"
                        />
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => setEditingId(null)}>
                          Ferdig
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="font-medium truncate">{image.alt || "Ingen beskrivelse"}</p>
                      <p className="text-sm text-gray-500 truncate">{image.src || "Ingen bilde valgt"}</p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 flex-shrink-0">
                  <Button size="sm" onClick={() => handleEdit(image.id)} className="z-10 relative">
                    {editingId === image.id ? (
                      "Lukk"
                    ) : (
                      <>
                        <Edit className="h-4 w-4 mr-1" />
                        Rediger
                      </>
                    )}
                  </Button>

                  {images.length > 1 && (
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(index)}
                      className="z-10 relative"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Slett
                    </Button>
                  )}

                  <div className="flex gap-1">
                    {index > 0 && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => moveImage(index, index - 1)}
                        className="z-10 relative"
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                    )}

                    {index < images.length - 1 && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => moveImage(index, index + 1)}
                        className="z-10 relative"
                      >
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
