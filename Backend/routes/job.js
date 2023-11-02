const express = require("express");
const router = express.Router();
const Job = require("../models/job");
const isLoggedIn = require("../middleware/isLoggedIn");
const { findById, find } = require("../models/user");

router.post("/addjob", isLoggedIn, async (req, res, next) => {
  try {
    const {
      companyName,
      logoUrl,
      jobPosition,
      jobType,
      mode,
      location,
      jobDescription,
      aboutCompany,
      skills,
      additionalIformation,
      salary,
    } = req.body;

    if (
      !companyName ||
      !logoUrl ||
      !jobPosition ||
      !jobType ||
      !mode ||
      !location ||
      !jobDescription ||
      !aboutCompany ||
      !skills ||
      !salary
    ) {
      res.json({
        message: "field empty",
      });
    }
    const job = new Job({
      companyName,
      logoUrl,
      jobPosition,
      jobType,
      mode,
      location,
      jobDescription,
      aboutCompany,
      skills,
      additionalIformation,
      salary,
    });
    await job.save();
    res.status(200).json({
      status: 200,
      message: "Job details added sucessfully",
    });
  } catch (e) {
    const err = new Error("Something went wrong! Please try after some time.");
    console.log(e);
    next(err);
  }
});

router.put("/editJob/:id", isLoggedIn, async (req, res) => {
  try {
    const {
      companyName,
      logoUrl,
      jobPosition,
      jobType,
      mode,
      location,
      jobDescription,
      aboutCompany,
      skills,
      additionalIformation,
    } = req.body;
    const id = req.params.id;

    await Job.findByIdAndUpdate(id, {
      $set: {
        companyName,
        logoUrl,
        jobPosition,
        jobType,
        mode,
        location,
        jobDescription,
        aboutCompany,
        skills,
        additionalIformation,
      },
    });
    res.status(200).json({
      message: "Job details updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/getjobs", async (req, res) => {
  try {
    const jobs = await Job.find(
      { skills: "react", jobType: "Full time" },
      {
        companyName: 1,
        logoUrl: 1,
        jobPosition: 1,
        jobType: 1,
        mode: 1,
        location: 1,
        skills: 1,
      }
    );
    res.status(200).json({ data: jobs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/jobdetails/:id", async (req, res) => {
  try {
    const jobdetails = await Job.findById(req.params.id);
    if (!jobdetails) {
      return res.status(404).json({ error: "Job details not found" });
    }
    res.status(200).json({ data: jobdetails });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
