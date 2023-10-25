import React, { useEffect, useState } from "react";
import styles from "./Jobdetails.module.css";
import duration from "../../assets/duration.svg";
import stipend from "../../assets/stipend.svg";
import Navbar from "../../components/Navbar/Navbar";
// import axios from "axios";
// import { useParams } from "react-router-dom";
import moment from "moment";
// import { useNavigate } from "react-router-dom";

const Jobdetails = () => {
  //   const { id } = useParams();
  //   const [jobDetails, setJobDetails] = useState({});
  const loggedIn = true;

  const jobDetails = {
    companyName: "Google",
    logoUrl:
      "https://graphicsfamily.com/wp-content/uploads/edd/2020/04/3D-Logo-Design-JPEG-2048x2048.jpg",
    jobPosition: "WordPress Development",
    jobType: "part time",
    mode: "on site",
    location: "Banglore",
    jobDescription:
      "We are looking for a responsible PHP/WordPress/Laravel/Shopify Developer. He/She will be liable for managing services and therefore the interchange of knowledge between the server and the users. The candidate's primary focus is going to be the event of all server-side logic, definition, and maintenance of the central database and ensuring high performance and responsiveness to requests from the front end.Selected intern's day-to-day responsibilities include:1. Work on the development of theme customization, liquid programming language, and corresponding apps2. Implement system integrations that are crucial to our succes3. Contribute to the development of HTML5/CSS/JavaScript and standard web technologies integral to building seamless multi-channel experiences4. Work on speed optimization and making a mobile-friendly website",
    aboutCompany: "Gogfle is nk",
    skills: ["react", "html", "CSS", "Javascript"],
    monthlySalary: "50000",
    createdAt: "10-23-2023",
    aboutCompany:
      "We provide technology-based services to help businesses and organizations achieve their goals. We offer a wide range of services, including software development, system integration, network and security services, cloud computing, and data analytics. Our primary focus is on leveraging technology to streamline business processes, improve productivity, and enhance overall efficiency.",
    additonalInformation:
      "Stipend structure: This is a performance-based internship. In addition to the minimum-assured stipend, you will also be paid a performance-linked incentive (₹ 2500 per design).",
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.jobDetailsContainer}>
        <>
          <div className={styles.jobHeader}>
            <span>
              {`${jobDetails.jobPosition} ${
                jobDetails.mode === "remote" ? "work from home" : "In office"
              } ${jobDetails.jobType} at ${jobDetails.companyName}`}
            </span>
          </div>
          <div className={styles.jobDetails}>
            <div className={styles.jobDetailsFirstSection}>
              <span>{moment(new Date(jobDetails.createdAt)).fromNow()}</span>
              <span>.</span>
              <span>{jobDetails.jobType}</span>
              <img src={jobDetails.logoUrl} alt="company logo" />
              <span>{jobDetails.companyName}</span>
            </div>
            <div className={styles.jobDetailsSecondSection}>
              <span>{jobDetails.jobPosition}</span>
              {loggedIn && <button>Edit Job</button>}
            </div>
            <div className={styles.jobDetailsThirdSection}>
              <span>{jobDetails.location}</span>
              <span>|</span>
              <span>India</span>
            </div>
            <div className={styles.jobDetailsFourthSection}>
              <div className={styles.jobDetailsFourthSectionstiped}>
                <div className={styles.jobDetailsFourthSectionstipedFirst}>
                  <img src={stipend} alt="" />
                  <span>Stipend</span>
                </div>
                <div className={styles.jobDetailsFourthSectionstipedSecond}>
                  <span> Rs {jobDetails.monthlySalary}/month</span>
                </div>
              </div>
              <div className={styles.jobDetailsFourthSectionDuration}>
                <div className={styles.jobDetailsFourthSectionDurationFirst}>
                  <img src={duration} alt="" />
                  <span>Duration</span>
                </div>
                <div className={styles.jobDetailsFourthSectionDurationSecond}>
                  <span>6 months</span>
                </div>
              </div>
            </div>
            <div className={styles.jobDetailsFifthSection}>
              <h1>About Company</h1>
              <p>{jobDetails.aboutCompany}</p>
            </div>
            <div className={styles.jobDetailsSixthSection}>
              <h1>About the job/internship</h1>
              <p>{jobDetails.jobDescription}</p>
            </div>
            <div className={styles.jobDetailsSevenSection}>
              <h1>Skill(s) Required</h1>
              <div className={styles.jobDetailsSevenSectionSkills}>
                {jobDetails.skills?.map((skill) => {
                  console.log(skill);
                  return <span>{skill}</span>;
                })}
              </div>
            </div>
            <div className={styles.jobDetailsEighthSection}>
              <h1>Additional Information</h1>
              <p>{jobDetails.additonalInformation}</p>
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default Jobdetails;
