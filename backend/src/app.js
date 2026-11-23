const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors") 

const app = express()

//behind a hosting proxy (Render/Vercel) so secure cookies and req.ip work correctly
app.set("trust proxy", 1)


app.use(express.json())
app.use(cookieParser())
//comma separated list of frontend URLs allowed to call this API
const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173").split(",").map((o) => o.trim())

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}))

//Require all the routes here
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")
//Using all the auth routes here
app.use("/api/auth",authRouter)
//Using all the interview ai routes
app.use("/api/interview",interviewRouter)

//health check used by the hosting platform
app.get("/api/health",(req,res) => res.status(200).json({ status: "ok" }))

module.exports = app