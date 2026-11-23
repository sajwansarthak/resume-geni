import React, { useState } from "react"
import "../auth.form.scss"

// ---- inline icons (no external icon-library dependency) -----------------
export const MailIcon = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.8"/>
        <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

export const LockIcon = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
)

export const UserIcon = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M4.5 20c1.2-3.6 4.2-5.5 7.5-5.5s6.3 1.9 7.5 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
)

const EyeIcon = ({ open, ...props }) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
        <circle cx="12" cy="12" r="2.8" stroke="currentColor" strokeWidth="1.8"/>
        {!open && <path d="M4 20 20 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>}
    </svg>
)

const SparkleIcon = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M12 3.5 13.6 9l5.4 1.6-5.4 1.6L12 17.7l-1.6-5.5L5 10.6 10.4 9 12 3.5Z" fill="currentColor"/>
        <path d="M19 3.5 19.7 6l2.3.7-2.3.7-.7 2.3-.7-2.3-2.3-.7 2.3-.7.7-2.5Z" fill="currentColor"/>
    </svg>
)

const CheckIcon = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

const FEATURES = [
    "Match score against any job description",
    "Tailored technical & behavioural questions",
    "Skill-gap analysis with a day-wise prep plan",
]

/**
 * Text input with a leading icon. Password fields get a show/hide toggle.
 */
export const AuthField = ({ id, label, icon: Icon, type = "text", ...inputProps }) => {
    const [visible, setVisible] = useState(false)
    const isPassword = type === "password"

    return (
        <div className="auth-field">
            <label htmlFor={id} className="auth-field__label">{label}</label>
            <div className="auth-field__control">
                <Icon className="auth-field__icon" aria-hidden="true" />
                <input
                    id={id}
                    name={id}
                    type={isPassword && visible ? "text" : type}
                    className="auth-field__input"
                    required
                    {...inputProps}
                />
                {isPassword && (
                    <button
                        type="button"
                        className="auth-field__toggle"
                        onClick={() => setVisible((v) => !v)}
                        aria-label={visible ? "Hide password" : "Show password"}
                    >
                        <EyeIcon open={visible} />
                    </button>
                )}
            </div>
        </div>
    )
}

export const AuthSubmit = ({ submitting, children, submittingLabel }) => (
    <button type="submit" className="auth-submit" disabled={submitting}>
        {submitting && <span className="auth-submit__spinner" aria-hidden="true" />}
        {submitting ? submittingLabel : children}
    </button>
)

export const AuthError = ({ message }) =>
    message ? <p className="auth-error" role="alert">{message}</p> : null

/**
 * Shared two-column shell for Login and Register: brand panel + form card.
 */
const AuthLayout = ({ title, subtitle, children, footer }) => (
    <main className="auth-page">
        <div className="auth-page__glow auth-page__glow--one" />
        <div className="auth-page__glow auth-page__glow--two" />

        <div className="auth-card">
            <aside className="auth-brand">
                <div className="auth-brand__logo">
                    <span className="auth-brand__mark"><SparkleIcon /></span>
                    ResumeGeni
                </div>

                <div className="auth-brand__copy">
                    <h2 className="auth-brand__headline">
                        Walk into every interview <span className="auth-brand__accent">prepared.</span>
                    </h2>
                    <p className="auth-brand__text">
                        Upload your resume, paste a job description, and get an AI-built interview strategy in seconds.
                    </p>
                </div>

                <ul className="auth-brand__features">
                    {FEATURES.map((feature) => (
                        <li key={feature}>
                            <span className="auth-brand__check"><CheckIcon /></span>
                            {feature}
                        </li>
                    ))}
                </ul>
            </aside>

            <section className="auth-form">
                <header className="auth-form__header">
                    <h1 className="auth-form__title">{title}</h1>
                    <p className="auth-form__subtitle">{subtitle}</p>
                </header>

                {children}

                <p className="auth-form__footer">{footer}</p>
            </section>
        </div>
    </main>
)

export default AuthLayout
