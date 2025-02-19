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
// import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";
import { useSession } from 'next-auth/react';

interface Diplome {
  id?: number;
  title: string;
  level: string;
  location: string;
  school: string;
  date: string;
  description: string;
  competence: string;
}

interface Props {
  diplome?: Diplome; // Rend la prop optionnelle pour l'ajout
}

export default function DiplomeModal({ diplome }: Props) {
  // const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IlVTRVIiLCJpYXQiOjE3Mzg0NDE3ODksImV4cCI6MTczODcwMDk4OX0.mVzwrxHTH3oCkrsVUPzLP3uJ6EfLYXWXem065oC30tE";
  const BASE_URL = "http://localhost:5800/api/user/profil/diplome";
  const {data:session} = useSession()
  
  const AUTH_TOKEN:string = session?.user?.token;
  // Définir les valeurs par défaut si aucune expérience n'est fournie (mode ajout)
  const [formData, setFormData] = useState<Diplome>(
    diplome || {
      title: "",
      level: "",
      school: "",
      location: "",
      date: "",
      description: "",
      competence: "",
    }
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

//   function handleCheckboxChange(checked: boolean) {
//     setFormData((prev) => ({ ...prev, en_cours: checked }));
//   }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (diplome) {
        // Mise à jour
        const response = await axios.put(`${BASE_URL}/${diplome.id}`, formData, {
          headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
        });
        console.log("Formation mise à jour :", response.data);
      } else {
        // Ajout
        const response = await axios.post(BASE_URL, formData, {
          headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
        });
        console.log("Nouvelle formation ajoutée :", response.data);
      }
    } catch (error) {
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
      <DialogContent className="sm:max-w-[425px]">
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
              { label: "Level", name: "level" },
              { label: "School", name: "school" },
              { label: "Localisation", name: "location" },
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
                  value={formData[name as keyof Diplome]}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
            ))}
            {/* <div className="grid grid-cols-4 items-center gap-4">
              <div className="flex space-x-2">
                <Checkbox
                  id="en_cours"
                  checked={formData.en_cours}
                  onCheckedChange={handleCheckboxChange}
                />
                <Label htmlFor="en_cours">En cours</Label>
              </div>
            </div> */}
          </div>
          <DialogFooter>
            <Button type="submit">{diplome ? "Enregistrer" : "Ajouter"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
