import { toast } from "sonner";
import api from "./api";
import { handleUpload } from "./companyService";

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

export const getApplication = async (id: string) => {
  try {
    const application = await api.get(`/user/application/${Number(id)}`);
    if(application.status === 200){
        const {data} =  application
        console.log(data);
        return data?.application;
      }
  } catch (error) {
    toast("Erreur", {
      description: "Erreur de récupération de la candidature",
    })
    throw error.response?.data || "Erreur de récupération de la candidature";
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


export const applyToJob = async (jobId: number, CV: File | string | null, LM: string) => {
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

    toast.success("Candidature envoyée avec succès !");
    return response;

  } catch (error: any) {
    console.error("❌ Erreur de candidature:", error.response?.data || error.message);
    toast.error("Erreur lors de la candidature. Veuillez réessayer.");
    throw new Error(error.response?.data?.message || "Erreur de candidature.");
  }
};


// export const applyToJob = async ( jobId:number, CV:File | string | null, LM:string) => {
//     try {
//       const userId = "cm84lf7to0006jnx0uib57z1q"
//       if (CV && CV instanceof File) {
//           const uploadResponse = await handleUpload("CV", userId, CV);
//           console.log("uploadResppnse", uploadResponse)
//           if (!uploadResponse || !uploadResponse.fileUrl) {
//               toast("Erreur", {
//                   description: "L'upload du CV a échoué. Annulation de l'ajout'.",
//                 })
//               console.error("L'upload du CV a échoué. Annulation de la mise à jour.");
//               return null; // Ne pas continuer si l'upload échoue
//           }
//           CV = uploadResponse.fileUrl; // Met à jour `data.logo` avec l'URL du fichier
//           console.log("cvvvvResponse", CV);
//         }

//       const response = await api.post(`/user/apply_job/${jobId}`, {
//         // userId,
//         jobId:jobId,
//         coverLetter:LM,
//         cv_url:CV
//       });
//       return response;
//     } catch (error) {
//       toast("Erreur", {
//         description: "Erreur de candidature",
//       })
//       throw error.response?.data || "Erreur de candidature";
//     }
//   };