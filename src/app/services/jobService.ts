// import { toast } from "sonner";
import { toast } from "react-toastify";
import api from "./api";

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
    name: string ;
  };
}

interface IJobData {
  title: string;
  description: string;
  skill: string;
  requirement: string;
  location: string;
  salary: number;
  duration: string;
  jobType: string;
  expiration_date: string | Date;
}

export const getAllJob = async(): Promise<IJob[]>=>{
    try {
        const response = await api.get("/jobs");
        if (response.status === 200) {
        return response?.data?.jobs as IJob[];
        }
      } catch (error:any) {
        toast.error("Erreur lors de la récupération des jobs");
          console.error("Erreur lors de la récupération des jobs :", error);
        throw new Error(error || "Erreur lors de la récupération des jobs")
      }
      return [];
}

export const getDetailJob = async (id: number): Promise<IJob | null> => {
  if (!id) return null;

  try {
    const response = await api.get(`/job/${id}`);

    if (response.status === 200) {
      return response.data?.jobs || null;
    }
  } catch (error: any) {
    console.error("❌ Erreur lors de la récupération du job :", error);
    toast.error("❌ Erreur lors de la récupération du job.");
    throw new Error(error || "Erreur lors de la récupération du job")

  }

  return null; 
};

export const createJob = async (jobData:IJobData): Promise<IJob[] | void> => {
    try {
        const response = await api.post("/create_job",jobData)
        if (response.status === 201) {
          toast.success("Offre d'emploi créée avec succès !");
          return response.data;
        }
        throw new Error("Erreur inconnue lors de la création de l'emploi.");

    
    } catch (error:any) {
        console.log(error)
        toast.error("Erreur lors de la création de l'emploi");
      throw new Error(error?.response?.data || " Erreur lors de la création de l'emploi");
    }
  };