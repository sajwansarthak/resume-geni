//creating hook layer used to manage our state layer and api layer

import { useContext } from "react";
//importing our state layer
import { AuthContext } from "../auth.context";
//importing our api layer
import { login, register, logout } from "../services/auth.api";

export const useAuth = () =>{

    const context = useContext(AuthContext)

    if(!context){
        throw new Error("useAuth must be used within AuthProvider")
    }

    const { user, setUser, loading } = context

    //errors are re-thrown so the form can show them to the user
    const handleLogin = async ({ email, password }) => {
        const data = await login({ email, password })
        setUser(data.user)
        return data.user
    }

    const handleRegister = async ({ username, email, password }) => {
        const data = await register({ username, email, password })
        setUser(data.user)
        return data.user
    }

    const handleLogout = async () =>{
        try{
            await logout()
        }finally{
            //clear the user locally even if the request fails
            setUser(null)
        }
    }

    return { user, loading, handleLogin, handleLogout, handleRegister }
}
