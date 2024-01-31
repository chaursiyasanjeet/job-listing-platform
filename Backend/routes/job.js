const express = require("express");
const router = express.Router();
const Job = require("../models/job");
const isLoggedIn = require("../middleware/isLoggedIn");
const { findById, find } = require("../models/user");

router.post("/addjob", isLoggedIn, async (req, res, next) => {
  try {
    console.log(req.userExist);
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
      additionalInformation,
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
      additionalInformation,
      salary,
      createdAt: new Date(),
      createdBy: req.userExist.email,
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
      additionalInformation,
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
        additionalInformation,
        createdAt: new Date(),
        createdBy: req.userExist.email,
      },
    });
    res.status(200).json({
      status: 200,
      message: "Job details updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/getjobs", async (req, res) => {
  try {
    const { search, skills } = req.query;
    console.log(req.query);

    // Create a case-insensitive regex for the search parameter
    const searchRegex = new RegExp(search, "i");

    // Create a case-insensitive regex for each skill in the skills array
    const skillsRegexArray = skills
      .split(",")
      .map((skill) => new RegExp(skill.trim(), "i"));

    // Combine the search and skills queries using $regex and $all
    const jobQuery = {
      $and: [
        { jobPosition: { $regex: searchRegex } },
        { skills: { $all: skillsRegexArray } },
      ],
    };

    const jobs = await Job.find(jobQuery, {
      companyName: 1,
      logoUrl: 1,
      jobPosition: 1,
      jobType: 1,
      mode: 1,
      location: 1,
      skills: 1,
      salary: 1,
    });

    res.status(200).json({ jobs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/jobdetails/:id", async (req, res) => {
  try {
    const jobdetails = await Job.findById(req.params.id);
    if (!jobdetails) {
      return res.status(404).json({ error: "Job details not found" });
    }
    res.status(200).json({ jobdetails });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
