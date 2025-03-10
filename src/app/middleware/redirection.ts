import { useSession } from "next-auth/react";

export const RedirectionRoute =()=>{
    const {status, data:session} = useSession();
    if (status === "unauthenticated"){
        alert("Veuillez vous connectez")
    }
    if(session.user.role ==="RECRUITER"){
        alert("Vous n'etes pas recruteur")
    }


    return ;

}