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

import { FileText, Paperclip } from "lucide-react";

import {
  changeStatus,
  getApplication,
} from "@/app/services/applicationService";
import ProtectedRoute from "@/app/components/protectedRoutes";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Application {
  id: string;
  jobId: number;

  user: {
    fullName: string;
    email: string;
    phone: string;
    picture: string;
  };
  status: string;
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

  const [application, setApplication] = useState<Application | null>(null);

  const router = useRouter();

  useEffect(() => {
    const handleGetApplication = async () => {
      try {
        const data = await getApplication(id);
        if(data)setApplication(data);
      } catch (error) {
        console.log(error);
        throw error;
      }
    };
    handleGetApplication();
  }, [id]);

  const handleStatusChange = async (newStatus: string) => {
    if (application) {
      setApplication({ ...application, status: newStatus });
      await changeStatus(application, newStatus);
    }
  };

  if (!application) {
    return <div>Loading...</div>;
  }

  return (
    <ProtectedRoute requiredRole="RECRUITER">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="mb-4"
        >
          &larr; Retour
        </Button>
        <h1 className="text-3xl font-bold mb-6">Détails de la candidature</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="capitalize text-xl font-bold">
                {application?.job?.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="profile" className="w-full">
                <TabsList>
                  <TabsTrigger value="profile">Profil</TabsTrigger>
                  <TabsTrigger value="resume">CV</TabsTrigger>
                  <TabsTrigger value="coverLetter">
                    Lettre de motivation
                  </TabsTrigger>
                </TabsList>
                <TabsContent
                  value="profile"
                  className="flex flex-wrap-reverse md:justify-between"
                >
                  <div className="space-y-4">
                    <div>
                      <Label>Nom</Label>
                      <p>{application?.user.fullName}</p>
                    </div>
                    <div>
                      <Label>Email</Label>
                      <p>{application?.user.email}</p>
                    </div>
                    <div>
                      <Label>Téléphone</Label>
                      <p>{application?.user.phone}</p>
                    </div>
                    <div>
                      <Label>Date de candidature</Label>
                      <p>
                        {new Date(application.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="img my-auto">
                    <Image
                      src={application?.user.picture}
                      width={170}
                      height={170}
                      className="object-cover rounded-md"
                      alt={application?.user.fullName}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="resume">
                  <div className="space-y-4">
                    <Button variant="outline" asChild>
                      <a
                        href={application.cv_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        Voir le CV
                      </a>
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="coverLetter">
                  <div className="space-y-4">
                    <Button variant="outline" asChild>
                      <a
                        href={application.coverLetter}
                        download={true}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Paperclip className="mr-2 h-4 w-4" />
                        Télécharger la lettre de motivation
                      </a>
                    </Button>
                    <div className="mt-4">
                      <Label>Contenu de la lettre de motivation</Label>
                      <p className="mt-2 whitespace-pre-wrap">
                        {application.coverLetter}
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 ">
              <div>
                <Label htmlFor="status">Statut de la candidature</Label>
                <Select
                  onValueChange={handleStatusChange}
                  defaultValue={application.status}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Sélectionner un statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PENDING">En attente</SelectItem>
                    <SelectItem value="Entretien programmé">
                      Entretien programmé
                    </SelectItem>
                    <SelectItem value="ACCEPTED">Acceptée</SelectItem>
                    <SelectItem value="REJECTED" className="bg-red-500">
                      Refusée
                    </SelectItem>
                  </SelectContent>
                </Select>
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
