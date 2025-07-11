"use client";
import { useState } from "react";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Company {
  id: string;
  name: string;
  description: string;
  location: string;
  employeeCount?: string;
  domaine?: string;
  logo?: File | string;
  userId: string
}

interface CompanyEditFormProps {
  company?: Company|null;
  onSubmit: (data: Company) => void;
  onCancel: () => void;
}

export function CompanyEditForm({
  company,
  onSubmit,
  onCancel,
}: CompanyEditFormProps) {
  const [formData, setFormData] = useState<Company>(
    company ?? {
      id: "",
      name: "",
      logo: undefined,
      domaine: "",
      location: "",
      employeeCount: "",
      description: "",
      userId: "",
    }
  );
  const [previewLogo, setPreviewLogo] = useState<string | undefined>(
    company?.logo ? (typeof company.logo === "string" ? company.logo : undefined) : undefined
  );
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewLogo(reader.result as string);
        setFormData((prev) => ({ ...prev, logo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center space-x-4 my-4">
        <Image
          src={ typeof previewLogo === 'string' ? previewLogo : "/placeholder.svg"}
          alt="Company logo preview"
          width={100}
          height={150}
          className="rounded-full w-[8rem] h-[8rem] bg-cover  max-w-full max-h-full "
        />
        <div>
          <Label htmlFor="logo">Logo de l&apos;entreprise</Label>
          <Input
            id="logo"
            name="logo"
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
            className="mt-2"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="name">Nom de l&apos;entreprise</Label>
        <Input
          id="name"
          className="mt-3"
          name="name"
          value={formData?.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="domaine">Domaine</Label>
        <Input
          id="domaine"
          className="mt-3"
          name="domaine"
          value={formData?.domaine}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="location">Localisation</Label>
        <Input
          id="location"
          className="mt-3"
          name="location"
          value={formData?.location}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="employeeCount">Nombre d&apos;employés</Label>
        <Select
          required
          onValueChange={(value) => handleSelectChange("employeeCount", value)}
          name="employeeCount"
          value={formData?.employeeCount}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sélectionnez votre nombre d'employées" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1-10">1-10</SelectItem>
            <SelectItem value="11-50">11-50</SelectItem>
            <SelectItem value="51-200">51-200</SelectItem>
            <SelectItem value="200+">200+</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData?.description}
          onChange={handleChange}
          rows={4}
          required
          className="mt-3"
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit">Enregistrer</Button>
      </div>
    </form>
  );
}
