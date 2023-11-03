import styles from "./Jobdetails.module.css";
import duration from "../../assets/duration.svg";
import stipend from "../../assets/stipend.svg";
import { getJobDetails } from "../../apis/job";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { useState, useEffect } from "react";

const Jobdetails = () => {
  const redirect = useNavigate();
  const { id } = useParams();
  const [jobDetails, setJobDetails] = useState(null);
  const [loggedin, setloggedin] = useState(false);

  const tokenTime = JSON.parse(localStorage.getItem("recuirterDetail"));
  useEffect(() => {
    const currentTime = new Date().getTime();
    const logg =
      tokenTime !== null
        ? tokenTime.expiry > currentTime
          ? true
          : false
        : false;
    setloggedin(logg);
  }, [tokenTime]);

  useEffect(() => {
    async function fetch() {
      const res = await getJobDetails(id);
      setJobDetails(res.jobdetails);
    }
    fetch();
  }, [id]);

  const handleEdit = () => {
    redirect(`/editjob/${id}`);
  };

  return (
    <>
      <div className={styles.container}>
        <Navbar />
        <div className={styles.jobDetailsContainer}>
          <>
            <div className={styles.jobHeader}>
              <span>
                {`${jobDetails && jobDetails.jobPosition} ${
                  jobDetails && jobDetails.mode === "remote"
                    ? "work from home"
                    : "In office"
                } ${jobDetails && jobDetails.jobType} at ${
                  jobDetails && jobDetails.companyName
                }`}
              </span>
            </div>
            <div className={styles.jobDetails}>
              <div className={styles.jobDetailsFirstSection}>
                <span>
                  {moment(
                    new Date(jobDetails && jobDetails.createdAt)
                  ).fromNow()}
                </span>
                <span>.</span>
                <span>{jobDetails && jobDetails.jobType}</span>
                <img
                  src={jobDetails && jobDetails.logoUrl}
                  alt="company logo"
                />
                <span>{jobDetails && jobDetails.companyName}</span>
              </div>
              <div className={styles.jobDetailsSecondSection}>
                <span>{jobDetails && jobDetails.jobPosition}</span>
                {loggedin && <button onClick={handleEdit}>Edit Job</button>}
              </div>
              <div className={styles.jobDetailsThirdSection}>
                <span>{jobDetails && jobDetails.location}</span>
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
                    <span> Rs {jobDetails && jobDetails.salary}/month</span>
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
                <p>{jobDetails && jobDetails.aboutCompany}</p>
              </div>
              <div className={styles.jobDetailsSixthSection}>
                <h1>About the job/internship</h1>
                <p>{jobDetails && jobDetails.jobDescription}</p>
              </div>
              <div className={styles.jobDetailsSevenSection}>
                <h1>Skill(s) Required</h1>
                <div className={styles.jobDetailsSevenSectionSkills}>
                  {jobDetails &&
                    jobDetails.skills?.map((skill) => {
                      return <span>{skill}</span>;
                    })}
                </div>
              </div>
              <div className={styles.jobDetailsEighthSection}>
                <h1>Additional Information</h1>
                <p>{jobDetails && jobDetails.additonalInformation}</p>
              </div>
            </div>
          </>
        </div>
      </div>
    </>
  );
};

export default Jobdetails;
