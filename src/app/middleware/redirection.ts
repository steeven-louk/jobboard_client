import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

export const RedirectionRoute =()=>{
    const {status, data:session} = useSession();
    if (status === "unauthenticated"){
        alert("Veuillez vous connectez")
        toast.error("Veuillez vous connectez");
    }
    if(session?.user?.role ==="RECRUITER"){
        alert("Vous n'etes pas recruteur")
        toast.error("Veuillez vous connectez");
    }


    return ;

}