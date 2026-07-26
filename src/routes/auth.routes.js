const express = require("express")

const authRouter = express.Router()
const authController = require("../controller/auth.controller")

//Or
// const {Router} = require('express')
// const authRouter = Router()

/**
 * @route api/auth/register
 * @description Register new user
 * @access public
 */
authRouter.post("/register",authController.registerUserController)

module.exports = authRouter