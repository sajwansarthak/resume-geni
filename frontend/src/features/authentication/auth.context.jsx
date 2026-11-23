import { createContext, useState, useEffect } from "react";
import { getMe } from "./services/auth.api";

export const AuthContext = createContext()

export const AuthProvider = ({children}) =>{

    const [user,setUser] = useState(null)
    //true until we know whether the cookie holds a valid session
    const [loading,setLoading] = useState(true)

    //hydrate the user once on app load so a page refresh keeps you logged in
    useEffect(() =>{
        getMe()
            .then((data) => setUser(data.user))
            .catch(() => setUser(null))
            .finally(() => setLoading(false))
    },[])

    return(
        <AuthContext.Provider value={{user,setUser,loading}}>
            {children}
        </AuthContext.Provider>
    )
}
