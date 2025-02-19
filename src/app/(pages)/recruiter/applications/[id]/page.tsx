"use client"

import { useEffect, useState } from "react"
// import { useRouter } from "next/navigation"
import { useSearchParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Paperclip } from "lucide-react"
import axios from "axios";
import { useSession } from 'next-auth/react';


interface Application {
    id: string
    jobTitle: string
    fullName: string
    email: string
    phone: string
    status: string
    createdAt: string
    cv_url: string
    coverLetter: string
  }

export default function ApplicationDetailPage() {
//   const [status, setStatus] = useState()
  const [application, setApplication] = useState<Application | null>(null)
  const [jobTitle, setJobTitle] = useState<string | null>(null)

  const router = useRouter()
  const searchParams = useSearchParams();

    const {data:session} = useSession()
    
    const AUTH_TOKEN:string = session?.user?.token;

  useEffect(() => {
const applications = searchParams.get("data");

    const applicationData = applications ? JSON.parse(applications) : null;

    const job_title = searchParams.get("jobTitle")
    if (applicationData) {
      setApplication(applicationData)
    }
    if(job_title){
        setJobTitle(job_title)
    }
  }, [searchParams])

  const handleStatusChange = async (newStatus: string) => {
    if (application) {
      setApplication({ ...application, status: newStatus })
      const updateStatus = await axios.put(`http://localhost:5800/api/company/company-jobStatus/${application.id}`,{
        status:newStatus
      },{
        headers: { Authorization: `Bearer ${AUTH_TOKEN}` }
      })
      if(updateStatus.status ===200){

          console.log(`Status updated to: ${newStatus}`, updateStatus)
      }
    }
  }

  if (!application) {
    return <div>Loading...</div>
  }


  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="outline" onClick={() => router.back()} className="mb-4">
        &larr; Retour
      </Button>
      <h1 className="text-3xl font-bold mb-6">Détails de la candidature</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="capitalize text-xl font-bold">{jobTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="profile" className="w-full">
              <TabsList>
                <TabsTrigger value="profile">Profil</TabsTrigger>
                <TabsTrigger value="resume">CV</TabsTrigger>
                <TabsTrigger value="coverLetter">Lettre de motivation</TabsTrigger>
              </TabsList>
              <TabsContent value="profile">
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
                    <p>{new Date(application.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="resume">
                <div className="space-y-4">
                  <Button variant="outline" asChild>
                    <a href={application.cv_url} target="_blank" rel="noopener noreferrer">
                      <FileText className="mr-2 h-4 w-4" />
                      Voir le CV
                    </a>
                  </Button>
                  {/* Here you could add a CV preview if you have a PDF viewer component */}
                </div>
              </TabsContent>
              <TabsContent value="coverLetter">
                <div className="space-y-4">
                  <Button variant="outline" asChild>
                    <a href={application.coverLetter} download={true} target="_blank" rel="noopener noreferrer">
                      <Paperclip className="mr-2 h-4 w-4" />
                      Télécharger la lettre de motivation
                    </a>
                  </Button>
                  <div className="mt-4">
                    <Label>Contenu de la lettre de motivation</Label>
                    <p className="mt-2 whitespace-pre-wrap">{application.coverLetter}</p>
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
              <Select onValueChange={handleStatusChange} defaultValue={application.status}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Sélectionner un statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PENDING">En attente</SelectItem>
                  <SelectItem value="Entretien programmé">Entretien programmé</SelectItem>
                  <SelectItem value="ACCEPTED">Acceptée</SelectItem>
                  <SelectItem value="REJECTED" className="bg-red-500">Refusée</SelectItem>
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
  )
}