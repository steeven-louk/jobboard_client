import { toast } from "sonner";
import api from "./api";
import { handleUpload } from "./companyService";

interface IApplication {
  id: string;
  jobId: number;
  coverLetter: string;
  cv_url: string;
  status: string;
  createdAt: string;
  user: {
    fullName: string;
    email: string;
    phone: string;
    picture: string;
  };
}

interface IApplyResponse {
  status: number;
  message: string;
  data?: IApplication
}


export const getUserApplications = async ():Promise<IApplication[] | void> => {
  try {
    const application = await api.get("/user/applications/");
    if(application.status === 200){
        const {data} =  application
        return data?.applications || [];
      }
      
  } catch (error:any) {
    toast("Erreur", {
      description: "Erreur lors de la récupération des candidatures",
    })
    throw new Error(error.response?.data || "Erreur de récupération des candidatures");
  }
};

export const getApplication = async (id: string):Promise<IApplication | void> => {
  try {
    const application = await api.get(`/user/application/${Number(id)}`);
    if(application.status === 200){
        const {data} =  application
        console.log(data);
        return data?.application || null;
      }
  } catch (error:any) {
    toast("Erreur", {
      description: "Erreur lors de la récupération de la candidature",
    })
    throw new Error( error.response?.data || "Erreur de récupération de la candidature");
  }
};


export const changeStatus =async(application:IApplication,newStatus:string):Promise<void>=>{
   try {
    const id:string = application.id
    if(!id){
      throw new Error("ID de candidature manquant.")
    }
    const response = await api.put(`/company/company-jobStatus/${id}`,{
        status:newStatus
      },);

    if(response.status ===200){
      toast(`Status mis à jour: ${newStatus}`)
        console.log(`Status mis à jour: ${newStatus}`, response)
    }
   } catch (error) {
    console.error("❌ Erreur lors du changement de statut :", error);

   }
}


export const applyToJob = async (jobId: number, CV: File | string | null, LM: string):Promise<IApplyResponse | void> => {
  try {
    const userId = "cm84lf7to0006jnx0uib57z1q";

    // 📌 Vérifier si le CV est un fichier, sinon garder l'URL existante
    if (CV && CV instanceof File) {
      try {
        const uploadResponse = await handleUpload("CV", userId, CV);
        if (!uploadResponse || !uploadResponse.fileUrl) {
          toast.error("L'upload du CV a échoué. Annulation de la candidature.");
          console.error("❌ L'upload du CV a échoué.");
          throw new Error("L'upload du CV a échoué."); // Stopper la suite du code
        }
        CV = uploadResponse.fileUrl; // 🔹 Met à jour `CV` avec l'URL du fichier
        console.log("✅ CV uploadé:", CV);
      } catch (uploadError) {
        console.error("❌ Erreur lors de l'upload du CV:", uploadError);
        throw new Error("Erreur lors de l'upload du CV.");
      }
    }

    // 📌 Envoi de la candidature à l'API
    const response = await api.post(`/user/apply_job/${jobId}`, {
      jobId,
      coverLetter: LM,
      cv_url: CV,
    });

    if (response.status === 201 || response.status === 200) {
      toast.success("Candidature envoyée avec succès !");
      return response.data;
    }

    throw new Error("Erreur inconnue lors de la candidature.");
    // return response;

  } catch (error:any) {
    console.error("❌ Erreur de candidature:", error.response?.data || error.message);
    toast.error("Erreur lors de la candidature. Veuillez réessayer.");
    throw new Error(error.response?.data?.message || "Erreur de candidature.");
  }
};