require("dotenv").config()
const app = require("./src/app")
const connectToDB = require("./src/config/database")

connectToDB()

//hosting platforms like Render provide the port through an env variable
const PORT = process.env.PORT || 3000

app.listen(PORT,() =>{
    console.log(`server is running on port ${PORT}`)
})
