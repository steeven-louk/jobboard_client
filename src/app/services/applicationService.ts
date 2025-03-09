import { toast } from "sonner";
import api from "./api";

export const getUserApplications = async () => {
  try {
    const application = await api.get("/user/applications/");
    if(application.status === 200){
        const {data} =  application
        return data?.applications;
      }
  } catch (error) {
    toast("Erreur", {
      description: "Erreur de récupération des candidatures",
    })
    throw error.response?.data || "Erreur de récupération des candidatures";
  }
};

export const changeStatus =async(application,newStatus:string)=>{
   try {
    const id:string = application.id
    const response = await api.put(`/company/company-jobStatus/${id}`,{
        status:newStatus
      },);
    if(response.status ===200){
      toast(`Status updated to: ${newStatus}`)
        console.log(`Status updated to: ${newStatus}`, response)
    }
   } catch (error) {
    console.log(error)
   }
}

export const applyToJob = async ( jobId:number, CV:string, LM:string) => {
    try {
      const response = await api.post(`/user/apply_job/${jobId}`, {
        // userId,
        jobId:jobId,
        coverLetter:LM,
        cv_url:CV
      });
      return response;
    } catch (error) {
      toast("Erreur", {
        description: "Erreur de candidature",
      })
      throw error.response?.data || "Erreur de candidature";
    }
  };