"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface CompanyEditFormProps {
  company: {
    name: string
    logo: string
    domaine: string
    location: string
    employeeCount: string
    description: string
  }
  onSubmit: (data: CompanyEditFormProps["company"]) => void
  onCancel: () => void
}

export function CompanyEditForm({ company, onSubmit, onCancel }: CompanyEditFormProps) {
  const [formData, setFormData] = useState(company)
  const [previewLogo, setPreviewLogo] = useState(company.logo)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewLogo(reader.result as string)
        setFormData((prev) => ({ ...prev, logo: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center space-x-4 my-4">
        <Image
          src={previewLogo || "/placeholder.svg"}
          alt="Company logo preview"
          width={100}
          height={100}
          className="rounded-full "
        />
        <div>
          <Label htmlFor="logo">Logo de l&apos;entreprise</Label>
          <Input id="logo" name="logo" type="file" accept="image/*" onChange={handleLogoChange} className="mt-1" />
        </div>
      </div>
      <div>
        <Label htmlFor="name">Nom de l&apos;entreprise</Label>
        <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="domaine">Domaine</Label>
        <Input id="domaine" name="domaine" value={formData.domaine} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="location">Localisation</Label>
        <Input id="location" name="location" value={formData.location} onChange={handleChange} required />
      </div>
      {/* <div>
        <Label htmlFor="employeeCount">Nombre d&apos;employés</Label>
        <Input
          id="employeeCount"
          name="employeeCount"
          value={formData.employeeCount}
          onChange={handleChange}
          required
        />
      </div> */}
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          required
          
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit">Enregistrer</Button>
      </div>
    </form>
  )
}