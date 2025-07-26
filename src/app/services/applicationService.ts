// import { toast } from "sonner";
import { toast } from "react-toastify";
import api from "./api";
import { handleUpload } from "./companyService";
import { getSession } from "next-auth/react";

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
    picture: string | null;
  };
}

interface IApplyResponse {
  status: number;
  message: string;
  data?: IApplication
}


/**
 * @function getUserApplications
 * @description Récupère toutes les candidatures de l'utilisateur actuel.
 * @returns {Promise<IApplication[]>} Une promesse qui résout en un tableau de candidatures.
 * @throws {Error} Lance une erreur si la récupération échoue.
 */
export const getUserApplications = async ():Promise<IApplication[] | void> => {
  try {
    const response = await api.get("/user/applications");
    
    if(response.status === 200){
        return response.data?.applications || [];
      }
       // Si le statut n'est pas 200 mais ne lève pas d'erreur HTTP, on peut considérer cela comme un échec
    throw new Error("Réponse inattendue du serveur lors de la récupération des candidatures.");
      
  } catch (error: any) {
    toast.error("Erreur lors de la récupération des candidatures.");
    console.error("❌ Erreur lors de la récupération des candidatures :", error);
    // Lance une erreur plus spécifique si des données d'erreur sont disponibles
    throw new Error(error.response?.data?.message || "Erreur de récupération des candidatures.");
  }
};

/**
 * @function getApplication
 * @description Récupère une candidature spécifique par son ID.
 * @param {string} id L'ID de la candidature à récupérer.
 * @returns {Promise<IApplication | null>} Une promesse qui résout en la candidature ou null si non trouvée.
 * @throws {Error} Lance une erreur si la récupération échoue.
 */
// void
export const getApplication = async (id: string):Promise<IApplication | null> => {
  try {
    const response = await api.get(`/user/application/${Number(id)}`);
    console.log("response", response)
    if(response.status === 200){
        // const {data} =  application
        console.log("response data", response)
        console.log("application...",response.data);
        return response.data?.application || null;
      }
      // Si le statut n'est pas 200 mais ne lève pas d'erreur HTTP
    throw new Error("Réponse inattendue du serveur lors de la récupération de la candidature.");
  } catch (error:any) {
    toast.error("Erreur lors de la récupération de la candidature.");
    console.error("❌ Erreur lors de la récupération de la candidature :", error);
    throw new Error(error.response?.data?.message || "Erreur de récupération de la candidature.");
  }
};


/**
 * @function changeStatus
 * @description Met à jour le statut d'une candidature.
 * @param {IApplication} application L'objet candidature dont le statut doit être modifié.
 * @param {string} newStatus Le nouveau statut à appliquer.
 * @returns {Promise<void>} Une promesse qui résout une fois le statut mis à jour.
 * @throws {Error} Lance une erreur si la mise à jour échoue.
 */
export const changeStatus =async(application:IApplication,newStatus:string):Promise<void>=>{
   try {
    const {id} = application;

    
    if(!id){
      throw new Error("ID de candidature manquant pour la mise a jour du statut.")
    }

    const response = await api.put(`/company/company-jobStatus/${id}`,{
        status: newStatus,
      });

    if(response.status ===200){
      toast.success(`Status mis à jour: ${newStatus}`)
    } else {
      // Gérer les cas où le statut n'est pas 200 mais pas une erreur HTTP
      throw new Error(`Échec de la mise à jour du statut avec le code : ${response.status}`);
    }
  } catch (error: any) {
    toast.error("❌ Erreur lors du changement de statut.");
    console.error("❌ Erreur lors du changement de statut :", error);
    throw new Error(error.response?.data?.message || "Erreur lors du changement de statut.");
  }
}


/**
 * @function applyToJob
 * @description Permet à un utilisateur de postuler à une offre d'emploi.
 * Gère l'upload du CV si nécessaire et l'envoi de la candidature.
 * @param {number} jobId L'ID de l'offre d'emploi à laquelle postuler.
 * @param {File | string | null} CV Le fichier CV à télécharger ou l'URL d'un CV existant, ou null.
 * @param {string} LM La lettre de motivation.
 * @returns {Promise<IApplyResponse>} Une promesse qui résout avec la réponse de l'API.
 * @throws {Error} Lance une erreur si la candidature échoue à n'importe quelle étape.
 */
export const applyToJob = async (jobId: number, CV: File | string | null, LM: string):Promise<IApplyResponse> => {
  try {
    // const userId = "cm84lf7to0006jnx0uib57z1q";
    //Récupérer l'ID utilisateur de la session NextAuth
    const session = await getSession();
    if (!session?.user?.id) { // Assurez-vous que votre session NextAuth renvoie un 'id' pour l'utilisateur
      toast.error("Vous devez être connecté pour postuler.");
      throw new Error("Utilisateur non authentifié.");
    }
    const userId = session.user.id;

    let cvUrlToUse: string | null = null;

    // 📌 Vérifier si le CV est un fichier, sinon garder l'URL existante
    if (CV instanceof File) {
      try {
        const uploadResponse = await handleUpload("CV", userId, CV);
        if (!uploadResponse || !uploadResponse.fileUrl) {
          toast.error("L'upload du CV a échoué. Annulation de la candidature.");
          console.error("❌ L'upload du CV a échoué.");
          throw new Error("L'upload du CV a échoué.");
        }
        // CV = uploadResponse.fileUrl; // 🔹 Met à jour `CV` avec l'URL du fichier
        cvUrlToUse = uploadResponse.fileUrl; // 🔹 Met à jour `CV` avec l'URL du fichier
        toast.success("CV téléchargé avec succès !");

      } catch (uploadError) {
        console.error("❌ Erreur lors de l'upload du CV:", uploadError);
        toast.error("❌ Erreur lors de l'upload du CV:");
        throw new Error("Erreur lors de l'upload du CV.");
      }
    } else if (typeof CV === 'string') {
      cvUrlToUse = CV; // Si CV est déjà une chaîne (URL), l'utiliser directement
    }

    // 📌 Envoi de la candidature à l'API
    const response = await api.post(`/user/apply_job/${jobId}`, {
      jobId,
      coverLetter: LM,
      cv_url: cvUrlToUse,
    });

    if (response.status === 201 || response.status === 200) {
      toast.success("Candidature envoyée avec succès !");
      return response.data as IApplyResponse;
    }

    // Gérer les cas où le statut n'est pas 200/201 mais pas une erreur HTTP
    throw new Error(`Échec de la candidature avec le code : ${response.status}`);

  } catch (error: any) {
    console.error("❌ Erreur de candidature:", error.response?.data || error.message);
    toast.error("Erreur lors de la candidature. Veuillez réessayer.");
    throw new Error(error.response?.data?.message || "Erreur lors de la candidature.");
  }
};