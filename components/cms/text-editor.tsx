"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface TextEditorProps {
  title: string
  value: string
  onChange: (value: string) => void
  multiline?: boolean
  placeholder?: string
}

export default function TextEditor({ title, value, onChange, multiline = false, placeholder }: TextEditorProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [tempValue, setTempValue] = useState(value)

  const handleSave = () => {
    onChange(tempValue)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setTempValue(value)
    setIsEditing(false)
  }

  if (!isEditing) {
    return (
      <div className="border border-gray-200 rounded-lg p-4 bg-white">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-800">{title}</h3>
          <Button size="sm" onClick={() => setIsEditing(true)}>
            Rediger
          </Button>
        </div>
        <div className="text-gray-600 whitespace-pre-wrap">
          {value || <span className="italic text-gray-400">Ingen tekst</span>}
        </div>
      </div>
    )
  }

  return (
    <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
      <Label htmlFor={`editor-${title}`} className="font-semibold text-gray-800 mb-2 block">
        {title}
      </Label>
      {multiline ? (
        <Textarea
          id={`editor-${title}`}
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          placeholder={placeholder}
          rows={6}
          className="mb-3"
        />
      ) : (
        <Input
          id={`editor-${title}`}
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          placeholder={placeholder}
          className="mb-3"
        />
      )}
      <div className="flex gap-2">
        <Button size="sm" onClick={handleSave}>
          Lagre
        </Button>
        <Button size="sm" variant="outline" onClick={handleCancel}>
          Avbryt
        </Button>
      </div>
    </div>
  )
}
