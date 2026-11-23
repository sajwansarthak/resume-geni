import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router"
import React from "react";

const Protected = ({children}) =>{
    const { loading,user } = useAuth()

    if(loading){
        return(
            <main className="page-loader" aria-busy="true">
                <span className="page-loader__spinner" />
                <span className="page-loader__text">Loading...</span>
            </main>
        )
    }

    if(!user){
        return <Navigate to={"/login"} replace />
    }
    return children
}

export default Protected
