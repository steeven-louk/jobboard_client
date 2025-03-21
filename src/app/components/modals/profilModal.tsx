import React, { useState, useEffect } from "react";

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

import { PenIcon } from "lucide-react";

import Image from "next/image";

interface Profil {
  id: string;
  fullName: string;
  domaine: string;
  email: string;
  birthdate: Date |string;
  phone: string;
  sexe: "Homme" | "Femme" | string; // 🔹 Correction du type `boolean` -> string
  picture?: string | File;
  location:string;
}


interface ProfilEditFormProps {
  profil?: Profil; // Rendre le profil optionnel pour éviter les erreurs
  onClose: () => void;
  onOpen?: ()=> void;
  onSubmit: (data: Profil) => void;
}

export default function ProfilModal({
  profil,
  onClose,
  onSubmit,
}: ProfilEditFormProps) {
  const initialData: Profil = profil || {
    id: "",
    fullName: "",
    domaine: "",
    email: "",
    birthdate: "",
    phone: "",
    sexe: "",
    picture: "",
    location: "",
  };

  const [formData, setFormData] = useState<Profil>(initialData);
  const [imagePreview, setImagePreview] = useState(profil?.picture);

  useEffect(() => {
    if (profil) {
      setFormData(profil);
      setImagePreview(profil?.picture);
    }
  }, [profil]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setFormData((prev) => ({ ...prev, picture: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Données envoyées :", formData);
    onSubmit(formData);

    onClose();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="inline-flex md:gap-4 md:align-baseline">
          <PenIcon />
          <span className="md:block hidden">Modifier</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[555px] w-full">
        <DialogHeader>
          <DialogTitle>Modifier votre profil</DialogTitle>
          <DialogDescription>
            Modifiez les détails de votre profil et enregistrez vos changements.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[43rem] md:h-[36rem]">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              {[
                { label: "Nom complet", name: "fullName" },
                { label: "Domaine", name: "domaine" },
                { label: "Email", name: "email", type: "email" },
                { label: "Date de naissance", name: "birthdate", type: "date" },
                { label: "Téléphone", name: "phone", type: "tel" },
              ].map(({ label, name, type = "text" }) => (
                <div key={name} className="flex flex-col gap-2">
                  <Label htmlFor={name}>{label}</Label>
                  <Input
                    id={name}
                    name={name}
                    type={type}
                    // value={formData[name as keyof Profil] || ""}
                    value={
                      name === "birthdate"
                        ? formData.birthdate instanceof Date
                          ? formData.birthdate.toISOString().split("T")[0]
                          : formData.birthdate
                        : (formData[name as keyof Profil] as string) || ""
                    }                    
                    onChange={handleChange}
                    className="col-span-3"
                  />
                </div>
              ))}

              <div className="flex flex-col gap-2">
                <Label htmlFor="picture">Photo</Label>
                <div className="col-span-3 flex flex-col gap-2">
                  {imagePreview && (
                    <Image
                      src={typeof imagePreview === "string" ? imagePreview : ""}
                      width={50}
                      height={50}
                      alt="Aperçu"
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  )}
                  <Input
                    id="picture"
                    name="picture"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label>Sexe</Label>
                <RadioGroup
                  className="flex space-x-2"
                  value={formData?.sexe || ""}
                  onValueChange={(value) => handleSelectChange("sexe", value)}
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
              <Button
                className="max-w-44 w-full uppercase tracking-wide"
                type="submit"
              >
                Enregistrer
              </Button>
            </DialogFooter>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
