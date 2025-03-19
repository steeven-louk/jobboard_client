// import { useSession } from "next-auth/react";
import { toast } from "sonner";
import api from "./api";

export const getCompanies = async () => {
    try {
        const response = await api.get("/company/all-companies");
        if (response.status === 200) {
            const { data } = response;
            // console.log("companyyy", data);
            return data?.companies;
        }
    } catch (error) {
        toast("Erreur", {
            description: "Erreur lors de la récupération des entreprise",
          })
        console.error("Erreur lors de la récupération des entreprises :", error);
        return null;
    }
};

export const getCompanyDetail = async (id: string) => {
    try {
        const companyId = parseInt(id);
        if (isNaN(companyId)) throw new Error("ID invalide");

        const response = await api.get(`/company/company-detail/${companyId}`);
        if (response.status === 200) {
            const { data } = response;
            // console.log("companyyy", data);
            return data?.company;
        }
    } catch (error) {
        toast("Erreur", {
            description: "Erreur lors de la récupération des détails de l'entreprise",
          })
        console.error("Erreur lors de la récupération des détails de l'entreprise :", error);
        return null;
    }
};

// const { data: session } = useSession();
export const updateCompany = async (id: string,userId:string, data: { name?: string;description?:string;domaine?:string;location?:string; logo?: File }) => {
    //   const userId: string = session?.user?.id || "";
    try {
        const companyId = parseInt(id);
        if (isNaN(companyId)) throw new Error("ID invalide");

        // ✅ Envoi de l'image si elle existe
        if (data.logo && data.logo instanceof File) {
            const uploadResponse = await handleUpload("company_logo", userId, data.logo);
            if (!uploadResponse || !uploadResponse.fileUrl) {
                toast("Erreur", {
                    description: "L'upload du logo a échoué. Annulation de la mise à jour.",
                  })
                console.error("L'upload du logo a échoué. Annulation de la mise à jour.");
                return null; // Ne pas continuer si l'upload échoue
            }
            data.logo = uploadResponse.fileUrl; // Met à jour `data.logo` avec l'URL du fichier
        }

        const response = await api.put(`/company/update-company/${companyId}`, data);
        if (response.status === 200) {
            toast("Mise à jour réussie")
            console.log("Mise à jour réussie :", response.data);
            return response.data?.company;
        }
    } catch (error) {
        toast("Erreur", {
            description: "Erreur lors de la mise à jour de l'entreprise",
          })
        console.error("Erreur lors de la mise à jour de l'entreprise :", error);
        return null;
    }
};

export const handleUpload = async (type: string, userId: string, file: File | null) => {
    if (!file) {
        toast("Aucun fichier fourni !")
        console.error("Aucun fichier fourni !");
        return;
    };
    if(!(file instanceof File)){
        toast("Le fichier n'est pas valide")

        console.error("Le fichier n'est pas valide :", file);
        return;
    }

try {
        const formData = new FormData();
        formData.append("file", file);
        console.log("FormData en cours d'envoi :", formData.get("file"));
        
        const response = await api.post(`/upload/${type}/${userId}`, formData,
             {
            headers: { "Content-Type": "multipart/form-data" },
        }
    );

        console.log("Réponse de l'upload :", response.data);
        return response.data;
    } catch (error) {
        toast("Erreur", {
            description: "Erreur lors de l'upload",
          })
        console.error("Erreur lors de l'upload :", error);
        return null;
    }
};

export const getCompanyJobs = async () => {
    try {
        const response = await api.get("/company/company-job");
        if (response.status === 200) {
            return response.data?.jobs;
        }
    } catch (error) {
        toast("Erreur", {
            description: "Erreur lors de la récupération des offres d'emploi",
          })
        console.error("Erreur lors de la récupération des offres d'emploi :", error);
        return null;
    }
};

export const getCompanyApplyJobs = async () => {
    try {
        const response = await api.get("/company/company-applyJob");
        if (response.status === 200) {
            return response.data?.applyJobs;
        }
    } catch (error) {
        toast("Erreur", {
            description: "Erreur lors de la récupération des candidatures",
          })
        console.error("Erreur lors de la récupération des candidatures :", error);
        return null;
    }
};


// import api from "./api";


// export const getCompanies =async()=>{
//     try {
//         const response = await api.get("/company/all-companies");
//         if(response.status ===200){
//             const {data} = response
//             console.log("companyyy", data);
//             return data?.companies

//         }
//     } catch (error) {
//         console.log("erreur lors de la recuperation des company",error)
//     }
// }

// export const getCompanyDetail =async(id: string)=>{
//     try {
//         const response = await api.get(`/company/company-detail/${parseInt(id)}`);
//         if(response.status ===200){
//             const {data} = response
//             console.log("companyyy", data);
//             return data?.company

//         }
//     } catch (error) {
//         console.log("erreur lors de la recuperation des detail company",error)
//     }
// }

// export const updateCompany =async(id:string, data)=>{
//     try {
//         const response = await api.put(`/company/update-company/${parseInt(id)}`,{data});
//         await handleUpload("company_logo","cm7kl40fz0006jnq8eyvtwjhn",data.logo);
//         if(response.status ===200){
//             const {data} = response
//             console.log("companyyy", data);
//             return data?.company;

//         }
//     } catch (error) {
//         console.log("erreur lors de la recuperation des detail company",error)
//     }
// }

// const handleUpload = async (type:string,userId:string,file:string) => {
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("file", file);
//     try {
//         console.log("formadataaaa", formData)
//        const formddd =await api.post(`/api/upload/${type}/${userId}`, {formData}
//     //     ,
//     //      {
//     //     headers: { "Content-Type": "multipart/form-data" },
//     //     // onUploadProgress: (progressEvent) => {
//     //     //   setUploadProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
//     //     // },
//     //   }
//     );
//     return console.log(formddd);


//     //   setUploadedUrl(response.data.url);
//     //   setPreview(response.data.url); // Met à jour l'aperçu avec l'URL
//     } catch (error) {
//       console.error("Erreur d'upload", error);
//     }
//   };

// export const getCompanyJobs =async()=>{
//     try {
//         const response =await api.get("/company/company-job");
//         if(response.status === 200){
//             const {data} = response
//             return data?.jobs;
//             // console.log("companyJob",data.jobs);
//         }
//     } catch (error) {
//         console.log("erreur lors de la recuperation des données", error);
//     }
// }

// export const getCompanyApplyJobs =async()=>{
//     try {
//         const response =await api.get("/company/company-applyJob");
//         if(response.status === 200){
//             const {data} = response
//             return data?.applyJobs;
//             // console.log("companyJob",data.jobs);
//         }
//     } catch (error) {
//         console.log("erreur lors de la recuperation des données", error);
//     }
// }