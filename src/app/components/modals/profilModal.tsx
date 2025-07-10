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

import { Loader2, PenIcon } from "lucide-react";

import Image from "next/image";
import { toast } from "react-toastify";

interface Profil {
  id: string;
  fullName: string;
  domaine: string;
  email: string;
  birthdate: Date |string;
  phone: string;
  sexe: "Homme" | "Femme" | ""; 
  picture?: string | File;
  location:string;
}


interface ProfilEditFormProps {
  profil?: Profil; 
  onClose: () => void;
  onOpen?: ()=> void;
  onSubmit: (data: Profil, file?:File | null) => void;
  onOpenChange?: (open: boolean) => void; 
}

export default function ProfilModal({
  profil,
  onClose,
  onSubmit,
  onOpenChange
}: ProfilEditFormProps) {
  // const initialData: Profil = profil || {
  //   id: "",
  //   fullName: "",
  //   domaine: "",
  //   email: "",
  //   birthdate: "",
  //   phone: "",
  //   sexe: "",
  //   picture: "",
  //   location: "",
  // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const initialData: Profil = profil
    ? {
        ...profil,
        birthdate:
          profil.birthdate instanceof Date
            ? profil.birthdate.toISOString().split("T")[0]
            : profil.birthdate,
        sexe: profil.sexe === "Homme" || profil.sexe === "Femme" ? profil.sexe : "",
        picture: typeof profil.picture === "string" ? profil.picture : undefined, // Ensure picture is string or undefined
      }
    : {
        id: "", // An ID might be generated on the backend for new profiles
        fullName: "",
        domaine: "",
        email: "",
        birthdate: "",
        phone: "",
        sexe: "",
        location: "",
        picture: undefined, // Explicitly undefined for no initial picture
      };

  const [formData, setFormData] = useState<Profil>(initialData);
  const [imageFile, setImageFile] = useState<File | null>(null); // State to hold the actual image file
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    typeof profil?.picture === "string" ? profil.picture : undefined
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // State to control modal open/close


  useEffect(() => {
    if (profil) {
      setFormData(initialData); 
      setImagePreview(typeof profil.picture === "string" ? profil.picture : undefined);
      setImageFile(null); // Reset file when new profil is loaded
    }
  }, [initialData, profil]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 const handleRadioChange = (value: "Homme" | "Femme" | "") => {
    setFormData((prev) => ({ ...prev, sexe: value }));
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file); // Store the actual file
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string); // Set preview to Data URL
      };
      reader.readAsDataURL(file);
    } else {
      setImageFile(null);
      // If no file selected, revert to original picture if available, otherwise clear preview
      setImagePreview(typeof profil?.picture === 'string' ? profil.picture : undefined);
    }
  };

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Pass both formData and the actual imageFile to the onSubmit handler
      await onSubmit(formData, imageFile);
      toast.success("Profil mis à jour avec succès !");
      setIsModalOpen(false); // Close the modal on success
      onClose(); // Call parent's onClose
    } catch (error: any) {
      console.error("❌ Erreur lors de la mise à jour du profil :", error);
      toast.error(error.message || "Erreur lors de la mise à jour du profil.");
    } finally {
      setIsSubmitting(false);
    }
  };
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   onSubmit(formData);

  //   onClose();
  // };

  return (
       <Dialog open={isModalOpen} onOpenChange={(open) => {
      setIsModalOpen(open);
      if (onOpenChange) {
        onOpenChange(open); // Propagate change to parent if needed
      }
      // Reset form data if closing after successfully opening
      if (!open && !isSubmitting) {
        setFormData(initialData);
        setImageFile(null);
        setImagePreview(typeof profil?.picture === 'string' ? profil.picture : undefined);
      }
    }}>
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
        <ScrollArea className="h-[43rem] md:h-[36rem] pr-6">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              {[
                { label: "Nom complet", name: "fullName", required: true },
                { label: "Domaine", name: "domaine", required: true },
                { label: "Email", name: "email", type: "email", required: true },
                { label: "Date de naissance", name: "birthdate", type: "date", required: true },
                { label: "Téléphone", name: "phone", type: "tel", required: true },
                { label: "Localisation", name: "location", required: true },
              ].map(({ label, name, type = "text", required = false }) => (
                <div key={name} className="flex flex-col gap-2">
                  <Label htmlFor={name}>
                    {label}
                    {required && <span className="text-red-500">*</span>}
                  </Label>
                  <Input
                    id={name}
                    name={name}
                    type={type}
                    value={
                      (formData[name as keyof Omit<Profil, 'sexe' | 'picture'>] as string) || ""
                    }
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    required={required}
                  />
                </div>
              ))}

              <div className="flex flex-col gap-2">
                <Label htmlFor="picture">Photo de profil</Label>
                <div className="flex items-center gap-4">
                  {imagePreview && (
                    <Image
                      src={imagePreview}
                      width={80} // Increased size for better preview
                      height={80} // Increased size for better preview
                      alt="Aperçu de la photo de profil"
                      className="w-20 h-20 rounded-full object-cover border border-gray-200"
                    />
                  )}
                  <Input
                    id="picture"
                    name="picture"
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    className="flex-1" // Allows input to take remaining space
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label>Sexe</Label>
                <RadioGroup
                  className="flex space-x-4" 
                  value={formData.sexe || ""}
                  onValueChange={(value: "Homme" | "Femme" | "") => handleRadioChange(value)}
                  disabled={isSubmitting} // Disable radio group during submission
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
            <DialogFooter className="mt-6"> {/* Added margin-top for spacing */}
              <Button
                className="max-w-44 w-full uppercase tracking-wide"
                type="submit"
                disabled={isSubmitting} // Disable button during submission
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enregistrement...
                  </>
                ) : (
                  "Enregistrer"
                )}
              </Button>
            </DialogFooter>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
