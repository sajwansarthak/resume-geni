const userModel = require("../config/database")

/**
 * @name registerUserController
 * @description register a new user , excepts username,email,password
 * @access Public
 */
async function registerUserController(req,res){
    const {username,email,password} = req.body

    if(!username || email || password){
        return res.status(400).json({
            message:"Please provide username, email and password"
        })
    }

    //creating a func to check whether the usrname or email already exists
    const isUserAlreadyExists = await userModel.findOne({
        //$or : asks for an array and inside the array you can give multiple conditions if condition is satisfied it will return the desired answer
        $or : [ { username },{ email } ]
    })
    
    if(isUserAlreadyExists){
        let fields = []

        if(isUserAlreadyExists.username === username){
            fields.push("username")
        }
        if(isUserAlreadyExists.email === email){
            fields.push("email")
        }
        res.status(400).json({
            message: `User already exists with this ${fields.join(" and ")}`
        })
    }
}

//Right now exporting an empty object
module.exports = {
    registerUserController
}