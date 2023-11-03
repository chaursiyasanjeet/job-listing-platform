import React from "react";
import styles from "./JobContainer.module.css";
import people from "../../assets/people.svg";
import flag from "../../assets/flag.png";
import { useNavigate } from "react-router-dom";
const JobContainer = (job) => {
  const redirect = useNavigate();

  const handleViewDetails = (e) => {
    e.preventDefault();
    const id = job.id;
    redirect(`/jobdetails/${id}`);
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
            <span>
              {Math.floor(Math.random() * 10)}-
              {Math.floor(Math.random() * 50) + 10}
            </span>
            <span>₹ {job.salary}</span>
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
          <button onClick={handleViewDetails}>View Details</button>
        </div>
      </div>
    </div>
  );
};

export default JobContainer;
