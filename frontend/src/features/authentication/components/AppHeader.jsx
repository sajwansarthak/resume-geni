import React, { useState } from "react"
import { Link, useNavigate } from "react-router"
import { useAuth } from "../hooks/useAuth"
import "./app.header.scss"

const SparkleIcon = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M12 3.5 13.6 9l5.4 1.6-5.4 1.6L12 17.7l-1.6-5.5L5 10.6 10.4 9 12 3.5Z" fill="currentColor"/>
        <path d="M19 3.5 19.7 6l2.3.7-2.3.7-.7 2.3-.7-2.3-2.3-.7 2.3-.7.7-2.5Z" fill="currentColor"/>
    </svg>
)

const LogoutIcon = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M14 4h3.5A2.5 2.5 0 0 1 20 6.5v11a2.5 2.5 0 0 1-2.5 2.5H14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M10 8l-4 4 4 4M6 12h9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

/**
 * Top bar shown on protected pages: logo, signed-in user and logout.
 */
const AppHeader = () => {
    const { user, handleLogout } = useAuth()
    const [loggingOut, setLoggingOut] = useState(false)
    const navigate = useNavigate()

    const onLogout = async () => {
        setLoggingOut(true)
        try {
            await handleLogout()
        } finally {
            navigate("/login", { replace: true })
        }
    }

    const initial = user?.username?.[0]?.toUpperCase() || "?"

    return (
        <header className="app-header">
            <div className="app-header__inner">
                <Link to="/" className="app-header__logo">
                    <span className="app-header__mark"><SparkleIcon /></span>
                    ResumeGeni
                </Link>

                <div className="app-header__actions">
                    <div className="app-header__user" title={user?.email}>
                        <span className="app-header__avatar">{initial}</span>
                        <span className="app-header__name">{user?.username}</span>
                    </div>
                    <button
                        type="button"
                        className="app-header__logout"
                        onClick={onLogout}
                        disabled={loggingOut}
                    >
                        <LogoutIcon />
                        <span>{loggingOut ? "Logging out..." : "Log out"}</span>
                    </button>
                </div>
            </div>
        </header>
    )
}

export default AppHeader
