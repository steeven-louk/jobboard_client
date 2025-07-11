import React, { useState } from "react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";

import { applyToJob } from "../services/applicationService";

import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";

interface Props {
  jobId: number;
  companyName: string;
  jobTitle: string;
}

export const DrawerForm = ({ jobId, companyName, jobTitle }: Props) => {
  const [coverLetter, setCoverLetter] = useState<string>("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

  // ✅ Gestion du fichier CV
  // const handleCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;

  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     setCv({ CV: reader.result as string });
  //   };
  //   reader.readAsDataURL(file);
  // };
    const handleCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setCvFile(file || null); // Stocke le File object ou null
  };


  const postJob = async (e: React.FormEvent) => {
    e.preventDefault(); // Empêche le rechargement de la page par défaut
    setIsLoading(true); // Active l'état de chargement

    try {
      // Appel à applyToJob avec le fichier CV (cvFile) et la lettre de motivation (coverLetter).
      // Le service applyToJob est responsable de l'upload du fichier si cvFile est un objet File.
      const applicationResponse = await applyToJob(jobId, cvFile, coverLetter);

      // Si applyToJob réussit, il retourne une réponse (non null/undefined) et gère son propre toast.success.
      if (applicationResponse) {
        setOpen(false); // Ferme le tiroir
        setCoverLetter(""); // Réinitialise le champ de la lettre de motivation
        setCvFile(null); // Réinitialise l'état du fichier CV
        // L'input de type file est réinitialisé visuellement par le navigateur
        // lorsque l'état du fichier est mis à null.
      } else {
        // Ce bloc est un garde-fou. Normalement, `applyToJob` devrait lancer une erreur
        // si l'opération ne réussit pas, et le `catch` block la gérerait.
        // Il est ici au cas où `applyToJob` retournerait `null` ou `undefined` sans erreur.
        toast.error("La candidature n'a pas pu être traitée correctement.");
      }
    } catch (error: any) {
      // Le service `applyToJob` affiche déjà un toast.error et log l'erreur.
      // Il n'est donc pas nécessaire de dupliquer ces actions ici,
      // sauf si un traitement spécifique à ce composant est requis.
      console.error("❌ Erreur lors de l'envoi de la candidature depuis le formulaire:", error);
      // toast.error("❌ Échec de l'application au job"); // Commenté pour éviter les toasts en double
    } finally {
      setIsLoading(false); // Désactive toujours l'état de chargement, que l'opération réussisse ou échoue
    }
  };
  
  return (
    <div>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button>Postuler maintenant</Button>
        </DrawerTrigger>
        <DrawerContent className="md:max-w-[54rem] w-full mx-auto">
          <DrawerHeader className="shadow-md shadow-black">
            <DrawerTitle className="uppercase font-semibold text-xl tracking-widest">
              {companyName}
            </DrawerTitle>
            <DrawerDescription className="font-bold text-1xl capitalize">
              {jobTitle}
            </DrawerDescription>
          </DrawerHeader>
          <Separator className="my-4" />

          <ScrollArea className="h-[43rem] md:h-[36rem]">
            <form onSubmit={postJob} className="p-4">
              <div className="information mx-auto text-center mb-3">
                <h1 className="font-bold text-2xl md:text-5xl">
                  Mes informations
                </h1>
              </div>
              <Separator />

              <div className="parcours my-5">
                <h1 className="font-bold text-2xl">Mon parcours</h1>

                <div className="form-group mt-5">
                  <Label htmlFor="cv" className="mb-2">
                    CV (PDF)
                  </Label>
                  <Input
                    disabled={isLoading}
                    name="CV"
                    accept=".pdf,.doc,.docx"
                    onChange={handleCvChange}
                    type="file"
                    id="cv"
                    // Utilisation de la prop `key` pour forcer la réinitialisation visuelle de l'input file
                    // lorsque `cvFile` est null (après soumission réussie ou annulation).
                    key={cvFile ? "file-selected" : "file-unselected"}
                  />
                </div>
              </div>
              <Separator className="my-4" />
              <div className="parcours gap-3 flex flex-col">
                <h1 className="font-bold text-2xl">Lettre de motivation</h1>
                <div className="grid w-full gap-1.5">
                  <Textarea
                    disabled={isLoading}
                    value={coverLetter} 
                    onChange={(e) => setCoverLetter(e.target.value)} 
                    className="h-[10rem]"
                    placeholder="Tapez votre message ici."
                  />
                  <p className="text-sm text-muted-foreground">
                    Expliquez-nous pourquoi vous souhaitez nous{" "}
                    <span className=" underline-offset-4 underline decoration-green-600">
                      rejoindre !
                    </span>
                  </p>
                </div>
              </div>

              <Separator className="my-4" />
              <h1 className="font-bold text-2xl">
                Conditions générales d&apos;utilisation
              </h1>
              <div className="flex items-center space-x-2 my-5">
                <Checkbox id="terms" required name="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Accept terms and conditions
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="donnee" required />
                <label
                  htmlFor="donnee"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  J&apos;Accepte que mes données soient traitées par
                  (l&apos;entreprise) dans le cadre de ma candidature.
                </label>
              </div>

              <DrawerFooter>
                {/* Le bouton de soumission du formulaire */}
                <Button disabled={isLoading} type="submit">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      envoi de candidature en cours...
                    </>
                  ) : (
                    "J'envoie ma candidature"
                  )}
                </Button>
                <DrawerClose>
                  {/* Le bouton d'annulation, avec type="button" pour éviter la soumission du formulaire */}
                  <Button disabled={isLoading} variant="outline" type="button">
                    Annuler
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
