const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const interviewController = require("../controller/interview.controller")
const upload = require("../middlewares/file.middleware")

const interviewRouter = express.Router()

/**
 * @route POST /api/interview
 * @description generate new interview report on the bases user self-description resume-pdf and job-descrition
 * @access private
 */
interviewRouter.post("/",authMiddleware.authUser,upload.single("resume"),interviewController.generateInterviewReportController)


module.exports = interviewRouter