import React, { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router"
import { useAuth } from "../hooks/useAuth";
import { getErrorMessage } from "../services/auth.api";
import AuthLayout, { AuthField, AuthSubmit, AuthError, MailIcon, LockIcon } from "../components/AuthLayout";

const Login = () =>{

    const { user, loading, handleLogin } = useAuth()

    //performing two way binding
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError] = useState("")
    const [submitting,setSubmitting] = useState(false)

    const navigate = useNavigate()

    //already logged in -> skip the login page
    if(!loading && user){
        return <Navigate to="/" replace />
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        setError("")
        setSubmitting(true)
        try{
            await handleLogin({email,password})
            navigate('/')
        }catch(err){
            setError(getErrorMessage(err, "Unable to log in. Please try again."))
            setSubmitting(false)
        }
    }

    return (
        <AuthLayout
            title="Welcome back"
            subtitle="Log in to continue building your interview strategy."
            footer={<>Don't have an account?<Link to="/register">Create one</Link></>}
        >
            <form onSubmit={handleSubmit}>
                <AuthError message={error} />

                <AuthField
                    id="email"
                    label="Email"
                    type="email"
                    icon={MailIcon}
                    placeholder="you@example.com"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <AuthField
                    id="password"
                    label="Password"
                    type="password"
                    icon={LockIcon}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <AuthSubmit submitting={submitting} submittingLabel="Logging in...">Log in</AuthSubmit>
            </form>
        </AuthLayout>
    )
}

export default Login
