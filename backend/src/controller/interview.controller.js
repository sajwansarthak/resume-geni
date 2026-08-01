//multer is required to handle files -> multer setup inside middleware

const generateInterviewReport = require("../services/ai.service") 
const pdfParse = require("pdf-parse")
const interviewReportModel = require("../models/interviewReport.model")


async function generateInterviewReportController(req,res){
    //we'll use pdf-parse package to get the content out of the resume-file
    const resumeFile = req.file

    const resumeContent = pdfParse(req.file.buffer)
    const {selfDescription,jobDescription} = req.body

    const interviewReportByAi = await generateInterviewReport({
        resume: resumeContent,
        selfDescription,
        jobDescription
    })

    const interviewReport = await interviewReportModel.create({
        user: req.user.id,
        resume: resumeContent,
        selfDescription,
        jobDescription,
        //destructuring interviewReport for the technical question
        ...interviewReportByAi
    })

    res.status(201).json({
        message:"Interview report generated successfully",
        interviewReport
    })

}

module.exports = {generateInterviewReportController}