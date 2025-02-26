import api from "./api";


export const getCompanies =async()=>{
    try {
        const response = await api.get("/company/all-companies");
        if(response.status ===200){
            const {data} = response
            console.log("companyyy", data);
            return data?.companies

        }
    } catch (error) {
        console.log("erreur lors de la recuperation des company",error)
    }
}

export const getCompanyDetail =async(id: string)=>{
    try {
        const response = await api.get(`/company/company-detail/${parseInt(id)}`);
        if(response.status ===200){
            const {data} = response
            console.log("companyyy", data);
            return data?.company

        }
    } catch (error) {
        console.log("erreur lors de la recuperation des detail company",error)
    }
}

export const updateCompany =async(id:string, data)=>{
    try {
        const response = await api.get(`/company/update-company/${parseInt(id)}`,{data});
        if(response.status ===200){
            const {data} = response
            console.log("companyyy", data);
            return data?.company;

        }
    } catch (error) {
        console.log("erreur lors de la recuperation des detail company",error)
    }
}

export const getCompanyJobs =async()=>{
    try {
        const response =await api.get("/company/company-job");
        if(response.status === 200){
            const {data} = response
            return data?.jobs;
            // console.log("companyJob",data.jobs);
        }
    } catch (error) {
        console.log("erreur lors de la recuperation des données", error);
    }
}

export const getCompanyApplyJobs =async()=>{
    try {
        const response =await api.get("/company/company-applyJob");
        if(response.status === 200){
            const {data} = response
            return data?.applyJobs;
            // console.log("companyJob",data.jobs);
        }
    } catch (error) {
        console.log("erreur lors de la recuperation des données", error);
    }
}