const express = require("express")
const router = express.Router()
const Job = require("../models/job")

router.post('/', async (req, res, next) => {
    try {
        const { companyName, logoUrl, jobPosition, jobType, mode, location, jobDescription, aboutCompany, skills, additionalIformation } = req.body
        const job = new Job({
            companyName, logoUrl, jobPosition, jobType, mode, location, jobDescription, aboutCompany, skills, additionalIformation
        })
        await job.save()
        res.status(200).json({
            status: 200,
            message: "Job details added sucessfully"
        })
    }
    catch (e) {
        const err = new Error("Something went wrong! Please try after some time.")
        console.log(e)
        next(err)
    }
})

module.exports = router