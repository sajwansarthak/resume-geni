import axios from "axios"

/**
 * Shared axios instance for every backend call.
 *
 * Requests go to relative `/api/...` paths on the same origin as the page:
 *  - in development, Vite proxies /api to the Express server (vite.config.js)
 *  - in production, Vercel rewrites /api to the hosted backend (vercel.json)
 * Keeping it same-origin means the auth cookie is first-party, so browsers
 * like Safari don't block it.
 *
 * Set VITE_API_URL only if you want to call a backend on another origin directly.
 */
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "",
    withCredentials: true
})

export default api
