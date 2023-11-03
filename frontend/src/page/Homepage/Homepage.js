import Navbar from "../../components/Navbar/Navbar";
import Jobsearch from "../../components/Jobsearch/Jobserach";
import JobContainer from "../../components/JobContainer/JobContainer";
import { jobsearch } from "../../apis/job";

const result = await jobsearch();

const Homepage = () => {
  return (
    <>
      <Navbar />
      <Jobsearch />
      {result &&
        result.jobs.map((item, index) => {
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
