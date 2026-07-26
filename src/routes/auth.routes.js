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

/**
 * @route api/auth/login
 * @description login user with email and password
 * @access Public
 */
authRouter.post("/login",authController.loginUserController)

module.exports = authRouter