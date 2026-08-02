// import React from "react"
// import "../style/home.scss"

// const Home = () =>{
//     return(
//         <main className="home">
//             <div className="interview-input-group">
//                 {/* Three input fields resume, job-description, self-description and a button generate report*/}
//                 <div className="left">
//                     <label htmlFor="jobDescription">Job Description</label>
//                     <textarea name="jobDescription" id="jobDescription" placeholder="Enter job-description here..."></textarea>
//                 </div>


//                 <div className="right">
//                     <div className="input-group">
//                         <p>Resume <small className="highlight">(Use Resume and self description together for best results)</small></p>
//                         <label htmlFor="resume" className="file-label"><h2>Upload Resume</h2></label>
//                         <input hidden type="file" name="resume" id="resume" accept=".pdf"/>
//                     </div>
//                     <div className="input-group">
//                         <label htmlFor="selfDescription"><h2>Self Description</h2></label>
//                         <textarea name="selfDescription" id="selfDescription" placeholder="Describe yourself in few sentences..."></textarea>
//                     </div>
//                     <button className="button primary-button">Generate Interview Report</button>
//                 </div>
//             </div>
//         </main>
//     )
// }

// export default Home

import React from "react"
import "../style/home.scss"

// ---- inline icons (no external icon-library dependency) -----------------
const BriefcaseIcon = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M3 12h18" stroke="currentColor" strokeWidth="1.8"/>
    </svg>
)

const UserIcon = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M4.5 20c1.2-3.6 4.2-5.5 7.5-5.5s6.3 1.9 7.5 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
)

const UploadCloudIcon = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M7 18a4.5 4.5 0 0 1-.5-8.98A5.5 5.5 0 0 1 17.3 8.06 4 4 0 0 1 17 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 11v7m0-7 2.5 2.5M12 11 9.5 13.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

const SparkleIcon = (props) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M12 3.5 13.6 9l5.4 1.6-5.4 1.6L12 17.7l-1.6-5.5L5 10.6 10.4 9 12 3.5Z" fill="currentColor"/>
        <path d="M19 3.5 19.7 6l2.3.7-2.3.7-.7 2.3-.7-2.3-2.3-.7 2.3-.7.7-2.5Z" fill="currentColor"/>
    </svg>
)

/**
 * ---------------------------------------------------------------------
 * UI LAYER — Home
 * ---------------------------------------------------------------------
 * Purely presentational: no internal state, no API calls. Everything
 * needed to make it interactive arrives via props, so it can be wired
 * up later like:
 *
 *   const HomePage = () => {
 *     const form = useInterviewForm()   // hooks layer
 *     return <Home {...form} />
 *   }
 *
 * Planned layers (not built yet):
 *  - hooks/useInterviewForm.js  -> form state, validation, drag&drop
 *  - state/interviewStore.js    -> shared/global state if needed
 *  - api/interviewApi.js        -> POST /interview-report, file upload, etc.
 *
 * Every prop below has a default, so `<Home />` still renders fine
 * on its own until the hooks layer exists.
 * ---------------------------------------------------------------------
 */
const Home = ({
    // Job description field
    jobDescription = "",
    onJobDescriptionChange = () => {},
    jobDescriptionMaxLength = 5000,

    // Resume upload
    resumeFileName = "",
    onResumeChange = () => {},
    onResumeDrop = () => {},
    isDraggingResume = false,
    onDragOver = () => {},
    onDragLeave = () => {},

    // Self description field
    selfDescription = "",
    onSelfDescriptionChange = () => {},

    // Submit action
    onGenerate = () => {},
    isGenerating = false,
    canGenerate = false,
}) => {
    return (
        <main className="home-page">
            <header className="home-page__header">
                <h1 className="home-page__title">
                    Create Your Custom <span className="home-page__title-accent">Interview Plan</span>
                </h1>
                <p className="home-page__subtitle">
                    Let our AI analyze the job requirements and your unique profile to build a winning strategy.
                </p>
            </header>

            <div className="home-page__card">
                <div className="home-page__body">
                    {/* ---------------- left: job description ---------------- */}
                    <section className="job-panel">
                        <div className="job-panel__head">
                            <h2 className="job-panel__heading">
                                <BriefcaseIcon className="job-panel__icon" />
                                Target Job Description
                            </h2>
                            <span className="job-panel__badge">Required</span>
                        </div>

                        <div className="job-panel__field">
                            <textarea
                                id="jobDescription"
                                name="jobDescription"
                                maxLength={jobDescriptionMaxLength}
                                placeholder={"Paste the full job description here...\ne.g. \"Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...\""}
                                value={jobDescription}
                                onChange={onJobDescriptionChange}
                            />
                            <span className="job-panel__counter">
                                {jobDescription.length} / {jobDescriptionMaxLength} chars
                            </span>
                        </div>
                    </section>

                    {/* ---------------- right: profile ---------------- */}
                    <section className="profile-panel">
                        <h2 className="profile-panel__heading">
                            <UserIcon className="profile-panel__icon" />
                            Your Profile
                        </h2>

                        <div className="profile-panel__block">
                            <p className="profile-panel__label">
                                Upload Resume <span className="profile-panel__hint">(Best Results)</span>
                            </p>

                            <label
                                htmlFor="resume"
                                className={`resume-dropzone${isDraggingResume ? " resume-dropzone--active" : ""}`}
                                onDragOver={onDragOver}
                                onDragLeave={onDragLeave}
                                onDrop={onResumeDrop}
                            >
                                <span className="resume-dropzone__icon-wrap">
                                    <UploadCloudIcon className="resume-dropzone__icon" />
                                </span>
                                <span className="resume-dropzone__title">
                                    {resumeFileName || "Click to upload or drag & drop"}
                                </span>
                                <span className="resume-dropzone__hint">PDF or DOCX (Max 5MB)</span>
                                <input
                                    hidden
                                    type="file"
                                    name="resume"
                                    id="resume"
                                    accept=".pdf,.docx"
                                    onChange={onResumeChange}
                                />
                            </label>
                        </div>

                        <div className="profile-panel__divider">
                            <span>OR</span>
                        </div>

                        <div className="profile-panel__block">
                            <p className="profile-panel__label">Quick Self-Description</p>
                            <textarea
                                id="selfDescription"
                                name="selfDescription"
                                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                                value={selfDescription}
                                onChange={onSelfDescriptionChange}
                            />
                        </div>

                        <div className="info-banner">
                            <span className="info-banner__dot" />
                            <p className="info-banner__text">
                                Either a <strong>Resume</strong> or a <strong>Self Description</strong> is
                                required to generate a personalized plan.
                            </p>
                        </div>
                    </section>
                </div>

                <footer className="card-footer">
                    <p className="card-footer__hint">AI-Powered Strategy Generation • Approx 30s</p>
                    <button
                        type="button"
                        className="generate-button"
                        onClick={onGenerate}
                        disabled={!canGenerate || isGenerating}
                    >
                        <SparkleIcon className="generate-button__icon" />
                        {isGenerating ? "Generating..." : "Generate My Interview Strategy"}
                    </button>
                </footer>
            </div>

            <nav className="home-page__links">
                <a href="/privacy-policy">Privacy Policy</a>
                <a href="/terms-of-service">Terms of Service</a>
                <a href="/help-center">Help Center</a>
            </nav>
        </main>
    )
}

export default Home