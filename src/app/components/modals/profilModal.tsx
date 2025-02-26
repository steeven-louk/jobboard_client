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

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PenIcon, PlusIcon } from "lucide-react";
// import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";
import { useSession } from 'next-auth/react';
import { updateUserProfile } from "@/app/services/profileService";

interface Profil {
  id: number;
  fullName: string;
  domaine: string;
  email: string;
  birthdate: string;
  phone: string;
  sexe: string;
}

interface Props {
  profil: Profil; // Rend la prop optionnelle pour l'ajout
}

export default function ProfilModal({ profil }: Props) {
  // const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IlVTRVIiLCJpYXQiOjE3Mzg0NDE3ODksImV4cCI6MTczODcwMDk4OX0.mVzwrxHTH3oCkrsVUPzLP3uJ6EfLYXWXem065oC30tE";
  const BASE_URL = "http://localhost:5800/api/user/profil/update";
  const {data:session} = useSession()
  
  const AUTH_TOKEN:string = session?.user?.token;

  // Définir les valeurs par défaut si aucune expérience n'est fournie (mode ajout)
  const [formData, setFormData] = useState<Profil>(
   profil || {
    // id: profil?.id,
    fullName: "",
    domaine: "",
    email: "",
    birthdate: "",
    phone:"",
    sexe: "",
    }
  );
  console.log("profillls", formData.id)
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        // Mise à jour
        const response = await updateUserProfile(formData)
        console.log("Profil mise à jour :", response);
    } catch (error) {
      console.error("Erreur lors de l'opération", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="inline-flex md:gap-4 md:align-baseline">
          <PenIcon /> 
          <span className="md:block hidden">
            Modifier
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Modifier votre profil
          </DialogTitle>
          <DialogDescription>
            Modifiez les détails de votre profil et enregistrez vos changements.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {[
              { label: "Nom complet", name: "fullName" },
              { label: "Domaine", name: "domaine" },
              { label: "Email", name: "email" },
              { label: "Birthdate", name: "birthdate", type: "date" },
              { label: "Phone", name: "phone", type:"tel" },
              // { label: "Compétence", name: "competence" },
            ].map(({ label, name, type = "text" }) => (
              <div key={name} className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor={name} className="text-right">
                  {label}
                </Label>
                <Input
                  id={name}
                  name={name}
                  type={type}
                  value={formData[name as keyof Profil]}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
            ))}
            <div className="grid grid-cols-4 items-center gap-4">
                  <RadioGroup  className="flex space-x-2"
                  name="sexe"
                  value={formData.sexe}
                  onValueChange={handleSelectChange("sexe")} 
                    defaultValue={profil?.sexe} 
                    >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Homme" id="Homme" />
                      <Label htmlFor="Homme">Homme</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Femme" id="Femme" />
                      <Label htmlFor="Femme">Femme</Label>
                    </div>
                  </RadioGroup>
            </div>
           
          </div>
          <DialogFooter>
            <Button type="submit">Enregistrer</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
