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
import { useSession } from 'next-auth/react';
import { handleAddExperience, handleUpdateExperience } from "@/app/services/experienceService";
import { toast } from "sonner";

interface Experience {
  id?: number;
  title: string;
  entreprise: string;
  location: string;
  contract: string;
  date_debut: string;
  date_fin: string;
  description: string;
  competence: string;
  en_cours: boolean;
}

interface Props {
  experience?: Experience; // Rend la prop optionnelle pour l'ajout
}

export default function ExperienceModal({ experience }: Props) {
  // const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IlVTRVIiLCJpYXQiOjE3Mzg0NDE3ODksImV4cCI6MTczODcwMDk4OX0.mVzwrxHTH3oCkrsVUPzLP3uJ6EfLYXWXem065oC30tE";
  const BASE_URL = "http://localhost:5800/api/user/profil/experience";

    const {data:session} = useSession()
    
    const AUTH_TOKEN:string = session?.user?.token;
  // Définir les valeurs par défaut si aucune expérience n'est fournie (mode ajout)
  const [formData, setFormData] = useState<Experience>(
    experience || {
      title: "",
      entreprise: "",
      location: "",
      contract: "",
      date_debut: "",
      date_fin: "",
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
        const response = await handleUpdateExperience(experience?.id,formData)
        if(response?.status === 200){
          console.log("Expérience mise à jour :", response);

          toast("Expérience mise à jour");
        }

      } else {
        // Ajout
        const response = await handleAddExperience(formData);
        if(response?.status === 201){

          toast("Nouvelle expérience ajoutée");
          console.log("Nouvelle expérience ajoutée :", response?.data);
        }
      }
    } catch (error) {
      toast("Erreur", {
              description: "Erreur lors de l'opération",
            })
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
      <DialogContent className="max-w-[425px] md:max-w-[35em]">
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
              { label: "Date de debut", name: "date_debut", type: "date" },
              { label: "Date de fin", name: "date_fin", type: "date" },
              { label: "Description", name: "description" },
              { label: "Compétence", name: "competence", placeholder:"separé vos competences d'une virgule" },
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
          <DialogFooter className="">
            <Button className="max-w-44 w-full font-semibold uppercase" type="submit">{experience ? "Modifier" : "Ajouter"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
