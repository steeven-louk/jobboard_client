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

import {
  handleAddFormation,
  handleUpdateFormation,
} from "@/app/services/diplomeService";
import { toast } from "sonner";

interface Diplome {
  id?: number;
  title: string;
  level: string;
  location: string;
  school: string;
  date_debut: string;
  date_fin: string;
  description?: string;
  competence?: string;
}

interface Props {
  diplome?: Diplome; // Rend la prop optionnelle pour l'ajout
}

export default function DiplomeModal({ diplome }: Props) {
  // Définir les valeurs par défaut si aucune expérience n'est fournie (mode ajout)
  const [formData, setFormData] = useState<Diplome>(
    diplome || {
      title: "",
      level: "",
      school: "",
      location: "",
      date_debut: "",
      date_fin: "",
      description: "",
      competence: "",
    }
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (diplome) {
        // Mise à jour
       await handleUpdateFormation(diplome?.id ?? 0, formData);

      } else {
        // Ajout
      await handleAddFormation(formData);
       
      }
    } catch (error) {
      toast("Erreur", {
        description: "Erreur lors de l'opération",
      });
      console.error("Erreur lors de l'opération", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="inline-flex md:gap-4 md:align-baseline">
          {diplome ? <PenIcon /> : <PlusIcon />}
          <span className="md:block hidden">
            {diplome ? "Modifier" : "Ajouter"}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] md:max-w-[35em]">
        <DialogHeader>
          <DialogTitle>
            {diplome ? "Modifier la formation" : "Ajouter une formation"}
          </DialogTitle>
          <DialogDescription>
            {diplome
              ? "Modifiez les détails de votre formation et enregistrez vos changements."
              : "Ajoutez une nouvelle formation."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {[
              { label: "Titre", name: "title" },
              { label: "Niveau", name: "level" },
              { label: "Etablissement", name: "school" },
              { label: "Localisation", name: "location" },
              { label: "Date de debut", name: "date_debut", type: "date" },
              { label: "Date de fin", name: "date_fin", type: "date" },
              { label: "Description", name: "description" },
              {
                label: "Compétence",
                name: "competence",
                placeholder: "separé vos competences d'une virgule",
              },
            ].map(({ label, name, type = "text" }) => (
              <div key={name} className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor={name} className="text-right">
                  {label}
                </Label>
                <Input
                  id={name}
                  name={name}
                  type={type}
                  value={formData[name as keyof Diplome]}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button
              className="max-w-44 w-full font-semibold uppercase"
              type="submit"
            >
              {diplome ? "Modifier" : "Ajouter"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
