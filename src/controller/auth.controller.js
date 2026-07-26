const userModel = require("../config/database")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const cookie = require("cookie-parser")

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

    //hashing the password
    const hash = await bcrypt.hash(password,10)

    const user = await userModel.create({
        username,
        email,
        password: hash
    })

    //creating token for the user -> using jsonwebtoken but it require a secret key which can be created from a website called jwtsecrets.com
    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d"}
    )

    //seting this token in cookie
    res.cookie("token",token)

    //status code 201 is used to signal  creation of new resource
    res.status(201).json({
        messgae: "User registered successfully",
        user: {
            id: user_id,
            username: user.username,
            email: user.email
        }
    })
     
}

//Right now exporting an empty object
module.exports = {
    registerUserController
}