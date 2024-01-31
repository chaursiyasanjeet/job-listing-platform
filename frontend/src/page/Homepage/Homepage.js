import Navbar from "../../components/Navbar/Navbar";
import Jobsearch from "../../components/Jobsearch/Jobserach";
import JobContainer from "../../components/JobContainer/JobContainer";
import { useState } from "react";

const Homepage = () => {
  const [jobs, setJobs] = useState(null);
  const getAllJob = (job) => {
    setJobs(job);
  };

  return (
    <>
      <Navbar />
      <Jobsearch sendJob={getAllJob} />
      {jobs === null ? (
        <h1 style={{ textAlign: "center" }}>Loading...</h1>
      ) : jobs.length > 0 ? (
        jobs.map((item, index) => {
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
        })
      ) : (
        <h1 style={{ textAlign: "center" }}>No Job Found</h1>
      )}
    </>
  );
};

export default Homepage;
