import { toast } from "sonner";
import api from "./api";



export const getAllJob = async()=>{
    try {
        const response = await api.get("/jobs");
        if (response.status === 200) {
        return response?.data?.jobs
        }
      } catch (error) {
        toast("Erreur", {
          description: "Erreur lors de la récupération des jobs",
        });
          console.error("Erreur lors de la récupération des jobs :", error);
        throw error
      }
}

export const getDetailJob = async (id:number) => {
     if(!id)return;
    try {
        const response = await api.get(`/job/${id}`);
        if (response.status === 200) {
            return response.data?.jobs || null;
        }
    } catch (error) {
      toast("Erreur", {
        description: "Erreur lors de la récupération du job",
      });
        console.error("Erreur lors de la récupération du job :", error);
    }
};

export const createJob = async (jobData: any) => {
    try {
        const response = await api.post("/create_job", {
            ...jobData
          })
      return response;
    } catch (error) {
        console.log(error)
        toast("Erreur", {
          description: "Erreur de création d'emploi",
        });
      throw error.response?.data || "Erreur de création d'emploi";
    }
  };