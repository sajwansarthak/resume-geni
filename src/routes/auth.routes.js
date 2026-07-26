const express = require("express")

const authRouter = express.Router()
const authController = require("../controller/auth.controller")

//Or
// const {Router} = require('express')
// const authRouter = Router()

/**
 * @route POST api/auth/register
 * @description Register new user
 * @access public
 */
authRouter.post("/register",authController.registerUserController)

/**
 * @route POST api/auth/login
 * @description login user with email and password
 * @access Public
 */
authRouter.post("/login",authController.loginUserController)

/**
 * @route GET api/auth/logout
 * @description clear token from user cookie and token in the blacklist
 * @access Public
 */
authRouter.get("/logout",authController.logoutUserController)

module.exports = authRouter