import React from "react";
import styles from "./JobContainer.module.css";
import people from "../../assets/people.svg";
import flag from "../../assets/flag.png";
import { useNavigate } from "react-router-dom";
const JobContainer = () => {
  const navigate = useNavigate();

  const getJobDetails = () => {
    navigate(`/editJob/${job._id}`);
  };

  const handleViewDetails = (e) => {
    // setJobId(job._id);
    // navigate(`/${job._id}`);
  };
  const job = {
    companyName: "sanjeet",
    logoUrl:
      "https://graphicsfamily.com/wp-content/uploads/edd/2020/04/3D-Logo-Design-JPEG-2048x2048.jpg",
    jobPosition: "Backend Developer",
    jobType: "part time",
    mode: "on site",
    location: "India",
    jobDescription: "Freshere with so",
    aboutCompany: "Gogfle is nk",
    skills: ["react", "html", "CSS", "Javascript"],
    monthlySalary: "50000",
  };

  return (
    <div className={styles.jobcontainer}>
      <div className={styles.jobleftcomponent}>
        <div className={styles.companylogo}>
          <img src={job.logoUrl} alt="groupIcon" />
        </div>
        <div className={styles.seconddiv}>
          <span>{job.jobPosition}</span>
          <div className={styles.seconddivtext}>
            <img src={people} alt="group" />
            <span>11-50 </span>
            <span>₹ {job.monthlySalary}</span>
          </div>
          <div className={styles.seconddivfooter}>
            <span>{job.mode}</span>
            <span>{job.jobType}</span>
          </div>
        </div>
        <div className={styles.thirddiv}>
          <img src={flag} alt="country" />
          <span>{job.location}</span>
        </div>
      </div>
      <div className={styles.jobrightcontent}>
        <div className={styles.jobrightupper}>
          {job.skills.map((skill, index) => {
            return (
              <span className={styles.requiredSkills} key={index}>
                {skill}
              </span>
            );
          })}
        </div>
        <div className={styles.jobrightlower}>
          {/* {loggedIn ? <button onClick={getJobDetails}>Edit Job</button> : null} */}
          <button onClick={handleViewDetails}>View Details</button>
        </div>
      </div>
    </div>
  );
};

export default JobContainer;
