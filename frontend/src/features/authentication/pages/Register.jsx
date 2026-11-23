import React, { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router"
import { useAuth } from "../hooks/useAuth";
import { getErrorMessage } from "../services/auth.api";
import AuthLayout, { AuthField, AuthSubmit, AuthError, MailIcon, LockIcon, UserIcon } from "../components/AuthLayout";

const Register = () =>{

    const { user, loading, handleRegister } = useAuth()

    //two way binding
    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError] = useState("")
    const [submitting,setSubmitting] = useState(false)

    //using navigate hook used to lead user to the different page after registering
    const navigate = useNavigate()

    //already logged in -> skip the register page
    if(!loading && user){
        return <Navigate to="/" replace />
    }

    const handleSubmit = async(e) =>{
        e.preventDefault()
        setError("")
        setSubmitting(true)
        try{
            await handleRegister({username,email,password})
            navigate("/")
        }catch(err){
            setError(getErrorMessage(err, "Unable to create your account. Please try again."))
            setSubmitting(false)
        }
    }

    return(
        <AuthLayout
            title="Create your account"
            subtitle="Start generating personalised interview plans in seconds."
            footer={<>Already have an account?<Link to="/login">Log in</Link></>}
        >
            <form onSubmit={handleSubmit}>
                <AuthError message={error} />

                <AuthField
                    id="username"
                    label="Username"
                    icon={UserIcon}
                    placeholder="Pick a username"
                    autoComplete="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
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
                    placeholder="Create a password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <AuthSubmit submitting={submitting} submittingLabel="Creating account...">Create account</AuthSubmit>
            </form>
        </AuthLayout>
    )
}

export default Register
