import { useState, useEffect } from "react";
import styles from "./Editjob.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getJobDetails } from "../../apis/job";
import { editjob } from "../../apis/job";

const Editjob = () => {
  const redirect = useNavigate();
  const { id } = useParams();

  const [companyName, setCompanyName] = useState("");
  const [addLogoURL, setAddLogoURL] = useState("");
  const [jobPosition, setJobPosition] = useState("");
  const [monthlySalary, setMonthlySalary] = useState("");
  const [jobType, setJobType] = useState("");
  const [remoteOffice, setRemoteOffice] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [aboutCompany, setAboutCompany] = useState("");
  const [skillsRequired, setSkillsRequired] = useState("");
  const [information, setInformation] = useState();

  useEffect(() => {
    async function fetchJobDetails() {
      const res = await getJobDetails(id);
      if (res && res.jobdetails) {
        const {
          companyName,
          logoUrl,
          jobPosition,
          salary,
          jobType,
          mode,
          location,
          jobDescription,
          aboutCompany,
          additionalInformation,
          skills,
        } = res.jobdetails;

        setCompanyName(companyName);
        setAddLogoURL(logoUrl);
        setJobPosition(jobPosition);
        setMonthlySalary(salary);
        setJobType(jobType);
        setRemoteOffice(mode);
        setJobLocation(location);
        setJobDescription(jobDescription);
        setAboutCompany(aboutCompany);
        setInformation(additionalInformation);
        setSkillsRequired(skills);
      }
    }
    fetchJobDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await editjob(
      id,
      companyName,
      addLogoURL,
      jobPosition,
      monthlySalary,
      jobType,
      remoteOffice,
      jobLocation,
      jobDescription,
      aboutCompany,
      skillsRequired,
      information
    );
    console.log(result);
    if (result.status === 200) {
      toast.success("Job Update successfull");
      setTimeout(() => {
        redirect("/");
      }, 5000);
    } else {
      toast.error(result.error.message);
    }
  };

  const handleJobTypeChange = (e) => {
    setJobType(e.target.value);
  };

  const handleSkillsChange = (e) => {
    const skills = e.target.value.split(",").map((skill) => skill);
    setSkillsRequired(skills);
  };

  return (
    <div className={styles.addjob}>
      <div className={styles.addjobleft}>
        <h1>Add job description</h1>
        <form className={styles.jobform} onSubmit={handleSubmit}>
          <div className={styles.jobinput}>
            <label htmlFor="companyName">Company Name</label>
            <input
              type="text"
              placeholder="Enter your company name here"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
          <div className={styles.jobinput}>
            <label htmlFor="addLogoURL">Logo URL</label>
            <input
              type="text"
              placeholder="Enter the link"
              value={addLogoURL}
              onChange={(e) => setAddLogoURL(e.target.value)}
            />
          </div>
          <div className={styles.jobinput}>
            <label htmlFor="jobPosition">Job Position</label>
            <input
              type="text"
              placeholder="Enter job position"
              value={jobPosition}
              onChange={(e) => setJobPosition(e.target.value)}
            />
          </div>
          <div className={styles.jobinput}>
            <label htmlFor="monthlySalary">Monthly Salary</label>
            <input
              type="number"
              placeholder="Enter Amount in rupees"
              value={monthlySalary}
              onChange={(e) => setMonthlySalary(e.target.value)}
            />
          </div>
          <div className={styles.jobinput}>
            <label htmlFor="jobType">Job Type</label>
            <select value={jobType} onChange={handleJobTypeChange}>
              <option value="">Select</option>
              <option value="Internship">Internship</option>
              <option value="Full Time">Full Time</option>
            </select>
          </div>
          <div className={styles.jobinput}>
            <label htmlFor="remoteOnsite">Remote/Office</label>
            <select
              value={remoteOffice}
              onChange={(e) => setRemoteOffice(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Remote">Remote</option>
              <option value="In Office">In Office</option>
            </select>
          </div>

          <div className={styles.jobinput}>
            <label htmlFor="jobLocation">Job Location</label>
            <input
              type="text"
              placeholder="Enter Location"
              value={jobLocation}
              onChange={(e) => setJobLocation(e.target.value)}
            />
          </div>
          <div className={styles.jobinput}>
            <label htmlFor="jobDescription">Job Description</label>
            <textarea
              placeholder="Type the job description"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            ></textarea>
          </div>
          <div className={styles.jobinput}>
            <label htmlFor="aboutComapany">About Company</label>
            <textarea
              placeholder="Type about your company"
              value={aboutCompany}
              onChange={(e) => setAboutCompany(e.target.value)}
            ></textarea>
          </div>
          <div className={styles.jobinput}>
            <label htmlFor="skillsRequired">Skills Required</label>
            <input
              type="text"
              placeholder="Enter the must have skills"
              value={skillsRequired}
              onChange={handleSkillsChange}
            />
          </div>
          <div className={styles.jobinput}>
            <label htmlFor="information">Information</label>
            <input
              type="text"
              placeholder="Enter the additional information"
              value={information}
              onChange={(e) => setInformation(e.target.value)}
            />
          </div>
          <div className={styles.jobbuttons}>
            <button
              className={styles.canceladdJob}
              type="button"
              onClick={() => {
                toast.error("Job add cancelled!");
                setTimeout(() => {
                  redirect("/");
                }, 2000);
              }}
            >
              Cancel
            </button>
            <button
              className={styles.addjobbutton}
              type="submit"
              onClick={handleSubmit}
            >
              + Update Job
            </button>
          </div>
        </form>
      </div>
      <div className={styles.addjobright}>
        <h1>Recruiters add Job details here</h1>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default Editjob;
