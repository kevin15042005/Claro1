import {Navigate} from "react-router-dom"

export  default function RutaProtegida({children}){
    const ingreso = localStorage.getItem("ingreso") === "true";
     if(!ingreso ){
        return <Navigate to ="/" replace/>
     }
     return  children;
}