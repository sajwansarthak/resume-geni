//connecting with backend

import api from "../../../lib/api"

//pull the server's message out of an axios error so the UI can display it
export function getErrorMessage(err, fallback = "Something went wrong. Please try again."){
    return err?.response?.data?.message || fallback
}

export async function register({username,email,password}){
    const response = await api.post('/api/auth/register',{ username, email, password })
    return response.data
}

export async function login({email,password}){
    const response = await api.post('/api/auth/login',{ email, password })
    return response.data
}

export async function logout(){
    const response = await api.get('/api/auth/logout')
    return response.data
}

export async function getMe(){
    const response = await api.get('/api/auth/get-me')
    return response.data
}
