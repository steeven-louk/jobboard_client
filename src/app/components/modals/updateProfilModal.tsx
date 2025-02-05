import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PenIcon, PlusIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";

interface Experience {
  id?: number;
  title: string;
  entreprise: string;
  location: string;
  contract: string;
  date: string;
  description: string;
  competence: string;
  en_cours: boolean;
}

interface Props {
  experience?: Experience; // Rend la prop optionnelle pour l'ajout
}

export default function ExperienceModal({ experience }: Props) {
  const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IlVTRVIiLCJpYXQiOjE3Mzg0NDE3ODksImV4cCI6MTczODcwMDk4OX0.mVzwrxHTH3oCkrsVUPzLP3uJ6EfLYXWXem065oC30tE";
  const BASE_URL = "http://localhost:5800/api/user/profil/experience";

  // Définir les valeurs par défaut si aucune expérience n'est fournie (mode ajout)
  const [formData, setFormData] = useState<Experience>(
    experience || {
      title: "",
      entreprise: "",
      location: "",
      contract: "",
      date: "",
      description: "",
      competence: "",
      en_cours: false,
    }
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleCheckboxChange(checked: boolean) {
    setFormData((prev) => ({ ...prev, en_cours: checked }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (experience) {
        // Mise à jour
        const response = await axios.put(`${BASE_URL}/${experience.id}`, formData, {
          headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
        });
        console.log("Expérience mise à jour :", response.data);
      } else {
        // Ajout
        const response = await axios.post(BASE_URL, formData, {
          headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
        });
        console.log("Nouvelle expérience ajoutée :", response.data);
      }
    } catch (error) {
      console.error("Erreur lors de l'opération", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="inline-flex md:gap-4 md:align-baseline">
          {experience ? <PenIcon /> : <PlusIcon />}
          <span className="md:block hidden">
            {experience ? "Modifier" : "Ajouter"}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {experience ? "Modifier l'expérience" : "Ajouter une expérience"}
          </DialogTitle>
          <DialogDescription>
            {experience
              ? "Modifiez les détails de votre expérience et enregistrez vos changements."
              : "Ajoutez une nouvelle expérience professionnelle."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {[
              { label: "Titre", name: "title" },
              { label: "Entreprise", name: "entreprise" },
              { label: "Localisation", name: "location" },
              { label: "Contrat", name: "contract" },
              { label: "Date", name: "date", type: "date" },
              { label: "Description", name: "description" },
              { label: "Compétence", name: "competence" },
            ].map(({ label, name, type = "text" }) => (
              <div key={name} className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor={name} className="text-right">
                  {label}
                </Label>
                <Input
                  id={name}
                  name={name}
                  type={type}
                  value={formData[name as keyof Experience]}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
            ))}
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="flex space-x-2">
                <Checkbox
                  id="en_cours"
                  checked={formData.en_cours}
                  onCheckedChange={handleCheckboxChange}
                />
                <Label htmlFor="en_cours">En cours</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">{experience ? "Enregistrer" : "Ajouter"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
