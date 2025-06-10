"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Trash2, Plus } from "lucide-react"
import Image from "next/image"
import ImageField from "./image-field"
import type { PersonInfo } from "@/types/cms"

interface PersonEditorProps {
  title: string
  people: PersonInfo[]
  onChange: (people: PersonInfo[]) => void
}

export default function PersonEditor({ title, people, onChange }: PersonEditorProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [tempPerson, setTempPerson] = useState<PersonInfo | null>(null)

  const handleEdit = (person: PersonInfo) => {
    setEditingId(person.id)
    setTempPerson({ ...person })
  }

  const handleSave = () => {
    if (!tempPerson) return

    const updatedPeople = people.map((p) => (p.id === tempPerson.id ? tempPerson : p))
    onChange(updatedPeople)
    setEditingId(null)
    setTempPerson(null)
  }

  const handleCancel = () => {
    setEditingId(null)
    setTempPerson(null)
  }

  const handleDelete = (id: string) => {
    const updatedPeople = people.filter((p) => p.id !== id)
    onChange(updatedPeople)
  }

  const handleAdd = () => {
    const newPerson: PersonInfo = {
      id: Date.now().toString(),
      name: "",
      title: "",
      phone: "",
      email: "",
      image: "/person-silhouette.png",
    }
    setEditingId(newPerson.id)
    setTempPerson(newPerson)
    onChange([...people, newPerson])
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <Button onClick={handleAdd} size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Legg til person
        </Button>
      </div>

      <div className="grid gap-4">
        {people.map((person) => (
          <Card key={person.id} className={editingId === person.id ? "border-blue-200 bg-blue-50" : ""}>
            <CardContent className="p-4">
              {editingId === person.id && tempPerson ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Navn</Label>
                      <Input
                        value={tempPerson.name}
                        onChange={(e) => setTempPerson({ ...tempPerson, name: e.target.value })}
                        placeholder="Fullt navn"
                      />
                    </div>
                    <div>
                      <Label>Tittel</Label>
                      <Input
                        value={tempPerson.title}
                        onChange={(e) => setTempPerson({ ...tempPerson, title: e.target.value })}
                        placeholder="Stillingstittel"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Telefon</Label>
                      <Input
                        value={tempPerson.phone}
                        onChange={(e) => setTempPerson({ ...tempPerson, phone: e.target.value })}
                        placeholder="XXX XX XXX"
                      />
                    </div>
                    <div>
                      <Label>E-post</Label>
                      <Input
                        value={tempPerson.email}
                        onChange={(e) => setTempPerson({ ...tempPerson, email: e.target.value })}
                        placeholder="navn@kabr.no"
                      />
                    </div>
                  </div>

                  <ImageField
                    label="Profilbilde"
                    value={tempPerson.image}
                    onChange={(value) => setTempPerson({ ...tempPerson, image: value })}
                    placeholder="Last opp profilbilde eller bruk URL"
                  />

                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleSave}>
                      Lagre
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleCancel}>
                      Avbryt
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image
                      src={person.image || "/person-silhouette.png"}
                      alt={person.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold truncate">{person.name || "Ingen navn"}</h4>
                    <p className="text-sm text-gray-600 truncate">{person.title}</p>
                    <p className="text-sm text-gray-600 truncate">
                      {person.phone} • {person.email}
                    </p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Button size="sm" onClick={() => handleEdit(person)}>
                      Rediger
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(person.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
