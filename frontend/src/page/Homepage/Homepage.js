import Navbar from "../../components/Navbar/Navbar";
import Jobsearch from "../../components/Jobsearch/Jobserach";
import JobContainer from "../../components/JobContainer/JobContainer";
import { useState, useEffect } from "react";
import { jobsearch } from "../../apis/job";

const Homepage = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const result = await jobsearch();
        if (result && result.jobs) {
          setJobs(result.jobs);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);
  return (
    <>
      <Navbar />
      <Jobsearch />
      {jobs.map((item, index) => {
        return (
          <JobContainer
            companyName={item.companyName}
            jobPosition={item.jobPosition}
            jobType={item.jobType}
            logoUrl={item.logoUrl}
            mode={item.mode}
            skills={item.skills}
            id={item._id}
            salary={item.salary}
            key={index}
          />
        );
      })}
    </>
  );
};

export default Homepage;
