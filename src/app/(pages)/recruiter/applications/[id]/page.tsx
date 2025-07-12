"use client";

import { use, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ArrowLeft, CalendarDays, FileText, Loader2, Mail, Paperclip, Phone, User } from "lucide-react";

import {
  changeStatus,
  getApplication,
} from "@/app/services/applicationService";
import ProtectedRoute from "@/app/components/protectedRoutes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { ApplicationDetailSkeleton } from "@/app/components/skeletons/Skeletons";

interface IApplicationDetail {
  id: string;
  jobId: number;
  user: {
    fullName: string;
    email: string;
    phone: string;
    picture: string | null;
  };
  status: "PENDING" | "Entretien programmé" | "ACCEPTED" | "REJECTED" | string; // Statuts possibles
  createdAt: string;
  cv_url: string; 
  coverLetter: string; 
  job?: {
    title: string;
  };
}

export default function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [application, setApplication] = useState<IApplicationDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isChangingStatus, setIsChangingStatus] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    const fetchApplicationDetails = async () => {
      setIsLoading(true);
      console.log("ffff");
      try {
      console.log("ffff");
        const data = await getApplication(id);
      console.log("ffff", data);

        if (data) {
          console.log(data)
          setApplication(data);
        } else {
          setApplication(null); // S'assurer que c'est null si aucune donnée
        }
      } catch (error: any) {
        console.error("❌ Erreur lors de la récupération de la candidature :", error);
        toast.error(error.message || "Erreur lors de la récupération de la candidature.");
        setApplication(null); // Réinitialise l'application en cas d'erreur
      } finally {
        setIsLoading(false);
      }
    };
    fetchApplicationDetails();
  }, [id]);

  const handleStatusChange = async (newStatus: string) => {
    if (!application || isChangingStatus) return; // Empêche les clics multiples ou si l'application est null

    setIsChangingStatus(true); 
    try {
      // Met à jour l'état local immédiatement pour une meilleure réactivité de l'UI
      setApplication({ ...application, status: newStatus });
      await changeStatus(application, newStatus); // Passe l'ID et le nouveau statut
      // toast.success(`Statut mis à jour à : ${newStatus}`);
    } catch (error: any) {
      console.error("❌ Erreur lors du changement de statut :", error);
      toast.error(error.message || "Erreur lors de la mise à jour du statut.");
      // Optionnel: Revenir à l'ancien statut si l'API échoue
      setApplication(prev => prev ? { ...prev, status: status } : null);
    } finally {
      setIsChangingStatus(false); 
    }
  };

  // Affiche un skeleton de page pendant le chargement
  if (isLoading) {
    return <ApplicationDetailSkeleton />;
  }

    if (!application) {
    return (
      <ProtectedRoute requiredRole="RECRUITER">
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl font-bold text-gray-700">Candidature non trouvée</h1>
          <p className="mt-4 text-gray-500">Désolé, la candidature que vous recherchez n&apos;existe pas ou a été supprimée.</p>
          <Button onClick={() => router.back()} className="mt-6">
            <ArrowLeft className="mr-2 h-4 w-4" /> Retour
          </Button>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute requiredRole="RECRUITER">
      <div className="container mx-auto px-4 py-8">
        <Button onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Retour
        </Button>
        <h1 className="text-3xl font-bold mb-6">Détails de la candidature</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Colonne principale : Profil, CV, Lettre de motivation */}
          <Card className="md:col-span-2 shadow-md">
            <CardHeader>
              <CardTitle className="capitalize text-xl font-bold">
                Candidature pour : {application?.job?.title || "Titre du job inconnu"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="profile">Profil</TabsTrigger>
                  <TabsTrigger value="resume">CV</TabsTrigger>
                  <TabsTrigger value="coverLetter">Lettre de motivation</TabsTrigger>
                </TabsList>

                {/* Contenu de l'onglet "Profil" */}
                <TabsContent
                  value="profile"
                  className="flex flex-col md:flex-row flex-wrap-reverse md:justify-between items-center md:items-start mt-4"
                >
                  <div className="space-y-4 flex-1 min-w-[50%]">
                    <div>
                      <Label className="text-gray-600 flex items-center gap-2 mb-1"><User className="h-4 w-4" />Nom complet</Label>
                      <p className="font-semibold text-lg">{application?.user.fullName}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600 flex items-center gap-2 mb-1"><Mail className="h-4 w-4" />Email</Label>
                      <p className="text-blue-600 hover:underline">{application?.user.email}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600 flex items-center gap-2 mb-1"><Phone className="h-4 w-4" />Téléphone</Label>
                      <p>{application?.user.phone}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600 flex items-center gap-2 mb-1"><CalendarDays className="h-4 w-4" />Date de candidature</Label>
                      <p>
                        {new Date(application.createdAt).toLocaleDateString("fr-FR")}
                      </p>
                    </div>
                  </div>
                  <div className="img my-auto mt-4 md:mt-0 md:ml-4">
                    <Image
                      src={application?.user.picture || "/placeholder.svg"}
                      width={170}
                      height={170}
                      className="object-cover rounded-md border-2 border-gray-200"
                      alt={application?.user.fullName || "Photo de profil"}
                    />
                  </div>
                </TabsContent>

                {/* Contenu de l'onglet "CV" */}
                <TabsContent value="resume" className="mt-4">
                  <div className="space-y-4">
                    {application.cv_url ? (
                      <Button variant="outline" asChild>
                        <a
                          href={application.cv_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <FileText className="h-4 w-4" />
                          Voir le CV (PDF)
                        </a>
                      </Button>
                    ) : (
                      <p className="text-gray-500">Aucun CV disponible.</p>
                    )}
                  </div>
                </TabsContent>

                {/* Contenu de l'onglet "Lettre de motivation" */}
                <TabsContent value="coverLetter" className="mt-4">
                  <div className="space-y-4">
                    {/* Si coverLetter est une URL de fichier */}
                    {application.coverLetter.startsWith("http") || application.coverLetter.startsWith("/") ? (
                      <Button variant="outline" asChild>
                        <a
                          href={application.coverLetter}
                          download // Propose le téléchargement
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <Paperclip className="h-4 w-4" />
                          Télécharger la lettre de motivation
                        </a>
                      </Button>
                    ) : null}

                    {/* Si coverLetter est du texte brut */}
                    <div className="mt-4">
                      <Label className="text-gray-600">Contenu de la lettre de motivation</Label>
                      <p className="mt-2 whitespace-pre-line p-3 border rounded-md bg-gray-50 text-gray-800">
                        {application.coverLetter || "Aucune lettre de motivation fournie."}
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Colonne latérale : Actions (changement de statut, contacter, planifier) */}
          <Card className="h-fit shadow-md">
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="status" className="text-gray-600">Statut de la candidature</Label>
                <Select
                  onValueChange={handleStatusChange}
                  value={application.status} // Utilise la valeur actuelle de l'application
                  disabled={isChangingStatus} // Désactive le select pendant le changement de statut
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Sélectionner un statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PENDING">En attente</SelectItem>
                    <SelectItem value="Entretien programmé">Entretien programmé</SelectItem>
                    <SelectItem value="ACCEPTED">Acceptée</SelectItem>
                    <SelectItem value="REJECTED" className="text-red-600">Refusée</SelectItem>
                  </SelectContent>
                </Select>
                {isChangingStatus && (
                  <p className="text-sm text-gray-500 mt-1 flex items-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  </p>
                )}
              </div>
              <Button className="w-full">Contacter le candidat</Button>
              <Button variant="outline" className="w-full">
                Planifier un entretien
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}
