import { createContext,useState } from "react";

export const AuthContext = createContext()

export const AuthProvider = ({children}) =>{
    
    const[user,setUser] = useState(null)
    //In production it is set to true for user hydration
    const[loading,setLoading] = useState(false)

    return(
        <AuthContext.Provider value={{user,setUser,loading,setLoading}}>
            {children}
        </AuthContext.Provider>
    )
}