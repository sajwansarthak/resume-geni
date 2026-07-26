const express = require("express")

const authRouter = express.Router()

//Or
// const {Router} = require('express')
// const authRouter = Router()

/**
 * @route api/auth/register
 * @description Register new user
 * @access public
 */
authRouter.post("/register",)

module.exports = authRouter