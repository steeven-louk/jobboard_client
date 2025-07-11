"use client";
import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { JobCard } from "@/app/components/jobCard";
import { CompanyEditForm } from "@/app/components/company-edit-form";
import { Pagination } from "@/app/components/pagination";
import { getCompanyDetail, updateCompany } from "@/app/services/companyService";
import { toast } from "react-toastify";
import { CompanyProfileSkeleton } from "@/app/components/skeletons/Skeletons";



interface IJob {
  id: number;
  title: string;
  description: string;
  skill: string;
  requirement: string;
  location: string;
  salary: number | null;
  duration: string;
  jobType: string;
  isPremium: boolean;
  createdAt: string | Date;
  company: {
    logo: string | null;
    domaine: string | null;
    name: string
  };
}

interface ICompanyDetail {
  id: string;
  name: string;
  description: string;
  location: string;
  employeeCount?: string;
  domaine?: string;
  logo?: File | string;
  jobs?: IJob[];
  userId: string
}

interface ICompanyEditFormData {
  name?: string;
  description?: string;
  location?: string;
  domaine?: string;
  employeeCount?: string;
  logo?: File | string; // Peut être un fichier pour l'upload ou une URL existante
}

export default function CompanyProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const { data: session, status: sessionStatus } = useSession();
  const userRole = session?.user?.role;
  const userId = session?.user?.id || "";

  const [company, setCompany] = useState<ICompanyDetail | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(true);

  const JOBS_PER_PAGE = 4;

  const verifyUser = userId === company?.userId;

  const fetchCompanyDetails = async () => {
    setIsLoadingPage(true); // Active le chargement de la page
    try {
      const responseData: ICompanyDetail = await getCompanyDetail(id);
      setCompany(responseData || null); // S'assurer que 'company' est null si les données sont vides
    } catch (error: any) {
      toast.error(error.message || "Erreur lors de la récupération du profil de l'entreprise.");
      console.error("❌ Erreur lors de la récupération du profil de l'entreprise :", error);
      setCompany(null); // Réinitialise l'entreprise en cas d'erreur
    } finally {
      setIsLoadingPage(false); // Désactive le chargement de la page
    }
  };

  // Effet pour récupérer les détails de l'entreprise au montage du composant
  useEffect(() => {
    // Ne tente de récupérer les détails que si l'ID est disponible
    if (id) {
      fetchCompanyDetails();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);


  const handleCompanyUpdate = async (updatedCompanyData: ICompanyEditFormData, logoFile?: File | null) => {
    try {
      // Préparer le payload pour l'API, en priorisant le nouveau fichier logo
      const payload = {
        ...updatedCompanyData,
        logo: logoFile || (typeof updatedCompanyData.logo === 'string' ? updatedCompanyData.logo : undefined),
      };
      
      await updateCompany(id, userId, payload);
      toast.success("Profil de l'entreprise mis à jour avec succès !");
      setIsEditModalOpen(false); // Ferme la modale après la mise à jour
      await fetchCompanyDetails(); // Re-charger les détails pour rafraîchir l'UI
    } catch (error: any) {
      toast.error(error.message || "Erreur lors de la modification du profil de l'entreprise.");
      console.error("❌ Erreur lors de la modification du profil de l'entreprise :", error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const totalPages =company?.jobs? Math.ceil(company?.jobs?.length / JOBS_PER_PAGE):0;
  const paginatedJobs = company?.jobs?.slice(
    (currentPage - 1) * JOBS_PER_PAGE,
    currentPage * JOBS_PER_PAGE
  ) || [];

  if (isLoadingPage || sessionStatus === "loading") {
    return <CompanyProfileSkeleton />;
  }

    // Si aucune entreprise n'est trouvée après le chargement
  if (!company) {
    return (
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl font-bold text-gray-700">Entreprise non trouvée</h1>
          <p className="mt-4 text-gray-500">Désolé, l&apos;entreprise que vous recherchez n&apos;existe pas ou a été supprimée.</p>
        </div>
    );
  }
  return (
          <div className="container mx-auto md:px-4 py-8">
        <div className="flex items-center mb-6 flex-col md:flex-row text-center md:text-left">
          {/* Logo de l'entreprise */}
          <Image
            src={typeof company?.logo === "string" ? company?.logo : "/placeholder.svg"}
            alt={`${company?.name || "Entreprise"} logo`}
            width={150}
            height={150}
            className="rounded-full w-[9rem] h-[9rem] object-cover border-2 border-gray-200 mr-4"
          />
          <h1 className="text-3xl font-bold ml-4 mt-4 md:mt-0">{company?.name}</h1>
        </div>

        <div className="md:grid flex flex-col-reverse px-2 md:flex-none md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {/* Section "À propos de l'entreprise" */}
            <Card className="mb-8 shadow-md">
              <CardHeader>
                <CardTitle>À propos de l&apos;entreprise</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-gray-700 dark:text-slate-300">{company?.description || "Aucune description fournie."}</p>
              </CardContent>
            </Card>

            {/* Section "Offres d'emploi actuelles" */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Offres d&apos;emploi actuelles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paginatedJobs.length > 0 ? (
                    paginatedJobs.map((job) => (
                      <JobCard key={job.id} job={job} path={""} />
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">Aucune offre d&apos;emploi disponible pour le moment.</p>
                  )}
                </div>
              </CardContent>
            </Card>
            {/* Pagination des offres d'emploi */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>

          {/* Colonne latérale avec les informations de l'entreprise et les actions du recruteur */}
          <div>
            <Card className="shadow-md mb-4">
              <CardContent className="space-y-2 py-4">
                <p className="text-gray-700 dark:text-gray-100">
                  <strong>Domaine :</strong>{" "}
                  {company?.domaine || "Non mentionné"}
                </p>
                <p className="text-gray-700 dark:text-gray-100">
                  <strong>Localisation :</strong> {company?.location || "Non renseignée"}
                </p>
                <p className="text-gray-700 dark:text-gray-100">
                  <strong>Taille de l&apos;entreprise :</strong>{" "}
                  {company?.employeeCount ? `${company.employeeCount} employés` : "Non spécifié"}
                </p>
              </CardContent>
            </Card>

            {/* Actions du recruteur (visible uniquement si l'utilisateur est un recruteur et propriétaire du profil) */}
            {userRole === "RECRUITER" && verifyUser && (
              <Card className="mt-3 shadow-md"> {/* Removed md:fixed */}
                <CardHeader>
                  <CardTitle>Actions du recruteur</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Link href={`/companies/jobs/new`}>
                    <Button className="w-full">
                      Ajouter une offre d&apos;emploi
                    </Button>
                  </Link>

                  {/* Modale de modification du profil de l'entreprise */}
                  <Dialog
                    open={isEditModalOpen}
                    onOpenChange={setIsEditModalOpen}
                  >
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        Modifier le profil de l&apos;entreprise
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[425px] md:max-w-[45rem] w-full">
                      <DialogHeader>
                        <DialogTitle>
                          Modifier le profil de l&apos;entreprise
                        </DialogTitle>
                      </DialogHeader>
                      <CompanyEditForm
                        company={company}
                        onSubmit={handleCompanyUpdate}
                        onCancel={() => setIsEditModalOpen(false)}
                      />
                    </DialogContent>
                  </Dialog>
                  <Link href="/recruiter/dashboard">
                    <Button variant="secondary" className="w-full">
                      Tableau de bord recruteur
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
  );
}
